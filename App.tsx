
import React, { useState, useEffect } from 'react';
import { AppView, ActiveOrder, CartItem, Restaurant, PastOrder, AppNotification, Product, ShoppingCartItem, ChatThread, UserProfile, ChatMessage } from './types.ts';
import { Navigation } from './components/Navigation.tsx';
import { Home } from './components/Home.tsx';
import { RideBooking } from './components/RideBooking.tsx';
import { FoodDelivery } from './components/FoodDelivery.tsx';
import { Shopping } from './components/Shopping.tsx'; 
import { ProductDetail } from './components/ProductDetail.tsx';
import { ShoppingCart } from './components/ShoppingCart.tsx';
import { ShoppingCheckout } from './components/ShoppingCheckout.tsx';
import { ShoppingVA } from './components/ShoppingVA.tsx';
import { ShoppingManualTransfer } from './components/ShoppingManualTransfer.tsx';
import { ShoppingChecking } from './components/ShoppingChecking.tsx';
import { ShoppingSuccess } from './components/ShoppingSuccess.tsx';
import { BestSellerPage } from './components/BestSellerPage.tsx';
import { TopUp } from './components/TopUp.tsx';
import { Transfer } from './components/Transfer.tsx';
import { TransferMethod } from './components/TransferMethod.tsx';
import { TransferSuccess } from './components/TransferSuccess.tsx';
import { TransferDetail } from './components/TransferDetail.tsx';
import { FoodCheckout } from './components/FoodCheckout.tsx';
import { OrderTracking } from './components/OrderTracking.tsx';
import { OrderReceipt } from './components/OrderReceipt.tsx';
import { History } from './components/History.tsx';
import { Promo } from './components/Promo.tsx';
import { SendPackage } from './components/SendPackage.tsx';
import { ProfilePromo } from './components/ProfilePromo.tsx';
import { ProfileHelp } from './components/ProfileHelp.tsx';
import { ProfileAddress } from './components/ProfileAddress.tsx';
import { ProfilePayment } from './components/ProfilePayment.tsx';
import { ProfileLanguage } from './components/ProfileLanguage.tsx';
import { Notifications } from './components/Notifications.tsx';
import { ChatHistory } from './components/ChatHistory.tsx';
import { ChatDetail } from './components/ChatDetail.tsx';
import { EditProfile } from './components/EditProfile.tsx';
import { TopUpPaymentMethod } from './components/TopUpPaymentMethod.tsx';
import { TopUpManualTransfer } from './components/TopUpManualTransfer.tsx';
import { TopUpVirtualAccount } from './components/TopUpVirtualAccount.tsx';
import { TopUpQRIS } from './components/TopUpQRIS.tsx';
import { TopUpSuccess } from './components/TopUpSuccess.tsx';
import { TopUpTransactionDetail } from './components/TopUpTransactionDetail.tsx';
import { Withdraw } from './components/Withdraw.tsx';
import { WithdrawMethod } from './components/WithdrawMethod.tsx';
import { WithdrawSuccess } from './components/WithdrawSuccess.tsx';
import { WithdrawDetail } from './components/WithdrawDetail.tsx';
import { MOCK_HISTORY, MOCK_NOTIFICATIONS, MOCK_CHATS } from './constants.ts';

