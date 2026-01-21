
import React, { useEffect, useState } from 'react';

interface TransferSuccessProps {
  amount: number;
  onNext: () => void;
}

export const TransferSuccess: React.FC<TransferSuccessProps> = ({ amount, onNext }) => {
  const [status, setStatus] = useState<'processing' | 'success'>('processing');

  useEffect(() => {
    // Simulasi fase pemrosesan transaksi
    const successTimer = setTimeout(() => {
      setStatus('success');
    }, 1800);

    // Otomatis arahkan ke rincian resi
    const redirectTimer = setTimeout(() => {
      onNext();
    }, 4500);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(redirectTimer);
    };
  }, [onNext]);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in overflow-hidden">
      {status === 'processing' ? (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-up text-2xl text-blue-600 animate-pulse"></i>
            </div>
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-2 uppercase">Sedang Diproses</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Menunggu konfirmasi jaringan...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-scale-up">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-green-50 rounded-[3rem] flex items-center justify-center relative z-10 shadow-inner">
              <i className="fa-solid fa-check-double text-5xl text-green-600"></i>
            </div>
            <div className="absolute inset-0 bg-green-400 rounded-[3rem] animate-ping opacity-20"></div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Dana Berhasil Dikirim!</h1>
          <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[220px] mb-10">
            Transfer Rp <span className="text-gray-900 font-black">{amount.toLocaleString('id-ID')}</span> telah sukses.
          </p>

          <div className="w-20 h-1 bg-gray-100 rounded-full relative overflow-hidden">
             <div className="absolute inset-0 bg-green-500 animate-[loading_2.5s_linear_forwards]"></div>
          </div>
          <p className="text-[9px] text-gray-300 font-black uppercase mt-4 tracking-widest">Membuka rincian transaksi...</p>
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
