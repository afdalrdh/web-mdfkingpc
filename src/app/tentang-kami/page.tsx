'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Wrench, CheckCircle2, MapPin, Users, Building, ArrowRight } from 'lucide-react';
import { SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function TentangKamiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
            <Building className="w-4 h-4 text-brand-red" />
            <span>Profil mdfkingpc Bandung</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tentang <span className="text-gradient-brand">mdfkingpc</span>
          </h1>

          <p className="text-gray-200 text-base sm:text-lg font-semibold leading-relaxed border-l-4 border-brand-red pl-4">
            &ldquo;{SITE_INFO.story}&rdquo;
          </p>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Berawal dari passion di dunia spesialis hardware dan modifikasi PC di Bandung, mdfkingpc (Made For KING PC) berkembang menjadi penyedia jasa perbaikan laptop, MacBook, PC rakitan, dan perangkat periferal tepercaya bagi ribuan pelanggan dari kalangan profesional, mahasiswa, hingga gamer esport.
          </p>

          <div className="pt-2">
            <Link
              href="/pemesanan"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover font-bold text-xs text-white shadow-glow-blue border border-blue-400/30"
            >
              <span>Hubungi Tim Kami</span>
              <ArrowRight className="w-4 h-4 text-brand-red" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <img
            src={CLOUDINARY_IMAGES.teamPhoto}
            alt="Tim mdfkingpc Bandung"
            className="w-full h-80 object-cover rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>

      {/* STATISTIK KEPERCAYAN */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_INFO.stats.map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <span className="text-3xl sm:text-4xl font-black text-gradient-brand block">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* WORKSHOP & TEKNISI PHOTOS */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand-red text-xs font-bold uppercase tracking-wider">Fasilitas Perbaikan</span>
          <h2 className="text-3xl font-extrabold text-white">Workshop & Galeri Teknisi</h2>
          <p className="text-gray-400 text-sm">
            Fasilitas kerja terlengkap dengan peralatan diagnostik profesional di Dago, Bandung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-4">
            <img
              src={CLOUDINARY_IMAGES.technicianWorking}
              alt="Teknisi bekerja"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white">Teknisi Spesialis Micro Soldering</h3>
              <p className="text-xs text-gray-400">
                Pengerjaan sirkuit IC power, ganti chipset motherboard, dan soldering komponen precision micro-electronics.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-4">
            <img
              src={CLOUDINARY_IMAGES.workshop}
              alt="Workshop mdfkingpc"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-white">Ruang Pengujian & Benchmark</h3>
              <p className="text-xs text-gray-400">
                Setiap PC rakitan & laptop menjalani pengujian stres test suhu thermal & performa sebelum diserahkan ke pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NILAI PERUSAHAAN */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Prinsip Layanan mdfkingpc</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Nilai-nilai utama yang kami pegang teguh demi kepuasan Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <Wrench className="w-8 h-8 text-brand-blue" />
            <h3 className="text-base font-bold text-white">Profesionalisme Tinggi</h3>
            <p className="text-xs text-gray-400">Penanganan transparan sesuai SOP perbaikan perangkat elektronik modern.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-red" />
            <h3 className="text-base font-bold text-white">Harga Transparan</h3>
            <p className="text-xs text-gray-400">Persetujuan biaya perbaikan secara tertulis sebelum pengerjaan dimulai.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <Award className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Garansi 30 Hari Full</h3>
            <p className="text-xs text-gray-400">Jaminan garansi servis purna jual untuk ketenangan pikiran Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
