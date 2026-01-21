
import React, { useState } from 'react';
import { MOCK_PROMOS } from '../constants.ts';
import { PromoVoucher } from '../types.ts';

interface PromoProps {
  onBack: () => void;
}

export const Promo: React.FC<PromoProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'food' | 'ride' | 'wallet'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPromos = MOCK_PROMOS.filter(p => {
    if (activeTab === 'all') return true;
    return p.type === activeTab;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'food': return 'fa-utensils';
      case 'ride': return 'fa-motorcycle';
      case 'wallet': return 'fa-wallet';
      default: return 'fa-tag';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'food': return 'bg-red-500';
      case 'ride': return 'bg-green-500';
      case 'wallet': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-700">
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-2xl font-bold">Promo & Voucher</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {[
            { id: 'all', label: 'Semua', icon: 'fa-grip-vertical' },
            { id: 'food', label: 'Makanan', icon: 'fa-utensils' },
            { id: 'ride', label: 'Perjalanan', icon: 'fa-motorcycle' },
            { id: 'wallet', label: 'Pembayaran', icon: 'fa-wallet' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {filteredPromos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-ticket-simple text-4xl text-gray-300"></i>
            </div>
            <p className="text-gray-400 font-bold">Belum ada promo untuk kategori ini</p>
          </div>
        ) : (
          filteredPromos.map((promo) => (
            <div key={promo.id} className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex h-36">
              {/* Ticket Decoration Left */}
              <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-50 rounded-full shadow-inner border-r border-gray-100"></div>
              
              {/* Promo Type Indicator */}
              <div className={`w-3 ${getColor(promo.type)}`}></div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-tight">{promo.title}</h3>
                    <span className="text-lg font-black text-green-600 leading-none">{promo.discount}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{promo.description}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                    <i className="fa-solid fa-clock"></i>
                    {promo.expiry}
                  </div>
                  <button 
                    onClick={() => handleCopy(promo.code, promo.id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      copiedId === promo.id 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-800 active:scale-95'
                    }`}
                  >
                    {copiedId === promo.id ? 'Tersalin!' : promo.code}
                  </button>
                </div>
              </div>

              {/* Ticket Decoration Right */}
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-50 rounded-full shadow-inner border-l border-gray-100"></div>
            </div>
          ))
        )}
      </div>

      <div className="mx-6 p-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl text-white shadow-xl relative overflow-hidden mt-4">
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-1">Misi Berhadiah</h2>
          <p className="text-xs opacity-80 mb-4">Selesaikan misi bulanan & dapatkan voucher spesial!</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-xl text-xs font-bold shadow-sm">
            Lihat Misi Saya
          </button>
        </div>
        <i className="fa-solid fa-trophy absolute -right-6 -bottom-6 text-white/10 text-9xl rotate-12"></i>
      </div>
    </div>
  );
};
