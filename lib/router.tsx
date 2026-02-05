import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/Layout';

// Lazy loading для оптимизации загрузки
const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductListPage = lazy(() => import('../pages/ProductListPage').then(m => ({ default: m.ProductListPage })));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const ConfiguratorPage = lazy(() => import('../pages/ConfiguratorPage').then(m => ({ default: m.ConfiguratorPage })));
const WishlistPage = lazy(() => import('../pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const SupportPage = lazy(() => import('../pages/SupportPage').then(m => ({ default: m.SupportPage })));
const LegalPage = lazy(() => import('../pages/LegalPage').then(m => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/catalog',
        element: <ProductListPage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/support',
        element: <SupportPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/configurator',
        element: <ConfiguratorPage />,
      },
      {
        path: '/legal/privacy',
        element: <LegalPage type="PRIVACY" />,
      },
      {
        path: '/legal/terms',
        element: <LegalPage type="TERMS" />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
