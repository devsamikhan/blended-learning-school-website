import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  blurSrc?: string;
  sizes?: string;
}

/**
 * Premium Optimized Image Component
 * Features:
 * 1. Native Lazy Loading (configurable)
 * 2. Blur-up Transition Effect
 * 3. Responsive Sizes Support
 * 4. Animated Entrance
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  priority = false,
  blurSrc,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Fallback for missing images
  const fallbackSrc = "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop";

  return (
    <div className={cn("relative overflow-hidden bg-muted/30", className)}>
      {/* 1. Low Quality Blur Placeholder */}
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            {blurSrc ? (
              <img 
                src={blurSrc} 
                alt="blur" 
                className="w-full h-full object-cover blur-2xl scale-110"
              />
            ) : (
              <div className="w-full h-full bg-secondary/50 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 2. Main High-Res Image */}
      <motion.img
        src={error ? fallbackSrc : src}
        alt={alt}
        sizes={sizes}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isLoaded ? { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" } 
        } : {}}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          !isLoaded ? "blur-sm" : "blur-0"
        )}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </div>
  );
}

