'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Blue Glow Ambient */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 p-1.5 shadow-sm">
                <Image src="/logo.png" alt="mdfkingpc" width={34} height={34} className="object-contain" />
              </div>
              <div>
                <span className="text-lg font-black text-white font-sans">
                  mdf<span className="text-blue-500">king</span><span className="text-red-500">pc</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-wider font-semibold">MADE FOR KING PC</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {SITE_INFO.story}
            </p>
            <div className="pt-1 text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{SITE_INFO.operatingHours}</span>
            </div>
          </div>

          {/* Col 2: Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Navigasi</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/layanan" className="hover:text-white transition-colors">Katalog Layanan Service</Link></li>
              <li><Link href="/layanan/rakit-pc-gaming" className="hover:text-white transition-colors">Kalkulator Rakit PC AI</Link></li>
              <li><Link href="/testimoni" className="hover:text-white transition-colors">Testimoni Pelanggan</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Tips & Artikel IT</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pemesanan" className="hover:text-blue-400 transition-colors font-bold text-blue-500">Formulir Pemesanan Online</Link></li>
            </ul>
          </div>

          {/* Col 3: Layanan Spesialis */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Layanan Spesialis</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/layanan/servis-laptop-macbook" className="hover:text-white transition-colors">Service Laptop & MacBook</Link></li>
              <li><Link href="/layanan/rakit-pc-gaming" className="hover:text-white transition-colors">Rakit PC Gaming Custom</Link></li>
              <li><Link href="/layanan/servis-pembersihan-pc" className="hover:text-white transition-colors">Perbaikan & Pembersihan PC</Link></li>
              <li><Link href="/layanan/servis-keyboard" className="hover:text-white transition-colors">Service Keyboard Mechanical</Link></li>
              <li><Link href="/layanan/servis-mouse" className="hover:text-white transition-colors">Service Mouse Gaming</Link></li>
              <li><Link href="/layanan/servis-joystick" className="hover:text-white transition-colors">Servis Stick PS5/PS4/PC</Link></li>
            </ul>
          </div>

          {/* Col 4: Workshop Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-sans">Workshop Bandung</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+62 851-5891-6661</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>mdfkingpc@gmail.com</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20lokasi%20workshop`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hitboox bg-emerald-600 hover:bg-emerald-500 text-white text-xs !py-2 !px-4 gap-1.5 shadow-sm"
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
            <Link href="/kontak" className="hover:text-slate-400 transition-colors">Bantuan</Link>
            <span>•</span>
            <Link href="/pemesanan" className="hover:text-slate-400 transition-colors">Garansi 30 Hari</Link>
            <span>•</span>
            <span className="text-slate-400">Dago, Bandung</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
