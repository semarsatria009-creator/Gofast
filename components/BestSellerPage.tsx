
import React, { useState } from 'react';
import { MOCK_BEST_SELLERS } from '../constants.ts';
import { ActiveOrder } from '../types.ts';

interface BestSellerPageProps {
  onBack: () => void;
  balance: number;
  onBeli: (item: any) => void;
}

export const BestSellerPage: React.FC<BestSellerPageProps> = ({ onBack, balance, onBeli }) => {
  const [filter, setFilter] = useState<'all' | 'food' | 'shopping'>('all');

  const filteredItems = MOCK_BEST_SELLERS.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-12">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Menu Terlaris</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Paling banyak dipesan minggu ini</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          {[
            { id: 'all', label: 'Semua', icon: 'fa-border-all' },
            { id: 'food', label: 'Makanan', icon: 'fa-utensils' },
            { id: 'shopping', label: 'Belanja', icon: 'fa-shopping-bag' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                filter === tab.id 
                  ? 'bg-white text-green-600 shadow-md' 
                  : 'text-gray-400'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-[10px]`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 px-6 py-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex p-4 gap-5 group active:scale-[0.98] transition-transform animate-fade-in">
              <div className="w-28 h-28 relative shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-3xl" />
                <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-0.5 rounded-lg text-[8px] font-black shadow-sm uppercase">
                  POPULER
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">{item.tag}</p>
                    <div className="flex items-center gap-1 text-[10px] font-black text-gray-900">
                      <i className="fa-solid fa-star text-yellow-400"></i> {item.rating}
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight mb-2 line-clamp-2">{item.name}</h3>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Harga</p>
                    <span className="text-base font-black text-gray-900">Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>
                  
                  <button 
                    onClick={() => onBeli(item)}
                    className="bg-green-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 active:scale-90 transition-transform flex items-center gap-2"
                  >
                    Beli <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Balance Indicator at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto">
           <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex justify-between items-center pointer-events-auto animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-black uppercase">Saldo GoPay</p>
                  <p className="text-sm font-black text-gray-900">Rp {balance.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <button 
                className="text-[10px] font-black text-green-600 bg-green-50 px-4 py-2 rounded-xl uppercase tracking-widest"
                onClick={() => {}} // Top Up can be handled if needed
              >
                Top Up
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
