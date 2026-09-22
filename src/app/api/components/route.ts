import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';
import { getStoredComponents, saveStoredComponent, deleteStoredComponent, StoredComponent } from '@/lib/storage';

// GET /api/components - Get all PC components
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let components: StoredComponent[] = [];

    try {
      if (process.env.DATABASE_URL) {
        const dbComponents = await prisma.pcComponent.findMany({
          where: category ? { category } : undefined,
          orderBy: { price: 'asc' },
        });
        if (dbComponents && dbComponents.length > 0) {
          components = dbComponents.map((c) => ({
            id: c.id,
            category: c.category,
            name: c.name,
            brand: c.brand,
            price: c.price,
            specs: c.specs,
            imageUrl: c.imageUrl || undefined,
            badge: c.badge || undefined,
          }));
        }
      }
    } catch (dbError) {
      // Fallback
    }

    if (components.length === 0) {
      components = getStoredComponents();
      if (category) {
        components = components.filter((c) => c.category.toLowerCase() === category.toLowerCase());
      }
    }

    return NextResponse.json({
      success: true,
      count: components.length,
      data: components,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data komponen PC.', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/components - Create or update component (Admin Protected)
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
    const { id, category, name, brand, price, specs, badge } = body;

    if (!category || !name || !brand || price === undefined) {
      return NextResponse.json(
        { success: false, message: 'Mohon lengkapi kategori, nama komponen, brand, dan harga.' },
        { status: 400 }
      );
    }

    const compId = id || `comp-${Date.now()}`;
    const numPrice = parseFloat(price) || 0;

    const newComp: StoredComponent = {
      id: compId,
      category,
      name,
      brand,
      price: numPrice,
      specs: specs || '',
      badge: badge || undefined,
    };

    try {
      if (process.env.DATABASE_URL) {
        await prisma.pcComponent.upsert({
          where: { id: compId },
          update: {
            category,
            name,
            brand,
            price: numPrice,
            specs: specs || '',
            badge: badge || null,
          },
          create: {
            id: compId,
            category,
            name,
            brand,
            price: numPrice,
            specs: specs || '',
            badge: badge || null,
          },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    const saved = saveStoredComponent(newComp);

    return NextResponse.json({
      success: true,
      message: 'Komponen PC berhasil disimpan!',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan komponen.', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/components - Delete component (Admin Protected)
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
        { success: false, message: 'Parameter ID komponen diperlukan.' },
        { status: 400 }
      );
    }

    try {
      if (process.env.DATABASE_URL) {
        await prisma.pcComponent.delete({
          where: { id },
        });
      }
    } catch (dbError) {
      // Fallback
    }

    deleteStoredComponent(id);

    return NextResponse.json({
      success: true,
      message: 'Komponen berhasil dihapus.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus komponen.', error: error.message },
      { status: 500 }
    );
  }
}
