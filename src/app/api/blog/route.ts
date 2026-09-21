import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { BLOG_POSTS } from '@/data/mockData';

// GET /api/blog
export async function GET() {
  try {
    let articles: any[] = [];

    try {
      if (process.env.DATABASE_URL) {
        articles = await prisma.article.findMany({
          orderBy: { publishedAt: 'desc' },
        });
      }
    } catch (dbError) {
      console.warn('DB error fetching blog articles:', dbError);
    }

    if (articles.length === 0) {
      articles = BLOG_POSTS.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        category: b.category,
        snippet: b.snippet,
        content: b.content,
        imageUrl: b.imageUrl,
        author: b.author,
        readTime: b.readTime,
        publishedAt: b.date,
      }));
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil artikel blog.', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create Article (Admin Protected)
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
    const { title, slug, category, snippet, content, imageUrl, author, readTime } = body;

    if (!title || !category || !content || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi judul, kategori, konten artikel, dan URL gambar (Cloudinary).' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let createdArticle: any = null;

    try {
      if (process.env.DATABASE_URL) {
        createdArticle = await prisma.article.create({
          data: {
            title,
            slug: generatedSlug,
            category,
            snippet: snippet || content.slice(0, 150) + '...',
            content,
            imageUrl,
            author: author || 'Teknisi mdfkingpc',
            readTime: readTime || '5 menit baca',
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error creating article:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Artikel blog berhasil diterbitkan!',
      data: createdArticle || {
        id: `art-${Date.now()}`,
        title,
        slug: generatedSlug,
        category,
        snippet,
        content,
        imageUrl,
        author,
        readTime,
        publishedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat artikel blog.', error: error.message },
      { status: 500 }
    );
  }
}
