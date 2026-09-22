import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStoredCashflow, saveStoredCashflow, deleteStoredCashflow, StoredCashflow } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, category, amount, description, proofUrl, date } = body;

    if (!type || !category || !amount || !description) {
      return NextResponse.json(
        { success: false, message: 'Mohon isi tipe (INCOME/EXPENSE), kategori, nominal, dan keterangan.' },
        { status: 400 }
      );
    }

    const cashflowId = `CF-${Date.now().toString().slice(-6)}`;
    const newEntry: StoredCashflow = {
      id: cashflowId,
      type: type === 'Pemasukan' || type === 'INCOME' ? 'INCOME' : 'EXPENSE',
      category,
      amount: parseFloat(amount),
      description,
      date: date || new Date().toISOString().slice(0, 10),
    };

    try {
      if (process.env.DATABASE_URL) {
        await prisma.cashflow.create({
          data: {
            type: newEntry.type,
            category: newEntry.category,
            amount: newEntry.amount,
            description: newEntry.description,
            proofUrl: proofUrl || null,
            date: new Date(newEntry.date),
          },
        });
      }
    } catch (dbErr) {
      // Fallback
    }

    const saved = saveStoredCashflow(newEntry);

    return NextResponse.json({
      success: true,
      message: 'Transaksi cashflow berhasil dicatat!',
      cashflowId,
      data: saved,
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
    let entries: StoredCashflow[] = [];
    try {
      if (process.env.DATABASE_URL) {
        const dbEntries = await prisma.cashflow.findMany({
          orderBy: { createdAt: 'desc' },
          take: 100,
        });
        if (dbEntries && dbEntries.length > 0) {
          entries = dbEntries.map((c) => ({
            id: c.id,
            type: c.type as 'INCOME' | 'EXPENSE',
            category: c.category,
            amount: c.amount,
            description: c.description,
            date: new Date(c.date).toISOString().slice(0, 10),
          }));
        }
      }
    } catch (dbErr) {
      // Fallback
    }

    if (entries.length === 0) {
      entries = getStoredCashflow();
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID transaksi diperlukan.' },
        { status: 400 }
      );
    }

    try {
      if (process.env.DATABASE_URL) {
        await prisma.cashflow.delete({ where: { id } });
      }
    } catch (dbErr) {
      // Fallback
    }

    deleteStoredCashflow(id);

    return NextResponse.json({
      success: true,
      message: 'Transaksi cashflow berhasil dihapus.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus transaksi.', error: error.message },
      { status: 500 }
    );
  }
}
