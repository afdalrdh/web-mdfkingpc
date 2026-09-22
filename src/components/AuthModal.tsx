'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [isGoogleStep, setIsGoogleStep] = useState(false);
  
  // Google custom state
  const [googleEmailInput, setGoogleEmailInput] = useState('afdalramdan@gmail.com');
  const [googleNameInput, setGoogleNameInput] = useState('Afdal Ramdan');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleConfirmGoogleLogin = (selectedEmail: string, selectedName: string) => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: `usr-google-${Date.now()}`,
        name: selectedName || selectedEmail.split('@')[0],
        email: selectedEmail,
        phone: phone || '085158916661',
        address: address || 'Jl. Ir. H. Juanda No. 154, Dago, Bandung',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        role: 'USER',
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('mdfkingpc_user', JSON.stringify(googleUser));
        localStorage.setItem('mdfkingpc_user_token', 'google_simulated_token');
      }
      setLoading(false);
      setIsGoogleStep(false);
      if (onSuccess) onSuccess(googleUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isGoogleStep ? (
          /* GOOGLE ACCOUNT SELECTION STEP */
          <div className="space-y-5 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setIsGoogleStep(false)}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke pilihan login</span>
            </button>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Pilih Akun Google</h2>
              <p className="text-xs text-slate-500 mt-1">Pilih akun Google Anda untuk melanjutkan ke mdfkingpc</p>
            </div>

            {/* Quick Selectable Accounts */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleConfirmGoogleLogin('afdalramdan@gmail.com', 'Afdal Ramdan')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-sm">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-sky-600">Afdal Ramdan</div>
                    <div className="text-[11px] text-slate-500">afdalramdan@gmail.com</div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                type="button"
                onClick={() => handleConfirmGoogleLogin('mdfkingpc@gmail.com', 'MDFKINGPC Official')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-sm">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-sky-600">MDFKINGPC Official</div>
                    <div className="text-[11px] text-slate-500">mdfkingpc@gmail.com</div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Atau Masukkan Email Google Lainnya:</label>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="email.google.anda@gmail.com"
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-sky-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-sky-500 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleConfirmGoogleLogin(googleEmailInput, googleNameInput)}
                disabled={loading || !googleEmailInput}
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {loading ? 'Memproses...' : `Masuk sebagai ${googleEmailInput}`}
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD LOGIN / REGISTER FORM */
          <>
            {/* Pinterest-Style Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500 text-white font-bold text-2xl mb-3 shadow-lg shadow-sky-500/30">
                m
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Selamat Datang di <span className="text-sky-600">mdfkingpc</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {tab === 'login' ? 'Masuk ke akun Anda untuk melanjutkan pemesanan' : 'Daftar akun baru dalam hitungan detik'}
              </p>
            </div>

            {/* Quick Google Login Button */}
            <button
              onClick={() => setIsGoogleStep(true)}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700 text-sm shadow-sm transition-all mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Daftar Baru
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs text-center font-medium">
                {error}
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={handleManualAuth} className="space-y-3">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Ahmad Fauzi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Alamat Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Kata Sandi *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {tab === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nomor WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="085158916661"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
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
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all disabled:opacity-50"
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
  );
}
