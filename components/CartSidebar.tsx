import React from 'react';
import { Button } from './Button';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-8 border-b border-white/5">
          <span className="font-mono text-sm text-gray-400 uppercase tracking-widest">
            Корзина // {cart.length.toString().padStart(2, '0')}
          </span>
          <button onClick={onClose} className="text-white hover:text-estech-accent transition-colors p-2 -mr-2">
            <X strokeWidth={1.5} size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-6 md:space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-gray-500 font-light text-lg">Ваш список сборки пуст.</p>
              <Button variant="outline" onClick={() => { onClose(); navigate('/catalog'); }}>Перейти в каталог</Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 md:gap-6 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-estech-surface flex-shrink-0 relative overflow-hidden rounded-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white text-sm md:text-base leading-tight pr-2">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] md:text-xs text-gray-600 hover:text-red-500 uppercase tracking-wider p-1 -mr-1">Удалить</button>
                  </div>
                  <div className="flex justify-between items-end mt-2 md:mt-0">
                    <div className="flex items-center border border-white/10">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center text-xs font-mono text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><Plus size={14} /></button>
                    </div>
                    <span className="font-mono text-white text-sm md:text-base">{item.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 md:p-8 border-t border-white/5 bg-black/40 pb-safe">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-mono uppercase tracking-wider text-xs">Итоговая стоимость</span>
              <span className="text-2xl text-white font-mono font-medium">{cartTotal.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Button fullWidth size="lg" variant="white" onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </>
  );
};