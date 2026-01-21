
import React from 'react';

interface TopUpQRISProps {
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const TopUpQRIS: React.FC<TopUpQRISProps> = ({ amount, onBack, onConfirm }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">QRIS All Payment</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Otomatis Terdeteksi</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-24 flex flex-col items-center">
        <div className="bg-gray-50 p-6 rounded-[2.5rem] text-center border border-gray-100 w-full">
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Total Tagihan</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Rp {amount.toLocaleString('id-ID')}</h2>
        </div>

        <div className="relative bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl flex flex-col items-center">
           <img 
             src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GOFAST_PAYMENT_QRIS_MOCK" 
             alt="QRIS Code" 
             className="w-48 h-48 opacity-80"
           />
           <div className="mt-6 flex flex-col items-center gap-1">
             <h3 className="font-black text-xs text-gray-900">Scan Kode QR Ini</h3>
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Berlaku untuk 15 menit</p>
           </div>
           
           <div className="absolute top-4 left-4 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
           </div>
        </div>

        <div className="text-center space-y-2">
           <p className="text-[10px] text-gray-400 font-medium">Bisa bayar pakai aplikasi:</p>
           <div className="flex gap-4 items-center justify-center opacity-40">
              <i className="fa-solid fa-wallet text-xl"></i>
              <i className="fa-solid fa-building-columns text-xl"></i>
              <i className="fa-solid fa-credit-card text-xl"></i>
           </div>
        </div>
      </div>

      <div className="p-6 pb-12">
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-green-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-green-100 active:scale-95 transition-all"
        >
          Konfirmasi Saya Sudah Bayar
        </button>
      </div>
    </div>
  );
};
