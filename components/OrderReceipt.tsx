
import React from 'react';
import { PastOrder } from '../types.ts';

interface OrderReceiptProps {
  order: PastOrder;
  onBack: () => void;
}

export const OrderReceipt: React.FC<OrderReceiptProps> = ({ order, onBack }) => {
  const transactionId = "ORD-" + order.id.toUpperCase();
  const deliveryFee = 12000;
  const platformFee = 2000;
  const subtotal = order.price - deliveryFee - platformFee;

  return (
    <div className="h-screen bg-gray-50 flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="bg-white px-5 pt-12 pb-3 flex items-center gap-3 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>
        <h1 className="text-sm font-black text-gray-900 tracking-tight uppercase">Detail Transaksi</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar pb-24">
        {/* Compact Header Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center relative overflow-hidden">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-lg shadow-inner ${
             order.status === 'Dibatalkan' ? 'bg-gray-50 text-gray-300' : 'bg-green-50 text-green-600'
           }`}>
             <i className={`fa-solid ${order.icon}`}></i>
           </div>
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Total Bayar</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Rp {order.price.toLocaleString('id-ID')}</h2>
           <span className={`text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-tighter inline-block ${
             order.status === 'Dibatalkan' ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-700'
           }`}>{order.status}</span>
           <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400/20 rounded-full"></div>
           <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-red-400/20 rounded-full"></div>
        </div>

        {/* Service Box - Compact */}
        <div className="bg-gray-900 p-4 rounded-2xl text-white shadow-xl relative overflow-hidden flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-base shrink-0">
             <i className={`fa-solid ${order.icon}`}></i>
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="font-black text-xs uppercase tracking-tight line-clamp-1">{order.title}</h3>
              <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.1em] mt-0.5">{order.type} • {order.date}</p>
           </div>
           <i className="fa-solid fa-receipt absolute -right-4 -bottom-4 text-white/5 text-7xl"></i>
        </div>

        {/* Payment Breakdown - Miniature */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rincian Tagihan</h4>
           </div>
           
           <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Subtotal Pesanan</span>
                 <span className="text-gray-900 font-black">Rp {subtotal > 0 ? subtotal.toLocaleString('id-ID') : order.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Ongkir / Parkir</span>
                 <span className="text-gray-900 font-black">Rp {subtotal > 0 ? deliveryFee.toLocaleString('id-ID') : '0'}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Biaya Aplikasi</span>
                 <span className="text-gray-900 font-black">Rp {subtotal > 0 ? platformFee.toLocaleString('id-ID') : '0'}</span>
              </div>
              <div className="h-px bg-gray-50 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                 <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest">Total Pembayaran</p>
                 <p className="text-sm font-black text-blue-600">Rp {order.price.toLocaleString('id-ID')}</p>
              </div>
           </div>
        </div>

        {/* Metadata - Tiny */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2.5">
           <div className="flex justify-between items-center">
              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">ID Transaksi</p>
              <p className="text-[9px] font-black text-gray-900 tracking-tight">{transactionId}</p>
           </div>
           <div className="flex justify-between items-center">
              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Metode Bayar</p>
              <p className="text-[9px] font-black text-gray-900 uppercase">GoFast Wallet</p>
           </div>
        </div>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-3">
           <i className="fa-solid fa-circle-check text-blue-500 mt-0.5 text-[10px]"></i>
           <p className="text-[8px] text-blue-800 font-medium leading-relaxed">
             Terima kasih telah bertransaksi. E-Receipt ini adalah bukti pembayaran sah Anda. Jika ada kendala, hubungi Pusat Bantuan di menu Profil.
           </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white/80 backdrop-blur-md z-40 border-t border-gray-50">
        <button 
          onClick={onBack}
          className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-sm active:scale-95 transition-all"
        >
          Selesai & Kembali
        </button>
      </div>
    </div>
  );
};
