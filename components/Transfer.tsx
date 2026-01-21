
import React, { useState } from 'react';

interface TransferProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
  currentBalance: number;
}

export const Transfer: React.FC<TransferProps> = ({ onBack, onConfirm, currentBalance }) => {
  const [amount, setAmount] = useState<number>(0);
  const presets = [10000, 25000, 50000, 100000, 200000, 500000];

  const handleNext = () => {
    if (amount <= 0 || amount > currentBalance) return;
    onConfirm(amount);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-2 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Kirim Saldo</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Langkah 1 dari 3</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto hide-scrollbar">
        <div className="py-8 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100 mb-8 shadow-inner">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Nominal Kirim</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-lg font-black text-gray-200">Rp</span>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0"
              className="bg-transparent border-none text-3xl font-black text-gray-900 focus:ring-0 placeholder:text-gray-100 w-full max-w-[200px] text-center p-0"
            />
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-2">Saldo Anda: Rp {currentBalance.toLocaleString('id-ID')}</p>
          {amount > currentBalance && <p className="text-[8px] text-red-500 font-black uppercase mt-1">Saldo tidak mencukupi</p>}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`py-3.5 rounded-2xl font-black transition-all text-[10px] uppercase tracking-wide border shadow-sm ${
                amount === p 
                  ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-50' 
                  : 'bg-white text-gray-500 border-gray-50 hover:bg-gray-50'
              }`}
            >
              {p / 1000}rb
            </button>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-3xl border border-blue-100 flex gap-3">
          <i className="fa-solid fa-circle-info text-blue-500 text-xs mt-0.5"></i>
          <p className="text-[9px] text-blue-700 font-medium leading-relaxed">
            Kirim saldo ke teman atau keluarga kini lebih mudah melalui Bank atau E-Wallet apa saja. Biaya admin mulai dari Rp 0!
          </p>
        </div>
      </div>

      <div className="p-6 pb-12 bg-white">
        <button
          onClick={handleNext}
          disabled={amount <= 0 || amount > currentBalance}
          className={`w-full py-4 rounded-[1.5rem] font-black text-white text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${
            amount > 0 && amount <= currentBalance
              ? 'bg-blue-600 shadow-blue-100' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Pilih Rekening Tujuan
        </button>
      </div>
    </div>
  );
};
