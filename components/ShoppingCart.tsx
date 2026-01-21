
import React from 'react';
import { ShoppingCartItem, Product } from '../types.ts';

interface ShoppingCartProps {
  cart: ShoppingCartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  balance: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ 
  cart, 
  onBack, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  balance 
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const isEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in pb-32">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Keranjang Belanja</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <i className="fa-solid fa-cart-shopping text-4xl"></i>
            </div>
            <h2 className="text-lg font-black text-gray-900 mb-2">Keranjang Kosong</h2>
            <p className="text-xs text-gray-400 font-medium max-w-[200px] leading-relaxed">
              Wah, keranjangmu masih kosong nih. Yuk, cari barang impianmu sekarang!
            </p>
            <button 
              onClick={onBack}
              className="mt-8 bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2 mb-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cart.length} Produk dipilih</p>
              <button className="text-[10px] font-black text-red-500 uppercase tracking-widest">Hapus Semua</button>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex gap-4 animate-slide-up">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm" />
                <div className="flex-1 flex flex-col py-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{item.shopName}</p>
                      <h3 className="text-xs font-black text-gray-900 line-clamp-1 mb-1">{item.name}</h3>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-xs font-black text-blue-600">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-3 bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-100">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-white text-gray-400 rounded-lg flex items-center justify-center shadow-sm active:scale-90"
                      >
                        <i className="fa-solid fa-minus text-[8px]"></i>
                      </button>
                      <span className="text-xs font-black text-gray-900 min-w-[15px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md active:scale-90"
                      >
                        <i className="fa-solid fa-plus text-[8px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 pb-10 border-t border-gray-100 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-50 rounded-t-[2.5rem]">
          <div className="max-w-md mx-auto">
            {/* Payment Summary Header */}
            <div className="flex justify-between items-end mb-6 px-2">
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Pesanan</p>
                <p className="text-2xl font-black text-blue-600 tracking-tighter">
                  Rp {subtotal.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Belum termasuk ongkir</p>
              </div>
            </div>
            
            {/* Primary Action Button - Always Enabled if cart not empty */}
            <button 
              onClick={onCheckout}
              className="w-full py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-200 hover:from-blue-700 hover:to-blue-800"
            >
              <span>Lanjut ke Checkout</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
            
            <p className="text-center text-[9px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
              Pilih metode pembayaran di halaman berikutnya
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
