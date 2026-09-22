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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <Phone className="w-4 h-4 text-red-500" />
          <span>Informasi Kontak & Workshop</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
          Hubungi mdfkingpc Bandung
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Punya pertanyaan seputar servis laptop, rakit PC, atau ingin konsultasi kerusakan? Tim mdfkingpc siap membantu Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-sans border-b border-slate-100 pb-3">Workshop Utama</h3>
            
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Alamat Workshop:</span>
                  <p className="leading-relaxed">{SITE_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Jam Operasional:</span>
                  <p className="leading-relaxed">{SITE_INFO.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">WhatsApp Chat:</span>
                  <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" className="text-emerald-600 font-bold hover:underline">
                    {SITE_INFO.whatsappFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Email Support:</span>
                  <a href={`mailto:${SITE_INFO.email}`} className="text-slate-600 hover:text-blue-600">
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Card */}
          <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200/80 space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-emerald-900 font-sans flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Respon Cepat via WhatsApp</span>
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Butuh jawaban langsung dari teknisi? Klik tombol di bawah untuk membuka chat WhatsApp resmi kami.
            </p>
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20service`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hitboox bg-emerald-600 hover:bg-emerald-700 text-white w-full !py-3.5 text-xs font-bold gap-2 shadow-md shadow-emerald-600/20"
            >
              <span>Chat WhatsApp Seketika</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 font-display uppercase">Kirim Pesan atau Pertanyaan</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 font-sans">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600">
                  Terima kasih sudah menghubungi mdfkingpc. Tim kami akan membalas pesan Anda secepatnya via Email/WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-hitboox btn-hitboox-secondary text-xs !py-2.5 !px-6 mt-2"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Nomor WhatsApp / HP</label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Pesan / Detail Kerusakan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan atau gejala kerusakan perangkat Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-hitboox btn-hitboox-primary w-full !py-4 text-xs font-bold shadow-pill-blue gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
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
