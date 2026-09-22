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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <FileText className="w-4 h-4 text-red-500" />
          <span>Formulir Pemesanan Resmi mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase tracking-tight">
          Formulir Pemesanan Servis Online
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Pilih kategori perbaikan di bawah ini. Tim teknisi mdfkingpc akan segera merespons & mengonfirmasi via WhatsApp ke nomor Anda!
        </p>
      </div>

      {/* FORM SELECTION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/70">
        <button
          type="button"
          onClick={() => setActiveTab('laptop')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'laptop' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Laptop className={`w-4 h-4 ${activeTab === 'laptop' ? 'text-white' : 'text-red-500'}`} />
          <span>Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mouse')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mouse' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <MousePointer className={`w-4 h-4 ${activeTab === 'mouse' ? 'text-white' : 'text-red-500'}`} />
          <span>Mouse</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('keyboard')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'keyboard' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Keyboard className={`w-4 h-4 ${activeTab === 'keyboard' ? 'text-white' : 'text-red-500'}`} />
          <span>Keyboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gamepad')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gamepad' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Gamepad2 className={`w-4 h-4 ${activeTab === 'gamepad' ? 'text-white' : 'text-red-500'}`} />
          <span>Gamepad</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rakit-pc')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rakit-pc' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Cpu className={`w-4 h-4 ${activeTab === 'rakit-pc' ? 'text-white' : 'text-red-500'}`} />
          <span>Rakit PC</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('instalasi')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'instalasi' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
          }`}
        >
          <Download className={`w-4 h-4 ${activeTab === 'instalasi' ? 'text-white' : 'text-red-500'}`} />
          <span>Instalasi</span>
        </button>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 space-y-6 shadow-sm">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!user && (
          <div className="bg-blue-50 border border-blue-200/80 p-4 rounded-2xl text-xs text-blue-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Silakan login terlebih dahulu untuk mengisi formulir pemesanan & memantau pesanan Anda.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full whitespace-nowrap shadow-xs"
            >
              Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <fieldset disabled={!user} className="space-y-6 disabled:opacity-60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 border-b border-slate-100">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  disabled={!user}
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  disabled={!user}
                  placeholder="Contoh: 085158916661"
                  value={phoneWA}
                  onChange={(e) => setPhoneWA(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="font-bold text-slate-700 block">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  disabled={!user}
                  placeholder="Contoh: Jl. Ir. H. Juanda No. 154, Dago, Bandung"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {activeTab === 'mouse' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Merk & Seri Mouse</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Logitech G Pro X Superlight / Razer Viper V2"
                      value={mouseBrand}
                      onChange={(e) => setMouseBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Switch Replacement</label>
                    <select
                      disabled={!user}
                      value={switchChoice}
                      onChange={(e) => setSwitchChoice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    >
                      <option value="TTC Gold Dustproof 80M">TTC Gold Dustproof 80M (Tactile)</option>
                      <option value="Kailh GM 8.0 Black Mamba">Kailh GM 8.0 Black Mamba 80M</option>
                      <option value="Huano Blue Shell Pink Dot">Huano Blue Shell Pink Dot 80M</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Jenis Kerusakan Mouse:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Double Click', 'Scroll Wheel Macet', 'Cursor Melompat', 'Ganti Cable Paracord'].map((issue) => (
                      <label key={issue} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={!user}
                          checked={mouseIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(mouseIssues, setMouseIssues, issue)}
                          className="w-4 h-4 rounded text-blue-600 disabled:cursor-not-allowed"
                        />
                        <span className="text-slate-700">{issue}</span>
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
                    <label className="font-bold text-slate-700 block">Tipe Keyboard</label>
                    <select
                      disabled={!user}
                      value={keyboardType}
                      onChange={(e) => setKeyboardType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    >
                      <option value="Mechanical Keyboard Custom">Mechanical Keyboard</option>
                      <option value="Keyboard Laptop Internal">Keyboard Laptop Internal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Merk & Seri / Tuts Macet</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="Keychron K2 / Tuts W, A, S, D"
                      value={specificFaultyKeys}
                      onChange={(e) => setSpecificFaultyKeys(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gamepad' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Tipe Gamepad</label>
                    <select
                      disabled={!user}
                      value={gamepadType}
                      onChange={(e) => setGamepadType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    >
                      <option value="PlayStation 5 DualSense">PlayStation 5 DualSense</option>
                      <option value="PlayStation 4 DualShock 4">PlayStation 4 DualShock 4</option>
                      <option value="Xbox Series X/S">Xbox Series X/S</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Upgrade Hall Effect</label>
                    <label className="flex items-center gap-2 p-3.5 rounded-xl bg-blue-50 border border-blue-200 cursor-pointer">
                      <input
                        type="checkbox"
                        disabled={!user}
                        checked={upgradeHallEffect}
                        onChange={(e) => setUpgradeHallEffect(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 disabled:cursor-not-allowed"
                      />
                      <span className="text-blue-950 font-bold">Upgrade Modul Hall Effect (Anti Drift Permanent)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'laptop' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Merk & Seri Laptop / MacBook</label>
                    <input
                      type="text"
                      disabled={!user}
                      placeholder="MacBook Air M1 / Asus TUF / Lenovo Legion"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Catatan Gejala Kerusakan</label>
              <textarea
                rows={3}
                disabled={!user}
                placeholder="Deskripsikan masalah perangkat Anda..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs disabled:cursor-not-allowed"
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading form...</div>}>
          <PemesananContent />
        </Suspense>
      </main>
    </div>
  );
}
