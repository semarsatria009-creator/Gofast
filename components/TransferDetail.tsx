
import React from 'react';

interface TransferDetailProps {
  amount: number;
  details: any;
  onHome: () => void;
}

export const TransferDetail: React.FC<TransferDetailProps> = ({ amount, details, onHome }) => {
  const transactionId = "TF-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-screen bg-gray-50 flex flex-col animate-fade-in max-w-md mx-auto">
      <div className="bg-white px-5 pt-12 pb-3 flex items-center gap-3 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <h1 className="text-sm font-black text-gray-900 tracking-tight uppercase">Resi Transfer</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar pb-24">
        {/* Compact Header Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center relative overflow-hidden">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-lg shadow-inner">
             <i className="fa-solid fa-paper-plane"></i>
           </div>
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Transfer Terkirim</p>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Rp {amount.toLocaleString('id-ID')}</h2>
           <span className="bg-green-100 text-green-700 text-[8px] font-black px-3 py-1 rounded-md uppercase tracking-tighter inline-block">Berhasil</span>
        </div>

        {/* Recipient Box - Compact Dark */}
        <div className="bg-gray-900 p-5 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-[8px] font-black opacity-50 uppercase tracking-[0.2em] mb-3">Tujuan Pengiriman</p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-base">
                   <i className={`fa-solid ${details.type === 'bank' ? 'fa-building-columns' : 'fa-mobile-screen'}`}></i>
                 </div>
                 <div className="min-w-0">
                    <h3 className="font-black text-xs uppercase tracking-tight truncate">{details.recipientName || details.eWalletName}</h3>
                    <p className="text-[9px] font-medium text-white/50 mt-0.5">
                      {details.type === 'bank' ? `${details.bankName} • ${details.accountNumber}` : `+62 ${details.phoneNumber}`}
                    </p>
                 </div>
              </div>
           </div>
           <i className="fa-solid fa-circle-check absolute -right-6 -bottom-6 text-white/5 text-9xl"></i>
        </div>

        {/* Breakdown - Miniature */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rincian Biaya</h4>
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
                 <span>Biaya Admin</span>
                 <span className="text-green-600 font-black">Gratis</span>
              </div>
              <div className="h-px bg-gray-50 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                 <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest">Total Bayar</p>
                 <p className="text-sm font-black text-blue-600">Rp {amount.toLocaleString('id-ID')}</p>
              </div>
           </div>
        </div>

        <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100/50 flex gap-3">
           <i className="fa-solid fa-bolt-lightning text-green-500 mt-0.5 text-[10px]"></i>
           <p className="text-[8px] text-green-800 font-medium leading-relaxed">
             Saldo terkirim secara instan. Penerima akan mendapatkan notifikasi saldo masuk dalam beberapa detik.
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
