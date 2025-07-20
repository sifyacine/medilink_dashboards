import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { UserSettings } from '../Settings/UserSettings';
import { useState } from 'react';

export const MainLayout: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // You can implement global search logic here
    console.log('Global search:', query);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        <Header onSearchChange={handleSearchChange} onSettingsClick={() => setShowSettings(true)} />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
      
      <UserSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};