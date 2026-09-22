import fs from 'fs';
import path from 'path';
import { SERVICES_LIST, BLOG_POSTS, PC_COMPONENTS_DB, CLOUDINARY_IMAGES } from '@/data/mockData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultData: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultData;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

// ---------------------------------------------------------------------------
// 1. ORDERS STORAGE
// ---------------------------------------------------------------------------
export interface StoredOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId?: string | null;
  serviceName: string;
  price: number;
  paymentStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED_WAITING_PAYMENT' | 'PAID_WAITING_VERIFICATION' | 'CONFIRMED' | 'CANCELLED';
  paymentProofUrl?: string | null;
  invoiceUrl?: string | null;
  deviceModel?: string | null;
  problemDescription?: string | null;
  detailsJson?: string | null;
  receiptDetailsJson?: string | null;
  createdAt: string;
  updatedAt?: string;
}

const INITIAL_ORDERS: StoredOrder[] = [
  {
    id: '882190',
    customerName: 'Budi Santoso',
    customerEmail: 'budisantoso99@gmail.com',
    customerPhone: '081234567890',
    serviceName: 'Rakit PC Gaming Kustom',
    price: 14500000,
    paymentStatus: 'PENDING',
    deviceModel: 'PC Gaming Tower RTX 4070 Super',
    problemDescription: 'Perakitan PC Gaming baru tema stealth black + install Windows 11 & stress test thermal.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: '882191',
    customerName: 'Dimas Pratama',
    customerEmail: 'dimaspratama@gmail.com',
    customerPhone: '085712349988',
    serviceName: 'Servis Laptop & MacBook',
    price: 650000,
    paymentStatus: 'IN_PROGRESS',
    deviceModel: 'MacBook Pro Retina 15 Inch (A1398)',
    problemDescription: 'Ganti keyboard internal tuts macet & thermal repaste Noctua.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: '882192',
    customerName: 'Aditya Rizky',
    customerEmail: 'adityarizky@gmail.com',
    customerPhone: '082198765432',
    serviceName: 'Servis Joystick & Gamepad',
    price: 160000,
    paymentStatus: 'COMPLETED_WAITING_PAYMENT',
    deviceModel: 'PS5 DualSense Wireless Controller',
    problemDescription: 'Upgrade modul analog magnetik Hall Effect anti-drift sepasang L3 & R3.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
  },
  {
    id: '882193',
    customerName: 'Sarah Azhari',
    customerEmail: 'sarahazhari@yahoo.com',
    customerPhone: '087822334455',
    serviceName: 'Perbaikan & Pembersihan PC Desktop',
    price: 125000,
    paymentStatus: 'PAID_WAITING_VERIFICATION',
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    deviceModel: 'PC Desktop Gaming Lian Li O11',
    problemDescription: 'Deep cleaning debu radiator watercooler & repaste pasta Arctic MX-6.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  },
  {
    id: '882194',
    customerName: 'Kevin Sanjaya',
    customerEmail: 'kevinsanjaya@gmail.com',
    customerPhone: '081399887766',
    serviceName: 'Servis Keyboard Mechanical & Mouse',
    price: 95000,
    paymentStatus: 'CONFIRMED',
    deviceModel: 'Vortex Pok3r + Mouse Logitech G Pro X',
    problemDescription: 'Ganti switch desolder 5 tuts + ganti micro switch Omron mouse anti double-click.',
    receiptDetailsJson: JSON.stringify([
      { name: 'Jasa Desolder & Solder Switch', price: 45000, qty: 1 },
      { name: 'Micro Switch Omron D2FC-F-K Original', price: 50000, qty: 1 }
    ]),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  }
];

export function getStoredOrders(): StoredOrder[] {
  return readJsonFile<StoredOrder[]>('store_orders.json', INITIAL_ORDERS);
}

export function saveStoredOrder(newOrder: StoredOrder): StoredOrder {
  const orders = getStoredOrders();
  const existingIdx = orders.findIndex((o) => o.id === newOrder.id);
  if (existingIdx >= 0) {
    orders[existingIdx] = { ...orders[existingIdx], ...newOrder, updatedAt: new Date().toISOString() };
  } else {
    orders.unshift({ ...newOrder, createdAt: newOrder.createdAt || new Date().toISOString() });
  }
  writeJsonFile('store_orders.json', orders);
  return newOrder;
}

export function updateStoredOrder(id: string, partial: Partial<StoredOrder>): StoredOrder | null {
  const orders = getStoredOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], ...partial, updatedAt: new Date().toISOString() };
  writeJsonFile('store_orders.json', orders);
  return orders[idx];
}

export function deleteStoredOrder(id: string): boolean {
  const orders = getStoredOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  writeJsonFile('store_orders.json', filtered);
  return true;
}


// ---------------------------------------------------------------------------
// 2. SERVICES STORAGE (CRUD)
// ---------------------------------------------------------------------------
export interface StoredService {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  priceStarting: string;
  price: number;
  imageUrl: string;
  badge?: string;
  features: string[];
}

