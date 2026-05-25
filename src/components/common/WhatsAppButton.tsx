import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/923000136840', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          className="fixed bottom-8 left-8 z-[100] flex flex-col items-start gap-4"
        >
          <div className="relative group">
            <div className="absolute -top-12 left-0 bg-background dark:bg-secondary px-4 py-2 rounded-2xl shadow-human border border-border dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              <p className="text-[10px] font-black text-foreground dark:text-white uppercase tracking-widest italic">Chat with Admissions</p>
            </div>
            <button
              onClick={handleClick}
              className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-human-lg hover:scale-110 transition-all active:scale-95 group"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-7 w-7 md:h-8 md:w-8 fill-white" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-foreground animate-pulse" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
