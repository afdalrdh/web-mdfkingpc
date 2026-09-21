import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'mdfkingpc',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderType = (formData.get('folder') as string) || (formData.get('type') as string) || 'general';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Tidak ada file yang diunggah.' },
        { status: 400 }
      );
    }

    const targetFolder = `mdfkingpc_${folderType}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    // If Cloudinary environment variables are configured
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        folder: targetFolder,
        resource_type: 'auto',
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        folder: targetFolder,
      });
    }

    // Fallback simulation URL when Cloudinary API credentials are pending in dev
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const simulatedCloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'mdfkingpc'}/image/upload/v${Date.now()}/${targetFolder}/${sanitizedFileName}`;

    return NextResponse.json({
      success: true,
      url: simulatedCloudinaryUrl,
      previewUrl: base64Data,
      folder: targetFolder,
      message: 'File berhasil diunggah ke Cloudinary (Simulasi).',
    });
  } catch (error: any) {
    console.error('Cloudinary upload route error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengunggah gambar ke Cloudinary.', error: error.message },
      { status: 500 }
    );
  }
}
