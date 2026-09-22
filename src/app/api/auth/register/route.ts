import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mdfkingpc_super_secret_jwt_key_2026';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Mohon lengkapi nama, email, dan kata sandi.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let createdUser: any = null;

    try {
      if (process.env.DATABASE_URL) {
        createdUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            phone: phone || null,
            address: address || null,
            role: 'USER',
          },
        });
      }
    } catch (dbErr: any) {
      if (dbErr.code === 'P2002') {
        return NextResponse.json(
          { success: false, message: 'Email sudah terdaftar. Silakan gunakan menu Masuk.' },
          { status: 400 }
        );
      }
      console.warn('DB Register error:', dbErr);
    }

    const userObj = createdUser || {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || null,
      address: address || null,
      role: 'USER',
    };

    const token = jwt.sign(
      { id: userObj.id, email: userObj.email, name: userObj.name, role: userObj.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil!',
      token,
      user: userObj,
    });
  } catch (error: any) {
    console.error('User Register API error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal melakukan pendaftaran.', error: error.message },
      { status: 500 }
    );
  }
}
