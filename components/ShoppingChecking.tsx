
import React, { useEffect } from 'react';

interface ShoppingCheckingProps {
  onSuccess: () => void;
}

export const ShoppingChecking: React.FC<ShoppingCheckingProps> = ({ onSuccess }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSuccess();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 border-4 border-purple-50 rounded-[3rem]"></div>
        <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-[3rem] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-solid fa-magnifying-glass-dollar text-4xl text-purple-600 animate-pulse"></i>
        </div>
      </div>

      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-3">Mengecek Pembayaran...</h1>
      <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[240px] mb-12">
        Sistem sedang memverifikasi bukti transfer Anda. Mohon jangan menutup halaman ini.
      </p>

      <div className="w-20 h-1 bg-gray-100 rounded-full relative overflow-hidden">
         <div className="absolute inset-0 bg-purple-500 animate-[loading_4s_linear_forwards]"></div>
      </div>
      <p className="text-[9px] text-gray-300 font-black uppercase mt-4 tracking-widest">Verifikasi Keamanan</p>

      <style>{`
        @keyframes loading {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
