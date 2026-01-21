
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants.ts';
import { Product, AppView } from '../types.ts';
import { GoogleGenAI, Type } from "@google/genai";

interface ShoppingProps {
  onBack: () => void;
  balance: number;
  onOrderConfirm: (product: Product) => void;
  triggerNotification: (title: string, body: string, type?: 'info' | 'success' | 'order' | 'promo', orderId?: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onViewCart: () => void;
}

const SHOP_CATEGORIES = [
  { id: 'all', name: 'Semua', icon: 'fa-border-all' },
  { id: 'Elektronik', name: 'Elektronik', icon: 'fa-laptop' },
  { id: 'Fashion', name: 'Fashion', icon: 'fa-shirt' },
  { id: 'Kebutuhan', name: 'Kebutuhan', icon: 'fa-cart-shopping' },
  { id: 'Lifestyle', name: 'Lifestyle', icon: 'fa-bicycle' },
];

export const Shopping: React.FC<ShoppingProps> = ({ 
  onBack, 
  balance, 
  onOrderConfirm, 
  triggerNotification, 
  onProductClick,
  onAddToCart,
  cartCount,
  onViewCart
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [aiRecs, setAiRecs] = useState<any[]>([]);
  const [notifiedProductIds, setNotifiedProductIds] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.shopName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAskingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Rekomendasikan 2 produk belanja berdasarkan permintaan: "${aiPrompt}". 
        Berikan hasil dalam JSON array dengan properti: name, shopName, priceEstimate (number), and reasoning.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                shopName: { type: Type.STRING },
                priceEstimate: { type: Type.NUMBER },
                reasoning: { type: Type.STRING }
              },
              required: ["name", "shopName", "priceEstimate", "reasoning"]
            }
          }
        }
      });
      setAiRecs(JSON.parse(response.text || "[]"));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAskingAI(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    triggerNotification(
      "Berhasil!", 
      `${product.name} ditambah ke keranjang.`, 
      'info', 
      'shopping_cart'
    );
  };

  const handleNotifyMe = (product: Product) => {
    if (notifiedProductIds.has(product.id)) return;
    setNotifiedProductIds(prev => new Set(prev).add(product.id));
    triggerNotification("Berhasil Didaftarkan!", `Kami akan beritahu saat ${product.name} tersedia.`, 'info');
    setTimeout(() => {
      triggerNotification("Stok Tersedia!", `${product.name} sudah bisa dipesan kembali!`, 'success');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="px-6 pt-16 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-90 transition-transform shrink-0">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-bold focus:ring-2 focus:ring-blue-500"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-[10px]"></i>
            </div>
            <button 
              onClick={onViewCart}
              className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center active:scale-90 transition-transform relative shrink-0"
            >
              <i className="fa-solid fa-cart-shopping text-sm"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-6 pb-4">
          {SHOP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[9px] font-black whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              <i className={`fa-solid ${cat.icon} text-[8px]`}></i>
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* COMPACT AI SECTION */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-black mb-1">Butuh inspirasi?</h3>
            <p className="text-[8px] text-blue-100 font-bold mb-4 uppercase tracking-widest opacity-80">Asisten Belanja AI</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Mau cari apa hari ini?"
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-[10px] focus:ring-0 placeholder:text-white/40 font-bold"
              />
              <button 
                onClick={handleAskAI}
                disabled={isAskingAI}
                className="w-9 h-9 bg-white text-blue-700 rounded-xl flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50 shadow-md"
              >
                {isAskingAI ? <div className="w-3 h-3 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div> : <i className="fa-solid fa-sparkles text-xs"></i>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT GRID CATALOG */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-end mb-4 px-2">
          <div>
            <h2 className="text-sm font-black text-gray-900 tracking-tight">Pilihan Produk</h2>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Kualitas Terjamin</p>
          </div>
          <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest">{filteredProducts.length} Items</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-[0.98] transition-all hover:shadow-md h-full cursor-pointer relative"
              onClick={() => onProductClick(p)}
            >
              <div className="h-32 overflow-hidden relative bg-gray-50">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${!p.inStock ? 'grayscale opacity-50' : ''}`} 
                />
                {!p.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                    <span className="bg-white/95 text-gray-900 text-[8px] font-black px-3 py-1 rounded-lg shadow-sm tracking-widest uppercase border border-gray-100">Habis</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/70 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm border border-white/50">
                  <i className="fa-solid fa-star text-yellow-400 text-[7px]"></i>
                  <span className="text-[8px] font-black text-gray-700">{p.rating}</span>
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col">
                <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest truncate mb-1">{p.shopName}</p>
                <h4 className="text-[10px] font-black text-gray-900 line-clamp-2 leading-tight mb-2 h-7 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                
                <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                  <p className={`text-[11px] font-black ${p.inStock ? 'text-gray-900' : 'text-gray-300'}`}>
                    Rp {p.price.toLocaleString('id-ID')}
                  </p>
                  
                  {p.inStock ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                      className="w-7 h-7 bg-blue-600 text-white rounded-lg text-[10px] flex items-center justify-center active:scale-90 transition-all shadow-md shadow-blue-100"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotifyMe(p);
                      }}
                      disabled={notifiedProductIds.has(p.id)}
                      className={`w-7 h-7 rounded-lg text-[10px] flex items-center justify-center transition-all border ${
                        notifiedProductIds.has(p.id)
                          ? 'bg-gray-50 text-gray-300 border-gray-100'
                          : 'bg-white text-orange-600 border-orange-100 active:scale-95'
                      }`}
                    >
                      <i className="fa-solid fa-bell"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
