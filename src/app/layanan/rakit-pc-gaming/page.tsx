'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import RakitPcSimulator from '@/components/RakitPcSimulator';

export default function RakitPCPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-14 bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Simulasi & Kalkulator Harga Komponen 2025-2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display uppercase tracking-tight mb-4">
              Simulasi Perhitungan <span className="text-blue-600">Rakit PC Gaming</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
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
