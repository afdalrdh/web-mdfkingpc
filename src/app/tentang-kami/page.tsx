'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Wrench, CheckCircle2, MapPin, Users, Building, ArrowRight } from 'lucide-react';
import { SITE_INFO, CLOUDINARY_IMAGES } from '@/data/mockData';

export default function TentangKamiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      {/* Hero Section */}
      <div className="bg-slate-50/70 p-8 md:p-12 rounded-3xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xs">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
            <Building className="w-4 h-4 text-red-500" />
            <span>Profil mdfkingpc Bandung</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
            Tentang <span className="text-blue-600">mdfkingpc</span>
          </h1>

          <p className="text-slate-800 text-base sm:text-lg font-semibold leading-relaxed border-l-4 border-red-500 pl-4 bg-white/80 p-3 rounded-r-2xl shadow-xs">
            &ldquo;{SITE_INFO.story}&rdquo;
          </p>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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

        <div className="lg:col-span-5 relative">
          <img
            src={CLOUDINARY_IMAGES.teamPhoto}
            alt="Tim mdfkingpc Bandung"
            className="w-full h-80 object-cover rounded-2xl border border-slate-200 shadow-md"
          />
        </div>
      </div>

      {/* STATISTIK KEPERCAYAAN */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_INFO.stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center space-y-2 shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 font-display block">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* WORKSHOP & TEKNISI PHOTOS */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Fasilitas Perbaikan</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display uppercase">Workshop & Galeri Teknisi</h2>
          <p className="text-slate-600 text-sm">
            Fasilitas kerja terlengkap dengan peralatan diagnostik profesional di Dago, Bandung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs space-y-4">
            <img
              src={CLOUDINARY_IMAGES.technicianWorking}
              alt="Teknisi bekerja"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 font-sans">Teknisi Spesialis Micro Soldering</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengerjaan sirkuit IC power, ganti chipset motherboard, dan soldering komponen precision micro-electronics.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs space-y-4">
            <img
              src={CLOUDINARY_IMAGES.workshop}
              alt="Workshop mdfkingpc"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 font-sans">Ruang Pengujian & Benchmark</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap PC rakitan & laptop menjalani pengujian stres test suhu thermal & performa sebelum diserahkan ke pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NILAI PERUSAHAAN */}
      <div className="bg-slate-50/70 p-8 md:p-10 rounded-3xl border border-slate-200/80 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">Prinsip Layanan mdfkingpc</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Nilai-nilai utama yang kami pegang teguh demi kepuasan Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-xs">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 font-sans">Profesionalisme Tinggi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Penanganan transparan sesuai SOP perbaikan perangkat elektronik modern.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-red-500" />
            <h3 className="text-base font-bold text-slate-900 font-sans">Harga Transparan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Persetujuan biaya perbaikan secara tertulis sebelum pengerjaan dimulai.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-xs">
            <Award className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-sans">Garansi 30 Hari Full</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Jaminan garansi servis purna jual untuk ketenangan pikiran Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
