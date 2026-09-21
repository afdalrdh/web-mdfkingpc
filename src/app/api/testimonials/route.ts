import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { TESTIMONIALS_LIST } from '@/data/mockData';

// GET /api/testimonials
export async function GET() {
  try {
    let testimonials: any[] = [];

    try {
      if (process.env.DATABASE_URL) {
        testimonials = await prisma.testimonial.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching testimonials:', dbError);
    }

    if (testimonials.length === 0) {
      testimonials = TESTIMONIALS_LIST;
    }

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
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
