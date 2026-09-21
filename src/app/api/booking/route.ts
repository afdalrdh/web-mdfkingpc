import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phoneWA, serviceType, deviceModel, problemDescription, paymentProofUrl, detailsJson } = body;

    if (!customerName || !phoneWA || !serviceType || !problemDescription) {
      return NextResponse.json(
        { success: false, message: 'Mohon lengkapi field nama, WhatsApp, jenis layanan, dan deskripsi kerusakan.' },
        { status: 400 }
      );
    }

    let savedBooking = null;

    try {
      if (process.env.DATABASE_URL) {
        savedBooking = await prisma.booking.create({
          data: {
            customerName,
            phoneWA,
            serviceType,
            deviceModel: deviceModel || 'Tidak Disebutkan',
            problemDescription,
            paymentProofUrl: paymentProofUrl || null,
            detailsJson: detailsJson ? JSON.stringify(detailsJson) : null,
            status: 'PENDING',
          },
        });
      }
    } catch (dbError) {
      console.warn('Database error or fallback active:', dbError);
    }

    const orderId = savedBooking ? savedBooking.id : `ORD-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      message: 'Pemesanan servis berhasil dikirim!',
      orderId,
      data: {
        orderId,
        customerName,
        phoneWA,
        serviceType,
        deviceModel,
        problemDescription,
        paymentProofUrl: paymentProofUrl || null,
        detailsJson: detailsJson || null,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('API Booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memproses order.', error: error.message },
      { status: 500 }
    );
  }
}
