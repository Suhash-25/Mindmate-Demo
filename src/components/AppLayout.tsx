
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0F0F13] bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]">
        {/* Background effects */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/20 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold-900/20 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-800/10 rounded-full filter blur-3xl"></div>
        </div>

        <AppSidebar />
        <div className="flex-1 flex flex-col h-screen z-10">
          <ScrollArea className="flex-1">
            <main className="flex-1 p-4 md:p-6">
              <Outlet />
            </main>
          </ScrollArea>
          
          {/* Subtle footer glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
