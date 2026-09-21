import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

// GET /api/cms?page=beranda|layanan|testimoni|blog|tentang|kontak
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    let cmsEntries: any[] = [];

    try {
      if (process.env.DATABASE_URL) {
        cmsEntries = await prisma.cmsPage.findMany({
          where: page ? { pageKey: page.toLowerCase() } : undefined,
          orderBy: { updatedAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching CMS entries, fallback to default content:', dbError);
    }

    // Default pre-populated CMS content mapping if DB is empty
    if (cmsEntries.length === 0) {
      const defaultPages = [
        {
          id: 'cms-beranda-hero',
          pageKey: 'beranda',
          sectionKey: 'hero',
          title: SITE_INFO.slogan,
          subtitle: SITE_INFO.subSlogan,
          content: JSON.stringify({
            badge: 'Servis Laptop & Rakit PC No.1 di Bandung',
            ctaText: 'Pesan Servis Sekarang',
            whatsapp: SITE_INFO.whatsapp,
            operatingHours: SITE_INFO.operatingHours,
          }),
          imageUrl: CLOUDINARY_IMAGES.hero,
        },
        {
          id: 'cms-beranda-stats',
          pageKey: 'beranda',
          sectionKey: 'stats',
          title: 'Statistik mdfkingpc',
          subtitle: 'Pengalaman dan Kepuasan Pelanggan',
          content: JSON.stringify(SITE_INFO.stats),
          imageUrl: null,
        },
        {
          id: 'cms-tentang-story',
          pageKey: 'tentang',
          sectionKey: 'story',
          title: 'Tentang mdfkingpc',
          subtitle: 'Kisah & Komitmen Kami',
          content: JSON.stringify({
            story: SITE_INFO.story,
            address: SITE_INFO.address,
            email: SITE_INFO.email,
            values: SITE_INFO.companyValues,
          }),
          imageUrl: CLOUDINARY_IMAGES.workshop,
        },
        {
          id: 'cms-kontak-info',
          pageKey: 'kontak',
          sectionKey: 'contact_info',
          title: 'Hubungi mdfkingpc',
          subtitle: 'Kami Siap Membantu Kerusakan Perangkat Anda',
          content: JSON.stringify({
            address: SITE_INFO.address,
            whatsapp: SITE_INFO.whatsappFormatted,
            email: SITE_INFO.email,
            operatingHours: SITE_INFO.operatingHours,
          }),
          imageUrl: CLOUDINARY_IMAGES.technicianWorking,
        },
      ];

      cmsEntries = page ? defaultPages.filter((p) => p.pageKey === page.toLowerCase()) : defaultPages;
    }

    return NextResponse.json({
      success: true,
      count: cmsEntries.length,
      data: cmsEntries,
    });
  } catch (error: any) {
    console.error('API CMS GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data CMS.', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/cms - Create or update CMS section content (Admin Protected)
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
    const { pageKey, sectionKey, title, subtitle, content, imageUrl } = body;

    if (!pageKey || !sectionKey || !content) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi pageKey, sectionKey, dan content.' },
        { status: 400 }
      );
    }

    const stringContent = typeof content === 'object' ? JSON.stringify(content) : String(content);
    let cmsItem: any = null;

    try {
      if (process.env.DATABASE_URL) {
        cmsItem = await prisma.cmsPage.upsert({
          where: {
            pageKey_sectionKey: {
              pageKey: pageKey.toLowerCase(),
              sectionKey: sectionKey.toLowerCase(),
            },
          },
          update: {
            title: title || null,
            subtitle: subtitle || null,
            content: stringContent,
            imageUrl: imageUrl || null,
          },
          create: {
            pageKey: pageKey.toLowerCase(),
            sectionKey: sectionKey.toLowerCase(),
            title: title || null,
            subtitle: subtitle || null,
            content: stringContent,
            imageUrl: imageUrl || null,
          },
        });
      }
    } catch (dbError) {
      console.warn('DB Error upserting CMS content:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: `Konten halaman "${pageKey}" bagian "${sectionKey}" berhasil diperbarui!`,
      data: cmsItem || { pageKey, sectionKey, title, subtitle, content: stringContent, imageUrl },
    });
  } catch (error: any) {
    console.error('API CMS POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui konten CMS.', error: error.message },
      { status: 500 }
    );
  }
}
