
import React from 'react';

interface ProfilePromoProps {
  onBack: () => void;
}

export const ProfilePromo: React.FC<ProfilePromoProps> = ({ onBack }) => {
  const myVouchers = [
    { id: 1, title: 'Diskon Makanan 20%', desc: 'Min. belanja Rp 40rb', expiry: '7 hari lagi', color: 'bg-red-500' },
    { id: 2, title: 'Gratis Ongkir 10rb', desc: 'Khusus GoBike', expiry: '2 hari lagi', color: 'bg-green-500' },
    { id: 3, title: 'Cashback GoPay 5rb', desc: 'Min. transfer Rp 50rb', expiry: '30 Jan 2024', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-700">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-bold">Promo Saya</h1>
      </div>
      <div className="p-6 space-y-4">
        {myVouchers.map((v) => (
          <div key={v.id} className="bg-white rounded-3xl overflow-hidden shadow-sm flex border border-gray-100 h-28">
            <div className={`w-3 ${v.color}`}></div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{v.title}</h3>
                <p className="text-[11px] text-gray-500 mt-1">{v.desc}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-red-500 font-bold">{v.expiry}</span>
                <button className="text-green-600 font-bold text-xs uppercase">Gunakan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
