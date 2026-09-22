'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Award, CheckCircle2, ArrowRight, HardDrive, 
  Laptop, Info, Sparkles
} from 'lucide-react';
import { SERVICES_LIST } from '@/data/mockData';

export default function LayananPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-white text-slate-900">
      {/* Header Banner (Clean White Theme) */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-white p-8 md:p-12 rounded-3xl border border-slate-200 relative overflow-hidden text-center space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700">
          <Wrench className="w-4 h-4 text-blue-600" />
          <span>Katalog Layanan Perbaikan Spesialis</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display uppercase">
          Layanan Service & Perbaikan IT
        </h1>
        
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pilih kategori perbaikan perangkat Anda. Klik kartu layanan untuk melihat rincian tabel perbaikan, estimasi durasi, dan garansi resmi mdfkingpc.
        </p>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Garansi 30 Hari Perbaikan
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Diagnostik Pengecekan Gratis
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            Komponen Original Bergaransi
          </span>
        </div>
      </div>

      {/* Services Cards Grid */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => {
            const detailUrl = `/layanan/${service.slug}`;

            return (
              <div
                id={service.slug}
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Clickable Image Header */}
                  <Link href={detailUrl} className="block relative h-56 overflow-hidden cursor-pointer bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider border border-slate-200 shadow-xs">
                      {service.category}
                    </span>
                    {service.badge && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm">
                        {service.badge}
                      </span>
                    )}
                  </Link>

                  <div className="p-6 space-y-4">
                    {/* Clickable Title */}
                    <Link href={detailUrl} className="block group/title">
                      <h3 className="text-xl font-bold text-slate-900 group-hover/title:text-blue-600 transition-colors flex items-center justify-between font-sans">
                        <span>{service.title}</span>
                        <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Fitur & Pengerjaan Utama:</span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {service.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Action Bar */}
                <div className="p-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Estimasi Mulai Dari</span>
                    <span className="text-base font-extrabold text-emerald-600">{service.priceStarting}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={detailUrl}
                      className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-3.5 gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600" />
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
      </div>

      {/* COMPONENT EXAMPLE SHOWCASE */}
      <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solusi Kinerja Perangkat</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">
            Solusi Performa: Upgrade SSD NVMe & Ganti Layar Cracked
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Apakah laptop Anda lambat atau layarnya bergaris? Kami menyediakan penggantian suku cadang berkualitas tinggi seperti SSD High-Speed PCIe 4.0 dan layar LCD Original dengan pemasangan langsung di tempat.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <HardDrive className="w-5 h-5 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-900">Booting 5 Detik</h4>
              <p className="text-[11px] text-slate-500">Peningkatan kecepatan hingga 10x dari HDD biasa.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <Laptop className="w-5 h-5 text-red-500" />
              <h4 className="text-xs font-bold text-slate-900">Layar IPS HD Original</h4>
              <p className="text-[11px] text-slate-500">Garansi piksel jernih tanpa cacat warna.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-64 lg:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
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
