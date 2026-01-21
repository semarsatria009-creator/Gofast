
import React from 'react';

interface WithdrawDetailProps {
  amount: number;
  bank: any;
  onHome: () => void;
}

export const WithdrawDetail: React.FC<WithdrawDetailProps> = ({ amount, bank, onHome }) => {
  const transactionId = "WD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-screen bg-gray-50 flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="bg-white px-5 pt-12 pb-3 flex items-center gap-3 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <h1 className="text-sm font-black text-gray-900 tracking-tight uppercase">Resi Penarikan</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar pb-24">
        {/* Compact Header Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center relative overflow-hidden">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-lg shadow-inner">
             <i className="fa-solid fa-money-bill-transfer"></i>
           </div>
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Penarikan Dana</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Rp {amount.toLocaleString('id-ID')}</h2>
           <span className="bg-orange-100 text-orange-700 text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-tighter inline-block">Diproses</span>
        </div>

        {/* Bank Target - Compact */}
        <div className="bg-gray-900 p-4 rounded-2xl text-white shadow-xl relative overflow-hidden flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-base shrink-0">
             <i className="fa-solid fa-building-columns"></i>
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="font-black text-xs uppercase tracking-tight truncate">{bank?.name || 'Bank Tujuan'}</h3>
              <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.1em] mt-0.5">{bank?.number || '8809****'}</p>
           </div>
           <i className="fa-solid fa-clock-rotate-left absolute -right-4 -bottom-4 text-white/5 text-7xl"></i>
        </div>

        {/* Billing Breakdown - Miniature */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rincian Tagihan</h4>
           </div>
           
           <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>ID Transaksi</span>
                 <span className="text-gray-900 font-black">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Waktu Request</span>
                 <span className="text-gray-900 font-black">{date}, {time}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Estimasi Selesai</span>
                 <span className="text-orange-600 font-black">Maks. 24 Jam</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Biaya Admin</span>
                 <span className="text-green-600 font-black">Rp 0</span>
              </div>
              <div className="h-px bg-gray-50 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                 <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest">Total Diterima</p>
                 <p className="text-sm font-black text-blue-600">Rp {amount.toLocaleString('id-ID')}</p>
              </div>
           </div>
        </div>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-3">
           <i className="fa-solid fa-circle-info text-blue-500 mt-0.5 text-[10px]"></i>
           <p className="text-[8px] text-blue-800 font-medium leading-relaxed">
             Dana akan otomatis dikirim ke rekening terdaftar Anda. Jika dalam 24 jam dana belum masuk, hubungi Pusat Bantuan.
           </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white/80 backdrop-blur-md z-40 border-t border-gray-50">
        <button 
          onClick={onHome}
          className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-sm active:scale-95 transition-all"
        >
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
};
