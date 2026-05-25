import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 🔍 Check if the event already fired before mount
    const win = window as unknown as Window & { deferredPWAEvent?: BeforeInstallPromptEvent };
    if (win.deferredPWAEvent) {
      setDeferredPrompt(win.deferredPWAEvent);
      setIsVisible(true);
    }

    const handler = () => {
      if (win.deferredPWAEvent) {
        setDeferredPrompt(win.deferredPWAEvent);
        setIsVisible(true);
      }
    };

    window.addEventListener('pwa-prompt-ready', handler);
    return () => window.removeEventListener('pwa-prompt-ready', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-background dark:bg-secondary border border-primary/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 max-w-lg w-full shadow-human-lg relative overflow-hidden group"
          >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-8 right-8 text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors p-2"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center space-y-8 relative z-10">
              <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 shadow-human">
                <Smartphone className="h-10 w-10" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-foreground dark:text-white tracking-tighter italic">
                  BLS <span className="text-primary">Mobile</span> App
                </h3>
                <p className="text-base md:text-lg text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                  Install the BLS School App on your home screen for the fastest experience and instant updates.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  onClick={handleInstallClick}
                  className={cn(
                    "h-16 md:h-20 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg md:text-xl shadow-human-lg transition-transform active:scale-95",
                    !deferredPrompt && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Download className="h-6 w-6 mr-3" />
                  Install App Now
                </Button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-[0.3em] py-2 transition-colors"
                >
                  Continue in Browser
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
