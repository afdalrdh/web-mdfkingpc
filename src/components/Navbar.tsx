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
  User as UserIcon,
  LogOut,
  PackageCheck,
  Settings,
} from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';
import AuthModal from '@/components/AuthModal';

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
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(link.href)
                            ? 'text-white bg-white/10 font-semibold shadow-sm border border-white/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      {/* Dropdown Menu */}
                      {isServicesOpen && (
                        <div className="absolute top-full left-0 w-80 bg-[#171717] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                          <div className="text-[11px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">
                            Pilih Layanan Servis
                          </div>
                          {serviceSubmenu.map((sub) => {
                            const IconComponent = sub.icon;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-all group"
                              >
                                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-bold leading-tight text-white group-hover:text-sky-300">
                                    {sub.label}
                                  </div>
                                  <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
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
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-all text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <div className="font-bold text-white truncate">{user.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">{user.email}</div>
                      </div>
                      <Link
                        href="/pesanan-saya"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <PackageCheck className="w-4 h-4 text-sky-400" />
                        <span>Pesanan Saya</span>
                      </Link>
                      <Link
                        href="/pengaturan-akun"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-purple-400" />
                        <span>Pengaturan Akun</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left mt-1"
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
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md transition-all"
                >
                  Login
                </button>
              )}

              <Link
                href="/pemesanan"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-blue-400/30"
              >
                <Wrench className="w-3.5 h-3.5 mr-1.5 text-brand-red" />
                <span>Form Pemesanan</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {user ? (
                <Link href="/pesanan-saya" className="p-2 rounded-xl bg-sky-500/20 text-sky-400 text-xs font-bold">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </Link>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/10"
                >
                  Login
                </button>
              )}
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

            <div className="pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-gray-400 px-2 py-1 uppercase tracking-wider">Layanan Servis</div>
              {serviceSubmenu.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-white"
                >
                  <sub.icon className="w-3.5 h-3.5 text-sky-400" />
                  <span>{sub.label}</span>
                </Link>
              ))}
            </div>

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

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
};
