import React from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onView, 
  isInWishlist, 
  onToggleWishlist 
}) => {
  return (
    <div 
      className="group relative cursor-pointer flex flex-col gap-4"
      onClick={() => onView(product)}
    >
      {/* Image Area - The Hero */}
      <div className="relative aspect-[4/4] bg-estech-surface w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Loading Placeholder */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="relative w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 desaturate-50 group-hover:grayscale-0"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        {/* Sale Badge - Moved to Top Left */}
        {product.oldPrice && (
           <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
             Sale
           </div>
        )}

        {/* Wishlist Button - Top Right */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black backdrop-blur-sm text-white transition-all duration-300 group/heart"
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-white group-hover/heart:text-red-400'}`} 
            />
          </button>
        )}
      </div>

      {/* Minimal Meta Data */}
      <div className="flex justify-between items-end border-b border-transparent group-hover:border-white/10 pb-4 transition-colors duration-300">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono">
            {product.category}
          </p>
          <h3 className="text-white font-medium text-lg leading-tight group-hover:text-estech-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <span className="block text-white font-mono font-medium text-lg">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
};