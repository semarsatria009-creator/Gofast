
import React, { useEffect } from 'react';

interface TopUpSuccessProps {
  amount: number;
  onNext: () => void;
}

export const TopUpSuccess: React.FC<TopUpSuccessProps> = ({ amount, onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-green-50 rounded-[3rem] flex items-center justify-center animate-scale-up relative z-10">
          <i className="fa-solid fa-check text-5xl text-green-600"></i>
        </div>
        <div className="absolute inset-0 bg-green-400 rounded-[3rem] animate-ping opacity-20"></div>
      </div>

      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Saldo Berhasil Masuk!</h1>
      <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[200px] mb-8">
        Rp <span className="text-gray-900 font-black">{amount.toLocaleString('id-ID')}</span> telah ditambahkan ke wallet kamu.
      </p>

      <div className="w-10 h-1 bg-gray-100 rounded-full relative overflow-hidden">
         <div className="absolute inset-0 bg-green-500 animate-[loading_2.5s_linear_forwards]"></div>
      </div>
      <p className="text-[9px] text-gray-300 font-black uppercase mt-3 tracking-widest">Mengarahkan ke rincian...</p>

      <style>{`
        @keyframes loading {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
