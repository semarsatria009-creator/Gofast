
import React, { useState } from 'react';
import { ShoppingCartItem, ActiveOrder, ShippingService } from '../types.ts';
import { SHIPPING_SERVICES } from '../constants.ts';

interface ShoppingCheckoutProps {
  items: ShoppingCartItem[];
  balance: number;
  savedAddresses: any[];
  onBack: () => void;
  onSelectPayment: (method: string, data: any) => void;
}

export const PAYMENT_METHODS = [
  { id: 'gopay', name: 'GoPay Wallet', icon: 'fa-wallet', color: 'text-green-600', bg: 'bg-green-50', type: 'wallet' },
  { id: 'va_bca', name: 'BCA Virtual Account', icon: 'fa-building-columns', color: 'text-blue-600', bg: 'bg-blue-50', type: 'va' },
  { id: 'va_mandiri', name: 'Mandiri Virtual Account', icon: 'fa-building-columns', color: 'text-yellow-600', bg: 'bg-yellow-50', type: 'va' },
  { id: 'manual', name: 'Transfer Bank Manual', icon: 'fa-money-bill-transfer', color: 'text-purple-600', bg: 'bg-purple-50', type: 'manual' },
];

export const ShoppingCheckout: React.FC<ShoppingCheckoutProps> = ({ items, balance, savedAddresses, onBack, onSelectPayment }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SHIPPING_SERVICES[0].id);
  const [paymentMethodId, setPaymentMethodId] = useState('gopay');
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.addr || 'Apartemen Menteng Park, Jakarta');
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  const selectedService = SHIPPING_SERVICES.find(s => s.id === selectedServiceId) || SHIPPING_SERVICES[0];
  const selectedPayment = PAYMENT_METHODS.find(m => m.id === paymentMethodId) || PAYMENT_METHODS[0];

  const itemsTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const platformFee = 2000;
  const insuranceFee = 1000;
  const total = itemsTotal + selectedService.price + platformFee + insuranceFee;

  const handleProcessPayment = () => {
    if (paymentMethodId === 'gopay' && balance < total) {
      alert("Saldo GoPay tidak cukup. Silakan top up.");
      return;
    }

    const orderData = {
      items,
      total,
      shipping: selectedService,
      payment: selectedPayment,
      address: selectedAddress
    };

    onSelectPayment(selectedPayment.type, orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in pb-36">
      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
          <div className="relative bg-white w-full rounded-t-[3rem] p-6 shadow-2xl animate-slide-up max-w-md">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Pilih Alamat Kirim</h3>
            <div className="space-y-2 mb-8 max-h-[60vh] overflow-y-auto hide-scrollbar">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => { setSelectedAddress(addr.addr); setShowAddressModal(false); }}
                  className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 border-2 transition-all ${
                    selectedAddress === addr.addr ? 'border-blue-500 bg-blue-50' : 'border-gray-50 hover:border-blue-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedAddress === addr.addr ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <i className={`fa-solid ${addr.icon || 'fa-location-dot'}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-black leading-none mb-1 ${selectedAddress === addr.addr ? 'text-blue-900' : 'text-gray-900'}`}>{addr.type}</p>
                    <p className="text-[10px] text-gray-500 font-medium truncate">{addr.addr}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddressModal(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Tutup</button>
          </div>
        </div>
      )}

      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform shrink-0">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">Ringkasan Checkout</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 space-y-4">
        {/* Delivery Address */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alamat Pengiriman</h2>
            <button onClick={() => setShowAddressModal(true)} className="text-blue-600 font-black text-[9px] uppercase">Ubah</button>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-900 font-bold mb-0.5">Budi Setiawan <span className="text-gray-300 mx-1">•</span> 0812-3456-7890</p>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-1">{selectedAddress}</p>
            </div>
          </div>
        </section>

        {/* Product List Summary */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Daftar Barang</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-gray-50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[11px] font-black text-gray-900 truncate">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <p className="text-[11px] font-black text-gray-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Selection */}
        <section className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pilih Ekspedisi</label>
          <div className="relative">
            <select 
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm text-xs font-black text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            >
              {SHIPPING_SERVICES.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - Rp {service.price.toLocaleString('id-ID')} ({service.eta})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </section>

        {/* Payment Selection */}
        <section className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Metode Pembayaran</label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(method => (
              <button 
                key={method.id}
                onClick={() => setPaymentMethodId(method.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  paymentMethodId === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${method.color} ${method.bg}`}>
                    <i className={`fa-solid ${method.icon} text-xs`}></i>
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-gray-900">{method.name}</p>
                    {method.id === 'gopay' && <p className="text-[9px] text-gray-400 font-bold uppercase">Saldo: Rp {balance.toLocaleString('id-ID')}</p>}
                  </div>
                </div>
                {paymentMethodId === method.id && <i className="fa-solid fa-circle-check text-blue-600 text-sm"></i>}
              </button>
            ))}
          </div>
        </section>

        {/* Billing Summary */}
        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold">
            <span>Subtotal Barang</span>
            <span className="text-gray-900">Rp {itemsTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold">
            <span>Ongkos Kirim</span>
            <span className="text-gray-900">Rp {selectedService.price.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold">
            <span>Layanan</span>
            <span className="text-gray-900">Rp {(platformFee + insuranceFee).toLocaleString('id-ID')}</span>
          </div>
          <div className="h-px bg-gray-50 my-1"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-900">Total Tagihan</span>
            <span className="text-lg font-black text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl p-5 pb-8 border-t border-gray-100 z-50 rounded-t-[2.5rem] shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Total Bayar</p>
            <p className="text-base font-black text-blue-600">Rp {total.toLocaleString('id-ID')}</p>
          </div>
          
          <button 
            onClick={handleProcessPayment}
            className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 bg-blue-600 shadow-blue-100 hover:bg-blue-700"
          >
            Lanjut Bayar <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
