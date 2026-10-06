'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Wrench, Upload, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, 
  MousePointer, Keyboard, Gamepad2, Laptop, Cpu, Download, FileText 
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

type FormTab = 'laptop' | 'mouse' | 'keyboard' | 'gamepad' | 'rakit-pc' | 'instalasi';

function PemesananContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceQuery = searchParams.get('service') || '';
  const formQuery = searchParams.get('form') as FormTab | null;

  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FormTab>('laptop');

  // Common Fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneWA, setPhoneWA] = useState('');
  const [address, setAddress] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  // Specialized Fields
  const [mouseBrand, setMouseBrand] = useState('Logitech');
  const [mouseIssues, setMouseIssues] = useState<string[]>([]);
  const [switchChoice, setSwitchChoice] = useState('TTC Gold Dustproof 80M');

  const [keyboardType, setKeyboardType] = useState('Mechanical Keyboard');
  const [keyboardIssues, setKeyboardIssues] = useState<string[]>([]);
  const [specificFaultyKeys, setSpecificFaultyKeys] = useState('');

  const [gamepadType, setGamepadType] = useState('PlayStation 5 DualSense');
  const [gamepadIssues, setGamepadIssues] = useState<string[]>([]);
  const [upgradeHallEffect, setUpgradeHallEffect] = useState(true);

  const [pcBudget, setPcBudget] = useState('Rp 8.000.000 - Rp 15.000.000');
  const [pcPurpose, setPcPurpose] = useState('Gaming Esports 1080p');
  const [cpuPref, setCpuPref] = useState('Intel Core i5');
  const [gpuPref, setGpuPref] = useState('NVIDIA RTX 4060');
  const [caseStyle, setCaseStyle] = useState('Aquarium Panoramic RGB');

  const [osType, setOsType] = useState('Windows 11 64-Bit');
  const [selectedSoftwarePacks, setSelectedSoftwarePacks] = useState<string[]>(['Paket Office & Produktivitas']);
  const [customSoftwareReq, setCustomSoftwareReq] = useState('');

  // File Upload State (Cloudinary)
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mdfkingpc_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setCustomerName(parsed.name || '');
          setCustomerEmail(parsed.email || '');
          setPhoneWA(parsed.phone || '');
          setAddress(parsed.address || '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (formQuery) {
      setActiveTab(formQuery);
    } else if (serviceQuery) {
      if (serviceQuery.toLowerCase().includes('mouse')) setActiveTab('mouse');
      else if (serviceQuery.toLowerCase().includes('keyboard')) setActiveTab('keyboard');
      else if (serviceQuery.toLowerCase().includes('joystick') || serviceQuery.toLowerCase().includes('gamepad')) setActiveTab('gamepad');
      else if (serviceQuery.toLowerCase().includes('rakit')) setActiveTab('rakit-pc');
      else if (serviceQuery.toLowerCase().includes('instal')) setActiveTab('instalasi');
      else setActiveTab('laptop');
    }
  }, [serviceQuery, formQuery]);

  const handleCheckboxToggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

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
      formData.append('folder', 'service_request_photos');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setPaymentProofUrl(data.url);
      } else {
        setErrorMsg(data.message || 'Gagal mengunggah foto.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi saat mengunggah foto ke Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // REQUIRE LOGIN FIRST
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!customerName || !phoneWA) {
      setErrorMsg('Mohon isi Nama Lengkap & Nomor WhatsApp wajib (*)');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    let serviceTypeTitle = 'Service Laptop & Perangkat';
    let details: any = {};

    if (activeTab === 'mouse') {
      serviceTypeTitle = 'Servis Mouse Gaming & Office';
      details = { mouseBrand, mouseIssues, switchChoice };
    } else if (activeTab === 'keyboard') {
      serviceTypeTitle = 'Servis Keyboard Laptop & Mechanical';
      details = { keyboardType, keyboardIssues, specificFaultyKeys };
    } else if (activeTab === 'gamepad') {
      serviceTypeTitle = 'Servis Joystick & Controller Game';
      details = { gamepadType, gamepadIssues, upgradeHallEffect };
    } else if (activeTab === 'rakit-pc') {
      serviceTypeTitle = 'Rakit PC Gaming & Workstation';
      details = { pcBudget, pcPurpose, cpuPref, gpuPref, caseStyle };
    } else if (activeTab === 'instalasi') {
      serviceTypeTitle = 'Instal OS, Aplikasi & Game PC';
      details = { osType, selectedSoftwarePacks, customSoftwareReq };
    } else {
      serviceTypeTitle = 'Service Laptop & MacBook';
      details = { category: 'Laptop Repair' };
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail: customerEmail || user.email,
          customerPhone: phoneWA,
          serviceName: serviceTypeTitle,
          deviceModel: deviceModel || 'Tidak Disebutkan',
          problemDescription: problemDescription || 'Perbaikan sesuai formulir',
          paymentProofUrl,
          detailsJson: { ...details, address },
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof window !== 'undefined' && data.data) {
          try {
            const existingLocal = JSON.parse(localStorage.getItem('mdfkingpc_local_orders') || '[]');
            localStorage.setItem('mdfkingpc_local_orders', JSON.stringify([data.data, ...existingLocal]));
          } catch (e) {
            console.error(e);
          }
        }
        router.push('/pesanan-saya');
      } else {
        setErrorMsg(data.message || 'Gagal memproses pemesanan.');
      }
    } catch (err: any) {
      setErrorMsg('Gagal mengirim formulir. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Formulir Pemesanan Resmi mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display uppercase tracking-tight">
          Formulir Pemesanan Servis Online
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Pilih kategori perbaikan di bawah ini. Tim teknisi mdfkingpc akan segera merespons & mengonfirmasi via WhatsApp ke nomor Anda!
        </p>
      </div>

      {/* FORM SELECTION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#0D0F18]/90 backdrop-blur-md p-2 rounded-2xl border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveTab('laptop')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'laptop' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <Laptop className={`w-4 h-4 ${activeTab === 'laptop' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'laptop' ? '!text-white' : ''}>Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mouse')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mouse' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <MousePointer className={`w-4 h-4 ${activeTab === 'mouse' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'mouse' ? '!text-white' : ''}>Mouse</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('keyboard')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'keyboard' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <Keyboard className={`w-4 h-4 ${activeTab === 'keyboard' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'keyboard' ? '!text-white' : ''}>Keyboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gamepad')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gamepad' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <Gamepad2 className={`w-4 h-4 ${activeTab === 'gamepad' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'gamepad' ? '!text-white' : ''}>Gamepad</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rakit-pc')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rakit-pc' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <Cpu className={`w-4 h-4 ${activeTab === 'rakit-pc' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'rakit-pc' ? '!text-white' : ''}>Rakit PC</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('instalasi')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'instalasi' ? 'bg-blue-600 !text-white shadow-md shadow-blue-600/20' : 'text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
          }`}
        >
          <Download className={`w-4 h-4 ${activeTab === 'instalasi' ? '!text-white' : 'text-blue-600 dark:text-cyan-400'}`} />
          <span className={activeTab === 'instalasi' ? '!text-white' : ''}>Instalasi</span>
        </button>
      </div>

      <div className="bg-[#0D0F18]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/[0.08] space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!user && (
          <div className="bg-blue-500/[0.08] border border-blue-500/20 p-4 rounded-2xl text-xs text-cyan-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Silakan login terlebih dahulu untuk mengisi formulir pemesanan & memantau pesanan Anda.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="py-1.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full whitespace-nowrap shadow-md shadow-blue-600/30"
            >
              Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <fieldset disabled={!user} className="space-y-6 disabled:opacity-60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 border-b border-white/[0.08]">
              <div className="space-y-2">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  disabled={!user}
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  disabled={!user}
                  placeholder="Contoh: 085158916661"
                  value={phoneWA}
                  onChange={(e) => setPhoneWA(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  disabled={!user}
                  placeholder="Contoh: Jalan citarip wetan 3 No.115, Kopo, Bandung"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {activeTab === 'mouse' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Merk & Seri Mouse</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Logitech G Pro X Superlight / Razer Viper V2"
                      value={mouseBrand}
                      onChange={(e) => setMouseBrand(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Switch Replacement</label>
                    <select
                      disabled={!user}
                      value={switchChoice}
                      onChange={(e) => setSwitchChoice(e.target.value)}
                      className="w-full bg-[#0B0D16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="TTC Gold Dustproof 80M" className="bg-[#0B0D16]">TTC Gold Dustproof 80M (Tactile)</option>
                      <option value="Kailh GM 8.0 Black Mamba" className="bg-[#0B0D16]">Kailh GM 8.0 Black Mamba 80M</option>
                      <option value="Huano Blue Shell Pink Dot" className="bg-[#0B0D16]">Huano Blue Shell Pink Dot 80M</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Jenis Kerusakan Mouse:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Double Click', 'Scroll Wheel Macet', 'Cursor Melompat', 'Ganti Cable Paracord'].map((issue) => (
                      <label key={issue} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 cursor-pointer hover:border-cyan-500/30 transition-colors">
                        <input
                          type="checkbox"
                          disabled={!user}
                          checked={mouseIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(mouseIssues, setMouseIssues, issue)}
                          className="w-4 h-4 rounded text-blue-600 disabled:cursor-not-allowed"
                        />
                        <span>{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'keyboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Tipe Keyboard</label>
                    <select
                      disabled={!user}
                      value={keyboardType}
                      onChange={(e) => setKeyboardType(e.target.value)}
                      className="w-full bg-[#0B0D16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Mechanical Keyboard Custom" className="bg-[#0B0D16]">Mechanical Keyboard</option>
                      <option value="Keyboard Laptop Internal" className="bg-[#0B0D16]">Keyboard Laptop Internal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Merk & Seri / Tuts Macet</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Keychron K2 / Tuts W, A, S, D"
                      value={specificFaultyKeys}
                      onChange={(e) => setSpecificFaultyKeys(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gamepad' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Tipe Gamepad</label>
                    <select
                      disabled={!user}
                      value={gamepadType}
                      onChange={(e) => setGamepadType(e.target.value)}
                      className="w-full bg-[#0B0D16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="PlayStation 5 DualSense" className="bg-[#0B0D16]">PlayStation 5 DualSense</option>
                      <option value="PlayStation 4 DualShock 4" className="bg-[#0B0D16]">PlayStation 4 DualShock 4</option>
                      <option value="Xbox Series X/S" className="bg-[#0B0D16]">Xbox Series X/S</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Upgrade Hall Effect</label>
                    <label className="flex items-center gap-2 p-3.5 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 cursor-pointer hover:border-cyan-500/30 transition-colors">
                      <input
                        type="checkbox"
                        disabled={!user}
                        checked={upgradeHallEffect}
                        onChange={(e) => setUpgradeHallEffect(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 disabled:cursor-not-allowed"
                      />
                      <span className="text-cyan-300 font-bold">Upgrade Modul Hall Effect (Anti Drift Permanent)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'laptop' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Merk & Seri Laptop / MacBook</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="MacBook Air M1 / Asus TUF / Lenovo Legion"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">Catatan Gejala Kerusakan</label>
              <textarea
                rows={3}
                disabled={!user}
                placeholder="Deskripsikan masalah perangkat Anda..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </fieldset>

          {!user ? (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-hitboox btn-hitboox-primary w-full !py-4 text-xs font-bold shadow-pill-blue gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Login untuk Mengirim Pemesanan</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || uploading}
              className="btn-hitboox btn-hitboox-primary w-full !py-4 text-xs font-bold shadow-pill-blue disabled:opacity-50 gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim Pesanan...</span>
                </>
              ) : (
                <>
                  <Wrench className="w-5 h-5" />
                  <span>Kirim Formulir Pemesanan</span>
                </>
              )}
            </button>
          )}
        </form>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => {
          setUser(newUser);
          setCustomerName(newUser.name || '');
          setCustomerEmail(newUser.email || '');
          setPhoneWA(newUser.phone || '');
          setAddress(newUser.address || '');
        }}
      />
    </div>
  );
}

export default function PemesananPage() {
  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans">
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading form...</div>}>
          <PemesananContent />
        </Suspense>
      </main>
    </div>
  );
}
