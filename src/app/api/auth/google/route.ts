import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mdfkingpc_super_secret_jwt_key_2026';

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
}

function getRedirectUri(request: Request) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}/api/auth/google/callback`;
}

// GET /api/auth/google -> Redirects to official Google Account Chooser
export async function GET(request: Request) {
  const clientId = getGoogleClientId();
  const redirectUri = getRedirectUri(request);

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('prompt', 'select_account');

  return NextResponse.redirect(googleAuthUrl.toString());
}

// POST /api/auth/google -> Direct authentication & Neon DB upsert
export async function POST(request: Request) {
  try {
    const { email, name, image, phone, address } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email Google harus disertakan.' },
        { status: 400 }
      );
    }

    const userName = name || email.split('@')[0];
    const userAvatar = image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0284c7&color=fff`;

    let dbUser: any = null;

    try {
      if (process.env.DATABASE_URL) {
        dbUser = await prisma.user.upsert({
          where: { email },
          update: {
            name: userName,
            image: userAvatar,
            phone: phone || undefined,
            address: address || undefined,
          },
          create: {
            email,
            name: userName,
            image: userAvatar,
            phone: phone || null,
            address: address || null,
            role: 'USER',
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB Google auth warning:', dbErr);
    }

    const userObj = dbUser || {
      id: `usr-google-${Date.now()}`,
      name: userName,
      email,
      image: userAvatar,
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
      message: 'Login Google berhasil!',
      token,
      user: {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        phone: userObj.phone || null,
        address: userObj.address || null,
        image: userObj.image || userAvatar,
        role: userObj.role || 'USER',
      },
    });
  } catch (error: any) {
    console.error('Google Auth API error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal login Google.', error: error.message },
      { status: 500 }
    );
  }
}
