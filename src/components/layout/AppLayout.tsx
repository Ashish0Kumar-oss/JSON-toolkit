import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function AppLayout() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith('/tool/');

  return (
    <div className="flex h-screen flex-col bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#262626] overflow-hidden">
      <Navbar />
      <main className={`flex-1 flex flex-col ${isToolPage ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <Outlet />
        {!isToolPage && <Footer />}
      </main>
      
      {isToolPage && (
        <footer className="h-8 border-t border-[#262626] bg-[#0A0A0A] px-4 flex items-center justify-between text-[11px] text-gray-500 shrink-0 select-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Operational
            </div>
            <span className="hidden sm:inline">Vercel Deploy: Success</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>Browser Mode</span>
            <span className="text-white">Active</span>
          </div>
        </footer>
      )}
    </div>
  );
}
