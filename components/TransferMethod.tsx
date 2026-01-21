
import React, { useState } from 'react';

interface TransferMethodProps {
  amount: number;
  onBack: () => void;
  onConfirm: (details: any) => void;
}

const BANKS = ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Permata", "Bank Jago", "SeaBank"];
const EWALLETS = ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"];

export const TransferMethod: React.FC<TransferMethodProps> = ({ amount, onBack, onConfirm }) => {
  const [category, setCategory] = useState<'bank' | 'wallet' | null>(null);
  
  // Bank Form State
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  // E-Wallet Form State
  const [walletName, setWalletName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category === 'bank') {
      if (!bankName || !accountNumber || !accountHolder) return;
      onConfirm({ type: 'bank', bankName, accountNumber, recipientName: accountHolder });
    } else {
      if (!walletName || !phoneNumber) return;
      onConfirm({ type: 'wallet', eWalletName: walletName, phoneNumber });
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden max-w-md mx-auto animate-fade-in">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight">Metode Kirim</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Nominal: Rp {amount.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {!category && (
           <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <button 
                onClick={() => setCategory('bank')}
                className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center gap-3 active:scale-95 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Bank</span>
              </button>
              <button 
                onClick={() => setCategory('wallet')}
                className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center gap-3 active:scale-95 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">E-Wallet</span>
              </button>
           </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        {category === 'bank' && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            <div className="flex justify-between items-center px-1">
               <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Detail Rekening Bank</h2>
               <button type="button" onClick={() => setCategory(null)} className="text-[9px] font-black text-blue-600 uppercase">Ganti Kategori</button>
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Bank</label>
              <select 
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">-- Klik untuk memilih bank --</option>
                {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor Rekening</label>
              <input
                type="number"
                placeholder="Masukkan nomor rekening..."
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Pemilik Rekening</label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-200"
                required
              />
            </div>

            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-all">
               Konfirmasi Penarikan Ke Bank
            </button>
          </form>
        )}

        {category === 'wallet' && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            <div className="flex justify-between items-center px-1">
               <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Detail E-Wallet</h2>
               <button type="button" onClick={() => setCategory(null)} className="text-[9px] font-black text-blue-600 uppercase">Ganti Kategori</button>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih E-Wallet</label>
              <select 
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 appearance-none"
                required
              >
                <option value="">-- Pilih E-Wallet tujuan --</option>
                {EWALLETS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor HP Terdaftar</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400">+62</span>
                <input
                  type="number"
                  placeholder="81234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-200"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
               <p className="text-[9px] text-purple-700 font-bold leading-relaxed">
                 <i className="fa-solid fa-circle-check mr-1"></i> 
                 Nama akun akan muncul otomatis saat verifikasi di langkah berikutnya.
               </p>
            </div>

            <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-purple-100 active:scale-95 transition-all">
               Konfirmasi Penarikan E-Wallet
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
