import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            СТРАНИЦА НЕ НАЙДЕНА
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')} 
            variant="white"
            className="flex items-center justify-center gap-2"
          >
            <Home size={18} />
            На главную
          </Button>
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

