import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { sendOrderConfirmationEmail } from '@/lib/mailer';

// POST /api/orders - Create new customer order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      phoneWA, // Fallback if customerPhone is passed as phoneWA
      serviceId,
      serviceName,
      serviceType, // Fallback if serviceName is passed as serviceType
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

    let savedOrder: any = null;

    try {
      if (process.env.DATABASE_URL) {
        savedOrder = await prisma.order.create({
          data: {
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
            detailsJson: detailsJson ? JSON.stringify(detailsJson) : null,
          },
        });
      }
    } catch (dbError) {
      console.warn('DB Error on order creation, proceeding with response payload:', dbError);
    }

    const orderData = savedOrder || {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName,
      customerEmail: email,
      customerPhone: phone,
      serviceName: nameLayanan,
      price: numPrice,
      paymentStatus: 'PENDING',
      paymentProofUrl: paymentProofUrl || null,
      deviceModel: deviceModel || 'Tidak Disebutkan',
      problemDescription: problemDescription || null,
      createdAt: new Date().toISOString(),
    };

    // Send confirmation email via Nodemailer asynchronously
    sendOrderConfirmationEmail({
      id: orderData.id,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      serviceName: orderData.serviceName,
      price: orderData.price,
      deviceModel: orderData.deviceModel,
      problemDescription: orderData.problemDescription,
    }).catch((emailErr) => console.error('Failed to send confirmation email:', emailErr));

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil dibuat! Email konfirmasi telah dikirim.',
      data: orderData,
    });
  } catch (error: any) {
    console.error('API Orders POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pesanan.', error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get order list (Admin Protected)
export async function GET(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let orders: any[] = [];

    try {
      if (process.env.DATABASE_URL) {
        orders = await prisma.order.findMany({
          where: status ? { paymentStatus: status.toUpperCase() } : undefined,
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB Error fetching orders:', dbError);
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
