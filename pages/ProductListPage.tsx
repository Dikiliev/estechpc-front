import React, { useState, useMemo } from 'react';
import { FilterState } from '../types';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000000, 
    sortBy: 'popular',
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    
    if (filters.category && filters.category !== 'all') {
      const parentCat = CATEGORIES.find(c => c.id === filters.category);
      if (parentCat && parentCat.subcategories) {
        const childIds = parentCat.subcategories.map(s => s.id);
        result = result.filter(p => childIds.includes(p.category));
      } else {
        result = result.filter(p => p.category === filters.category);
      }
    }

    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'popular') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [filters]);

  // Reusable Filter Content
  const FilterContent = () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-6">Категории</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col">
              <button
                onClick={() => setFilters({...filters, category: cat.id})}
                className={`text-left text-sm transition-all duration-300 py-1 flex items-center justify-between group ${
                  filters.category === cat.id 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
              
              {cat.subcategories && (
                <div className="ml-4 flex flex-col gap-1 mt-1 border-l border-white/10 pl-4 py-1">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setFilters({...filters, category: sub.id})}
                      className={`text-left text-xs transition-colors py-1 ${
                        filters.category === sub.id 
                          ? 'text-estech-accent' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-6">Бюджет (₽)</h3>
         <div className="mb-4">
            <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
               <span>От</span>
               <span className="text-white font-mono">{filters.minPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={filters.minPrice}
              onChange={(e) => {
                 const val = Number(e.target.value);
                 setFilters(prev => ({ ...prev, minPrice: Math.min(val, prev.maxPrice) }));
              }}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-white transition-all"
            />
         </div>

         <div className="mb-4">
            <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
               <span>До</span>
               <span className="text-white font-mono">{filters.maxPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={filters.maxPrice}
              onChange={(e) => {
                 const val = Number(e.target.value);
                 setFilters(prev => ({ ...prev, maxPrice: Math.max(val, prev.minPrice) }));
              }}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-estech-accent [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all"
            />
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20 border-b border-white/10 pb-8">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">КАТАЛОГ</h1>
            <p className="text-gray-400 font-light max-w-sm text-sm md:text-base">
              Изучите наш ассортимент прецизионного оборудования.
            </p>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-8 md:mt-0">
             {/* Mobile Filter Button */}
             <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 text-white border border-white/20 px-4 py-2 text-xs font-mono uppercase tracking-wider"
             >
                <SlidersHorizontal size={14} /> Фильтры
             </button>

             <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-500 uppercase tracking-widest mr-2 hidden md:inline">Сортировка</span>
                 <div className="relative group">
                    <select 
                      className="bg-transparent text-white border-b border-white/20 pb-1 pr-8 text-sm outline-none cursor-pointer hover:border-white transition-colors appearance-none rounded-none"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                    >
                      <option value="popular" className="bg-black text-white">Популярные</option>
                      <option value="price-asc" className="bg-black text-white">Цена: По возрастанию</option>
                      <option value="price-desc" className="bg-black text-white">Цена: По убыванию</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-0 pointer-events-none text-gray-500" size={16} />
                 </div>
             </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
           <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col md:hidden animate-fade-in">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                 <span className="text-white font-mono uppercase tracking-widest">Фильтры</span>
                 <button onClick={() => setIsMobileFiltersOpen(false)} className="text-white p-2">
                    <X size={24} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                 <FilterContent />
              </div>
              <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
                 <Button fullWidth variant="white" onClick={() => setIsMobileFiltersOpen(false)}>
                    Показать {filteredProducts.length} товаров
                 </Button>
              </div>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden md:block md:col-span-1">
             <FilterContent />
          </div>

          {/* Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onView={(p) => navigate(`/product/${p.id}`)}
                  onAddToCart={addToCart}
                  isInWishlist={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="py-20 text-center text-gray-500 font-mono flex flex-col items-center">
                    <p className="mb-4">Компоненты по заданным критериям не найдены.</p>
                    <button 
                      onClick={() => setFilters({category: 'all', minPrice: 0, maxPrice: 1000000, sortBy: 'popular'})}
                      className="text-xs uppercase border-b border-estech-accent pb-1 hover:text-white transition-colors"
                    >
                      Сбросить фильтры
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

