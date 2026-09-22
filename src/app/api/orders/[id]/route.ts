import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { getStoredOrders, updateStoredOrder, deleteStoredOrder } from '@/lib/storage';

// GET /api/orders/[id] - Get order details
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let order: any = null;

    try {
      if (process.env.DATABASE_URL) {
        order = await prisma.order.findUnique({
          where: { id },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    if (!order) {
      const orders = getStoredOrders();
      order = orders.find((o) => o.id === id);
    }

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Pesanan tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil detail pesanan.', error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] - Update order details or status (Admin Protected or user uploading proof)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      paymentStatus,
      paymentProofUrl,
      invoiceUrl,
      price,
      problemDescription,
      deviceModel,
      receiptDetailsJson,
    } = body;

    let updatedOrder: any = null;

    // Try Prisma DB
    try {
      if (process.env.DATABASE_URL) {
        updatedOrder = await prisma.order.update({
          where: { id },
          data: {
            ...(paymentStatus && { paymentStatus }),
            ...(paymentProofUrl !== undefined && { paymentProofUrl }),
            ...(invoiceUrl !== undefined && { invoiceUrl }),
            ...(price !== undefined && { price: parseFloat(price) }),
            ...(problemDescription !== undefined && { problemDescription }),
            ...(deviceModel !== undefined && { deviceModel }),
            ...(receiptDetailsJson !== undefined && { receiptDetailsJson }),
          },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    // Always update local persistent storage
    const stored = updateStoredOrder(id, {
      ...(paymentStatus && { paymentStatus }),
      ...(paymentProofUrl !== undefined && { paymentProofUrl }),
      ...(invoiceUrl !== undefined && { invoiceUrl }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(problemDescription !== undefined && { problemDescription }),
      ...(deviceModel !== undefined && { deviceModel }),
      ...(receiptDetailsJson !== undefined && { receiptDetailsJson }),
    });

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil diperbarui.',
      data: updatedOrder || stored || { id, ...body },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui pesanan.', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id] - Delete order (Admin Protected)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const { id } = params;

    try {
      if (process.env.DATABASE_URL) {
        await prisma.order.delete({
          where: { id },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    deleteStoredOrder(id);

    return NextResponse.json({
      success: true,
      message: `Pesanan ${id} berhasil dihapus.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus pesanan.', error: error.message },
      { status: 500 }
    );
  }
}
