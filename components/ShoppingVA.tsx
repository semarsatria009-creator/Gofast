
import React from 'react';

interface ShoppingVAProps {
  amount: number;
  bankName: string;
  onBack: () => void;
  onPay: () => void;
}

export const ShoppingVA: React.FC<ShoppingVAProps> = ({ amount, bankName, onBack, onPay }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in">
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform shrink-0">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">Virtual Account</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-center text-white shadow-xl shadow-blue-100 relative overflow-hidden">
           <div className="relative z-10">
             <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Total Tagihan</p>
             <h2 className="text-3xl font-black tracking-tight leading-none">Rp {amount.toLocaleString('id-ID')}</h2>
           </div>
           <i className="fa-solid fa-building-columns absolute -right-6 -bottom-6 text-white/10 text-9xl"></i>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 space-y-6 shadow-sm">
           <div>
              <div className="flex justify-between items-center mb-2">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor Virtual Account</p>
                 <span className="text-[10px] font-black text-blue-600 uppercase">{bankName}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                 <p className="text-lg font-black text-gray-900 tracking-widest">88090812345678</p>
                 <button className="text-[10px] font-black text-blue-600 uppercase bg-white px-3 py-1.5 rounded-lg shadow-sm">Salin</button>
              </div>
           </div>
           
           <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Petunjuk Pembayaran</p>
              {[
                "Login ke aplikasi m-Banking Anda",
                "Pilih menu Transfer > Virtual Account",
                "Masukkan nomor VA di atas",
                "Konfirmasi nominal dan masukkan PIN Anda"
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0">{i+1}</span>
                  <p className="text-[11px] font-medium text-gray-600 leading-snug">{step}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100 flex gap-4">
           <i className="fa-solid fa-clock text-orange-500 mt-1"></i>
           <p className="text-[10px] text-orange-800 font-medium leading-relaxed">
             Segera lakukan pembayaran sebelum batas waktu berakhir. Status pesanan akan otomatis terupdate setelah pembayaran berhasil.
           </p>
        </div>
      </div>

      <div className="p-6 pb-12">
        <button 
          onClick={onPay}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          Simulasi Bayar Sekarang
        </button>
      </div>
    </div>
  );
};
