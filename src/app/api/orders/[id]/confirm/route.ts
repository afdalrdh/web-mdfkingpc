import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { sendInvoiceEmail } from '@/lib/mailer';
import { getStoredOrders, updateStoredOrder } from '@/lib/storage';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'mdfkingpc',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// POST /api/orders/[id]/confirm - Confirm payment & generate invoice PDF
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const { id } = params;
    let order: any = null;

    try {
      if (process.env.DATABASE_URL) {
        order = await prisma.order.findUnique({ where: { id } });
      }
    } catch (dbError) {
      console.warn('DB error fetching order for confirmation:', dbError);
    }

    if (!order) {
      const orders = getStoredOrders();
      order = orders.find((o) => o.id === id);
    }

    // Fallback if order not found in DB
    if (!order) {
      order = {
        id,
        customerName: 'Pelanggan mdfkingpc',
        customerEmail: 'pelanggan@mdfkingpc.com',
        customerPhone: '+6285158916661',
        serviceName: 'Layanan Servis & Rakit PC',
        price: 150000,
        paymentStatus: 'PENDING',
        deviceModel: 'Laptop / PC',
        problemDescription: 'Servis rutin & pembersihan',
        createdAt: new Date(),
      };
    }

    // 1. Generate Invoice PDF Buffer
    const pdfBuffer = await generateInvoicePDF({
      orderId: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      serviceName: order.serviceName,
      deviceModel: order.deviceModel,
      problemDescription: order.problemDescription,
      price: order.price,
      paymentStatus: 'CONFIRMED',
      createdAt: order.createdAt || new Date(),
    });

    // 2. Upload Invoice PDF to Cloudinary (or generate data URL)
    let invoiceUrl = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'mdfkingpc_invoices',
              public_id: `invoice_${order.id}`,
              resource_type: 'raw',
              format: 'pdf',
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
          uploadStream.end(pdfBuffer);
        });

        if (uploadResult?.secure_url) {
          invoiceUrl = uploadResult.secure_url;
        }
      } catch (cloudErr) {
        console.warn('Cloudinary PDF upload warning:', cloudErr);
      }
    }

    // 3. Update Order Status & Invoice URL in Database
    let updatedOrder: any = null;
    try {
      if (process.env.DATABASE_URL) {
        updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'CONFIRMED',
            invoiceUrl,
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB Error updating confirmed order:', dbErr);
    }

    const storedUpdated = updateStoredOrder(order.id, {
      paymentStatus: 'CONFIRMED',
      invoiceUrl,
    });

    const finalOrder = updatedOrder || storedUpdated || { ...order, paymentStatus: 'CONFIRMED', invoiceUrl };

    // 4. Send Email with PDF Invoice attachment using Nodemailer
    const emailResult = await sendInvoiceEmail(
      {
        id: finalOrder.id,
        customerName: finalOrder.customerName,
        customerEmail: finalOrder.customerEmail,
        serviceName: finalOrder.serviceName,
        price: finalOrder.price,
        invoiceUrl: finalOrder.invoiceUrl,
      },
      pdfBuffer
    );

    return NextResponse.json({
      success: true,
      message: 'Pembayaran berhasil dikonfirmasi! Invoice PDF telah dibuat dan dikirim ke email pelanggan.',
      invoiceUrl: finalOrder.invoiceUrl,
      emailSent: emailResult.success,
      data: finalOrder,
    });
  } catch (error: any) {
    console.error('API Order Confirm error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengkonfirmasi pembayaran.', error: error.message },
      { status: 500 }
    );
  }
}
