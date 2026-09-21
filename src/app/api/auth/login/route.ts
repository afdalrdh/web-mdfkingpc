import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signAdminToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password harus diisi.' },
        { status: 400 }
      );
    }

    let user = null;

    try {
      if (process.env.DATABASE_URL) {
        user = await prisma.adminUser.findUnique({
          where: { email },
        });

        // Seed default admin user if table is empty
        if (!user && email === 'admin@mdfkingpc.com' && password === 'admin123') {
          const hashedPassword = await bcrypt.hash('admin123', 10);
          user = await prisma.adminUser.create({
            data: {
              email: 'admin@mdfkingpc.com',
              password: hashedPassword,
              name: 'Admin mdfkingpc',
            },
          });
        }
      }
    } catch (dbError) {
      console.warn('DB Auth fallback active:', dbError);
    }

    // Fallback authentication for dev/testing when DB isn't migrated
    if (!user) {
      if (email === 'admin@mdfkingpc.com' && password === 'admin123') {
        const token = signAdminToken({
          id: 'admin-fallback-1',
          email: 'admin@mdfkingpc.com',
          name: 'Admin mdfkingpc',
        });

        const response = NextResponse.json({
          success: true,
          message: 'Login Berhasil (Dev Fallback)',
          token,
          user: { id: 'admin-fallback-1', email: 'admin@mdfkingpc.com', name: 'Admin mdfkingpc' },
        });

        response.cookies.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        return response;
      }

      return NextResponse.json(
        { success: false, message: 'Email atau password salah.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Email atau password salah.' },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login Admin Berhasil',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Auth Login API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.', error: error.message },
      { status: 500 }
    );
  }
}
