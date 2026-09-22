import { NextResponse } from 'next/server';
import { getGroqBuildRecommendation } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { components, targetUsage, maxBudget } = body;

    if (!components || typeof components !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Mohon sertakan komponen terpilih.' },
        { status: 400 }
      );
    }

    const recommendation = await getGroqBuildRecommendation(components, targetUsage, maxBudget);

    return NextResponse.json({
      success: true,
      data: recommendation,
    });
  } catch (error: any) {
    console.error('API AI Recommend Build error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mendapatkan rekomendasi AI Groq.', error: error.message },
      { status: 500 }
    );
  }
}
