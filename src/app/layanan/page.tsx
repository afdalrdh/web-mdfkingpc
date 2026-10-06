'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, HardDrive, 
  Laptop, Info, Sparkles, RefreshCw
} from 'lucide-react';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc?: string;
  fullDesc: string;
  priceStarting: string;
  price?: number;
  imageUrl: string;
  badge?: string;
  features: string[];
}

export default function LayananPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100 font-sans">
      {/* Header Banner (Dark Aesthetic Glass Banner) */}
      <div className="relative rounded-3xl cut-corner-container-lg p-8 md:p-14 border border-white/[0.08] bg-gradient-to-b from-[#0B0E18] via-[#070911] to-[#040509] overflow-hidden text-center space-y-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* Glow blooms */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-cyan-500/[0.1] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>Katalog Layanan Perbaikan Spesialis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight font-display uppercase">
            Layanan Service &amp; Perbaikan IT
          </h1>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Pilih kategori perbaikan perangkat Anda. Klik kartu layanan untuk melihat rincian tabel perbaikan, estimasi durasi, dan garansi resmi mdfkingpc.
          </p>

          {/* Highlight Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] text-cyan-300 text-xs font-bold border border-cyan-500/30 shadow-glow-cyan">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Garansi 30 Hari Perbaikan
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Diagnostik Pengecekan Gratis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Award className="w-4 h-4 text-amber-400" />
              Komponen Original Bergaransi
            </span>
          </div>
        </div>
      </div>

      {/* Services Cards Grid */}
      <div className="space-y-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className="text-slate-400 text-sm">Memuat katalog layanan...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Wrench className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Belum ada layanan tersedia. Cek kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const detailUrl = `/layanan/${service.slug}`;

              return (
                <div
                  id={service.slug}
                  key={service.id}
                  className="bg-[#0D0F18]/90 backdrop-blur-md rounded-3xl cut-corner-card overflow-hidden border border-white/[0.08] hover:border-cyan-500/40 hover:shadow-[0_15px_40px_rgba(0,102,255,0.15)] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Clickable Image Header */}
                    <Link href={detailUrl} className="block relative h-56 overflow-hidden cursor-pointer bg-slate-900">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F18] via-transparent to-transparent opacity-90" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-xs">
                        {service.category}
                      </span>
                      {service.badge && (
                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-md shadow-blue-600/50">
                          {service.badge}
                        </span>
                      )}
                    </Link>

                    <div className="p-6 space-y-4">
                      {/* Clickable Title */}
                      <Link href={detailUrl} className="block group/title">
                        <h3 className="text-xl font-bold text-white group-hover/title:text-cyan-400 transition-colors flex items-center justify-between font-sans">
                          <span>{service.title}</span>
                          <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {service.fullDesc}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                        <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Fitur &amp; Pengerjaan Utama:</span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {(service.features || []).map((feat, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="p-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Estimasi Mulai Dari</span>
                      <span className="text-base font-extrabold text-emerald-400">{service.priceStarting}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={detailUrl}
                        className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-3.5 gap-1"
                      >
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Detail</span>
                      </Link>

                      <Link
                        href={`/pemesanan?service=${encodeURIComponent(service.title)}`}
                        className="btn-hitboox btn-hitboox-primary text-xs !py-1.5 !px-4 gap-1 shadow-pill-blue"
                      >
                        <span>Pesan</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMPONENT EXAMPLE SHOWCASE */}
      <div className="bg-[#0D0F18]/90 backdrop-blur-md p-8 md:p-10 rounded-3xl cut-corner-container-lg border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solusi Kinerja Perangkat</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase">
            Solusi Performa: Upgrade SSD NVMe &amp; Ganti Layar Cracked
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Apakah laptop Anda lambat atau layarnya bergaris? Kami menyediakan penggantian suku cadang berkualitas tinggi seperti SSD High-Speed PCIe 4.0 dan layar LCD Original dengan pemasangan langsung di tempat.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <HardDrive className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-bold text-white">Booting 5 Detik</h4>
              <p className="text-[11px] text-slate-400">Peningkatan kecepatan hingga 10x dari HDD biasa.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <Laptop className="w-5 h-5 text-blue-400" />
              <h4 className="text-xs font-bold text-white">Layar IPS HD Original</h4>
              <p className="text-[11px] text-slate-400">Garansi piksel jernih tanpa cacat warna.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-64 lg:h-80 rounded-2xl overflow-hidden border border-white/[0.08] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1597872250970-45d2f34241e3?q=80&w=800&auto=format&fit=crop"
            alt="Hardware upgrade"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
