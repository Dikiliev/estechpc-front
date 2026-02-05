import { Product, BuildStep, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Все товары' },
  { 
    id: 'pc', 
    name: 'Готовые решения',
    subcategories: [
      { id: 'gaming_pc', name: 'Игровые' },
      { id: 'work_pc', name: 'Для работы' },
      { id: 'editing_pc', name: 'Для монтажа' },
    ]
  },
  { 
    id: 'components', 
    name: 'Комплектующие', 
    subcategories: [
      { id: 'gpu', name: 'Видеокарты' },
      { id: 'cpu', name: 'Процессоры' },
      { id: 'mb', name: 'Материнские платы' },
      { id: 'ram', name: 'Оперативная память' },
      { id: 'storage', name: 'Накопители' },
      { id: 'psu', name: 'Блоки питания' },
      { id: 'case', name: 'Корпуса' },
    ]
  },
  { 
    id: 'cooling', 
    name: 'Охлаждение компьютера',
    subcategories: [
      { id: 'cpu_cooler', name: 'Кулеры для процессоров' },
      { id: 'aio', name: 'Системы жидкостного охлаждения' },
    ]
  },
  { 
    id: 'peripheral', 
    name: 'Периферия',
    subcategories: [
      { id: 'mouse', name: 'Мыши' },
      { id: 'keyboard', name: 'Клавиатуры' },
      { id: 'headset', name: 'Гарнитуры' },
      { id: 'display', name: 'Мониторы' },
    ]
  },
];

export const BUILD_STEPS: BuildStep[] = [
  { id: 'cpu', name: 'Процессор', category: 'cpu', description: 'Сердце вашей системы.' },
  { id: 'mb', name: 'Мат. плата', category: 'mb', description: 'Основа для подключений.' },
  { id: 'ram', name: 'Память', category: 'ram', description: 'Многозадачность и скорость.' },
  { id: 'gpu', name: 'Видеокарта', category: 'gpu', description: 'Мощь для игр и рендера.' },
  { id: 'storage', name: 'Накопители', category: 'storage', description: 'Сверхбыстрое хранилище.' },
  { id: 'cooling', name: 'Охлаждение', category: 'cpu_cooler', description: 'Эффективное охлаждение процессора.' },
  { id: 'psu', name: 'Блок питания', category: 'psu', description: 'Надежное энергоснабжение.' },
  { id: 'case', name: 'Корпус', category: 'case', description: 'Эстетика и охлаждение.' },
];

