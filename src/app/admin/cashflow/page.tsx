'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Calendar, FileText, Upload, 
  CheckCircle2, AlertCircle, Loader2, ArrowUpRight, ArrowDownRight, Wallet, History 
} from 'lucide-react';

export default function AdminCashflowPage() {
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [category, setCategory] = useState('Servis Laptop & MacBook');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // File Upload
  const [uploading, setUploading] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Transactions list
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/cashflow');
      const data = await res.json();
      if (data.success) {
        setTransactions(data.data || []);
      }
    } catch (err) {
      console.warn('Fetch cashflow error:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setUploadPreview(URL.createObjectURL(selectedFile));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setProofUrl(data.url);
      } else {
        setErrorMsg('Gagal mengunggah nota ke Cloudinary.');
      }
    } catch (err) {
      setErrorMsg('Kesalahan koneksi saat upload nota.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) {
      setErrorMsg('Mohon isi nominal dan keterangan transaksi.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/cashflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          category,
          amount,
          description,
          proofUrl,
          date,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Transaksi ${type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'} Rp ${parseInt(amount).toLocaleString('id-ID')} berhasil dicatat!`);
        setAmount('');
        setDescription('');
        setProofUrl('');
        setUploadPreview(null);
        fetchTransactions();
      } else {
        setErrorMsg(data.message || 'Gagal mencatat cashflow.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
          <Wallet className="w-4 h-4 text-brand-red" />
          <span>Admin Dashboard mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Form & Pencatatan Cashflow Admin
        </h1>

        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Pencatatan keuangan masukan & pengeluaran workshop mdfkingpc Bandung beserta lampiran nota transaksi.
        </p>
      </div>

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Pemasukan</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 block">
            Rp {totalIncome.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Pengeluaran</span>
            <ArrowDownRight className="w-4 h-4 text-brand-red" />
          </div>
          <span className="text-2xl font-black text-brand-red block">
            Rp {totalExpense.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Saldo Netto</span>
            <Wallet className="w-4 h-4 text-brand-blue" />
          </div>
          <span className={`text-2xl font-black block ${netBalance >= 0 ? 'text-white' : 'text-amber-400'}`}>
            Rp {netBalance.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CASHFLOW FORM */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
              Input Transaksi Cashflow
            </h3>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* TIPE TRANSAKSI TOGGLE */}
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Tipe Transaksi *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('INCOME')}
                    className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      type === 'INCOME'
                        ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400/40'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Pemasukan (Income)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('EXPENSE')}
                    className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      type === 'EXPENSE'
                        ? 'bg-brand-red text-white shadow-lg border border-red-400/40'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    <span>Pengeluaran (Expense)</span>
                  </button>
                </div>
              </div>

              {/* TANGGAL & KATEGORI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-200 block">Tanggal Transaksi</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-200 block">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Servis Laptop & MacBook">Servis Laptop & MacBook</option>
                    <option value="Rakit PC Gaming">Rakit PC Gaming</option>
                    <option value="Servis Mouse & Keyboard">Servis Mouse & Keyboard</option>
                    <option value="Servis Gamepad / Joystick">Servis Gamepad / Joystick</option>
                    <option value="Instal OS & Software">Instal OS & Software</option>
                    <option value="Pembelian Sparepart">Pembelian Sparepart / Komponen</option>
                    <option value="Operasional Workshop">Operasional Workshop / Sewa / Listrik</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                </div>
              </div>

              {/* NOMINAL (RP) */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-200 block">Nominal Transaksi (Rp) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 350000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              {/* KETERANGAN */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-200 block">Keterangan / Nama Customer *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: DP Servis Screen MacBook Air M1 - A. Fauzi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* UPLOAD NOTA / STRUK CLOUDINARY */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-gray-200 block">Upload Struk / Nota Transaksi (Cloudinary)</label>
                <div className="border border-dashed border-white/20 rounded-xl p-4 text-center bg-black/30">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="cashflow-file-input"
                    className="hidden"
                  />
                  {uploading ? (
                    <div className="flex justify-center text-brand-blue gap-2 py-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengunggah nota ke Cloudinary...</span>
                    </div>
                  ) : uploadPreview ? (
                    <div className="flex items-center justify-between p-2">
                      <img src={uploadPreview} alt="Struk" className="h-16 rounded border border-white/10" />
                      <span className="text-emerald-400 font-bold text-[11px]">Nota Terunggah</span>
                    </div>
                  ) : (
                    <label htmlFor="cashflow-file-input" className="cursor-pointer text-gray-400 hover:text-white flex items-center justify-center gap-2 py-2">
                      <Upload className="w-4 h-4 text-brand-blue" />
                      <span>Klik untuk Unggah Foto Struk / Nota</span>
                    </label>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all"
              >
                {submitting ? 'Memproses Cashflow...' : 'Simpan Transaksi Cashflow'}
              </button>
            </form>
          </div>
        </div>

        {/* TRANSACTIONS HISTORY LIST */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-brand-blue" />
                <span>Riwayat Transaksi Terbaru</span>
              </h4>
              <span className="text-[10px] text-gray-400">{transactions.length} Transaksi</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs">
                  Belum ada catatan transaksi cashflow.
                </div>
              ) : (
                transactions.map((t, idx) => (
                  <div key={t.id || idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <div className="space-y-1 max-w-[60%]">
                      <span className="text-[10px] text-gray-400 block">{t.category}</span>
                      <h5 className="font-bold text-white truncate">{t.description}</h5>
                      <span className="text-[9px] text-gray-500">{new Date(t.date || t.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>

                    <div className="text-right">
                      <span className={`font-black text-xs block ${t.type === 'INCOME' ? 'text-emerald-400' : 'text-brand-red'}`}>
                        {t.type === 'INCOME' ? '+' : '-'} Rp {(t.amount || 0).toLocaleString('id-ID')}
                      </span>
                      {t.proofUrl && (
                        <a href={t.proofUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] text-brand-blue underline font-mono">
                          Nota
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
