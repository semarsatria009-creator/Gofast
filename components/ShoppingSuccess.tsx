
import React from 'react';

interface ShoppingSuccessProps {
  onTrack: () => void;
  onHome: () => void;
  total: number;
}

export const ShoppingSuccess: React.FC<ShoppingSuccessProps> = ({ onTrack, onHome, total }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="relative mb-10">
        <div className="w-32 h-32 bg-green-50 rounded-[3rem] flex items-center justify-center animate-scale-up">
          <i className="fa-solid fa-check text-5xl text-green-600"></i>
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white animate-bounce shadow-lg">
          <i className="fa-solid fa-gift text-sm"></i>
        </div>
      </div>

      <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center mb-2">Pembayaran Berhasil!</h1>
      <p className="text-sm text-gray-400 font-medium text-center mb-10 max-w-[240px] leading-relaxed">
        Yeay! Pesananmu sudah kami teruskan ke penjual untuk segera dikemas.
      </p>

      <div className="w-full bg-gray-50 rounded-[2.5rem] p-6 mb-12 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metode Bayar</span>
          <span className="text-xs font-black text-gray-900">GoPay Wallet</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Bayar</span>
          <span className="text-lg font-black text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={onTrack}
          className="w-full py-5 bg-blue-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-100 active:scale-95 transition-all"
        >
          Lacak Pesanan
        </button>
        <button 
          onClick={onHome}
          className="w-full py-5 bg-white text-gray-400 rounded-[2rem] text-[11px] font-black uppercase tracking-widest border border-gray-100 active:bg-gray-50 transition-all"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
