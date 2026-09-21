'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, Zap, Award, Wrench, Sparkles } from 'lucide-react';
import { PC_PACKAGES, SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function RakitPCPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Hero Banner */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
            <Cpu className="w-4 h-4 text-brand-red" />
            <span>Spesialis Rakit PC Gaming & Workstation Bandung</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Rakit PC Gaming Kustom <span className="text-gradient-brand">Tanpa Biaya Tersembunyi</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Pilihan paket rakitan PC Esports hingga Ultra 4K Workstation. Kami mengutamakan transparansi harga nota komponen, manajemen kabel super rapi, dan instalasi lengkap siap pakai.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Component Original 100% Bergaransi Resmi
            </span>
            <span className="flex items-center gap-1.5 text-xs text-brand-blue font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Gratis Cable Management Rapi & Tuning BIOS
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={CLOUDINARY_IMAGES.pcGaming}
              alt="Rakit PC Gaming mdfkingpc"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 p-3 glass-panel rounded-xl border border-white/10 text-xs text-center font-bold text-white">
              Slogan mdfkingpc: &quot;Harga Jelas Tanpa Biaya Tersembunyi&quot;
            </div>
          </div>
        </div>
      </div>

      {/* PC PACKAGES GRID */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Pilihan Paket Rakitan</span>
          <h2 className="text-3xl font-extrabold text-white">Rekomendasi Paket PC Gaming</h2>
          <p className="text-gray-400 text-sm">
            Tersedia paket siap pakai atau custom spesifikasi sesuai budget Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PC_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-panel rounded-2xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                pkg.badge === 'Rekomendasi Utama'
                  ? 'border-brand-blue shadow-glow-blue bg-gradient-to-b from-[#1E2338] via-[#1C1C1E] to-[#1C1C1E]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold bg-brand-red text-white uppercase tracking-wider shadow-md">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue block">
                    {pkg.tier}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">{pkg.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-xs text-gray-400">Harga Mula:</span>
                    <span className="text-2xl font-black text-emerald-400">{pkg.price}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="space-y-2">
                    <span className="font-bold text-gray-300 uppercase tracking-wider text-[10px] block">Spesifikasi Komponen:</span>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <Cpu className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span><strong>CPU:</strong> {pkg.processor}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <span><strong>VGA/GPU:</strong> {pkg.gpu}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>RAM:</strong> {pkg.ram}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Storage:</strong> {pkg.storage}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span><strong>PSU:</strong> {pkg.psu}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                        <span><strong>Case:</strong> {pkg.case}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="font-bold text-gray-400 text-[10px] uppercase block">Performa Target Games:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.targetGames.map((game, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-medium text-gray-300 border border-white/10">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href={`/pemesanan?service=rakit-pc-gaming&package=${encodeURIComponent(pkg.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all border border-blue-400/30"
                >
                  <span>Pesan Rakit Paket Ini</span>
                  <ArrowRight className="w-4 h-4 text-brand-red" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COST TRANSPARENCY BANNER */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Ingin Rakit PC dengan Komponen Pilihan Sendiri?</h3>
        <p className="text-xs text-gray-300 max-w-xl mx-auto">
          Kirimkan list komponen impian Anda. Kami siap merakitkan dengan transparansi harga nota resmi distributor tanpa markup berlebihan.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20konsultasi%20custom%20rakit%20PC%20gaming`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg shadow-emerald-900/40 transition-all"
          >
            <span>Konsultasi Custom Spec via WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}
