import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Heart, Sparkles, 
  ArrowRight, GraduationCap, 
  Camera, Bell, MessageCircle, Info 
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { OptimizedImage } from './ui/OptimizedImage';
import logo from '@/assets/logo.webp';

const navLinks = [
  { label: 'Home', to: '/', icon: Heart },
  { label: 'About', to: '/about', icon: Info },
  { label: 'Study', to: '/academics', icon: GraduationCap },
  { label: 'Programs', to: '/programs', icon: Sparkles },
  { label: 'Gallery', to: '/gallery', icon: Camera },
  { label: 'News', to: '/news', icon: Bell },
  { label: 'Contact', to: '/contact', icon: MessageCircle },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-6 py-4 md:py-6",
      isScrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 sm:h-20 shadow-human border border-white/20 dark:border-white/5",
        isScrolled 
          ? "bg-background/90 dark:bg-secondary/90 backdrop-blur-xl" 
          : "bg-background/60 dark:bg-secondary/60 backdrop-blur-md"
      )}>
        
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-background dark:bg-secondary shadow-human p-1 sm:p-1.5 border border-border dark:border-white/5 transition-transform group-hover:scale-105">
            <OptimizedImage src={logo} alt="BLS Logo" className="w-full h-full object-contain" priority />
          </div>
          <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-foreground dark:text-white font-display leading-none">
            BLS <span className="text-primary italic">School</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 xl:px-4 py-2 rounded-full text-[12px] xl:text-[13px] font-bold uppercase tracking-widest transition-all",
                location.pathname === link.to 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground dark:text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="ml-4 rounded-full bg-primary text-white font-black text-xs uppercase tracking-widest px-6 xl:px-8 shadow-human h-11 xl:h-12">
            <Link to="/admissions" className="flex items-center gap-2">
              Apply <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-primary/10 text-primary transition-all active:scale-90"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="lg:hidden absolute top-24 sm:top-28 left-3 right-3 sm:left-4 sm:right-4 z-40 bg-background/95 dark:bg-slate-950/95 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-human-lg border border-border dark:border-white/5"
          >
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest transition-all",
                    location.pathname === link.to ? "bg-primary text-white" : "text-muted-foreground dark:text-muted-foreground active:bg-secondary dark:active:bg-slate-800"
                  )}
                >
                  <link.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
