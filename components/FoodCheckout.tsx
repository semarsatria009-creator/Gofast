
import React, { useState, useMemo, useEffect } from 'react';
import { CartItem, Restaurant, ActiveOrder, PromoVoucher } from '../types.ts';
import { MOCK_PROMOS, TOPPING_OPTIONS } from '../constants.ts';

interface FoodCheckoutProps {
  cart: CartItem[];
  restaurant: Restaurant;
  balance: number;
  savedAddresses: any[];
  onBack: () => void;
  onConfirm: (order: ActiveOrder) => void;
}

export const FoodCheckout: React.FC<FoodCheckoutProps> = ({ cart: initialCart, restaurant, balance, savedAddresses, onBack, onConfirm }) => {
  const [localCart, setLocalCart] = useState<CartItem[]>(initialCart);
  const [orderNote, setOrderNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'cod'>('saldo');
  const [showPriceDetails, setShowPriceDetails] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.addr || 'Apartemen Menteng Park, Jakarta');
  
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (localCart.length === 0) {
      onBack();
    }
  }, [localCart, onBack]);

  const handleUpdateQty = (id: string, delta: number) => {
    setLocalCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setLocalCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => 
    localCart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
  [localCart]);

  const deliveryFee = 12000;
  const platformFee = 2000;
  
  const baseDiscount = paymentMethod === 'saldo' ? 3000 : 0; 
  const voucherValue = appliedVoucher ? 10000 : 0; 
  const totalDiscount = baseDiscount + voucherValue;

  const total = Math.max(0, subtotal + deliveryFee + platformFee - totalDiscount);

  const handleApplyVoucher = () => {
    setPromoError('');
    const code = voucherInput.trim().toUpperCase();
    const foundPromo = MOCK_PROMOS.find(p => p.code === code);
    if (foundPromo) {
      setAppliedVoucher(foundPromo);
      setVoucherInput('');
    } else if (code === 'MAKANHEMAT' || code === 'GOFAST') {
      setAppliedVoucher({
        id: 'v-food',
        title: 'Promo Kenyang',
        description: 'Potongan harga makanan',
        code: code,
        type: 'food',
        discount: 'Rp 10.000',
        expiry: 'Hari ini'
      });
      setVoucherInput('');
    } else {
      setPromoError('Kode tidak valid');
    }
  };

  const handleConfirmOrder = () => {
    if (localCart.length === 0) return;
    if (paymentMethod === 'saldo' && balance < total) {
      alert('Saldo tidak cukup.');
      return;
    }

    const orderTitle = localCart.length === 1 
      ? localCart[0].name 
      : `${localCart[0].name} & ${localCart.length - 1} lainnya`;

    onConfirm({
      id: Math.random().toString(36).substr(2, 9),
      type: 'food',
      title: orderTitle,
      status: paymentMethod === 'saldo' ? 'Sedang diproses' : 'COD (Bayar Tunai)',
      price: total,
      icon: 'fa-utensils',
      orderNote: orderNote,
      address: selectedAddress
    });
  };

  const isBalanceInsufficient = paymentMethod === 'saldo' && balance < total;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-32 animate-fade-in">
      {/* Address Modal (Keep original for usability but smaller items) */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
          <div className="relative bg-white w-full rounded-t-[2.5rem] p-5 shadow-2xl animate-slide-up max-w-md">
            <div className="w-10 h-1 bg-gray-100 rounded-full mx-auto mb-4"></div>
            <h3 className="text-sm font-black text-gray-900 mb-4 tracking-tight">Pilih Alamat</h3>
            <div className="space-y-1.5 mb-6 max-h-[50vh] overflow-y-auto hide-scrollbar">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => { setSelectedAddress(addr.addr); setShowAddressModal(false); }}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 border-2 transition-all ${
                    selectedAddress === addr.addr ? 'border-red-500 bg-red-50' : 'border-gray-50'
                  }`}
                >
                  <i className={`fa-solid ${addr.icon || 'fa-location-dot'} text-xs ${selectedAddress === addr.addr ? 'text-red-500' : 'text-gray-400'}`}></i>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-black leading-none mb-0.5 ${selectedAddress === addr.addr ? 'text-red-900' : 'text-gray-900'}`}>{addr.type}</p>
                    <p className="text-[8px] text-gray-500 font-medium truncate">{addr.addr}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddressModal(false)} className="w-full py-3 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Tutup</button>
          </div>
        </div>
      )}

      {/* Header - More Compact */}
      <div className="bg-white px-5 pt-12 pb-3 shadow-sm sticky top-0 z-30 flex items-center gap-3 border-b border-gray-50">
        <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>
        <h1 className="text-sm font-black text-gray-900 tracking-tight uppercase">Checkout Pesanan</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Antar Ke - Small */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
          <div className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-location-dot text-[10px]"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Kirim Ke</p>
            <p className="text-[10px] font-black text-gray-900 truncate">{selectedAddress}</p>
          </div>
          <button onClick={() => setShowAddressModal(true)} className="text-blue-600 font-black text-[8px] uppercase px-2 py-1 bg-blue-50 rounded-md">Ubah</button>
        </div>

        {/* Voucher - Small */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Kode Promo?" 
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-[9px] font-black focus:ring-1 focus:ring-green-600 uppercase"
              />
              {appliedVoucher && (
                <i className="fa-solid fa-check text-[7px] text-green-600 absolute right-2 top-1/2 -translate-y-1/2"></i>
              )}
            </div>
            <button 
              onClick={handleApplyVoucher}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest"
            >
              Pakai
            </button>
          </div>
          {appliedVoucher && (
            <div className="mt-2 flex items-center justify-between bg-green-50 px-2 py-1.5 rounded-lg border border-green-100">
              <div className="flex items-center gap-1.5">
                <i className="fa-solid fa-ticket text-green-600 text-[8px]"></i>
                <p className="text-[8px] font-black text-green-900 uppercase">Promo "{appliedVoucher.code}" Aktif</p>
              </div>
              <button onClick={() => setAppliedVoucher(null)} className="text-[8px] font-black text-red-400">Hapus</button>
            </div>
          )}
        </div>

        {/* Items List - Compact Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-50 flex items-center gap-2">
             <i className="fa-solid fa-utensils text-[9px] text-gray-400"></i>
             <h2 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{restaurant.name}</h2>
          </div>
          
          <div className="divide-y divide-gray-50">
            {localCart.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                       <h3 className="text-[10px] text-gray-900 font-black leading-tight truncate">{item.name}</h3>
                       <button onClick={() => handleRemoveItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                         <i className="fa-solid fa-trash-can text-[8px]"></i>
                       </button>
                    </div>
                    
                    {/* Compact Toppings */}
                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        {item.selectedToppings.map(tid => {
                          const tInfo = TOPPING_OPTIONS.find(t => t.id === tid);
                          return tInfo ? (
                            <span key={tid} className="text-[6px] bg-gray-50 text-gray-400 px-1 py-0.5 rounded uppercase border border-gray-100">
                              +{tInfo.name.split(' ')[0]}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    {/* Compact Note */}
                    {item.note && (
                      <p className="text-[7px] text-orange-500 font-medium italic mb-1 truncate">
                        "{item.note}"
                      </p>
                    )}

                    <span className="text-[10px] font-black text-green-600 block">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-gray-50 p-1 rounded-lg border border-gray-100 shrink-0">
                    <button onClick={() => handleUpdateQty(item.id, -1)} className="w-5 h-5 bg-white text-gray-400 rounded-md flex items-center justify-center shadow-sm">
                      <i className="fa-solid fa-minus text-[7px]"></i>
                    </button>
                    <span className="text-[10px] font-black text-gray-900 min-w-[12px] text-center">{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item.id, 1)} className="w-5 h-5 bg-green-600 text-white rounded-md flex items-center justify-center shadow-md">
                      <i className="fa-solid fa-plus text-[7px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Payment Method */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'saldo', label: 'Saldo Wallet', sub: `Rp ${balance.toLocaleString('id-ID')}`, icon: 'fa-wallet', color: 'green' },
            { id: 'cod', label: 'Tunai / COD', sub: 'Bayar di kurir', icon: 'fa-hand-holding-dollar', color: 'orange' }
          ].map((method) => (
            <button 
              key={method.id}
              onClick={() => setPaymentMethod(method.id as any)}
              className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                paymentMethod === method.id 
                  ? `border-${method.color}-600 bg-${method.color}-50` 
                  : 'border-gray-50 bg-white'
              }`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] ${
                paymentMethod === method.id ? `bg-${method.color}-600 text-white` : 'bg-gray-100 text-gray-400'
              }`}>
                <i className={`fa-solid ${method.icon}`}></i>
              </div>
              <div className="text-left overflow-hidden">
                <p className={`text-[8px] font-black uppercase leading-none mb-0.5 ${paymentMethod === method.id ? `text-${method.color}-900` : 'text-gray-400'}`}>{method.label}</p>
                <p className="text-[7px] font-bold text-gray-400 truncate">{method.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Small Billing Detail */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Rincian Pembayaran</span>
              <button onClick={() => setShowPriceDetails(!showPriceDetails)} className="text-[8px] font-black text-blue-600 uppercase px-2 py-0.5 bg-blue-50 rounded">
                {showPriceDetails ? 'Tutup' : 'Lihat'}
              </button>
           </div>
           
           {showPriceDetails && (
             <div className="space-y-1.5 mb-2 py-2 border-y border-gray-50 animate-fade-in">
                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-black">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                  <span>Ongkir</span>
                  <span className="text-gray-900 font-black">Rp {deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                  <span>Layanan</span>
                  <span className="text-gray-900 font-black">Rp {platformFee.toLocaleString('id-ID')}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[9px] font-black text-green-600 uppercase">
                    <span>Diskon</span>
                    <span>-Rp {totalDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
             </div>
           )}

           <div className="flex justify-between items-center">
              <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Total Akhir</p>
              <p className="text-base font-black text-green-600">Rp {total.toLocaleString('id-ID')}</p>
           </div>
        </div>
      </div>

      {/* Footer Button - Clean */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-gray-100 z-40 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-[7px] text-gray-400 font-black uppercase tracking-[0.2em] leading-none mb-1">Total Bayar</p>
            <p className="text-base font-black text-gray-900 tracking-tight leading-none">Rp {total.toLocaleString('id-ID')}</p>
          </div>
          <button 
            onClick={handleConfirmOrder}
            disabled={isBalanceInsufficient || localCart.length === 0}
            className={`flex-1 py-3.5 rounded-xl font-black text-white text-[9px] uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isBalanceInsufficient ? 'bg-gray-200' : 'bg-green-600 shadow-green-100'
            }`}
          >
            {isBalanceInsufficient ? 'Saldo Kurang' : 'Pesan Sekarang'}
            {!isBalanceInsufficient && <i className="fa-solid fa-chevron-right text-[7px]"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};
