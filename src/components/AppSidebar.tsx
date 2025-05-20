
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, Calendar, Heart, Sun, Moon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center py-3 px-3 rounded-lg transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground font-medium'
        : 'hover:bg-muted/80'
    );

  return (
    <Sidebar className={collapsed ? 'w-[60px]' : 'w-[220px]'} collapsible>
      <SidebarTrigger className="m-2 self-end" />

      <div className="flex items-center justify-center py-6">
        {!collapsed ? (
          <h1 className="text-xl font-display font-semibold text-primary">
            MindMate
          </h1>
        ) : (
          <Heart className="text-primary h-6 w-6" />
        )}
      </div>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/" end className={getNavCls}>
                <MessageCircle className="h-5 w-5 mr-2" />
                {!collapsed && <span>Chat</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/mood-tracker" className={getNavCls}>
                <Heart className="h-5 w-5 mr-2" />
                {!collapsed && <span>Mood Tracker</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/journal" className={getNavCls}>
                <Calendar className="h-5 w-5 mr-2" />
                {!collapsed && <span>Journal</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <div className="mt-auto mb-4 px-2">
        <button className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-muted/80 transition-colors">
          <Sun className="h-5 w-5" />
        </button>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
