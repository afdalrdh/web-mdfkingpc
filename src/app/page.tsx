'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, Clock, Star, 
  Sparkles, MessageSquare, Info, ChevronRight, Zap, Check, ThumbsUp,
  Laptop, Cpu, Keyboard, Mouse, Gamepad2, Trophy, Flame
} from 'lucide-react';
import { SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';
import ServicesSlider from '@/components/ServicesSlider';

export default function HomePage() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Form consultation state
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultCategory, setConsultCategory] = useState('Rakit PC Gaming');
  const [consultMessage, setConsultMessage] = useState('');

  // Dynamic data from API (so admin changes reflect here)
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => { if (data.success && Array.isArray(data.data)) setTestimonials(data.data); })
      .catch(console.error);

    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { if (data.success && Array.isArray(data.data)) setBlogPosts(data.data); })
      .catch(console.error);
  }, []);

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
      features: ['Penurunan Suhu Panas Ekstrem 15 - 20Â°C', 'Thermal Paste Kualitas Kompetisi (Noctua/Arctic)', 'Cable Re-Management Airflow Lancar', 'Solusi PC Sering Shutdown / No Display'],
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
    <div className="space-y-24 pb-20 overflow-hidden bg-transparent text-slate-100 font-sans">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (DARK AESTHETIC SPLIT-PANEL SHOWCASE BANNER)             */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Container with Chamfered Bottom Cut-Corner & Ambient Glow */}
          <div className="preserve-dark relative rounded-3xl cut-corner-container-lg overflow-hidden bg-gradient-to-b from-[#0B0E18] via-[#070911] to-[#040509] text-white min-h-[580px] lg:min-h-[640px] flex items-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/[0.08]">
            
            {/* Ambient Studio Lighting Blooms */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.14] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-20 right-10 w-[450px] h-[450px] bg-cyan-500/[0.1] rounded-full blur-[140px] pointer-events-none" />

            {/* Split Multi-Column Dynamic Hardware Panels */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 opacity-45 mix-blend-screen hover:opacity-65 transition-opacity duration-700 pointer-events-none">
              <div className="relative h-full border-r border-white/[0.06] overflow-hidden">
                <Image src={CLOUDINARY_IMAGES.pcGaming} alt="Rig 1" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-white/[0.06] overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.macbookScreen} alt="Rig 2" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-white/[0.06] overflow-hidden">
                <Image src={CLOUDINARY_IMAGES.workshop} alt="Rig 3" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full border-r border-white/[0.06] overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.keyboardRepair} alt="Rig 4" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
              <div className="relative h-full overflow-hidden hidden md:block">
                <Image src={CLOUDINARY_IMAGES.joystickRepair} alt="Rig 5" fill className="object-cover scale-105 hover:scale-110 transition-transform duration-700" priority />
              </div>
            </div>

            {/* Dark Radial Gradient & Tech Grid Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070911] via-[#070911]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040509] via-transparent to-transparent pointer-events-none" />

            {/* Hero Content Area */}
            <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-16 max-w-4xl lg:max-w-5xl xl:max-w-6xl space-y-6">
              {/* Luminous Subtitle Tag with Cyan Glow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/35 text-cyan-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>#1 Solusi Servis IT & Rakit PC Studio di Bandung</span>
              </div>

              {/* Metallic Silver Gradient Realce Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight leading-[1.08] font-display uppercase">
                <span className="block whitespace-nowrap bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">BUILT FOR PERFORMANCE.</span>
                <span className="block whitespace-nowrap bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">SERVICED WITH PRECISION.</span>
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
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
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
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                WE FOCUS ON HIGH PERFORMANCE RIGS & PERFECT REPAIRS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight font-display uppercase bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              DEDIKASI KAMI UNTUK PERFORMA HARDWARE MAKSIMAL & HASIL SERVIS SEMPURNA
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              mdfkingpc didirikan dengan satu komitmen: menghadirkan solusi hardware komputer dan laptop yang transparan tanpa mark-up biaya membingungkan. Dari penanganan mikrosoldering logic board yang rumit hingga perakitan rig PC gaming bersirkulasi dingin, seluruh pekerjaan dikerjakan oleh teknisi spesialis bersertifikasi.
            </p>

            <div className="pt-2">
              <Link
                href="/tentang-kami"
                className="btn-hitboox btn-hitboox-secondary text-xs !py-3 !px-7 font-bold tracking-wider"
              >
                <span>TENTANG WORKSHOP KAMI</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Floating Visual Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl cut-corner-card overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0E111B] group">
              <Image
                src={CLOUDINARY_IMAGES.workshop}
                alt="mdfkingpc Precision Lab"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070911]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-blue-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                  Laboratorium Bandung &amp; Cimahi
                </span>
                <h4 className="text-sm font-bold mt-1.5 text-white">Peralatan Mikrosolder & Kompresor Anti-Statis Modern</h4>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0E111B]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-[0_12px_35px_rgba(0,0,0,0.7)] cut-corner-card animate-float hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>4.9 / 5.0</span>
                  <span className="text-[9px] text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">Google Review</span>
                </div>
                <span className="text-[11px] text-slate-400">30.000+ Pengguna Puas</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Big Counter Metrics (Luminous Cyan & Sapphire Gradients) */}
        <div className="mt-16 pt-12 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-display">15+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tahun Pengalaman</h4>
            <p className="text-[11px] text-slate-400">Teknisi spesialis hardware bersertifikasi</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-display">100%</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Komponen Original</h4>
            <p className="text-[11px] text-slate-400">Garansi distributor resmi Indonesia</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-display">75K+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Komponen Teruji</h4>
            <p className="text-[11px] text-slate-400">Hardware & peripheral terselesaikan</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-display">30K+</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pelanggan Puas</h4>
            <p className="text-[11px] text-slate-400">Komunitas gamer & profesional se-Bandung</p>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. DARK TECH CONTAINER SECTION ("A GOOD TEAM DELIVERS A GREAT WORK")     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="preserve-dark relative rounded-3xl cut-corner-container-lg bg-gradient-to-br from-[#080B14] via-[#0E152A] to-[#0A0D18] text-white p-8 sm:p-12 lg:p-16 shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-blue-500/25">
          {/* Ambient Glows */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-2xl space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                STANDAR MUTU & QUALITY CONTROL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              A GOOD TEAM DELIVERS A GREAT WORK
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Standar operasional kami dirancang untuk memastikan setiap laptop atau PC rakitan beroperasi dalam temperatur optimal, stabil pada beban tinggi, dan terlindungi garansi jelas.
            </p>
          </div>

          {/* 3 Frosted Glass Pillar Cards (Hitboox 01 / 02 / 03 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Pillar 01 */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl cut-corner-card p-6 border border-white/10 hover:border-blue-400/50 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-400/30 group-hover:text-cyan-400 font-display transition-colors">
                01
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide group-hover:text-blue-300 transition-colors">
                DIAGNOSA 100% TRANSPARAN
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Pengecekan awal kerusakan gratis Rp 0. Kami selalu menyertakan dokumentasi video dan bukti komponen rusak sebelum meminta persetujuan estimasi biaya.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl cut-corner-card p-6 border border-white/10 hover:border-blue-400/50 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-400/30 group-hover:text-cyan-400 font-display transition-colors">
                02
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide group-hover:text-blue-300 transition-colors">
                KOMPONEN GRADE RESMI
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Hanya menggunakan komponen dan suku cadang asli bergaransi distributor resmi Indonesia. Tanpa komponen tiruan, refurbish palsu, atau rekondisi berbahaya.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl cut-corner-card p-6 border border-white/10 hover:border-blue-400/50 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 space-y-4 group">
              <span className="text-4xl font-black text-blue-400/30 group-hover:text-cyan-400 font-display transition-colors">
                03
              </span>
              <h3 className="text-lg font-bold font-sans uppercase text-white tracking-wide group-hover:text-blue-300 transition-colors">
                CRAFTSMANSHIP & STRESS-TEST
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                KATALOG KARYA & LAYANAN UNGGULAN
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-slate-400 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
              OUR SERVICES & CUSTOM RIGS
            </h2>
            <p className="dark:text-slate-400 text-slate-600 text-sm max-w-xl">
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

        {/* Interactive Services Slider (Reference Image 2 Card Layout, Adjusted Wide) */}
        <ServicesSlider />
      </section>


      {/* ========================================================================= */}
      {/* 5. INTERACTIVE SERVICE ACCORDION (HITBOOX SECTION 5: 01-05 EXPANDABLE)    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl cut-corner-container-lg bg-[#090C15] border border-white/[0.08] p-6 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>SPESIALISASI PERBAIKAN & MODIFIKASI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              IT HARDWARE & REPAIR SERVICES
            </h2>
            <p className="text-slate-400 text-sm font-sans">
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
                        ? 'bg-gradient-to-r from-blue-950/40 via-[#0E1528] to-[#0A0D18] border-blue-500/50 shadow-[0_0_25px_rgba(37,99,235,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl sm:text-3xl font-black font-display ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                          {step.num}
                        </span>
                        <div>
                          <h3 className={`text-base sm:text-lg font-bold font-sans ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-90 text-cyan-400' : 'text-slate-500'}`} />
                    </div>

                    {/* Active Expanded Content */}
                    {isActive && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/[0.08] space-y-4 animate-in fade-in duration-200">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {step.desc}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
                          {step.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
              <div className="relative rounded-2xl cut-corner-container overflow-hidden w-full h-full min-h-[480px] lg:min-h-[560px] bg-[#06080E] shadow-2xl border border-white/[0.08] flex flex-col justify-end">
                <Image
                  src={serviceSteps[activeAccordion].image}
                  alt={serviceSteps[activeAccordion].title}
                  fill
                  className="object-cover transition-all duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04050A] via-[#04050A]/40 to-transparent" />
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-blue-950/90 px-3 py-1 rounded-full border border-cyan-500/30 inline-block shadow-sm">
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
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                REPUTASI & KOMUNITAS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              TRUSTED BY GAMERS & CREATORS
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
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

        {/* 3 Review Cards (First card Sapphire/Blue Neon, 2nd & 3rd Classy Obsidian) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.length === 0 ? (
            // Skeleton loading placeholders
            [0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl cut-corner-card p-6 sm:p-8 border border-white/[0.08] bg-[#0B0D16] animate-pulse">
                <div className="space-y-3">
                  <div className="h-8 w-8 bg-white/[0.06] rounded" />
                  <div className="flex gap-1">{[...Array(5)].map((_, j) => <div key={j} className="w-4 h-4 bg-amber-400/20 rounded" />)}</div>
                  <div className="h-20 bg-white/[0.04] rounded" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08] mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06]" />
                  <div className="space-y-1"><div className="h-3 w-24 bg-white/[0.06] rounded" /><div className="h-2 w-16 bg-white/[0.04] rounded" /></div>
                </div>
              </div>
            ))
          ) : (
            testimonials.slice(0, 3).map((item, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl cut-corner-card p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-sm ${
                    isFirst
                      ? 'preserve-dark bg-gradient-to-br from-blue-900/80 via-blue-950 to-[#0B1020] text-white shadow-[0_0_35px_rgba(37,99,235,0.3)] border border-blue-500/40'
                      : 'bg-[#0B0D16] text-white border border-white/[0.08] hover:border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Large Quotation Icon */}
                    <span className={`text-5xl font-black leading-none font-display block ${isFirst ? 'text-white/40' : 'text-blue-500/30'}`}>
                      &ldquo;
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed italic ${isFirst ? 'text-slate-200' : 'text-slate-300'}`}>
                      {item.quote}
                    </p>
                  </div>

                  <div className={`pt-4 border-t flex items-center gap-3.5 ${isFirst ? 'border-white/20' : 'border-white/[0.08]'}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/20">
                      <Image src={item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <span className={`text-[11px] font-semibold block ${isFirst ? 'text-cyan-300' : 'text-cyan-400'}`}>
                        {item.serviceType}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Brand Partner Logo Continuous Marquee (Hitboox Partner Ticker) */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              DIDUKUNG KOMPONEN & SUKU CADANG DISTRIBUTOR RESMI
            </span>
          </div>
          <div className="flex space-x-10 animate-marquee items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl cut-corner-card bg-white/[0.03] border border-white/[0.08] text-xs font-black text-slate-300 tracking-wider whitespace-nowrap hover:border-blue-500/40 hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
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
        <div className="preserve-dark rounded-3xl cut-corner-container-lg bg-gradient-to-r from-[#08090F] via-[#0E1220] to-[#090D1A] text-white p-8 sm:p-12 lg:p-16 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Trophy / Badge Emblem */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
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
            <div className="lg:col-span-7 divide-y divide-white/[0.08] text-xs sm:text-sm">
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-cyan-400 font-sans">2024</span>
                <span className="text-slate-200 font-semibold flex-1">Official Intel & AMD Certified Specialist Lab</span>
                <span className="text-slate-400 text-xs">Hardware Partner</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-cyan-400 font-sans">2023</span>
                <span className="text-slate-200 font-semibold flex-1">#1 Top Rated IT Workshop Bandung Community Choice</span>
                <span className="text-slate-400 text-xs">Rating 4.9/5</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-cyan-400 font-sans">2022</span>
                <span className="text-slate-200 font-semibold flex-1">Authorized Thermal Grizzly & High-Performance Thermal Station</span>
                <span className="text-slate-400 text-xs">Official Station</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="font-bold text-cyan-400 font-sans">2021</span>
                <span className="text-slate-200 font-semibold flex-1">75,000+ Hardware Units Restored with 99.4% Success Rate</span>
                <span className="text-slate-400 text-xs">Milestone</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ========================================================================= */}
      {/* 9. WHAT'S TRENDING (HITBOOX SECTION 9: 1 LARGE FEATURED + 4 POSTS)       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl cut-corner-container-lg bg-[#090C15] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  INSIGHT & EDUKASI HARDWARE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display uppercase bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
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
            {blogPosts.length === 0 ? (
              <div className="lg:col-span-7 bg-[#0B0D16] rounded-2xl cut-corner-card border border-white/[0.08] overflow-hidden animate-pulse h-80" />
            ) : (
              <div className="lg:col-span-7 bg-[#0B0D16] rounded-2xl cut-corner-card border border-white/[0.08] overflow-hidden hover:border-blue-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col h-full group">
                <div className="relative w-full h-56 sm:h-64 lg:h-auto lg:flex-1 min-h-[200px] bg-slate-900 overflow-hidden">
                  <Image
                    src={blogPosts[0].imageUrl}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600/40 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider backdrop-blur-md">
                    {blogPosts[0].category}
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-3 shrink-0">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{blogPosts[0].date}</span>
                    <span>•</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {blogPosts[0].snippet}
                  </p>
                  <div className="pt-1">
                    <Link
                      href={`/blog#${blogPosts[0].slug}`}
                      className="btn-hitboox btn-hitboox-primary text-xs !py-2 !px-5"
                    >
                      <span>BACA LENGKAP</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Compact Posts (Right) */}
            <div className="lg:col-span-5 flex flex-col gap-[20px]">
              {blogPosts.length === 0 ? (
                [0, 1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#0B0D16] rounded-xl cut-corner-card p-3 sm:p-3.5 border border-white/[0.08] flex gap-3.5 items-center animate-pulse">
                    <div className="w-20 h-20 rounded-lg bg-white/[0.06] shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-16 bg-white/[0.06] rounded" />
                      <div className="h-4 w-full bg-white/[0.06] rounded" />
                      <div className="h-2 w-20 bg-white/[0.04] rounded" />
                    </div>
                  </div>
                ))
              ) : (
                blogPosts.slice(1, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog#${post.slug}`}
                    className="bg-[#0B0D16] rounded-xl cut-corner-card p-3 sm:p-3.5 border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.03] transition-all flex gap-3.5 sm:gap-4 items-center group"
                  >
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-white/[0.06]">
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                        {post.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 line-clamp-2 transition-colors font-sans">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">{post.date}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 10. MAKE YOUR PC DREAM REAL (CONSULTATION FORM WITH CUT-CORNER BUTTONS)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="preserve-dark relative rounded-3xl cut-corner-container-lg bg-gradient-to-br from-[#080B14] via-[#0E1528] to-[#070911] text-white p-8 sm:p-12 lg:p-16 border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & Rig Graphic */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
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
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-cyan-400 flex items-center justify-center font-bold text-[10px]">âœ“</div>
                  <span>Konsultasi dan estimasi biaya gratis tanpa paksaan servis</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-cyan-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Garansi resmi 30 hari &amp; pengerjaan cepat di workshop Bandung &amp; Cimahi</span>
                </div>
              </div>
            </div>

            {/* Right Consultation Card with Hitboox Cut-Corner Submit Button */}
            <div className="lg:col-span-6">
              <div className="bg-[#090B12]/95 backdrop-blur-2xl rounded-3xl cut-corner-container p-6 sm:p-8 text-white shadow-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white font-sans uppercase mb-1">
                  Formulir Konsultasi Gratis
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Respon kilat via WhatsApp resmi mdfkingpc.
                </p>

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-white/[0.04] border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-white/[0.04] border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Kategori Layanan *
                    </label>
                    <select
                      value={consultCategory}
                      onChange={(e) => setConsultCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-[#0B0D16] border border-white/10 rounded-xl focus:border-cyan-400 focus:outline-none transition-all text-white"
                    >
                      <option value="Rakit PC Gaming" className="bg-[#0B0D16] text-white">Rakit PC Gaming / Workstation</option>
                      <option value="Servis Laptop & MacBook" className="bg-[#0B0D16] text-white">Servis Laptop & Apple MacBook</option>
                      <option value="Modifikasi Gamepad Hall Effect" className="bg-[#0B0D16] text-white">Modifikasi Gamepad Hall Effect (Anti Drift)</option>
                      <option value="Servis Keyboard & Mouse" className="bg-[#0B0D16] text-white">Servis Keyboard Mechanical & Mouse</option>
                      <option value="Pembersihan & Deep Cleaning PC" className="bg-[#0B0D16] text-white">Pembersihan PC & Repaste Thermal</option>
                      <option value="Instalasi OS & Game" className="bg-[#0B0D16] text-white">Instalasi Windows / Game PC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Pesan Kerusakan / Target Budget
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan kendala perangkat atau target spesifikasi/budget Anda..."
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-white/[0.04] border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none transition-all text-white placeholder:text-slate-500"
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

