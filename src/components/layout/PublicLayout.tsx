import { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import { WhatsAppButton } from '../common/WhatsAppButton';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col selection:bg-primary/20">
      <Navbar />
      <main className="relative flex-grow w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
