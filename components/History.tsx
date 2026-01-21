
import React, { useState } from 'react';
import { PastOrder, AppView, ActiveOrder } from '../types.ts';

interface HistoryProps {
  orders: PastOrder[];
  activeOrders: ActiveOrder[];
  onViewChange: (view: AppView) => void;
  onSelectItem: (item: PastOrder) => void;
  onTrackOrder: (id: string) => void;
}

type TabType = 'semua' | 'makanan' | 'ojek' | 'belanja' | 'paket';

export const History: React.FC<HistoryProps> = ({ orders, activeOrders, onViewChange, onSelectItem, onTrackOrder }) => {
  const [activeTab, setActiveTab] = useState<TabType>('semua');

  const tabToType: Record<string, string> = {
    makanan: 'food',
    ojek: 'ojek',
    belanja: 'shopping',
    paket: 'delivery'
  };

  const filteredPastOrders = orders.filter(order => {
    if (activeTab === 'semua') return true;
    return order.type === tabToType[activeTab];
  });

  const filteredActiveOrders = activeOrders.filter(order => {
    if (activeTab === 'semua') return true;
    return order.type === tabToType[activeTab];
  });

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <div className="bg-white pt-12 pb-3 px-5 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <h1 className="text-xl font-black text-gray-900 mb-4 tracking-tight leading-none">Aktivitas</h1>
        
        <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl overflow-x-auto hide-scrollbar">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'makanan', label: 'Makanan' },
            { id: 'ojek', label: 'Ojek' },
            { id: 'belanja', label: 'Belanja' },
            { id: 'paket', label: 'Paket' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-green-600 shadow-sm border border-gray-100' 
                  : 'text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Active Orders Section - More Compact */}
        {filteredActiveOrders.length > 0 && (
          <section className="animate-fade-in space-y-2">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                Proses ({filteredActiveOrders.length})
              </h2>
            </div>
            
            <div className="space-y-2">
              {filteredActiveOrders.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => onTrackOrder(order.id)}
                  className="bg-white p-3.5 rounded-2xl shadow-md border border-blue-50 cursor-pointer active:scale-[0.98] transition-all animate-slide-up"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-blue-50 text-blue-600 shrink-0">
                      <i className={`fa-solid ${order.icon} text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-gray-900 text-[11px] leading-tight truncate">{order.title}</h3>
                      <p className="text-[8px] text-blue-600 font-bold mt-0.5 uppercase tracking-tighter">{order.status}</p>
                    </div>
                    <button 
                      className="h-8 px-4 bg-blue-600 text-white text-[8px] font-black rounded-lg shadow-sm uppercase tracking-widest flex items-center justify-center gap-1.5 shrink-0"
                    >
                      Lacak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Orders Section - Compact Layout */}
        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Riwayat</h2>
            <span className="text-[8px] text-gray-300 font-bold uppercase">{filteredPastOrders.length} Pesanan</span>
          </div>

          {filteredPastOrders.length === 0 && filteredActiveOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-gray-200 mx-1">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
                <i className="fa-solid fa-receipt text-xl"></i>
              </div>
              <p className="font-black text-gray-300 text-[9px] uppercase tracking-widest">Belum ada riwayat</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredPastOrders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => onSelectItem(order)}
                  className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-50 active:scale-[0.98] transition-all group cursor-pointer hover:border-green-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                      order.status === 'Dibatalkan' ? 'bg-gray-50 text-gray-300' : 
                      (order.type === 'food' ? 'bg-red-50 text-red-500' : 
                       order.type === 'delivery' ? 'bg-orange-50 text-orange-500' : 
                       'bg-green-50 text-green-500')
                    }`}>
                      <i className={`fa-solid ${order.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="font-black text-gray-900 text-[11px] leading-tight truncate group-hover:text-green-600 transition-colors">{order.title}</h3>
                        <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tighter shrink-0 ${
                          order.status === 'Dibatalkan' ? 'bg-gray-50 text-gray-400' : 'bg-green-50 text-green-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                         <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">{order.date}</p>
                         <p className="text-[10px] font-black text-gray-900 leading-none">Rp {order.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
