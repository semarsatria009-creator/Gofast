
import React, { useEffect, useState, useRef } from 'react';
import { ActiveOrder } from '../types.ts';

interface OrderTrackingProps {
  order: ActiveOrder;
  onComplete: () => void;
  onCancel: () => void;
  onBack: () => void;
  triggerNotification: (title: string, body: string, type?: 'info' | 'success' | 'order' | 'promo') => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  order, 
  onComplete, 
  onCancel, 
  onBack,
  triggerNotification
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(order.status);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const notifiedMilestones = useRef<Set<number>>(new Set());

  const getSteps = () => {
    if (order.type === 'food') return ['Pesanan diterima', 'Sedang dimasak', 'Driver mengambil', 'Sedang diantar', 'Sampai tujuan!'];
    if (order.type === 'shopping') return ['Pesanan dikonfirmasi', 'Diproses penjual', 'Diserahkan ke kurir', 'Dalam perjalanan', 'Sampai di lokasi'];
    return ['Mencari driver', 'Driver menuju jemputan', 'Driver sampai', 'Menuju tujuan', 'Sampai tujuan!'];
  };

  const steps = getSteps();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        const currentStep = steps[stepIdx];
        setStatusText(currentStep);

        if (next === 20 && !notifiedMilestones.current.has(20)) {
          triggerNotification('Update Pesanan', `Pesanan ${order.title} sedang diproses.`, 'order');
          notifiedMilestones.current.add(20);
        }
        
        if (next === 60 && !notifiedMilestones.current.has(60)) {
          triggerNotification('Pesanan Dikirim', `Paketmu sudah dibawa kurir!`, 'order');
          notifiedMilestones.current.add(60);
        }

