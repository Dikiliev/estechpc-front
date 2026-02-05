import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, Package } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigateProduct }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const results = query.trim() === '' 
    ? [] 
    : MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-white font-mono uppercase tracking-widest text-sm">Глобальный поиск</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-16 group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-estech-accent transition-colors" size={32} strokeWidth={1.5} />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Поиск по модели, категории или артикулу..."
            className="w-full bg-transparent border-b border-gray-800 py-6 pl-12 text-2xl md:text-4xl text-white outline-none focus:border-estech-accent placeholder-gray-700 transition-colors font-sans font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh] pb-20">
          {query === '' ? (
            <div className="text-gray-600 font-mono text-sm">
              <p className="mb-4">ПОПУЛЯРНЫЕ ЗАПРОСЫ:</p>
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setQuery('RTX 4090')}>RTX 4090</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setQuery('OLED')}>OLED Monitor</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => setQuery('i9-14900K')}>Intel Core i9</li>
              </ul>
            </div>
          ) : results.length === 0 ? (
            <div className="text-gray-500 font-light flex items-center gap-3">
              <Package size={24} /> Ничего не найдено по запросу "{query}"
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {results.map(product => (
                <div 
                  key={product.id}
                  onClick={() => {
                    onNavigateProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-6 p-4 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-black flex-shrink-0">
                    <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-lg group-hover:text-estech-accent transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-xs font-mono uppercase">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-mono block">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <span className="text-estech-accent text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                      Перейти <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};