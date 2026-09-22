export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  priceStarting: string;
  imageUrl: string;
  badge?: string;
  features: string[];
}

export interface RepairPricingItem {
  problemName: string;
  description: string;
  priceRange: string;
  estimatedTime: string;
  warranty: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  serviceType: string;
  quote: string;
  avatarUrl: string;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  snippet: string;
  content: string;
  imageUrl: string;
  readTime: string;
}

export interface PCPackage {
  id: string;
  name: string;
  tier: string;
  price: string;
  processor: string;
  gpu: string;
  ram: string;
  storage: string;
  psu: string;
  case: string;
  badge?: string;
  targetGames: string[];
}

export interface PcComponentItem {
  id: string;
  category: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'ssd' | 'psu' | 'case' | 'cooler';
  name: string;
  brand: string;
  price: number;
  specs: string;
  imageUrl?: string;
  badge?: string;
}

export const SITE_INFO = {
  name: 'mdfkingpc',
  tagline: 'Made For KING PC',
  slogan: 'Layanan Service & Solusi IT di Bandung',
  subSlogan: 'Teknisi berpengalaman, harga transparan, bergaransi 30 hari, dan diagnostik gratis.',
  story: 'Partner terpercaya untuk service laptop, komputer, dan solusi IT di Bandung sejak 2018.',
  address: 'Jl. Ir. H. Juanda No. 154, Dago, Kec. Coblong, Kota Bandung, Jawa Barat 40132',
  whatsapp: '6285158916661',
  whatsappFormatted: '+62 851-5891-6661',
  email: 'mdfkingpc@gmail.com',
  operatingHours: 'Senin - Sabtu: 09:00 - 20:00 WIB | Minggu: 10:00 - 17:00 WIB',
  stats: [
    { value: '1000+', label: 'Device Diperbaiki' },
    { value: '8+', label: 'Tahun Pengalaman' },
    { value: '99%', label: 'Tingkat Kepuasan' },
    { value: '30 Hari', label: 'Garansi Servis' },
  ],
  companyValues: [
    { title: 'Teknisi Berpengalaman', desc: 'Ditangani oleh teknisi profesional bersertifikat dengan pengalaman lebih dari 8 tahun.', icon: 'Wrench' },
    { title: 'Harga Transparan', desc: 'Estimasi biaya jelas tanpa biaya tersembunyi. Persetujuan pelanggan sebelum pengerjaan.', icon: 'ShieldCheck' },
    { title: 'Bergaransi 30 Hari', desc: 'Jaminan garansi perbaikan hingga 30 hari penuh untuk kenyamanan Anda.', icon: 'Award' },
    { title: 'Diagnostik Gratis', desc: 'Pemeriksaan awal kerusakan perangkat tanpa dipungut biaya sedikitpun.', icon: 'CheckCircle2' },
  ]
};

