
import React, { useState, useEffect } from 'react';
import { RIDE_OPTIONS, MOCK_PROMOS } from '../constants.ts';
import { AppView, ActiveOrder, PromoVoucher } from '../types.ts';

interface RideBookingProps {
  onBack: () => void;
  balance: number;
  onOrderConfirm: (order: ActiveOrder) => void;
  savedAddresses: any[];
}

export const RideBooking: React.FC<RideBookingProps> = ({ onBack, balance, onOrderConfirm, savedAddresses }) => {
  const [step, setStep] = useState<'destination' | 'confirm' | 'finding'>('destination');
  const [selectedRide, setSelectedRide] = useState(RIDE_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'cod'>('saldo');
  
  const [pickup, setPickup] = useState('Lokasi saya saat ini');
  const [destination, setDestination] = useState('');
  const [isMapPicking, setIsMapPicking] = useState(false);
  const [pickingTarget, setPickingTarget] = useState<'pickup' | 'destination'>('destination');
  
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  const [showPriceDetails, setShowPriceDetails] = useState(true); // Default tampilkan rincian
  const [isDetecting, setIsDetecting] = useState(false);
  
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<PromoVoucher | null>(null);
  const [promoError, setPromoError] = useState('');

  const platformFee = 2000;
  const insuranceFee = 1000;
  const baseDiscount = paymentMethod === 'saldo' ? 2000 : 0;
  const voucherValue = appliedVoucher ? 5000 : 0;
  const totalDiscount = baseDiscount + voucherValue;
  const totalPayment = Math.max(0, selectedRide.price + platformFee + insuranceFee - totalDiscount);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setPickup("Mencari lokasi...");
    setTimeout(() => {
      setPickup("Jl. Kebon Sirih No. 12, Menteng");
      setIsDetecting(false);
    }, 1200);
  };

  const handleMapPickMode = (target: 'pickup' | 'destination') => {
    setPickingTarget(target);
    setIsMapPicking(true);
    setIsSheetExpanded(false);
  };

  const confirmMapPick = () => {
    const mockAddress = pickingTarget === 'pickup' ? "Titik Jemput Pilihan" : "Titik Tujuan Pilihan";
    if (pickingTarget === 'pickup') {
      setPickup(mockAddress);
    } else {
      setDestination(mockAddress);
    }
    setIsMapPicking(false);
    setIsSheetExpanded(true);
  };

  const handleApplyVoucher = () => {
    setPromoError('');
    const code = voucherInput.trim().toUpperCase();
    const foundPromo = MOCK_PROMOS.find(p => p.code === code);
    
    if (foundPromo) {
      setAppliedVoucher(foundPromo);
      setVoucherInput('');
    } else if (code === 'GOFAST' || code === 'HEMAT') {
      setAppliedVoucher({
        id: 'v-custom',
        title: 'Promo Spesial',
        description: 'Potongan harga perjalanan',
        code: code,
        type: 'ride',
        discount: 'Rp 5.000',
        expiry: 'Hari ini'
      });
      setVoucherInput('');
    } else {
      setPromoError('Kode promo tidak ditemukan');
    }
  };

  const handleBook = () => {
    if (paymentMethod === 'saldo' && balance < totalPayment) {
      alert('Saldo GoFast tidak mencukupi.');
      return;
    }

    setStep('finding');
    setTimeout(() => {
      onOrderConfirm({
        id: Math.random().toString(36).substr(2, 9),
        type: 'ojek',
        title: `${selectedRide.name} ke ${destination}`,
        status: paymentMethod === 'cod' ? 'Menuju lokasi (Bayar Tunai)' : 'Menuju lokasi penjemputan',
        price: totalPayment,
        icon: selectedRide.icon,
        address: destination
      });
    }, 2000);
  };

  const isBalanceInsufficient = paymentMethod === 'saldo' && balance < totalPayment;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden relative">
      {/* MAP BACKGROUND - Always visible at top */}
      <div 
        className="absolute inset-0 bg-gray-100 cursor-crosshair"
        onClick={() => !isSheetExpanded && setIsSheetExpanded(true)}
      >
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/106.8456,-6.2088,14,0/600x600?access_token=none')] bg-cover opacity-90 transition-opacity"></div>
        
        {isMapPicking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative -mt-32 animate-bounce">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white border-2 border-white shadow-2xl ${pickingTarget === 'pickup' ? 'bg-blue-600' : 'bg-red-600'}`}>
                <i className={`fa-solid ${pickingTarget === 'pickup' ? 'fa-street-view' : 'fa-location-dot'} text-base`}></i>
              </div>
            </div>
          </div>
        )}

        {!isMapPicking && (
          <div className="absolute top-10 left-6 z-30">
            <button onClick={onBack} className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-gray-700 active:scale-90 transition-transform border border-white">
              <i className="fa-solid fa-arrow-left text-xs"></i>
            </button>
          </div>
        )}
      </div>

      {isMapPicking && (
        <div className="absolute bottom-10 left-6 right-6 z-40 animate-slide-up">
           <button 
             onClick={confirmMapPick}
             className={`w-full py-4 rounded-2xl font-black text-white text-[10px] uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all ${pickingTarget === 'pickup' ? 'bg-blue-600' : 'bg-red-600'}`}
           >
             Konfirmasi Titik <i className="fa-solid fa-check"></i>
           </button>
        </div>
      )}

      {/* COMPACT SLIDEABLE SHEET */}
      <div 
        className={`fixed left-0 right-0 bottom-0 bg-white rounded-t-[3rem] shadow-[0_-15px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out z-20 flex flex-col ${
          isSheetExpanded ? 'h-[75vh]' : 'h-[12vh] cursor-pointer hover:bg-gray-50'
        }`}
        onClick={() => !isSheetExpanded && !isMapPicking && setIsSheetExpanded(true)}
      >
        <div 
          className="w-full pt-4 pb-2 flex flex-col items-center gap-1 shrink-0"
          onClick={(e) => { e.stopPropagation(); setIsSheetExpanded(!isSheetExpanded); }}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
          {!isSheetExpanded && (
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Ketuk untuk rincian rute</p>
          )}
        </div>

        <div className={`flex-1 overflow-y-auto px-5 pb-10 hide-scrollbar transition-opacity duration-300 ${isSheetExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {step === 'destination' && (
            <div className="animate-fade-in pt-1">
              <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none">Pesan Ojek</h2>
                <button onClick={() => setIsSheetExpanded(false)} className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">Cek Peta</button>
              </div>

              <div className="bg-gray-50 rounded-[1.5rem] p-4 border border-gray-100 mb-6 relative">
                <div className="absolute left-[30px] top-[40px] bottom-[40px] w-0.5 border-l-2 border-dashed border-gray-200"></div>
                <div className="space-y-6">
                  {/* PICKUP */}
                  <div className="flex items-center gap-3 relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-sm z-10 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Penjemputan</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Titik jemput..." 
                          value={pickup} 
                          onChange={(e) => setPickup(e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs font-black text-gray-900 focus:ring-0 placeholder:text-gray-300" 
                        />
                        <div className="flex gap-1.5 shrink-0">
                          <button onClick={handleDetectLocation} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm border border-gray-100 active:scale-90 transition-transform">
                            {isDetecting ? <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : <i className="fa-solid fa-location-crosshairs text-[10px]"></i>}
                          </button>
                          <button onClick={() => handleMapPickMode('pickup')} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-blue-400 shadow-sm border border-gray-100 active:scale-90 transition-transform">
                            <i className="fa-solid fa-map-location-dot text-[10px]"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* DESTINATION */}
                  <div className="flex items-center gap-3 relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-sm z-10 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[7px] font-black text-red-500/50 uppercase tracking-widest mb-0.5">Tujuan Akhir</p>
                      <div className="flex items-center gap-2">
                        <input 
                          autoFocus 
                          type="text" 
                          placeholder="Mau ke mana?" 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)} 
                          className="w-full bg-transparent border-none p-0 text-xs font-black text-gray-900 focus:ring-0 placeholder:text-gray-300" 
                        />
                        <button onClick={() => handleMapPickMode('destination')} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm border border-gray-100 active:scale-90 transition-transform">
                          <i className="fa-solid fa-map-pin text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAVORITES */}
              <div className="mb-6">
                 <div className="space-y-1">
                   {savedAddresses.slice(0, 2).map((place, idx) => (
                     <button key={idx} onClick={() => setDestination(place.addr)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all group">
                       <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                         <i className={`fa-solid ${place.icon || 'fa-location-dot'} text-xs`}></i>
                       </div>
                       <div className="text-left flex-1 min-w-0">
                         <p className="text-[10px] font-black text-gray-800">{place.type}</p>
                         <p className="text-[9px] text-gray-400 font-medium truncate">{place.addr}</p>
                       </div>
                     </button>
                   ))}
                 </div>
              </div>

              <button 
                onClick={() => pickup && destination && setStep('confirm')} 
                disabled={!destination || !pickup || isDetecting} 
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${destination && pickup ? 'bg-green-600 text-white shadow-xl shadow-green-100' : 'bg-gray-100 text-gray-300'}`}
              >
                Tampilkan Estimasi <i className="fa-solid fa-arrow-right text-[8px]"></i>
              </button>
            </div>
          )}

          {step === 'confirm' && (
            <div className="animate-fade-in pt-1">
              <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none">Konfirmasi</h2>
                <button onClick={() => setStep('destination')} className="text-blue-600 text-[8px] font-black uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg">Ganti Rute</button>
              </div>

              {/* MINI RIDE OPTIONS */}
              <div className="flex gap-3 mb-5 overflow-x-auto hide-scrollbar pb-1">
                {RIDE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedRide(option)}
                    className={`flex-1 min-w-[135px] flex items-center gap-3 p-3 rounded-[1.5rem] border-2 transition-all ${
                      selectedRide.id === option.id ? 'border-green-600 bg-green-50 shadow-sm' : 'border-gray-50 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedRide.id === option.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <i className={`fa-solid ${option.icon} text-sm`}></i>
                    </div>
                    <div className="text-left">
                      <p className={`font-black text-[9px] leading-none mb-1 ${selectedRide.id === option.id ? 'text-green-900' : 'text-gray-500'}`}>{option.name}</p>
                      <p className="text-[9px] font-black text-gray-900">Rp {option.price.toLocaleString('id-ID')}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* VOUCHER FIELD */}
              <div className="mb-5 flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Masukkan kode promo..." 
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[10px] font-bold focus:ring-1 focus:ring-green-500 uppercase"
                  />
                  {appliedVoucher && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded-md">
                       <i className="fa-solid fa-check text-[7px] text-green-600"></i>
                       <span className="text-[7px] font-black text-green-600 uppercase">Aktif</span>
                    </div>
                  )}
                </div>
                <button onClick={handleApplyVoucher} className="bg-gray-900 text-white px-5 rounded-xl text-[8px] font-black uppercase tracking-widest active:scale-95 shadow-md">Pakai</button>
              </div>

              {/* CLEAR & BRANDED PAYMENT SELECTION */}
              <div className="mb-5">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Metode Pembayaran</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('saldo')} 
                    className={`relative overflow-hidden p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'saldo' ? 'border-green-600 bg-green-50 shadow-md ring-1 ring-green-100' : 'border-gray-50 bg-white opacity-60'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === 'saldo' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <i className="fa-solid fa-wallet text-sm"></i>
                    </div>
                    <div className="text-left min-w-0">
                      <p className={`text-[9px] font-black uppercase leading-none mb-1 ${paymentMethod === 'saldo' ? 'text-green-900' : 'text-gray-500'}`}>Saldo GoFast</p>
                      <p className={`text-[8px] font-bold truncate ${paymentMethod === 'saldo' ? 'text-green-700' : 'text-gray-400'}`}>Rp {balance.toLocaleString('id-ID')}</p>
                    </div>
                    {paymentMethod === 'saldo' && <div className="absolute top-1 right-1 w-2 h-2 bg-green-600 rounded-full border border-white"></div>}
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('cod')} 
                    className={`relative overflow-hidden p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-100' : 'border-gray-50 bg-white opacity-60'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === 'cod' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <i className="fa-solid fa-hand-holding-dollar text-sm"></i>
                    </div>
                    <div className="text-left">
                      <p className={`text-[9px] font-black uppercase leading-none mb-1 ${paymentMethod === 'cod' ? 'text-orange-900' : 'text-gray-500'}`}>Tunai / COD</p>
                      <p className={`text-[8px] font-bold ${paymentMethod === 'cod' ? 'text-orange-700' : 'text-gray-400'}`}>Bayar di Tujuan</p>
                    </div>
                    {paymentMethod === 'cod' && <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-white"></div>}
                  </button>
                </div>
              </div>

              {/* DETIL BIAYA */}
              <div className="bg-gray-50 rounded-[1.5rem] p-4 mb-6 border border-gray-100">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Rincian Tagihan</span>
                    <button onClick={() => setShowPriceDetails(!showPriceDetails)} className="text-[8px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                      {showPriceDetails ? 'Sembunyikan' : 'Lihat Detail'}
                    </button>
                 </div>
                 
                 {showPriceDetails && (
                   <div className="space-y-2 mb-3 py-3 border-y border-gray-200/40 animate-fade-in">
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Ongkos Perjalanan</span>
                         <span className="text-[10px] font-black text-gray-700">Rp {selectedRide.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Biaya Layanan & Asuransi</span>
                         <span className="text-[10px] font-black text-gray-700">Rp {(platformFee + insuranceFee).toLocaleString('id-ID')}</span>
                      </div>
                      {totalDiscount > 0 && (
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-green-600 uppercase tracking-tight">Promo Terpasang</span>
                            <span className="text-[10px] font-black text-green-600">-Rp {totalDiscount.toLocaleString('id-ID')}</span>
                         </div>
                      )}
                   </div>
                 )}

                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-gray-900 uppercase">Total Akhir</p>
                    <p className="text-2xl font-black text-green-600 tracking-tighter">Rp {totalPayment.toLocaleString('id-ID')}</p>
                 </div>
              </div>

              <button
                onClick={handleBook}
                disabled={isBalanceInsufficient}
                className={`w-full py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 text-white flex items-center justify-center gap-3 ${
                  isBalanceInsufficient ? 'bg-gray-200 shadow-none' : 'bg-green-600 shadow-green-100'
                }`}
              >
                {isBalanceInsufficient ? 'Saldo Tidak Cukup' : `Konfirmasi Pesanan`}
                {!isBalanceInsufficient && <i className="fa-solid fa-bolt-lightning text-[9px]"></i>}
              </button>
            </div>
          )}

          {step === 'finding' && (
            <div className="text-center py-10 animate-fade-in flex flex-col items-center justify-center h-full">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 border-[6px] border-green-50 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-green-600 border-t-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <i className={`fa-solid ${selectedRide.icon} text-4xl text-green-600`}></i>
                </div>
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1 tracking-tight">Mencari Driver...</h2>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-8">Memasangkan rute terbaik</p>
              <button onClick={() => setStep('confirm')} className="px-10 py-3 bg-gray-50 border border-gray-100 rounded-xl font-black text-[9px] text-gray-400 uppercase tracking-widest active:scale-95 shadow-sm transition-all">
                Batalkan
              </button>
              <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } 
                .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
