import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Check, ShieldCheck, Truck, Store, CreditCard, Banknote, MapPin, AlertCircle, Info, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'receipt' | 'online';

export const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('receipt');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const deliveryBasePrice = 300;
  const freeDeliveryThreshold = 50000;
  const isFreeDelivery = total >= freeDeliveryThreshold;
  
  const deliveryCost = deliveryMethod === 'delivery' 
    ? (isFreeDelivery ? 0 : deliveryBasePrice) 
    : 0;
    
  const finalTotal = total + deliveryCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 1500);
  };

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props} 
      className={`w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-600 outline-none focus:border-estech-accent transition-colors rounded-none font-light text-sm ${props.className}`}
    />
  );

  if (cart.length === 0 && step !== 'success') {
     return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6 text-center">
           <h2 className="text-2xl font-bold text-white mb-4">Корзина пуста</h2>
           <Button onClick={() => navigate('/catalog')} variant="white">Перейти в каталог</Button>
        </div>
     );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6 bg-black">
        <div className="max-w-lg w-full text-center animate-scale-in">
          <div className="w-16 h-16 rounded-full border border-estech-accent flex items-center justify-center mx-auto mb-8 text-estech-accent">
            <Check size={32} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">ЗАКАЗ ПРИНЯТ</h2>
          <p className="text-gray-400 mb-12 font-light">
            Конфигурация вашей системы отправлена в производство. <br/>
            Менеджер свяжется с вами в течение 15 минут для подтверждения деталей.
            <br/><br/>
            <span className="font-mono text-estech-accent">ID ЗАКАЗА: #EST-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <Button onClick={() => navigate('/')} variant="white">Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const MobileOrderSummary = () => (
    <div className="lg:hidden border-b border-white/10 bg-[#0A0A0A] -mx-6 px-6 py-4 mb-8">
      <button 
        type="button"
        onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
        className="w-full flex items-center justify-between text-white"
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShoppingBag size={18} className="text-estech-accent" />
          <span>{isOrderSummaryOpen ? 'Скрыть детали заказа' : 'Показать детали заказа'}</span>
          {isOrderSummaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        <span className="font-mono font-bold">{finalTotal.toLocaleString('ru-RU')} ₽</span>
      </button>

      {isOrderSummaryOpen && (
        <div className="mt-6 space-y-4 animate-fade-in border-t border-white/5 pt-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-3">
              <div className="w-12 h-12 bg-black border border-white/5 relative">
                <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
                <span className="absolute -top-2 -right-2 bg-estech-surface text-gray-300 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white/10">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/5 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Доставка</span>
              <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-24 min-h-screen">
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-white transition-colors font-mono uppercase tracking-wider">Назад</button>
        <span className="text-gray-700">/</span>
        <h1 className="text-xl font-bold text-white tracking-wide">ОФОРМЛЕНИЕ</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Form Data */}
        <div className="lg:col-span-7 space-y-12">
          
          <MobileOrderSummary />

          {/* 1. Contact Info */}
          <section>
            <h3 className="text-xs font-mono font-bold text-estech-accent uppercase tracking-widest mb-8">01. Контактные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input required placeholder="Имя" />
              <Input required placeholder="Телефон" type="tel" />
            </div>
          </section>

          {/* 2. Delivery Method */}
          <section>
            <h3 className="text-xs font-mono font-bold text-estech-accent uppercase tracking-widest mb-6">02. Способ получения</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-4 md:p-6 border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  deliveryMethod === 'delivery' 
                    ? 'border-estech-accent bg-estech-accent/10 text-white' 
                    : 'border-white/10 bg-transparent text-gray-500 hover:border-white/30'
                }`}
              >
                <Truck size={24} />
                <span className="font-mono text-xs uppercase tracking-widest">Доставка</span>
              </button>
              
              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 md:p-6 border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  deliveryMethod === 'pickup' 
                    ? 'border-estech-accent bg-estech-accent/10 text-white' 
                    : 'border-white/10 bg-transparent text-gray-500 hover:border-white/30'
                }`}
              >
                <Store size={24} />
                <span className="font-mono text-xs uppercase tracking-widest">Самовывоз</span>
              </button>
            </div>

            {deliveryMethod === 'delivery' ? (
              <div className="space-y-6 animate-fade-in">
                 <div className="grid grid-cols-1 gap-6">
                    <div className="w-full bg-white/5 border-b border-white/20 py-3 px-3 text-gray-400 text-sm font-light flex items-center justify-between cursor-not-allowed">
                       <span>г. Грозный</span>
                       <span className="text-[10px] uppercase tracking-wider opacity-50">Фиксировано</span>
                    </div>
                    
                    <Input required placeholder="Адрес (Улица, Дом, Кв)" />
                    <Input placeholder="Комментарий курьеру" />
                 </div>
                 
                 <div className="flex items-start gap-3 text-xs text-gray-500 bg-white/5 p-4 rounded-sm border border-white/5">
                    <Info size={16} className="mt-0.5 shrink-0 text-estech-accent" />
                    <p>
                      В данный момент автоматическая доставка доступна только по г. Грозный. <br/>
                      Для доставки в другие города, пожалуйста, оформите заказ, и менеджер обсудит условия логистики индивидуально.
                    </p>
                 </div>
              </div>
            ) : (
              <div className="bg-[#111] border border-white/10 p-6 flex items-start gap-4 animate-fade-in">
                <MapPin className="text-estech-accent shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">Пункт выдачи</h4>
                  <p className="text-gray-400 text-sm mb-2">г. Грозный, ул. Черешневая 14</p>
                  <p className="text-gray-500 text-xs font-mono">Ежедневно с 10:00 до 20:00</p>
                </div>
              </div>
            )}
          </section>

          {/* 3. Payment Method */}
          <section>
            <h3 className="text-xs font-mono font-bold text-estech-accent uppercase tracking-widest mb-6">03. Оплата</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setPaymentMethod('receipt')}
                className={`p-4 md:p-6 border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  paymentMethod === 'receipt' 
                    ? 'border-estech-accent bg-estech-accent/10 text-white' 
                    : 'border-white/10 bg-transparent text-gray-500 hover:border-white/30'
                }`}
              >
                <Banknote size={24} />
                <span className="font-mono text-xs uppercase tracking-widest text-center">При получении</span>
              </button>
              
              <button
                type="button"
                disabled
                className="p-4 md:p-6 border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-gray-600 cursor-not-allowed opacity-60 relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                   <AlertCircle size={14} className="text-orange-500" />
                </div>
                <CreditCard size={24} />
                <span className="font-mono text-xs uppercase tracking-widest text-center">Онлайн</span>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-400">Тех. работы</span>
              </button>
            </div>

            {paymentMethod === 'receipt' && (
               <div className="flex items-center gap-3 text-gray-400 text-sm bg-blue-500/5 p-4 border border-blue-500/10">
                  <ShieldCheck size={18} className="text-blue-400 shrink-0" />
                  <p className="text-xs md:text-sm">Оплата производится наличными или банковской картой после осмотра товара.</p>
               </div>
            )}
          </section>

          <div className="pt-4 lg:hidden">
             <Button type="submit" variant="white" fullWidth size="lg" disabled={loading}>
               {loading ? 'Обработка...' : `Подтвердить ${finalTotal.toLocaleString('ru-RU')} ₽`}
             </Button>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5">
          <div className="bg-[#0A0A0A] p-8 border border-white/5 sticky top-24">
            <h3 className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Сводка заказа</h3>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-black flex-shrink-0 border border-white/5">
                    <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Кол-во: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-white font-mono">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Товары</span>
                <span className="font-mono">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Доставка ({deliveryMethod === 'pickup' ? 'Самовывоз' : 'Курьер'})</span>
                <span className={`font-mono ${deliveryCost === 0 ? 'text-white' : ''}`}>
                  {deliveryMethod === 'pickup' 
                    ? '0 ₽' 
                    : (deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} ₽`)}
                </span>
              </div>
              {deliveryMethod === 'delivery' && !isFreeDelivery && (
                 <div className="text-[10px] text-gray-500 text-right">
                    До бесплатной доставки: <span className="text-white font-mono">{(freeDeliveryThreshold - total).toLocaleString('ru-RU')} ₽</span>
                 </div>
              )}
              <div className="flex justify-between text-white text-xl pt-4 font-medium border-t border-white/5 mt-4">
                <span>Итого</span>
                <span className="font-mono text-estech-accent">{finalTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <div className="mt-8 hidden lg:block">
               <Button type="submit" variant="white" fullWidth size="lg" disabled={loading}>
                 {loading ? 'Обработка...' : `Подтвердить заказ`}
               </Button>
               <p className="text-center text-xs text-gray-600 mt-4">
                 Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

