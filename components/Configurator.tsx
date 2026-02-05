import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS, BUILD_STEPS } from '../constants';
import { Button } from './Button';
import { Check, Plus, Box, AlertTriangle, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ConfiguratorProps {
  onComplete?: (customBuild: Product) => void;
  onCancel?: () => void;
}

export const Configurator: React.FC<ConfiguratorProps> = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [activeCategoryId, setActiveCategoryId] = useState<string>(BUILD_STEPS[0].id);
  const [selections, setSelections] = useState<Record<string, Product>>({});
  
  // Mobile Manifest Toggle
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // State for Conflict Resolution Modal
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [identifiedConflicts, setIdentifiedConflicts] = useState<string[]>([]);

  const activeStep = BUILD_STEPS.find(s => s.id === activeCategoryId) || BUILD_STEPS[0];
  const totalPrice = (Object.values(selections) as Product[]).reduce((sum, item) => sum + item.price, 0);

  // Auto-scroll selected category into view on mobile
  useEffect(() => {
    if (categoriesRef.current) {
       const activeBtn = categoriesRef.current.querySelector('[data-active="true"]');
       if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
       }
    }
  }, [activeCategoryId]);

  const handleCancel = () => {
    navigate('/');
  };

  // --- CORE LOGIC: Compatibility Engine ---
  const checkCompatibility = (candidate: Product, currentSelections: Record<string, Product>): { compatible: boolean; reason?: string } => {
    
    // CPU <-> Motherboard (Socket Check)
    if (candidate.category === 'cpu') {
      const mb = currentSelections['mb'];
      if (mb && mb.compatibility?.socket !== candidate.compatibility?.socket) {
        return { compatible: false, reason: `Несовместимый сокет с выбранной платой (${mb.compatibility?.socket})` };
      }
    }
    
    if (candidate.category === 'mb') {
      const cpu = currentSelections['cpu'];
      if (cpu && cpu.compatibility?.socket !== candidate.compatibility?.socket) {
        return { compatible: false, reason: `Несовместимый сокет с выбранным ЦП (${cpu.compatibility?.socket})` };
      }
      
      const ram = currentSelections['ram'];
      if (ram && ram.compatibility?.memoryType !== candidate.compatibility?.memoryType) {
        return { compatible: false, reason: `Несовместимый тип памяти (${ram.compatibility?.memoryType})` };
      }
    }

    // RAM <-> Motherboard (Generation Check)
    if (candidate.category === 'ram') {
      const mb = currentSelections['mb'];
      if (mb && mb.compatibility?.memoryType !== candidate.compatibility?.memoryType) {
        return { compatible: false, reason: `Не поддерживается мат. платой (${mb.compatibility?.memoryType})` };
      }
    }

    return { compatible: true };
  };

  const viewProducts = useMemo(() => {
    let rawList: Product[] = [];
    if (activeStep.category === 'pc') {
      rawList = MOCK_PRODUCTS.filter(p => p.name.includes('CASE') || p.name.includes('FLUX'));
    } else {
      rawList = MOCK_PRODUCTS.filter(p => p.category === activeStep.category);
    }

    return rawList.map(p => ({
      ...p,
      _compatStatus: checkCompatibility(p, selections)
    }));
  }, [activeStep, selections]);


  // --- INTERACTION HANDLERS ---

  const handleSelect = (product: Product) => {
    if (selections[activeStep.id]?.id === product.id) {
      const newSelections = { ...selections };
      delete newSelections[activeStep.id];
      setSelections(newSelections);
      return;
    }

    const hypotheticalSelections = { ...selections, [activeStep.id]: product };
    const conflicts: string[] = [];
    
    Object.keys(hypotheticalSelections).forEach(key => {
      if (key === activeStep.id) return; 
      const existingPart = hypotheticalSelections[key];
      const check = checkCompatibility(existingPart, hypotheticalSelections);
      if (!check.compatible) {
        conflicts.push(existingPart.name);
      }
    });

    if (conflicts.length > 0) {
      setPendingProduct(product);
      setIdentifiedConflicts(conflicts);
      setIsConflictModalOpen(true);
    } else {
      setSelections(prev => ({ ...prev, [activeStep.id]: product }));
    }
  };

  const confirmConflictResolution = () => {
    if (!pendingProduct) return;

    const nextSelections = { ...selections, [activeStep.id]: pendingProduct };
    
    Object.keys(nextSelections).forEach(key => {
      if (key === activeStep.id) return;
      const existingPart = nextSelections[key];
      const check = checkCompatibility(existingPart, nextSelections);
      if (!check.compatible) {
        delete nextSelections[key];
      }
    });

    setSelections(nextSelections);
    setIsConflictModalOpen(false);
    setPendingProduct(null);
    setIdentifiedConflicts([]);
  };

  const handleFinish = () => {
    const customBuild: Product = {
      id: `custom-${Date.now()}`,
      name: 'ESTECH CUSTOM BUILD',
      category: 'pc',
      price: totalPrice,
      image: selections['pc']?.image || selections['gpu']?.image || 'https://picsum.photos/seed/custom/800/800',
      description: 'Индивидуальная конфигурация, собранная инженерами ESTECH.',
      specs: {
        Процессор: selections['cpu']?.name || 'В ожидании',
        Видеокарта: selections['gpu']?.name || 'В ожидании',
        Память: selections['ram']?.name || 'В ожидании',
        Плата: selections['mb']?.name || 'В ожидании',
      },
      rating: 5,
    };
    
    addToCart(customBuild);
    navigate('/catalog'); // Or show success modal
  };

  const isBuildValid = !!selections['cpu'] && !!selections['mb'] && !!selections['ram'] && !!selections['gpu'];

  // Manifest Component (Reusable)
  const ManifestContent = () => (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {BUILD_STEPS.map((step) => {
        const selected = selections[step.id];
        const isActive = step.id === activeCategoryId;
        
        return (
          <div 
            key={step.id} 
            onClick={() => {
              setActiveCategoryId(step.id);
              setIsManifestOpen(false);
            }}
            className={`
              p-4 lg:p-6 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors
              ${isActive ? 'bg-white/5 border-l-2 border-l-estech-accent' : 'border-l-2 border-l-transparent'}
            `}
          >
            <div className="flex justify-between items-center mb-1">
               <h3 className={`text-xs uppercase tracking-wider font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                 {step.name}
               </h3>
               {selected ? (
                 <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(selected);
                    }}
                    className="text-gray-600 hover:text-red-500 transition-colors"
                 >
                    <X size={14} />
                 </button>
               ) : (
                 <div className="w-2 h-2 rounded-full bg-white/10" />
               )}
            </div>
            
            {selected ? (
                <div>
                  <p className="text-sm text-white font-medium truncate">{selected.name}</p>
                  <p className="text-xs text-estech-accent font-mono mt-1">{selected.price.toLocaleString('ru-RU')} ₽</p>
                </div>
            ) : (
              <p className="text-xs text-gray-600 italic">Не выбрано</p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-16 flex flex-col lg:flex-row relative">
      
      {/* CONFLICT MODAL */}
      {isConflictModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-[#111] border border-white/10 p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center gap-4 text-estech-accent mb-6">
              <AlertTriangle size={32} />
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Обнаружен конфликт</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Выбор <span className="text-white font-medium">{pendingProduct?.name}</span> несовместим со следующими компонентами вашей сборки:
            </p>
            <ul className="mb-8 space-y-2 border-l-2 border-red-500/50 pl-4">
              {identifiedConflicts.map((c, i) => (
                <li key={i} className="text-red-400 text-sm font-mono">{c}</li>
              ))}
            </ul>
            <div className="flex gap-4">
              <Button fullWidth onClick={confirmConflictResolution} variant="white">Подтвердить</Button>
              <Button fullWidth onClick={() => setIsConflictModalOpen(false)} variant="outline">Отмена</Button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT: Builder Interface */}
      <div className="flex-1 pb-32 lg:pb-0 flex flex-col">
        {/* Mobile Header & Categories */}
        <div className="sticky top-16 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 pb-0">
          <div className="p-4 lg:p-8 pb-4">
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">КОНФИГУРАТОР</h1>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">Соберите систему своей мечты.</p>
               </div>
               <button onClick={handleCancel} className="text-gray-500 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                 <X size={16} /> <span className="hidden md:inline">Закрыть</span>
               </button>
             </div>

             {/* Horizontal Scroll Categories */}
             <div 
               ref={categoriesRef}
               className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
             >
                {BUILD_STEPS.map(step => {
                   const isSelected = !!selections[step.id];
                   const isActive = activeCategoryId === step.id;
                   return (
                     <button
                       key={step.id}
                       data-active={isActive}
                       onClick={() => setActiveCategoryId(step.id)}
                       className={`
                         flex-shrink-0 px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest border transition-all duration-300 whitespace-nowrap
                         ${isActive ? 'bg-white text-black border-white' : isSelected ? 'bg-estech-surface text-white border-estech-border' : 'bg-transparent text-gray-500 border-white/10'}
                       `}
                     >
                       {step.name} {isSelected && <span className="ml-1 text-estech-accent">•</span>}
                     </button>
                   )
                })}
             </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="p-4 lg:p-8 overflow-y-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 animate-fade-in">
             {viewProducts.map((item: any) => {
               const product = item as Product & { _compatStatus: { compatible: boolean, reason?: string } };
               const isSelected = selections[activeStep.id]?.id === product.id;
               const isCompatible = product._compatStatus.compatible;

               return (
                 <div 
                   key={product.id}
                   onClick={() => handleSelect(product)}
                   className={`
                     relative flex lg:flex-col border transition-all duration-300 cursor-pointer overflow-hidden
                     ${isSelected ? 'bg-[#111] border-estech-accent' : 
                       isCompatible ? 'bg-[#0A0A0A] border-white/5 hover:border-white/20' : 'bg-black border-white/5 opacity-60'}
                   `}
                 >
                   {/* Mobile: Horizontal Layout / Desktop: Vertical */}
                   <div className="w-24 lg:w-full lg:aspect-video bg-black/50 relative flex-shrink-0">
                      <img src={product.image} className={`w-full h-full object-cover ${isSelected ? 'grayscale-0' : 'grayscale'}`} />
                      {isSelected && (
                        <div className="absolute top-1 right-1 lg:top-2 lg:right-2 w-5 h-5 lg:w-6 lg:h-6 bg-estech-accent rounded-full flex items-center justify-center text-white">
                          <Check size={12} />
                        </div>
                      )}
                   </div>
                   
                   <div className="p-3 lg:p-5 flex-1 flex flex-col justify-center lg:justify-start">
                     <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-1 lg:mb-2">
                       <h3 className={`text-sm lg:text-base font-medium leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{product.name}</h3>
                       <span className="font-mono text-xs lg:text-sm text-white mt-1 lg:mt-0">{product.price.toLocaleString('ru-RU')} ₽</span>
                     </div>
                     
                     <div className="text-[10px] lg:text-xs text-gray-500 hidden lg:block mb-4">
                       {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
                         <div key={k} className="flex justify-between border-b border-white/5 pb-1 mt-1">
                           <span>{k}</span>
                           <span className="text-gray-400">{v}</span>
                         </div>
                       ))}
                     </div>

                     {!isCompatible && (
                       <div className="mt-2 text-red-400 text-[10px] flex items-center gap-1">
                          <AlertTriangle size={10} /> {product._compatStatus.reason}
                       </div>
                     )}
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {/* RIGHT: Desktop System Manifest (Sticky Sidebar) */}
      <div className="hidden lg:flex w-[400px] bg-[#080808] border-l border-white/10 flex-col h-[calc(100vh-64px)] sticky top-16 z-40">
        <div className="p-6 border-b border-white/10 bg-[#050505]">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Box size={16} className="text-estech-accent" /> Спецификация
          </h2>
        </div>
        <ManifestContent />
        <div className="p-8 border-t border-white/10 bg-[#050505]">
          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-400 text-sm">Итого</span>
            <span className="text-3xl text-white font-mono font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <Button 
            fullWidth 
            size="lg" 
            variant={isBuildValid ? 'white' : 'secondary'}
            onClick={handleFinish}
            disabled={!isBuildValid}
            className={!isBuildValid ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isBuildValid ? 'Завершить сборку' : 'Соберите ПК'} <Plus className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      {/* MOBILE: Sticky Bottom Bar & Bottom Sheet Manifest */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-white/10">
         
         {/* Manifest Toggle Handle */}
         <div 
            onClick={() => setIsManifestOpen(!isManifestOpen)}
            className="flex items-center justify-center py-2 border-b border-white/5 bg-[#111] cursor-pointer"
         >
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-400">
               {isManifestOpen ? 'Скрыть детали' : 'Показать детали'} 
               {isManifestOpen ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </div>
         </div>

         {/* Expanded Manifest (Bottom Sheet style) */}
         {isManifestOpen && (
            <div className="h-[50vh] flex flex-col bg-[#0A0A0A] animate-slide-up">
               <ManifestContent />
            </div>
         )}

         {/* Persistent Price & Action Bar */}
         <div className="p-4 flex items-center gap-4 bg-black safe-area-bottom">
            <div className="flex-1">
               <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Итого</span>
               <span className="text-xl font-mono text-white font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Button 
               size="md"
               variant={isBuildValid ? 'white' : 'secondary'}
               onClick={handleFinish}
               disabled={!isBuildValid}
               className={!isBuildValid ? 'opacity-50 cursor-not-allowed px-4' : 'px-8'}
            >
              {isBuildValid ? 'Заказать' : 'Собрать'}
            </Button>
         </div>
      </div>
    </div>
  );
};