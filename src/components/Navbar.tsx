'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Wrench,
  ChevronDown,
  ChevronRight,
  Laptop,
  Cpu,
  Keyboard,
  Mouse,
  Gamepad2,
  Download,
  LogOut,
  PackageCheck,
  Settings,
  Sparkles,
} from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';
import AuthModal from '@/components/AuthModal';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mdfkingpc_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mdfkingpc_user');
      localStorage.removeItem('mdfkingpc_user_token');
    }
    setUser(null);
    setIsUserDropdownOpen(false);
  };

  const serviceSubmenu = [
    { href: '/layanan/servis-laptop-macbook', label: 'Service Laptop & MacBook', icon: Laptop, desc: 'Layar, baterai, motherboard mati total' },
    { href: '/layanan/rakit-pc-gaming', label: 'Rakit PC Gaming & Workstation', icon: Cpu, desc: 'Simulasi kalkulator harga 2025-2026' },
    { href: '/layanan/servis-keyboard', label: 'Servis Keyboard Laptop & Mechanical', icon: Keyboard, desc: 'Ganti switch, tuts macet, modding' },
    { href: '/layanan/servis-mouse', label: 'Servis Mouse Gaming & Office', icon: Mouse, desc: 'Anti double-click, scroll encoder' },
    { href: '/layanan/servis-joystick', label: 'Servis Joystick PS4, PS5 & PC', icon: Gamepad2, desc: 'Upgrade Hall Effect anti drift' },
    { href: '/layanan/servis-pembersihan-pc', label: 'Perbaikan & Pembersihan PC', icon: Wrench, desc: 'Deep cleaning, thermal paste, & PC no display' },
    { href: '/layanan/instal-aplikasi-game', label: 'Instal OS, Aplikasi & Game PC', icon: Download, desc: 'Windows 10/11, Adobe, Game AAA' },
  ];

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/layanan', label: 'Layanan', hasDropdown: true },
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
    <>
      <header className="sticky top-0 z-50 dark:bg-[#07080B]/85 bg-white/90 backdrop-blur-2xl dark:border-white/[0.08] border-black/[0.06] border-b transition-all duration-300 dark:shadow-[0_4px_30px_rgba(0,0,0,0.6)] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        {/* Top Info Banner - Dark Luxury Carbon with Cyan & Sapphire Glow */}
        <div className="bg-gradient-to-r from-[#080A10] via-[#0E1528] to-[#080A10] border-b border-white/[0.06] text-xs py-1.5 px-4 text-center text-slate-300 font-medium tracking-wide flex items-center justify-center gap-2">
          <span className="bg-blue-500/20 text-cyan-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            Promo Bandung
          </span>
          <span className="text-slate-300">Diagnostik Gratis & Garansi 30 Hari Perbaikan Device</span>
          <Link href="/pemesanan" className="underline font-semibold text-cyan-400 hover:text-cyan-300 transition-colors ml-1 hidden sm:inline">
            Pesan Sekarang &rarr;
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl dark:bg-white/[0.04] bg-slate-100 dark:border-white/[0.1] border-slate-200 border p-1.5 dark:shadow-[0_0_15px_rgba(37,99,235,0.15)] shadow-sm group-hover:border-blue-500/60 group-hover:shadow-[0_0_22px_rgba(37,99,235,0.35)] transition-all">
                <Image
                  src="/logo.png"
                  alt="mdfkingpc Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight dark:text-white text-slate-900 flex items-center gap-0.5 font-sans">
                  mdf<span className="text-blue-500">king</span><span className="text-rose-500">pc</span>
                </span>
                <span className="text-[10px] dark:text-slate-400 text-slate-500 font-semibold tracking-wider uppercase -mt-1">
                  Made For KING PC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                          isActive(link.href)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 font-bold border border-blue-200/90 dark:border-blue-500/30 shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                      </Link>

                      {/* Dropdown Menu - Wide 2-Column Grid */}
                      {isServicesOpen && (
                        <div className="absolute top-full -left-12 pt-2 w-[620px] lg:w-[660px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="bg-white dark:bg-[#0D0F18] backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5">
                            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-2">
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Katalog Layanan Spesialis IT
                              </span>
                              <span className="text-[10px] font-semibold text-blue-600 dark:text-cyan-400">
                                Diagnostik Rp 0 • Garansi 30 Hari
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {serviceSubmenu.map((sub) => {
                                const IconComponent = sub.icon;
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-all group"
                                  >
                                    <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-cyan-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs shrink-0 mt-0.5">
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {sub.label}
                                      </div>
                                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                        {sub.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}

                              {/* 8th Slot: Explore All Services Card */}
                              <Link
                                href="/layanan"
                                className="flex items-start gap-3 p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-cyan-950/30 border border-blue-200/60 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all group"
                              >
                                <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                  <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold leading-snug text-blue-700 dark:text-cyan-300 group-hover:text-blue-800 dark:group-hover:text-cyan-200 transition-colors flex items-center gap-1">
                                    <span>Lihat Semua Layanan</span>
                                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                  </div>
                                  <div className="text-[11px] text-blue-600/70 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    Katalog komplit &amp; rincian harga
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* Bottom Banner */}
                            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3 text-[11px] text-slate-500 dark:text-slate-400">
                              <span>Workshop Bandung &amp; Cimahi buka setiap hari</span>
                              <Link
                                href="/kontak"
                                className="text-blue-600 dark:text-cyan-400 font-bold hover:underline"
                              >
                                Lokasi &amp; Jam Buka &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 font-bold border border-blue-200/90 dark:border-blue-500/30 shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions - Hitboox Cut-Corner Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="btn-hitboox btn-hitboox-secondary text-xs !py-2 !px-3.5 flex items-center gap-2 font-bold"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 dark:bg-[#0D0F17] bg-white backdrop-blur-2xl dark:border-slate-800 border-slate-200 border rounded-2xl shadow-2xl p-2 z-50 text-xs">
                      <div className="px-3 py-2 dark:border-slate-800 border-slate-100 border-b mb-1">
                        <div className="font-bold dark:text-white text-slate-900 truncate">{user.name}</div>
                        <div className="text-[11px] dark:text-slate-400 text-slate-500 truncate">{user.email}</div>
                      </div>
                      <Link
                        href="/pesanan-saya"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-blue-700 dark:hover:bg-white/[0.06] hover:bg-slate-50 transition-colors font-medium"
                      >
                        <PackageCheck className="w-4 h-4 text-blue-400" />
                        <span>Pesanan Saya</span>
                      </Link>
                      <Link
                        href="/pengaturan-akun"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-blue-700 dark:hover:bg-white/[0.06] hover:bg-slate-50 transition-colors font-medium"
                      >
                        <Settings className="w-4 h-4 text-indigo-400" />
                        <span>Pengaturan Akun</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors text-left mt-1 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-hitboox btn-hitboox-secondary text-xs !py-2 !px-5"
                >
                  Login
                </button>
              )}

              <Link
                href="/pemesanan"
                className="btn-hitboox btn-hitboox-primary text-xs !py-2 !px-5 gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5 text-blue-200" />
                <span>Form Pemesanan</span>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {user ? (
                <Link href="/pesanan-saya" className="p-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/40">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </Link>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]"
                >
                  Login
                </button>
              )}
              {/* Theme Toggle — mobile */}
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden dark:bg-[#090B10] bg-white backdrop-blur-2xl dark:border-slate-800 border-slate-200 border-b px-4 pt-2 pb-6 space-y-2 animate-fadeIn shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}

            <div className="pt-2 border-t dark:border-white/[0.08] border-slate-200">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 py-1 uppercase tracking-wider">Layanan Servis</div>
              {serviceSubmenu.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-lg transition-colors font-medium"
                >
                  <sub.icon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>{sub.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <Link
                href="/pemesanan"
                onClick={() => setIsOpen(false)}
                className="btn-hitboox btn-hitboox-primary text-xs !py-3 w-full gap-2"
              >
                <Wrench className="w-4 h-4 text-blue-200" />
                <span>Formulir Pemesanan Online</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
};
