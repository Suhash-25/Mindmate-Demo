
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#121212] bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.6))]">
        <AppSidebar />
        <div className="flex-1 flex flex-col h-screen">
          <ScrollArea className="flex-1">
            <main className="flex-1 p-4 md:p-6">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
