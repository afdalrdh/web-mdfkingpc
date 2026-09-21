'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0D0E] border-t border-white/10 text-gray-400 text-sm relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main CTA Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="glass-panel rounded-2xl p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>Diagnostik Gratis & Garansi 30 Hari</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Butuh Konsultasi Perbaikan Perangkat?
            </h3>
            <p className="text-gray-300 max-w-xl text-sm">
              Hubungi teknisi kami langsung untuk konsultasi masalah laptop, PC rakitan, joystick, maupun peranti IT Anda tanpa dipungut biaya.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20Konsultasi%20Gratis%20perbaikan%20device`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Konsultasi Gratis WA</span>
            </a>
            <Link
              href="/pemesanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover border border-blue-400/30 shadow-glow-blue transition-all"
            >
              <span>Pesan Servis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Links & Contacts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-white/5">
        {/* Col 1: Brand info */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-dark border border-white/10 p-1">
              <Image src="/logo.png" alt="mdfkingpc" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-white">mdf<span className="text-brand-blue">king</span><span className="text-brand-red">pc</span></span>
              <span className="block text-[10px] text-gray-400 tracking-wider">MADE FOR KING PC</span>
            </div>
          </Link>
          <p className="text-xs leading-relaxed text-gray-400">
            {SITE_INFO.story}
          </p>
          <div className="pt-2 text-xs text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-blue shrink-0" />
            <span>{SITE_INFO.operatingHours}</span>
          </div>
        </div>

        {/* Col 2: Halaman Utama */}
        <div className="space-y-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-white/10 pb-2">Navigasi Utama</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
            <li><Link href="/layanan" className="hover:text-white transition-colors">Katalog Layanan Service</Link></li>
            <li><Link href="/rakit-pc" className="hover:text-white transition-colors">Opsi Rakit PC Gaming</Link></li>
            <li><Link href="/testimoni" className="hover:text-white transition-colors">Testimoni Pelanggan</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Tips & Artikel IT</Link></li>
            <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            <li><Link href="/pemesanan" className="hover:text-white transition-colors font-semibold text-brand-blue">Formulir Pemesanan</Link></li>
          </ul>
        </div>

        {/* Col 3: Layanan Spesifik */}
        <div className="space-y-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-white/10 pb-2">Layanan Spesialis</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/layanan#servis-laptop-macbook" className="hover:text-white transition-colors">Service Laptop & MacBook</Link></li>
            <li><Link href="/layanan#rakit-pc-gaming" className="hover:text-white transition-colors">Rakit PC Gaming Custom</Link></li>
            <li><Link href="/layanan#servis-keyboard" className="hover:text-white transition-colors">Service Keyboard Mechanical</Link></li>
            <li><Link href="/layanan#servis-mouse" className="hover:text-white transition-colors">Service Mouse Gaming</Link></li>
            <li><Link href="/layanan#servis-joystick" className="hover:text-white transition-colors">Servis Stick PS5/PS4/PC</Link></li>
            <li><Link href="/layanan#instal-aplikasi-game" className="hover:text-white transition-colors">Instal OS Windows/Mac & Software</Link></li>
          </ul>
        </div>

        {/* Col 4: Info Workshop Bandung */}
        <div className="space-y-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-white/10 pb-2">Kontak Workshop</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>{SITE_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-blue shrink-0" />
              <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" className="hover:text-white">{SITE_INFO.whatsappFormatted}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-red shrink-0" />
              <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white">{SITE_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} mdfkingpc (Made For KING PC) Bandung. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/kontak" className="hover:text-white transition-colors">Lokasi Workshop</Link>
          <a href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20butuh%20Konsultasi%20Gratis`} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-blue-400 font-medium">Konsultasi Gratis</a>
        </div>
      </div>
    </footer>
  );
};