export const CLOUDINARY_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop',
  technicianWorking: 'https://images.unsplash.com/photo-1597872250970-45d2f34241e3?q=80&w=1000&auto=format&fit=crop',
  workshop: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
  pcGaming: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop',
  laptopRepair: 'https://images.unsplash.com/photo-1597872250970-45d2f34241e3?q=80&w=800&auto=format&fit=crop',
  macbookScreen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  ssdUpgrade: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800&auto=format&fit=crop',
  keyboardRepair: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
  mouseRepair: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
  joystickRepair: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop',
  softwareInstall: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  teamPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'servis-laptop-macbook',
    slug: 'servis-laptop-macbook',
    title: 'Service Laptop & MacBook',
    category: 'Hardware & Laptop',
    shortDesc: 'Perbaikan layar pecah, pergantian baterai, perbaikan motherboard mati total, overheat, hingga upgrade SSD NVMe cepat.',
    fullDesc: 'Layanan spesialis perbaikan segala merek laptop (Asus, Lenovo, Acer, HP, Dell, MSI) dan Apple MacBook (Air & Pro). Kami menangani kerusakan layar pecah/fleksibel, baterai cepat drop, engsel patah, terkena cairan, ic power mati total, serta pembersihan thermal paste gratis.',
    priceStarting: 'Rp 100.000',
    imageUrl: CLOUDINARY_IMAGES.macbookScreen,
    badge: 'Paling Populer',
    features: ['Diagnostik Kerusakan Gratis', 'Ganti Layar LCD & Baterai Original', 'Service Engine Motherboard/IC Power', 'Pembersihan Thermal Paste Premium']
  },
  {
    id: 'rakit-pc-gaming',
    slug: 'rakit-pc-gaming',
    title: 'Rakit PC Gaming & Workstation',
    category: 'Custom PC',
    shortDesc: 'Konsultasi spesifikasi PC Gaming dan Editing sesuai budget dengan harga komponen jelas tanpa biaya tersembunyi.',
    fullDesc: 'Layanan perakitan PC Gaming, Streaming, dan 3D Rendering profesional. Pilihan komponen original bergaransi resmi, manajemen kabel rapi (clean cable management), optimalisasi BIOS & testing benchmark stres sebelum diserahkan.',
    priceStarting: 'Rp 4.500.000',
    imageUrl: CLOUDINARY_IMAGES.pcGaming,
    badge: 'Garansi Komponen Resmi',
    features: ['Harga Transparan Tanpa Mark Up', 'Manajemen Kabel Super Rapi', 'Instalasi Windows & Driver Terbuka', 'Bonus Testing Benchmark Stres Test']
  },
  {
    id: 'servis-keyboard',
    slug: 'servis-keyboard',
    title: 'Servis Keyboard Laptop & Mechanical',
    category: 'Peripherals',
    shortDesc: 'Ganti switch mechanical keyboard, perbaikan tuts macet/lengket, dan ganti keyboard laptop internal bergaransi.',
    fullDesc: 'Perbaikan keyboard laptop tidak merespon, tuts mengetik sendiri, penggantian modul keyboard backlit, hingga modding & solder switch mechanical keyboard (Cherry MX, Gateron, Outemu).',
    priceStarting: 'Rp 75.000',
    imageUrl: CLOUDINARY_IMAGES.keyboardRepair,
    features: ['Ganti Keyboard Laptop Segala Tipe', 'Desolder & Solder Switch Mechanical', 'Pembersihan & Lube Keycap', 'Garansi Tuts Lengkap']
  },
  {
    id: 'servis-mouse',
    slug: 'servis-mouse',
    title: 'Servis Mouse Gaming & Office',
    category: 'Peripherals',
    shortDesc: 'Solusi double-click mouse gaming, ganti kabel paracord, penggantian scroll wheel sensor, dan skates PTFE.',
    fullDesc: 'Servis mouse gaming kelas atas (Logitech, Razer, SteelSeries, Glorious) yang mengalami masalah double click. Kami ganti mikro switch Omron/TTC Gold asli serta penggantian mouse skates.',
    priceStarting: 'Rp 50.000',
    imageUrl: CLOUDINARY_IMAGES.mouseRepair,
    features: ['Ganti Switch Anti Double-Click', 'Perbaikan Scroll Wheel & Encoder', 'Ganti Cable Paracord Flex', 'Pembersihan PCB Optik']
  },
  {
    id: 'servis-joystick',
    slug: 'servis-joystick',
    title: 'Servis Joystick & Controller Game',
    category: 'Gaming Gear',
    shortDesc: 'Perbaikan analog drift PS4, PS5 DualSense, Xbox Controller, Switch Joy-Con, dan tombol rubber pad.',
    fullDesc: 'Mengatasi masalah analog drift pada controller konsol dan PC. Penggantian modul potentiometer 3D analog / Hall Effect anti drift permanent, perbaikan tombol R1/L1 tidak empuk, dan ganti baterai internal.',
    priceStarting: 'Rp 65.000',
    imageUrl: CLOUDINARY_IMAGES.joystickRepair,
    badge: 'Upgrade Hall Effect',
    features: ['Upgrade Analog Hall Effect Anti Drift', 'Ganti Rubber Pad & Flexible Board', 'Kalibrasi Analog Precision Check', 'Ganti Baterai Controller']
  },
  {
    id: 'instal-aplikasi-game',
    slug: 'instal-aplikasi-game',
    title: 'Instal OS, Aplikasi & Game PC',
    category: 'Software',
    shortDesc: 'Instal ulang Windows 10/11 Original, MacOS, software desain (Adobe/Autodesk), office, dan game PC terbaru.',
    fullDesc: 'Layanan instalasi sistem operasi tercepat tanpa hilang data penting. Paket instalasi software produktivitas kerja/kuliah, tuning performa Windows anti lag, serta penginstal modul game PC lengkap.',
    priceStarting: 'Rp 50.000',
    imageUrl: CLOUDINARY_IMAGES.softwareInstall,
    features: ['Windows 10/11 & Dual Boot MacOS', 'Backup Data Penting Ambil Aman', 'Instalasi Software Design & Editing', 'Optimasi Startup & Antivirus']
  },
  {
    id: 'servis-pembersihan-pc',
    slug: 'servis-pembersihan-pc',
    title: 'Perbaikan & Pembersihan PC Desktop',
    category: 'Hardware & Maintenance',
    shortDesc: 'Deep cleaning debu komponen, penggantian thermal paste high-grade (Noctua/Arctic), manajemen kabel, & perbaikan PC no display.',
    fullDesc: 'Layanan pembersihan dan perawatan menyeluruh untuk PC Desktop Gaming, Workstation, maupun Office. Kami membersihkan debu membandel pada fan, heatsink radiator, dan motherboard menggunakan kompresor khusus anti-statis. Penggantian pasta thermal kualitas tinggi (Noctua NT-H1 / Arctic MX-6) untuk menurunkan suhu hingga 15-20°C, perbaikan PC tidak nyala/black screen, serta penataan ulang kabel agar sirkulasi udara lebih optimal.',
    priceStarting: 'Rp 85.000',
    imageUrl: CLOUDINARY_IMAGES.workshop,
    features: ['Deep Dust Cleaning Anti-Statis', 'Ganti Thermal Paste Premium High-Grade', 'Cable Re-Management Rapi', 'Perbaikan PC No Display / Auto Restart']
  }
];

