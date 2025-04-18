
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CalendarDays, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckSquare, 
  FileImage,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  setOpen,
  className
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "bg-sidebar border-r border-border flex flex-col w-72 md:w-64 shrink-0 transition-transform duration-300 ease-in-out z-50",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight text-digitek-600">Digitek</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
            <NavItem to="/users" icon={<Users className="h-5 w-5" />} label="Members" />
            <NavItem to="/events" icon={<Calendar className="h-5 w-5" />} label="Events" />
            <NavItem to="/tasks" icon={<CheckSquare className="h-5 w-5" />} label="Tasks" />
            <NavItem to="/media" icon={<FileImage className="h-5 w-5" />} label="Media" />
            <NavItem to="/calendar" icon={<CalendarDays className="h-5 w-5" />} label="Calendar" />
          </nav>
        </ScrollArea>
        
        <div className="border-t border-border p-4">
          <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
          isActive 
            ? "bg-digitek-100 text-digitek-900 dark:bg-digitek-900/20 dark:text-digitek-300" 
            : "text-foreground/70 hover:bg-digitek-50 hover:text-foreground dark:hover:bg-digitek-900/10 dark:hover:text-digitek-100"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default Sidebar;
