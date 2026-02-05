import React from 'react';
import { Button } from './Button';
import { ArrowRight, ShieldCheck, Cpu, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[100svh] flex flex-col justify-end md:justify-center overflow-hidden bg-black pb-24 md:pb-0">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-40 md:opacity-30 grayscale contrast-125 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:via-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent md:from-black md:via-black/50" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 animate-slide-up flex flex-col justify-end h-full">
          
          <div className="mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-sm">
              <div className="w-1.5 h-1.5 bg-estech-accent animate-pulse rounded-full"></div>
              <span className="text-[10px] md:text-xs font-mono font-medium text-white tracking-[0.2em] uppercase">
                Архитектура / Gen 2.0
              </span>
            </div>
          </div>
          
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-6 text-balance shadow-black drop-shadow-lg">
            ИНЖЕНЕРНОЕ <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">СОВЕРШЕНСТВО.</span>
          </h1>
          
          <p className="text-gray-300 md:text-gray-400 text-sm md:text-xl max-w-lg mb-8 md:mb-10 font-light leading-relaxed drop-shadow-md">
            Мы создаем системы для тех, кто понимает разницу между хорошим и исключительным. Никаких компромиссов.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
            <Button variant="white" size="lg" fullWidth className="sm:w-auto h-14 sm:h-auto text-sm" onClick={() => navigate('/catalog')}>
              Каталог
            </Button>
            <Button variant="outline" size="lg" fullWidth className="sm:w-auto h-14 sm:h-auto backdrop-blur-sm bg-black/20 text-sm" onClick={() => navigate('/configurator')}>
              Собрать ПК <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-xl md:bg-black/50 md:backdrop-blur-md z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-6">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-between items-center text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-wider gap-8">
            
            <div className="flex flex-col md:flex-row items-center md:gap-2 text-center md:text-left">
               <ShieldCheck size={16} className="mb-1 md:mb-0 text-estech-accent" />
               <span>Гарантия</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:gap-2 text-center md:text-left border-l border-r border-white/10 md:border-none">
               <Cpu size={16} className="mb-1 md:mb-0 text-estech-accent" />
               <span>Премиум чипы</span>
            </div>

            <div className="flex flex-col md:flex-row items-center md:gap-2 text-center md:text-left">
               <PenTool size={16} className="mb-1 md:mb-0 text-estech-accent" />
               <span>Проф. сборка</span>
            </div>

            <div className="hidden md:block text-white opacity-50 ml-auto">
              ESTECH QUALITY STANDARD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};