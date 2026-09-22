'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS_LIST, SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function TestimoniPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <Quote className="w-4 h-4 text-red-500" />
          <span>Ulasan Pelanggan mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
          Apa Kata Pelanggan Kami?
        </h1>
        
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Bukti nyata dedikasi dan profesionalisme teknisi mdfkingpc dalam menangani setiap perbaikan peranti laptop, PC rakitan, dan perangkat IT di Bandung.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_LIST.map((t) => (
          <div
            key={t.id}
            className="bg-white p-8 rounded-3xl border border-slate-200/90 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md relative"
          >
            <Quote className="w-8 h-8 text-blue-200 absolute top-6 right-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm italic text-slate-700 leading-relaxed font-sans">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
              <img
                src={t.avatarUrl}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-xs"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">{t.name}</h3>
                <span className="text-xs text-blue-600 font-semibold block">{t.serviceType}</span>
                <span className="text-[11px] text-slate-500">{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Workshop Banner Photo */}
      <div className="bg-slate-50/70 p-8 md:p-10 rounded-3xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
        <div className="lg:col-span-5 relative">
          <img
            src={CLOUDINARY_IMAGES.workshop}
            alt="Workshop mdfkingpc Bandung"
            className="w-full h-64 object-cover rounded-2xl border border-slate-200 shadow-md"
          />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
            Jaminan Kepuasan 100%
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">
            Workshop Profesional & Peralatan Standar Industri
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Setiap pengerjaan dilakukan di ruang workshop bebas debu dengan peralatan ukur & soldering presisi tinggi. Nikmati diagnostik gratis dan garansi pengerjaan 30 hari penuh.
          </p>
          <div className="pt-2">
            <Link
              href="/pemesanan"
              className="btn-hitboox btn-hitboox-primary text-xs !py-3.5 !px-7 font-bold tracking-wider shadow-pill-blue"
            >
              <span>Jadwalkan Perbaikan Sekarang</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
