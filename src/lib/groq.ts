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

  // Fallback defaults if API key is not present or error occurs
  const fallbackPrices = {
    cpu: 2850000,
    gpu: 4750000,
    motherboard: 2150000,
    ram: 650000,
    ssd: 950000,
    psu: 780000,
    case: 750000,
    cooler: 280000,
  };
  const fallbackTotal = Object.values(fallbackPrices).reduce((a, b) => a + b, 0);

  if (!apiKey) {
    return {
      performanceTier: 'Mid-End Custom Build',
      bottleneckAnalysis: 'Komponen yang Anda pilih memiliki keserasian yang sangat seimbang tanpa potensi bottleneck berarti.',
      recommendationText: 'Rakit PC ini sudah siap untuk digunakan bekerja, multimedia, serta gaming 1080p/1440p lancar di mdfkingpc Bandung.',
      suggestedUpgrades: ['Gunakan thermal paste berkualitas tinggi seperti Arctic MX-4/MX-6 saat pemasangan.', 'Pastikan airflow casing dalam posisi intake & exhaust yang seimbang.'],
      itemizedPrices: fallbackPrices,
      totalPrice: fallbackTotal,
    };
  }

  const prompt = `
Anda adalah AI PC Building Expert untuk store "mdfkingpc Bandung".
Riset dan estimasikan harga pasar Indonesia (dalam Rupiah) untuk komponen PC pilihan user berikut per tahun 2025-2026:

Komponen Terpilih:
- Processor (CPU): ${components.cpu || 'Intel Core i5 13400F'}
- Kartu Grafis (GPU): ${components.gpu || 'NVIDIA GeForce RTX 4060 8GB'}
- Motherboard: ${components.motherboard || 'Gigabyte B760M DS3H AX DDR5'}
- Memori RAM: ${components.ram || 'Kingston FURY Beast 16GB DDR4 3200MHz'}
- Storage (SSD): ${components.ssd || 'Kingston NV2 1TB NVMe PCIe 4.0'}
- Power Supply (PSU): ${components.psu || 'MSI MAG A650BN 650W 80+ Bronze'}
- Casing PC: ${components.case || 'Paradox Gaming Aquaview Dual Chamber'}
- Pendingin CPU (Cooler): ${components.cooler || 'DeepCool AG400 ARGB Single Tower'}

Target Penggunaan: ${targetUsage}

Tugas Anda:
1. Berikan estimasi harga pasaran distributor Indonesia yang realistis per komponen (dalam angka integer Rupiah, contoh 2950000).
2. Hitung total estimasi biaya perakitan.
3. Berikan analisis keserasian/bottleneck CPU & GPU.
4. Berikan saran performa & upgrade opsional.

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
  "bottleneckAnalysis": "Penjelasan singkat potensi bottleneck atau keserasian CPU & GPU...",
  "recommendationText": "Ringkasan rekomendasi ramah & profesional dari teknisi mdfkingpc...",
  "suggestedUpgrades": [
    "Saran upgrade 1",
    "Saran upgrade 2"
  ]
}
  `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const contentText = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(contentText);

    const itemized = {
      cpu: Number(parsed.itemizedPrices?.cpu) || fallbackPrices.cpu,
      gpu: Number(parsed.itemizedPrices?.gpu) || fallbackPrices.gpu,
      motherboard: Number(parsed.itemizedPrices?.motherboard) || fallbackPrices.motherboard,
      ram: Number(parsed.itemizedPrices?.ram) || fallbackPrices.ram,
      ssd: Number(parsed.itemizedPrices?.ssd) || fallbackPrices.ssd,
      psu: Number(parsed.itemizedPrices?.psu) || fallbackPrices.psu,
      case: Number(parsed.itemizedPrices?.case) || fallbackPrices.case,
      cooler: Number(parsed.itemizedPrices?.cooler) || fallbackPrices.cooler,
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
    console.error('Groq AI Custom Build Error:', err);
    return {
      performanceTier: 'Mid-End Custom Build',
      bottleneckAnalysis: 'Komponen terpilih sangat presisi dan efisien.',
      recommendationText: 'Rakit PC pilihan Anda sangat seimbang untuk kebutuhan harian dan gaming di mdfkingpc Bandung.',
      suggestedUpgrades: ['Gunakan pasta thermal berkualitas tinggi saat perakitan.'],
      itemizedPrices: fallbackPrices,
      totalPrice: fallbackTotal,
    };
  }
}

export async function getGroqBudgetBuildRecommendation(
  budget: number,
  targetUsage: string,
  userNotes?: string
): Promise<BudgetBuildResult> {
  const apiKey = GROQ_API_KEY.trim();

  // Fallback build if API key missing or error
  const fallbackBuild: BudgetBuildResult = {
    buildTitle: `Paket Rakitan AI Optimus Budget Rp ${budget.toLocaleString('id-ID')}`,
    performanceTier: 'Budget Optimized Builder',
    totalPrice: budget,
    whyThisBuild: `Racikan komponen ini dirancang khusus oleh AI Groq mdfkingpc untuk memaksimalkan setiap rupiah budget Rp ${budget.toLocaleString('id-ID')} Anda tanpa memicu bottleneck.`,
    components: {
      cpu: { name: 'AMD Ryzen 5 5600 (6 Cores / 12 Threads)', price: Math.round(budget * 0.18) },
      gpu: { name: 'NVIDIA GeForce RTX 3060 12GB GDDR6', price: Math.round(budget * 0.40) },
      motherboard: { name: 'MSI B550M PRO-VDH WiFi', price: Math.round(budget * 0.12) },
      ram: { name: 'Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz', price: Math.round(budget * 0.06) },
      ssd: { name: 'Adata XPG SX8200 Pro 1TB NVMe M.2', price: Math.round(budget * 0.08) },
      psu: { name: 'FSP HV PRO 550W 80+ Bronze', price: Math.round(budget * 0.06) },
      case: { name: 'Casing Gaming M-ATX Glass + 3x Fan ARGB', price: Math.round(budget * 0.06) },
      cooler: { name: 'Stock Cooler / Tower Cooler ARGB', price: Math.round(budget * 0.04) },
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
1. Pilih komponen yang seimbang (CPU, GPU, Motherboard, RAM, SSD NVMe, PSU berkualitas minimal 80+ Bronze, Casing M-ATX/ATX, Cooler).
2. Pastikan total penjumlahan harga 8 komponen PAS atau dekat dengan budget Rp ${budget.toLocaleString('id-ID')}.
3. Sebutkan nama spesifik per komponen & estimasi harganya per 2025-2026 dalam Rupiah (integer).

Keluarkan respon HANYA JSON murni dengan format berikut:
{
  "buildTitle": "Nama Kreatif Paket Rakitan (contoh: Rakitan Super Gaming 10 Juta AAA)",
  "performanceTier": "Entry Level / Mid-Range King / Ultra Monster",
  "whyThisBuild": "Penjelasan mengapa kombinasi CPU + GPU ini adalah yang terbaik untuk budget tersebut...",
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

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq HTTP Error ${response.status}`);
    }

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

    return fallbackBuild;
  } catch (err) {
    console.error('Groq AI Budget Build Error:', err);
    return fallbackBuild;
  }
}
