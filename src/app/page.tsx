'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, Phone, Clock, Star, 
  ChevronRight, Sparkles, Cpu, HardDrive, Laptop, Gamepad2, MousePointer, Keyboard, Monitor
} from 'lucide-react';
import { SITE_INFO, SERVICES_LIST, TESTIMONIALS_LIST, BLOG_POSTS, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-12 pb-20 bg-gradient-to-b from-[#141414] via-[#18181C] to-[#141414]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Slogan Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span className="text-white font-bold">{SITE_INFO.slogan}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Solusi Perbaikan Perangkat & <span className="text-gradient-brand">Solusi IT Terpercaya</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                {SITE_INFO.subSlogan} Penanganan cepat, pengerjaan presisi, dan klaim garansi tanpa ribet.
              </p>

              {/* Badges Keunggulan */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-2 text-left">
                  <Wrench className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">Teknisi Ahli</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-2 text-left">
                  <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">Harga Transparan</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-2 text-left">
                  <Award className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">Garansi 30 Hari</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">Diagnostik Gratis</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  href="/pemesanan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue border border-blue-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Wrench className="w-5 h-5 text-brand-red" />
                  <span>Pesan Perbaikan Sekarang</span>
                </Link>
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20Konsultasi%20Gratis`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-gray-200 glass-panel hover:bg-white/10 border border-white/10 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Konsultasi WA Gratis</span>
                </a>
              </div>
            </div>

            {/* Hero Image Frame (Technician Repairing Laptop) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={CLOUDINARY_IMAGES.hero}
                  alt="Teknisi mdfkingpc memperbaiki laptop"
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                
                {/* Floating Card Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/30 flex items-center justify-center border border-brand-blue/50 text-white font-bold">
                      8+
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Mitra Terpercaya Bandung</p>
                      <p className="text-[11px] text-gray-300">1000+ Perangkat Berhasil Diperbaiki</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-brand-red/30 text-brand-red border border-brand-red/40 text-[10px] font-bold">
                    OFFICIAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">Katalog Layanan</span>
            <h2 className="text-3xl font-extrabold text-white">Layanan Service Perangkat</h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Pilihan perbaikan spesifik dengan estimasi harga transparan tanpa biaya tambahan tersembunyi.
            </p>
          </div>
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-blue-400 transition-colors"
          >
            <span>Lihat Semua Layanan ({SERVICES_LIST.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-blue/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent opacity-90" />
                  {service.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-brand-blue/80 text-white border border-blue-400/30">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-brand-red tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                <div>
                  <span className="text-[10px] text-gray-400 block">Mulai Dari</span>
                  <span className="text-sm font-extrabold text-emerald-400">{service.priceStarting}</span>
                </div>
                <Link
                  href={`/pemesanan?service=${service.slug}`}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-blue text-xs font-bold text-white transition-all border border-white/10"
                >
                  Pesan Servis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="bg-[#18181C] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Keunggulan mdfkingpc</span>
            <h2 className="text-3xl font-extrabold text-white">Mengapa Memilih Kami?</h2>
            <p className="text-gray-400 text-sm">
              Kami memahami betapa pentingnya perangkat Anda untuk kerja & gaming. Kami memberikan pelayanan terbaik di Bandung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_INFO.companyValues.map((val, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 hover:border-brand-red/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{val.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4 LANGKAH SEPERTI REPAIRING WEBFLOW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">Alur Pelayanan</span>
            <h2 className="text-3xl font-extrabold text-white">4 Langkah Mudah Servis Perangkat</h2>
          </div>
          <Link
            href="/pemesanan"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-xs font-bold text-white border border-blue-400/30 shadow-glow-blue transition-all"
          >
            <span>Buat Janji Servis Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 relative">
            <span className="text-4xl font-black text-white/10 block">01</span>
            <h3 className="text-lg font-bold text-white">Isi Form Pemesanan</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pilih jenis perbaikan perangkat Anda dan jadwalkan tanggal pengerjaan via formulir online.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 relative">
            <span className="text-4xl font-black text-brand-blue/20 block">02</span>
            <h3 className="text-lg font-bold text-white">Antar Perangkat / Pick-up</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bawa perangkat langsung ke workshop Dago Bandung atau gunakan layanan antar-jemput.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 relative">
            <span className="text-4xl font-black text-brand-red/20 block">03</span>
            <h3 className="text-lg font-bold text-white">Diagnosa & Perbaikan</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Teknisi melakukan pengecekan menyeluruh, memberikan konfirmasi biaya, dan pengerjaan.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 relative">
            <span className="text-4xl font-black text-emerald-500/20 block">04</span>
            <h3 className="text-lg font-bold text-white">Ambil & Garansi 30 Hari</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Perangkat siap diambil dengan performa maksimal dan nota garansi resmi 30 hari.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (DENGAN KUTIPAN REFERENSI OPTIONTECH) */}
      <section className="bg-gradient-to-b from-[#141414] to-[#1A1A1E] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">Apa Kata Pelanggan</span>
            <h2 className="text-3xl font-extrabold text-white">Testimoni Pelanggan mdfkingpc</h2>
            <p className="text-gray-400 text-sm">
              Kepercayaan & kepuasan pelanggan adalah prioritas utama kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_LIST.map((t) => (
              <div key={t.id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs italic text-gray-200 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-brand-blue"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <span className="text-[10px] text-brand-blue block font-semibold">{t.serviceType}</span>
                    <span className="text-[10px] text-gray-400">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/testimoni"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white underline"
            >
              <span>Lihat Selengkapnya Ulasan Pelanggan &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BLOG / TIPS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Tips & Artikel</span>
            <h2 className="text-3xl font-extrabold text-white">Informasi & Edukasi Perangkat</h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-brand-blue hover:text-blue-400 flex items-center gap-1">
            <span>Lihat Semua Artikel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-red/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 text-white text-[10px] font-semibold border border-white/10">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] text-gray-400">{post.date} &bull; {post.readTime}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{post.snippet}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link href={`/blog#${post.slug}`} className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
