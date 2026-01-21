
import React, { useState } from 'react';

interface ProfilePaymentProps {
  onBack: () => void;
  balance: number;
  linkedBanks: any[];
  onAddBank: (bank: any) => void;
  onRemoveBank: (id: string) => void;
  onTopUp: () => void;
}

const BANK_OPTIONS = ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Permata", "Bank Jago", "SeaBank"];

export const ProfilePayment: React.FC<ProfilePaymentProps> = ({ onBack, balance, linkedBanks, onAddBank, onRemoveBank, onTopUp }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBank, setNewBank] = useState({ name: '', number: '', holder: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBank.name || !newBank.number || !newBank.holder) return;

    const bankStyle = {
      icon: 'fa-building-columns',
      color: newBank.name === 'BCA' ? 'text-blue-600' : newBank.name === 'Mandiri' ? 'text-yellow-600' : 'text-indigo-600',
      bg: newBank.name === 'BCA' ? 'bg-blue-50' : newBank.name === 'Mandiri' ? 'bg-yellow-50' : 'bg-indigo-50'
    };

    onAddBank({
      ...newBank,
      ...bankStyle
    });
    
    setNewBank({ name: '', number: '', holder: '' });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in pb-12 relative overflow-hidden">
      {/* Modal Tambah Rekening */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white w-full rounded-t-[3rem] p-8 shadow-2xl animate-slide-up max-w-md">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Tambah Rekening Baru</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Bank</label>
                <select 
                  required
                  value={newBank.name}
                  onChange={e => setNewBank({...newBank, name: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-3.5 px-5 text-xs font-black text-gray-900 focus:border-blue-500 focus:bg-white outline-none transition-all appearance-none"
                >
                  <option value="">-- Pilih Bank --</option>
                  {BANK_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor Rekening</label>
                <input 
                  required
                  type="number"
                  placeholder="Contoh: 123456789"
                  value={newBank.number}
                  onChange={e => setNewBank({...newBank, number: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-3.5 px-5 text-xs font-black text-gray-900 focus:border-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Pemilik (Sesuai Buku)</label>
                <input 
                  required
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={newBank.holder}
                  onChange={e => setNewBank({...newBank, holder: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-3.5 px-5 text-xs font-black text-gray-900 focus:border-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-2 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-all"
                >
                  Simpan Rekening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center gap-4 sticky top-0 z-10 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Metode Pembayaran</h1>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex justify-between items-center relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Saldo GoFast</p>
              <p className="text-xl font-black text-gray-900 tracking-tight">Rp {balance.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <button 
            onClick={onTopUp}
            className="bg-green-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 relative z-10 active:scale-95 transition-transform"
          >
            Isi
          </button>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50 rounded-full blur-2xl opacity-50"></div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-[0.2em]">Rekening Tersimpan</h3>
              <button 
                onClick={() => setShowAddModal(true)}
                className="text-[9px] font-black text-blue-600 uppercase flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus-circle text-xs"></i> Tambah Baru
              </button>
           </div>
           
           {linkedBanks.length === 0 ? (
             <div className="bg-white p-10 rounded-[2.5rem] border border-dashed border-gray-200 text-center animate-fade-in">
                <i className="fa-solid fa-building-columns text-gray-100 text-3xl mb-3"></i>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Belum ada rekening</p>
             </div>
           ) : (
             <div className="space-y-3">
                {linkedBanks.map((bank) => (
                  <div key={bank.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group animate-scale-up">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg ${bank.color} ${bank.bg}`}>
                        <i className={`fa-solid ${bank.icon}`}></i>
                      </div>
                      <div>
                        <p className="font-black text-xs text-gray-900">{bank.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{bank.number}</p>
                        <p className="text-[8px] text-blue-500 font-black uppercase mt-0.5 truncate max-w-[120px]">A/N {bank.holder}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveBank(bank.id)}
                      className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90 flex items-center justify-center"
                    >
                       <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                ))}
             </div>
           )}
        </div>

        <div className="p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex gap-4 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                 <i className="fa-solid fa-shield-check text-blue-600"></i>
                 <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Keamanan Terjamin</h4>
              </div>
              <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
                GoFast menggunakan standar enkripsi perbankan internasional untuk melindungi data Anda.
              </p>
           </div>
           <i className="fa-solid fa-lock absolute -right-4 -bottom-4 text-blue-600/5 text-7xl rotate-12"></i>
        </div>
      </div>
    </div>
  );
};
