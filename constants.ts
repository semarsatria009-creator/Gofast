
import { Restaurant, RideOption, PastOrder, PromoVoucher, ShippingService, AppView, Product, AppNotification, ChatThread } from './types.ts';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Nasi Goreng Kambing Kebon Sirih',
    rating: 4.8,
    distance: '1.2 km',
    image: 'https://picsum.photos/seed/nasgor/400/300',
    category: 'Indonesian',
    isPromo: true
  },
  {
    id: '2',
    name: 'Sushi Tei - Plaza Indonesia',
    rating: 4.9,
    distance: '2.5 km',
    image: 'https://picsum.photos/seed/sushi/400/300',
    category: 'Japanese'
  },
  {
    id: '3',
    name: 'Burger King - Menteng',
    rating: 4.5,
    distance: '0.8 km',
    image: 'https://picsum.photos/seed/burger/400/300',
    category: 'Fast Food',
    isPromo: true
  },
  {
    id: '4',
    name: 'Kopi Kenangan - Thamrin',
    rating: 4.7,
    distance: '0.5 km',
    image: 'https://picsum.photos/seed/coffee/400/300',
    category: 'Beverage'
  }
];

export const TOPPING_OPTIONS = [
  { id: 't1', name: 'Extra Telur Mata Sapi', price: 5000 },
  { id: 't2', name: 'Keju Slice Melt', price: 4000 },
  { id: 't3', name: 'Sambal Korek Ekstra', price: 2000 },
  { id: 't4', name: 'Kerupuk Kaleng (3pcs)', price: 3000 },
  { id: 't5', name: 'Nasi Tambah 1/2', price: 6000 },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'Smartphone Pro Max', 
    price: 12999000, 
    shopName: 'Tech Store ID', 
    rating: 4.9, 
    image: 'https://picsum.photos/seed/phone/600/600', 
    category: 'Elektronik', 
    inStock: true,
    description: 'Smartphone generasi terbaru dengan layar super retina, performa kilat, dan sistem kamera tercanggih untuk hasil foto profesional di mana saja.'
  },
  { 
    id: 'p2', 
    name: 'Sneakers Casual White', 
    price: 750000, 
    shopName: 'Footwear Hub', 
    rating: 4.7, 
    image: 'https://picsum.photos/seed/shoes/600/600', 
    category: 'Fashion', 
    inStock: false,
    description: 'Sepatu sneakers putih klasik yang nyaman digunakan sehari-hari. Dibuat dengan bahan premium berkualitas tinggi untuk ketahanan maksimal.'
  },
  { 
    id: 'p3', 
    name: 'Wireless Headphone', 
    price: 1200000, 
    shopName: 'Audio Lab', 
    rating: 4.8, 
    image: 'https://picsum.photos/seed/headphone/600/600', 
    category: 'Elektronik', 
    inStock: true,
    description: 'Rasakan kejernihan suara tanpa kabel. Dilengkapi fitur noise cancelling dan baterai tahan lama hingga 40 jam pemakaian non-stop.'
  },
  { 
    id: 'p4', 
    name: 'Hoodie Oversized Black', 
    price: 350000, 
    shopName: 'Urban Style', 
    rating: 4.6, 
    image: 'https://picsum.photos/seed/hoodie/600/600', 
    category: 'Fashion', 
    inStock: true,
    description: 'Hoodie bergaya urban dengan potongan oversized yang nyaman. Cocok untuk cuaca dingin maupun sekadar tampil stylish di akhir pekan.'
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Pesanan Selesai!',
    body: 'Nasi Goreng Kambingmu sudah sampai tujuan. Jangan lupa kasih bintang 5 ya!',
    type: 'success',
    timestamp: '10:30',
    isRead: false
  },
  {
    id: 'n2',
    title: 'Promo Gajian Datang!',
    body: 'Dapatkan diskon belanja hingga 70% di toko Tech Store pilihan.',
    type: 'promo',
    timestamp: '08:15',
    isRead: false
  },
  {
    id: 'n3',
    title: 'Update Keamanan',
    body: 'Login baru terdeteksi pada perangkat iPhone 13. Jika bukan Anda, segera ubah PIN.',
    type: 'info',
    timestamp: 'Kemarin',
    isRead: true
  }
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: 'system_gofast',
    name: 'Tim GoFast',
    lastMessage: 'Selamat bergabung di ekosistem GoFast!',
    time: 'Baru saja',
    unreadCount: 0,
    avatar: 'https://picsum.photos/seed/gofast_logo/100/100',
    status: 'online',
    role: 'System',
    messages: [
      { id: 'sm1', text: 'Selamat datang! Gunakan aplikasi ini untuk kebutuhan harian Anda.', time: '08:00', sender: 'other' }
    ]
  },
  {
    id: 'c1',
    name: 'Ahmad Subarjo',
    lastMessage: 'Ok siap, saya sudah di lobi ya kak.',
    time: '12:45',
    unreadCount: 1,
    avatar: 'https://picsum.photos/seed/driver1/100/100',
    status: 'online',
    role: 'Driver',
    messages: [
      { id: 'm1', text: 'Halo kak, saya sudah ambil pesanannya ya.', time: '12:40', sender: 'other' },
      { id: 'm2', text: 'Siap pak, hati-hati di jalan.', time: '12:41', sender: 'me' },
      { id: 'm3', text: 'Ok siap, saya sudah di lobi ya kak.', time: '12:45', sender: 'other' }
    ]
  },
  {
    id: 'c2',
    name: 'Nasi Goreng Kambing KS',
    lastMessage: 'Mohon maaf, acar sedang habis kak.',
    time: '11:20',
    unreadCount: 0,
    avatar: 'https://picsum.photos/seed/resto1/100/100',
    status: 'offline',
    role: 'Merchant',
    messages: [
      { id: 'm1', text: 'Pesanan atas nama Budi sedang kami siapkan.', time: '11:15', sender: 'other' },
      { id: 'm2', text: 'Mohon maaf, acar sedang habis kak.', time: '11:20', sender: 'other' }
    ]
  }
];