export const MOCK_PRODUCTS: Product[] = [
  // --- ГОТОВЫЕ РЕШЕНИЯ ---
  {
    id: 'pc-ardor-h386',
    name: 'ПК ARDOR GAMING RAGE H386',
    category: 'gaming_pc',
    price: 189900,
    image: '/ПК ARDOR GAMING RAGE H386.webp',
    description: 'Мощная игровая система для комфортного гейминга в Full HD и 2K разрешениях. Оптимальный баланс производительности и стоимости.',
    rating: 4.7,
    featured: true,
    specs: { 
      Процессор: 'AMD Ryzen 5 7500F',
      Видеокарта: 'GeForce RTX 5060 Ti',
      Память: '16 ГБ DDR5',
      Накопитель: '1000 ГБ NVMe SSD'
    },
  },
  {
    id: 'pc-ardor-h431',
    name: 'ПК ARDOR GAMING RAGE H431',
    category: 'gaming_pc',
    price: 249900,
    image: '/ПК ARDOR GAMING RAGE H431.webp',
    description: 'Высокопроизводительная игровая система для 2K и 4K гейминга. Идеальна для стриминга и профессионального контента.',
    rating: 4.9,
    featured: true,
    specs: { 
      Процессор: 'AMD Ryzen 7 9800X3D',
      Видеокарта: 'GeForce RTX 3080 Ti',
      Память: '32 ГБ DDR5',
      Накопитель: '1000 ГБ NVMe SSD'
    },
  },

  // --- ПРОЦЕССОРЫ ---
  {
    id: 'cpu-intel-i5-12400f',
    name: 'Процессор Intel Core i5-12400F OEM',
    category: 'cpu',
    price: 18900,
    image: '/Процессор Intel Core i5-12400F OEM.webp',
    description: '6-ядерный процессор 12-го поколения Intel Core. Отличное соотношение цена/производительность для игр и работы.',
    rating: 4.6,
    specs: { 
      Ядра: '6 ядер / 12 потоков',
      'Базовая частота': '2.5 GHz',
      'Макс. частота': '4.4 GHz',
      Сокет: 'LGA1700',
      TDP: '65W'
    },
    compatibility: { socket: 'LGA1700', memoryType: 'DDR4' }
  },
  {
    id: 'cpu-amd-ryzen-5-7500f',
    name: 'Процессор AMD Ryzen 5 7500F OEM',
    category: 'cpu',
    price: 22900,
    image: '/Процессор AMD Ryzen 5 7500F OEM.webp',
    description: '6-ядерный процессор на архитектуре Zen 4. Высокая производительность в играх и многозадачности без встроенной графики.',
    rating: 4.8,
    specs: { 
      Ядра: '6 ядер / 12 потоков',
      'Базовая частота': '3.7 GHz',
      'Макс. частота': '5.0 GHz',
      Сокет: 'AM5',
      TDP: '65W'
    },
    compatibility: { socket: 'AM5', memoryType: 'DDR5' }
  },
  {
    id: 'cpu-amd-ryzen-7-9800x3d',
    name: 'Процессор AMD Ryzen 7 9800X3D OEM',
    category: 'cpu',
    price: 54900,
    image: '/Процессор AMD Ryzen 7 9800X3D OEM.webp',
    description: 'Флагманский процессор с технологией 3D V-Cache. Лучший выбор для игр и профессиональных задач.',
    rating: 5.0,
    featured: true,
    specs: { 
      Ядра: '8 ядер / 16 потоков',
      'Базовая частота': '4.2 GHz',
      'Макс. частота': '5.7 GHz',
      Сокет: 'AM5',
      TDP: '120W'
    },
    compatibility: { socket: 'AM5', memoryType: 'DDR5' }
  },

  // --- МАТЕРИНСКИЕ ПЛАТЫ ---
  {
    id: 'mb-msi-b650',
    name: 'Материнская плата MSI B650 GAMING PLUS WIFI',
    category: 'mb',
    price: 18900,
    image: '/Материнская плата MSI B650 GAMING PLUS WIFI.webp',
    description: 'Надежная плата для процессоров AMD AM5 с поддержкой DDR5 и встроенным Wi-Fi 6E.',
    rating: 4.7,
    specs: { 
      Сокет: 'AM5',
      Чипсет: 'AMD B650',
      Память: 'DDR5 до 6400MHz',
      'Форм-фактор': 'ATX',
      'Wi-Fi': 'Wi-Fi 6E'
    },
    compatibility: { socket: 'AM5', memoryType: 'DDR5', formFactor: 'ATX' }
  },
  {
    id: 'mb-asus-rog-b660',
    name: 'Материнская плата ASUS ROG STRIX B660-A GAMING WIFI D4',
    category: 'mb',
    price: 21900,
    image: '/Материнская плата ASUS ROG STRIX B660-A GAMING WIFI D4.webp',
    description: 'Премиальная плата для Intel 12-го поколения с поддержкой DDR4 и расширенными возможностями разгона.',
    rating: 4.8,
    specs: { 
      Сокет: 'LGA1700',
      Чипсет: 'Intel B660',
      Память: 'DDR4 до 5333MHz',
      'Форм-фактор': 'ATX',
      'Wi-Fi': 'Wi-Fi 6'
    },
    compatibility: { socket: 'LGA1700', memoryType: 'DDR4', formFactor: 'ATX' }
  },

  // --- ОПЕРАТИВНАЯ ПАМЯТЬ ---
  {
    id: 'ram-adata-16gb',
    name: 'Оперативная память ADATA XPG GAMMIX D35 16 ГБ',
    category: 'ram',
    price: 4900,
    image: '/Оперативная память ADATA XPG GAMMIX D35 [AX4U32008G16A-DTBKD35] 16 ГБ.webp',
    description: 'Высокоскоростная память DDR5 для игровых систем. Отличное соотношение цена/производительность.',
    rating: 4.6,
    specs: { 
      Объем: '16 ГБ (1x16GB)',
      Скорость: '6000 MHz',
      Тип: 'DDR5',
      Тайминги: 'CL40',
      Напряжение: '1.25V'
    },
    compatibility: { memoryType: 'DDR5' }
  },
  {
    id: 'ram-kingston-32gb',
    name: 'Оперативная память Kingston FURY Beast Black 32 ГБ',
    category: 'ram',
    price: 12900,
    image: '/Оперативная память Kingston FURY Beast Black [KF556C36BBEK2-32] 32 ГБ.webp',
    description: 'Премиальная память DDR5 для энтузиастов. Высокая частота и низкие тайминги для максимальной производительности.',
    rating: 4.9,
    specs: { 
      Объем: '32 ГБ (2x16GB)',
      Скорость: '5600 MHz',
      Тип: 'DDR5',
      Тайминги: 'CL36',
      Напряжение: '1.25V'
    },
    compatibility: { memoryType: 'DDR5' }
  },

  // --- ВИДЕОКАРТЫ ---
  {
    id: 'gpu-palit-rtx-5060ti',
    name: 'Palit GeForce RTX 5060 Ti Dual',
    category: 'gpu',
    price: 45900,
    image: '/Palit GeForce RTX 5060 Ti Dual [NE7506T019P1-GB2062D].webp',
    description: 'Современная видеокарта для комфортного гейминга в Full HD и 2K. Поддержка DLSS 3.5 и трассировки лучей.',
    rating: 4.7,
    specs: { 
      Память: '16 ГБ GDDR6',
      Шина: '128-bit',
      Разъемы: '3x DisplayPort, 1x HDMI',
      Потребление: '165W'
    },
    compatibility: {}
  },
  {
    id: 'gpu-gigabyte-rtx-3080',
    name: 'GIGABYTE GeForce RTX 3080 GAMING OC (LHR)',
    category: 'gpu',
    price: 89900,
    image: '/GIGABYTE GeForce RTX 3080 GAMING OC (LHR) [GV-N3080GAMING OC-10GD rev2.0].webp',
    description: 'Мощная видеокарта для 2K и 4K гейминга. Отличная производительность в играх и творческих задачах.',
    rating: 4.8,
    specs: { 
      Память: '10 ГБ GDDR6X',
      Шина: '320-bit',
      Разъемы: '3x DisplayPort, 2x HDMI',
      Потребление: '320W'
    },
    compatibility: {}
  },
  {
    id: 'gpu-gigabyte-rtx-3080ti',
    name: 'GIGABYTE GeForce RTX 3080 Ti VISION OC',
    category: 'gpu',
    price: 129900,
    image: '/GIGABYTE GeForce RTX 3080 Ti VISION OC [GV-N308TVISION OC-12GD].webp',
    description: 'Флагманская видеокарта для профессиональной работы и 4K гейминга. Белый дизайн для эстетичных сборок.',
    rating: 4.9,
    featured: true,
    specs: { 
      Память: '12 ГБ GDDR6X',
      Шина: '384-bit',
      Разъемы: '3x DisplayPort, 2x HDMI',
      Потребление: '350W'
    },
    compatibility: {}
  },

  // --- НАКОПИТЕЛИ ---
  {
    id: 'storage-kingston-nv3-1tb',
    name: '1000ГБ M.2 NVMe накопитель Kingston NV3',
    category: 'storage',
    price: 6900,
    image: '/1000ГБ M.2 NVMe накопитель Kingston NV3.webp',
    description: 'Быстрый NVMe SSD для операционной системы и игр. Отличная скорость чтения/записи.',
    rating: 4.6,
    specs: { 
      Объем: '1000 ГБ',
      Интерфейс: 'PCIe 4.0 x4 NVMe',
      'Форм-фактор': 'M.2 2280',
      Чтение: 'до 3500 МБ/с',
      Запись: 'до 2100 МБ/с'
    },
    compatibility: {}
  },
  {
    id: 'storage-samsung-870evo-1tb',
    name: '1000 ГБ 2.5 SATA накопитель Samsung 870 EVO',
    category: 'storage',
    price: 8900,
    image: '/1000 ГБ 2.5 SATA накопитель Samsung 870 EVO [MZ-77E1T0BW].webp',
    description: 'Надежный SATA SSD для хранения данных. Проверенное качество Samsung с длительной гарантией.',
    rating: 4.8,
    specs: { 
      Объем: '1000 ГБ',
      Интерфейс: 'SATA III 6 Гбит/с',
      'Форм-фактор': '2.5"',
      Чтение: 'до 560 МБ/с',
      Запись: 'до 530 МБ/с'
    },
    compatibility: {}
  },

  // --- ОХЛАЖДЕНИЕ ---
  {
    id: 'cooler-deepcool-ag620',
    name: 'Кулер для процессора DEEPCOOL AG620',
    category: 'cpu_cooler',
    price: 4900,
    image: '/Кулер для процессора DEEPCOOL AG620 [R-AG620-BKNNMN-G-1] черный.webp',
    description: 'Мощный башенный кулер с двумя вентиляторами. Отличное охлаждение для процессоров среднего и высокого класса.',
    rating: 4.7,
    specs: { 
      Тип: 'Башенный кулер',
      Высота: '157 мм',
      TDP: 'до 260W',
      Вентиляторы: '2x 120mm',
      Сокеты: 'Intel LGA1700/1200/1151, AMD AM5/AM4'
    },
    compatibility: {}
  },

  // --- БЛОКИ ПИТАНИЯ ---
  {
    id: 'psu-deepcool-pf750',
    name: 'Блок питания DEEPCOOL PF750',
    category: 'psu',
    price: 6900,
    image: '/Блок питания DEEPCOOL PF750 [R-PF750D-HA0B-EU] черный.webp',
    description: 'Надежный блок питания 80+ Bronze для средних и мощных систем. Полная модульная кабельная система.',
    rating: 4.6,
    specs: { 
      Мощность: '750W',
      Сертификат: '80+ Bronze',
      'Форм-фактор': 'ATX',
      Модульность: 'Полная',
      Разъемы: '1x 24-pin, 1x 8-pin CPU, 2x 8-pin PCIe'
    },
    compatibility: { wattage: 750 }
  },
  {
    id: 'psu-cougar-gec850',
    name: 'Блок питания Cougar GEC 850',
    category: 'psu',
    price: 9900,
    image: '/Блок питания Cougar GEC 850 [CGR GC-850] черный.webp',
    description: 'Высококачественный блок питания 80+ Gold для мощных игровых систем. Тихая работа и стабильность.',
    rating: 4.8,
    specs: { 
      Мощность: '850W',
      Сертификат: '80+ Gold',
      'Форм-фактор': 'ATX',
      Модульность: 'Полная',
      Разъемы: '1x 24-pin, 2x 8-pin CPU, 4x 8-pin PCIe'
    },
    compatibility: { wattage: 850 }
  },

  // --- КОРПУСА ---
  {
    id: 'case-cougar-fv150-black',
    name: 'Корпус Cougar FV150 RGB черный',
    category: 'case',
    price: 5900,
    image: '/Корпус Cougar FV150 RGB [FV150 RGB black] черный.webp',
    description: 'Компактный корпус Mid-Tower с RGB подсветкой. Отличная вентиляция и современный дизайн.',
    rating: 4.5,
    specs: { 
      'Форм-фактор': 'Mid-Tower',
      Материал: 'Сталь, Пластик',
      Вентиляторы: '3x 120mm RGB (предустановлены)',
      Поддержка: 'ATX, mATX, Mini-ITX',
      Размеры: '415 x 210 x 450 мм'
    },
    compatibility: { formFactor: 'ATX' }
  },
  {
    id: 'case-cougar-fv150-white',
    name: 'Корпус Cougar FV150 RGB White белый',
    category: 'case',
    price: 6200,
    image: '/Корпус Cougar FV150 RGB White белый.webp',
    description: 'Элегантный белый корпус с RGB подсветкой. Идеален для светлых сборок и эстетичных конфигураций.',
    rating: 4.6,
    specs: { 
      'Форм-фактор': 'Mid-Tower',
      Материал: 'Сталь, Пластик',
      Вентиляторы: '3x 120mm RGB (предустановлены)',
      Поддержка: 'ATX, mATX, Mini-ITX',
      Размеры: '415 x 210 x 450 мм'
    },
    compatibility: { formFactor: 'ATX' }
  },
  {
    id: 'case-cougar-mx600',
    name: 'Корпус Cougar MX600 RGB',
    category: 'case',
    price: 8900,
    image: '/Корпус Cougar MX600 RGB [3857C90.0017] черный.webp',
    description: 'Просторный корпус Full-Tower с улучшенной вентиляцией. Поддержка больших видеокарт и систем охлаждения.',
    rating: 4.7,
    specs: { 
      'Форм-фактор': 'Full-Tower',
      Материал: 'Сталь, Стекло',
      Вентиляторы: '4x 120mm RGB (предустановлены)',
      Поддержка: 'E-ATX, ATX, mATX, Mini-ITX',
      Размеры: '520 x 230 x 510 мм'
    },
    compatibility: { formFactor: 'E-ATX' }
  },
  {
    id: 'case-ocypus-iota-c70',
    name: 'Корпус Ocypus Iota C70 ARGB',
    category: 'case',
    price: 12900,
    image: '/Корпус Ocypus Iota C70 ARGB [Iota-C70-BKD600XX-GL] черный.webp',
    description: 'Премиальный корпус с панорамным стеклом и ARGB подсветкой. Максимальная видимость компонентов.',
    rating: 4.9,
    featured: true,
    specs: { 
      'Форм-фактор': 'Mid-Tower',
      Материал: 'Сталь, Закаленное стекло',
      Вентиляторы: '3x 120mm ARGB (предустановлены)',
      Поддержка: 'ATX, mATX, Mini-ITX',
      Размеры: '465 x 220 x 480 мм'
    },
    compatibility: { formFactor: 'ATX' }
  },
];
