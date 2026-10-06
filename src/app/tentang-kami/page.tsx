'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Wrench, CheckCircle2, MapPin, Users, Building, ArrowRight } from 'lucide-react';
import { SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function TentangKamiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans text-slate-100">
      {/* Hero Section */}
      <div className="relative rounded-3xl cut-corner-container-lg border border-white/[0.08] bg-gradient-to-br from-[#0B0E18] via-[#070C16] to-[#040509] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 md:p-12 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
        {/* Glow atmosphere */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-500/[0.09] rounded-full blur-[100px] pointer-events-none" />

        <div className="lg:col-span-7 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
            <Building className="w-4 h-4 text-cyan-400" />
            <span>Profil mdfkingpc Bandung</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display uppercase tracking-tight">
            Tentang <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">mdfkingpc</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg font-semibold leading-relaxed border-l-4 border-cyan-500/60 pl-4 bg-white/[0.03] p-3 rounded-r-2xl backdrop-blur-sm">
            &ldquo;{SITE_INFO.story}&rdquo;
          </p>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Berawal dari passion di dunia spesialis hardware dan modifikasi PC di Bandung, mdfkingpc (Made For KING PC) berkembang menjadi penyedia jasa perbaikan laptop, MacBook, PC rakitan, dan perangkat periferal tepercaya bagi ribuan pelanggan dari kalangan profesional, mahasiswa, hingga gamer esport.
          </p>

          <div className="pt-2">
            <Link
              href="/pemesanan"
              className="btn-hitboox btn-hitboox-primary text-xs !py-3.5 !px-7 font-bold tracking-wider shadow-pill-blue gap-2"
            >
              <span>Hubungi Tim Kami</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <img
              src={CLOUDINARY_IMAGES.teamPhoto}
              alt="Tim mdfkingpc Bandung"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* STATISTIK KEPERCAYAAN */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_INFO.stats.map((stat, idx) => (
          <div key={idx} className="bg-[#0D0F18]/90 cut-corner-card p-6 rounded-2xl border border-white/[0.08] text-center space-y-2 shadow-lg hover:border-cyan-500/30 transition-all duration-300 group">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-display block group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* WORKSHOP & TEKNISI PHOTOS */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Fasilitas Perbaikan</span>
          <h2 className="text-3xl font-extrabold text-white font-display uppercase">Workshop & Galeri Teknisi</h2>
          <p className="text-slate-400 text-sm">
            Fasilitas kerja terlengkap dengan peralatan diagnostik profesional di Bandung dan Cimahi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0D0F18]/90 cut-corner-card rounded-2xl overflow-hidden border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 shadow-lg group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={CLOUDINARY_IMAGES.technicianWorking}
                alt="Teknisi bekerja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F18]/80 via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white font-sans">Teknisi Spesialis Micro Soldering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pengerjaan sirkuit IC power, ganti chipset motherboard, dan soldering komponen precision micro-electronics.
              </p>
            </div>
          </div>

          <div className="bg-[#0D0F18]/90 cut-corner-card rounded-2xl overflow-hidden border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 shadow-lg group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={CLOUDINARY_IMAGES.workshop}
                alt="Workshop mdfkingpc"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F18]/80 via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white font-sans">Ruang Pengujian & Benchmark</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Setiap PC rakitan & laptop menjalani pengujian stres test suhu thermal & performa sebelum diserahkan ke pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NILAI PERUSAHAAN */}
      <div className="relative bg-gradient-to-br from-[#0B0E18] to-[#060911] p-8 md:p-10 rounded-3xl cut-corner-container-lg border border-white/[0.08] space-y-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/[0.08] rounded-full blur-[80px] pointer-events-none" />
        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase">Prinsip Layanan mdfkingpc</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Nilai-nilai utama yang kami pegang teguh demi kepuasan Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Profesionalisme Tinggi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Penanganan transparan sesuai SOP perbaikan perangkat elektronik modern.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Harga Transparan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Persetujuan biaya perbaikan secara tertulis sebelum pengerjaan dimulai.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Garansi 30 Hari Full</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Jaminan garansi servis purna jual untuk ketenangan pikiran Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
