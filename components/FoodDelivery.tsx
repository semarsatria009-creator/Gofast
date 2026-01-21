
import React, { useState, useMemo } from 'react';
import { RESTAURANTS, TOPPING_OPTIONS } from '../constants.ts';
import { Restaurant, FoodItem, CartItem, AppView } from '../types.ts';
import { getSmartFoodRecommendations } from '../services/geminiService.ts';

interface FoodDeliveryProps {
  onBack: () => void;
  onCheckout: (cart: CartItem[], restaurant: Restaurant) => void;
}

const FOOD_CATEGORIES = [
  { id: 'near', name: 'Terdekat', icon: 'fa-location-arrow', special: true },
  { id: 'all', name: 'Semua', icon: 'fa-utensils' },
  { id: 'Indonesian', name: 'Indonesia', icon: 'fa-pepper-hot' },
  { id: 'Japanese', name: 'Jepang', icon: 'fa-fish' },
  { id: 'Fast Food', name: 'Cepat Saji', icon: 'fa-burger' },
  { id: 'Beverage', name: 'Minuman', icon: 'fa-mug-hot' },
  { id: 'Healthy', name: 'Sehat', icon: 'fa-leaf' },
];

export const FoodDelivery: React.FC<FoodDeliveryProps> = ({ onBack, onCheckout }) => {
  const [selectedResto, setSelectedResto] = useState<Restaurant | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tempNote, setTempNote] = useState('');
  const [tempQty, setTempQty] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const filteredRestaurants = useMemo(() => {
    let result = RESTAURANTS.filter(r => {
      const matchesCategory = activeCategory === 'all' || 
                             (activeCategory === 'near' && parseFloat(r.distance) < 2.5) ||
                             r.category === activeCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           r.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (activeCategory === 'near') {
      result = [...result].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }

    return result;
  }, [activeCategory, searchQuery]);

  const featuredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => r.rating >= 4.7);
  }, []);

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAskingAI(true);
    const recs = await getSmartFoodRecommendations(aiPrompt);
    setRecommendations(recs);
    setIsAskingAI(false);
  };

  const openFoodDetail = (item: FoodItem) => {
    const existing = cart.find(i => i.id === item.id);
    setSelectedFood(item);
    setTempQty(existing ? existing.quantity : 1);
    setTempNote(existing ? (existing.note || '') : '');
    setSelectedToppings(existing?.selectedToppings || []);
  };

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId) 
        : [...prev, toppingId]
    );
  };

  const currentToppingPrice = useMemo(() => {
    return selectedToppings.reduce((total, id) => {
      const topping = TOPPING_OPTIONS.find(t => t.id === id);
      return total + (topping?.price || 0);
    }, 0);
  }, [selectedToppings]);

  const handleConfirmAddToCart = () => {
    if (!selectedFood) return;
    setCart(prev => {
      // Remove existing to avoid duplicates, then add new one
      const filtered = prev.filter(i => i.id !== selectedFood.id);
      return [...filtered, { 
        ...selectedFood, 
        quantity: tempQty, 
        note: tempNote,
        selectedToppings: selectedToppings,
        price: selectedFood.price + currentToppingPrice // Base price + toppings in cart
      }];
    });
    setSelectedFood(null);
  };

  const addToCartDirect = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, note: '' }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const totalCartPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const MOCK_MENU: FoodItem[] = [
    { id: 'm1', name: 'Paket Nasi Hemat', price: 25000, description: 'Nasi putih hangat dengan ayam goreng krispi, sambal bawang, dan es teh manis segar.', image: 'https://picsum.photos/seed/menu1/500/500' },
    { id: 'm2', name: 'Nasi Spesial GoFast', price: 45000, description: 'Nasi goreng bumbu rahasia dengan topping lengkap sosis, telur mata sapi, bakso sapi, dan kerupuk udang.', image: 'https://picsum.photos/seed/menu2/500/500' },
    { id: 'm3', name: 'Es Teh Segar', price: 8000, description: 'Teh melati pilihan yang diseduh segar setiap hari dengan gula asli dan es kristal.', image: 'https://picsum.photos/seed/menu3/500/500' },
  ];

  if (selectedFood) {
    const basePrice = selectedFood.price;
    const finalItemPrice = basePrice + currentToppingPrice;

    return (
      <div className="fixed inset-0 z-[100] bg-white animate-fade-in flex flex-col h-full overflow-hidden">
        <div className="relative h-64 shrink-0">
          <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <button 
            onClick={() => setSelectedFood(null)} 
            className="absolute top-10 left-5 w-10 h-10 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center text-gray-800 active:scale-90 transition-all border border-white/50"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-40 hide-scrollbar">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{selectedFood.name}</h1>
            <span className="text-base font-black text-green-600">Rp {basePrice.toLocaleString('id-ID')}</span>
          </div>
          
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-6">
            {selectedFood.description}
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
              <div>
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Kategori Topping</h3>
                <p className="text-[8px] text-gray-400 font-bold uppercase mt-0.5">Opsional • Pilih sesukamu</p>
              </div>
              {selectedToppings.length > 0 && (
                <button onClick={() => setSelectedToppings([])} className="text-[8px] font-black text-red-500 uppercase tracking-widest">Reset</button>
              )}
            </div>
            
            <div className="space-y-2">
              {TOPPING_OPTIONS.map((topping) => (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                    selectedToppings.includes(topping.id) 
                      ? 'border-green-600 bg-green-50/50' 
                      : 'border-gray-50 bg-gray-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      selectedToppings.includes(topping.id) ? 'bg-green-600 border-green-600' : 'bg-white border-gray-200'
                    }`}>
                      {selectedToppings.includes(topping.id) && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                    </div>
                    <span className={`text-[11px] font-bold ${selectedToppings.includes(topping.id) ? 'text-green-900' : 'text-gray-600'}`}>{topping.name}</span>
                  </div>
                  <span className={`text-[10px] font-black ${selectedToppings.includes(topping.id) ? 'text-green-600' : 'text-gray-400'}`}>+Rp {topping.price.toLocaleString('id-ID')}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100">
             <div className="flex items-center gap-2 mb-3">
               <i className="fa-solid fa-pen-to-square text-gray-400 text-[10px]"></i>
               <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Catatan Khusus</h3>
             </div>
             <textarea 
               value={tempNote}
               onChange={(e) => setTempNote(e.target.value)}
               placeholder="Contoh: Telur matang sempurna, tanpa sayur..."
               className="w-full bg-white border-none rounded-xl p-4 text-[10px] font-medium focus:ring-2 focus:ring-green-500 placeholder:text-gray-300 min-h-[80px] resize-none shadow-sm"
             />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl p-6 pb-10 border-t border-gray-100 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[2.5rem] z-50">
           <div className="max-w-md mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => setTempQty(Math.max(1, tempQty - 1))}
                  className="w-9 h-9 bg-white text-gray-400 rounded-xl flex items-center justify-center shadow-sm active:scale-90"
                >
                  <i className="fa-solid fa-minus text-[10px]"></i>
                </button>
                <span className="text-sm font-black text-gray-900 min-w-[15px] text-center">{tempQty}</span>
                <button 
                  onClick={() => setTempQty(tempQty + 1)}
                  className="w-9 h-9 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-md active:scale-90"
                >
                  <i className="fa-solid fa-plus text-[10px]"></i>
                </button>
              </div>
              
              <button 
                onClick={handleConfirmAddToCart}
                className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-green-100 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Tambah • Rp {(finalItemPrice * tempQty).toLocaleString('id-ID')}
              </button>
           </div>
        </div>
      </div>
    );
  }

  if (selectedResto) {
    return (
      <div className="min-h-screen bg-white pb-32 animate-fade-in">
        <div className="relative h-44">
          <img src={selectedResto.image} alt={selectedResto.name} className="w-full h-full object-cover" />
          <button onClick={() => setSelectedResto(null)} className="absolute top-10 left-5 w-8 h-8 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left text-xs"></i>
          </button>
        </div>
        <div className="px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-gray-50 mb-5">
            <div className="flex justify-between items-start mb-1.5">
              <h1 className="text-lg font-black text-gray-900 tracking-tight leading-tight">{selectedResto.name}</h1>
              <div className="flex items-center gap-1 bg-yellow-400 text-white px-1.5 py-0.5 rounded-lg font-black text-[9px] shadow-sm">
                <i className="fa-solid fa-star"></i> {selectedResto.rating}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[8px] text-gray-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot text-[7px]"></i> {selectedResto.distance}</span>
              <span className="opacity-30">•</span>
              <span>{selectedResto.category}</span>
              <span className="opacity-30">•</span>
              <span className="text-green-600">Buka</span>
            </div>
          </div>

          <h2 className="text-[10px] font-black text-gray-900 mb-3 px-1 uppercase tracking-widest">Menu Favorit</h2>
          <div className="space-y-3.5">
            {MOCK_MENU.map((item) => {
              const inCart = cart.find(i => i.id === item.id);
              return (
                <div key={item.id} className="group px-1">
                  <div 
                    className="flex gap-3 cursor-pointer"
                    onClick={() => openFoodDetail(item)}
                  >
                    <div className="relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-0.5">
                        <h3 className="font-black text-gray-900 text-[11px] leading-tight mb-0.5">{item.name}</h3>
                        <p className="text-[8px] text-gray-400 font-medium line-clamp-1 leading-tight">{item.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-black text-green-600 text-xs">Rp {item.price.toLocaleString('id-ID')}</span>
                        {inCart ? (
                          <div className="flex items-center gap-2 bg-gray-50 p-0.5 rounded-lg border border-gray-100" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => removeFromCart(item.id)} className="w-5 h-5 bg-white text-gray-400 rounded-md flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                              <i className="fa-solid fa-minus text-[7px]"></i>
                            </button>
                            <span className="font-black text-[9px] min-w-[12px] text-center text-gray-900">{inCart.quantity}</span>
                            <button onClick={() => addToCartDirect(item)} className="w-5 h-5 bg-green-600 text-white rounded-md flex items-center justify-center shadow-md active:scale-90 transition-transform">
                              <i className="fa-solid fa-plus text-[7px]"></i>
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); openFoodDetail(item); }} 
                            className="w-6 h-6 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm active:scale-90"
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i>
                          </button>
                        )}
                      </div>
                      {inCart && inCart.selectedToppings && inCart.selectedToppings.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                           {inCart.selectedToppings.map(tid => {
                             const topping = TOPPING_OPTIONS.find(t => t.id === tid);
                             return topping ? (
                               <span key={tid} className="text-[7px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-bold uppercase">+{topping.name}</span>
                             ) : null;
                           })}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {inCart && (
                    <div className="mt-1.5 ml-16">
                      <button 
                        onClick={() => openFoodDetail(item)}
                        className="flex items-center gap-1.5 text-gray-300 hover:text-green-600 transition-colors"
                      >
                        <i className="fa-solid fa-pen-to-square text-[7px]"></i>
                        <span className="text-[8px] font-bold italic">
                          {inCart.note ? `"${inCart.note}"` : 'Ubah catatan & topping...'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/60 backdrop-blur-sm border-t border-white/20">
            <div className="max-w-md mx-auto">
              <button 
                onClick={() => onCheckout(cart, selectedResto)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-black shadow-2xl flex justify-between px-4 items-center active:scale-95 transition-transform"
              >
                <div className="flex gap-2 items-center">
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[8px] font-black tracking-widest">{totalItems} ITEM</span>
                  <span className="text-[9px] uppercase tracking-widest">Pesan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-tight">Rp {totalCartPrice.toLocaleString('id-ID')}</span>
                  <i className="fa-solid fa-chevron-right text-[7px] opacity-50"></i>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <div className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-50">
        <div className="px-5 pt-12 pb-3">
          <div className="flex items-center gap-2.5">
            <button onClick={onBack} className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-90 transition-transform">
              <i className="fa-solid fa-arrow-left text-xs"></i>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu atau resto..."
                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-[9px] font-bold focus:ring-2 focus:ring-green-500 placeholder:text-gray-300"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[9px]"></i>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar px-5 pb-3">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[8px] font-black whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                  ? cat.special 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-green-600 text-white border-green-600 shadow-sm'
                  : cat.special 
                    ? 'bg-blue-50 text-blue-600 border-blue-100' 
                    : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              <i className={`fa-solid ${cat.icon} text-[8px]`}></i>
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {activeCategory === 'all' && !searchQuery && (
          <section className="mb-6">
            <div className="px-5 flex justify-between items-end mb-3">
              <div>
                <h2 className="text-[11px] font-black text-gray-900 tracking-tight uppercase">Paling Laris</h2>
                <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Rating 4.7+</p>
              </div>
              <button className="text-[7px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md active:scale-95 transition-transform">Cek Semua</button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-5">
              {featuredRestaurants.map((resto) => (
                <button
                  key={resto.id}
                  onClick={() => setSelectedResto(resto)}
                  className="min-w-[145px] max-w-[145px] bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 text-left active:scale-[0.96] transition-all group"
                >
                  <div className="h-20 relative overflow-hidden bg-gray-50">
                    <img src={resto.image} alt={resto.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-1.5 right-1.5 bg-white/70 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-[8px] font-black text-gray-900 flex items-center gap-0.5 shadow-sm border border-white/50">
                      <i className="fa-solid fa-star text-yellow-400"></i> {resto.rating}
                    </div>
                    {resto.isPromo && (
                      <div className="absolute bottom-1 left-1 bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md shadow-lg">
                        DISKON
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-[10px] font-black text-gray-900 line-clamp-1 mb-1 tracking-tight group-hover:text-green-600 transition-colors leading-none">{resto.name}</h3>
                    <p className="text-[7px] text-gray-400 font-bold uppercase truncate mb-1.5">{resto.category} • Menteng</p>
                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-50">
                       <div className="flex items-center gap-1">
                          <i className="fa-solid fa-clock text-[7px] text-gray-300"></i>
                          <span className="text-[8px] font-black text-gray-500">20-30m</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <i className="fa-solid fa-location-arrow text-[7px] text-gray-300"></i>
                          <span className="text-[8px] font-black text-gray-500">{resto.distance}</span>
                       </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="px-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-[10px] font-black text-gray-900 tracking-tight uppercase tracking-widest">
              Daftar Restoran
            </h2>
            <span className="text-[8px] text-gray-300 font-black tracking-widest uppercase">{filteredRestaurants.length} Tersedia</span>
          </div>
          
          <div className="space-y-1.5">
            {filteredRestaurants.map((resto) => (
              <button
                key={resto.id}
                onClick={() => setSelectedResto(resto)}
                className="w-full bg-white rounded-[1.2rem] p-2 flex gap-3 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all group"
              >
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <img 
                    src={resto.image} 
                    alt={resto.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {resto.isPromo && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white px-1 py-0.5 rounded-br-lg text-[6px] font-black shadow-lg uppercase">
                      PROMO
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h3 className="text-[11px] font-black text-gray-900 line-clamp-1 leading-tight mb-0.5">{resto.name}</h3>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-tight text-gray-900">
                      <div className="flex items-center gap-0.5">
                        <i className="fa-solid fa-star text-yellow-400 text-[7px]"></i> {resto.rating}
                      </div>
                      <span className="text-gray-200">|</span>
                      <div className="text-gray-400">
                        {resto.distance}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                      <span className="text-[7px] text-gray-300 font-bold uppercase truncate max-w-[80px]">{resto.category}</span>
                      <span className="text-[7px] font-black text-green-600 bg-green-50 px-1 py-0.5 rounded-md uppercase border border-green-100">
                        Hemat Ongkir
                      </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 mt-6 mb-12">
           <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-[2rem] p-4 text-white shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-2xl rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                       <i className="fa-solid fa-wand-magic-sparkles text-purple-300 text-[10px]"></i>
                    </div>
                    <div>
                       <h3 className="text-[11px] font-black tracking-tight leading-tight">Bingung mau makan apa?</h3>
                       <p className="text-[7px] text-white/50 font-black uppercase tracking-widest">Tanya AI GoFast</p>
                    </div>
                 </div>

                 <div className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-xl p-1.5 flex gap-1.5">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Lagi pengen yang pedes..."
                      className="flex-1 bg-transparent border-none rounded-lg px-2 py-1.5 text-[9px] focus:ring-0 placeholder:text-white/20 font-bold"
                    />
                    <button
                      onClick={handleAskAI}
                      disabled={isAskingAI}
                      className="bg-white text-indigo-900 w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50 active:scale-90 transition-transform"
                    >
                      {isAskingAI ? <div className="w-3 h-3 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div> : <i className="fa-solid fa-bolt-lightning text-[9px]"></i>}
                    </button>
                 </div>
                 
                 {recommendations.length > 0 && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                        {recommendations.map((rec, i) => (
                            <div key={i} className="text-[9px] bg-white/5 backdrop-blur-xl p-2.5 rounded-xl border border-white/10">
                                <div className="flex justify-between items-start mb-0.5">
                                    <p className="font-black text-white">{rec.name}</p>
                                    <span className="text-[6px] bg-yellow-400 text-gray-900 px-1 py-0.5 rounded-md font-black uppercase">Rekomendasi</span>
                                </div>
                                <p className="text-[8px] text-white/60 leading-tight mb-1 line-clamp-2">{rec.description}</p>
                                <div className="flex justify-between items-center pt-1.5 border-t border-white/5">
                                   <span className="text-[8px] font-black text-green-400">Est. Rp {rec.priceEstimate.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};
