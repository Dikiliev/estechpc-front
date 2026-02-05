import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
           <div>
              <div className="flex items-center gap-4 mb-4 text-estech-accent">
                 <Heart className="fill-current" size={24} />
                 <span className="text-xs font-mono uppercase tracking-widest">Сохраненные конфигурации</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">ИЗБРАННОЕ</h1>
           </div>
           <p className="text-gray-400 font-mono text-sm mt-4 md:mt-0">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'ТОВАР' : 'ТОВАРОВ'}
           </p>
        </div>

        {wishlistProducts.length === 0 ? (
           <div className="py-24 text-center border border-dashed border-white/10 rounded-lg">
              <h2 className="text-2xl text-white font-bold mb-4">Ваш список избранного пуст</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Сохраняйте понравившиеся системы и компоненты, чтобы вернуться к ним позже.</p>
              <button 
                 onClick={() => navigate('/catalog')}
                 className="text-sm font-bold uppercase tracking-widest border-b border-white text-white hover:text-estech-accent hover:border-estech-accent transition-colors pb-1"
              >
                 Перейти в каталог
              </button>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {wishlistProducts.map(product => (
                 <ProductCard 
                    key={product.id}
                    product={product}
                    onView={(p) => navigate(`/product/${p.id}`)}
                    onAddToCart={addToCart}
                    isInWishlist={true}
                    onToggleWishlist={toggleWishlist}
                 />
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

