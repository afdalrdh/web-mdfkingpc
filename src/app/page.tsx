'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, Clock, Star, 
  Sparkles, MessageSquare, Info, ChevronRight, Zap, Check, ThumbsUp,
  Laptop, Cpu, Keyboard, Mouse, Gamepad2, Trophy, Flame
} from 'lucide-react';
import { SITE_INFO, SERVICES_LIST, TESTIMONIALS_LIST, BLOG_POSTS, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function HomePage() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Form consultation state
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultCategory, setConsultCategory] = useState('Rakit PC Gaming');
  const [consultMessage, setConsultMessage] = useState('');

  const brandLogos = [
    'Intel Core Ultra', 'AMD Ryzen', 'NVIDIA GeForce RTX', 'ASUS ROG', 
    'MSI Gaming', 'Corsair', 'Gigabyte AORUS', 'Razer', 'Noctua', 'Lian Li'
  ];

  // Accordion Items matching Hitboox Section 5
  const serviceSteps = [
    {
      num: '01',
      title: 'Servis Laptop & Apple MacBook',
      tag: 'Microsoldering & LCD',
      desc: 'Penanganan kerusakan hardware tingkat sirkuit: mati total karena korsleting IC power, layar pecah, pergantian baterai original, engsel patah, hingga reballing chip.',
      features: ['Diagnostik Kerusakan Gratis Rp 0', 'Suku Cadang Layar & Baterai Original', 'Perbaikan Jalur Motherboard / Logic Board', 'Garansi Pengerjaan Hingga 90 Hari'],
      image: CLOUDINARY_IMAGES.macbookScreen,
      href: '/layanan/servis-laptop-macbook',
    },
    {
      num: '02',
      title: 'Rakit PC Gaming & Workstation',
      tag: 'Custom Rig & Watercooling',
      desc: 'Perakitan kustom PC gaming, streaming, dan workstation rendering 3D. Komponen original bergaransi distributor, cable management rapi tanpa kompromi, dan burn-in stress test 24 jam.',
      features: ['Simulasi Harga Komponen Transparan Tanpa Mark Up', 'Kustomisasi Loop Watercooling & Fan Flow', 'Instalasi Driver & Windows Optimasi Gaming', 'Benchmark Stres Test Suhu Maksimal'],
      image: CLOUDINARY_IMAGES.pcGaming,
      href: '/layanan/rakit-pc-gaming',
    },
    {
      num: '03',
      title: 'Servis Keyboard Mechanical & Mouse',
      tag: 'Tuning & Modding',
      desc: 'Solusi double-click mouse gaming dengan switch Omron/TTC Gold asli, ganti kabel paracord fleksibel, modding keyboard mechanical (lubing Krytox, tempest tape mod, foam dampener).',
      features: ['Desoldering & Solder Switch Presisi', 'Tuning Stabilizer Anti-Rattle & Lube Krytox', 'Penggantian Skates Kaki Mouse PTFE 100%', 'Garansi Tuts & Feel Ketikan Enak'],
      image: CLOUDINARY_IMAGES.keyboardRepair,
      href: '/layanan/servis-keyboard',
    },
    {
      num: '04',
      title: 'Modifikasi Gamepad Hall Effect (Anti-Drift)',
      tag: 'Magnetic Sensor',
      desc: 'Solusi permanen analog stick drift untuk PS5 DualSense, PS4, Xbox Wireless, dan Switch Pro Controller. Penggantian modul sensor menggunakan magnetik Hall Effect bebas aus selamanya.',
      features: ['Eliminasi Drift Selamanya Tanpa Potensiometer Karbon', 'Kalibrasi Center Point & Circularity Test', 'Penggantian Rubber Pad & Tactile Button', 'Pengerjaan Cepat 1-2 Jam Siap Pakai'],
      image: CLOUDINARY_IMAGES.joystickRepair,
      href: '/layanan/servis-joystick',
    },
    {
      num: '05',
      title: 'Deep Cleaning, Repaste & Overhaul PC',
      tag: 'Thermal Management',
      desc: 'Perawatan menyeluruh PC desktop dan laptop. Pembersihan debu menggunakan kompresor anti-statis, penggantian thermal paste high-grade (Noctua/Arctic), dan penataan sirkulasi udara dingin.',
      features: ['Penurunan Suhu Panas Ekstrem 15 - 20°C', 'Thermal Paste Kualitas Kompetisi (Noctua/Arctic)', 'Cable Re-Management Airflow Lancar', 'Solusi PC Sering Shutdown / No Display'],
      image: CLOUDINARY_IMAGES.workshop,
      href: '/layanan/servis-pembersihan-pc',
    },
  ];



  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo mdfkingpc, saya ${consultName} ingin konsultasi layanan ${consultCategory}.\nNomor: ${consultPhone}\nDetail: ${consultMessage || 'Mohon info estimasi biaya.'}`;
    window.open(`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-white text-slate-900 font-sans">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (HITBOOX SPLIT-PANEL SHOWCASE BANNER WITH CUT-CORNERS)   */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Container with Chamfered Bottom Cut-Corner */}
          <div className="relative rounded-3xl cut-corner-container-lg overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center shadow-2xl border border-slate-800">
            
            {/* Split Multi-Column Dynamic Hardware Panels (Hitboox 4-5 Split Columns) */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 opacity-40 mix-blend-luminosity hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="relative h-full border-r border-slate-800/60 overflow-hidden">
                <Image src={CLOUDINARY_IMAGES.pcGaming} alt="Rig 1" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-slate-800/60 overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.macbookScreen} alt="Rig 2" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-slate-800/60 overflow-hidden">
                <Image src={CLOUDINARY_IMAGES.workshop} alt="Rig 3" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-slate-800/60 overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.keyboardRepair} alt="Rig 4" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.joystickRepair} alt="Rig 5" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
            </div>

            {/* Dark Radial Gradient & Tech Grid Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

            {/* Hero Content Area */}
            <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-16 max-w-4xl lg:max-w-5xl xl:max-w-6xl space-y-6">
              {/* Hitboox Subtitle Tag with Accent Bar */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>#1 Solusi Servis IT & Rakit PC Studio di Bandung</span>
              </div>

              {/* Massive Bold Realce Headline - Strictly 2 Lines */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight text-white leading-[1.08] font-display uppercase">
                <span className="block whitespace-nowrap">BUILT FOR PERFORMANCE.</span>
                <span className="block whitespace-nowrap text-blue-500">SERVICED WITH PRECISION.</span>
              </h1>

              {/* Clean General Sans Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans font-normal">
                Laboratorium servis perbaikan laptop, Apple MacBook, upgrade gear gaming, dan perakitan PC kustom dengan standar craftmanship tertinggi di Bandung.
              </p>

              {/* Hitboox Cut-Corner Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/layanan"
                  className="btn-hitboox btn-hitboox-white text-xs !py-3.5 !px-8 shadow-xl font-bold tracking-wider"
                >
                  <span>EXPLORE LAYANAN</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link
                  href="/pemesanan"
                  className="btn-hitboox btn-hitboox-primary text-xs !py-3.5 !px-8 shadow-pill-blue font-bold tracking-wider"
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  <span>KONSULTASI SEKARANG</span>
                </Link>
              </div>

              {/* Trust Badges Minimalist Row */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Garansi Resmi 30 Hari</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Diagnostik Awal Rp 0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Pengerjaan Cepat 1-2 Jam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. ABOUT / FOCUS SECTION WITH FLOATING RIG & 4 BIG METRIC COUNTERS       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                WE FOCUS ON HIGH PERFORMANCE RIGS & PERFECT REPAIRS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-display uppercase">
              DEDIKASI KAMI UNTUK PERFORMA HARDWARE MAKSIMAL & HASIL SERVIS SEMPURNA
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              mdfkingpc didirikan dengan satu komitmen: menghadirkan solusi hardware komputer dan laptop yang transparan tanpa mark-up biaya membingungkan. Dari penanganan mikrosoldering logic board yang rumit hingga perakitan rig PC gaming bersirkulasi dingin, seluruh pekerjaan dikerjakan oleh teknisi spesialis bersertifikasi.
            </p>

            <div className="pt-2">
              <Link
                href="/tentang-kami"
                className="btn-hitboox btn-hitboox-primary text-xs !py-3 !px-7 font-bold tracking-wider"
              >
                <span>TENTANG WORKSHOP KAMI</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Floating Visual Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl cut-corner-card overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
              <Image
                src={CLOUDINARY_IMAGES.workshop}
                alt="mdfkingpc Precision Lab"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  Laboratorium Dago Bandung
                </span>
                <h4 className="text-sm font-bold mt-1">Peralatan Mikrosolder & Kompresor Anti-Statis Modern</h4>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl cut-corner-card animate-float hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                  <span>4.9 / 5.0</span>
                  <span className="text-[9px] text-amber-700 bg-amber-100 px-1 rounded font-bold">Google Review</span>
                </div>
                <span className="text-[11px] text-slate-500">30.000+ Pengguna Puas</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Big Counter Metrics (Hitboox 15+ / 100% / 75K+ / 30K+ Counters) */}
        <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 font-display">15+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Tahun Pengalaman</h4>
            <p className="text-[11px] text-slate-500">Teknisi spesialis hardware bersertifikasi</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 font-display">100%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Komponen Original</h4>
            <p className="text-[11px] text-slate-500">Garansi distributor resmi Indonesia</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 font-display">75K+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Komponen Teruji</h4>
            <p className="text-[11px] text-slate-500">Hardware & peripheral terselesaikan</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 font-display">30K+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Pelanggan Puas</h4>
            <p className="text-[11px] text-slate-500">Komunitas gamer & profesional se-Bandung</p>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. DARK TECH CONTAINER SECTION ("A GOOD TEAM DELIVERS A GREAT WORK")     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl cut-corner-container-lg bg-gradient-to-br from-[#0A1128] via-[#0F1E4A] to-[#1D4ED8] text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-blue-900/50">
          {/* Ambient Glows */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-2xl space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                STANDAR MUTU & QUALITY CONTROL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight leading-tight text-white">
              A GOOD TEAM DELIVERS A GREAT WORK
            </h2>
            <p className="text-sm text-blue-100/80 leading-relaxed font-sans">
              Standar operasional kami dirancang untuk memastikan setiap laptop atau PC rakitan beroperasi dalam temperatur optimal, stabil pada beban tinggi, dan terlindungi garansi jelas.
            </p>
          </div>

          {/* 3 Frosted Glass Pillar Cards (Hitboox 01 / 02 / 03 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Pillar 01 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl cut-corner-card p-6 border border-white/15 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-300/40 group-hover:text-blue-300 font-display transition-colors">
                01
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide">
                DIAGNOSA 100% TRANSPARAN
              </h3>
              <p className="text-xs text-blue-100/70 leading-relaxed font-sans">
                Pengecekan awal kerusakan gratis Rp 0. Kami selalu menyertakan dokumentasi video dan bukti komponen rusak sebelum meminta persetujuan estimasi biaya.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl cut-corner-card p-6 border border-white/15 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-300/40 group-hover:text-blue-300 font-display transition-colors">
                02
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide">
                KOMPONEN GRADE RESMI
              </h3>
              <p className="text-xs text-blue-100/70 leading-relaxed font-sans">
                Hanya menggunakan komponen dan suku cadang asli bergaransi distributor resmi Indonesia. Tanpa komponen tiruan, refurbish palsu, atau rekondisi berbahaya.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl cut-corner-card p-6 border border-white/15 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-300/40 group-hover:text-blue-300 font-display transition-colors">
                03
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide">
                CRAFTSMANSHIP & STRESS-TEST
              </h3>
              <p className="text-xs text-blue-100/70 leading-relaxed font-sans">
                Penataan kabel super rapi, thermal paste grade kompetisi (Noctua/Thermal Grizzly), dan pengujian burn-in test 24 jam sebelum perangkat diserahkan kepada Anda.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. OUR SERVICES & RIGS SHOWCASE GRID (1 LARGE FEATURED + 4 GRID CARDS)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                KATALOG KARYA & LAYANAN UNGGULAN
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display uppercase">
              OUR SERVICES & CUSTOM RIGS
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Portofolio spesialisasi pengerjaan bengkel IT dan perakitan PC gaming terfavorit dengan jaminan kepuasan.
            </p>
          </div>

          <Link
            href="/layanan"
            className="btn-hitboox btn-hitboox-secondary text-xs !py-2.5 !px-6 font-bold tracking-wider self-start md:self-auto"
          >
            <span>LIHAT SEMUA LAYANAN</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* 1 Large Featured Card on Top (Hitboox Top Showcase Card) */}
        <div className="mb-6 relative rounded-3xl cut-corner-container overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-xl group">
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <Image
              src={CLOUDINARY_IMAGES.pcGaming}
              alt="Custom Gaming Rig Showcase"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-3 py-1 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Flagship Custom PC Workstation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-white">
                Rakit PC Gaming, Streaming & 3D Render
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                Simulasi kalkulator harga komponen transparan, penataan kabel profesional, optimalisasi BIOS, dan pengujian benchmark kestabilan suhu.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Mulai Dari</span>
                <span className="text-xl font-black text-emerald-400 font-sans">Rp 4.500.000</span>
              </div>
              <Link
                href="/layanan/rakit-pc-gaming"
                className="btn-hitboox btn-hitboox-primary text-xs !py-3 !px-6 font-bold tracking-wider shadow-pill-blue"
              >
                <span>SIMULASI PC SEKARANG</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Grid Cards Below (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Servis Laptop & Macbook */}
          <div className="bg-white rounded-2xl cut-corner-card border border-slate-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group shadow-sm">
            <div className="flex gap-5">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl cut-corner-card overflow-hidden shrink-0 bg-slate-100">
                <Image src={CLOUDINARY_IMAGES.macbookScreen} alt="Servis Laptop" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Hardware & Laptop
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  Servis Laptop & Apple MacBook
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Layar LCD pecah, ganti baterai original, mati total karena korslet IC power, hingga perbaikan engsel casing.
                </p>
                <div className="text-xs font-extrabold text-emerald-600">
                  Mulai Rp 100.000
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Diagnostik Kerusakan Gratis</span>
              <Link href="/layanan/servis-laptop-macbook" className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-4">
                <span>DETAIL</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Gamepad Hall Effect */}
          <div className="bg-white rounded-2xl cut-corner-card border border-slate-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group shadow-sm">
            <div className="flex gap-5">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl cut-corner-card overflow-hidden shrink-0 bg-slate-100">
                <Image src={CLOUDINARY_IMAGES.joystickRepair} alt="Gamepad Mod" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Gaming Gear
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  Modifikasi Hall Effect Gamepad
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Upgrade stick analog magnetik anti-drift permanen untuk PS5 DualSense, Xbox Wireless, dan Switch Joy-Con.
                </p>
                <div className="text-xs font-extrabold text-emerald-600">
                  Mulai Rp 65.000
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Bebas Drift Selamanya</span>
              <Link href="/layanan/servis-joystick" className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-4">
                <span>DETAIL</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 3: Mechanical Keyboard & Mouse */}
          <div className="bg-white rounded-2xl cut-corner-card border border-slate-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group shadow-sm">
            <div className="flex gap-5">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl cut-corner-card overflow-hidden shrink-0 bg-slate-100">
                <Image src={CLOUDINARY_IMAGES.keyboardRepair} alt="Keyboard Mod" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Peripherals
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  Servis Keyboard Mechanical & Mouse
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Solder ganti switch, perbaikan double-click mouse gaming Omron/TTC, lube Krytox stabilizer, dan kabel paracord.
                </p>
                <div className="text-xs font-extrabold text-emerald-600">
                  Mulai Rp 50.000
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Garansi Tuts & Switch Baru</span>
              <Link href="/layanan/servis-keyboard" className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-4">
                <span>DETAIL</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 4: Deep Cleaning & Repaste */}
          <div className="bg-white rounded-2xl cut-corner-card border border-slate-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group shadow-sm">
            <div className="flex gap-5">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl cut-corner-card overflow-hidden shrink-0 bg-slate-100">
                <Image src={CLOUDINARY_IMAGES.workshop} alt="Cleaning PC" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Maintenance
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  Perbaikan & Pembersihan PC Desktop
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  Deep cleaning debu anti-statis, thermal paste Noctua/Arctic MX-6, penataan kabel rapi, dan atasi PC sering restart.
                </p>
                <div className="text-xs font-extrabold text-emerald-600">
                  Mulai Rp 85.000
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Garansi 30 Hari</span>
              <Link href="/layanan/servis-pembersihan-pc" className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-4">
                <span>DETAIL</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. INTERACTIVE SERVICE ACCORDION (HITBOOX SECTION 5: 01-05 EXPANDABLE)    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl cut-corner-container-lg bg-slate-50 border border-slate-200 p-6 sm:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>SPESIALISASI PERBAIKAN & MODIFIKASI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display uppercase">
              IT HARDWARE & REPAIR SERVICES
            </h2>
            <p className="text-slate-600 text-sm font-sans">
              Klik pada tiap nomor layanan untuk melihat detail pengerjaan, garansi, dan simulasi penanganan perangkat Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Accordion List (01 to 05) */}
            <div className="lg:col-span-7 space-y-3">
              {serviceSteps.map((step, idx) => {
                const isActive = activeAccordion === idx;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveAccordion(idx)}
                    className={`cursor-pointer rounded-2xl cut-corner-card border transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-white border-blue-500 shadow-lg'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl sm:text-3xl font-black font-display ${isActive ? 'text-blue-600' : 'text-slate-300'}`}>
                          {step.num}
                        </span>
                        <div>
                          <h3 className={`text-base sm:text-lg font-bold font-sans ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                    </div>

                    {/* Active Expanded Content */}
                    {isActive && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                          {step.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2">
                          <Link
                            href={`/pemesanan?service=${encodeURIComponent(step.title)}`}
                            className="btn-hitboox btn-hitboox-primary text-xs !py-2.5 !px-6 font-bold tracking-wider"
                          >
                            <span>PESAN LAYANAN INI</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Active Preview Visual */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl cut-corner-container overflow-hidden w-full h-full min-h-[480px] lg:min-h-[560px] bg-slate-900 shadow-2xl border border-slate-200 flex flex-col justify-end">
                <Image
                  src={serviceSteps[activeAccordion].image}
                  alt={serviceSteps[activeAccordion].title}
                  fill
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-700 inline-block shadow-sm">
                    Live Workshop Preview
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-sans uppercase">
                    {serviceSteps[activeAccordion].title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {serviceSteps[activeAccordion].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. TESTIMONIALS & PARTNER MARQUEE (HITBOOX SECTION 6)                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                REPUTASI & KOMUNITAS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display uppercase">
              TRUSTED BY GAMERS & CREATORS
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Ulasan nyata dari pelanggan yang telah membuktikan kualitas hasil perbaikan dan perakitan rig di mdfkingpc.
            </p>
          </div>

          <Link
            href="/testimoni"
            className="btn-hitboox btn-hitboox-secondary text-xs !py-2.5 !px-6 font-bold tracking-wider"
          >
            <span>LIHAT SEMUA TESTIMONI</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* 3 Review Cards (First card Blue Accent, 2nd & 3rd Clean White) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_LIST.map((item, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={item.id}
                className={`rounded-2xl cut-corner-card p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-sm ${
                  isFirst
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 border border-blue-500'
                    : 'bg-white text-slate-800 border border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="space-y-4">
                  {/* Large Quotation Icon */}
                  <span className={`text-5xl font-black leading-none font-display block ${isFirst ? 'text-white/40' : 'text-blue-600/30'}`}>
                    &ldquo;
                  </span>
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed italic ${isFirst ? 'text-blue-50' : 'text-slate-600'}`}>
                    {item.quote}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center gap-3.5 ${isFirst ? 'border-white/20' : 'border-slate-100'}`}>
                  <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/40">
                    <Image src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isFirst ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                    <span className={`text-[11px] font-semibold block ${isFirst ? 'text-blue-200' : 'text-blue-600'}`}>
                      {item.serviceType}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Partner Logo Continuous Marquee (Hitboox Partner Ticker) */}
        <div className="mt-16 pt-10 border-t border-slate-200 overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              DIDUKUNG KOMPONEN & SUKU CADANG DISTRIBUTOR RESMI
            </span>
          </div>
          <div className="flex space-x-10 animate-marquee items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl cut-corner-card bg-slate-50 border border-slate-200 text-xs font-black text-slate-800 tracking-wider whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 7. AWARDS & RECOGNITION (HITBOOX SECTION 7: DARK CUT-CORNER CONTAINER)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl cut-corner-container-lg bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Trophy / Badge Emblem */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                <Trophy className="w-3.5 h-3.5" />
                <span>STANDAR AKREDITASI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
                AWARDS & CERTIFIED TECHNICIANS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Komitmen terhadap kualitas dan integritas teknisi kami telah dibuktikan melalui pencapaian resmi dan pengakuan komunitas perbaikan IT di Bandung.
              </p>
            </div>

            {/* Right Credentials Table List */}
            <div className="lg:col-span-7 divide-y divide-slate-800 text-xs sm:text-sm">
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-blue-400 font-sans">2024</span>
                <span className="text-slate-200 font-semibold flex-1">Official Intel & AMD Certified Specialist Lab</span>
                <span className="text-slate-400 text-xs">Hardware Partner</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-blue-400 font-sans">2023</span>
                <span className="text-slate-200 font-semibold flex-1">#1 Top Rated IT Workshop Bandung Community Choice</span>
                <span className="text-slate-400 text-xs">Rating 4.9/5</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-blue-400 font-sans">2022</span>
                <span className="text-slate-200 font-semibold flex-1">Authorized Thermal Grizzly & High-Performance Thermal Station</span>
                <span className="text-slate-400 text-xs">Official Station</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-blue-400 font-sans">2021</span>
                <span className="text-slate-200 font-semibold flex-1">75,000+ Hardware Units Restored with 99.4% Success Rate</span>
                <span className="text-slate-400 text-xs">Milestone</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ========================================================================= */}
      {/* 9. WHAT'S TRENDING (HITBOOX SECTION 9: 1 LARGE FEATURED + 3 POSTS)       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl cut-corner-container-lg bg-slate-50 border border-slate-200 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  INSIGHT & EDUKASI HARDWARE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display uppercase">
                WHAT&apos;S TRENDING IN HARDWARE
              </h2>
            </div>

            <Link
              href="/blog"
              className="btn-hitboox btn-hitboox-secondary text-xs !py-2.5 !px-6 font-bold tracking-wider"
            >
              <span>SEMUA ARTIKEL</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 1 Large Featured Post (Left) */}
            <div className="lg:col-span-7 bg-white rounded-2xl cut-corner-card border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
              <div className="relative w-full h-56 sm:h-64 lg:h-auto lg:flex-1 min-h-[200px] bg-slate-100 overflow-hidden">
                <Image
                  src={BLOG_POSTS[0].imageUrl}
                  alt={BLOG_POSTS[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                  {BLOG_POSTS[0].category}
                </span>
              </div>

              <div className="p-6 sm:p-7 space-y-3 shrink-0">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{BLOG_POSTS[0].date}</span>
                  <span>•</span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors line-clamp-2">
                  {BLOG_POSTS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {BLOG_POSTS[0].snippet}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/blog#${BLOG_POSTS[0].slug}`}
                    className="btn-hitboox btn-hitboox-primary text-xs !py-2 !px-5"
                  >
                    <span>BACA LENGKAP</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4 Compact Posts (Right) */}
            <div className="lg:col-span-5 flex flex-col gap-[20px]">
              {BLOG_POSTS.slice(1, 5).map((post) => {
                return (
                  <Link
                    key={post.id}
                    href={`/blog#${post.slug}`}
                    className="bg-white rounded-xl cut-corner-card p-3 sm:p-3.5 border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex gap-3.5 sm:gap-4 items-center group"
                  >
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                        {post.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors font-sans">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block">{post.date}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 10. MAKE YOUR PC DREAM REAL (CONSULTATION FORM WITH CUT-CORNER BUTTONS)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl cut-corner-container-lg bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & Rig Graphic */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  KONSULTASI ONLINE CEPAT
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
                MAKE YOUR PC DREAM REAL
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Punya pertanyaan tentang perbaikan laptop, rencana rakit PC gaming baru, atau ingin upgrade analog Hall Effect? Kirimkan formulir konsultasi cepat ini dan teknisi kami akan merespons dalam hitungan menit via WhatsApp.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Konsultasi dan estimasi biaya gratis tanpa paksaan servis</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Garansi resmi 30 hari & pengerjaan cepat di workshop Dago</span>
                </div>
              </div>
            </div>

            {/* Right Consultation Card with Hitboox Cut-Corner Submit Button */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl cut-corner-container p-6 sm:p-8 text-slate-800 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 font-sans uppercase mb-1">
                  Formulir Konsultasi Gratis
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Respon kilat via WhatsApp resmi mdfkingpc.
                </p>

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Kategori Layanan *
                    </label>
                    <select
                      value={consultCategory}
                      onChange={(e) => setConsultCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="Rakit PC Gaming">Rakit PC Gaming / Workstation</option>
                      <option value="Servis Laptop & MacBook">Servis Laptop & Apple MacBook</option>
                      <option value="Modifikasi Gamepad Hall Effect">Modifikasi Gamepad Hall Effect (Anti Drift)</option>
                      <option value="Servis Keyboard & Mouse">Servis Keyboard Mechanical & Mouse</option>
                      <option value="Pembersihan & Deep Cleaning PC">Pembersihan PC & Repaste Thermal</option>
                      <option value="Instalasi OS & Game">Instalasi Windows / Game PC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Pesan Kerusakan / Target Budget
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan kendala perangkat atau target spesifikasi/budget Anda..."
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-hitboox btn-hitboox-primary w-full !py-3.5 text-xs font-bold tracking-wider shadow-pill-blue"
                  >
                    <span>KIRIM KONSULTASI SEKARANG</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
