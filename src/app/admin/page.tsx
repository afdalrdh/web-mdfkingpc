'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PackageCheck,
  Wrench,
  FileText,
  Cpu,
  DollarSign,
  BarChart3,
  LogOut,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Printer,
  Share2,
  Send,
  Eye,
  Check,
  X,
  ChevronRight,
  Menu,
  Sparkles,
  Phone,
  Mail,
  Receipt,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Tag,
  Monitor
} from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';
import { StoredOrder, StoredService, StoredBlogPost, StoredComponent, StoredCashflow } from '@/lib/storage';

type AdminTab = 'overview' | 'orders' | 'services' | 'blog' | 'components' | 'cashflow';

interface ReceiptItem {
  name: string;
  price: number;
  qty: number;
}

export default function AdminDashboardPage() {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data States
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [services, setServices] = useState<StoredService[]>([]);
  const [blogs, setBlogs] = useState<StoredBlogPost[]>([]);
  const [components, setComponents] = useState<StoredComponent[]>([]);
  const [cashflows, setCashflows] = useState<StoredCashflow[]>([]);

  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');

  // Modals
  // 1. Struk & Invoice Modal
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<StoredOrder | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<ReceiptItem[]>([]);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // 2. View Proof Modal
  const [viewProofUrl, setViewProofUrl] = useState<string | null>(null);

  // 3. Complete Order Modal (Mark as Done & Set Bill)
  const [completeOrderTarget, setCompleteOrderTarget] = useState<StoredOrder | null>(null);
  const [completeOrderFinalPrice, setCompleteOrderFinalPrice] = useState<number>(0);
  const [completeOrderNotes, setCompleteOrderNotes] = useState<string>('');

  // 4. CRUD Service Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<StoredService | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Hardware & Laptop',
    shortDesc: '',
    fullDesc: '',
    priceStarting: 'Rp 100.000',
    price: 100000,
    imageUrl: '',
    badge: '',
    features: '',
  });

  // 5. CRUD Blog Modal
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<StoredBlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Tips & Tutorial',
    snippet: '',
    content: '',
    imageUrl: '',
    author: 'Admin mdfkingpc',
    readTime: '4 menit baca',
  });

  // 6. CRUD Component Modal
  const [componentModalOpen, setComponentModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<StoredComponent | null>(null);
  const [componentForm, setComponentForm] = useState({
    name: '',
    category: 'cpu',
    brand: 'Intel',
    price: 1500000,
    specs: '',
    badge: '',
  });

  // 7. Quick Cashflow Form
  const [cfType, setCfType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [cfCategory, setCfCategory] = useState('Jasa Servis');
  const [cfAmount, setCfAmount] = useState<number>(0);
  const [cfDescription, setCfDescription] = useState('');

  // 8. Manual Order Modal
  const [manualOrderModalOpen, setManualOrderModalOpen] = useState(false);
  const [manualOrderForm, setManualOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceName: 'Servis Laptop & MacBook',
    price: 150000,
    deviceModel: '',
    problemDescription: '',
  });

  // Check auth on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mdfkingpc_admin_token');
      if (stored) {
        setAdminToken(stored);
        fetchAllData(stored);
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
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Email atau password admin salah.');
      }

      setAdminToken(data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mdfkingpc_admin_token', data.token);
      }
      fetchAllData(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Gagal login.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mdfkingpc_admin_token');
    }
    setAdminToken(null);
  };

  const fetchAllData = async (token = adminToken) => {
    if (!token) return;
    setLoading(true);
    try {
      // 1. Orders
      const orderRes = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderData = await orderRes.json();
      if (orderData.success) setOrders(orderData.data || []);

      // 2. Services
      const srvRes = await fetch('/api/services');
      const srvData = await srvRes.json();
      if (srvData.success) setServices(srvData.data || []);

      // 3. Blogs
      const blogRes = await fetch('/api/blog');
      const blogData = await blogRes.json();
      if (blogData.success) setBlogs(blogData.data || []);

      // 4. Components
      const compRes = await fetch('/api/components');
      const compData = await compRes.json();
      if (compData.success) setComponents(compData.data || []);

      // 5. Cashflow
      const cfRes = await fetch('/api/cashflow');
      const cfData = await cfRes.json();
      if (cfData.success) setCashflows(cfData.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------------
  // ORDER LIFECYCLE ACTIONS
  // -------------------------------------------------------------------------
  // 1. Stage: Terima & Kerjakan (PENDING -> IN_PROGRESS)
  const handleStartWork = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ paymentStatus: 'IN_PROGRESS' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
      }
    } catch (err) {
      alert('Gagal mengubah status pesanan.');
    }
  };

  // 2. Stage: Open Modal to Mark Completed (IN_PROGRESS -> COMPLETED_WAITING_PAYMENT)
  const handleOpenCompleteModal = (order: StoredOrder) => {
    setCompleteOrderTarget(order);
    setCompleteOrderFinalPrice(order.price || 0);
    setCompleteOrderNotes(`Servis telah selesai dikerjakan & ditest.`);
  };

  const handleConfirmOrderCompleted = async () => {
    if (!completeOrderTarget) return;
    try {
      const res = await fetch(`/api/orders/${completeOrderTarget.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          paymentStatus: 'COMPLETED_WAITING_PAYMENT',
          price: completeOrderFinalPrice,
          problemDescription: completeOrderNotes || completeOrderTarget.problemDescription,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const updated = completeOrderTarget;
        setCompleteOrderTarget(null);
        fetchAllData();

        // Prompt send WhatsApp to customer
        const formattedPrice = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(completeOrderFinalPrice);

        let waText = `Halo Kak *${updated.customerName}*,\n\n`;
        waText += `Kabar gembira! Servis *${updated.serviceName}* (${updated.deviceModel || 'Perangkat'}) Anda di *mdfkingpc Bandung* telah *SELESAI DIKERJAKAN* dan lulus uji tes kualitas! 🎉\n\n`;
        waText += `• Total Tagihan: *${formattedPrice}*\n`;
        waText += `• Status: *Menunggu Pembayaran*\n\n`;
        waText += `Silakan lakukan transfer ke rekening workshop kami dan konfirmasi/upload bukti bayar di link berikut:\nhttps://web-mdfkingpc.vercel.app/pesanan-saya\n\nTerima kasih atas kepercayaan Anda!`;

        const waUrl = `https://wa.me/${updated.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
      }
    } catch (err) {
      alert('Gagal menyelesaikan pesanan.');
    }
  };

  // 3. Stage: Verifikasi Pembayaran (PAID_WAITING_VERIFICATION -> CONFIRMED)
  const handleVerifyPayment = async (order: StoredOrder) => {
    try {
      const res = await fetch(`/api/orders/${order.id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
        // Otomatis buka struk resmi
        handleOpenInvoiceModal({ ...order, paymentStatus: 'CONFIRMED' });
      } else {
        alert(data.message || 'Gagal memverifikasi pembayaran.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat verifikasi.');
    }
  };

  // 4. Mark Cash Paid Directly (for in-person walk-ins)
  const handleMarkCashPaid = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ paymentStatus: 'CONFIRMED' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllData();
      }
    } catch (err) {
      alert('Gagal memproses pembayaran kasir.');
    }
  };

  // 5. Delete Order
  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Yakin ingin menghapus pesanan ORD-${orderId}?`)) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) fetchAllData();
    } catch (err) {
      alert('Gagal menghapus pesanan.');
    }
  };

  // 6. Struk & Invoice Modal Logic
  const handleOpenInvoiceModal = (order: StoredOrder) => {
    setSelectedInvoiceOrder(order);

    let items: ReceiptItem[] = [];
    if (order.receiptDetailsJson) {
      try {
        items = JSON.parse(order.receiptDetailsJson);
      } catch (e) {}
    }

    if (!items || items.length === 0) {
      items = [
        {
          name: order.serviceName || 'Jasa Servis & Perbaikan Hardware',
          price: order.price || 0,
          qty: 1,
        },
      ];
    }

    setInvoiceItems(items);
    setIsInvoiceModalOpen(true);
  };

  const handleAddInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { name: 'Sparepart / Jasa Tambahan', price: 50000, qty: 1 }]);
  };

  const handleUpdateInvoiceItem = (idx: number, field: keyof ReceiptItem, val: any) => {
    const updated = [...invoiceItems];
    updated[idx] = { ...updated[idx], [field]: val };
    setInvoiceItems(updated);
  };

  const handleRemoveInvoiceItem = (idx: number) => {
    if (invoiceItems.length <= 1) return;
    setInvoiceItems(invoiceItems.filter((_, i) => i !== idx));
  };

  const getInvoiceTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  };

  const handleSaveInvoiceBreakdown = async () => {
    if (!selectedInvoiceOrder) return;
    const total = getInvoiceTotal();
    try {
      await fetch(`/api/orders/${selectedInvoiceOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          price: total,
          receiptDetailsJson: JSON.stringify(invoiceItems),
        }),
      });
      fetchAllData();
      alert('Rincian invoice berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan rincian invoice.');
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleSendInvoiceWhatsApp = () => {
    if (!selectedInvoiceOrder) return;
    const totalFormatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(getInvoiceTotal());

    let text = `*INVOICE RESMI PEMBAYARAN - MDFKINGPC*\n`;
    text += `No. Invoice: *INV-ORD-${selectedInvoiceOrder.id}*\n`;
    text += `Tanggal: ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}\n`;
    text += `Status: *LUNAS (PAID)* ✅\n\n`;
    text += `Pelanggan: *${selectedInvoiceOrder.customerName}*\n`;
    text += `Perangkat: *${selectedInvoiceOrder.deviceModel || '-'}*\n`;
    text += `Layanan: *${selectedInvoiceOrder.serviceName}*\n\n`;
    text += `*Rincian Tagihan:*\n`;
    invoiceItems.forEach((item, i) => {
      text += `${i + 1}. ${item.name} (${item.qty}x) = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });
    text += `\n*TOTAL PEMBAYARAN: ${totalFormatted}*\n\n`;
    text += `Garansi pengerjaan berlaku 30 hari sejak invoice diterbitkan. Terima kasih telah mempercayakan perbaikan perangkat Anda di mdfkingpc Bandung! 🙏`;

    const url = `https://wa.me/${selectedInvoiceOrder.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSendInvoiceEmail = async () => {
    if (!selectedInvoiceOrder) return;
    try {
      const res = await fetch(`/api/orders/${selectedInvoiceOrder.id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.emailSent) {
        alert(`Invoice PDF berhasil dikirim ke email ${selectedInvoiceOrder.customerEmail}!`);
      } else {
        alert('Invoice terverifikasi. Email telah diproses.');
      }
    } catch (e) {
      alert('Gagal mengirimkan email invoice.');
    }
  };

  // -------------------------------------------------------------------------
  // SERVICES CRUD
  // -------------------------------------------------------------------------
  const handleOpenCreateService = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      category: 'Hardware & Laptop',
      shortDesc: '',
      fullDesc: '',
      priceStarting: 'Rp 100.000',
      price: 100000,
      imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
      badge: '',
      features: 'Garansi 30 Hari, Pengerjaan Cepat, Teknisi Spesialis',
    });
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (s: StoredService) => {
    setEditingService(s);
    setServiceForm({
      title: s.title,
      category: s.category,
      shortDesc: s.shortDesc,
      fullDesc: s.fullDesc,
      priceStarting: s.priceStarting,
      price: s.price || 0,
      imageUrl: s.imageUrl,
      badge: s.badge || '',
      features: (s.features || []).join(', '),
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...(editingService ? { id: editingService.id, slug: editingService.slug } : {}),
        title: serviceForm.title,
        category: serviceForm.category,
        shortDesc: serviceForm.shortDesc,
        fullDesc: serviceForm.fullDesc,
        priceStarting: serviceForm.priceStarting,
        price: serviceForm.price,
        imageUrl: serviceForm.imageUrl,
        badge: serviceForm.badge || undefined,
        features: serviceForm.features.split(',').map((f) => f.trim()).filter(Boolean),
      };

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setServiceModalOpen(false);
        fetchAllData();
      } else {
        alert(data.message || 'Gagal menyimpan layanan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan layanan.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Yakin ingin menghapus layanan ini dari katalog?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) fetchAllData();
    } catch (err) {
      alert('Gagal menghapus layanan.');
    }
  };

  // -------------------------------------------------------------------------
  // BLOG POSTS CRUD
  // -------------------------------------------------------------------------
  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      category: 'Hardware & Tips',
      snippet: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
      author: 'Admin mdfkingpc',
      readTime: '4 menit baca',
    });
    setBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b: StoredBlogPost) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      category: b.category,
      snippet: b.snippet,
      content: b.content,
      imageUrl: b.imageUrl,
      author: b.author,
      readTime: b.readTime,
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...(editingBlog ? { id: editingBlog.id, slug: editingBlog.slug, date: editingBlog.date } : {}),
        ...blogForm,
      };
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setBlogModalOpen(false);
        fetchAllData();
      } else {
        alert(data.message || 'Gagal menyimpan artikel.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan artikel.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) fetchAllData();
    } catch (err) {
      alert('Gagal menghapus artikel.');
    }
  };

  // -------------------------------------------------------------------------
  // PC COMPONENTS CRUD
  // -------------------------------------------------------------------------
  const handleOpenCreateComponent = () => {
    setEditingComponent(null);
    setComponentForm({
      name: '',
      category: 'cpu',
      brand: 'Intel',
      price: 1500000,
      specs: '',
      badge: '',
    });
    setComponentModalOpen(true);
  };

  const handleOpenEditComponent = (c: StoredComponent) => {
    setEditingComponent(c);
    setComponentForm({
      name: c.name,
      category: c.category,
      brand: c.brand,
      price: c.price,
      specs: c.specs,
      badge: c.badge || '',
    });
    setComponentModalOpen(true);
  };

  const handleSaveComponent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...(editingComponent ? { id: editingComponent.id } : {}),
        ...componentForm,
      };
      const res = await fetch('/api/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setComponentModalOpen(false);
        fetchAllData();
      } else {
        alert(data.message || 'Gagal menyimpan komponen.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan komponen.');
    }
  };

  const handleDeleteComponent = async (id: string) => {
    if (!confirm('Yakin ingin menghapus komponen ini?')) return;
    try {
      const res = await fetch(`/api/components?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) fetchAllData();
    } catch (err) {
      alert('Gagal menghapus komponen.');
    }
  };

  // -------------------------------------------------------------------------
  // CASHFLOW QUICK ADD
  // -------------------------------------------------------------------------
  const handleAddCashflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfAmount || !cfDescription) {
      alert('Mohon isi nominal dan keterangan transaksi.');
      return;
    }
    try {
      const res = await fetch('/api/cashflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          type: cfType,
          category: cfCategory,
          amount: cfAmount,
          description: cfDescription,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCfAmount(0);
        setCfDescription('');
        fetchAllData();
      }
    } catch (err) {
      alert('Gagal mencatat transaksi.');
    }
  };

  const handleDeleteCashflow = async (id: string) => {
    if (!confirm('Hapus transaksi cashflow ini?')) return;
    try {
      const res = await fetch(`/api/cashflow?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) fetchAllData();
    } catch (err) {
      alert('Gagal menghapus transaksi.');
    }
  };

  // -------------------------------------------------------------------------
  // MANUAL ORDER CREATION
  // -------------------------------------------------------------------------
  const handleCreateManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualOrderForm),
      });
      const data = await res.json();
      if (data.success) {
        setManualOrderModalOpen(false);
        setManualOrderForm({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          serviceName: 'Servis Laptop & MacBook',
          price: 150000,
          deviceModel: '',
          problemDescription: '',
        });
        fetchAllData();
      } else {
        alert(data.message || 'Gagal membuat pesanan manual.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat membuat pesanan.');
    }
  };

  // -------------------------------------------------------------------------
  // FILTERED ORDERS
  // -------------------------------------------------------------------------
  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.customerName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.serviceName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone?.includes(orderSearch);

    const matchStatus = orderStatusFilter === 'ALL' || o.paymentStatus === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate Metrics
  const totalOmset = orders
    .filter((o) => o.paymentStatus === 'CONFIRMED')
    .reduce((sum, o) => sum + (o.price || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.paymentStatus === 'PENDING').length;
  const inProgressCount = orders.filter((o) => o.paymentStatus === 'IN_PROGRESS').length;
  const waitingPaymentCount = orders.filter((o) => o.paymentStatus === 'COMPLETED_WAITING_PAYMENT').length;
  const waitingVerifyCount = orders.filter((o) => o.paymentStatus === 'PAID_WAITING_VERIFICATION').length;
  const confirmedCount = orders.filter((o) => o.paymentStatus === 'CONFIRMED').length;

  const totalIncomeCashflow = cashflows
    .filter((c) => c.type === 'INCOME')
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const totalExpenseCashflow = cashflows
    .filter((c) => c.type === 'EXPENSE')
    .reduce((sum, c) => sum + (c.amount || 0), 0);
  const netCashflow = totalIncomeCashflow - totalExpenseCashflow;

  // -------------------------------------------------------------------------
  // RENDER: LOGIN SCREEN IF NOT AUTHENTICATED
  // -------------------------------------------------------------------------
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              m
            </div>
            <h1 className="text-2xl font-bold font-display uppercase tracking-wider text-white">
              mdfkingpc <span className="text-blue-400">Admin</span>
            </h1>
            <p className="text-xs text-slate-400">
              Portal Manajemen Khusus Teknisi & Administrator Studio
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Email Administrator</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@mdfkingpc.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3 text-[11px] text-blue-300 space-y-1">
              <div className="font-semibold text-blue-200">Kredensial Default:</div>
              <div>Email: <code className="text-white">admin@mdfkingpc.com</code></div>
              <div>Password: <code className="text-white">admin123</code></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider uppercase text-xs shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Memverifikasi...' : 'Masuk Dashboard Admin'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-xs inline-flex items-center gap-1 transition-colors"
            >
              <span>← Kembali ke Halaman Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD APPLICATION WITH SIDEBAR
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white">

      {/* ===================================================================== */}
      {/* 1. SIDEBAR (DESKTOP & MOBILE DRAWER)                                  */}
      {/* ===================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-600/30">
              m
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                <span>mdfkingpc</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800/60 inline-block">
                Studio Admin
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
            Main Menu
          </div>

          <button
            onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Overview & Statistik</span>
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <PackageCheck className="w-4 h-4 shrink-0" />
              <span>Pesanan & Struk</span>
            </div>
            {pendingOrdersCount + waitingVerifyCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                {pendingOrdersCount + waitingVerifyCount}
              </span>
            )}
          </button>

          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 pt-4 pb-2">
            Katalog & Konten
          </div>

          <button
            onClick={() => { setActiveTab('services'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4 shrink-0" />
              <span>Kelola Layanan</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">{services.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('blog'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'blog'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 shrink-0" />
              <span>Kelola Blog & Tips</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">{blogs.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('components'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'components'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Komponen PC Rakitan</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">{components.length}</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 pt-4 pb-2">
            Keuangan Workshop
          </div>

          <button
            onClick={() => { setActiveTab('cashflow'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'cashflow'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Laporan Cashflow</span>
          </button>
        </nav>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              A
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Admin mdfkingpc</div>
              <div className="text-[10px] text-slate-400 truncate">admin@mdfkingpc.com</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Web</span>
            </Link>

            <button
              onClick={handleLogout}
              title="Keluar dari Admin"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ===================================================================== */}
      {/* 2. MAIN CONTENT VIEWPORT                                              */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Admin Studio &gt; <span className="text-slate-200 capitalize">{activeTab}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white capitalize flex items-center gap-2">
                {activeTab === 'overview' && 'Overview & Metrik Ringkasan'}
                {activeTab === 'orders' && 'Manajemen Pesanan & Penerbitan Struk'}
                {activeTab === 'services' && 'Katalog Layanan & Servis'}
                {activeTab === 'blog' && 'Artikel & Panduan Hardware'}
                {activeTab === 'components' && 'Database Komponen PC Rakitan'}
                {activeTab === 'cashflow' && 'Pencatatan Keuangan Workshop'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => fetchAllData()}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {activeTab === 'orders' && (
              <button
                onClick={() => setManualOrderModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Pesanan Baru</span>
              </button>
            )}

            {activeTab === 'services' && (
              <button
                onClick={handleOpenCreateService}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Layanan</span>
              </button>
            )}

            {activeTab === 'blog' && (
              <button
                onClick={handleOpenCreateBlog}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tulis Artikel</span>
              </button>
            )}

            {activeTab === 'components' && (
              <button
                onClick={handleOpenCreateComponent}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Komponen</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* ================================================================= */}
          {/* TAB 1: OVERVIEW & STATS                                           */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 5-Step Order Lifecycle Guide Banner */}
              <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Alur Siklus Pengerjaan Pesanan (Workflow Standar)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4 text-xs">
                  <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                    <span className="font-extrabold text-amber-400 block mb-1">1. Pesanan Masuk</span>
                    <p className="text-[11px] text-slate-300">Status <strong>PENDING</strong>. Klik &apos;Terima &amp; Kerjakan&apos;.</p>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                    <span className="font-extrabold text-blue-400 block mb-1">2. Dikerjakan</span>
                    <p className="text-[11px] text-slate-300">Teknisi servis unit. Jika tuntas, klik &apos;Konfirmasi Selesai&apos;.</p>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                    <span className="font-extrabold text-orange-400 block mb-1">3. Tunggu Bayar</span>
                    <p className="text-[11px] text-slate-300">User upload struk transfer atau admin terima tunai kasir.</p>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                    <span className="font-extrabold text-purple-400 block mb-1">4. Verifikasi</span>
                    <p className="text-[11px] text-slate-300">Admin cek bukti bayar &amp; edit rincian bila ada sparepart.</p>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                    <span className="font-extrabold text-emerald-400 block mb-1">5. Cetak Invoice</span>
                    <p className="text-[11px] text-slate-300">Cetak struk resmi, kirim PDF email, atau share WhatsApp.</p>
                  </div>
                </div>
              </div>

              {/* Metric Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Omset Lunas</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-sans">
                    Rp {totalOmset.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Dari {confirmedCount} pesanan lunas terverifikasi
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Pesanan Aktif</span>
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white font-sans">
                    {pendingOrdersCount + inProgressCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {pendingOrdersCount} Baru, {inProgressCount} Dikerjakan
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Menunggu Pembayaran</span>
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-orange-400 font-sans">
                    {waitingPaymentCount + waitingVerifyCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {waitingVerifyCount} Perlu dicek bukti transfernya
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Kas Bersih Workshop</span>
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-sky-400 font-sans">
                    Rp {netCashflow.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    In: Rp {totalIncomeCashflow.toLocaleString('id-ID')} | Out: Rp {totalExpenseCashflow.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-blue-400" />
                    <span>Aktivitas Pesanan Terbaru</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Lihat Semua Pesanan &rarr;
                  </button>
                </div>
                <div className="divide-y divide-slate-800">
                  {orders.slice(0, 5).map((ord) => (
                    <div key={ord.id} className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-slate-850 transition-colors">
                      <div className="space-y-1">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>ORD-{ord.id}</span>
                          <span className="text-slate-400">•</span>
                          <span>{ord.customerName}</span>
                        </div>
                        <div className="text-slate-400">
                          {ord.serviceName} ({ord.deviceModel || 'Perangkat'})
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-black text-emerald-400">
                          Rp {(ord.price || 0).toLocaleString('id-ID')}
                        </div>
                        {getStatusBadge(ord.paymentStatus)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: ORDERS MANAGEMENT & INVOICING (MAIN USER REQUEST)          */}
          {/* ================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-5">
              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                {/* Status Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setOrderStatusFilter('ALL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'ALL'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Semua ({orders.length})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('PENDING')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'PENDING'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Baru ({pendingOrdersCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('IN_PROGRESS')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'IN_PROGRESS'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Dikerjakan ({inProgressCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('COMPLETED_WAITING_PAYMENT')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'COMPLETED_WAITING_PAYMENT'
                        ? 'bg-orange-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Tunggu Bayar ({waitingPaymentCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('PAID_WAITING_VERIFICATION')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'PAID_WAITING_VERIFICATION'
                        ? 'bg-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Verifikasi ({waitingVerifyCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('CONFIRMED')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === 'CONFIRMED'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Lunas ({confirmedCount})
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, ID, layanan..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-850 uppercase font-bold text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-4">ID & Pelanggan</th>
                        <th className="px-5 py-4">Layanan & Unit</th>
                        <th className="px-5 py-4">Biaya</th>
                        <th className="px-5 py-4">Status & Bukti</th>
                        <th className="px-5 py-4 text-right">Aksi Alur Pengerjaan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                            Tidak ada data pesanan yang sesuai dengan filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Col 1: ID & Customer */}
                            <td className="px-5 py-4 space-y-1">
                              <div className="font-black text-white text-sm">ORD-{order.id}</div>
                              <div className="font-semibold text-slate-200">{order.customerName}</div>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <a
                                  href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                                >
                                  <Phone className="w-3 h-3 text-emerald-400" />
                                  <span>{order.customerPhone}</span>
                                </a>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {order.createdAt ? new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                              </div>
                            </td>

                            {/* Col 2: Service & Device */}
                            <td className="px-5 py-4 space-y-1 max-w-xs">
                              <div className="font-bold text-white">{order.serviceName}</div>
                              <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                                <Monitor className="w-3 h-3 text-slate-400" />
                                <span>{order.deviceModel || 'Perangkat Standar'}</span>
                              </div>
                              {order.problemDescription && (
                                <p className="text-[11px] text-slate-400 line-clamp-2 italic bg-slate-800/50 p-1.5 rounded-lg border border-slate-700/50">
                                  &ldquo;{order.problemDescription}&rdquo;
                                </p>
                              )}
                            </td>

                            {/* Col 3: Price */}
                            <td className="px-5 py-4">
                              <div className="font-black text-emerald-400 text-sm font-sans">
                                Rp {(order.price || 0).toLocaleString('id-ID')}
                              </div>
                            </td>

                            {/* Col 4: Status Badge & Proof */}
                            <td className="px-5 py-4 space-y-2">
                              <div>{getStatusBadge(order.paymentStatus)}</div>

                              {/* Bukti Bayar Button if uploaded */}
                              {order.paymentProofUrl && (
                                <button
                                  onClick={() => setViewProofUrl(order.paymentProofUrl || null)}
                                  className="text-[11px] font-semibold text-purple-300 hover:text-purple-200 bg-purple-950/60 px-2 py-1 rounded-lg border border-purple-800/60 flex items-center gap-1"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Lihat Bukti Transfer</span>
                                </button>
                              )}
                            </td>

                            {/* Col 5: Lifecycle Action Buttons */}
                            <td className="px-5 py-4 text-right">
                              <div className="flex flex-col items-end gap-1.5">

                                {/* 1. PENDING: Terima & Kerjakan */}
                                {order.paymentStatus === 'PENDING' && (
                                  <button
                                    onClick={() => handleStartWork(order.id)}
                                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
                                  >
                                    <Wrench className="w-3.5 h-3.5" />
                                    <span>Terima &amp; Kerjakan</span>
                                  </button>
                                )}

                                {/* 2. IN_PROGRESS: Selesaikan Servis */}
                                {order.paymentStatus === 'IN_PROGRESS' && (
                                  <button
                                    onClick={() => handleOpenCompleteModal(order)}
                                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Konfirmasi Selesai</span>
                                  </button>
                                )}

                                {/* 3. COMPLETED_WAITING_PAYMENT: Tunggu Bayar / Kasir */}
                                {order.paymentStatus === 'COMPLETED_WAITING_PAYMENT' && (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleMarkCashPaid(order.id)}
                                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 border border-emerald-500/30 transition-all"
                                      title="Tandai Pembayaran Kasir (Tunai)"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Bayar Tunai</span>
                                    </button>
                                    <a
                                      href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                        `Halo Kak ${order.customerName}, servis ${order.serviceName} Anda di mdfkingpc telah selesai. Mohon konfirmasi pelunasan sebesar Rp ${(order.price || 0).toLocaleString('id-ID')} ya kak. Terima kasih!`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                                    >
                                      <Send className="w-3 h-3" />
                                      <span>Ingatkan WA</span>
                                    </a>
                                  </div>
                                )}

                                {/* 4. PAID_WAITING_VERIFICATION: Admin Verifikasi */}
                                {order.paymentStatus === 'PAID_WAITING_VERIFICATION' && (
                                  <button
                                    onClick={() => handleVerifyPayment(order)}
                                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
                                  >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verifikasi Pembayaran</span>
                                  </button>
                                )}

                                {/* 5. CONFIRMED: Cetak Struk & Kirim */}
                                {order.paymentStatus === 'CONFIRMED' && (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleOpenInvoiceModal(order)}
                                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                                      title="Buka Struk & Invoice Resmi"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                      <span>Cetak Struk</span>
                                    </button>
                                  </div>
                                )}

                                {/* Secondary Action: Delete */}
                                <button
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="text-[10px] text-slate-400 hover:text-rose-400 pt-1 flex items-center gap-1 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Hapus</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: SERVICES CRUD                                              */}
          {/* ================================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Daftar layanan perbaikan & modifikasi yang ditampilkan pada halaman utama dan halaman /layanan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all shadow-md"
                  >
                    <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                      {srv.imageUrl && (
                        <Image src={srv.imageUrl} alt={srv.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {srv.category}
                      </span>
                      {srv.badge && (
                        <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {srv.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-2 flex-1">
                      <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {srv.shortDesc || srv.fullDesc}
                      </p>
                      <div className="text-sm font-black text-emerald-400 pt-1 font-sans">
                        Mulai {srv.priceStarting}
                      </div>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {(srv.features || []).slice(0, 3).map((f, fIdx) => (
                          <span key={fIdx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEditService(srv)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-blue-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: BLOG POSTS CRUD                                            */}
          {/* ================================================================= */}
          {activeTab === 'blog' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Kelola konten edukasi, artikel blog, dan panduan hardware yang tampil pada section Trending &amp; halaman /blog.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-850 uppercase font-bold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-4">Thumbnail & Judul</th>
                      <th className="px-5 py-4">Kategori</th>
                      <th className="px-5 py-4">Penulis & Tanggal</th>
                      <th className="px-5 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                              {b.imageUrl && <Image src={b.imageUrl} alt={b.title} fill className="object-cover" />}
                            </div>
                            <div className="space-y-1">
                              <div className="font-bold text-white text-sm">{b.title}</div>
                              <p className="text-slate-400 text-[11px] line-clamp-1">{b.snippet}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {b.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          <div>{b.author}</div>
                          <div className="text-[10px]">{b.date}</div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditBlog(b)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                              title="Edit Artikel"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="Hapus Artikel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: PC COMPONENTS CRUD                                         */}
          {/* ================================================================= */}
          {activeTab === 'components' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Database komponen untuk simulator kalkulator rakit PC gaming &amp; workstation.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-850 uppercase font-bold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-4">Komponen & Merk</th>
                      <th className="px-5 py-4">Kategori</th>
                      <th className="px-5 py-4">Spesifikasi</th>
                      <th className="px-5 py-4">Harga (Rp)</th>
                      <th className="px-5 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {components.map((comp) => (
                      <tr key={comp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-white">{comp.name}</div>
                          <div className="text-[11px] text-slate-400">{comp.brand}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="uppercase text-[10px] font-extrabold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded">
                            {comp.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400 max-w-xs text-[11px]">
                          {comp.specs}
                        </td>
                        <td className="px-5 py-4 font-black text-emerald-400 font-sans">
                          Rp {(comp.price || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditComponent(comp)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                              title="Edit Komponen"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteComponent(comp.id)}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="Hapus Komponen"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: CASHFLOW TRACKING                                          */}
          {/* ================================================================= */}
          {activeTab === 'cashflow' && (
            <div className="space-y-6">
              {/* Cashflow Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                    <span>Total Pemasukan</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-black text-emerald-400 font-sans">
                    Rp {totalIncomeCashflow.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                    <span>Total Pengeluaran</span>
                    <ArrowDownRight className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-xl font-black text-rose-400 font-sans">
                    Rp {totalExpenseCashflow.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                    <span>Saldo Bersih (Net)</span>
                    <DollarSign className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className={`text-xl font-black font-sans ${netCashflow >= 0 ? 'text-sky-400' : 'text-rose-400'}`}>
                    Rp {netCashflow.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Form Quick Add Transaction */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Catat Transaksi Cashflow Baru</span>
                </h3>

                <form onSubmit={handleAddCashflow} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Tipe</label>
                    <select
                      value={cfType}
                      onChange={(e: any) => setCfType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                    >
                      <option value="INCOME">Pemasukan (+)</option>
                      <option value="EXPENSE">Pengeluaran (-)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-400 mb-1">Kategori</label>
                    <input
                      type="text"
                      required
                      placeholder="Jasa Servis, Sparepart, Operasional..."
                      value={cfCategory}
                      onChange={(e) => setCfCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-400 mb-1">Nominal (Rp)</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      placeholder="150000"
                      value={cfAmount || ''}
                      onChange={(e) => setCfAmount(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-slate-400 mb-1">Keterangan</label>
                    <input
                      type="text"
                      required
                      placeholder="Rincian pembayaran..."
                      value={cfDescription}
                      onChange={(e) => setCfDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-12 flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      Simpan Catatan Kas
                    </button>
                  </div>
                </form>
              </div>

              {/* Cashflow Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-850 uppercase font-bold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-4">Tanggal</th>
                      <th className="px-5 py-4">Tipe</th>
                      <th className="px-5 py-4">Kategori & Keterangan</th>
                      <th className="px-5 py-4">Jumlah (Rp)</th>
                      <th className="px-5 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {cashflows.map((cf) => (
                      <tr key={cf.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4 text-slate-400">{cf.date}</td>
                        <td className="px-5 py-4">
                          {cf.type === 'INCOME' ? (
                            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              + Pemasukan
                            </span>
                          ) : (
                            <span className="bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              - Pengeluaran
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-white">{cf.category}</div>
                          <div className="text-slate-400 text-[11px]">{cf.description}</div>
                        </td>
                        <td className={`px-5 py-4 font-black font-sans ${cf.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {cf.type === 'INCOME' ? '+' : '-'} Rp {(cf.amount || 0).toLocaleString('id-ID')}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleDeleteCashflow(cf.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: STRUK & CETAK INVOICE RESMI (THE MAIN CORE FEATURE)          */}
      {/* ===================================================================== */}
      {isInvoiceModalOpen && selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">

            {/* Modal Header Actions (Hidden in Print) */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Receipt className="w-5 h-5 text-blue-400" />
                <span>Struk &amp; Invoice Resmi mdfkingpc</span>
              </div>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PRINTABLE INVOICE DOCUMENT AREA */}
            <div id="printable-invoice" className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl space-y-6 shadow-inner border border-slate-200 print:border-none print:p-0">
              
              {/* Invoice Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-5 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-base">
                      m
                    </span>
                    <span className="text-xl font-black font-display tracking-tight text-slate-900">
                      mdfkingpc
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    IT Hardware Repair &amp; Custom Rig Studio<br />
                    Bandung, Jawa Barat • WhatsApp: {SITE_INFO.whatsapp}
                  </p>
                </div>

                <div className="sm:text-right space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    INVOICE RESMI
                  </div>
                  <div className="text-lg font-black text-blue-600">
                    INV-ORD-{selectedInvoiceOrder.id}
                  </div>
                  <div className="text-xs text-slate-600">
                    Tanggal: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Customer & Unit Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">Diterbitkan Untuk:</div>
                  <div className="font-bold text-slate-900 text-sm">{selectedInvoiceOrder.customerName}</div>
                  <div className="text-slate-600">{selectedInvoiceOrder.customerPhone}</div>
                  <div className="text-slate-600">{selectedInvoiceOrder.customerEmail}</div>
                </div>

                <div>
                  <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">Data Unit Perangkat:</div>
                  <div className="font-bold text-slate-900 text-sm">{selectedInvoiceOrder.deviceModel || 'Laptop / PC Desktop'}</div>
                  <div className="text-slate-600">Layanan: {selectedInvoiceOrder.serviceName}</div>
                  <div className="text-slate-500 italic mt-0.5">Keluhan: {selectedInvoiceOrder.problemDescription || 'Servis & Tune Up'}</div>
                </div>
              </div>

              {/* Itemized Invoice Table (Editable by Admin before printing) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Rincian Pengerjaan &amp; Komponen Sparepart:</span>
                  <button
                    onClick={handleAddInvoiceItem}
                    className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1 print:hidden"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Tambah Baris Sparepart/Jasa</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-200 text-slate-500 font-bold">
                        <th className="py-2">Deskripsi Layanan / Part</th>
                        <th className="py-2 text-center w-16">Qty</th>
                        <th className="py-2 text-right w-28">Harga (Rp)</th>
                        <th className="py-2 text-right w-28">Subtotal</th>
                        <th className="py-2 text-right w-10 print:hidden"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {invoiceItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateInvoiceItem(idx, 'name', e.target.value)}
                              className="w-full bg-transparent font-medium text-slate-800 outline-none border-b border-transparent focus:border-blue-400 print:border-none"
                            />
                          </td>
                          <td className="py-2.5 text-center">
                            <input
                              type="number"
                              min={1}
                              value={item.qty}
                              onChange={(e) => handleUpdateInvoiceItem(idx, 'qty', parseInt(e.target.value) || 1)}
                              className="w-12 text-center bg-transparent font-medium text-slate-800 outline-none border border-slate-200 rounded print:border-none"
                            />
                          </td>
                          <td className="py-2.5 text-right font-sans">
                            <input
                              type="number"
                              step={5000}
                              value={item.price}
                              onChange={(e) => handleUpdateInvoiceItem(idx, 'price', parseFloat(e.target.value) || 0)}
                              className="w-24 text-right bg-transparent font-medium text-slate-800 outline-none border border-slate-200 rounded px-1 print:border-none"
                            />
                          </td>
                          <td className="py-2.5 text-right font-bold text-slate-900 font-sans">
                            Rp {((item.price || 0) * (item.qty || 1)).toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 text-right print:hidden">
                            {invoiceItems.length > 1 && (
                              <button
                                onClick={() => handleRemoveInvoiceItem(idx)}
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Summary & Official Stamp */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-slate-900 pt-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="border-2 border-emerald-600 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl font-black tracking-widest text-xs uppercase shadow-sm">
                    LUNAS (PAID) ✅
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Diverifikasi &amp; Dicatat Kasir mdfkingpc
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Total Pembayaran:</div>
                  <div className="text-2xl font-black text-slate-950 font-sans">
                    Rp {getInvoiceTotal().toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Warranty Footnote */}
              <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3 space-y-0.5">
                <p>• <strong>Garansi Servis 30 Hari:</strong> Meliputi perbaikan ulang dan sparepart yang diganti dengan kerusakan yang sama.</p>
                <p>• Simpan nomor invoice ini (*INV-ORD-{selectedInvoiceOrder.id}*) atau foto struk sebagai bukti sah klaim garansi.</p>
              </div>
            </div>

            {/* Modal Bottom Action Controls (Hidden in Print) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
              <button
                onClick={handleSaveInvoiceBreakdown}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Simpan Perubahan Rincian</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSendInvoiceWhatsApp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke WhatsApp</span>
                </button>

                <button
                  onClick={handleSendInvoiceEmail}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim ke Email</span>
                </button>

                <button
                  onClick={handlePrintInvoice}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Print PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: VIEW PAYMENT PROOF MODAL                                     */}
      {/* ===================================================================== */}
      {viewProofUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Bukti Transfer Pembayaran Customer</span>
              </h3>
              <button
                onClick={() => setViewProofUrl(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={viewProofUrl} alt="Bukti Transfer" fill className="object-contain" />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewProofUrl(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: COMPLETE ORDER (SET FINAL BILL & NOTIFY WA)                  */}
      {/* ===================================================================== */}
      {completeOrderTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Konfirmasi Servis Selesai Dikerjakan</span>
              </h3>
              <button
                onClick={() => setCompleteOrderTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <p className="text-slate-300">
                Pengerjaan untuk <strong>{completeOrderTarget.customerName}</strong> ({completeOrderTarget.serviceName}) telah selesai.
                Silakan pastikan total tagihan akhir sudah sesuai sebelum dikabarkan ke customer.
              </p>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Total Biaya Akhir (Rp)</label>
                <input
                  type="number"
                  required
                  step={5000}
                  value={completeOrderFinalPrice}
                  onChange={(e) => setCompleteOrderFinalPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-bold font-sans outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Catatan Pengerjaan Teknisi</label>
                <textarea
                  rows={3}
                  value={completeOrderNotes}
                  onChange={(e) => setCompleteOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCompleteOrderTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmOrderCompleted}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>Simpan &amp; Infokan WA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: MANUAL ORDER CREATION                                        */}
      {/* ===================================================================== */}
      {manualOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Input Pesanan Baru (Manual / Walk-in)</span>
              </h3>
              <button onClick={() => setManualOrderModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nama Pelanggan</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={manualOrderForm.customerName}
                  onChange={(e) => setManualOrderForm({ ...manualOrderForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Nomor WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={manualOrderForm.customerPhone}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Pelanggan</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={manualOrderForm.customerEmail}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Nama Layanan</label>
                <input
                  type="text"
                  required
                  value={manualOrderForm.serviceName}
                  onChange={(e) => setManualOrderForm({ ...manualOrderForm, serviceName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Model Unit / Seri</label>
                  <input
                    type="text"
                    placeholder="Asus ROG / MacBook Air..."
                    value={manualOrderForm.deviceModel}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, deviceModel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Estimasi Biaya (Rp)</label>
                  <input
                    type="number"
                    step={5000}
                    value={manualOrderForm.price}
                    onChange={(e) => setManualOrderForm({ ...manualOrderForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Keluhan / Catatan Kerusakan</label>
                <textarea
                  rows={2}
                  placeholder="Keluhan awal..."
                  value={manualOrderForm.problemDescription}
                  onChange={(e) => setManualOrderForm({ ...manualOrderForm, problemDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setManualOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
                >
                  Simpan Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: SERVICE CRUD MODAL                                           */}
      {/* ===================================================================== */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-400" />
                <span>{editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}</span>
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Judul Layanan</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Harga Mulai (Label)</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.priceStarting}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceStarting: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">URL Gambar (Cloudinary / Unsplash)</label>
                <input
                  type="text"
                  required
                  value={serviceForm.imageUrl}
                  onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Fitur Layanan (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  placeholder="Garansi 30 Hari, Pengerjaan Cepat..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 6: BLOG POST CRUD MODAL                                         */}
      {/* ===================================================================== */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{editingBlog ? 'Edit Artikel Blog' : 'Tulis Artikel Baru'}</span>
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Penulis</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Cuplikan / Snippet</label>
                <input
                  type="text"
                  value={blogForm.snippet}
                  onChange={(e) => setBlogForm({ ...blogForm, snippet: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Isi Konten Artikel</label>
                <textarea
                  rows={5}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">URL Gambar Header</label>
                <input
                  type="text"
                  required
                  value={blogForm.imageUrl}
                  onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
                >
                  Terbitkan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 7: PC COMPONENT CRUD MODAL                                      */}
      {/* ===================================================================== */}
      {componentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>{editingComponent ? 'Edit Komponen PC' : 'Tambah Komponen PC'}</span>
              </h3>
              <button onClick={() => setComponentModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveComponent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nama Komponen</label>
                <input
                  type="text"
                  required
                  placeholder="Intel Core i5 13400F"
                  value={componentForm.name}
                  onChange={(e) => setComponentForm({ ...componentForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Kategori</label>
                  <select
                    value={componentForm.category}
                    onChange={(e) => setComponentForm({ ...componentForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  >
                    <option value="cpu">CPU (Processor)</option>
                    <option value="gpu">GPU (VGA Card)</option>
                    <option value="motherboard">Motherboard</option>
                    <option value="ram">RAM Memory</option>
                    <option value="ssd">SSD Storage</option>
                    <option value="psu">Power Supply (PSU)</option>
                    <option value="case">Casing PC</option>
                    <option value="cooler">Cooler Pendingin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Brand / Merk</label>
                  <input
                    type="text"
                    required
                    placeholder="Intel / ASUS / MSI..."
                    value={componentForm.brand}
                    onChange={(e) => setComponentForm({ ...componentForm, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  step={5000}
                  value={componentForm.price}
                  onChange={(e) => setComponentForm({ ...componentForm, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Spesifikasi Singkat</label>
                <input
                  type="text"
                  placeholder="6 Cores, 12 Threads, Up to 4.6 GHz"
                  value={componentForm.specs}
                  onChange={(e) => setComponentForm({ ...componentForm, specs: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setComponentModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
                >
                  Simpan Komponen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ---------------------------------------------------------------------------
// HELPER: ORDER STATUS BADGE COMPONENT
// ---------------------------------------------------------------------------
function getStatusBadge(status: string) {
  switch (status) {
    case 'PENDING':
      return (
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold inline-block">
          ● Pesanan Masuk (Baru)
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold inline-block">
          ● Sedang Dikerjakan Teknisi
        </span>
      );
    case 'COMPLETED_WAITING_PAYMENT':
      return (
        <span className="bg-orange-500/15 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold inline-block">
          ● Selesai - Tunggu Bayar
        </span>
      );
    case 'PAID_WAITING_VERIFICATION':
      return (
        <span className="bg-purple-500/15 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold inline-block">
          ● Sudah Upload Struk (Verifikasi)
        </span>
      );
    case 'CONFIRMED':
      return (
        <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold inline-block">
          ● Lunas &amp; Terverifikasi
        </span>
      );
    default:
      return (
        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-[11px] font-bold inline-block">
          {status}
        </span>
      );
  }
}
