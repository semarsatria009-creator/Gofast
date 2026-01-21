
import React from 'react';

interface ProfileHelpProps {
  onBack: () => void;
}

export const ProfileHelp: React.FC<ProfileHelpProps> = ({ onBack }) => {
  const topics = [
    { icon: 'fa-box', label: 'Pesanan & Pengiriman' },
    { icon: 'fa-wallet', label: 'Pembayaran & Saldo' },
    { icon: 'fa-user-shield', label: 'Keamanan Akun' },
    { icon: 'fa-gift', label: 'Promo & Hadiah' },
    { icon: 'fa-circle-info', label: 'Informasi Umum' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-700">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-bold">Pusat Bantuan</h1>
      </div>
      <div className="p-6">
        <div className="bg-green-600 rounded-3xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
          <h2 className="text-lg font-bold mb-1 relative z-10">Halo, ada masalah?</h2>
          <p className="text-sm opacity-80 relative z-10">Kami siap membantu Anda kapan saja.</p>
          <i className="fa-solid fa-headset absolute -right-4 -bottom-4 text-white/20 text-8xl"></i>
        </div>
        
        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Topik Populer</h3>
        <div className="space-y-3">
          {topics.map((t, i) => (
            <button key={i} className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-600">
                  <i className={`fa-solid ${t.icon}`}></i>
                </div>
                <span className="font-bold text-sm text-gray-700">{t.label}</span>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-300 text-sm"></i>
            </button>
          ))}
        </div>

        <button className="mt-8 w-full py-4 bg-white border-2 border-green-600 text-green-600 rounded-2xl font-bold shadow-sm active:bg-green-50">
          Chat Dengan Kami
        </button>
      </div>
    </div>
  );
};
