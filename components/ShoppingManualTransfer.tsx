
import React, { useState } from 'react';

interface ShoppingManualTransferProps {
  amount: number;
  onBack: () => void;
  onConfirm: (data: any) => void;
}

export const ShoppingManualTransfer: React.FC<ShoppingManualTransferProps> = ({ amount, onBack, onConfirm }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [senderBank, setSenderBank] = useState('');
  const [senderAccountNo, setSenderAccountNo] = useState('');
  const [senderName, setSenderName] = useState('');

  const isFormValid = senderBank && senderAccountNo && senderName && selectedFile;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!isFormValid) return;
    setIsUploading(true);
    
    // Simulasi proses upload & verifikasi formulir
    setTimeout(() => {
      setIsUploading(false);
      onConfirm({
        bank: senderBank,
        accountNo: senderAccountNo,
        name: senderName,
        proof: selectedFile
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform shrink-0">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">Konfirmasi Transfer</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Total Bill Info */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-[2.5rem] text-center text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Total yang harus ditransfer</p>
              <h2 className="text-3xl font-black tracking-tight leading-none">Rp {(amount + 456).toLocaleString('id-ID')}</h2>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full border border-white/20">
                <i className="fa-solid fa-circle-info text-[9px]"></i>
                <p className="text-[9px] font-black uppercase">Termasuk kode unik *456</p>
              </div>
           </div>
           <i className="fa-solid fa-money-check-dollar absolute -right-4 -bottom-4 text-white/10 text-8xl -rotate-12"></i>
        </div>

        {/* Destination Section */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kirim Ke Rekening Kami</h3>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-3.5" />
           </div>
           <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                 <div>
                    <p className="text-[8px] text-gray-400 font-black uppercase mb-0.5">Nomor Rekening</p>
                    <p className="text-sm font-black text-gray-900 tracking-widest">1234567890</p>
                 </div>
                 <button className="text-[9px] font-black text-blue-600 uppercase bg-white px-3 py-1.5 rounded-lg shadow-sm">Salin</button>
              </div>
              <div className="px-1">
                 <p className="text-[8px] text-gray-400 font-black uppercase mb-0.5">Atas Nama</p>
                 <p className="text-xs font-black text-gray-900 uppercase">PT GOFAST DIGITAL SHOPPING</p>
              </div>
           </div>
        </div>

        {/* Form Sender Details */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Data Bank Pengirim</h3>
           </div>
           
           <div className="space-y-4">
              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Nama Bank</label>
                 <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Contoh: BCA, Mandiri, BNI..."
                     value={senderBank}
                     onChange={(e) => setSenderBank(e.target.value)}
                     className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
                   />
                   <i className="fa-solid fa-building-columns absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 text-xs"></i>
                 </div>
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Nomor Rekening Anda</label>
                 <div className="relative">
                   <input 
                     type="number" 
                     placeholder="Masukkan nomor rekening pengirim"
                     value={senderAccountNo}
                     onChange={(e) => setSenderAccountNo(e.target.value)}
                     className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
                   />
                   <i className="fa-solid fa-hashtag absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 text-xs"></i>
                 </div>
              </div>

              <div>
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Nama Pemilik Rekening</label>
                 <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Sesuai buku tabungan"
                     value={senderName}
                     onChange={(e) => setSenderName(e.target.value)}
                     className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
                   />
                   <i className="fa-solid fa-user absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 text-xs"></i>
                 </div>
              </div>
           </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Bukti Pembayaran</h3>
           <label className={`w-full h-40 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer ${selectedFile ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              {selectedFile ? (
                <div className="animate-scale-up text-center px-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <i className="fa-solid fa-file-invoice text-xl"></i>
                  </div>
                  <p className="text-[10px] font-black text-green-700 uppercase tracking-tight line-clamp-1">{selectedFile.name}</p>
                  <p className="text-[8px] text-green-500 font-bold mt-1 uppercase">Klik untuk ganti file</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-sm mb-3">
                    <i className="fa-solid fa-camera-retro text-xl"></i>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pilih Gambar / Kamera</p>
                  <p className="text-[8px] text-gray-300 font-bold mt-2 uppercase">Format: JPG, PNG, PDF</p>
                </>
              )}
           </label>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-50">
           <p className="text-[9px] text-blue-800 font-medium leading-relaxed">
             <i className="fa-solid fa-shield-check mr-1.5"></i>
             Data yang Anda kirimkan terenkripsi aman dan hanya digunakan untuk keperluan verifikasi transaksi oleh tim keuangan GoFast.
           </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pb-12 bg-white border-t border-gray-50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <button 
          onClick={handleUpload}
          disabled={!isFormValid || isUploading}
          className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 text-white flex items-center justify-center gap-2 ${
            !isFormValid || isUploading ? 'bg-gray-200 shadow-none' : 'bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sedang Mengirim...</span>
            </div>
          ) : (
            <>Kirim Konfirmasi <i className="fa-solid fa-paper-plane text-[9px]"></i></>
          )}
        </button>
      </div>
    </div>
  );
};
