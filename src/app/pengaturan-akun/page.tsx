'use client';

import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, MapPin, Save, CheckCircle2 } from 'lucide-react';

export default function PengaturanAkunPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mdfkingpc_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setName(parsed.name || '');
          setPhone(parsed.phone || '');
          setAddress(parsed.address || '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name,
          phone,
          address,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, name, phone, address };
        setUser(updatedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('mdfkingpc_user', JSON.stringify(updatedUser));
        }
        setSuccessMsg('Profil berhasil diperbarui!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1 py-12 max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-bold text-slate-900 font-display uppercase flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-blue-600" />
              <span>Pengaturan Profil Akun</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Perbarui informasi kontak & alamat pengiriman servis Anda.
            </p>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Lengkap</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all text-xs shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Alamat Email (Akun)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 outline-none text-xs cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Nomor WhatsApp / HP</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="085158916661"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all text-xs shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Alamat Lengkap</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  rows={3}
                  placeholder="Jl. Ir. H. Juanda No. 154, Dago, Bandung"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all text-xs shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
