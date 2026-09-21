'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS_LIST, SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function TestimoniPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
          <Quote className="w-4 h-4 text-brand-red" />
          <span>Ulasan Pelanggan mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Apa Kata Pelanggan Kami?
        </h1>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Bukti nyata dedikasi dan profesionalisme teknisi mdfkingpc dalam menangani setiap perbaikan peranti laptop, PC rakitan, dan perangkat IT di Bandung.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_LIST.map((t) => (
          <div
            key={t.id}
            className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-brand-blue/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative"
          >
            <Quote className="w-8 h-8 text-brand-blue/30 absolute top-6 right-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm italic text-gray-200 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img
                src={t.avatarUrl}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{t.name}</h3>
                <span className="text-xs text-brand-blue font-semibold block">{t.serviceType}</span>
                <span className="text-[11px] text-gray-400">{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Workshop Banner Photo */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 relative">
          <img
            src={CLOUDINARY_IMAGES.workshop}
            alt="Workshop mdfkingpc Bandung"
            className="w-full h-64 object-cover rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <span className="px-3 py-1 rounded bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
            Jaminan Kepuasan 100%
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Workshop Profesional & Peralatan Standar Industri
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Setiap pengerjaan dilakukan di ruang workshop bebas debu dengan peralatan ukur & soldering presisi tinggi. Nikmati diagnostik gratis dan garansi pengerjaan 30 hari penuh.
          </p>
          <div className="pt-2">
            <Link
              href="/pemesanan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-xs font-bold text-white shadow-glow-blue border border-blue-400/30"
            >
              <span>Jadwalkan Perbaikan Sekarang</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
