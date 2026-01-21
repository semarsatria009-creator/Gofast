
import React from 'react';

interface ProfileLanguageProps {
  onBack: () => void;
  currentLanguage: 'id' | 'en';
  onLanguageChange: (lang: 'id' | 'en') => void;
}

export const ProfileLanguage: React.FC<ProfileLanguageProps> = ({ onBack, currentLanguage, onLanguageChange }) => {
  const languages = [
    { id: 'id', name: 'Bahasa Indonesia', native: 'Indonesia', flag: '🇮🇩' },
    { id: 'en', name: 'English', native: 'United Kingdom', flag: '🇬🇧' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in">
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm flex items-center gap-4 sticky top-0 z-10 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Bahasa / Language</h1>
      </div>

      <div className="p-6 space-y-3">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Pilih Bahasa Utama</p>
        
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onLanguageChange(lang.id as 'id' | 'en')}
            className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
              currentLanguage === lang.id 
                ? 'border-green-600 bg-white shadow-md ring-1 ring-green-50' 
                : 'border-white bg-white shadow-sm hover:border-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{lang.flag}</div>
              <div className="text-left">
                <p className={`text-xs font-black ${currentLanguage === lang.id ? 'text-gray-900' : 'text-gray-500'}`}>{lang.name}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">{lang.native}</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              currentLanguage === lang.id ? 'bg-green-600 border-green-600' : 'border-gray-100'
            }`}>
              {currentLanguage === lang.id && <i className="fa-solid fa-check text-[10px] text-white"></i>}
            </div>
          </button>
        ))}

        <div className="mt-8 p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex gap-4 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                 <i className="fa-solid fa-globe text-blue-600 text-xs"></i>
                 <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Info Perubahan</h4>
              </div>
              <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
                Beberapa konten mungkin masih ditampilkan dalam bahasa aslinya tergantung pada ketersediaan data dari mitra merchant.
              </p>
           </div>
        </div>
      </div>
      
      <div className="mt-auto p-6 pb-12">
        <button 
          onClick={onBack}
          className="w-full py-4 bg-gray-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