export const REPAIR_PRICING_TABLES: Record<string, RepairPricingItem[]> = {
  'servis-laptop-macbook': [
    { problemName: 'Ganti Layar LCD Laptop / MacBook', description: 'Penggantian panel layar pecah, garis, atau dead pixel dengan garansi resmi.', priceRange: 'Rp 500.000 - Rp 1.800.000', estimatedTime: '1 - 3 Jam', warranty: '30 - 90 Hari' },
    { problemName: 'Ganti Baterai Original / High Quality', description: 'Solusi baterai cepat drop, kembung, atau tidak bisa diisi daya.', priceRange: 'Rp 350.000 - Rp 950.000', estimatedTime: '1 Jam', warranty: '30 - 60 Hari' },
    { problemName: 'Service Motherboard / IC Power (Mati Total)', description: 'Perbaikan komponen sirkuit utama laptop yang terkena cairan atau short circuit.', priceRange: 'Rp 350.000 - Rp 1.200.000', estimatedTime: '1 - 3 Hari', warranty: '30 Hari' },
    { problemName: 'Pembersihan Fan & Ganti Thermal Paste Premium', description: 'Pembersihan debu internal dan penyegaran Thermal Grizzly / Noctua untuk atasi overheat.', priceRange: 'Rp 100.000 - Rp 200.000', estimatedTime: '45 Menit', warranty: 'Garansi Suhu' },
    { problemName: 'Upgrade SSD NVMe & Cloning Data OS', description: 'Peningkatan kecepatan booting & buka aplikasi hingga 5x lipat dari HDD.', priceRange: 'Rp 300.000 - Rp 1.500.000', estimatedTime: '1 - 2 Jam', warranty: '1 - 3 Tahun (Komponen)' },
    { problemName: 'Perbaikan Engsel Patah & Rebuilt Casing', description: 'Penguatan dudukan engsel laptop yang lepas atau retak tanpa mengganti keseluruhan casing.', priceRange: 'Rp 150.000 - Rp 400.000', estimatedTime: '1 Hari', warranty: '30 Hari' },
  ],
  'servis-keyboard': [
    { problemName: 'Ganti Keyboard Laptop Internal', description: 'Penggantian unit keyboard laptop macet, beberapa tuts mati, atau ketik sendiri.', priceRange: 'Rp 175.000 - Rp 450.000', estimatedTime: '1 - 2 Jam', warranty: '30 Hari' },
    { problemName: 'Ganti Switch Mechanical Keyboard (Desolder / Hotswap)', description: 'Penggantian switch yang double-typing / chattering atau tidak merespon (Gateron/TTC/Outemu).', priceRange: 'Rp 15.000 / switch (Min 5)', estimatedTime: '1 - 2 Jam', warranty: '30 Hari' },
    { problemName: 'Full Custom Modding & Lube Mechanical Keyboard', description: 'Lubrication Krytox 205g0 pada switch & stabilizer, tempel foam dampener anti hampa.', priceRange: 'Rp 150.000 - Rp 350.000', estimatedTime: '1 Hari', warranty: 'Garansi Suara & Feel' },
    { problemName: 'Perbaikan PCB Controller / Kabel USB Keyboard', description: 'Servis jalur PCB putus atau penggantian kabel USB paracord braided.', priceRange: 'Rp 75.000 - Rp 200.000', estimatedTime: '1 Hari', warranty: '30 Hari' },
  ],
  'servis-mouse': [
    { problemName: 'Ganti Micro Switch Anti Double-Click (Omron / TTC Gold)', description: 'Solusi klik kiri/kanan mouse yang double-click sendiri atau tidak membal.', priceRange: 'Rp 50.000 - Rp 120.000', estimatedTime: '30 - 60 Menit', warranty: '30 Hari' },
    { problemName: 'Ganti Encoder Scroll Wheel Sensor', description: 'Mengatasi masalah scroll mouse meloncat-loncat ke atas/bawah saat diputar.', priceRange: 'Rp 60.000 - Rp 110.000', estimatedTime: '45 Menit', warranty: '30 Hari' },
    { problemName: 'Upgrade Paracord Cable Flexible', description: 'Ganti kabel kaku bawaan mouse dengan kabel ultra-light paracord terasa wireless.', priceRange: 'Rp 85.000 - Rp 150.000', estimatedTime: '1 Jam', warranty: '30 Hari' },
    { problemName: 'Ganti Skates Mouse PTFE Premium', description: 'Penggantian kaki mouse berbahan 100% Virgin Grade PTFE untuk meluncur super licin.', priceRange: 'Rp 40.000 - Rp 80.000', estimatedTime: '15 Menit', warranty: 'Garansi Licin' },
  ],
  'servis-joystick': [
    { problemName: 'Upgrade Analog Hall Effect Permanent (Anti-Drift)', description: 'Penggantian sensor 3D potentiometer analog ke Hall Effect magnetik bebas aus selamanya.', priceRange: 'Rp 85.000 - Rp 160.000 / side', estimatedTime: '1 - 2 Jam', warranty: '60 Hari' },
    { problemName: 'Ganti Conductive Rubber Pad Tombol (R1/L1/Cross/Square)', description: 'Solusi tombol stick empuk tidak balik atau tidak empuk saat ditekan.', priceRange: 'Rp 50.000 - Rp 90.000', estimatedTime: '30 Menit', warranty: '30 Hari' },
    { problemName: 'Ganti Baterai Internal Controller PS4 / PS5 / Switch', description: 'Solusi baterai controller cepat habis atau tidak mengisi daya.', priceRange: 'Rp 75.000 - Rp 180.000', estimatedTime: '30 Menit', warranty: '30 Hari' },
    { problemName: 'Perbaikan PCB Charging Board & Type-C Port', description: 'Ganti port charger yang longgar atau IC cas mati total.', priceRange: 'Rp 65.000 - Rp 140.000', estimatedTime: '1 Jam', warranty: '30 Hari' },
  ],
  'instal-aplikasi-game': [
    { problemName: 'Instal Ulang OS Windows 10 / 11 Original Driver Complete', description: 'Instalasi OS bersih anti lag + aktivasi digital resmi + driver hardware lengkap.', priceRange: 'Rp 75.000', estimatedTime: '1 - 2 Jam', warranty: 'Garansi OS 30 Hari' },
    { problemName: 'Paket Software Desain / Editing (Adobe Suite / Corel / Autodesk)', description: 'Instalasi lengkap Photoshop, Premiere, Illustrator, AutoCAD, 3ds Max, dll.', priceRange: 'Rp 50.000 - Rp 120.000', estimatedTime: '1 Jam', warranty: 'Garansi Aplikasi' },
    { problemName: 'Paket Game PC AAA & Esports Terbaru', description: 'Pengisian game PC terupdate (Valorant, CS2, Cyberpunk, GTA V, EA FC, Genshin, dll).', priceRange: 'Rp 50.000 - Rp 150.000', estimatedTime: '1 - 3 Jam', warranty: 'Garansi Bebas Crash' },
    { problemName: 'Optimasi Performance & Cleaning Antivirus Malware', description: 'Pembersihan virus, malware, bloatware, dan optimasi startup Windows anti lemot.', priceRange: 'Rp 50.000', estimatedTime: '45 Menit', warranty: '30 Hari' },
  ],
  'servis-pembersihan-pc': [
    { problemName: 'Deep Cleaning PC & Replacement Thermal Paste Premium', description: 'Pembersihan debu total fan/heatsink + ganti pasta thermal Noctua/Arctic MX-6 untuk CPU & GPU.', priceRange: 'Rp 85.000 - Rp 175.000', estimatedTime: '1 - 2 Jam', warranty: 'Garansi Suhu & Bersih' },
    { problemName: 'Perbaikan PC No Display (Lampu Nyala Tapi Layar Mati)', description: 'Pemeriksaan & perbaikan jalur RAM, slot PCIe GPU, motherboard, dan kabel power.', priceRange: 'Rp 100.000 - Rp 250.000', estimatedTime: '1 Hari', warranty: '30 Hari' },
    { problemName: 'Perbaikan PC Sering Restart / Shutdown Sendiri (Overheat)', description: 'Penanganan komprehensif overheat CPU/VGA, ganti thermal pad, & testing stres suhu.', priceRange: 'Rp 100.000 - Rp 200.000', estimatedTime: '1 Hari', warranty: '30 Hari' },
    { problemName: 'Re-Management Cable Rapi (Clean Airflow Setup)', description: 'Penataan ulang seluruh jalur kabel power supply & casing agar rapi dan aliran udara lancar.', priceRange: 'Rp 75.000 - Rp 150.000', estimatedTime: '1 - 2 Jam', warranty: 'Garansi Rapi' },
  ],
};

