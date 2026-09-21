import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

// PUT /api/cms/[id] - Update CMS entry (Admin Protected)
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
    const { title, subtitle, content, imageUrl } = body;

    const stringContent = typeof content === 'object' ? JSON.stringify(content) : content ? String(content) : undefined;
    let updated: any = null;

    try {
      if (process.env.DATABASE_URL) {
        updated = await prisma.cmsPage.update({
          where: { id },
          data: {
            ...(title !== undefined && { title }),
            ...(subtitle !== undefined && { subtitle }),
            ...(stringContent !== undefined && { content: stringContent }),
            ...(imageUrl !== undefined && { imageUrl }),
          },
        });
      }
    } catch (dbError) {
      console.warn('DB error updating CMS entry:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Entri CMS berhasil diperbarui.',
      data: updated || { id, ...body },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui CMS.', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/[id] - Delete CMS entry (Admin Protected)
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
        await prisma.cmsPage.delete({ where: { id } });
      }
    } catch (dbError) {
      console.warn('DB error deleting CMS entry:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: `Entri CMS ${id} berhasil dihapus.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus CMS.', error: error.message },
      { status: 500 }
    );
  }
}