        if (next >= 100) {
          clearInterval(timer);
          triggerNotification("Selesai!", "Paket sudah sampai di tujuan.", 'success');
          setTimeout(() => onComplete(), 2500);
          return 100;
        }
        return next;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  if (order.type === 'shopping') {
    const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || order.price - 18000;
    const shippingFee = 15000;
    const appFee = 3000;

    return (
      <div className="h-screen bg-white flex flex-col animate-fade-in overflow-hidden">
        <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-50 flex items-center gap-4 shrink-0">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-all">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">Pelacakan Paket</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
          <div className="bg-blue-600 rounded-[2rem] p-4 text-white mb-4 shadow-lg relative overflow-hidden shrink-0">
            <div className="relative z-10">
              <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">GF-{order.id.toUpperCase()}</p>
              <h2 className="text-sm font-black mb-2 leading-tight">Estimasi Tiba: <span className="text-blue-100">Hari ini</span></h2>
              <div className="inline-flex items-center gap-2 bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-md">
                <i className="fa-solid fa-truck-fast text-[10px]"></i>
                <p className="text-[9px] font-bold uppercase tracking-tight">{statusText}</p>
              </div>
            </div>
            <i className="fa-solid fa-box absolute -right-4 -bottom-4 text-white/10 text-7xl"></i>
          </div>

          <div className="grid grid-cols-1 gap-4 pb-20">
             <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Status Terkini</h3>
                <div className="space-y-4 pl-2">
                  {steps.map((step, idx) => {
                    const currentStepIdx = Math.floor((progress / 100) * steps.length);
                    const isPast = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={idx} className="relative flex gap-4">
                        {idx !== steps.length - 1 && (
                          <div className={`absolute left-[5px] top-4 w-0.5 h-6 ${isPast ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
                        )}
                        <div className={`w-3 h-3 rounded-full border-2 z-10 shrink-0 transition-all ${
                          isPast ? 'bg-blue-600 border-blue-600' : 
                          isCurrent ? 'bg-white border-blue-600 ring-4 ring-blue-50' : 
                          'bg-white border-gray-100'
                        }`}></div>
                        <div className="-mt-0.5">
                          <p className={`text-[10px] font-black uppercase tracking-tight ${isPast ? 'text-gray-400' : isCurrent ? 'text-blue-600' : 'text-gray-200'}`}>
                            {step}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>

             {/* Detail Alamat - NEW SECTION */}
             <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Alamat Pengiriman</h3>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-[12px]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-900 leading-none mb-1">Budi Setiawan</p>
                    <p className="text-[9px] text-gray-500 font-medium leading-relaxed">
                      {order.address || 'Apartemen Menteng Park, Menara B Lt. 12, Jakarta Pusat'}
                    </p>
                  </div>
                </div>
             </div>

             <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Detail Barang</h3>
                <div className="space-y-3">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-gray-900 truncate leading-tight">{item.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">{item.quantity} Unit • Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-gray-50 rounded-3xl p-4 space-y-2 border border-gray-100">
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-tight">
                   <span>Subtotal</span>
                   <span className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-tight">
                   <span>Ongkos Kirim</span>
                   <span className="text-gray-900">Rp {shippingFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-tight">
                   <span>Biaya Layanan</span>
                   <span className="text-gray-900">Rp {appFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="h-px bg-gray-200 my-1"></div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-gray-900 uppercase">Total Bayar</span>
                   <span className="text-sm font-black text-blue-600">Rp {order.price.toLocaleString('id-ID')}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="p-4 pb-8 border-t border-gray-50 bg-white shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
           <button onClick={onBack} className="w-full py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Tutup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col relative overflow-hidden animate-fade-in">
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCancelModal(false)}></div>
          <div className="relative bg-white w-full rounded-[2rem] p-6 shadow-2xl animate-scale-up">
            <h3 className="text-sm font-black text-center text-gray-900 mb-4 uppercase tracking-wider">Batalkan Pesanan?</h3>
            <div className="space-y-2 mb-6">
              {["Ingin ganti alamat/menu", "Driver tidak merespon", "Lama menunggu", "Lainnya"].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setCancelReason(reason)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold border transition-all ${
                    cancelReason === reason ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-transparent text-gray-500'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl text-[9px] font-black uppercase">Kembali</button>
              <button onClick={onCancel} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase">Ya, Batal</button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[48vh] relative m-4 rounded-[2.5rem] overflow-hidden shadow-inner border border-white/50">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/106.8456,-6.2088,14,0/600x600?access_token=none')] bg-cover opacity-80"></div>
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
          <button onClick={onBack} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-gray-800 pointer-events-auto active:scale-90 transition-all">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </button>
          <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-white/50 pointer-events-auto">
             <p className={`text-[8px] font-black uppercase tracking-widest leading-none mb-0.5 ${order.type === 'food' ? 'text-red-600' : 'text-blue-600'}`}>{statusText}</p>
             <p className="text-[10px] font-black text-gray-900 leading-none">Estimasi 5 mnt</p>
          </div>
        </div>

        <div className="absolute transition-all duration-500 ease-linear" style={{ left: `${20 + progress * 0.6}%`, top: `${45 + Math.sin(progress/4) * 4}%` }}>
          <div className="relative">
            <div className={`w-10 h-10 rounded-2xl shadow-xl flex items-center justify-center text-white border-2 border-white animate-bounce-slow ${order.type === 'food' ? 'bg-red-500' : 'bg-blue-600'}`}>
              <i className={`fa-solid ${order.icon} text-sm`}></i>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/10 rounded-full blur-[2px]"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pb-8 flex flex-col gap-3 -mt-6 z-10 overflow-y-auto hide-scrollbar">
        <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 shrink-0 bg-gray-50`}>
              <i className={`fa-solid ${order.icon} ${order.type === 'food' ? 'text-red-500' : 'text-blue-600'} text-sm`}></i>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black text-gray-900 truncate leading-tight">{order.title}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: {order.id.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] font-black text-green-600">Rp {order.price.toLocaleString('id-ID')}</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-5 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">Tahapan Pesanan</span>
            <span className="text-[9px] font-black text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${order.type === 'food' ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/driver7/100/100" alt="Driver" className="w-10 h-10 rounded-xl object-cover border border-gray-50" />
            <div className="flex-1 min-w-0">
              <h3 className="text-[10px] font-black text-gray-900 leading-none">Ahmad Subarjo</h3>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Mitra Driver Terpercaya</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <i className="fa-solid fa-star text-yellow-400 text-[8px]"></i>
              <span className="text-[9px] font-black text-gray-800">4.9</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all ${order.type === 'food' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <i className="fa-solid fa-message text-[8px]"></i> Chat
            </button>
            <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
              <i className="fa-solid fa-phone text-[8px]"></i> Telepon
            </button>
          </div>
        </div>

        {progress < 30 && (
          <button onClick={() => setShowCancelModal(true)} className="w-full py-3 text-gray-400 font-black text-[8px] uppercase tracking-[0.2em] border border-dashed border-gray-200 rounded-xl active:text-red-500 active:border-red-200 transition-all">
            <i className="fa-solid fa-xmark mr-1"></i> Batalkan Pesanan
          </button>
        )}
      </div>

      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 1.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
