
import React, { useState } from 'react';
import { AppView, ActiveOrder, ShippingService, PromoVoucher } from '../types.ts';
import { SHIPPING_SERVICES, PACKAGE_CATEGORIES, MOCK_PROMOS } from '../constants.ts';

interface SendPackageProps {
  onBack: () => void;
  balance: number;
  savedAddresses: any[];
  onOrderConfirm: (order: ActiveOrder) => void;
}

export const SendPackage: React.FC<SendPackageProps> = ({ onBack, balance, savedAddresses, onOrderConfirm }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [senderName, setSenderName] = useState('Budi Setiawan');
  const [senderPhone, setSenderPhone] = useState('08123456789');
  const [pickup, setPickup] = useState(savedAddresses[0]?.addr || 'Apartemen Menteng Park');
  
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [delivery, setDelivery] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState(PACKAGE_CATEGORIES[0].id);
  const [weight, setWeight] = useState(1);
  const [selectedService, setSelectedService] = useState<ShippingService>(SHIPPING_SERVICES[0]);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [activeAddressTarget, setActiveAddressTarget] = useState<'pickup' | 'delivery' | null>(null);

  // Payment & Promo States
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'cod'>('saldo');
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  // Perhitungan Biaya
  const platformFee = 2000;
  const insuranceFee = 1000;
  const baseDiscount = paymentMethod === 'saldo' ? 2000 : 0;
  const voucherValue = appliedVoucher ? 5000 : 0;
  const totalDiscount = baseDiscount + voucherValue;

  const totalPayment = Math.max(0, selectedService.price + platformFee + insuranceFee - totalDiscount);

  const handleApplyVoucher = () => {
    setPromoError('');
    const code = voucherInput.trim().toUpperCase();
    const foundPromo = MOCK_PROMOS.find(p => p.code === code);
    
    if (foundPromo) {
      setAppliedVoucher(foundPromo);
      setVoucherInput('');
    } else if (code === 'KIRIMHEMAT' || code === 'GOFAST') {
      setAppliedVoucher({
        id: 'v-pkg',
        title: 'Promo Ongkir',
        description: 'Potongan pengiriman paket',
        code: code,
        type: 'shopping',
        discount: 'Rp 5.000',
        expiry: 'Hari ini'
      });
      setVoucherInput('');
    } else {
      setPromoError('Kode promo tidak valid');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!recipientName || !recipientPhone || !delivery) {
        alert('Mohon lengkapi detail penerima dan lokasi.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleConfirm = () => {
    if (paymentMethod === 'saldo' && balance < totalPayment) {
      alert('Saldo GoFast tidak cukup. Silakan isi saldo atau gunakan metode tunai.');
      return;
    }

    onOrderConfirm({
      id: Math.random().toString(36).substr(2, 9),
      type: 'delivery',
      title: `Kirim ke ${recipientName}`,
      status: paymentMethod === 'saldo' ? 'Mencari kurir' : 'Mencari kurir (Bayar Tunai)',
      price: totalPayment,
      icon: 'fa-box',
      address: delivery
    });
  };

  const openAddressModal = (target: 'pickup' | 'delivery') => {
    setActiveAddressTarget(target);
    setShowAddressModal(true);
  };

  const handleAddressSelect = (addr: string) => {
    if (activeAddressTarget === 'pickup') {
      setPickup(addr);
    } else if (activeAddressTarget === 'delivery') {
      setDelivery(addr);
    }
    setShowAddressModal(false);
  };

  const isBalanceInsufficient = paymentMethod === 'saldo' && balance < totalPayment;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Address Selection Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
          <div className="relative bg-white w-full rounded-t-[3rem] p-6 shadow-2xl animate-slide-up max-w-md">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Pilih Alamat</h3>
            <div className="space-y-2 mb-8 max-h-[60vh] overflow-y-auto hide-scrollbar">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => handleAddressSelect(addr.addr)}
                  className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 border-2 transition-all border-gray-50 hover:border-orange-100`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gray-100 text-gray-400`}>
                    <i className={`fa-solid ${addr.icon || 'fa-location-dot'}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-black leading-none mb-1 text-gray-900`}>{addr.type}</p>
                    <p className="text-[10px] text-gray-500 font-medium truncate">{addr.addr}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddressModal(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Tutup</button>
          </div>
        </div>
      )}

      {/* Header Ringkas */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <button onClick={step === 1 ? onBack : () => setStep((step - 1) as any)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">Kirim Paket</h1>
        </div>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${step >= s ? 'bg-orange-500' : 'bg-gray-100'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-40">
        {step === 1 && (
          <div className="p-6 space-y-6 animate-fade-in">
            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Detail Pengirim</h2>
                 <button onClick={() => openAddressModal('pickup')} className="text-[9px] font-black text-orange-600 uppercase">Pilih Alamat</button>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-circle-arrow-up"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-tight">Lokasi Jemput</p>
                    <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full text-xs font-bold text-gray-900 border-none p-0 focus:ring-0" />
                  </div>
                </div>
                <div className="h-px bg-gray-50"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Nama</p>
                    <input type="text" value={senderName} className="w-full text-xs font-bold p-0 border-none focus:ring-0" readOnly />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">No. HP</p>
                    <input type="text" value={senderPhone} className="w-full text-xs font-bold p-0 border-none focus:ring-0" readOnly />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Detail Penerima</h2>
                <button onClick={() => openAddressModal('delivery')} className="text-[9px] font-black text-orange-600 uppercase">Pilih Alamat</button>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-tight">Lokasi Tujuan</p>
                    <input type="text" placeholder="Masukkan alamat..." value={delivery} onChange={(e) => setDelivery(e.target.value)} className="w-full text-xs font-black text-gray-900 border-none p-0 focus:ring-0 placeholder:text-gray-200" />
                  </div>
                </div>
                <div className="h-px bg-gray-50"></div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Nama Penerima</p>
                    <input type="text" placeholder="Andi Wijaya" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full text-xs font-bold p-0 border-none focus:ring-0 placeholder:text-gray-100" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Nomor HP</p>
                    <input type="tel" placeholder="08xxxxxxxxxx" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} className="w-full text-xs font-bold p-0 border-none focus:ring-0 placeholder:text-gray-100" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 space-y-8 animate-fade-in">
            <section>
              <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Kategori Paket</h2>
              <div className="grid grid-cols-3 gap-3">
                {PACKAGE_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${selectedCategory === cat.id ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-white bg-white text-gray-400 shadow-sm'}`}>
                    <i className={`fa-solid ${cat.icon} text-lg`}></i>
                    <span className="text-[9px] font-black uppercase">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Estimasi Berat</h2>
                <span className="text-lg font-black text-gray-900">{weight} kg</span>
              </div>
              <input type="range" min="1" max="20" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              <div className="flex justify-between text-[8px] text-gray-300 font-black mt-2 uppercase tracking-widest">
                <span>1 KG</span>
                <span>MAKS 20 KG</span>
              </div>
            </section>
          </div>
        )}

        {step === 3 && (
          <div className="p-6 space-y-6 animate-fade-in">
            {/* Form Voucher */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Voucher Pengiriman</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Kode promo..." value={voucherInput} onChange={(e) => setVoucherInput(e.target.value)} className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-[10px] font-bold focus:ring-1 focus:ring-orange-500 uppercase" />
                <button onClick={handleApplyVoucher} className="bg-gray-900 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">Pakai</button>
              </div>
              {appliedVoucher && (
                <div className="mt-3 bg-green-50 border border-green-100 p-2.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-ticket text-green-600 text-[10px]"></i>
                    <p className="text-[9px] font-black text-green-900 uppercase">Voucher "{appliedVoucher.code}" Aktif</p>
                  </div>
                  <button onClick={() => setAppliedVoucher(null)} className="text-[8px] font-black text-red-400 uppercase">Hapus</button>
                </div>
              )}
            </div>

            <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilihan Layanan</h2>
            <div className="space-y-3">
              {SHIPPING_SERVICES.map((service) => (
                <button key={service.id} onClick={() => setSelectedService(service)} className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${selectedService.id === service.id ? 'border-orange-500 bg-orange-50' : 'border-white bg-white shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${selectedService.id === service.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <i className={`fa-solid ${service.icon}`}></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs font-black text-gray-900 leading-none mb-1">{service.name}</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{service.eta}</p>
                    </div>
                  </div>
                  <p className="text-xs font-black text-gray-900">Rp {service.price.toLocaleString('id-ID')}</p>
                </button>
              ))}
            </div>

            {/* Metode Pembayaran */}
            <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pembayaran</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPaymentMethod('saldo')} className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'saldo' ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${paymentMethod === 'saldo' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <i className="fa-solid fa-wallet text-xs"></i>
                </div>
                <div className="text-left overflow-hidden">
                  <p className={`text-[9px] font-black uppercase leading-none mb-1 ${paymentMethod === 'saldo' ? 'text-green-900' : 'text-gray-400'}`}>Saldo</p>
                  <p className="text-[8px] font-bold text-gray-500 truncate">Rp {balance.toLocaleString('id-ID')}</p>
                </div>
              </button>
              <button onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-white'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <i className="fa-solid fa-hand-holding-dollar text-xs"></i>
                </div>
                <div className="text-left">
                  <p className={`text-[9px] font-black uppercase leading-none mb-1 ${paymentMethod === 'cod' ? 'text-orange-900' : 'text-gray-400'}`}>Tunai</p>
                  <p className="text-[8px] font-bold text-gray-500">Bayar COD</p>
                </div>
              </button>
            </div>

            {/* Billing Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rincian</span>
                  <button onClick={() => setShowPriceDetails(!showPriceDetails)} className="text-[9px] font-black text-blue-600 uppercase">{showPriceDetails ? 'Tutup' : 'Lihat'}</button>
               </div>
               {showPriceDetails && (
                 <div className="space-y-1.5 mb-3 pt-1 border-t border-gray-200/50">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500"><span>Ongkir Dasar</span><span>Rp {selectedService.price.toLocaleString('id-ID')}</span></div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500"><span>Layanan & Asuransi</span><span>Rp {(platformFee + insuranceFee).toLocaleString('id-ID')}</span></div>
                    {totalDiscount > 0 && <div className="flex justify-between text-[10px] font-black text-green-600"><span>Promo</span><span>-Rp {totalDiscount.toLocaleString('id-ID')}</span></div>}
                 </div>
               )}
               <div className="flex justify-between items-center">
                  <p className="text-xs font-black text-gray-900 uppercase">Total Bayar</p>
                  <p className="text-lg font-black text-green-600">Rp {totalPayment.toLocaleString('id-ID')}</p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Tombol Lebih Kecil */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-40 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Tagihan</p>
            <p className="text-lg font-black text-gray-900 tracking-tighter">Rp {totalPayment.toLocaleString('id-ID')}</p>
          </div>
          <button 
            onClick={step < 3 ? handleNext : handleConfirm}
            disabled={step === 3 && isBalanceInsufficient}
            className={`flex-1 py-4 rounded-xl font-black text-white text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              step === 3 && isBalanceInsufficient ? 'bg-gray-200 shadow-none' : 'bg-orange-500 shadow-orange-100'
            }`}
          >
            {step < 3 ? 'Lanjut' : (isBalanceInsufficient ? 'Saldo Kurang' : 'Pesan Pengiriman')}
            <i className={`fa-solid ${step < 3 ? 'fa-arrow-right' : 'fa-bolt'} text-[8px]`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};
