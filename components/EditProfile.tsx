
import React, { useState } from 'react';
import { UserProfile } from '../types.ts';

interface EditProfileProps {
  profile: UserProfile;
  onBack: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ profile, onBack, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Mohon lengkapi semua data.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-40 border-b border-gray-50 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Edit Informasi Pribadi</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-28 h-28 rounded-[2.5rem] object-cover shadow-lg border-4 border-gray-50" 
              />
              <button 
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white active:scale-90 transition-transform"
              >
                <i className="fa-solid fa-camera text-sm"></i>
              </button>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Ubah Foto Profil</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-green-500 placeholder:text-gray-200 transition-all"
                />
                <i className="fa-solid fa-user absolute right-6 top-1/2 -translate-y-1/2 text-gray-200"></i>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Masukkan alamat email"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-green-500 placeholder:text-gray-200 transition-all"
                />
                <i className="fa-solid fa-envelope absolute right-6 top-1/2 -translate-y-1/2 text-gray-200"></i>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor HP</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Contoh: 08123456789"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-green-500 placeholder:text-gray-200 transition-all"
                />
                <i className="fa-solid fa-phone absolute right-6 top-1/2 -translate-y-1/2 text-gray-200"></i>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full py-5 bg-green-600 text-white rounded-[2rem] font-black shadow-xl shadow-green-100 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              Simpan Perubahan
              <i className="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
