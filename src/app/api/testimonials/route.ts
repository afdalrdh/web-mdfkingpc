import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { TESTIMONIALS_LIST } from '@/data/mockData';

export const dynamic = 'force-dynamic';

// GET /api/testimonials
export async function GET() {
  try {
    let dbTestimonials: any[] = [];

    try {
      if (process.env.DATABASE_URL) {
        dbTestimonials = await prisma.testimonial.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching testimonials:', dbError);
    }

    const dbIds = new Set(dbTestimonials.map((t) => t.id));
    const merged = [
      ...dbTestimonials,
      ...TESTIMONIALS_LIST.filter((t) => !dbIds.has(t.id)),
    ];

    return NextResponse.json({
      success: true,
      count: merged.length,
      data: merged,
    }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data testimoni.', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/testimonials (Create Testimonial)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, rating, serviceType, quote, avatarUrl } = body;

    if (!name || !quote || !serviceType) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi nama, jenis layanan, dan ulasan/testimoni.' },
        { status: 400 }
      );
    }

    let created: any = null;

    try {
      if (process.env.DATABASE_URL) {
        created = await prisma.testimonial.create({
          data: {
            name,
            location: location || 'Bandung',
            rating: rating ? parseInt(rating, 10) : 5,
            serviceType,
            quote,
            avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error creating testimonial:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Testimoni berhasil ditambahkan!',
      data: created || { id: `tst-${Date.now()}`, name, location, rating, serviceType, quote, avatarUrl },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat testimoni.', error: error.message },
      { status: 500 }
    );
  }
}
