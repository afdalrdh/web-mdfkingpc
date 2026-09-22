import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mdfkingpc_super_secret_jwt_key_2026';

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
}

function getGoogleClientSecret() {
  return process.env.GOOGLE_CLIENT_SECRET || '';
}

function getRedirectUri(request: Request) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}/api/auth/google/callback`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return new NextResponse(
      `<html><body><script>
        alert("Batal atau gagal login dengan Google.");
        window.location.href = "/";
      </script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    const redirectUri = getRedirectUri(request);

    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Google token exchange error:', tokenData);
      throw new Error(tokenData.error_description || 'Gagal tukar token Google.');
    }

    // 2. Fetch User Profile from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    if (!googleUser.email) {
      throw new Error('Email Google tidak ditemukan.');
    }

    // 3. Upsert User into Neon PostgreSQL DB
    let dbUser: any = null;
    const userName = googleUser.name || googleUser.email.split('@')[0];
    const userAvatar = googleUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0284c7&color=fff`;

    try {
      if (process.env.DATABASE_URL) {
        dbUser = await prisma.user.upsert({
          where: { email: googleUser.email },
          update: {
            name: userName,
            image: userAvatar,
          },
          create: {
            email: googleUser.email,
            name: userName,
            image: userAvatar,
            role: 'USER',
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB Google Callback warning:', dbErr);
    }

    const userObj = dbUser || {
      id: `usr-google-${Date.now()}`,
      name: userName,
      email: googleUser.email,
      image: userAvatar,
      role: 'USER',
    };

    // 4. Sign JWT Token
    const token = jwt.sign(
      { id: userObj.id, email: userObj.email, name: userObj.name, role: userObj.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userJSON = JSON.stringify({
      id: userObj.id,
      name: userObj.name,
      email: userObj.email,
      phone: userObj.phone || null,
      address: userObj.address || null,
      image: userObj.image || userAvatar,
      role: userObj.role || 'USER',
    });

    // 5. Store session in localStorage and redirect back to application
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Autentikasi Google mdfkingpc</title>
        </head>
        <body style="background-color: #141414; color: #ffffff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
          <div style="text-align: center;">
            <h2>Berhasil Login dengan Google!</h2>
            <p>Mengalihkan Anda kembali ke situs mdfkingpc...</p>
          </div>
          <script>
            try {
              localStorage.setItem('mdfkingpc_user', ${JSON.stringify(userJSON)});
              localStorage.setItem('mdfkingpc_user_token', ${JSON.stringify(token)});
            } catch(e) {
              console.error(e);
            }
            if (window.opener) {
              window.opener.location.reload();
              window.close();
            } else {
              window.location.href = "/";
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err: any) {
    console.error('Google Callback handler error:', err);
    return new NextResponse(
      `<html><body><script>
        alert("Gagal melakukan login Google: ${err.message || 'Terjadi kesalahan'}");
        window.location.href = "/";
      </script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
