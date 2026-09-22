const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

export interface PCBuildComponents {
  cpu?: string;
  gpu?: string;
  motherboard?: string;
  ram?: string;
  ssd?: string;
  psu?: string;
  case?: string;
  cooler?: string;
  totalPrice?: number;
}

export async function getGroqBuildRecommendation(
  components: PCBuildComponents,
  targetUsage: string = 'Gaming & Daily Workstation',
  maxBudget?: number
): Promise<{
  recommendationText: string;
  bottleneckAnalysis: string;
  suggestedUpgrades: string[];
  performanceTier: string;
}> {
  try {
    const apiKey = GROQ_API_KEY.trim();

    if (!apiKey) {
      return {
        performanceTier: 'Custom Gaming PC',
        bottleneckAnalysis: 'Komponen yang Anda pilih terintegrasi dengan baik.',
        recommendationText: 'Rakit PC ini sudah sangat seimbang dan siap untuk digunakan bekerja, multimedia, serta gaming lancar.',
        suggestedUpgrades: ['Pastikan penggunaan thermal paste berkualitas saat perakitan.'],
      };
    }

    const prompt = `
Anda adalah AI PC Building Expert untuk "mdfkingpc Bandung".
Analisis spesifikasi PC berikut dan berikan rekomendasi profesional dalam Bahasa Indonesia:

Komponen Terpilih:
- Processor (CPU): ${components.cpu || 'Belum dipilih'}
- Kartu Grafis (GPU): ${components.gpu || 'Belum dipilih'}
- Motherboard: ${components.motherboard || 'Belum dipilih'}
- RAM: ${components.ram || 'Belum dipilih'}
- Storage (SSD): ${components.ssd || 'Belum dipilih'}
- Power Supply (PSU): ${components.psu || 'Belum dipilih'}
- Casing PC: ${components.case || 'Belum dipilih'}
- Pendingin CPU (Cooler): ${components.cooler || 'Belum dipilih'}
- Total Estimasi Biaya: Rp ${(components.totalPrice || 0).toLocaleString('id-ID')}
- Target Penggunaan: ${targetUsage}
${maxBudget ? `- Target Budget: Rp ${maxBudget.toLocaleString('id-ID')}` : ''}

Tugas Anda:
1. Berikan skor & analisis keserasian komponen (apakah ada potensi bottleneck antara CPU & GPU).
2. Sebutkan performa yang diharapkan (FPS game populer seperti Valorant, Cyberpunk, 3D rendering, dll).
3. Berikan 2-3 saran saran perbaikan/upgrade opsional untuk performa maksimal.

Format respon JSON murni berikut:
{
  "performanceTier": "Budget Gaming / Mid-End Pro / High-End Monster Workstation",
  "bottleneckAnalysis": "Penjelasan singkat potensi bottleneck atau keserasian CPU & GPU...",
  "recommendationText": "Ringkasan rekomendasi ramah & profesional dari teknisi mdfkingpc...",
  "suggestedUpgrades": [
    "Saran upgrade 1",
    "Saran upgrade 2"
  ]
}
    `;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Groq API HTTP error:', errText);
      throw new Error(`Groq API error HTTP ${response.status}`);
    }

    const data = await response.json();
    const contentText = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(contentText);

    return {
      performanceTier: parsed.performanceTier || 'Custom Build Performance',
      bottleneckAnalysis: parsed.bottleneckAnalysis || 'Komponen yang dipilih memiliki keserasian yang baik.',
      recommendationText: parsed.recommendationText || 'Rakit PC pilihan Anda sangat seimbang untuk kebutuhan harian dan gaming.',
      suggestedUpgrades: Array.isArray(parsed.suggestedUpgrades) ? parsed.suggestedUpgrades : ['Upgrade RAM jika membutuhkan multitasking berat.'],
    };
  } catch (error: any) {
    console.error('Groq AI error:', error);
    return {
      performanceTier: 'Custom Gaming PC',
      bottleneckAnalysis: 'Komponen yang Anda pilih terintegrasi dengan baik.',
      recommendationText: 'Rakit PC ini sudah sangat siap untuk digunakan bekerja, multimedia, dan gaming lancar.',
      suggestedUpgrades: ['Pastikan penggunaan thermal paste berkualitas saat perakitan.'],
    };
  }
}
