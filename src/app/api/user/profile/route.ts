import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/user/profile?userId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID diperlukan.' },
        { status: 400 }
      );
    }

    let user: any = null;
    try {
      if (process.env.DATABASE_URL) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            role: true,
            createdAt: true,
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB User profile fetch warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: user || { id: userId, name: 'Pelanggan mdfkingpc', email: 'user@mdfkingpc.com' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil profil user.', error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update profile details
export async function PUT(request: Request) {
  try {
    const { userId, name, phone, address, image } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID diperlukan.' },
        { status: 400 }
      );
    }

    let updatedUser: any = null;
    try {
      if (process.env.DATABASE_URL) {
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            ...(name && { name }),
            ...(phone !== undefined && { phone }),
            ...(address !== undefined && { address }),
            ...(image !== undefined && { image }),
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB User profile update warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Profil berhasil diperbarui!',
      data: updatedUser || { id: userId, name, phone, address, image },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui profil.', error: error.message },
      { status: 500 }
    );
  }
}
