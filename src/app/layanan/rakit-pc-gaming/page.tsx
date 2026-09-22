'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import RakitPcSimulator from '@/components/RakitPcSimulator';

export default function RakitPCPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-12 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-brand-red" />
              <span>Simulasi & Kalkulator Harga Komponen 2025-2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Simulasi Perhitungan <span className="text-sky-400">Rakit PC Gaming</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Pilih komponen impian Anda, hitung harga otomatis, dan minta analisis kompatibilitas Cerdas bertenaga AI Groq!
            </p>
          </div>
        </section>

        {/* SIMULATOR COMPONENT */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RakitPcSimulator />
        </section>
      </main>
    </div>
  );
}
