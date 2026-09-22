import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { getStoredServices, saveStoredService, deleteStoredService, StoredService } from '@/lib/storage';

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
      // Fallback
    }

    if (!service) {
      const services = getStoredServices();
      service = services.find((s) => s.id === id || s.slug === id);
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
    const { title, slug, category, shortDesc, description, fullDesc, priceStarting, price, imageUrl, badge, features } = body;

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
            ...((description || fullDesc) && { description: description || fullDesc }),
            ...(priceStarting && { priceStarting }),
            ...(price !== undefined && { price: parseFloat(price) }),
            ...(imageUrl && { imageUrl }),
            ...(badge !== undefined && { badge }),
            ...(features && { features: Array.isArray(features) ? features : [] }),
          },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    const services = getStoredServices();
    const current = services.find((s) => s.id === id || s.slug === id);
    const numericPrice = price !== undefined ? parseFloat(price) : (current?.price || 0);

    const saved = saveStoredService({
      id: current?.id || id,
      slug: slug || current?.slug || id,
      title: title || current?.title || '',
      category: category || current?.category || '',
      shortDesc: shortDesc !== undefined ? shortDesc : (current?.shortDesc || ''),
      fullDesc: description || fullDesc || current?.fullDesc || '',
      priceStarting: priceStarting || current?.priceStarting || `Rp ${numericPrice.toLocaleString('id-ID')}`,
      price: numericPrice,
      imageUrl: imageUrl || current?.imageUrl || '',
      badge: badge !== undefined ? badge : current?.badge,
      features: features ? (Array.isArray(features) ? features : [features]) : (current?.features || []),
    });

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil diperbarui!',
      data: updatedService || saved,
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
      // Fallback
    }

    deleteStoredService(id);

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
