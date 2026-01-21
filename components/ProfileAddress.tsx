
import React, { useState } from 'react';

interface AddressItem {
  id: string;
  type: string;
  addr: string;
  icon: string;
}

interface ProfileAddressProps {
  onBack: () => void;
  addresses: AddressItem[];
  onAdd: (address: any) => void;
  onEdit: (id: string, address: any) => void;
  onDelete: (id: string) => void;
}

const ICON_OPTIONS = [
  { label: 'Rumah', icon: 'fa-house-chimney' },
  { label: 'Kantor', icon: 'fa-briefcase' },
  { label: 'Kos', icon: 'fa-building' },
  { label: 'Lainnya', icon: 'fa-location-dot' }
];

export const ProfileAddress: React.FC<ProfileAddressProps> = ({ onBack, addresses, onAdd, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ type: '', addr: '', icon: ICON_OPTIONS[0].icon });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ type: '', addr: '', icon: ICON_OPTIONS[0].icon });
    setShowModal(true);
  };

  const handleOpenEdit = (item: AddressItem) => {
    setEditingId(item.id);
    setFormData({ type: item.type, addr: item.addr, icon: item.icon });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.addr) return;

    if (editingId) {
      onEdit(editingId, formData);
    } else {
      onAdd(formData);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in relative overflow-hidden pb-12">
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full rounded-t-[3rem] p-8 shadow-2xl animate-slide-up max-w-md">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">
              {editingId ? 'Edit Alamat' : 'Tambah Alamat Baru'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Label Lokasi</label>
                <input 
                  required
                  type="text"
                  placeholder="Contoh: Rumah, Kantor, Kost..."
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-3.5 px-5 text-xs font-black text-gray-900 focus:border-orange-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Nama jalan, nomor gedung, patokan..."
                  value={formData.addr}
                  onChange={e => setFormData({...formData, addr: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-3.5 px-5 text-xs font-bold text-gray-900 focus:border-orange-500 focus:bg-white outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Ikon</label>
                <div className="flex gap-2">
                  {ICON_OPTIONS.map((opt) => (
                    <button
                      key={opt.icon}
                      type="button"
                      onClick={() => setFormData({...formData, icon: opt.icon})}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                        formData.icon === opt.icon ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-50 bg-gray-50 text-gray-300'
                      }`}
                    >
                      <i className={`fa-solid ${opt.icon} text-sm`}></i>
                      <span className="text-[7px] font-black uppercase">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-2 px-10 py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all"
                >
                  {editingId ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white px-6 pt-12 pb-6 shadow-sm flex items-center gap-4 sticky top-0 z-10 border-b border-gray-50">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Alamat Tersimpan</h1>
      </div>

      <div className="p-6 space-y-4">
        {addresses.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center animate-fade-in">
            <i className="fa-solid fa-map-location-dot text-gray-100 text-4xl mb-4"></i>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Belum ada alamat</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4 group animate-scale-up">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg bg-orange-50 text-orange-600 shrink-0`}>
                  <i className={`fa-solid ${a.icon}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[12px] text-gray-900 leading-tight">{a.type}</h3>
                  <p className="text-[10px] text-gray-400 font-medium line-clamp-1 mt-0.5">{a.addr}</p>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => handleOpenEdit(a)}
                    className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <i className="fa-solid fa-pen text-[10px]"></i>
                  </button>
                  <button 
                    onClick={() => onDelete(a.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <i className="fa-solid fa-trash-can text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button 
          onClick={handleOpenAdd}
          className="w-full mt-4 py-4 bg-white border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-orange-500 hover:text-orange-600 transition-all active:scale-98"
        >
          <i className="fa-solid fa-plus-circle"></i>
          Tambah Alamat Baru
        </button>
      </div>

      <div className="px-6">
        <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100 flex gap-4">
           <i className="fa-solid fa-circle-info text-orange-600 mt-1 text-xs"></i>
           <p className="text-[10px] text-orange-800 font-medium leading-relaxed">
             Alamat yang Anda simpan akan muncul secara otomatis saat Anda melakukan pemesanan ojek atau makanan.
           </p>
        </div>
      </div>
    </div>
  );
};
