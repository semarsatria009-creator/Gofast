
import React, { useState } from 'react';

interface TopUpPaymentMethodProps {
  onBack: () => void;
  amount: number;
  onSelect: (method: string) => void;
  onSelectVA: (bank: any) => void;
  onSelectManual: (bank: any) => void;
}

const BANKS = [
  { id: 'bca', name: 'Bank BCA', icon: 'fa-building-columns', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'mandiri', name: 'Bank Mandiri', icon: 'fa-building-columns', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'bri', name: 'Bank BRI', icon: 'fa-building-columns', color: 'text-blue-500', bg: 'bg-blue-50' },
];

export const TopUpPaymentMethod: React.FC<TopUpPaymentMethodProps> = ({ 
  onBack, 
  amount, 
  onSelectVA, 
  onSelectManual,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<'va' | 'manual' | 'qris'>('va');

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Metode Pembayaran</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Nominal: Rp {amount.toLocaleString('id-ID')}</p>
          </div>
        </div>

        <div className="flex p-1 bg-gray-50 rounded-2xl mb-6">
          {(['va', 'manual', 'qris'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'
              }`}
            >
              {tab === 'va' ? 'Virtual Account' : tab === 'manual' ? 'Transfer Manual' : 'QRIS'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        {activeTab === 'qris' ? (
          <div className="animate-fade-in">
            <button 
              onClick={() => onSelect('qris')}
              className="w-full bg-white p-5 rounded-[2rem] border-2 border-green-500 flex items-center justify-between group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <div className="text-left">
                  <span className="font-black text-xs text-gray-900">QRIS All Payment</span>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Otomatis & Real-time</p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-green-200"></i>
            </button>
            <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
               <p className="text-[9px] text-blue-700 font-bold leading-relaxed">
                 <i className="fa-solid fa-circle-info mr-1"></i>
                 Gunakan aplikasi m-banking atau e-wallet apa saja untuk scan kode QRIS nanti. Saldo akan otomatis masuk.
               </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {BANKS.map((bank) => (
              <button 
                key={bank.id}
                onClick={() => activeTab === 'va' ? onSelectVA(bank) : onSelectManual(bank)}
                className="w-full bg-white p-5 rounded-[2rem] border border-gray-50 flex items-center justify-between hover:border-green-100 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${bank.color} ${bank.bg}`}>
                    <i className={`fa-solid ${bank.icon}`}></i>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-xs text-gray-900">{bank.name}</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                      {activeTab === 'va' ? 'Virtual Account' : 'Transfer Antar Bank'}
                    </p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-200"></i>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
