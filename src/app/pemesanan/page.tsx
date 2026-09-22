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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
          <FileText className="w-4 h-4 text-brand-red" />
          <span>Formulir Pemesanan Resmi mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Formulir Pemesanan Servis Online
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Pilih kategori perbaikan di bawah ini. Tim teknisi mdfkingpc akan segera merespons & mengonfirmasi via WhatsApp ke nomor Anda!
        </p>
      </div>

      {/* FORM SELECTION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#18181C] p-2 rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('laptop')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'laptop' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Laptop className="w-4 h-4 text-brand-red" />
          <span>Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mouse')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mouse' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MousePointer className="w-4 h-4 text-brand-red" />
          <span>Mouse</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('keyboard')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'keyboard' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Keyboard className="w-4 h-4 text-brand-red" />
          <span>Keyboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gamepad')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gamepad' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-brand-red" />
          <span>Gamepad</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rakit-pc')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rakit-pc' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4 text-brand-red" />
          <span>Rakit PC</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('instalasi')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'instalasi' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Download className="w-4 h-4 text-brand-red" />
          <span>Instalasi</span>
        </button>
      </div>

      <div className="bg-slate-900/90 p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 shadow-2xl backdrop-blur-md">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!user && (
          <div className="bg-sky-950/40 border border-sky-800/60 p-4 rounded-2xl text-xs text-sky-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
              <span>Silakan login terlebih dahulu untuk mengisi formulir pemesanan & memantau pesanan Anda.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="py-1.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl whitespace-nowrap shadow-md"
            >
              Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <fieldset disabled={!user} className="space-y-6 disabled:opacity-60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 border-b border-slate-800">
              <div className="space-y-2">
                <label className="font-bold text-slate-200 block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  disabled={!user}
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-200 block">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  disabled={!user}
                  placeholder="Contoh: 085158916661"
                  value={phoneWA}
                  onChange={(e) => setPhoneWA(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="font-bold text-slate-200 block">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  disabled={!user}
                  placeholder="Contoh: Jl. Ir. H. Juanda No. 154, Dago, Bandung"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {activeTab === 'mouse' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Merk & Seri Mouse</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Logitech G Pro X Superlight / Razer Viper V2"
                      value={mouseBrand}
                      onChange={(e) => setMouseBrand(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Switch Replacement</label>
                    <select
                      disabled={!user}
                      value={switchChoice}
                      onChange={(e) => setSwitchChoice(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    >
                      <option value="TTC Gold Dustproof 80M">TTC Gold Dustproof 80M (Tactile)</option>
                      <option value="Kailh GM 8.0 Black Mamba">Kailh GM 8.0 Black Mamba 80M</option>
                      <option value="Huano Blue Shell Pink Dot">Huano Blue Shell Pink Dot 80M</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-200 block">Jenis Kerusakan Mouse:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Double Click', 'Scroll Wheel Macet', 'Cursor Melompat', 'Ganti Cable Paracord'].map((issue) => (
                      <label key={issue} className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={!user}
                          checked={mouseIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(mouseIssues, setMouseIssues, issue)}
                          className="w-4 h-4 rounded text-sky-500 disabled:cursor-not-allowed"
                        />
                        <span className="text-slate-300">{issue}</span>
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
                    <label className="font-bold text-slate-200 block">Tipe Keyboard</label>
                    <select
                      disabled={!user}
                      value={keyboardType}
                      onChange={(e) => setKeyboardType(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    >
                      <option value="Mechanical Keyboard Custom">Mechanical Keyboard</option>
                      <option value="Keyboard Laptop Internal">Keyboard Laptop Internal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Merk & Seri / Tuts Macet</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Keychron K2 / Tuts W, A, S, D"
                      value={specificFaultyKeys}
                      onChange={(e) => setSpecificFaultyKeys(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gamepad' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Tipe Gamepad</label>
                    <select
                      disabled={!user}
                      value={gamepadType}
                      onChange={(e) => setGamepadType(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    >
                      <option value="PlayStation 5 DualSense">PlayStation 5 DualSense</option>
                      <option value="PlayStation 4 DualShock 4">PlayStation 4 DualShock 4</option>
                      <option value="Xbox Series X/S">Xbox Series X/S</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Upgrade Hall Effect</label>
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 cursor-pointer">
                      <input
                        type="checkbox"
                        disabled={!user}
                        checked={upgradeHallEffect}
                        onChange={(e) => setUpgradeHallEffect(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 disabled:cursor-not-allowed"
                      />
                      <span className="text-white font-bold">Upgrade Modul Hall Effect (Anti Drift Permanent)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'laptop' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block">Merk & Seri Laptop / MacBook</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="MacBook Air M1 / Asus TUF / Lenovo Legion"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-bold text-slate-200 block">Catatan Gejala Kerusakan</label>
              <textarea
                rows={3}
                disabled={!user}
                placeholder="Deskripsikan masalah perangkat Anda..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 disabled:cursor-not-allowed"
              />
            </div>
          </fieldset>

          {!user ? (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Login untuk Mengirim Pemesanan</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading form...</div>}>
          <PemesananContent />
        </Suspense>
      </main>
    </div>
  );
}