export const RIDE_OPTIONS: RideOption[] = [
  { id: 'bike', name: 'GoBike', price: 12000, eta: '3 min', icon: 'fa-motorcycle' },
  { id: 'car', name: 'GoCar', price: 35000, eta: '6 min', icon: 'fa-car' }
];

export const CATEGORIES = [
  { name: 'Ojek', icon: 'fa-motorcycle', color: 'bg-sky-100 text-sky-600', view: AppView.OJEK },
  { name: 'Makanan', icon: 'fa-utensils', color: 'bg-red-100 text-red-600', view: AppView.FOOD },
  { name: 'Belanja', icon: 'fa-shopping-bag', color: 'bg-sky-100 text-sky-600', view: AppView.SHOPPING },
  { name: 'Kirim Paket', icon: 'fa-box', color: 'bg-orange-100 text-orange-600', view: AppView.KIRIM_PAKET }
];

export const MOCK_BEST_SELLERS = [
  { id: 'bs1', name: 'Ayam Geprek Sambal Bawang', price: 25000, rating: 4.9, image: 'https://picsum.photos/seed/geprek/300/300', type: 'food', tag: 'MAKANAN' },
  { id: 'bs2', name: 'Kopi Susu Gula Aren', price: 18000, rating: 4.8, image: 'https://picsum.photos/seed/latte/300/300', type: 'food', tag: 'MINUMAN' },
  { id: 'bs3', name: 'Sate Ayam Madura Spesial', price: 30000, rating: 4.9, image: 'https://picsum.photos/seed/sate/300/300', type: 'food', tag: 'MAKANAN' },
  { id: 'bs4', name: 'Martabak Manis Cokelat Keju', price: 45000, rating: 4.7, image: 'https://picsum.photos/seed/martabak/300/300', type: 'food', tag: 'DESSERT' },
];

export const MOCK_HISTORY: PastOrder[] = [
  {
    id: 'h1',
    type: 'food',
    title: 'Nasi Goreng Kambing Kebon Sirih',
    status: 'Selesai',
    price: 45000,
    icon: 'fa-utensils',
    date: '24 Jan, 12:45'
  }
];

export const MOCK_PROMOS: PromoVoucher[] = [
  {
    id: 'p1',
    title: 'Pesta Makan Siang',
    description: 'Diskon 50% untuk pesanan makanan di atas Rp 50.000',
    code: 'MAKANHEMAT',
    type: 'food',
    discount: '50%',
    expiry: 'Berakhir dalam 2 hari'
  }
];

export const SHIPPING_SERVICES: ShippingService[] = [
  {
    id: 'reguler',
    name: 'Reguler',
    description: 'Pengiriman standar terpercaya.',
    price: 15000,
    eta: '2-3 Hari',
    icon: 'fa-truck'
  },
  {
    id: 'hemat',
    name: 'Hemat',
    description: 'Opsi ekonomis untuk pengiriman santai.',
    price: 8000,
    eta: '3-5 Hari',
    icon: 'fa-box-open'
  },
  {
    id: 'cargo',
    name: 'Kargo',
    description: 'Untuk paket besar dan berat.',
    price: 45000,
    eta: '5-7 Hari',
    icon: 'fa-truck-moving'
  },
  {
    id: 'instant',
    name: 'Instant',
    description: 'Pengiriman kilat hari yang sama.',
    price: 25000,
    eta: '1-3 Jam',
    icon: 'fa-bolt'
  }
];

export const PACKAGE_CATEGORIES = [
  { id: 'food', name: 'Makanan', icon: 'fa-bowl-food' },
  { id: 'doc', name: 'Dokumen', icon: 'fa-file-lines' },
  { id: 'other', name: 'Lainnya', icon: 'fa-box-open' }
];
