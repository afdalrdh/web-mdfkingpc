'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Wrench, PhoneCall, ChevronRight } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/rakit-pc', label: 'Rakit PC' },
    { href: '/testimoni', label: 'Testimoni' },
    { href: '/blog', label: 'Blog' },
    { href: '/tentang-kami', label: 'Tentang Kami' },
    { href: '/kontak', label: 'Kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-dark to-brand-red text-xs py-1.5 px-4 text-center text-white/90 font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-white">Promo Bandung</span>
        <span>Diagnostik Gratis & Garansi 30 Hari Perbaikan Device</span>
        <Link href="/pemesanan" className="underline font-semibold hover:text-white transition-colors ml-1 hidden sm:inline">
          Pesan Sekarang &rarr;
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-brand-dark/90 border border-white/10 p-1 group-hover:border-brand-blue transition-all">
              <Image 
                src="/logo.png" 
                alt="mdfkingpc Logo" 
                width={44} 
                height={44} 
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                mdf<span className="text-brand-blue">king</span><span className="text-brand-red">pc</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-1">
                Made For KING PC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/10 font-semibold shadow-sm border border-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20konsultasi%20service%20device`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-red" />
              <span>{SITE_INFO.whatsappFormatted}</span>
            </a>
            <Link
              href="/pemesanan"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-blue-400/30"
            >
              <Wrench className="w-3.5 h-3.5 mr-1.5 text-brand-red" />
              <span>Form Pemesanan</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#141414]/98 border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive(link.href)
                  ? 'bg-brand-blue/20 text-white border border-brand-blue/30 font-semibold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/pemesanan"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue"
            >
              <Wrench className="w-4 h-4 text-brand-red" />
              <span>Formulir Pemesanan Online</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
