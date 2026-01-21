
import React from 'react';

interface WithdrawMethodProps {
  onBack: () => void;
  amount: number;
  linkedBanks: any[];
  onSelect: (bank: any) => void;
}

export const WithdrawMethod: React.FC<WithdrawMethodProps> = ({ onBack, amount, linkedBanks, onSelect }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Rekening Tujuan</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Tarik: Rp {amount.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center mb-2 px-1">
             <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Rekening Terdaftar</h2>
             <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg uppercase">Pribadi</span>
          </div>
          
          {linkedBanks.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
               <i className="fa-solid fa-building-columns text-3xl text-gray-200 mb-4"></i>
               <p className="text-[10px] text-gray-400 font-bold uppercase">Belum ada rekening tertaut</p>
            </div>
          ) : (
            linkedBanks.map((bank) => (
              <button 
                key={bank.id}
                onClick={() => onSelect(bank)}
                className="w-full bg-white p-5 rounded-[2rem] border border-gray-50 flex items-center justify-between hover:border-blue-100 active:scale-[0.98] transition-all shadow-sm"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${bank.color} ${bank.bg}`}>
                    <i className={`fa-solid ${bank.icon}`}></i>
                  </div>
                  <div>
                    <span className="font-black text-xs text-gray-900 block">{bank.name}</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">{bank.number}</p>
                    <p className="text-[8px] text-blue-500 font-black uppercase mt-1">A/N {bank.holder}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-chevron-right text-gray-300 text-[10px]"></i>
                </div>
              </button>
            ))
          )}
          
          <div className="p-5 bg-blue-50/30 rounded-[2rem] border border-blue-50 flex gap-4 mt-6">
            <i className="fa-solid fa-shield-halved text-blue-600 mt-1 text-xs"></i>
            <p className="text-[9px] text-blue-800 font-medium leading-relaxed">
              Untuk alasan keamanan, penarikan hanya bisa dilakukan ke rekening yang sudah terverifikasi di profil Anda.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 pb-12 bg-white border-t border-gray-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center mb-4 px-1">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Biaya Admin</p>
          <p className="text-[10px] text-green-600 font-black uppercase">Gratis</p>
        </div>
        <p className="text-[8px] text-gray-400 text-center font-medium px-4">
          Gunakan menu Profil > Metode Pembayaran untuk menambah atau menghapus rekening Bank Anda.
        </p>
      </div>
    </div>
  );
};
