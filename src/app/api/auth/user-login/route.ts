import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mdfkingpc_super_secret_jwt_key_2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password harus diisi.' },
        { status: 400 }
      );
    }

    let user: any = null;

    try {
      if (process.env.DATABASE_URL) {
        user = await prisma.user.findUnique({
          where: { email },
        });
      }
    } catch (dbErr) {
      console.warn('DB User login warning:', dbErr);
    }

    if (!user) {
      // Fallback user auth for dev
      if (password === 'password123' || password === 'admin123') {
        const mockUser = {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'USER',
        };
        const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '7d' });
        return NextResponse.json({
          success: true,
          message: 'Login Berhasil (Dev Fallback)',
          token,
          user: mockUser,
        });
      }

      return NextResponse.json(
        { success: false, message: 'Email atau kata sandi tidak ditemukan.' },
        { status: 401 }
      );
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: 'Kata sandi tidak sesuai.' },
          { status: 401 }
        );
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('User Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal melakukan login.', error: error.message },
      { status: 500 }
    );
  }
}
