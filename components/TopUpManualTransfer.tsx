
import React from 'react';

interface TopUpManualTransferProps {
  amount: number;
  bank: any;
  onBack: () => void;
  onConfirm: () => void;
}

export const TopUpManualTransfer: React.FC<TopUpManualTransferProps> = ({ amount, bank, onBack, onConfirm }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Transfer Manual</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">{bank?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-24">
        <div className="bg-gray-50 p-6 rounded-[2.5rem] text-center border border-gray-100">
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Total Transfer</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rp {(amount + 123).toLocaleString('id-ID')}</h2>
           <p className="text-[9px] text-green-600 font-black mt-1 uppercase">*Termasuk kode unik 123</p>
        </div>

        <div className="space-y-4">
           <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Nomor Rekening</p>
                 <p className="text-sm font-black text-gray-900 tracking-wider">1234567890</p>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase">Salin</button>
           </div>
           <div className="bg-white p-5 rounded-3xl border border-gray-100">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Nama Penerima</p>
              <p className="text-sm font-black text-gray-900">PT GOFAST DIGITAL INDONESIA</p>
           </div>
        </div>

        <div className="p-5 bg-yellow-50 rounded-3xl border border-yellow-100 flex gap-4">
           <i className="fa-solid fa-circle-exclamation text-yellow-500 mt-1"></i>
           <p className="text-[10px] text-yellow-800 font-medium leading-relaxed">
             Transfer harus sesuai nominal hingga 3 digit terakhir untuk verifikasi otomatis. Simpan bukti transfer Anda.
           </p>
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
