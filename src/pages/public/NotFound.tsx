import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
           <Search size={48} className="text-primary" />
        </div>
        <h1 className="text-fluid-h2 font-black font-display text-foreground dark:text-white mb-6 italic">
          Oops! Page <span className="text-primary">Not Found.</span>
        </h1>
        <p className="text-xl text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed mb-12">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>
        <Button asChild size="xl" className="h-18 px-12 rounded-full bg-primary text-white font-bold text-lg shadow-human-lg">
          <Link to="/"><Home className="mr-3 h-5 w-5" /> Go Back Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
