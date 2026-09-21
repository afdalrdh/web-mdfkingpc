'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Wrench, Upload, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES_LIST, SITE_INFO } from '@/data/mockData';

function PemesananContent() {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get('service') || '';

  const [customerName, setCustomerName] = useState('');
  const [phoneWA, setPhoneWA] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  useEffect(() => {
    if (serviceQuery) {
      const match = SERVICES_LIST.find((s) => s.slug === serviceQuery);
      if (match) {
        setServiceType(match.title);
      }
    } else if (SERVICES_LIST.length > 0) {
      setServiceType(SERVICES_LIST[0].title);
    }
  }, [serviceQuery]);

  // Handle file selection and Cloudinary upload trigger
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadPreview(URL.createObjectURL(selectedFile));
    setUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setPaymentProofUrl(data.url);
        if (data.previewUrl) {
          setUploadPreview(data.previewUrl);
        }
      } else {
        setErrorMsg(data.message || 'Gagal mengunggah file.');
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setErrorMsg('Terjadi kesalahan koneksi saat mengunggah file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneWA || !serviceType || !problemDescription) {
      setErrorMsg('Mohon isi semua field wajib (*)');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phoneWA,
          serviceType,
          deviceModel,
          problemDescription,
          paymentProofUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data.data);
      } else {
        setErrorMsg(data.message || 'Gagal memproses pemesanan.');
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrorMsg('Gagal mengirim formulir. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
          <Wrench className="w-4 h-4 text-brand-red" />
          <span>Form Perbaikan Online mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Formulir Pemesanan Servis
        </h1>

        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Isi data perbaikan perangkat Anda di bawah ini. Tim teknisi mdfkingpc akan segera memverifikasi dan menghubungi Anda.
        </p>
      </div>

      {bookingSuccess ? (
        /* SUCCESS CONFIRMATION RECEIPT */
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 space-y-6 text-center shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Pemesanan Berhasil</span>
            <h2 className="text-2xl font-black text-white">Order ID: #{bookingSuccess.orderId}</h2>
            <p className="text-xs text-gray-300">
              Terima kasih, <strong>{bookingSuccess.customerName}</strong>! Data perbaikan Anda telah masuk ke sistem mdfkingpc Bandung.
            </p>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 text-left space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">Tipe Layanan:</span>
              <span className="font-bold text-white text-right">{bookingSuccess.serviceType}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">Model Perangkat:</span>
              <span className="font-bold text-white text-right">{bookingSuccess.deviceModel || '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">WhatsApp:</span>
              <span className="font-bold text-emerald-400 text-right">{bookingSuccess.phoneWA}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Deskripsi Kerusakan:</span>
              <p className="text-white mt-1 italic">&ldquo;{bookingSuccess.problemDescription}&rdquo;</p>
            </div>
            {bookingSuccess.paymentProofUrl && (
              <div className="pt-2">
                <span className="text-gray-400 block mb-1">Bukti File Terunggah (Cloudinary):</span>
                <span className="text-[10px] text-brand-blue font-mono break-all bg-white/5 p-2 rounded block">
                  {bookingSuccess.paymentProofUrl}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20sudah%20mengisi%20form%20booking%20dengan%20Order%20ID%20%23${bookingSuccess.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 text-xs"
            >
              <span>Konfirmasi Langsung via WA &rarr;</span>
            </a>
            <button
              onClick={() => {
                setBookingSuccess(null);
                setCustomerName('');
                setPhoneWA('');
                setDeviceModel('');
                setProblemDescription('');
                setPaymentProofUrl('');
                setUploadPreview(null);
              }}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-white"
            >
              Buat Order Lain
            </button>
          </div>
        </div>
      ) : (
        /* ORDER FORM */
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* No WA */}
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Nomor WhatsApp Aktif *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phoneWA}
                  onChange={(e) => setPhoneWA(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pilih Layanan */}
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Pilih Kategori Layanan *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Rakit PC Custom Spec">Rakit PC Custom Spec</option>
                  <option value="Lainnya / Konsultasi">Lainnya / Konsultasi IT</option>
                </select>
              </div>

              {/* Tipe / Model Device */}
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Tipe / Model Perangkat</label>
                <input
                  type="text"
                  placeholder="Contoh: MacBook Air M1 / Asus TUF F15 / Joy-Con Switch"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* Catatan / Keluhan Kerusakan */}
            <div className="space-y-2">
              <label className="font-bold text-gray-200 block">Deskripsi Kerusakan / Catatan *</label>
              <textarea
                rows={4}
                required
                placeholder="Jelaskan detail keluhan perangkat Anda (misal: layar bergaris, keyboard mati tuts W, stick drift analog kanan)..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* CLOUDINARY UPLOAD BUKTI PEMBAYARAN / FOTO KERUSAKAN */}
            <div className="space-y-3 pt-2">
              <label className="font-bold text-gray-200 block flex items-center justify-between">
                <span>Upload Bukti Bayar / Foto Kerusakan (Cloudinary)</span>
                <span className="text-[10px] text-gray-400 font-normal">Opsional (.jpg, .png, max 5MB)</span>
              </label>

              <div className="border-2 border-dashed border-white/15 hover:border-brand-blue rounded-2xl p-6 text-center space-y-3 transition-colors bg-black/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="cloudinary-upload-input"
                  className="hidden"
                />
                
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-brand-blue">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-semibold">Mengunggah file ke Cloudinary...</span>
                  </div>
                ) : uploadPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={uploadPreview}
                      alt="Preview Bukti"
                      className="h-32 object-contain rounded-xl border border-white/20 shadow-md"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> File Berhasil Terunggah ke Cloudinary
                      </span>
                      <label
                        htmlFor="cloudinary-upload-input"
                        className="text-xs text-brand-blue underline cursor-pointer font-bold ml-2"
                      >
                        Ganti File
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="cloudinary-upload-input" className="cursor-pointer flex flex-col items-center gap-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center border border-brand-blue/30">
                      <Upload className="w-6 h-6 text-brand-red" />
                    </div>
                    <span className="text-xs font-bold text-white">Klik untuk Pilih Gambar</span>
                    <span className="text-[11px] text-gray-400">Gunakan foto nota DP / foto layar fisik perangkat Anda</span>
                  </label>
                )}
              </div>
            </div>

            {/* Badge Jaminan */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Diagnostik pengecekan gratis & garansi perbaikan 30 hari di mdfkingpc.</span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-4 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Order...</span>
                </>
              ) : (
                <>
                  <Wrench className="w-5 h-5 text-brand-red" />
                  <span>Kirim Pemesanan Servis</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function PemesananPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center text-white text-xs font-bold gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
        <span>Memuat Formulir Pemesanan...</span>
      </div>
    }>
      <PemesananContent />
    </Suspense>
  );
}
