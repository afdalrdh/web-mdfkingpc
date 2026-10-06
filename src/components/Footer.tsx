'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040508] text-slate-400 text-sm border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle Blue/Cyan Glow Ambient */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.1] p-1.5 shadow-[0_0_15px_rgba(37,99,235,0.15)] group-hover:border-blue-500/50 transition-all">
                <Image src="/logo.png" alt="mdfkingpc" width={34} height={34} className="object-contain" />
              </div>
              <div>
                <span className="text-lg font-black text-white font-sans">
                  mdf<span className="text-blue-500">king</span><span className="text-rose-500">pc</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-wider font-semibold">MADE FOR KING PC</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {SITE_INFO.story}
            </p>
            <div className="pt-1 text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{SITE_INFO.operatingHours}</span>
            </div>
          </div>

          {/* Col 2: Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Navigasi</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Beranda</Link></li>
              <li><Link href="/layanan" className="hover:text-cyan-400 transition-colors">Katalog Layanan Service</Link></li>
              <li><Link href="/layanan/rakit-pc-gaming" className="hover:text-cyan-400 transition-colors">Kalkulator Rakit PC AI</Link></li>
              <li><Link href="/testimoni" className="hover:text-cyan-400 transition-colors">Testimoni Pelanggan</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Tips & Artikel IT</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-cyan-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pemesanan" className="hover:text-cyan-300 transition-colors font-bold text-cyan-400">Formulir Pemesanan Online</Link></li>
            </ul>
          </div>

          {/* Col 3: Layanan Spesialis */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Layanan Spesialis</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/layanan/servis-laptop-macbook" className="hover:text-cyan-400 transition-colors">Service Laptop & MacBook</Link></li>
              <li><Link href="/layanan/rakit-pc-gaming" className="hover:text-cyan-400 transition-colors">Rakit PC Gaming Custom</Link></li>
              <li><Link href="/layanan/servis-pembersihan-pc" className="hover:text-cyan-400 transition-colors">Perbaikan & Pembersihan PC</Link></li>
              <li><Link href="/layanan/servis-keyboard" className="hover:text-cyan-400 transition-colors">Service Keyboard Mechanical</Link></li>
              <li><Link href="/layanan/servis-mouse" className="hover:text-cyan-400 transition-colors">Service Mouse Gaming</Link></li>
              <li><Link href="/layanan/servis-joystick" className="hover:text-cyan-400 transition-colors">Servis Stick PS5/PS4/PC</Link></li>
            </ul>
          </div>

          {/* Col 4: Workshop Locations & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Lokasi Workshop</h4>
            <div className="space-y-3 text-xs">
              {/* Workshop Bandung */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Workshop Bandung</span>
                <a
                  href={SITE_INFO.addressBandungMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-slate-300 hover:text-cyan-300 transition-colors group"
                  title="Buka di Google Maps"
                >
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed group-hover:underline underline-offset-2">{SITE_INFO.addressBandung}</span>
                </a>
              </div>

              {/* Workshop Cimahi */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Workshop Cimahi</span>
                <a
                  href={SITE_INFO.addressCimahiMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-slate-300 hover:text-cyan-300 transition-colors group"
                  title="Buka di Google Maps"
                >
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed group-hover:underline underline-offset-2">{SITE_INFO.addressCimahi}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300">{SITE_INFO.whatsappFormatted}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300">{SITE_INFO.email}</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20lokasi%20workshop`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hitboox bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs !py-2.5 !px-5 gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} mdfkingpc (Made For KING PC). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/kontak" className="hover:text-slate-300 transition-colors">Bantuan</Link>
            <span>•</span>
            <Link href="/pemesanan" className="hover:text-slate-300 transition-colors">Garansi 30 Hari</Link>
            <span>•</span>
            <span className="text-slate-400">Bandung &amp; Cimahi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

