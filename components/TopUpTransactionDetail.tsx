
import React from 'react';

interface TopUpTransactionDetailProps {
  amount: number;
  method: string;
  bank?: any;
  onHome: () => void;
}

export const TopUpTransactionDetail: React.FC<TopUpTransactionDetailProps> = ({ amount, method, bank, onHome }) => {
  const transactionId = "TX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-screen bg-gray-50 flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="bg-white px-5 pt-12 pb-3 flex items-center gap-3 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <h1 className="text-sm font-black text-gray-900 tracking-tight uppercase">Resi Top Up</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        {/* Compact Header Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center relative overflow-hidden">
           <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-lg shadow-inner">
             <i className="fa-solid fa-receipt"></i>
           </div>
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Berhasil Ditambahkan</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Rp {amount.toLocaleString('id-ID')}</h2>
           <span className="bg-green-100 text-green-700 text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-tighter inline-block">Sukses</span>
           
           <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400/20 rounded-full"></div>
           <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-red-400/20 rounded-full"></div>
        </div>

        {/* Detailed Info - Micro Style */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-green-500 rounded-full"></div>
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Detail Transaksi</h4>
           </div>

           <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>ID Transaksi</span>
                 <span className="text-gray-900 font-black">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Waktu</span>
                 <span className="text-gray-900 font-black">{date}, {time}</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                 <span>Metode</span>
                 <span className="text-gray-900 font-black text-right truncate ml-4">
                   {method === 'qris' ? 'QRIS' : method === 'va' ? `VA ${bank?.name}` : `Transfer ${bank?.name}`}
                 </span>
              </div>
              <div className="h-px bg-gray-50 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                 <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest">Total Top Up</p>
                 <p className="text-sm font-black text-green-600">Rp {amount.toLocaleString('id-ID')}</p>
              </div>
           </div>
        </div>

        {/* Small Wallet Preview */}
        <div className="bg-gray-900 p-4 rounded-2xl text-white shadow-xl relative overflow-hidden flex items-center justify-between">
           <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-green-400">
                <i className="fa-solid fa-wallet text-sm"></i>
              </div>
              <div>
                 <p className="text-[8px] font-black opacity-50 uppercase tracking-widest">Saldo Saat Ini</p>
                 <p className="text-xs font-black">Rp {(250000 + amount).toLocaleString('id-ID')}</p>
              </div>
           </div>
           <i className="fa-solid fa-shield-check text-white/5 text-5xl absolute -right-2 -bottom-2"></i>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white/80 backdrop-blur-md z-40 border-t border-gray-50">
        <button 
          onClick={onHome}
          className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-sm active:scale-95 transition-all"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
