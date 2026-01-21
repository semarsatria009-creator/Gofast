
import React from 'react';
import { Product, ActiveOrder } from '../types.ts';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  balance: number;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  balance, 
  onBuyNow,
  onAddToCart 
}) => {
  const handleBuy = () => {
    if (!product.inStock) return;
    onBuyNow(product);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-fade-in relative pb-32">
      {/* Header Over Image */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-12 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-800 shadow-xl pointer-events-auto active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="flex gap-3">
          <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-800 shadow-xl pointer-events-auto active:scale-90 transition-transform">
            <i className="fa-solid fa-share-nodes"></i>
          </button>
          <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-red-500 shadow-xl pointer-events-auto active:scale-90 transition-transform">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="h-[400px] relative w-full bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover ${!product.inStock ? 'grayscale opacity-60' : ''}`} 
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
            <span className="bg-white/95 text-gray-900 text-[10px] font-black px-6 py-2 rounded-2xl shadow-xl tracking-widest uppercase">STOK HABIS</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white rounded-t-[3.5rem] -mt-16 relative z-10 px-8 pt-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{product.name}</h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-xl">
              <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              <span className="text-xs font-black text-gray-900">{product.rating}</span>
            </div>
            <p className="text-[9px] text-gray-400 font-bold mt-2 uppercase tracking-widest">1k+ Terjual</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 py-5 border-y border-gray-50">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            <i className="fa-solid fa-shop text-gray-300 text-lg"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-black text-gray-900 leading-tight">{product.shopName}</h3>
            <p className="text-[9px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
              <i className="fa-solid fa-circle-check"></i> Terverifikasi
            </p>
          </div>
          <button className="text-[9px] font-black text-blue-600 border border-blue-100 bg-blue-50/30 px-3 py-1.5 rounded-xl uppercase tracking-widest">
            Kunjungi
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Tentang Produk</h2>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            {product.description || "Nikmati kualitas produk terbaik dari GoFast. Didesain dengan perhatian khusus pada kenyamanan dan performa untuk mendukung gaya hidup modern Anda."}
          </p>
        </div>

        {/* Info Pills - Compact */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
              <i className="fa-solid fa-shield-halved text-xs"></i>
            </div>
            <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tight">Garansi</p>
              <p className="text-[10px] font-black text-gray-900">12 Bulan</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm shrink-0">
              <i className="fa-solid fa-truck-fast text-xs"></i>
            </div>
            <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tight">Kirim</p>
              <p className="text-[10px] font-black text-gray-900">Instant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl p-6 pb-10 border-t border-gray-50 shadow-[0_-15px_40px_rgba(0,0,0,0.03)] z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button 
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 shrink-0 ${
              product.inStock 
                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                : 'bg-gray-50 text-gray-300'
            }`}
          >
            <i className="fa-solid fa-cart-plus text-lg"></i>
          </button>
          
          <button 
            disabled={!product.inStock}
            onClick={handleBuy}
            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 ${
              product.inStock 
                ? 'bg-blue-600 shadow-blue-100 hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
            }`}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
