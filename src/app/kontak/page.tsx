'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
          <Phone className="w-4 h-4 text-brand-red" />
          <span>Informasi Kontak & Workshop</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Hubungi mdfkingpc Bandung
        </h1>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Punya pertanyaan seputar servis laptop, rakit PC, atau ingin konsultasi kerusakan? Tim mdfkingpc siap membantu Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Workshop Utama</h3>
            
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Alamat Workshop:</span>
                  <p className="leading-relaxed">{SITE_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Jam Operasional:</span>
                  <p className="leading-relaxed">{SITE_INFO.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">WhatsApp Chat:</span>
                  <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" className="text-emerald-400 font-bold hover:underline">
                    {SITE_INFO.whatsappFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-red shrink-0" />
                <div>
                  <span className="font-bold text-white block">Email Support:</span>
                  <a href={`mailto:${SITE_INFO.email}`} className="text-gray-300 hover:text-white">
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Card */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Respon Cepat via WhatsApp</span>
            </h4>
            <p className="text-xs text-gray-300">
              Butuh jawaban langsung dari teknisi? Klik tombol di bawah untuk membuka chat WhatsApp resmi kami.
            </p>
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20service`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50 transition-all"
            >
              <span>Chat WhatsApp Seketika</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-2xl font-bold text-white">Kirim Pesan atau Pertanyaan</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-gray-300">
                  Terima kasih sudah menghubungi mdfkingpc. Tim kami akan membalas pesan Anda secepatnya via Email/WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 mt-2"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Nomor WhatsApp / HP</label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Pesan / Detail Kerusakan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan atau gejala kerusakan perangkat Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue border border-blue-400/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-brand-red" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
