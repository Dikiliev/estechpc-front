import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Что-то пошло не так</h1>
            <p className="text-gray-400 mb-6">
              Произошла критическая ошибка приложения. Попробуйте обновить страницу.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-black px-6 py-2 uppercase font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors"
            >
              Обновить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

