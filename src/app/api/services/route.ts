import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { SERVICES_LIST } from '@/data/mockData';

// GET /api/services - Retrieve all services
export async function GET() {
  try {
    let services: any[] = [];
    
    try {
      if (process.env.DATABASE_URL) {
        services = await prisma.service.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching services, using fallback:', dbError);
    }

    if (services.length === 0) {
      // Map mock data to standard API response format
      services = SERVICES_LIST.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        category: s.category,
        shortDesc: s.shortDesc,
        description: s.fullDesc,
        priceStarting: s.priceStarting,
        price: parseFloat(s.priceStarting.replace(/[^0-9]/g, '')) || 0,
        imageUrl: s.imageUrl,
        badge: s.badge || null,
        features: s.features,
      }));
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

// POST /api/services - Create new service (Admin Protected)
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
    const { title, slug, category, shortDesc, description, priceStarting, price, imageUrl, badge, features } = body;

    if (!title || !category || !description || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi nama layanan, kategori, deskripsi, dan URL gambar (Cloudinary).' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const numericPrice = price !== undefined ? parseFloat(price) : (parseFloat((priceStarting || '').replace(/[^0-9]/g, '')) || 0);

    let createdService = null;

    try {
      if (process.env.DATABASE_URL) {
        createdService = await prisma.service.create({
          data: {
            title,
            slug: generatedSlug,
            category,
            shortDesc: shortDesc || null,
            description,
            priceStarting: priceStarting || `Rp ${numericPrice.toLocaleString('id-ID')}`,
            price: numericPrice,
            imageUrl,
            badge: badge || null,
            features: Array.isArray(features) ? features : [],
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error creating service:', dbError);
    }

    const result = createdService || {
      id: `srv-${Date.now()}`,
      title,
      slug: generatedSlug,
      category,
      shortDesc,
      description,
      priceStarting: priceStarting || `Rp ${numericPrice.toLocaleString('id-ID')}`,
      price: numericPrice,
      imageUrl,
      badge,
      features: Array.isArray(features) ? features : [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Layanan berhasil ditambahkan ke katalog!',
      data: result,
    });
  } catch (error: any) {
    console.error('API Services POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat layanan baru.', error: error.message },
      { status: 500 }
    );
  }
}