const INITIAL_SERVICES: StoredService[] = SERVICES_LIST.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  category: s.category,
  shortDesc: s.shortDesc,
  fullDesc: s.fullDesc,
  priceStarting: s.priceStarting,
  price: parseFloat(s.priceStarting.replace(/[^0-9]/g, '')) || 0,
  imageUrl: s.imageUrl,
  badge: s.badge,
  features: s.features,
}));

export function getStoredServices(): StoredService[] {
  return readJsonFile<StoredService[]>('store_services.json', INITIAL_SERVICES);
}

export function saveStoredService(item: StoredService): StoredService {
  const list = getStoredServices();
  const idx = list.findIndex((s) => s.id === item.id || s.slug === item.slug);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...item };
  } else {
    list.push(item);
  }
  writeJsonFile('store_services.json', list);
  return item;
}

export function deleteStoredService(id: string): boolean {
  const list = getStoredServices();
  const filtered = list.filter((s) => s.id !== id && s.slug !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('store_services.json', filtered);
  return true;
}


// ---------------------------------------------------------------------------
// 3. BLOG POSTS STORAGE (CRUD)
// ---------------------------------------------------------------------------
export interface StoredBlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  snippet: string;
  content: string;
  imageUrl: string;
  readTime: string;
}

const INITIAL_BLOGS: StoredBlogPost[] = BLOG_POSTS.map((b) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  category: b.category,
  date: b.date,
  author: b.author,
  snippet: b.snippet,
  content: b.content,
  imageUrl: b.imageUrl,
  readTime: b.readTime,
}));

export function getStoredBlogs(): StoredBlogPost[] {
  return readJsonFile<StoredBlogPost[]>('store_blogs.json', INITIAL_BLOGS);
}

export function saveStoredBlog(post: StoredBlogPost): StoredBlogPost {
  const list = getStoredBlogs();
  const idx = list.findIndex((b) => b.id === post.id || b.slug === post.slug);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...post };
  } else {
    list.unshift(post);
  }
  writeJsonFile('store_blogs.json', list);
  return post;
}

export function deleteStoredBlog(id: string): boolean {
  const list = getStoredBlogs();
  const filtered = list.filter((b) => b.id !== id && b.slug !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('store_blogs.json', filtered);
  return true;
}


// ---------------------------------------------------------------------------
// 4. PC COMPONENTS STORAGE (CRUD)
// ---------------------------------------------------------------------------
export interface StoredComponent {
  id: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  specs: string;
  imageUrl?: string;
  badge?: string;
}

const INITIAL_COMPONENTS: StoredComponent[] = PC_COMPONENTS_DB.map((c) => ({
  id: c.id,
  category: c.category,
  name: c.name,
  brand: c.brand,
  price: c.price,
  specs: c.specs,
  badge: c.badge,
}));

export function getStoredComponents(): StoredComponent[] {
  return readJsonFile<StoredComponent[]>('store_components.json', INITIAL_COMPONENTS);
}

export function saveStoredComponent(comp: StoredComponent): StoredComponent {
  const list = getStoredComponents();
  const idx = list.findIndex((c) => c.id === comp.id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...comp };
  } else {
    list.push(comp);
  }
  writeJsonFile('store_components.json', list);
  return comp;
}

export function deleteStoredComponent(id: string): boolean {
  const list = getStoredComponents();
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('store_components.json', filtered);
  return true;
}


// ---------------------------------------------------------------------------
// 5. CASHFLOW STORAGE
// ---------------------------------------------------------------------------
export interface StoredCashflow {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  description: string;
  date: string;
  orderId?: string;
}

const INITIAL_CASHFLOW: StoredCashflow[] = [
  {
    id: 'cf-1',
    type: 'INCOME',
    category: 'Jasa Servis',
    amount: 650000,
    description: 'Pelunasan Servis MacBook Pro (ORD-882191)',
    date: new Date().toISOString().slice(0, 10),
    orderId: '882191',
  },
  {
    id: 'cf-2',
    type: 'EXPENSE',
    category: 'Pembelian Sparepart',
    amount: 280000,
    description: 'Beli Thermal Paste Noctua NT-H1 10g & Thermal Grizzly',
    date: new Date().toISOString().slice(0, 10),
  },
  {
    id: 'cf-3',
    type: 'INCOME',
    category: 'Penjualan Komponen',
    amount: 14500000,
    description: 'Down Payment Rakit PC Gaming RTX 4070 (ORD-882190)',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    orderId: '882190',
  },
  {
    id: 'cf-4',
    type: 'EXPENSE',
    category: 'Operasional Workshop',
    amount: 150000,
    description: 'Beli cairan pembersih isopropil alkohol 99% & kuas anti statis',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
  }
];

export function getStoredCashflow(): StoredCashflow[] {
  return readJsonFile<StoredCashflow[]>('store_cashflow.json', INITIAL_CASHFLOW);
}

export function saveStoredCashflow(entry: StoredCashflow): StoredCashflow {
  const list = getStoredCashflow();
  list.unshift(entry);
  writeJsonFile('store_cashflow.json', list);
  return entry;
}

export function deleteStoredCashflow(id: string): boolean {
  const list = getStoredCashflow();
  const filtered = list.filter((c) => c.id !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('store_cashflow.json', filtered);
  return true;
}
