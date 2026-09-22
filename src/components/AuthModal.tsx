'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react';
import Script from 'next/script';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [isGoogleStep, setIsGoogleStep] = useState(false);
  
  // Custom Google input state
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [showCustomGoogleForm, setShowCustomGoogleForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // List of accounts for Google prompt
  const googleAccounts = [
    { name: 'Afdal', email: 'afdalramdan@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
    { name: 'Mdfking PC', email: 'mdfkingpc@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
    { name: 'Andrian Solid', email: 'ptsolidsejahtera@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
    { name: 'Nadine Nadila', email: 'nadinenadila12@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
    { name: 'Fadilatul Bahri', email: 'fadilatul383@gmail.com', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop' },
  ];

  if (!isOpen) return null;

  const handleManualAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = tab === 'login' ? '/api/auth/user-login' : '/api/auth/register';
      const bodyPayload = tab === 'login' ? { email, password } : { name, email, password, phone, address };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal melakukan otentikasi.');
      }

      // Save user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mdfkingpc_user', JSON.stringify(data.user));
        localStorage.setItem('mdfkingpc_user_token', data.token || '');
      }

      if (onSuccess) onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmGoogleLogin = async (selectedEmail: string, selectedName: string, avatarUrl?: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedEmail,
          name: selectedName || selectedEmail.split('@')[0],
          image: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedName)}&background=0284c7&color=fff`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal autentikasi Google.');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('mdfkingpc_user', JSON.stringify(data.user));
        localStorage.setItem('mdfkingpc_user_token', data.token || '');
      }

      setIsGoogleStep(false);
      setShowCustomGoogleForm(false);
      if (onSuccess) onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal login Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerGoogleAuth = () => {
    if (typeof window !== 'undefined') {
      const width = 520;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        '/api/auth/google',
        'google_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top},status=yes,scrollbars=yes`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Fallback to in-modal selector if popup is blocked
        setIsGoogleStep(true);
      }
    } else {
      setIsGoogleStep(true);
    }
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div
          className={`relative w-full ${isGoogleStep ? 'max-w-lg bg-[#121212] text-slate-100 border-slate-800' : 'max-w-md bg-white text-slate-800 border-slate-100'} rounded-3xl shadow-2xl p-6 sm:p-8 border overflow-hidden transition-all`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
              isGoogleStep ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {isGoogleStep ? (
            /* OFFICIAL GOOGLE DARK-MODE CHOOSE AN ACCOUNT UI */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Google Header Bar */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 -mt-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-xs font-semibold text-slate-300">Sign in with Google</span>
              </div>

              {/* Title Section */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-600/30">
                  m
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Choose an account</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    to continue to <span className="font-bold text-sky-400">mdfkingpc</span>
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {/* Account Selection List */}
              {!showCustomGoogleForm ? (
                <div className="space-y-1.5 border-t border-slate-800/80 pt-3 max-h-72 overflow-y-auto pr-1">
                  {googleAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={loading}
                      onClick={() => handleConfirmGoogleLogin(acc.email, acc.name, acc.avatar)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-700 shrink-0 border border-slate-600">
                          {/* Avatar Image */}
                          <img src={acc.avatar} alt={acc.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-200 group-hover:text-sky-300 transition-colors">
                            {acc.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{acc.email}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium group-hover:text-slate-400">
                        Signed out
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleForm(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-left group mt-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-sky-500 group-hover:text-sky-400">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-200 group-hover:text-sky-300">
                        Use another account
                      </div>
                      <div className="text-[11px] text-slate-400">Masuk dengan akun Google Anda sendiri</div>
                    </div>
                  </button>
                </div>
              ) : (
                /* Custom Google Account Input Form */
                <div className="space-y-4 border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Masukkan Akun Google Anda:</span>
                    <button
                      type="button"
                      onClick={() => setShowCustomGoogleForm(false)}
                      className="text-[11px] text-sky-400 hover:underline"
                    >
                      &larr; Pilih dari daftar
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Email Google *</label>
                      <input
                        type="email"
                        required
                        placeholder="contoh@gmail.com"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Akun Anda"
                        value={customGoogleName}
                        onChange={(e) => setCustomGoogleName(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={loading || !customGoogleEmail}
                    onClick={() => handleConfirmGoogleLogin(customGoogleEmail, customGoogleName)}
                    className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Memproses...' : `Lanjutkan Sebagai ${customGoogleEmail || 'Google User'}`}
                  </button>
                </div>
              )}

              <div className="border-t border-slate-800/80 pt-4 text-[10px] text-slate-500 leading-relaxed">
                Before using this app, you can review mdfkingpc's{' '}
                <a href="/tentang-kami" className="text-sky-400 hover:underline">Privacy Policy</a> and{' '}
                <a href="/tentang-kami" className="text-sky-400 hover:underline">Terms of Service</a>.
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsGoogleStep(false);
                  setShowCustomGoogleForm(false);
                }}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors text-center"
              >
                &larr; Batal & Kembali
              </button>
            </div>
          ) : (
            /* STANDARD LOGIN / REGISTER FORM */
            <>
              {/* Pinterest-Style Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white font-black text-2xl mb-3 shadow-md shadow-blue-600/30 font-sans uppercase">
                  M
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display uppercase">
                  Selamat Datang di <span className="text-blue-600">mdfkingpc</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {tab === 'login' ? 'Masuk ke akun Anda untuk melanjutkan pemesanan' : 'Daftar akun baru dalam hitungan detik'}
                </p>
              </div>

              {/* Quick Google Login Button */}
              <button
                onClick={handleTriggerGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 btn-hitboox btn-hitboox-secondary border border-slate-200 hover:border-slate-300 font-semibold text-slate-700 text-xs shadow-xs transition-all mb-4"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Lanjutkan dengan Google
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider font-medium">atau</span>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-full mb-4">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Daftar
                </button>
              </div>

              {error && (
                <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Manual Form */}
              <form onSubmit={handleManualAuth} className="space-y-3.5">
                {tab === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap Anda"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Alamat Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {tab === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="08123456789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Jl. Ir. H. Juanda No. 154, Dago, Bandung"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 btn-hitboox btn-hitboox-primary !py-3.5 text-xs font-bold disabled:opacity-50"
                >
                  {loading ? 'Memproses...' : tab === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}
                </button>
              </form>

              <p className="text-[11px] text-slate-400 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi mdfkingpc.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
