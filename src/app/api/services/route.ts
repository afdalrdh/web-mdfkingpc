import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { getStoredServices, saveStoredService, StoredService } from '@/lib/storage';

// GET /api/services - Retrieve all services
export async function GET() {
  try {
    let services: StoredService[] = [];
    
    try {
      if (process.env.DATABASE_URL) {
        const dbServices = await prisma.service.findMany({
          orderBy: { createdAt: 'desc' },
        });
        if (dbServices && dbServices.length > 0) {
          services = dbServices.map((s) => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            category: s.category,
            shortDesc: s.shortDesc || '',
            fullDesc: s.description,
            priceStarting: s.priceStarting,
            price: s.price,
            imageUrl: s.imageUrl,
            badge: s.badge || undefined,
            features: s.features,
          }));
        }
      }
    } catch (dbError) {
      // Fallback
    }

    if (services.length === 0) {
      services = getStoredServices();
    }

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    console.error('API Services GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data layanan.', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/services - Create or update service (Admin Protected)
export async function POST(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, slug, category, shortDesc, description, fullDesc, priceStarting, price, imageUrl, badge, features } = body;

    if (!title || !category || (!description && !fullDesc) || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi nama layanan, kategori, deskripsi, dan URL gambar.' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const numericPrice = price !== undefined ? parseFloat(price) : (parseFloat((priceStarting || '').replace(/[^0-9]/g, '')) || 0);
    const serviceId = id || `srv-${Date.now()}`;

    const newService: StoredService = {
      id: serviceId,
      slug: generatedSlug,
      title,
      category,
      shortDesc: shortDesc || '',
      fullDesc: description || fullDesc || '',
      priceStarting: priceStarting || `Rp ${numericPrice.toLocaleString('id-ID')}`,
      price: numericPrice,
      imageUrl,
      badge: badge || undefined,
      features: Array.isArray(features) ? features : (typeof features === 'string' ? features.split(',').map((f: string) => f.trim()) : []),
    };

    try {
      if (process.env.DATABASE_URL) {
        await prisma.service.upsert({
          where: { slug: generatedSlug },
          update: {
            title,
            category,
            shortDesc: shortDesc || null,
            description: description || fullDesc || '',
            priceStarting: newService.priceStarting,
            price: numericPrice,
            imageUrl,
            badge: badge || null,
            features: newService.features,
          },
          create: {
            id: serviceId,
            title,
            slug: generatedSlug,
            category,
            shortDesc: shortDesc || null,
            description: description || fullDesc || '',
            priceStarting: newService.priceStarting,
            price: numericPrice,
            imageUrl,
            badge: badge || null,
            features: newService.features,
          },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    const saved = saveStoredService(newService);

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil disimpan ke katalog!',
      data: saved,
    });
  } catch (error: any) {
    console.error('API Services POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan layanan.', error: error.message },
      { status: 500 }
    );
  }
}
