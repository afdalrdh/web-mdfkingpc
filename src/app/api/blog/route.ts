import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { getStoredBlogs, saveStoredBlog, deleteStoredBlog, StoredBlogPost } from '@/lib/storage';

// GET /api/blog
export async function GET() {
  try {
    let articles: StoredBlogPost[] = [];

    try {
      if (process.env.DATABASE_URL) {
        const dbArticles = await prisma.article.findMany({
          orderBy: { publishedAt: 'desc' },
        });
        if (dbArticles && dbArticles.length > 0) {
          articles = dbArticles.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            category: a.category,
            snippet: a.snippet || '',
            content: a.content,
            imageUrl: a.imageUrl,
            author: a.author,
            readTime: a.readTime || '4 menit baca',
            date: new Date(a.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          }));
        }
      }
    } catch (dbError) {
      // Fallback
    }

    if (articles.length === 0) {
      articles = getStoredBlogs();
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

// POST /api/blog - Create or Update Article (Admin Protected)
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
    const { id, title, slug, category, snippet, content, imageUrl, author, readTime, date } = body;

    if (!title || !category || !content || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Mohon lengkapi judul, kategori, konten artikel, dan URL gambar.' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const articleId = id || `art-${Date.now()}`;

    const newPost: StoredBlogPost = {
      id: articleId,
      slug: generatedSlug,
      title,
      category,
      date: date || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      author: author || 'Admin mdfkingpc',
      snippet: snippet || content.slice(0, 140) + '...',
      content,
      imageUrl,
      readTime: readTime || '4 menit baca',
    };

    try {
      if (process.env.DATABASE_URL) {
        await prisma.article.upsert({
          where: { slug: generatedSlug },
          update: {
            title,
            category,
            snippet: newPost.snippet,
            content,
            imageUrl,
            author: newPost.author,
            readTime: newPost.readTime,
          },
          create: {
            id: articleId,
            title,
            slug: generatedSlug,
            category,
            snippet: newPost.snippet,
            content,
            imageUrl,
            author: newPost.author,
            readTime: newPost.readTime,
          },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    const saved = saveStoredBlog(newPost);

    return NextResponse.json({
      success: true,
      message: 'Artikel blog berhasil disimpan!',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan artikel blog.', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blog - Delete Article (Admin Protected)
export async function DELETE(request: Request) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Memerlukan autentikasi admin.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Parameter ID artikel diperlukan.' },
        { status: 400 }
      );
    }

    try {
      if (process.env.DATABASE_URL) {
        await prisma.article.delete({
          where: { id },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    deleteStoredBlog(id);

    return NextResponse.json({
      success: true,
      message: 'Artikel blog berhasil dihapus.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus artikel.', error: error.message },
      { status: 500 }
    );
  }
}
