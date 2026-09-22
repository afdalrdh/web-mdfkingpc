import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { sendOrderConfirmationEmail } from '@/lib/mailer';
import { getStoredOrders, saveStoredOrder, StoredOrder } from '@/lib/storage';

// POST /api/orders - Create new customer order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      phoneWA,
      serviceId,
      serviceName,
      serviceType,
      price,
      paymentProofUrl,
      deviceModel,
      problemDescription,
      detailsJson,
    } = body;

    const email = customerEmail || 'pelanggan@mdfkingpc.com';
    const phone = customerPhone || phoneWA;
    const nameLayanan = serviceName || serviceType || 'Layanan Servis mdfkingpc';
    const numPrice = price ? parseFloat(price) : 0;

    if (!customerName || !phone || !nameLayanan) {
      return NextResponse.json(
        { success: false, message: 'Mohon lengkapi nama pelanggan, nomor kontak, dan nama layanan.' },
        { status: 400 }
      );
    }

    const orderId = `${Date.now().toString().slice(-6)}`;
    const newOrderPayload: StoredOrder = {
      id: orderId,
      customerName,
      customerEmail: email,
      customerPhone: phone,
      serviceId: serviceId || null,
      serviceName: nameLayanan,
      price: numPrice,
      paymentStatus: 'PENDING',
      paymentProofUrl: paymentProofUrl || null,
      deviceModel: deviceModel || 'Tidak Disebutkan',
      problemDescription: problemDescription || null,
      detailsJson: detailsJson ? (typeof detailsJson === 'string' ? detailsJson : JSON.stringify(detailsJson)) : null,
      createdAt: new Date().toISOString(),
    };

    // Try Prisma DB if available
    try {
      if (process.env.DATABASE_URL) {
        await prisma.order.create({
          data: {
            id: orderId,
            customerName,
            customerEmail: email,
            customerPhone: phone,
            serviceId: serviceId || null,
            serviceName: nameLayanan,
            price: numPrice,
            paymentStatus: 'PENDING',
            paymentProofUrl: paymentProofUrl || null,
            deviceModel: deviceModel || 'Tidak Disebutkan',
            problemDescription: problemDescription || null,
            detailsJson: newOrderPayload.detailsJson,
          },
        });
      }
    } catch (dbError) {
      console.warn('DB Error on order creation, proceeding with local persistent store:', dbError);
    }

    // Always persist to local storage
    const savedOrder = saveStoredOrder(newOrderPayload);

    // Send confirmation email asynchronously
    sendOrderConfirmationEmail({
      id: savedOrder.id,
      customerName: savedOrder.customerName,
      customerEmail: savedOrder.customerEmail,
      customerPhone: savedOrder.customerPhone,
      serviceName: savedOrder.serviceName,
      price: savedOrder.price,
      deviceModel: savedOrder.deviceModel,
      problemDescription: savedOrder.problemDescription,
    }).catch((emailErr) => console.error('Failed to send confirmation email:', emailErr));

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil dibuat! Tim mdfkingpc akan segera memproses.',
      data: savedOrder,
    });
  } catch (error: any) {
    console.error('API Orders POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pesanan.', error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get order list (Public with email query, or Admin protected)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || searchParams.get('customerEmail');
    const status = searchParams.get('status');

    let orders: StoredOrder[] = [];

    // 1. If email parameter is provided (User tracking their orders)
    if (email) {
      try {
        if (process.env.DATABASE_URL) {
          const dbOrders = await prisma.order.findMany({
            where: {
              customerEmail: { equals: email, mode: 'insensitive' },
              ...(status ? { paymentStatus: status.toUpperCase() } : {}),
            },
            orderBy: { createdAt: 'desc' },
          });
          if (dbOrders && dbOrders.length > 0) {
            orders = dbOrders as any;
          }
        }
      } catch (dbError) {
        // Fallback to local store
      }

      if (orders.length === 0) {
        const allStored = getStoredOrders();
        orders = allStored.filter(
          (o) =>
            o.customerEmail.toLowerCase() === email.toLowerCase() &&
            (!status || o.paymentStatus.toUpperCase() === status.toUpperCase())
        );
      }

      return NextResponse.json({
        success: true,
        count: orders.length,
        data: orders,
      });
    }

    // 2. Otherwise require admin token for full admin list across all users
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin atau parameter email.' },
        { status: 401 }
      );
    }

    try {
      if (process.env.DATABASE_URL) {
        const dbOrders = await prisma.order.findMany({
          where: status ? { paymentStatus: status.toUpperCase() } : undefined,
          orderBy: { createdAt: 'desc' },
        });
        if (dbOrders && dbOrders.length > 0) {
          orders = dbOrders as any;
        }
      }
    } catch (dbError) {
      // Fallback to local store
    }

    if (orders.length === 0) {
      orders = getStoredOrders();
      if (status) {
        orders = orders.filter((o) => o.paymentStatus.toUpperCase() === status.toUpperCase());
      }
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error: any) {
    console.error('API Orders GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil daftar pesanan.', error: error.message },
      { status: 500 }
    );
  }
}
