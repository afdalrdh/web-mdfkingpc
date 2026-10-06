'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import RakitPcSimulator from '@/components/RakitPcSimulator';

export default function RakitPCPage() {
  return (
    <div className="min-h-screen bg-transparent dark:text-slate-100 text-slate-800 flex flex-col font-sans">
      <main className="flex-1">
        {/* Header Hero */}
        <section className="relative py-14 lg:py-20 dark:bg-gradient-to-b dark:from-[#0B0E18] dark:via-[#070911] dark:to-transparent bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-transparent border-b dark:border-white/[0.06] border-slate-200/80 overflow-hidden">
          {/* Ambient Studio Lighting Blooms */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/[0.12] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/[0.09] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-cyan-400 bg-blue-50 border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Simulasi & Kalkulator Harga Komponen 2025-2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-slate-900 font-display uppercase tracking-tight mb-4">
              Simulasi Perhitungan <span className="dark:text-cyan-400 text-blue-600">Rakit PC Gaming</span>
            </h1>
            <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Pilih komponen impian Anda, hitung harga pasar terkini, dan minta analisis kompatibilitas cerdas bertenaga AI Groq!
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
