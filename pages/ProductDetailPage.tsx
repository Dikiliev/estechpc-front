import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, Plus, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl text-white mb-4">Товар не найден</h1>
        <Button onClick={() => navigate('/catalog')} variant="white">В каталог</Button>
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black pt-20 md:pt-24 pb-24 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 mb-6 md:mb-8">
        <button 
          onClick={() => navigate('/catalog')}
          className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Назад в каталог
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-0 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
        {/* Left: Image Gallery */}
        <div className="lg:sticky lg:top-32 h-fit">
          
          {/* Mobile: Horizontal Snap Scroll / Desktop: Stack */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:block">
              {/* Main Image */}
              <div className="snap-center shrink-0 w-full md:aspect-square bg-estech-surface aspect-[4/4] overflow-hidden relative md:mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              
              {/* Extra Images (Mocking gallery behavior) */}
              {[1, 2].map(i => (
                  <div key={i} className="snap-center shrink-0 w-full md:hidden bg-estech-surface aspect-[4/5] overflow-hidden relative">
                     <img src={product.image} className="w-full h-full object-cover" alt={`${product.name} ${i}`} />
                     <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
              ))}
          </div>
          
          {/* Thumbnails (Desktop Only) */}
          <div className="hidden md:grid grid-cols-4 gap-4">
             {[1,2,3].map(i => (
                <div key={i} className="aspect-square bg-estech-surface opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                   <img src={product.image} className="w-full h-full object-cover grayscale" alt={`${product.name} thumbnail ${i}`} />
                </div>
             ))}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>

        {/* Right: Info & Specs */}
        <div className="flex flex-col justify-center px-6 md:px-0">
           <div className="border-b border-white/10 pb-8 mb-8">
              <span className="text-estech-accent font-mono text-xs uppercase tracking-widest mb-4 block">
                Серия {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                {product.description}
              </p>
           </div>

           <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 md:gap-0">
              <div>
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Стоимость конфигурации</p>
                 <p className="text-3xl md:text-4xl font-mono text-white">{product.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Button 
                   variant="outline" 
                   onClick={() => toggleWishlist(product.id)}
                   className="px-4"
                >
                  <Heart 
                    size={20} 
                    className={`transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </Button>
                <Button size="lg" fullWidth onClick={() => addToCart(product)} className="md:w-auto">
                  В корзину <Plus size={16} className="ml-2" />
                </Button>
              </div>
           </div>

           {/* Technical Specs Grid */}
           <div className="mb-12">
              <h3 className="text-sm text-white uppercase tracking-widest font-bold mb-6">Технические Характеристики</h3>
              <div className="grid grid-cols-1 border-t border-white/10">
                 {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 py-4 border-b border-white/10 group hover:bg-white/5 transition-colors px-2">
                       <span className="text-sm text-gray-500 font-mono uppercase">{key}</span>
                       <span className="text-sm text-white font-medium text-right">{value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Recommended Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 pt-12 border-t border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">СОВМЕСТИМОЕ ОБОРУДОВАНИЕ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onView={(p) => navigate(`/product/${p.id}`)}
                onAddToCart={addToCart} 
                isInWishlist={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

