
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const AppLayout = () => {
  return (
    <SidebarProvider collapsedWidth={60}>
      <div className="flex min-h-screen w-full">
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
