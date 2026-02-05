import React from 'react';

interface LegalPageProps {
  type: 'PRIVACY' | 'TERMS';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const title = type === 'PRIVACY' ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' : 'УСЛОВИЯ ИСПОЛЬЗОВАНИЯ';
  const lastUpdated = '12 Октября, 2023';

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="mb-16 pb-8 border-b border-white/10">
           <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{title}</h1>
           <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Последнее обновление: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert prose-lg text-gray-400 font-light">
          {type === 'PRIVACY' ? (
            <>
              <p>
                Ваша конфиденциальность имеет первостепенное значение для ESTECH Systems Inc. Данное Заявление о конфиденциальности описывает, как мы собираем, используем, раскрываем, передаем и храним вашу информацию.
              </p>
              <h3 className="text-white font-bold mt-8 mb-4">1. Сбор и использование персональной информации</h3>
              <p>
                Персональная информация — это данные, которые могут быть использованы для идентификации личности или связи с конкретным лицом. Вас могут попросить предоставить вашу персональную информацию в любой момент, когда вы связываетесь с ESTECH.
              </p>
              <h3 className="text-white font-bold mt-8 mb-4">2. Как мы используем вашу информацию</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Для обработки ваших заказов и обеспечения доставки.</li>
                <li>Для отправки важных уведомлений, таких как сообщения о покупках и изменениях в наших условиях и политиках.</li>
                <li>Для улучшения наших продуктов, услуг, контента и рекламы.</li>
              </ul>
            </>
          ) : (
            <>
              <p>
                Пожалуйста, внимательно ознакомьтесь с данными условиями перед использованием веб-сайта ESTECH. Используя этот сайт, вы соглашаетесь с данными условиями.
              </p>
              <h3 className="text-white font-bold mt-8 mb-4">1. Общие положения</h3>
              <p>
                ESTECH оставляет за собой право изменять цены, спецификации и условия в любое время без предварительного уведомления. Мы прилагаем все усилия для обеспечения точности информации, но не несем ответственности за опечатки.
              </p>
              <h3 className="text-white font-bold mt-8 mb-4">2. Интеллектуальная собственность</h3>
              <p>
                Весь контент на этом сайте, включая текст, графику, логотипы, изображения и программное обеспечение, является собственностью ESTECH и защищен законами об авторском праве.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

