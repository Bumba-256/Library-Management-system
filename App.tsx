import React, { useState } from 'react';
import { LibraryProvider } from './context/LibraryContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { BooksPage } from './pages/BooksPage';
import { UsersPage } from './pages/UsersPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { Toaster } from 'sonner';
export function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <BooksPage />;
      case 'users':
        return <UsersPage />;
      case 'transactions':
        return <TransactionsPage />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <LibraryProvider>
      <div className="flex w-full min-h-screen bg-slate-50">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1">{renderView()}</main>
        <Toaster position="top-right" richColors />
      </div>
    </LibraryProvider>);

}