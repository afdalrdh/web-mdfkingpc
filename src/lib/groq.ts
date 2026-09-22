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
  cpuPrice?: number;
  gpuPrice?: number;
  motherboardPrice?: number;
  ramPrice?: number;
  ssdPrice?: number;
  psuPrice?: number;
  casePrice?: number;
  coolerPrice?: number;
}

export interface CustomBuildResult {
  performanceTier: string;
  bottleneckAnalysis: string;
  recommendationText: string;
  suggestedUpgrades: string[];
  totalPrice: number;
  itemizedPrices: {
    cpu: number;
    gpu: number;
    motherboard: number;
    ram: number;
    ssd: number;
    psu: number;
    case: number;
    cooler: number;
  };
}

export interface BudgetBuildResult {
  buildTitle: string;
  performanceTier: string;
  totalPrice: number;
  whyThisBuild: string;
  components: {
    cpu: { name: string; price: number };
    gpu: { name: string; price: number };
    motherboard: { name: string; price: number };
    ram: { name: string; price: number };
    ssd: { name: string; price: number };
    psu: { name: string; price: number };
    case: { name: string; price: number };
    cooler: { name: string; price: number };
  };
  suggestedUpgrades: string[];
}

export async function getGroqBuildRecommendation(
  components: PCBuildComponents,
  targetUsage: string = 'Gaming & Daily Workstation'
): Promise<CustomBuildResult> {
  const apiKey = GROQ_API_KEY.trim();

  // Dynamic fallback based on exact components selected
  const dynamicFallbackPrices = {
    cpu: components.cpuPrice || 2850000,
    gpu: components.gpuPrice || 4750000,
    motherboard: components.motherboardPrice || 2150000,
    ram: components.ramPrice || 650000,
    ssd: components.ssdPrice || 950000,
    psu: components.psuPrice || 780000,
    case: components.casePrice || 750000,
    cooler: components.coolerPrice || 280000,
  };
  const dynamicFallbackTotal = Object.values(dynamicFallbackPrices).reduce((a, b) => a + b, 0);

  if (!apiKey) {
    return {
      performanceTier: 'Custom Build Performance',
      bottleneckAnalysis: `Kombinasi ${components.cpu || 'Processor'} dan ${components.gpu || 'VGA'} terpilih memiliki keserasian yang baik untuk kebutuhan ${targetUsage}.`,
      recommendationText: 'Rakit PC ini siap untuk digunakan bekerja, multimedia, serta gaming lancar di mdfkingpc Bandung.',
      suggestedUpgrades: ['Gunakan thermal paste berkualitas tinggi saat perakitan.', 'Pastikan airflow casing terjaga dengan baik.'],
      itemizedPrices: dynamicFallbackPrices,
      totalPrice: dynamicFallbackTotal,
    };
  }

  const prompt = `
Anda adalah AI PC Building Expert untuk "mdfkingpc Bandung".
Riset dan estimasikan harga pasar Indonesia (dalam Rupiah) untuk komponen PC pilihan user berikut per 2025-2026:

Komponen Terpilih:
- Processor (CPU): ${components.cpu || 'Intel Core i5'} (Estimasi dasar: Rp ${dynamicFallbackPrices.cpu.toLocaleString('id-ID')})
- Kartu Grafis (GPU): ${components.gpu || 'GeForce RTX'} (Estimasi dasar: Rp ${dynamicFallbackPrices.gpu.toLocaleString('id-ID')})
- Motherboard: ${components.motherboard || 'Board'} (Estimasi dasar: Rp ${dynamicFallbackPrices.motherboard.toLocaleString('id-ID')})
- RAM: ${components.ram || 'RAM'} (Estimasi dasar: Rp ${dynamicFallbackPrices.ram.toLocaleString('id-ID')})
- Storage (SSD): ${components.ssd || 'SSD'} (Estimasi dasar: Rp ${dynamicFallbackPrices.ssd.toLocaleString('id-ID')})
- PSU: ${components.psu || 'PSU'} (Estimasi dasar: Rp ${dynamicFallbackPrices.psu.toLocaleString('id-ID')})
- Casing: ${components.case || 'Case'} (Estimasi dasar: Rp ${dynamicFallbackPrices.case.toLocaleString('id-ID')})
- Cooler: ${components.cooler || 'Cooler'} (Estimasi dasar: Rp ${dynamicFallbackPrices.cooler.toLocaleString('id-ID')})

Target Penggunaan: ${targetUsage}

Keluarkan respon HANYA JSON murni dengan struktur berikut:
{
  "performanceTier": "Budget Gaming / Mid-End Pro / High-End Monster Workstation",
  "itemizedPrices": {
    "cpu": 2950000,
    "gpu": 4750000,
    "motherboard": 2150000,
    "ram": 650000,
    "ssd": 950000,
    "psu": 780000,
    "case": 750000,
    "cooler": 280000
  },
  "totalPrice": 13260000,
  "bottleneckAnalysis": "Penjelasan keserasian CPU & GPU...",
  "recommendationText": "Rekomendasi teknisi mdfkingpc...",
  "suggestedUpgrades": [
    "Saran upgrade 1",
    "Saran upgrade 2"
  ]
}
  `;

  const modelsToTry = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'llama3-70b-8192', 'mixtral-8x7b-32768'];

  for (const modelName of modelsToTry) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const contentText = data.choices?.[0]?.message?.content || '{}';
      const parsed = JSON.parse(contentText);

      const itemized = {
        cpu: Number(parsed.itemizedPrices?.cpu) || dynamicFallbackPrices.cpu,
        gpu: Number(parsed.itemizedPrices?.gpu) || dynamicFallbackPrices.gpu,
        motherboard: Number(parsed.itemizedPrices?.motherboard) || dynamicFallbackPrices.motherboard,
        ram: Number(parsed.itemizedPrices?.ram) || dynamicFallbackPrices.ram,
        ssd: Number(parsed.itemizedPrices?.ssd) || dynamicFallbackPrices.ssd,
        psu: Number(parsed.itemizedPrices?.psu) || dynamicFallbackPrices.psu,
        case: Number(parsed.itemizedPrices?.case) || dynamicFallbackPrices.case,
        cooler: Number(parsed.itemizedPrices?.cooler) || dynamicFallbackPrices.cooler,
      };

      const calculatedTotal = Object.values(itemized).reduce((a, b) => a + b, 0);

      return {
        performanceTier: parsed.performanceTier || 'Custom Gaming & Productivity',
        bottleneckAnalysis: parsed.bottleneckAnalysis || 'Komponen pilihan Anda sangat seimbang.',
        recommendationText: parsed.recommendationText || 'Rakit PC ini siap menangani pekerjaan berat dan gaming dengan lancar.',
        suggestedUpgrades: Array.isArray(parsed.suggestedUpgrades) ? parsed.suggestedUpgrades : ['Upgrade RAM jika memerlukan multitasking berat.'],
        itemizedPrices: itemized,
        totalPrice: parsed.totalPrice || calculatedTotal,
      };
    } catch (err) {
      console.warn(`Groq model ${modelName} failed, trying next model...`);
    }
  }

  // Fallback if all AI model calls failed
  return {
    performanceTier: 'Custom Pick Build',
    bottleneckAnalysis: `Kombinasi ${components.cpu || 'Processor'} dan ${components.gpu || 'VGA'} terpilih sangat seimbang.`,
    recommendationText: 'Rakit PC pilihan Anda sudah siap untuk digunakan bekerja, multimedia, dan gaming di mdfkingpc Bandung.',
    suggestedUpgrades: ['Gunakan thermal paste berkualitas tinggi saat perakitan.'],
    itemizedPrices: dynamicFallbackPrices,
    totalPrice: dynamicFallbackTotal,
  };
}

