'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_INFO } from '@/data/mockData';
import { PackageCheck, Clock, CheckCircle2, Upload, FileText, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

export default function PesananSayaPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mdfkingpc_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          fetchOrders(parsed.email);
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchOrders = async (userEmail: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        // Filter orders for this user's email
        const userOrders = data.data.filter(
          (o: any) => o.customerEmail?.toLowerCase() === userEmail.toLowerCase()
        );
        setOrders(userOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPaymentProof = async (orderId: string) => {
    if (!selectedFile) return;
    setUploadingId(orderId);

    try {
      // 1. Upload proof image to Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', 'proof_of_payment');

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.message || 'Gagal mengunggah bukti pembayaran.');
      }

      // 2. Update order status to PAID_WAITING_VERIFICATION & save paymentProofUrl
      const updateRes = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentStatus: 'PAID_WAITING_VERIFICATION',
          paymentProofUrl: uploadData.url,
        }),
      });

      const updateData = await updateRes.json();
      if (updateData.success) {
        setSelectedFile(null);
        if (user) fetchOrders(user.email);
      }
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat upload.');
    } finally {
      setUploadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold">Menunggu Pengerjaan</span>;
      case 'IN_PROGRESS':
        return <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-bold">Sedang Dikerjakan Teknisi</span>;
      case 'COMPLETED_WAITING_PAYMENT':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold">Servis Selesai - Upload Bukti Bayar</span>;
      case 'PAID_WAITING_VERIFICATION':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold">Sudah Upload Struk - Verifikasi Admin</span>;
      case 'CONFIRMED':
      case 'DONE':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">Pembayaran Lunas & Selesai</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      <main className="flex-1 py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-sky-400" />
              <span>Daftar Pesanan & Status Servis</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Pantau perkembangan perbaikan perangkat Anda secara real-time di mdfkingpc.
            </p>
          </div>

          {user && (
            <button
              onClick={() => fetchOrders(user.email)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
              title="Refresh Pesanan"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {!user ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-12 h-12 text-sky-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Silakan Masuk Terlebih Dahulu</h3>
            <p className="text-xs text-slate-400">
              Anda harus masuk ke akun Anda untuk melihat status riwayat pemesanan servis.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all"
            >
              Masuk ke Akun
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-16 text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-sky-400" />
            <span>Memuat data pesanan...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
            <PackageCheck className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">Belum Ada Pesanan Aktif</h3>
            <p className="text-xs text-slate-400">
              Anda belum memiliki riwayat pemesanan servis di mdfkingpc.
            </p>
            <Link
              href="/pemesanan"
              className="inline-block py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Buat Pemesanan Servis Baru
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4"
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">ID Pesanan</span>
                    <h3 className="text-base font-extrabold text-white">ORD-{order.id}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.paymentStatus)}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">Layanan Terpilih</span>
                    <span className="font-bold text-white">{order.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Perangkat</span>
                    <span className="font-semibold text-slate-200">{order.deviceModel || 'Tidak disebutkan'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Total Biaya</span>
                    <span className="font-extrabold text-emerald-400 text-sm">
                      Rp {(order.price || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {order.problemDescription && (
                  <div className="bg-slate-800/50 p-3 rounded-2xl text-xs border border-slate-700/50">
                    <span className="text-slate-400 block mb-0.5">Catatan Kerusakan:</span>
                    <span className="text-slate-200">{order.problemDescription}</span>
                  </div>
                )}

                {/* Status Action: Upload Proof when Servis Selesai */}
                {(order.paymentStatus === 'COMPLETED_WAITING_PAYMENT' || order.paymentStatus === 'PENDING') && (
                  <div className="bg-rose-950/30 border border-rose-800/40 rounded-2xl p-4 text-xs space-y-3">
                    <div className="font-bold text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span>Upload Bukti Pembayaran / Struk Transfer</span>
                    </div>
                    <p className="text-slate-300">
                      Servis telah selesai dikerjakan! Silakan selesaikan pembayaran ke rekening mdfkingpc dan unggah foto/struk bukti pembayaran di bawah ini.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-800 file:text-slate-200 file:font-semibold hover:file:bg-slate-700 cursor-pointer"
                      />

                      <button
                        onClick={() => handleUploadPaymentProof(order.id)}
                        disabled={!selectedFile || uploadingId === order.id}
                        className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-40 flex items-center gap-2"
                      >
                        {uploadingId === order.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Mengunggah...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Unggah Bukti Bayar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Status Action: Payment Proof Submitted */}
                {order.paymentStatus === 'PAID_WAITING_VERIFICATION' && (
                  <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-4 text-xs space-y-1">
                    <div className="font-bold text-purple-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Bukti Pembayaran Terkirim</span>
                    </div>
                    <p className="text-slate-300">
                      Admin sedang memverifikasi bukti pembayaran Anda. Struk resmi PDF akan otomatis diterbitkan & dikirim ke email setelah terverifikasi.
                    </p>
                  </div>
                )}

                {/* Status Action: Confirmed / Digital Invoice Download */}
                {order.paymentStatus === 'CONFIRMED' && order.invoiceUrl && (
                  <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-4 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <span>Struk Digital & Garansi 30 Hari Aktif</span>
                    </div>

                    <a
                      href={order.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Unduh Struk / Invoice PDF</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => {
          setUser(newUser);
          fetchOrders(newUser.email);
        }}
      />
    </div>
  );
}
