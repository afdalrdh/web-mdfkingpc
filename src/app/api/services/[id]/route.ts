import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { SERVICES_LIST } from '@/data/mockData';

// GET /api/services/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    let service: any = null;

    try {
      if (process.env.DATABASE_URL) {
        service = await prisma.service.findFirst({
          where: {
            OR: [{ id }, { slug: id }],
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching service detail:', dbError);
    }

    if (!service) {
      const mock = SERVICES_LIST.find((s) => s.id === id || s.slug === id);
      if (mock) {
        service = {
          id: mock.id,
          slug: mock.slug,
          title: mock.title,
          category: mock.category,
          shortDesc: mock.shortDesc,
          description: mock.fullDesc,
          priceStarting: mock.priceStarting,
          price: parseFloat(mock.priceStarting.replace(/[^0-9]/g, '')) || 0,
          imageUrl: mock.imageUrl,
          badge: mock.badge || null,
          features: mock.features,
        };
      }
    }

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Layanan tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan.', error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update service (Admin Protected)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { title, slug, category, shortDesc, description, priceStarting, price, imageUrl, badge, features } = body;

    let updatedService: any = null;

    try {
      if (process.env.DATABASE_URL) {
        updatedService = await prisma.service.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(slug && { slug }),
            ...(category && { category }),
            ...(shortDesc !== undefined && { shortDesc }),
            ...(description && { description }),
            ...(priceStarting && { priceStarting }),
            ...(price !== undefined && { price: parseFloat(price) }),
            ...(imageUrl && { imageUrl }),
            ...(badge !== undefined && { badge }),
            ...(features && { features: Array.isArray(features) ? features : [] }),
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error updating service:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil diperbarui!',
      data: updatedService || { id, ...body },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui layanan.', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete service (Admin Protected)
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
        await prisma.service.delete({
          where: { id },
        });
      }
    } catch (dbError) {
      console.warn('DB error deleting service:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: `Layanan ${id} berhasil dihapus.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus layanan.', error: error.message },
      { status: 500 }
    );
  }
}
