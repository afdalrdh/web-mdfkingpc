import { NextResponse } from 'next/server';
import { getGroqBuildRecommendation, getGroqBudgetBuildRecommendation } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, components, targetUsage, budget, userNotes } = body;

    if (mode === 'budget') {
      const parsedBudget = Number(budget) || 10000000;
      const result = await getGroqBudgetBuildRecommendation(
        parsedBudget,
        targetUsage || 'Gaming & Daily Workstation',
        userNotes
      );

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // Default to Custom Pick mode
    if (!components || typeof components !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Mohon sertakan komponen terpilih.' },
        { status: 400 }
      );
    }

    const recommendation = await getGroqBuildRecommendation(components, targetUsage);

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
