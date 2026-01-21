
export enum AppView {
  HOME = 'home',
  OJEK = 'ojek',
  FOOD = 'food',
  SHOPPING = 'shopping',
  HISTORY = 'history',
  PROFILE = 'profile',
  RESTAURANT_DETAIL = 'restaurant_detail',
  PRODUCT_DETAIL = 'product_detail',
  CART = 'cart',
  SHOPPING_CART = 'shopping_cart',
  TOP_UP = 'top_up',
  TOP_UP_PAYMENT_METHOD = 'top_up_payment_method',
  TOP_UP_MANUAL_TRANSFER = 'top_up_manual_transfer',
  TOP_UP_VA = 'top_up_va',
  TOP_UP_QRIS = 'top_up_qris',
  TOP_UP_SUCCESS = 'top_up_success',
  TOP_UP_DETAIL = 'top_up_detail',
  WITHDRAW = 'withdraw',
  WITHDRAW_METHOD = 'withdraw_method',
  WITHDRAW_SUCCESS = 'withdraw_success',
  WITHDRAW_DETAIL = 'withdraw_detail',
  TRANSFER = 'transfer',
  TRANSFER_METHOD = 'transfer_method',
  TRANSFER_SUCCESS = 'transfer_success',
  TRANSFER_DETAIL = 'transfer_detail',
  FOOD_CHECKOUT = 'food_checkout',
  SHOPPING_CHECKOUT = 'shopping_checkout',
  SHOPPING_PAYMENT_VA = 'shopping_payment_va',
  SHOPPING_PAYMENT_MANUAL = 'shopping_payment_manual',
  SHOPPING_CHECKING = 'shopping_checking',
  SHOPPING_SUCCESS = 'shopping_success',
  ORDER_TRACKING = 'order_tracking',
  ORDER_RECEIPT = 'order_receipt',
  PROMO = 'promo',
  KIRIM_PAKET = 'kirim_paket',
  PROMO_SAYA = 'promo_saya',
  PUSAT_BANTUAN = 'pusat_bantuan',
  ALAMAT_TERSIMPAN = 'alamat_tersimpan',
  METODE_PEMBAYARAN = 'metode_pembayaran',
  BEST_SELLER_PAGE = 'best_seller_page',
  NOTIFICATIONS = 'notifications',
  CHATS = 'chats',
  CHAT_DETAIL = 'chat_detail',
  EDIT_PROFILE = 'edit_profile',
  LANGUAGE = 'language'
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  isTransactionLink?: boolean;
  transactionData?: any;
}

export interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
  status: 'online' | 'offline';
  role: 'Driver' | 'Merchant' | 'CS' | 'System';
  messages?: ChatMessage[];
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  distance: string;
  image: string;
  category: string;
  isPromo?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  shopName: string;
  rating: number;
  image: string;
  category: string;
  inStock?: boolean;
  description?: string;
}

export interface ShoppingCartItem extends Product {
  quantity: number;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
  note?: string;
  selectedToppings?: string[];
}

export interface RideOption {
  id: string;
  name: string;
  price: number;
  eta: string;
  icon: string;
}

export interface ActiveOrder {
  id: string;
  type: 'food' | 'ojek' | 'delivery' | 'shopping';
  title: string;
  status: string;
  price: number;
  icon: string;
  orderNote?: string;
  productDetails?: Product;
  items?: ShoppingCartItem[];
  address?: string;
}

export interface PastOrder extends ActiveOrder {
  date: string;
  itemsCount?: number;
}

export interface PromoVoucher {
  id: string;
  title: string;
  description: string;
  code: string;
  type: 'food' | 'ride' | 'wallet' | 'shopping';
  discount: string;
  expiry: string;
}

export interface ShippingService {
  id: string;
  name: string;
  description: string;
  price: number;
  eta: string;
  icon: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'order' | 'promo';
  timestamp: string;
  isRead: boolean;
  orderId?: string;
  orderType?: 'food' | 'ojek' | 'delivery' | 'shopping';
  metadata?: {
    view: AppView;
    data: any;
  };
}
