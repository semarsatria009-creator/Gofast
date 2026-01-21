
import React, { useEffect, useState } from 'react';

interface WithdrawSuccessProps {
  amount: number;
  onNext: () => void;
}

export const WithdrawSuccess: React.FC<WithdrawSuccessProps> = ({ amount, onNext }) => {
  const [status, setStatus] = useState<'processing' | 'success'>('processing');

  useEffect(() => {
    // Simulate processing phase
    const successTimer = setTimeout(() => {
      setStatus('success');
    }, 1500);

    // Final redirection timer
    const redirectTimer = setTimeout(() => {
      onNext();
    }, 4000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(redirectTimer);
    };
  }, [onNext]);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in overflow-hidden">
      {status === 'processing' ? (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-blue-50 rounded-[2rem]"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-[2rem] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-paper-plane text-2xl text-blue-600 animate-pulse"></i>
            </div>
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-2">Memproses Dana...</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sistem sedang memverifikasi</p>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-scale-up">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-blue-50 rounded-[3rem] flex items-center justify-center relative z-10 shadow-inner">
              <i className="fa-solid fa-check text-5xl text-blue-600"></i>
            </div>
            <div className="absolute inset-0 bg-blue-400 rounded-[3rem] animate-ping opacity-20"></div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Permintaan Terkirim!</h1>
          <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[200px] mb-8">
            Tarik Tunai Rp <span className="text-gray-900 font-black">{amount.toLocaleString('id-ID')}</span> sedang diproses.
          </p>

          <div className="w-16 h-1 bg-gray-100 rounded-full relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500 animate-[loading_2s_linear_forwards]"></div>
          </div>
          <p className="text-[9px] text-gray-300 font-black uppercase mt-4 tracking-widest">Menuju rincian resi...</p>
        </div>
      )}

      <style>{`
        @keyframes loading {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
