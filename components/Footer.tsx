import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Send, MessageCircle, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 text-sm font-sans">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top Section: Brand & Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Address (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tighter mb-6">ESTECH SYSTEMS</h2>
              <p className="text-gray-500 leading-relaxed max-w-sm font-light mb-8">
                Создаем вычислительную архитектуру будущего. 
                Бескомпромиссная производительность и эстетика для профессионалов.
              </p>
            </div>
            
            <div className="space-y-4 text-gray-400">
               <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-estech-accent mt-0.5 shrink-0" />
                  <span>Грозный, ул. Черешневая 14</span>
               </div>
               <div className="flex items-center gap-3">
                  <Phone size={18} className="text-estech-accent shrink-0" />
                  <span>+7 967 949 06 09</span>
               </div>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-widest mb-6 opacity-50">Навигация</h4>
            <ul className="space-y-3">
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Каталог <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/configurator" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Конфигуратор <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Контакты <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-widest mb-6 opacity-50">Клиентам</h4>
            <ul className="space-y-3">
              <li><Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">Гарантия</Link></li>
              <li><Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">Конфиденциальность</Link></li>
              <li><Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">Условия (Terms)</Link></li>
            </ul>
          </div>

          {/* Column 4: Socials (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-widest mb-6 opacity-50">Мы в сети</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://t.me/mdikiy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                   <Send size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                   <span className="text-gray-300 font-medium">Telegram</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white" />
              </a>

              <a 
                href="https://wa.me/79679490609" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-green-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                   <MessageCircle size={18} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                   <span className="text-gray-300 font-medium">WhatsApp</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Technical mark */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 ESTECH SYSTEMS INC. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};