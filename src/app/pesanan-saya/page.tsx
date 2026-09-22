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
      const res = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      let apiOrders: any[] = [];
      if (data.success && Array.isArray(data.data)) {
        apiOrders = data.data;
      }

      // Local storage fallback for seamless instant display
      let localOrders: any[] = [];
      if (typeof window !== 'undefined') {
        try {
          const storedLocal = JSON.parse(localStorage.getItem('mdfkingpc_local_orders') || '[]');
          localOrders = storedLocal.filter(
            (o: any) => o.customerEmail?.toLowerCase() === userEmail.toLowerCase()
          );
        } catch (e) {
          console.error(e);
        }
      }

      // Combine & deduplicate orders by ID
      const combined = [...apiOrders, ...localOrders];
      const uniqueOrders = Array.from(new Map(combined.map((o) => [o.id, o])).values());

      setOrders(uniqueOrders);
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
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">Menunggu Pengerjaan</span>;
      case 'IN_PROGRESS':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">Sedang Dikerjakan Teknisi</span>;
      case 'COMPLETED_WAITING_PAYMENT':
        return <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">Servis Selesai - Upload Bukti Bayar</span>;
      case 'PAID_WAITING_VERIFICATION':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold">Sudah Upload Struk - Verifikasi Admin</span>;
      case 'CONFIRMED':
      case 'DONE':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">Pembayaran Lunas & Selesai</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1 py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-blue-600" />
              <span>Daftar Pesanan & Status Servis</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Pantau perkembangan perbaikan perangkat Anda secara real-time di mdfkingpc.
            </p>
          </div>

          {user && (
            <button
              onClick={() => fetchOrders(user.email)}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
              title="Refresh Pesanan"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {!user ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <AlertCircle className="w-12 h-12 text-blue-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-sans">Silakan Masuk Terlebih Dahulu</h3>
            <p className="text-xs text-slate-600">
              Anda harus masuk ke akun Anda untuk melihat status riwayat pemesanan servis.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
            >
              Masuk ke Akun
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-16 text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>Memuat data pesanan...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <PackageCheck className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-sans">Belum Ada Pesanan Aktif</h3>
            <p className="text-xs text-slate-600">
              Anda belum memiliki riwayat pemesanan servis di mdfkingpc.
            </p>
            <Link
              href="/pemesanan"
              className="inline-block py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
            >
              Buat Pemesanan Servis Baru
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4"
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">ID Pesanan</span>
                    <h3 className="text-base font-extrabold text-slate-900 font-sans">ORD-{order.id}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.paymentStatus)}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1">Layanan Terpilih</span>
                    <span className="font-bold text-slate-900">{order.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Perangkat</span>
                    <span className="font-semibold text-slate-700">{order.deviceModel || 'Tidak disebutkan'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Total Biaya</span>
                    <span className="font-extrabold text-blue-600 text-sm font-sans">
                      Rp {(order.price || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {order.problemDescription && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl text-xs border border-slate-200/70">
                    <span className="text-slate-500 block mb-0.5 font-medium">Catatan Kerusakan:</span>
                    <span className="text-slate-700">{order.problemDescription}</span>
                  </div>
                )}

                {/* Status Info for PENDING & IN_PROGRESS */}
                {(order.paymentStatus === 'PENDING' || order.paymentStatus === 'IN_PROGRESS') && (
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs space-y-1">
                    <div className="font-bold text-blue-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span>Proses Perbaikan & Diagnostik Teknisi</span>
                    </div>
                    <p className="text-slate-600">
                      Perangkat Anda saat ini sedang ditangani oleh teknisi mdfkingpc. Form upload bukti pembayaran akan otomatis muncul setelah pengerjaan servis selesai.
                    </p>
                  </div>
                )}

                {/* Status Action: Upload Proof when Servis Selesai */}
                {order.paymentStatus === 'COMPLETED_WAITING_PAYMENT' && (
                  <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-4 text-xs space-y-3">
                    <div className="font-bold text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>Upload Bukti Pembayaran / Struk Transfer</span>
                    </div>
                    <p className="text-slate-600">
                      Servis telah selesai dikerjakan! Silakan selesaikan pembayaran ke rekening mdfkingpc dan unggah foto/struk bukti pembayaran di bawah ini.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-slate-200 file:text-slate-800 file:font-semibold hover:file:bg-slate-300 cursor-pointer"
                      />

                      <button
                        onClick={() => handleUploadPaymentProof(order.id)}
                        disabled={!selectedFile || uploadingId === order.id}
                        className="py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all disabled:opacity-40 flex items-center gap-2"
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
                  <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 text-xs space-y-1">
                    <div className="font-bold text-purple-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      <span>Bukti Pembayaran Terkirim</span>
                    </div>
                    <p className="text-slate-600">
                      Admin sedang memverifikasi bukti pembayaran Anda. Struk resmi PDF akan otomatis diterbitkan & dikirim ke email setelah terverifikasi.
                    </p>
                  </div>
                )}

                {/* Status Action: Confirmed / Digital Invoice Download */}
                {order.paymentStatus === 'CONFIRMED' && order.invoiceUrl && (
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span>Struk Digital & Garansi 30 Hari Aktif</span>
                    </div>

                    <a
                      href={order.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
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
