import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { LogOut, Menu, Moon, Sun, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';
import logo from '@/assets/logo.webp';

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isSynced] = useState(true); // Simplified to always show synced in this expert-simple version

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadgeColors: Record<string, string> = {
    admin: 'bg-primary/10 text-primary border-primary/20',
    teacher: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800',
    student: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800',
    principal: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800',
  };

  const avatarClass = user?.role === 'admin' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-muted-foreground dark:text-muted-foreground';

  return (
    <header className="sticky top-0 z-30 h-20 flex items-center justify-between px-4 md:px-8 border-b border-border dark:border-white/5 bg-background/80 dark:bg-slate-950/80 backdrop-blur-2xl">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-3 rounded-2xl text-slate-500 dark:text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-background dark:bg-secondary shadow-human p-2 border border-border dark:border-white/5 group-hover:scale-105 transition-transform duration-300">
            <OptimizedImage src={logo} alt="Logo" className="w-full h-full object-contain" priority />
          </div>
          <div className="flex flex-col justify-center">
            <span className="hidden min-[400px]:block font-black text-foreground dark:text-white leading-none tracking-tight text-lg font-display">BLS School</span>
            <span className="hidden md:flex text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none mt-1.5 items-center">
              <Heart className="h-2 w-2 mr-1 fill-primary animate-pulse" />
              Expert Simplicity
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-2xl text-slate-500 dark:text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all shadow-human"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="flex items-center gap-4 border-l border-border dark:border-white/5 pl-4 ml-2">
          {user && (
            <>
              <div className="hidden sm:flex flex-col items-end justify-center">
                <span className="text-sm font-black text-foreground dark:text-white tracking-tight font-display mb-1.5">{user.name}</span>
                <span className={cn("text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border", roleBadgeColors[user.role] || roleBadgeColors.admin)}>{user.role}</span>
              </div>
              <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-human ring-2 ring-white dark:ring-slate-800 transition-all hover:scale-110", avatarClass)}>
                {user.name?.charAt(0) || '?'}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all h-10 w-10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
