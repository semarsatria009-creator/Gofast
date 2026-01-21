
import React, { useState } from 'react';

interface TopUpProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

export const TopUp: React.FC<TopUpProps> = ({ onBack, onConfirm }) => {
  const [amount, setAmount] = useState<number>(0);

  const presets = [20000, 50000, 100000, 200000, 500000, 1000000];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      {/* Header - Ultra Compact */}
      <div className="px-6 pt-12 pb-2 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Pilih Nominal</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Langkah 1 dari 3</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-6 pt-4">
        <div className="py-8 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100 mb-8">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Nominal Top Up</p>
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
          <div className="w-24 h-0.5 bg-sky-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`py-3.5 rounded-2xl font-black transition-all text-[10px] uppercase tracking-wide border shadow-sm ${
                amount === p 
                  ? 'bg-sky-500 text-white border-sky-500 ring-4 ring-sky-50' 
                  : 'bg-white text-gray-500 border-gray-50'
              }`}
            >
              {p / 1000}rb
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 pb-12">
        <button
          onClick={() => amount > 0 && onConfirm(amount)}
          disabled={amount <= 0}
          className={`w-full py-4 rounded-[1.5rem] font-black text-white text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${
            amount > 0 
              ? 'bg-sky-500 shadow-sky-100' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Lanjut Pilih Metode
        </button>
      </div>
    </div>
  );
};
