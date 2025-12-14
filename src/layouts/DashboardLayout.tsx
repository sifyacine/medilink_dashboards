import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { UserSettings } from '../pages/shared/Settings';
import { useState } from 'react';

export const DashboardLayout: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSearchChange = (query: string) => {
    // You can implement global search logic here
    console.log('Global search:', query);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        <Header
          onSearchChange={handleSearchChange}
          onSettingsClick={() => setShowSettings(true)}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>

      <UserSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};