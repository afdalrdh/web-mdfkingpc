'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PackageCheck,
  Users,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  LogOut,
  ShieldAlert,
  Search,
  Check,
  DollarSign,
} from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export default function AdminDashboardPage() {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'cashflow'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Editable Receipt Modal state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptItemName, setReceiptItemName] = useState('');
  const [receiptPrice, setReceiptPrice] = useState<number>(0);
  const [receiptNotes, setReceiptNotes] = useState('');
  const [processingConfirm, setProcessingConfirm] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('mdfkingpc_admin_token');
      if (storedToken) {
        setAdminToken(storedToken);
        fetchAdminData(storedToken);
      }
    }
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login admin gagal.');
      }

      setAdminToken(data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mdfkingpc_admin_token', data.token);
      }
      fetchAdminData(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Gagal login.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async (token: string) => {
    setLoading(true);
    try {
      // Fetch Orders
      const orderRes = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderData = await orderRes.json();
      if (orderData.success) {
        setOrders(orderData.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Action: Mark Service Completed & Notify WA
  const handleMarkCompletedAndNotifyWA = async (order: any) => {
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          paymentStatus: 'COMPLETED_WAITING_PAYMENT',
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (adminToken) fetchAdminData(adminToken);

        // Open WA template to customer
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(order.price || 0);

        let waText = `Halo Kak *${order.customerName}*,\n\n`;
        waText += `Servis *${order.serviceName}* (${order.deviceModel || 'Perangkat'}) Anda di *mdfkingpc Bandung* telah *SELESAI dikerjakan*! 🎉\n\n`;
        waText += `• Total Biaya: *${formattedPrice}*\n`;
        waText += `• Status: *Menunggu Pembayaran & Upload Bukti Bayar*\n\n`;
        waText += `Silakan lakukan pembayaran dan unggah foto bukti pembayaran pada website kami di link berikut:\nhttps://web-mdfkingpc.vercel.app/pesanan-saya\n\nTerima kasih atas kepercayaan Anda!`;

        const waUrl = `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
      }
    } catch (err) {
      alert('Gagal mengupdate status pesanan.');
    }
  };

  // Action: Open Edit Receipt Modal
  const handleOpenReceiptModal = (order: any) => {
    setSelectedOrder(order);
    setReceiptItemName(order.serviceName || 'Servis & Perbaikan Hardware');
    setReceiptPrice(order.price || 0);
    setReceiptNotes(order.problemDescription || 'Garansi 30 Hari mdfkingpc');
    setIsReceiptModalOpen(true);
  };

  // Action: Confirm Payment & Issue Struk
  const handleConfirmPaymentAndIssueReceipt = async () => {
    if (!selectedOrder) return;
    setProcessingConfirm(true);

    try {
      // Confirm payment API route generates PDF invoice and emails it
      const res = await fetch(`/api/orders/${selectedOrder.id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setIsReceiptModalOpen(false);
        if (adminToken) fetchAdminData(adminToken);

        // Open WA notification to customer that payment is confirmed & receipt emailed
        let waText = `Halo Kak *${selectedOrder.customerName}*,\n\n`;
        waText += `Pembayaran pesanan *ORD-${selectedOrder.id}* (${selectedOrder.serviceName}) di mdfkingpc telah *DITERIMA & DIKONFIRMASI LUNAS*! ✅\n\n`;
        waText += `Struk pembayaran digital resmi dan kartu garansi 30 hari telah dikirimkan ke email Anda (*${selectedOrder.customerEmail}*).\n\n`;
        waText += `Terima kasih banyak telah memilih mdfkingpc Bandung! 🙏`;

        const waUrl = `https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
      } else {
        alert(data.message || 'Gagal mengkonfirmasi pembayaran.');
      }
    } catch (err: any) {
      alert('Terjadi kesalahan saat konfirmasi pembayaran.');
    } finally {
      setProcessingConfirm(false);
    }
  };

  if (!adminToken) {
    return (
      <div className="min-h-screen bg-brand-dark text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-sky-500/30">
              m
            </div>
            <h1 className="text-2xl font-bold text-white">Login Admin mdfkingpc</h1>
            <p className="text-xs text-slate-400 mt-1">Masuk untuk mengelola pesanan & CMS situs</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center rounded-xl font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Admin</label>
              <input
                type="email"
                required
                placeholder="admin@mdfkingpc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg shadow-sky-600/30 transition-all text-xs"
            >
              {loading ? 'Memeriksa...' : 'Masuk Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white font-bold flex items-center justify-center">
              m
            </div>
            <span className="font-extrabold text-white text-base">
              mdfkingpc <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 font-bold ml-1">Admin Panel</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                localStorage.removeItem('mdfkingpc_admin_token');
                setAdminToken(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>Daftar Pesanan ({orders.length})</span>
            </button>

            <Link
              href="/admin/cashflow"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Laporan Cashflow</span>
            </Link>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-sky-400" />
              <span>Manajemen Pemesanan & Pembayaran</span>
            </h2>
            <button
              onClick={() => adminToken && fetchAdminData(adminToken)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">ID / Pelanggan</th>
                  <th className="px-6 py-4">Layanan & Perangkat</th>
                  <th className="px-6 py-4">Harga (Rp)</th>
                  <th className="px-6 py-4">Status Pesanan</th>
                  <th className="px-6 py-4 text-right">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      Belum ada pesanan masuk.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-extrabold text-white">ORD-{order.id}</div>
                        <div className="text-slate-300 font-semibold">{order.customerName}</div>
                        <div className="text-[11px] text-sky-400">{order.customerPhone}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{order.serviceName}</div>
                        <div className="text-[11px] text-slate-400">{order.deviceModel || '-'}</div>
                      </td>

                      <td className="px-6 py-4 font-black text-emerald-400 text-sm">
                        Rp {(order.price || 0).toLocaleString('id-ID')}
                      </td>

                      <td className="px-6 py-4">
                        {order.paymentStatus === 'PENDING' && (
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-bold">
                            PENDING / Baru
                          </span>
                        )}
                        {order.paymentStatus === 'COMPLETED_WAITING_PAYMENT' && (
                          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full font-bold">
                            Servis Selesai - Tunggu Bayar
                          </span>
                        )}
                        {order.paymentStatus === 'PAID_WAITING_VERIFICATION' && (
                          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
                            Sudah Upload Struk
                          </span>
                        )}
                        {order.paymentStatus === 'CONFIRMED' && (
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                            CONFIRMED / LUNAS
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right space-y-2">
                        {/* Button 1: Mark Service Completed & Notify via WA */}
                        {order.paymentStatus === 'PENDING' && (
                          <button
                            onClick={() => handleMarkCompletedAndNotifyWA(order)}
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Servis Selesai & Kirim WA</span>
                          </button>
                        )}

                        {/* Button 2: Inspect Payment Proof & Edit Receipt */}
                        {(order.paymentStatus === 'COMPLETED_WAITING_PAYMENT' ||
                          order.paymentStatus === 'PAID_WAITING_VERIFICATION' ||
                          order.paymentStatus === 'CONFIRMED') && (
                          <button
                            onClick={() => handleOpenReceiptModal(order)}
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all ml-auto block"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{order.paymentStatus === 'CONFIRMED' ? 'Lihat/Cetak Struk' : 'Cek Struk & Konfirmasi'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* EDIT & CETAK STRUK MODAL */}
      {isReceiptModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>Edit & Terbitkan Struk PDF Resmi</span>
              </h3>
              <button onClick={() => setIsReceiptModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Proof of Payment Preview if uploaded */}
            {selectedOrder.paymentProofUrl && (
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
                <span className="text-slate-400 block mb-2 font-semibold">Bukti Pembayaran Diunggah Pelanggan:</span>
                <img
                  src={selectedOrder.paymentProofUrl}
                  alt="Bukti Transfer"
                  className="max-h-40 rounded-xl object-contain mx-auto border border-slate-700"
                />
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Rincian Item Layanan / Sparepart</label>
                <input
                  type="text"
                  value={receiptItemName}
                  onChange={(e) => setReceiptItemName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Total Biaya Final (Rp)</label>
                <input
                  type="number"
                  value={receiptPrice}
                  onChange={(e) => setReceiptPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Catatan Garansi / Instruksi</label>
                <textarea
                  rows={2}
                  value={receiptNotes}
                  onChange={(e) => setReceiptNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmPaymentAndIssueReceipt}
                disabled={processingConfirm}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                {processingConfirm ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menerbitkan Struk...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi & Kirim Struk PDF + WA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
