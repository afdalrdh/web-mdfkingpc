import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = verifyAdminToken(request);

  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Tidak terotentikasi. Silakan login sebagai admin.' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: admin,
  });
}
