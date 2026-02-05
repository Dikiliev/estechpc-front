import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import { routes } from './lib/router';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-black text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">Загрузка...</p>
                  </div>
                </div>
              }
            >
              <AppRoutes />
            </Suspense>
          </CartProvider>
        </WishlistProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
