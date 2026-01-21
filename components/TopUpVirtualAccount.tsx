
import React from 'react';

interface TopUpVirtualAccountProps {
  amount: number;
  bank: any;
  onBack: () => void;
  onConfirm: () => void;
}

export const TopUpVirtualAccount: React.FC<TopUpVirtualAccountProps> = ({ amount, bank, onBack, onConfirm }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Virtual Account</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">{bank?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-24">
        <div className="bg-blue-600 p-6 rounded-[2.5rem] text-center text-white shadow-xl shadow-blue-100 relative overflow-hidden">
           <div className="relative z-10">
             <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Nominal Top Up</p>
             <h2 className="text-3xl font-black tracking-tight leading-none">Rp {amount.toLocaleString('id-ID')}</h2>
           </div>
           <i className="fa-solid fa-building-columns absolute -right-6 -bottom-6 text-white/10 text-9xl"></i>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 space-y-4">
           <div>
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Nomor Virtual Account</p>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                 <p className="text-base font-black text-gray-900 tracking-[0.1em]">88090812345678</p>
                 <button className="text-[10px] font-black text-blue-600 uppercase bg-white px-3 py-1.5 rounded-lg shadow-sm">Salin</button>
              </div>
           </div>
           
           <div className="space-y-2">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Cara Pembayaran</p>
              {[
                "Login m-Banking Anda",
                "Pilih Transfer > Virtual Account",
                "Tempel nomor VA di atas",
                "Konfirmasi nominal & Bayar"
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400">{i+1}</span>
                  <p className="text-[11px] font-medium text-gray-600">{step}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="p-6 pb-12">
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          Konfirmasi Saya Sudah Bayar
        </button>
      </div>
    </div>
  );
};