export const PC_COMPONENTS_DB: PcComponentItem[] = [
  // CPUs (Processors)
  { id: 'cpu-12100f', category: 'cpu', name: 'Intel Core i3 12100F (4C/8T)', brand: 'Intel', price: 1250000, specs: '4 Cores, 8 Threads, Up to 4.3 GHz, LGA1700' },
  { id: 'cpu-5600', category: 'cpu', name: 'AMD Ryzen 5 5600 (6C/12T)', brand: 'AMD', price: 1750000, specs: '6 Cores, 12 Threads, Up to 4.4 GHz, AM4' },
  { id: 'cpu-13400f', category: 'cpu', name: 'Intel Core i5 13400F (10C/16T)', brand: 'Intel', price: 2950000, specs: '10 Cores (6P+4E), 16 Threads, Up to 4.6 GHz' },
  { id: 'cpu-7500f', category: 'cpu', name: 'AMD Ryzen 5 7500F (6C/12T)', brand: 'AMD', price: 2450000, specs: '6 Cores, 12 Threads, Up to 5.0 GHz, AM5, DDR5' },
  { id: 'cpu-7800x3d', category: 'cpu', name: 'AMD Ryzen 7 7800X3D (8C/16T)', brand: 'AMD', price: 6850000, specs: 'King of Gaming CPU, 3D V-Cache, AM5', badge: 'Best Gaming CPU' },

  // GPUs (Graphics Cards)
  { id: 'gpu-rx6600', category: 'gpu', name: 'AMD Radeon RX 6600 8GB GDDR6', brand: 'AMD', price: 3150000, specs: '1080p Ultra Gaming, 8GB GDDR6, Low Power' },
  { id: 'gpu-rtx3060', category: 'gpu', name: 'NVIDIA GeForce RTX 3060 12GB GDDR6', brand: 'NVIDIA', price: 4250000, specs: '12GB VRAM, DLSS 2, Ray Tracing, Editing Choice' },
  { id: 'gpu-rtx4060', category: 'gpu', name: 'NVIDIA GeForce RTX 4060 8GB GDDR6', brand: 'NVIDIA', price: 4750000, specs: 'DLSS 3 Frame Gen, Efficient Power 115W', badge: 'Terfavorit' },
  { id: 'gpu-rtx4070super', category: 'gpu', name: 'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X', brand: 'NVIDIA', price: 10450000, specs: '1440p Maxed Ultra Gaming & 4K Ready' },

  // Motherboards
  { id: 'mb-h610', category: 'motherboard', name: 'ASRock H610M-HDV/M.2 DDR4', brand: 'ASRock', price: 950000, specs: 'LGA1700, M.2 NVMe Slot, Budget Board' },
  { id: 'mb-b550', category: 'motherboard', name: 'MSI B550M PRO-VDH WiFi', brand: 'MSI', price: 1650000, specs: 'AM4, Dual M.2, Built-in WiFi & Bluetooth' },
  { id: 'mb-b760', category: 'motherboard', name: 'Gigabyte B760M DS3H AX DDR5', brand: 'Gigabyte', price: 2250000, specs: 'LGA1700, DDR5, PCIe 4.0, WiFi 6E' },
  { id: 'mb-b650', category: 'motherboard', name: 'ASUS TUF Gaming B650M-PLUS WiFi', brand: 'ASUS', price: 3150000, specs: 'AM5, DDR5 6400MHz+, Heavy Duty VRM' },

  // RAM
  { id: 'ram-16ddr4', category: 'ram', name: 'Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz', brand: 'Kingston', price: 650000, specs: 'Dual Channel, 3200MHz CL16' },
  { id: 'ram-32ddr4', category: 'ram', name: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4 3200MHz', brand: 'Corsair', price: 1150000, specs: '32GB Capacity for Heavy Multitasking & Editing' },
  { id: 'ram-32ddr5', category: 'ram', name: 'G.Skill Ripjaws S5 32GB (2x16GB) DDR5 6000MHz CL30', brand: 'G.Skill', price: 1850000, specs: 'Low Latency DDR5 6000MHz Expo/XMP' },

  // SSD Storage
  { id: 'ssd-512gb', category: 'ssd', name: 'ADATA XPG SX8200 Pro 512GB M.2 NVMe', brand: 'ADATA', price: 550000, specs: 'Read Up to 3500 MB/s, PCIe Gen3' },
  { id: 'ssd-1tb', category: 'ssd', name: 'Kingston NV2 1TB M.2 PCIe 4.0 NVMe', brand: 'Kingston', price: 950000, specs: 'Read 3500 MB/s, 1TB High Capacity Storage' },
  { id: 'ssd-2tb-gen4', category: 'ssd', name: 'Samsung 980 PRO 2TB M.2 PCIe 4.0 NVMe', brand: 'Samsung', price: 2650000, specs: 'Flagship Speed 7000 MB/s for Gaming & Workstation' },

  // Power Supplies (PSU)
  { id: 'psu-550w', category: 'psu', name: 'DeepCool PK550D 550W 80+ Bronze', brand: 'DeepCool', price: 620000, specs: '550W 80 Plus Bronze Certified, Flat Cable' },
  { id: 'psu-650w', category: 'psu', name: 'MSI MAG A650BN 650W 80+ Bronze', brand: 'MSI', price: 780000, specs: '650W Tier-B Reliability, 80 Plus Bronze' },
  { id: 'psu-750w-gold', category: 'psu', name: 'Corsair RM750e 750W 80+ Gold Fully Modular ATX 3.0', brand: 'Corsair', price: 1650000, specs: 'Native PCIe 5.0 12VHPWR Cable, 80+ Gold' },

  // Cases
  { id: 'case-matx', category: 'case', name: 'CUBE Gaming VRED M-ATX Case + 3 RGB Fans', brand: 'CUBE Gaming', price: 420000, specs: 'Tempered Glass Side Panel, High Airflow Mesh' },
  { id: 'case-aquarium', category: 'case', name: 'Paradox Gaming Aquaview Panoramic Dual Chamber', brand: 'Paradox', price: 750000, specs: 'Aquarium Style Tempered Glass, Cable Management Space' },
  { id: 'case-montech', category: 'case', name: 'Montech AIR 903 Max E-ATX + 4x 140mm ARGB Fans', brand: 'Montech', price: 1150000, specs: 'Ultra High Airflow Mesh, Massive GPU Support' },

  // Coolers
  { id: 'cooler-stock', category: 'cooler', name: 'Stock Cooler / Basic Air Cooler', brand: 'Standard', price: 0, specs: 'Bawaan Processor / Cukup untuk Penggunaan Standar' },
  { id: 'cooler-air-ag400', category: 'cooler', name: 'DeepCool AG400 ARGB Single Tower Air Cooler', brand: 'DeepCool', price: 280000, specs: '4 Direct Touch Heatpipes, 120mm ARGB Fan' },
  { id: 'cooler-aio-240', category: 'cooler', name: 'Thermalright Frozen Prism 240 ARGB Liquid Cooler', brand: 'Thermalright', price: 850000, specs: '240mm Radiator AIO Water Cooling' },
];

export const PC_PACKAGES: PCPackage[] = [
  {
    id: 'entry-esports',
    name: 'Paket Arena Esport 1080p',
    tier: 'Entry Level Gaming',
    price: 'Rp 5.450.000',
    processor: 'AMD Ryzen 5 5600G (6 Cores / 12 Threads)',
    gpu: 'Radeon Vega 7 Integrated Graphics',
    ram: '16GB (2x8GB) DDR4 3200MHz Dual Channel',
    storage: 'SSD NVMe M.2 512GB PCIe 3.0',
    psu: '500W 80+ Bronze Certified',
    case: 'Gaming M-ATX Mesh Airflow + 3x RGB Fan',
    badge: 'Best Value Pelajar & Kantor',
    targetGames: ['Valorant 150+ FPS', 'Dota 2', 'CS:GO 2', 'GTA V', 'Genshin Impact']
  },
  {
    id: 'mid-super',
    name: 'Paket Titan RTX 4060 1440p',
    tier: 'Mid-Range AAA Gaming & Editing',
    price: 'Rp 11.850.000',
    processor: 'Intel Core i5-13400F / Ryzen 5 7500F',
    gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
    ram: '32GB (2x16GB) DDR5 5600MHz',
    storage: 'SSD NVMe Gen4 1TB Read 5000MB/s',
    psu: '650W 80+ Bronze Fully Modular',
    case: 'Panoramic Dual Chamber Tempered Glass + 4x ARGB Fan',
    badge: 'Paling Populer & Laris',
    targetGames: ['Cyberpunk 2077 Ray Tracing', 'Black Myth: Wukong', 'Valorant 350+ FPS', 'Premiere & Blender 4K']
  },
  {
    id: 'ultimate-beast',
    name: 'Paket Sovereign 4K Ultimate Rig',
    tier: 'Ultra Enthusiast & 3D Render',
    price: 'Rp 26.500.000',
    processor: 'AMD Ryzen 7 7800X3D (V-Cache Champion)',
    gpu: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB',
    ram: '32GB (2x16GB) DDR5 6000MHz CL30 EXPO',
    storage: 'SSD NVMe Gen4 2TB High Endurance',
    psu: '850W 80+ Gold PCIe 5.0 ATX 3.0 Ready',
    case: 'Full Tower Premium Aluminum + 360mm AIO Liquid Cooler ARGB',
    badge: 'Performa Tanpa Kompromi',
    targetGames: ['All AAA Games Ultra 4K 100+ FPS', 'Heavy 3D CAD & Unreal Engine 5']
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: '1',
    name: 'Rian Hidayat',
    location: 'Dipatiukur, Bandung',
    rating: 5,
    serviceType: 'Service Motherboard Laptop Asus ROG',
    quote: 'Laptop ROG saya mati total kena tumpahan kopi. Dibawa ke service center resmi divonis ganti motherboard 8 juta. Beruntung ketemu mdfkingpc, ditangani micro soldering cuma bayar 850rb langsung normal lagi. Sangat profesional!',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Putri',
    location: 'Dago Atas, Bandung',
    rating: 5,
    serviceType: 'Ganti Layar LCD MacBook Air M1',
    quote: 'Tempat perbaikan yang rekomended buat saya. Laptop MacBook Air M1 saya layarnya mati tiba-tiba, dibawa ke mdfkingpc langsung didiagnosa gratis dan pengerjaannya cuma 1 hari. Harganya sangat transparan!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Bagas Aditya',
    location: 'Buah Batu, Bandung',
    rating: 5,
    serviceType: 'Rakit PC Gaming RTX 4070',
    quote: 'Konsultasi rakit PC di sini enak banget, dicarikan harga part termurah dengan performa maksimal sesuai budget saya. Kabel management di dalam casing sangat rapi seperti rakitan pameran. Recommended!',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Kevin Jonathan',
    location: 'Sukajadi, Bandung',
    rating: 5,
    serviceType: 'Service Keyboard Mechanical & Joystick',
    quote: 'Joystick PS5 saya drift parah dan switch keyboard Macat. Di perbaiki di mdfkingpc ganti modul Hall Effect jadi aman sentosa lagi. Pengerjaan cepat & teknisinya sangat ramah melayani.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: '1',
    slug: '5-tanda-laptop-harus-upgrade-ssd',
    title: '5 Tanda Laptop Anda Sudah Harus Upgrade SSD NVMe',
    category: 'Tips Laptop',
    date: '18 September 2026',
    author: 'Teknisi mdfkingpc',
    snippet: 'Apakah laptop Anda terasa lambat saat booting atau membuka aplikasi? Ketahui 5 indikator utama saatnya beralih dari HDD ke SSD NVMe super cepat.',
    content: `Apakah laptop Anda membutuhkan waktu hingga berdetik-detik hanya untuk menyala? Laptop dengan Harddisk (HDD) konvensional kini sering mengalami kemacetan sistem karena beban sistem operasi modern seperti Windows 11.

Berikut adalah 5 tanda utama laptop Anda perlu segera di-upgrade ke SSD:
1. Booting Windows Membutuhkan Waktu Lebih dari 1 Menit.
2. Disk Usage di Task Manager Selalu 100%.
3. Bunyi Berisik "Krek-krek" Dari Harddisk Internal.
4. Aplikasi Sering Not Responding Saat Membuka File Berat.
5. Laptop Terasa Panas Meskipun Tidak Menjalankan Game.

Di mdfkingpc Bandung, kami menyediakan paket Upgrade SSD hemat termasuk gratis migrasi data tanpa instal ulang dari awal!`,
    imageUrl: CLOUDINARY_IMAGES.ssdUpgrade,
    readTime: '4 menit baca'
  },
  {
    id: '2',
    slug: 'cara-mengatasi-analog-controller-drift',
    title: 'Cara Mengatasi Analog Controller Drift pada Stick PS5 & PC',
    category: 'Hardware & PC',
    date: '12 September 2026',
    author: 'Teknisi mdfkingpc',
    snippet: 'Karakter game berjalan sendiri? Simak panduan teknis mengenai penyebab analog drift dan solusi terbaik penggantian ke modul Hall Effect.',
    content: `Analog drift merupakan masalah paling populer di antara gamer PlayStation 5, Switch Joy-Con, dan Xbox Controller. Karakter atau kamera bergerak sendiri tanpa disentuh.

Mengapa Drift Bisa Terjadi?
Sebagian besar controller standar menggunakan potentiometer berbasis karbon yang aus setelah 300-400 jam penggunaan. Gesekan fisik menyebabkan serbuk karbon menempel dan mengirimkan sinyal palsu.

Solusi Permanen: Upgrade ke Hall Effect Analog Sensor!
Modul Hall Effect menggunakan teknologi magnetik tanpa gesekan fisik. Hasilnya, potentiometer tidak akan aus dan bebas drift selamanya. mdfkingpc melayani servis & upgrade modul Hall Effect untuk stick PS4, PS5, Switch, dan Xbox.`,
    imageUrl: CLOUDINARY_IMAGES.joystickRepair,
    readTime: '5 menit baca'
  },
  {
    id: '3',
    slug: 'panduan-memilih-komponen-pc-gaming-2026',
    title: 'Panduan Memilih Komponen PC Gaming Sesuai Budget',
    category: 'Hardware & PC',
    date: '05 September 2026',
    author: 'Admin mdfkingpc',
    snippet: 'Ingin rakit PC tetapi bingung menentukan alokasi dana antar Processor, VGA Card, dan RAM? Pelajari formula alokasi budget rakit PC yang ideal.',
    content: `Merapikan dana untuk merakit PC Gaming memerlukan perencanaan yang matang agar tidak terjadi penyempitan performa (bottleneck).

Alokasi Ideal Budget Rakit PC Gaming:
- GPU / Kartu Grafis: 40% - 45% dari total budget.
- Processor (CPU): 20% - 25% dari total budget.
- Motherboard & RAM: 15% - 20%.
- Power Supply (PSU) & Storage: 15%.

Jangan pernah menghemat biaya pada Power Supply (PSU). PSU berkualitas buruk berisiko merusak komponen mahal seperti GPU dan Processor. Tim mdfkingpc siap membantu konsultasi rakit PC gratis dengan transparansi harga jelas!`,
    imageUrl: CLOUDINARY_IMAGES.pcGaming,
    readTime: '6 menit baca'
  },
  {
    id: '4',
    slug: 'pentingnya-ganti-thermal-paste-laptop-pc',
    title: 'Pentingnya Ganti Thermal Paste & Deep Cleaning Berkala',
    category: 'Hardware & PC',
    date: '28 Agustus 2026',
    author: 'Teknisi mdfkingpc',
    snippet: 'Suhu laptop atau PC menembus 85°C saat bekerja berat? Pahami siklus ideal penggantian pasta pendingin dan pembersihan debu.',
    content: `Panas berlebih (overheat) adalah musuh utama umur pakai processor dan kartu grafis. Seiring waktu, thermal paste bawaan pabrik akan mengering dan mengeras dalam kurun waktu 12 hingga 18 bulan.

Tanda-tanda perangkat mengalami overheat:
1. Suara kipas terdengar berdengung kencang terus-menerus.
2. Terjadi thermal throttling (penurunan performa FPS drop tiba-tiba).
3. Komputer mendadak mati sendiri (auto-shutdown untuk proteksi suhu).

Di workshop mdfkingpc Bandung, layanan deep cleaning menggunakan kompresor anti-statis dan penggantian thermal paste kualitas tinggi (Noctua / Arctic MX-6) yang terbukti menurunkan suhu kerja secara signifikan.`,
    imageUrl: CLOUDINARY_IMAGES.workshop,
    readTime: '3 menit baca'
  },
  {
    id: '5',
    slug: 'tips-merawat-keyboard-mechanical-bebas-double-click',
    title: 'Tips Merawat Keyboard Mechanical Bebas Debu & Double Click',
    category: 'Hardware & PC',
    date: '20 Agustus 2026',
    author: 'Admin mdfkingpc',
    snippet: 'Hindari switch macet atau ketik dobel dengan langkah perawatan rutin keycap dan desoldering switch berkala.',
    content: `Keyboard mechanical rentan kemasukan debu halus, remah makanan, dan kelembapan yang menyebabkan switch berkarat atau double-click.

Tips perawatan rutin keyboard mechanical:
1. Bersihkan keycap secara teratur menggunakan keycap puller.
2. Hindari makan dan minum di dekat setup keyboard.
3. Jangan gunakan cairan pembersih berlebih langsung ke switch.
4. Jika switch mulai double-click, lakukan desoldering dan penggantian switch satuan di mdfkingpc.`,
    imageUrl: CLOUDINARY_IMAGES.keyboardRepair,
    readTime: '4 menit baca'
  },
  {
    id: '6',
    slug: 'kenali-gejala-motherboard-laptop-rusak',
    title: 'Kenali Gejala Motherboard Laptop Rusak & Solusinya',
    category: 'Tips Laptop',
    date: '15 Agustus 2026',
    author: 'Teknisi mdfkingpc',
    snippet: 'Mati total, tidak bisa charging, atau kipas menyala tanpa tampilan? Pahami penanganan sirkuit IC power oleh teknisi ahli.',
    content: `Kerusakan pada motherboard atau logic board laptop sering kali ditakuti karena biaya pergantian unit utuh yang sangat mahal. Padahal, 80% kasus motherboard rusak sebenarnya bisa diperbaiki di level komponen (component-level micro-soldering).

Gejala umum kerusakan motherboard:
1. Laptop mati total (no power) meskipun charger berfungsi normal.
2. Lampu indikator berkedip tetapi layar tetap hitam (no display).
3. Baterai tidak terdeteksi atau pengisian daya terputus-putus.

Teknisi spesialis mdfkingpc Bandung memiliki peralatan mikrosolder dan osiloskop untuk melacak jalur short circuit pada IC charging, mosfet, dan chipset tanpa harus ganti motherboard baru.`,
    imageUrl: CLOUDINARY_IMAGES.technicianWorking,
    readTime: '5 menit baca'
  },
  {
    id: '7',
    slug: 'panduan-memilih-power-supply-pc-gaming',
    title: 'Panduan Memilih Power Supply (PSU) Berkualitas untuk PC Gaming',
    category: 'Hardware & PC',
    date: '08 Agustus 2026',
    author: 'Admin mdfkingpc',
    snippet: 'Memahami sertifikasi 80 Plus Bronze hingga Gold agar komponen VGA dan CPU terlindungi dari lonjakan daya listrik.',
    content: `Power Supply Unit (PSU) adalah jantung dari sebuah sistem PC Gaming. PSU yang buruk tidak hanya menyebabkan restart tiba-tiba, namun juga dapat menghantarkan tegangan tidak stabil yang berisiko merusak komponen sensitif.

Poin penting saat memilih PSU:
1. Pilih PSU dengan sertifikasi minimal 80 Plus Bronze dari merk teruji (Corsair, Seasonic, be quiet!, MSI, Cooler Master).
2. Berikan headroom daya minimal 20-30% di atas total konsumsi daya komponen (TDP).
3. Utamakan PSU yang memiliki proteksi lengkap seperti OVP, UVP, OCP, OTP, dan SCP.`,
    imageUrl: CLOUDINARY_IMAGES.pcGaming,
    readTime: '4 menit baca'
  }
];
