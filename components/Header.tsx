import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, wishlistCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'Конфигуратор', path: '/configurator' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-16 transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <span className="font-sans font-bold text-xl tracking-tighter text-white">
                ESTECH <span className="text-gray-500 font-normal">PC</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  to={item.path}
                  className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                  to="/support"
                  className="text-[11px] font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
              >
                  Связаться
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Поиск"
              >
                <Search strokeWidth={1.5} size={20} />
              </button>

              <Link 
                to="/wishlist"
                className="relative text-gray-400 hover:text-white transition-colors group"
                aria-label="Избранное"
              >
                <Heart strokeWidth={1.5} size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="relative text-gray-400 hover:text-white transition-colors group"
                onClick={onCartClick}
              >
                <ShoppingBag strokeWidth={1.5} size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-estech-accent text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu strokeWidth={1.5} size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onNavigateProduct={(product) => {
          navigate(`/product/${product.id}`);
          setIsSearchOpen(false);
        }}
      />

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[60] transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
            <X strokeWidth={1.5} size={32} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
           {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="text-3xl font-bold text-white tracking-tight hover:text-estech-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
              onClick={() => handleNavigate('/wishlist')}
              className="text-3xl font-bold text-white tracking-tight hover:text-estech-accent transition-colors"
          >
              Избранное {wishlistCount > 0 && `(${wishlistCount})`}
          </button>
          <button 
              onClick={() => handleNavigate('/support')}
              className="text-3xl font-bold text-white tracking-tight hover:text-estech-accent transition-colors"
          >
              Связаться
          </button>
        </div>
      </div>
    </>
  );
};