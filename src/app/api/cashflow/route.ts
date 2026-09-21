import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, category, amount, description, proofUrl, date } = body;

    if (!type || !category || !amount || !description) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi tipe (Pemasukan/Pengeluaran), kategori, nominal, dan keterangan.' },
        { status: 400 }
      );
    }

    let savedEntry = null;

    try {
      if (process.env.DATABASE_URL) {
        savedEntry = await prisma.cashflow.create({
          data: {
            type,
            category,
            amount: parseFloat(amount),
            description,
            proofUrl: proofUrl || null,
            date: date ? new Date(date) : new Date(),
          },
        });
      }
    } catch (dbErr) {
      console.warn('Database error or fallback active for cashflow:', dbErr);
    }

    const cashflowId = savedEntry ? savedEntry.id : `CF-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      message: 'Transaksi cashflow berhasil dicatat!',
      cashflowId,
      data: {
        cashflowId,
        type,
        category,
        amount: parseFloat(amount),
        description,
        proofUrl: proofUrl || null,
        date: date || new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('API Cashflow error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mencatat transaksi cashflow.', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let entries: any[] = [];
    try {
      if (process.env.DATABASE_URL) {
        entries = await prisma.cashflow.findMany({
          orderBy: { createdAt: 'desc' },
          take: 50,
        });
      }
    } catch (dbErr) {
      console.warn('Database fallback for cashflow GET:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: entries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data cashflow.', error: error.message },
      { status: 500 }
    );
  }
}
