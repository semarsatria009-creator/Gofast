
import React, { useState, useEffect } from 'react';
import { AppView, ActiveOrder } from '../types.ts';
import { CATEGORIES, RESTAURANTS, MOCK_BEST_SELLERS } from '../constants.ts';

interface HomeProps {
  onViewChange: (view: AppView) => void;
  balance: number;
  activeOrder: ActiveOrder | null;
}

export const Home: React.FC<HomeProps> = ({ onViewChange, balance, activeOrder }) => {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-sky-500 pt-12 pb-8 px-6 text-white rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
              <i className="fa-solid fa-bolt text-yellow-300"></i>
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase">GoFast</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onViewChange(AppView.NOTIFICATIONS)}
              className="w-10 h-10 bg-white/10 rounded-xl relative active:scale-90 transition-all flex items-center justify-center border border-white/5"
            >
              <i className="fa-solid fa-bell text-sm"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-sky-500"></span>
            </button>
            <button 
              onClick={() => onViewChange(AppView.CHATS)}
              className="w-10 h-10 bg-white/10 rounded-xl relative active:scale-90 transition-all flex items-center justify-center border border-white/5"
            >
              <i className="fa-solid fa-message text-sm"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-cyan-400 rounded-full border-2 border-sky-500"></span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div 
          onClick={() => onViewChange(AppView.OJEK)}
          className="relative z-20 cursor-pointer group active:scale-[0.98] transition-all"
        >
          <div className="w-full bg-white text-gray-400 rounded-2xl py-4 pl-12 pr-4 shadow-2xl flex items-center text-xs font-black uppercase tracking-widest">
            Mau pergi ke mana?
          </div>
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sky-500"></i>
        </div>
      </header>

      {/* Wallet Area */}
      <div className="mx-6 -mt-6 bg-white rounded-[2rem] p-5 shadow-xl flex justify-between items-center border border-gray-50 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 shadow-inner">
            <i className="fa-solid fa-wallet text-lg"></i>
          </div>
          <div>
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em] mb-0.5">Saldo Wallet</p>
            <p className="text-sm font-black text-gray-900 tracking-tight">Rp {balance.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onViewChange(AppView.TOP_UP)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
          >
            <div className="w-9 h-9 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center shadow-sm border border-sky-100/50">
              <i className="fa-solid fa-plus text-xs"></i>
            </div>
            <span className="text-[8px] font-black text-gray-400 uppercase">Isi</span>
          </button>
          <button 
            onClick={() => onViewChange(AppView.TRANSFER)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
          >
            <div className="w-9 h-9 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center shadow-sm border border-sky-100/50">
              <i className="fa-solid fa-paper-plane text-[10px]"></i>
            </div>
            <span className="text-[8px] font-black text-gray-400 uppercase">Bayar</span>
          </button>
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-4 gap-4 px-6 mt-10">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onViewChange(cat.view as AppView)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center shadow-md group-active:scale-90 transition-all border-2 border-white`}>
              <i className={`fa-solid ${cat.icon} text-xl`}></i>
            </div>
            <span className="text-[9px] font-black text-gray-500 text-center uppercase tracking-tighter">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Best Seller Section - Grid Layout */}
      <div className="mt-10 px-6">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none uppercase">Paling Laris</h2>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Favorit banyak orang minggu ini</p>
          </div>
          <button 
            onClick={() => onViewChange(AppView.BEST_SELLER_PAGE)}
            className="text-sky-600 text-[9px] font-black uppercase tracking-widest bg-sky-50 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
          >
            Semua
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {MOCK_BEST_SELLERS.slice(0, 4).map((item) => (
            <div 
              key={item.id}
              onClick={() => onViewChange(AppView.BEST_SELLER_PAGE)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="h-32 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-sky-400 text-white px-2 py-0.5 rounded-lg text-[7px] font-black shadow-lg uppercase tracking-wider">
                  Populer
                </div>
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-xl flex items-center gap-1 shadow-sm border border-white/50">
                  <i className="fa-solid fa-star text-yellow-400 text-[7px]"></i>
                  <span className="text-[9px] font-black text-gray-800">{item.rating}</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[7px] text-sky-600 font-black uppercase tracking-[0.15em] mb-1">{item.tag}</p>
                <h4 className="text-[10px] font-black text-gray-900 line-clamp-1 leading-tight mb-3 uppercase tracking-tighter">{item.name}</h4>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs font-black text-gray-900">Rp {item.price.toLocaleString('id-ID')}</span>
                  <div className="w-7 h-7 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center shadow-sm border border-sky-100/30">
                    <i className="fa-solid fa-plus text-[9px]"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner Bottom */}
      <div className="mx-6 mt-10 pb-10">
        <div className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-sky-100">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1 uppercase tracking-tight">Cerah Hemat!</h3>
            <p className="text-xs font-medium opacity-80 max-w-[200px] leading-snug">Dapatkan diskon ceria s.d 40% untuk semua layanan hari ini.</p>
            <button className="mt-4 bg-white text-sky-600 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
              Ambil Promo
            </button>
          </div>
          <i className="fa-solid fa-cloud-sun absolute -right-6 -bottom-6 text-white/10 text-9xl rotate-12"></i>
        </div>
      </div>
    </div>
  );
};
