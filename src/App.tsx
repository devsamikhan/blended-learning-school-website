import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { InstallPrompt } from './components/ui/InstallPrompt';
import { OfflineStatus } from './components/ui/OfflineStatus';

// Fallback Loader for Suspense
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

// Public Pages
const Home = lazy(() => import('./pages/public/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/public/About').then(m => ({ default: m.About })));
const Gallery = lazy(() => import('./pages/public/Gallery').then(m => ({ default: m.Gallery })));
const Contact = lazy(() => import('./pages/public/Contact').then(m => ({ default: m.Contact })));
const Admissions = lazy(() => import('./pages/public/Admissions').then(m => ({ default: m.Admissions })));
const Academics = lazy(() => import('./pages/public/Academics').then(m => ({ default: m.Academics })));
const News = lazy(() => import('./pages/public/News').then(m => ({ default: m.News })));
const Programs = lazy(() => import('./pages/public/Programs').then(m => ({ default: m.Programs })));
const PublicTracker = lazy(() => import('./pages/public/PublicTracker').then(m => ({ default: m.PublicTracker })));
const NotFound = lazy(() => import('./pages/public/NotFound').then(m => ({ default: m.NotFound })));

function App() {
  useEffect(() => {
    const handleUpdate = () => {
      toast.info("Update Available!", {
        description: "We've added something new. Refresh to see it.",
        action: {
          label: "Refresh Now",
          onClick: () => window.location.reload()
        },
        duration: Infinity
      });
    };

    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
  }, []);

  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
          <Suspense fallback={<PageLoader />}>
            <AppContent />
          </Suspense>
        <Toaster position="top-right" richColors />
      </LanguageProvider>
    </HashRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <InstallPrompt />
      <OfflineStatus />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/news" element={<News />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/track-admission" element={<PublicTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
