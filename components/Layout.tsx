import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartSidebar } from './CartSidebar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-200 font-sans">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
      />
      
      <main className="flex-grow">
        {children || <Outlet />}
      </main>

      <Footer />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};