const NotificationOverlay: React.FC<{ 
  notifications: AppNotification[], 
  onDismiss: (id: string) => void, 
  onAction: (n: AppNotification) => void 
}> = ({ notifications, onDismiss, onAction }) => {
  const activeOverlays = notifications.filter(n => !n.isRead).slice(0, 3);
  
  if (activeOverlays.length === 0) return null;

  return (
    <div className="fixed top-12 left-0 right-0 z-[1000] px-4 pointer-events-none flex flex-col gap-3">
      {activeOverlays.map((n) => (
        <div 
          key={n.id}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex gap-4 animate-slide-down pointer-events-auto cursor-pointer group active:scale-[0.98] transition-all relative overflow-hidden"
          onClick={() => {
            onDismiss(n.id);
            onAction(n);
          }}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${n.type === 'promo' ? 'bg-red-500' : n.type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <i className={`fa-solid ${n.type === 'promo' ? 'fa-tag' : n.type === 'success' ? 'fa-circle-check' : 'fa-bolt'}`}></i>
          </div>
          <div className="flex-1 pr-6">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-black text-gray-900 leading-tight">{n.title}</h4>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap ml-2">Baru</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-snug mt-1 font-medium line-clamp-2">{n.body}</p>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(n.id);
            }}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [balance, setBalance] = useState<number>(250000);
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [history, setHistory] = useState<PastOrder[]>(MOCK_HISTORY);
  const [allNotifications, setAllNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [allChats, setAllChats] = useState<ChatThread[]>(MOCK_CHATS);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<PastOrder | null>(null);

  const [linkedBanks, setLinkedBanks] = useState([
    { id: 'bca', name: 'Bank BCA', holder: 'Budi Setiawan', number: '1234****789', icon: 'fa-building-columns', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'mandiri', name: 'Bank Mandiri', holder: 'Budi Setiawan', number: '9876****123', icon: 'fa-building-columns', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ]);

  const [savedAddresses, setSavedAddresses] = useState([
    { id: '1', type: 'Rumah', addr: 'Apartemen Menteng Park, Jakarta Pusat', icon: 'fa-house-chimney' },
    { id: '2', type: 'Kantor', addr: 'Gedung Sudirman Lantai 12, Jakarta Selatan', icon: 'fa-briefcase' }
  ]);

  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [transferDetails, setTransferDetails] = useState<any>(null);
  
  const SHOPPING_ADDRESS = 'Apartemen Menteng Park, Menara B Lt. 12, Jakarta Pusat';
  const [pendingShoppingOrder, setPendingShoppingOrder] = useState<any>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Budi Setiawan',
    email: 'budi@example.com',
    phone: '+62 812 3456 7890',
    avatar: 'https://picsum.photos/seed/user123/200/200'
  });
  
  const [checkoutData, setCheckoutData] = useState<{ cart: CartItem[], restaurant: Restaurant } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);

  const translations = {
    id: {
      payment: 'Metode Pembayaran',
      address: 'Alamat Tersimpan',
      promo: 'Promo Saya',
      help: 'Pusat Bantuan',
      language: 'Bahasa',
      logout: 'Keluar',
      edit: 'Edit Profil'
    },
    en: {
      payment: 'Payment Methods',
      address: 'Saved Addresses',
      promo: 'My Promos',
      help: 'Help Center',
      language: 'Language',
      logout: 'Log Out',
      edit: 'Edit Profile'
    }
  };

  const t = translations[language];

  const addNotification = (title: string, body: string, type: 'info' | 'success' | 'order' | 'promo' = 'order', metadata?: any) => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      body,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      metadata
    };
    setAllNotifications(prev => [newNotif, ...prev]);
  };

  const handleAddBank = (bank: any) => {
    setLinkedBanks(prev => [...prev, { ...bank, id: Math.random().toString(36).substr(2, 9) }]);
    addNotification("Metode Ditambahkan", `${bank.name} berhasil disimpan sebagai metode penarikan.`, 'success');
  };

  const handleRemoveBank = (id: string) => {
    const bankToRemove = linkedBanks.find(b => b.id === id);
    setLinkedBanks(prev => prev.filter(b => b.id !== id));
    if (bankToRemove) {
      addNotification("Metode Dihapus", `${bankToRemove.name} telah dihapus dari profil Anda.`, 'info');
    }
  };

  const handleAddAddress = (address: any) => {
    setSavedAddresses(prev => [...prev, { ...address, id: Math.random().toString(36).substr(2, 9) }]);
    addNotification("Alamat Ditambahkan", `Lokasi "${address.type}" berhasil disimpan.`, 'success');
  };

  const handleEditAddress = (id: string, updatedAddress: any) => {
    setSavedAddresses(prev => prev.map(a => a.id === id ? { ...updatedAddress, id } : a));
    addNotification("Alamat Diperbarui", "Perubahan alamat telah disimpan.", 'info');
  };

  const handleDeleteAddress = (id: string) => {
    const addrToRemove = savedAddresses.find(a => a.id === id);
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
    if (addrToRemove) {
      addNotification("Alamat Dihapus", `Lokasi "${addrToRemove.type}" telah dihapus.`, 'info');
    }
  };

  const addSystemMessage = (text: string, transactionData?: any, viewToLink?: AppView) => {
    setAllChats(prev => prev.map(chat => {
      if (chat.id === 'system_gofast') {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'other',
          isTransactionLink: !!viewToLink,
          transactionData: viewToLink ? { view: viewToLink, data: transactionData } : undefined
        };
        return {
          ...chat,
          lastMessage: text,
          time: 'Baru saja',
          messages: [...(chat.messages || []), newMessage]
        };
      }
      return chat;
    }));
  };

  const handleNotificationClick = (n: AppNotification) => {
    if (n.metadata) {
      if (n.metadata.view === AppView.TOP_UP_DETAIL) {
        setPendingAmount(n.metadata.data.amount);
        setSelectedMethod(n.metadata.data.method);
        setSelectedBank(n.metadata.data.bank);
      } else if (n.metadata.view === AppView.WITHDRAW_DETAIL) {
        setPendingAmount(n.metadata.data.amount);
        setSelectedBank(n.metadata.data.bank);
      } else if (n.metadata.view === AppView.TRANSFER_DETAIL) {
        setPendingAmount(n.metadata.data.amount);
        setTransferDetails(n.metadata.data.details);
      } else if (n.metadata.view === AppView.ORDER_RECEIPT || n.metadata.view === AppView.ORDER_TRACKING) {
        if (n.metadata.view === AppView.ORDER_TRACKING) {
           const found = activeOrders.find(o => o.id === n.metadata.data.id);
           if (found) {
              setTrackingOrderId(found.id);
              setCurrentView(AppView.ORDER_TRACKING);
              return;
           }
        }
        setSelectedHistoryItem(n.metadata.data);
        setCurrentView(AppView.ORDER_RECEIPT);
        return;
      }
      setCurrentView(n.metadata.view);
    } else {
       setCurrentView(AppView.HOME);
    }
  };

  const handleSystemChatClick = (msg: ChatMessage) => {
    if (msg.isTransactionLink && msg.transactionData) {
       const { view, data } = msg.transactionData;
       if (view === AppView.TOP_UP_DETAIL) {
          setPendingAmount(data.amount);
          setSelectedMethod(data.method);
          setSelectedBank(data.bank);
       } else if (view === AppView.WITHDRAW_DETAIL) {
          setPendingAmount(data.amount);
          setSelectedBank(data.bank);
       } else if (view === AppView.TRANSFER_DETAIL) {
          setPendingAmount(data.amount);
          setTransferDetails(data.details);
       } else if (view === AppView.ORDER_RECEIPT) {
          setSelectedHistoryItem(data);
       } else if (view === AppView.ORDER_TRACKING) {
          setTrackingOrderId(data.id);
       }
       setCurrentView(view);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setAllNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addToShoppingCart = (product: Product) => {
    setShoppingCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setShoppingCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setShoppingCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleTopUpConfirm = (amount: number) => {
    setPendingAmount(amount);
    setCurrentView(AppView.TOP_UP_PAYMENT_METHOD);
  };

  const handleFinalizeTopUp = () => {
    setBalance(prev => prev + pendingAmount);
    const detailData = { amount: pendingAmount, method: selectedMethod, bank: selectedBank };
    addNotification("Top Up Berhasil", `Saldo Rp ${pendingAmount.toLocaleString('id-ID')} masuk ke wallet Anda.`, 'success', { view: AppView.TOP_UP_DETAIL, data: detailData });
    addSystemMessage(`Top Up sebesar Rp ${pendingAmount.toLocaleString('id-ID')} telah berhasil.`, detailData, AppView.TOP_UP_DETAIL);
    setCurrentView(AppView.TOP_UP_SUCCESS);
  };

  const handleTransferStart = (amount: number) => {
    setPendingAmount(amount);
    setCurrentView(AppView.TRANSFER_METHOD);
  };

  const handleFinalizeTransfer = (details: any) => {
    setTransferDetails(details);
    setBalance(prev => prev - pendingAmount);
    const detailData = { amount: pendingAmount, details };
    addNotification("Transfer Berhasil", `Berhasil kirim Rp ${pendingAmount.toLocaleString('id-ID')} ke ${details.recipientName || details.eWalletName}.`, 'success', { view: AppView.TRANSFER_DETAIL, data: detailData });
    addSystemMessage(`Anda telah mengirim dana sebesar Rp ${pendingAmount.toLocaleString('id-ID')}.`, detailData, AppView.TRANSFER_DETAIL);
    setCurrentView(AppView.TRANSFER_SUCCESS);
  };

  const handleWithdrawConfirm = (amount: number) => {
    setPendingAmount(amount);
    setCurrentView(AppView.WITHDRAW_METHOD);
  };

  const handleFinalizeWithdraw = (bank: any) => {
    setSelectedBank(bank);
    setBalance(prev => prev - pendingAmount);
    const detailData = { amount: pendingAmount, bank };
    addNotification("Penarikan Diproses", `Tarik tunai Rp ${pendingAmount.toLocaleString('id-ID')} sedang diteruskan ke bank.`, 'success', { view: AppView.WITHDRAW_DETAIL, data: detailData });
    addSystemMessage(`Permintaan penarikan saldo Rp ${pendingAmount.toLocaleString('id-ID')} sedang diproses.`, detailData, AppView.WITHDRAW_DETAIL);
    setCurrentView(AppView.WITHDRAW_SUCCESS);
  };

  const startOrder = (order: ActiveOrder) => {
    if (!order.status.includes('COD')) {
        if (currentView === AppView.FOOD_CHECKOUT || (currentView === AppView.SHOPPING_CHECKOUT && order.title.includes('GoPay'))) {
           setBalance(prev => prev - order.price);
        }
    }
    setActiveOrders(prev => [...prev, order]);
    setTrackingOrderId(order.id);
    
    addNotification("Pesanan Dibuat", `Pesanan ${order.title} sedang diproses.`, 'order', { view: AppView.ORDER_TRACKING, data: order });
    const typeLabel = order.type === 'delivery' ? 'KIRIM PAKET' : order.type.toUpperCase();
    addSystemMessage(`Pesanan baru untuk ${typeLabel} diterima.`, order, AppView.ORDER_TRACKING as any);

    if (order.type === 'shopping' && [AppView.SHOPPING_SUCCESS, AppView.SHOPPING_CHECKING].includes(currentView as any) === false) {
       setShoppingCart([]);
       setCurrentView(AppView.SHOPPING_SUCCESS);
    } else {
       setCurrentView(AppView.ORDER_TRACKING);
    }
  };

  const completeOrder = (orderId: string) => {
    const orderToComplete = activeOrders.find(o => o.id === orderId);
    if (orderToComplete) {
      const historyItem: PastOrder = {
        ...orderToComplete,
        status: 'Selesai',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [historyItem, ...prev]);
      setActiveOrders(prev => prev.filter(o => o.id !== orderId));

      addNotification("Pesanan Selesai", `Pesanan ${historyItem.title} telah sampai.`, 'success', { view: AppView.ORDER_RECEIPT, data: historyItem });
      addSystemMessage(`Layanan ${historyItem.type.toUpperCase()} telah selesai.`, historyItem, AppView.ORDER_RECEIPT);
    }
    setCurrentView(AppView.HOME);
  };

  const handleCancelOrder = (orderId: string) => {
    const orderToCancel = activeOrders.find(o => o.id === orderId);
    if (orderToCancel) {
      if (!orderToCancel.status.includes('COD') && !orderToCancel.status.includes('Virtual Account')) {
        setBalance(prev => prev + orderToCancel.price);
      }
      const historyItem: PastOrder = {
        ...orderToCancel,
        status: 'Dibatalkan',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [historyItem, ...prev]);
      setActiveOrders(prev => prev.filter(o => o.id !== orderId));
      
      addNotification("Pesanan Dibatalkan", `Pesanan ${orderToCancel.title} telah dibatalkan.`, 'info');
      addSystemMessage(`Pesanan ${orderToCancel.id.toUpperCase()} telah dibatalkan.`, historyItem, AppView.ORDER_RECEIPT);
    }
    setCurrentView(AppView.HOME);
  };

  const handleShoppingSelectPayment = (type: string, data: any) => {
    setPendingShoppingOrder(data);
    if (type === 'wallet') {
      setBalance(prev => prev - data.total);
      const order: ActiveOrder = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'shopping',
        title: data.items.length === 1 ? data.items[0].name : `${data.items[0].name} & ${data.items.length - 1} lainnya`,
        status: 'Pesanan sedang dikemas',
        price: data.total,
        icon: 'fa-bag-shopping',
        items: data.items,
        address: data.address || SHOPPING_ADDRESS
      };
      startOrder(order);
    } else if (type === 'va') {
      setCurrentView(AppView.SHOPPING_PAYMENT_VA);
    } else if (type === 'manual') {
      setCurrentView(AppView.SHOPPING_PAYMENT_MANUAL);
    }
  };

  const activeOrderForTracking = activeOrders.find(o => o.id === trackingOrderId) || activeOrders[0];

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
      case AppView.OJEK:
        return <RideBooking onBack={() => setCurrentView(AppView.HOME)} balance={balance} onOrderConfirm={startOrder} savedAddresses={savedAddresses} />;
      case AppView.FOOD:
        return <FoodDelivery onBack={() => setCurrentView(AppView.HOME)} onCheckout={(cart, restaurant) => { setCheckoutData({ cart, restaurant }); setCurrentView(AppView.FOOD_CHECKOUT); }} />;
      case AppView.SHOPPING:
        return <Shopping onBack={() => setCurrentView(AppView.HOME)} balance={balance} onOrderConfirm={(p) => { setShoppingCart([{...p, quantity: 1}]); setCurrentView(AppView.SHOPPING_CHECKOUT); }} triggerNotification={(title, body, type, id) => addNotification(title, body, type as any)} onProductClick={(p) => { setSelectedProduct(p); setCurrentView(AppView.PRODUCT_DETAIL); }} onAddToCart={addToShoppingCart} cartCount={shoppingCart.reduce((acc, item) => acc + item.quantity, 0)} onViewCart={() => setCurrentView(AppView.SHOPPING_CART)} />;
      case AppView.NOTIFICATIONS:
        return <Notifications onBack={() => setCurrentView(AppView.HOME)} notifications={allNotifications} onNotificationClick={handleNotificationClick} onMarkAllAsRead={markAllAsRead} />;
      case AppView.CHATS:
        return <ChatHistory onBack={() => setCurrentView(AppView.HOME)} allChats={allChats} onChatClick={(chat) => { setSelectedChat(chat); setCurrentView(AppView.CHAT_DETAIL); }} />;
      case AppView.CHAT_DETAIL:
        if (!selectedChat) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
        return <ChatDetail chat={selectedChat} onBack={() => setCurrentView(AppView.CHATS)} onSystemLinkClick={handleSystemChatClick} />;
      case AppView.ORDER_RECEIPT:
        if (!selectedHistoryItem) return <History orders={history} activeOrders={activeOrders} onViewChange={setCurrentView} onSelectItem={(item) => { setSelectedHistoryItem(item); setCurrentView(AppView.ORDER_RECEIPT); }} onTrackOrder={(id) => { setTrackingOrderId(id); setCurrentView(AppView.ORDER_TRACKING); }} />;
        return <OrderReceipt order={selectedHistoryItem} onBack={() => setCurrentView(AppView.HISTORY)} />;
      case AppView.ORDER_TRACKING:
        if (!activeOrderForTracking) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={null} />;
        return <OrderTracking order={activeOrderForTracking} onComplete={() => completeOrder(activeOrderForTracking.id)} onCancel={() => handleCancelOrder(activeOrderForTracking.id)} onBack={() => setCurrentView(AppView.HISTORY)} triggerNotification={(title, body, type) => addNotification(title, body, type)} />;
      case AppView.HISTORY:
        return <History orders={history} activeOrders={activeOrders} onViewChange={setCurrentView} onSelectItem={(item) => { setSelectedHistoryItem(item); setCurrentView(AppView.ORDER_RECEIPT); }} onTrackOrder={(id) => { setTrackingOrderId(id); setCurrentView(AppView.ORDER_TRACKING); }} />;
      case AppView.PROFILE:
        return (
          <div className="p-4 pt-12 h-screen bg-gray-50 overflow-y-auto hide-scrollbar">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col items-center mb-4 relative overflow-hidden group border border-gray-50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-3xl -mr-12 -mt-12 opacity-50"></div>
              <div className="relative mb-3">
                <img src={userProfile.avatar} alt="Profile" className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white shadow-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-600 rounded-full border border-white flex items-center justify-center text-white text-[8px]"><i className="fa-solid fa-check"></i></div>
              </div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">{userProfile.name}</h2>
              <div className="flex flex-col items-center gap-0.5 mt-1">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{userProfile.email}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{userProfile.phone}</p>
              </div>
              <button 
                onClick={() => setCurrentView(AppView.EDIT_PROFILE)} 
                className="mt-4 px-5 py-2 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-green-600 hover:text-white transition-all active:scale-95"
              >
                {t.edit}
              </button>
            </div>

            <div className="space-y-1.5 pb-24">
              {[
                { label: t.payment, icon: 'fa-credit-card', view: AppView.METODE_PEMBAYARAN, color: 'text-blue-600' },
                { label: t.address, icon: 'fa-location-dot', view: AppView.ALAMAT_TERSIMPAN, color: 'text-orange-600' },
                { label: t.promo, icon: 'fa-ticket', view: AppView.PROMO_SAYA, color: 'text-red-500' },
                { label: t.language, icon: 'fa-globe', view: AppView.LANGUAGE, color: 'text-purple-600', extra: language.toUpperCase() },
                { label: t.help, icon: 'fa-circle-question', view: AppView.PUSAT_BANTUAN, color: 'text-indigo-600' },
                { label: t.logout, icon: 'fa-right-from-bracket', color: 'text-red-500', view: AppView.HOME }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentView(item.view)} 
                  className="w-full bg-white p-3.5 rounded-xl flex justify-between items-center shadow-sm hover:bg-gray-50 active:scale-[0.99] transition-all border border-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 ${item.color || 'text-gray-700'}`}>
                      <i className={`fa-solid ${item.icon} text-sm`}></i>
                    </div>
                    <span className="font-black text-[11px] text-gray-900 uppercase tracking-tight">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.extra && <span className="text-[8px] font-black bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded uppercase">{item.extra}</span>}
                    <i className="fa-solid fa-chevron-right text-gray-200 text-[10px]"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case AppView.EDIT_PROFILE:
        return <EditProfile profile={userProfile} onBack={() => setCurrentView(AppView.PROFILE)} onSave={(updatedProfile) => { setUserProfile(updatedProfile); setCurrentView(AppView.PROFILE); addNotification("Profil Diperbarui", "Informasi pribadi Anda telah berhasil disimpan.", 'info'); }} />;
      case AppView.TOP_UP:
        return <TopUp onBack={() => setCurrentView(AppView.HOME)} onConfirm={handleTopUpConfirm} />;
      case AppView.TOP_UP_PAYMENT_METHOD:
        return <TopUpPaymentMethod onBack={() => setCurrentView(AppView.TOP_UP)} amount={pendingAmount} onSelect={(method) => { setSelectedMethod(method); if (method === 'qris') setCurrentView(AppView.TOP_UP_QRIS); else setCurrentView(AppView.TOP_UP_MANUAL_TRANSFER); }} onSelectVA={(bank) => { setSelectedBank(bank); setSelectedMethod('va'); setCurrentView(AppView.TOP_UP_VA); }} onSelectManual={(bank) => { setSelectedBank(bank); setSelectedMethod('manual'); setCurrentView(AppView.TOP_UP_MANUAL_TRANSFER); }} />;
      case AppView.TOP_UP_MANUAL_TRANSFER:
        return <TopUpManualTransfer amount={pendingAmount} bank={selectedBank} onBack={() => setCurrentView(AppView.TOP_UP_PAYMENT_METHOD)} onConfirm={handleFinalizeTopUp} />;
      case AppView.TOP_UP_VA:
        return <TopUpVirtualAccount amount={pendingAmount} bank={selectedBank} onBack={() => setCurrentView(AppView.TOP_UP_PAYMENT_METHOD)} onConfirm={handleFinalizeTopUp} />;
      case AppView.TOP_UP_QRIS:
        return <TopUpQRIS amount={pendingAmount} onBack={() => setCurrentView(AppView.TOP_UP_PAYMENT_METHOD)} onConfirm={handleFinalizeTopUp} />;
      case AppView.TOP_UP_SUCCESS:
        return <TopUpSuccess amount={pendingAmount} onNext={() => setCurrentView(AppView.TOP_UP_DETAIL)} />;
      case AppView.TOP_UP_DETAIL:
        return <TopUpTransactionDetail amount={pendingAmount} method={selectedMethod} bank={selectedBank} onHome={() => setCurrentView(AppView.HOME)} />;
      case AppView.WITHDRAW:
        return <Withdraw balance={balance} onBack={() => setCurrentView(AppView.HOME)} onConfirm={handleWithdrawConfirm} />;
      case AppView.WITHDRAW_METHOD:
        return <WithdrawMethod amount={pendingAmount} onBack={() => setCurrentView(AppView.WITHDRAW)} linkedBanks={linkedBanks} onSelect={handleFinalizeWithdraw} />;
      case AppView.WITHDRAW_SUCCESS:
        return <WithdrawSuccess amount={pendingAmount} onNext={() => setCurrentView(AppView.WITHDRAW_DETAIL)} />;
      case AppView.WITHDRAW_DETAIL:
        return <WithdrawDetail amount={pendingAmount} bank={selectedBank} onHome={() => setCurrentView(AppView.HOME)} />;
      case AppView.TRANSFER:
        return <Transfer onBack={() => setCurrentView(AppView.HOME)} onConfirm={handleTransferStart} currentBalance={balance} />;
      case AppView.TRANSFER_METHOD:
        return <TransferMethod amount={pendingAmount} onBack={() => setCurrentView(AppView.TRANSFER)} onConfirm={handleFinalizeTransfer} />;
      case AppView.TRANSFER_SUCCESS:
        return <TransferSuccess amount={pendingAmount} onNext={() => setCurrentView(AppView.TRANSFER_DETAIL)} />;
      case AppView.TRANSFER_DETAIL:
        return <TransferDetail amount={pendingAmount} details={transferDetails} onHome={() => setCurrentView(AppView.HOME)} />;
      case AppView.BEST_SELLER_PAGE:
        return <BestSellerPage 
          onBack={() => setCurrentView(AppView.HOME)} 
          balance={balance} 
          onBeli={(item) => {
            if (item.type === 'food') {
              setCheckoutData({
                cart: [{ id: item.id, name: item.name, price: item.price, quantity: 1, description: '', image: item.image }],
                restaurant: { id: 'best-seller', name: 'GoFast Best Seller', rating: item.rating, distance: '1.0 km', image: item.image, category: item.tag }
              });
              setCurrentView(AppView.FOOD_CHECKOUT);
            } else {
              setShoppingCart([{ id: item.id, name: item.name, price: item.price, quantity: 1, shopName: 'GoFast Store', rating: item.rating, image: item.image, category: item.tag, inStock: true }]);
              setCurrentView(AppView.SHOPPING_CHECKOUT);
            }
          }} 
        />;
      case AppView.FOOD_CHECKOUT:
        if (!checkoutData) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
        return <FoodCheckout cart={checkoutData.cart} restaurant={checkoutData.restaurant} balance={balance} savedAddresses={savedAddresses} onBack={() => setCurrentView(AppView.FOOD)} onConfirm={startOrder} />;
      case AppView.PROMO:
        return <Promo onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.KIRIM_PAKET:
        return <SendPackage onBack={() => setCurrentView(AppView.HOME)} balance={balance} savedAddresses={savedAddresses} onOrderConfirm={startOrder} />;
      case AppView.PROMO_SAYA:
        return <ProfilePromo onBack={() => setCurrentView(AppView.PROFILE)} />;
      case AppView.LANGUAGE:
        return <ProfileLanguage currentLanguage={language} onLanguageChange={(lang) => { setLanguage(lang); setCurrentView(AppView.PROFILE); }} onBack={() => setCurrentView(AppView.PROFILE)} />;
      case AppView.PUSAT_BANTUAN:
        return <ProfileHelp onBack={() => setCurrentView(AppView.PROFILE)} />;
      case AppView.ALAMAT_TERSIMPAN:
        return <ProfileAddress onBack={() => setCurrentView(AppView.PROFILE)} addresses={savedAddresses} onAdd={handleAddAddress} onEdit={handleEditAddress} onDelete={handleDeleteAddress} />;
      case AppView.METODE_PEMBAYARAN:
        return <ProfilePayment onBack={() => setCurrentView(AppView.PROFILE)} balance={balance} linkedBanks={linkedBanks} onAddBank={handleAddBank} onRemoveBank={handleRemoveBank} onTopUp={() => setCurrentView(AppView.TOP_UP)} />;
      case AppView.PRODUCT_DETAIL:
        if (!selectedProduct) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
        return <ProductDetail product={selectedProduct} onBack={() => setCurrentView(AppView.SHOPPING)} balance={balance} onBuyNow={(p) => { setShoppingCart([{...p, quantity: 1}]); setCurrentView(AppView.SHOPPING_CHECKOUT); }} onAddToCart={(p) => { addToShoppingCart(p); addNotification("Berhasil!", `${p.name} ditambah ke keranjang.`, 'info'); }} />;
      case AppView.SHOPPING_CART:
        return <ShoppingCart cart={shoppingCart} onBack={() => setCurrentView(AppView.SHOPPING)} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} balance={balance} onCheckout={() => setCurrentView(AppView.SHOPPING_CHECKOUT)} />;
      case AppView.SHOPPING_CHECKOUT:
        if (shoppingCart.length === 0) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
        return <ShoppingCheckout items={shoppingCart} balance={balance} savedAddresses={savedAddresses} onBack={() => setCurrentView(AppView.SHOPPING_CART)} onSelectPayment={handleShoppingSelectPayment} />;
      case AppView.SHOPPING_PAYMENT_VA:
        if (!pendingShoppingOrder) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={null} />;
        return <ShoppingVA amount={pendingShoppingOrder.total} bankName={pendingShoppingOrder.payment.name} onBack={() => setCurrentView(AppView.SHOPPING_CHECKOUT)} onPay={() => {
           const order: ActiveOrder = {
             id: Math.random().toString(36).substr(2, 9),
             type: 'shopping',
             title: pendingShoppingOrder.items.length === 1 ? pendingShoppingOrder.items[0].name : `${pendingShoppingOrder.items[0].name} & ${pendingShoppingOrder.items.length - 1} lainnya`,
             status: 'Pesanan sedang dikemas',
             price: pendingShoppingOrder.total,
             icon: 'fa-bag-shopping',
             items: pendingShoppingOrder.items,
             address: pendingShoppingOrder.address || SHOPPING_ADDRESS
           };
           startOrder(order);
           setCurrentView(AppView.SHOPPING_SUCCESS);
        }} />;
      case AppView.SHOPPING_PAYMENT_MANUAL:
        if (!pendingShoppingOrder) return <Home onViewChange={setCurrentView} balance={balance} activeOrder={null} />;
        return <ShoppingManualTransfer amount={pendingShoppingOrder.total} onBack={() => setCurrentView(AppView.SHOPPING_CHECKOUT)} onConfirm={() => setCurrentView(AppView.SHOPPING_CHECKING)} />;
      case AppView.SHOPPING_CHECKING:
        return <ShoppingChecking onSuccess={() => {
           const order: ActiveOrder = {
             id: Math.random().toString(36).substr(2, 9),
             type: 'shopping',
             title: pendingShoppingOrder?.items.length === 1 ? pendingShoppingOrder.items[0].name : `${pendingShoppingOrder?.items[0].name} & ${pendingShoppingOrder?.items.length - 1} lainnya`,
             status: 'Dalam Perjalanan',
             price: pendingShoppingOrder?.total || 0,
             icon: 'fa-bag-shopping',
             items: pendingShoppingOrder?.items,
             address: SHOPPING_ADDRESS
           };
           startOrder(order);
        }} />;
      case AppView.SHOPPING_SUCCESS:
        return <ShoppingSuccess 
          total={pendingShoppingOrder?.total || 0}
          onTrack={() => {
            setCurrentView(AppView.ORDER_TRACKING);
          }}
          onHome={() => {
            setCurrentView(AppView.HOME);
          }}
        />;
      default:
        return <Home onViewChange={setCurrentView} balance={balance} activeOrder={activeOrders.length > 0 ? activeOrders[0] : null} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-gray-50 overflow-x-hidden shadow-2xl">
      <NotificationOverlay notifications={allNotifications} onDismiss={markNotificationAsRead} onAction={handleNotificationClick} />
      {renderView()}
      {[AppView.HOME, AppView.HISTORY, AppView.PROFILE].includes(currentView) && (
        <Navigation currentView={currentView} onViewChange={setCurrentView} language={language} />
      )}
    </div>
  );
};
