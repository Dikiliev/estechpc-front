import React from 'react';
import { Phone, MessageCircle, Send, Mail, HelpCircle, MapPin } from 'lucide-react';
import { Button } from './Button';

export const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">СВЯЗАТЬСЯ</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Инженеры ESTECH доступны 24/7 для решения любых технических вопросов. Выберите удобный способ связи.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <a href="https://wa.me/79679490609" target="_blank" rel="noopener noreferrer" className="group p-8 border border-white/10 bg-[#0A0A0A] hover:border-green-500/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
            <MessageCircle className="text-green-500 mb-6" size={40} strokeWidth={1.5} />
            <h3 className="text-white font-bold text-xl mb-2">WhatsApp</h3>
            <p className="text-gray-500 text-sm mb-6">Мгновенный ответ в течение 5 минут.</p>
            <span className="text-green-500 text-sm font-mono uppercase tracking-widest group-hover:underline">Написать сообщение</span>
          </a>

          <a href="https://t.me/mdikiy" target="_blank" rel="noopener noreferrer" className="group p-8 border border-white/10 bg-[#0A0A0A] hover:border-blue-400/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
            <Send className="text-blue-400 mb-6" size={40} strokeWidth={1.5} />
            <h3 className="text-white font-bold text-xl mb-2">Telegram</h3>
            <p className="text-gray-500 text-sm mb-6">@mdikiy</p>
            <span className="text-blue-400 text-sm font-mono uppercase tracking-widest group-hover:underline">Открыть чат</span>
          </a>

          <a href="tel:+79679490609" className="group p-8 border border-white/10 bg-[#0A0A0A] hover:border-white/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
            <Phone className="text-white mb-6" size={40} strokeWidth={1.5} />
            <h3 className="text-white font-bold text-xl mb-2">Телефон</h3>
            <p className="text-gray-500 text-sm mb-6">+7 967 949 06 09</p>
            <span className="text-white text-sm font-mono uppercase tracking-widest group-hover:underline">Позвонить</span>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/10 pt-24">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">ЧАСТЫЕ ВОПРОСЫ</h2>
            <p className="text-gray-400">База знаний обновляется еженедельно на основе запросов наших клиентов.</p>
            <div className="mt-8 flex items-center gap-4 text-estech-accent">
               <Mail size={20} /> <span className="font-mono">support@estech.com</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-gray-500">
               <MapPin size={20} /> <span className="font-mono">Грозный, ул. Черешневая 14</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { q: 'Каковы сроки сборки кастомной системы?', a: 'Стандартный срок сборки и тестирования составляет 3-5 рабочих дней. Экспресс-сборка доступна за 48 часов.' },
              { q: 'Какая гарантия предоставляется?', a: 'Мы предоставляем 3 года полной гарантии на все компоненты и работы, включая бесплатное обслуживание раз в год.' },
              { q: 'Возможен ли апгрейд в будущем?', a: 'Да, архитектура наших систем полностью модульная. Вы можете обратиться к нам для апгрейда или сделать его самостоятельно без потери гарантии.' }
            ].map((item, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h4 className="text-white font-medium mb-2 flex items-start gap-3">
                  <HelpCircle size={18} className="text-gray-600 mt-1 shrink-0" />
                  {item.q}
                </h4>
                <p className="text-gray-500 text-sm pl-8 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};