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

export const SITE_INFO = {
  name: 'mdfkingpc',
  tagline: 'Made For KING PC',
  slogan: 'Layanan Service & Solusi IT di Bandung',
  subSlogan: 'Teknisi berpengalaman, harga transparan, bergaransi 30 hari, dan diagnostik gratis.',
  story: 'Partner terpercaya untuk service laptop, komputer, dan solusi IT di Bandung sejak 2018.',
  address: 'Jl. Ir. H. Juanda No. 154, Dago, Kec. Coblong, Kota Bandung, Jawa Barat 40132',
  whatsapp: '6281234567890',
  whatsappFormatted: '+62 812-3456-7890',
  email: 'support@mdfkingpc.com',
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
  }
];

export const PC_PACKAGES: PCPackage[] = [
  {
    id: 'entry-esports',
    name: 'Paket Esports Starter',
    tier: 'Budget Gaming',
    price: 'Rp 5.750.000',
    processor: 'Intel Core i3 12100F / AMD Ryzen 5 4500',
    gpu: 'NVIDIA GTX 1650 4GB / AMD RX 6500 XT',
    ram: '16GB DDR4 3200MHz Dual Channel',
    storage: '512GB NVMe M.2 SSD PCIe 3.0',
    psu: '500W 80+ Bronze Certified',
    case: 'Gaming M-ATX Case + 3 RGB Fans',
    badge: 'Termurah',
    targetGames: ['Valorant 200+ FPS', 'Dota 2', 'CS2', 'Genshin Impact']
  },
  {
    id: 'mid-gaming-pro',
    name: 'Paket Mid Gaming Pro',
    tier: 'Popular Choice',
    price: 'Rp 11.950.000',
    processor: 'Intel Core i5 13400F / AMD Ryzen 5 7500F',
    gpu: 'NVIDIA RTX 4060 8GB GDDR6',
    ram: '32GB DDR5 5600MHz High Speed',
    storage: '1TB NVMe Gen4 SSD (Read 5000MB/s)',
    psu: '650W 80+ Bronze Semi-Modular',
    case: 'Aquarium Panoramic Tempered Glass Case',
    badge: 'Rekomendasi Utama',
    targetGames: ['Cyberpunk 2077 (Ray Tracing)', 'GTA V', 'EA FC 24', 'Apex Legends']
  },
  {
    id: 'ultra-workstation',
    name: 'Paket Ultra 4K & Workstation',
    tier: 'High-End Power',
    price: 'Rp 27.800.000',
    processor: 'Intel Core i7 14700K / AMD Ryzen 7 7800X3D',
    gpu: 'NVIDIA RTX 4080 Super 16GB GDDR6X',
    ram: '64GB DDR5 6000MHz RGB',
    storage: '2TB NVMe Gen4 High Speed SSD',
    psu: '850W 80+ Gold Full Modular ATX 3.0',
    case: 'Premium E-ATX Tower + 360mm AIO Liquid Cooler',
    badge: 'Monster Performance',
    targetGames: ['4K Ultra Gaming All Titles', '3D Blender Rendering', '4K Video Editing']
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    location: 'Coblong, Bandung',
    rating: 5,
    serviceType: 'Service MacBook Screen & SSD',
    quote: 'Tempat perbaikan yang rekomended buat saya. Laptop MacBook Air M1 saya layarnya mati tiba-tiba, dibawa ke mdfkingpc langsung didiagnosa gratis dan pengerjaannya cuma 1 hari. Harganya sangat transparan!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Budi Santoso',
    location: 'Dago, Bandung',
    rating: 5,
    serviceType: 'Rakit PC Gaming RTX 4060',
    quote: 'OptionTech / mdfkingpc memang terbaik! Saya rakit PC gaming di sini dari konsul spesifikasi sampai barang jadi sangat rapi. Harganya jelas tanpa biaya tersembunyi dan garansinya terjamin.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Rina Wijaya',
    location: 'Bandung Barat',
    rating: 5,
    serviceType: 'Service Keyboard Mechanical & Joystick',
    quote: 'Joystick PS5 saya drift parah dan switch keyboard Macat. Di perbaiki di mdfkingpc ganti modul Hall Effect jadi aman sentosa lagi. Pengerjaan cepat & teknisinya sangat ramah melayani.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
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
  }
];
