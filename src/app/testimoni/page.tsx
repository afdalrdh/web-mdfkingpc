'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';
import { CLOUDINARY_IMAGES } from '@/data/mockData';

interface TestimonialItem {
  id: string;
  name: string;
  location?: string;
  rating: number;
  serviceType: string;
  quote: string;
  avatarUrl?: string;
}

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
          <Quote className="w-4 h-4 text-cyan-400" />
          <span>Ulasan Pelanggan mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display uppercase tracking-tight">
          Apa Kata Pelanggan Kami?
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Bukti nyata dedikasi dan profesionalisme teknisi mdfkingpc dalam menangani setiap perbaikan peranti laptop, PC rakitan, dan perangkat IT di Bandung.
        </p>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-slate-400 text-sm">Memuat ulasan pelanggan...</span>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Belum ada ulasan tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative bg-[#0D0F18]/90 backdrop-blur-md p-8 rounded-3xl cut-corner-card border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-lg hover:shadow-[0_15px_40px_rgba(0,102,255,0.1)] group overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/[0.07] rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-sm italic text-slate-300 leading-relaxed font-sans">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06] relative z-10">
                <img
                  src={t.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                />
                <div>
                  <h3 className="text-sm font-bold text-white font-sans">{t.name}</h3>
                  <span className="text-xs text-cyan-400 font-semibold block">{t.serviceType}</span>
                  <span className="text-[11px] text-slate-500">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Professional Workshop Banner Photo */}
      <div className="relative bg-gradient-to-br from-[#0B0E18] via-[#07091A] to-[#040509] p-8 md:p-10 rounded-3xl cut-corner-container-lg border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/[0.1] rounded-full blur-[100px] pointer-events-none" />
        <div className="lg:col-span-5 relative z-10">
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <img
              src={CLOUDINARY_IMAGES.workshop}
              alt="Workshop mdfkingpc Bandung"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0E18]/20 pointer-events-none" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Jaminan Kepuasan 100%
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase">
            Workshop Profesional &amp; Peralatan Standar Industri
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Setiap pengerjaan dilakukan di ruang workshop bebas debu dengan peralatan ukur &amp; soldering presisi tinggi. Nikmati diagnostik gratis dan garansi pengerjaan 30 hari penuh.
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
