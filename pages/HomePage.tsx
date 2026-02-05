import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { MOCK_PRODUCTS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      
      {/* Featured Section */}
      <div className="bg-[#050505] py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">ИЗБРАННЫЕ СИСТЕМЫ</h2>
            <button 
              onClick={() => navigate('/catalog')} 
              className="flex items-center gap-2 text-sm text-white hover:text-estech-accent transition-colors font-medium uppercase tracking-wider"
            >
              Смотреть все <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {MOCK_PRODUCTS.filter(p => p.featured || p.rating >= 4.9).slice(0, 4).map(p => (
              <div 
                 key={p.id}
                 className="group cursor-pointer"
                 onClick={() => navigate(`/product/${p.id}`)}
              >
                 <div className="aspect-[4/4] bg-[#111] overflow-hidden mb-4 relative">
                    <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" alt={p.name} />
                 </div>
                 <div>
                    <h3 className="text-white font-medium mb-1 group-hover:text-estech-accent transition-colors">{p.name}</h3>
                    <p className="text-gray-500 font-mono text-sm">{p.price.toLocaleString('ru-RU')} ₽</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Statement Section */}
      <div className="w-full bg-black py-32 border-t border-white/5 relative overflow-hidden">
         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <span className="text-estech-accent font-mono text-xs uppercase tracking-[0.2em] mb-6 block">Философия</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
              СОЗДАНО ДЛЯ 1%. <br/>
              <span className="text-gray-600">СПРОЕКТИРОВАНО ДЛЯ 100%.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 font-light">
              Каждая система ESTECH — это шедевр термодинамики и акустической инженерии. Мы не просто собираем компоненты; мы дирижируем производительностью.
            </p>
            <button 
              onClick={() => navigate('/configurator')}
              className="border border-white text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              Начать Конфигурацию
            </button>
         </div>
      </div>
    </>
  );
};

