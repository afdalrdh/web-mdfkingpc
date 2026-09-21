'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, HardDrive, 
  Cpu, Smartphone, Laptop, Gamepad2, MousePointer, Keyboard, MonitorCheck 
} from 'lucide-react';
import { SERVICES_LIST, SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function LayananPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden text-center space-y-4">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
          <Wrench className="w-4 h-4 text-brand-blue" />
          <span>Katalog Layanan Perbaikan mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Layanan Service & Perbaikan IT
        </h1>
        
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pilih kategori perbaikan perangkat Anda. Semua pengerjaan ditangani teknisi profesional dengan transparansi biaya dan bergaransi 30 hari penuh.
        </p>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            Garansi 30 Hari Perbaikan
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            Diagnostik Pengecekan Gratis
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Award className="w-4 h-4" />
            Komponen Original Bergaransi
          </span>
        </div>
      </div>

      {/* Services Cards Grid */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              id={service.slug}
              key={service.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-blue transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent opacity-90" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-md bg-brand-red/90 text-white text-[10px] font-bold shadow-glow-red">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">Fitur & Pengerjaan:</span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-white/10 flex items-center justify-between bg-black/20">
                <div>
                  <span className="text-[10px] text-gray-400 block">Estimasi Biaya</span>
                  <span className="text-base font-extrabold text-emerald-400">{service.priceStarting}</span>
                </div>
                <Link
                  href={`/pemesanan?service=${service.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-xs font-bold text-white shadow-glow-blue transition-all border border-blue-400/30"
                >
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPONENT EXAMPLE SHOWCASE: SSD UPGRADE & SCREEN REPAIR */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-r from-[#1C1C1E] via-[#141414] to-[#1C1C1E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="px-3 py-1 rounded bg-brand-red/20 text-brand-red text-xs font-bold border border-brand-red/30">
            Contoh Solusi Perangkat
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Solusi Performa: Upgrade SSD NVMe & Ganti Layar Cracked
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Apakah laptop Anda lambat atau layarnya bergaris? Kami menyediakan penggantian suku cadang berkualitas tinggi seperti SSD High-Speed PCIe 4.0 dan layar LCD Original dengan pemasangan langsung di tempat.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <HardDrive className="w-5 h-5 text-brand-blue" />
              <h4 className="text-xs font-bold text-white">Booting 5 Detik</h4>
              <p className="text-[11px] text-gray-400">Peningkatan kecepatan hingga 10x dari HDD biasa.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <Laptop className="w-5 h-5 text-brand-red" />
              <h4 className="text-xs font-bold text-white">Layar IPS HD Original</h4>
              <p className="text-[11px] text-gray-400">Garansi piksel jernih tanpa cacat warna.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <img
            src={CLOUDINARY_IMAGES.ssdUpgrade}
            alt="SSD Upgrade Component"
            className="w-full h-64 object-cover rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
