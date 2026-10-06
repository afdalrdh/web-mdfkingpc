'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ExternalLink } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>Informasi Kontak & Workshop</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display uppercase tracking-tight">
          Hubungi mdfkingpc (Bandung &amp; Cimahi)
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Punya pertanyaan seputar servis laptop, rakit PC, atau ingin konsultasi kerusakan? Tim mdfkingpc siap membantu Anda di workshop Bandung dan Cimahi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative bg-[#0D0F18]/90 backdrop-blur-md p-6 rounded-3xl border border-white/[0.08] shadow-lg space-y-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/[0.1] rounded-full blur-[70px] pointer-events-none" />
            <h3 className="text-lg font-bold text-white font-sans border-b border-white/[0.08] pb-3 relative z-10">Lokasi Workshop Kami</h3>
            
            <div className="space-y-4 text-xs text-slate-400 relative z-10">
              {/* Lokasi 1: Bandung */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 transition-all space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-white text-xs">Workshop Bandung</span>
                      <a
                        href={SITE_INFO.addressBandungMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Buka Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={SITE_INFO.addressBandungMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed text-slate-300 hover:text-cyan-300 block transition-colors text-[11px]"
                    >
                      {SITE_INFO.addressBandung}
                    </a>
                  </div>
                </div>
              </div>

              {/* Lokasi 2: Cimahi */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 transition-all space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-white text-xs">Workshop Cimahi</span>
                      <a
                        href={SITE_INFO.addressCimahiMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Buka Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={SITE_INFO.addressCimahiMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed text-slate-300 hover:text-cyan-300 block transition-colors text-[11px]"
                    >
                      {SITE_INFO.addressCimahi}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">Jam Operasional:</span>
                  <p className="leading-relaxed text-slate-400">{SITE_INFO.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">WhatsApp Chat:</span>
                  <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                    {SITE_INFO.whatsappFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">Email Support:</span>
                  <a href={`mailto:${SITE_INFO.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Card */}
          <div className="relative bg-emerald-500/[0.08] p-6 rounded-3xl border border-emerald-500/20 space-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent pointer-events-none" />
            <h4 className="text-sm font-bold text-emerald-300 font-sans flex items-center gap-2 relative z-10">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Respon Cepat via WhatsApp</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed relative z-10">
              Butuh jawaban langsung dari teknisi? Klik tombol di bawah untuk membuka chat WhatsApp resmi kami.
            </p>
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20service`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hitboox bg-emerald-600 hover:bg-emerald-500 text-white w-full !py-3.5 text-xs font-bold gap-2 shadow-[0_8px_25px_rgba(5,150,105,0.3)] transition-all duration-300 relative z-10"
            >
              <span>Chat WhatsApp Seketika</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#0D0F18]/90 backdrop-blur-md p-8 rounded-3xl border border-white/[0.08] shadow-lg space-y-6 overflow-hidden">
            <div className="absolute top-0 left-1/3 w-56 h-56 bg-blue-600/[0.08] rounded-full blur-[80px] pointer-events-none" />
            <h3 className="text-2xl font-bold text-white font-display uppercase relative z-10">Kirim Pesan atau Pertanyaan</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/20 text-center space-y-3 relative z-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-sans">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-400">
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
              <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Nomor WhatsApp / HP</label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Pesan / Detail Kerusakan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan atau gejala kerusakan perangkat Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
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