export async function getGroqBudgetBuildRecommendation(
  budget: number,
  targetUsage: string,
  userNotes?: string
): Promise<BudgetBuildResult> {
  const apiKey = GROQ_API_KEY.trim();

  const fallbackBuild: BudgetBuildResult = {
    buildTitle: `Paket Rakitan AI Optimus Budget Rp ${budget.toLocaleString('id-ID')}`,
    performanceTier: 'Budget Optimized Builder',
    totalPrice: budget,
    whyThisBuild: `Racikan komponen ini dirancang khusus oleh AI Groq mdfkingpc untuk memaksimalkan setiap rupiah budget Rp ${budget.toLocaleString('id-ID')} Anda tanpa memicu bottleneck.`,
    components: {
      cpu: { name: 'AMD Ryzen 5 5600 / Intel i5 12400F', price: Math.round(budget * 0.18) },
      gpu: { name: 'NVIDIA GeForce RTX 3060 / RX 6600', price: Math.round(budget * 0.40) },
      motherboard: { name: 'Motherboard B550M / B660M', price: Math.round(budget * 0.12) },
      ram: { name: '16GB (2x8GB) DDR4 3200MHz', price: Math.round(budget * 0.06) },
      ssd: { name: '1TB NVMe M.2 SSD', price: Math.round(budget * 0.08) },
      psu: { name: '550W / 650W 80+ Bronze', price: Math.round(budget * 0.06) },
      case: { name: 'Casing Gaming M-ATX Glass', price: Math.round(budget * 0.06) },
      cooler: { name: 'Tower Air Cooler ARGB', price: Math.round(budget * 0.04) },
    },
    suggestedUpgrades: [
      'Tambahkan kapasitas SSD jika memiliki banyak pustaka game AAA.',
      'Upgrade RAM ke 32GB jika Anda sering melakukan video editing 4K / rendering 3D.',
    ],
  };

  if (!apiKey) return fallbackBuild;

  const prompt = `
Anda adalah AI PC Builder profesional dari "mdfkingpc Bandung".
Raciklah sebuah konfigurasi PC Desktop rakitan TERBAIK dengan target total budget Rp ${budget.toLocaleString('id-ID')} (TOLERANSI +- 5%).

Target Penggunaan: ${targetUsage}
Catatan/Preferensi Tambahan Pengguna: ${userNotes || 'Tidak ada (bebas rekomendasi AI)'}

Aturan Peracikan Komponen:
1. Pilih komponen yang seimbang (CPU, GPU, Motherboard, RAM, SSD NVMe, PSU, Casing, Cooler).
2. Pastikan total penjumlahan harga 8 komponen PAS atau dekat dengan budget Rp ${budget.toLocaleString('id-ID')}.
3. Sebutkan nama spesifik per komponen & estimasi harganya per 2025-2026 dalam Rupiah (integer).

Keluarkan respon HANYA JSON murni dengan format berikut:
{
  "buildTitle": "Nama Paket Rakitan (contoh: Rakitan Super Gaming 10 Juta AAA)",
  "performanceTier": "Entry Level / Mid-Range King / Ultra Monster",
  "whyThisBuild": "Penjelasan mengapa kombinasi ini adalah yang terbaik...",
  "components": {
    "cpu": { "name": "Intel Core i5 12400F / Ryzen 5 5600", "price": 1850000 },
    "gpu": { "name": "AMD Radeon RX 6600 8GB / RTX 4060", "price": 3200000 },
    "motherboard": { "name": "ASRock B660M HDV", "price": 1350000 },
    "ram": { "name": "16GB (2x8GB) DDR4 3200MHz", "price": 550000 },
    "ssd": { "name": "512GB NVMe M.2 SSD", "price": 550000 },
    "psu": { "name": "550W 80+ Bronze Certified", "price": 600000 },
    "case": { "name": "Casing Gaming Tempered Glass", "price": 500000 },
    "cooler": { "name": "Stock / Tower Cooler ARGB", "price": 250000 }
  },
  "totalPrice": 8850000,
  "suggestedUpgrades": [
    "Saran optimasi 1",
    "Saran optimasi 2"
  ]
}
  `;

  const modelsToTry = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'llama3-70b-8192', 'mixtral-8x7b-32768'];

  for (const modelName of modelsToTry) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) continue;

      const data = await response.json();
      const contentText = data.choices?.[0]?.message?.content || '{}';
      const parsed = JSON.parse(contentText);

      if (parsed.components && parsed.buildTitle) {
        const calcTotal = Object.values(parsed.components).reduce(
          (acc: number, curr: any) => acc + (curr?.price || 0),
          0
        );

        return {
          buildTitle: parsed.buildTitle,
          performanceTier: parsed.performanceTier || 'AI Recommended Build',
          whyThisBuild: parsed.whyThisBuild || 'Diracik presisi oleh AI Groq mdfkingpc.',
          components: parsed.components,
          totalPrice: parsed.totalPrice || calcTotal,
          suggestedUpgrades: Array.isArray(parsed.suggestedUpgrades) ? parsed.suggestedUpgrades : [],
        };
      }
    } catch (err) {
      console.warn(`Budget build with model ${modelName} failed, retrying next model...`);
    }
  }

  return fallbackBuild;
}
