import { Link } from 'react-router-dom';
import { 
  Heart, Mail, Phone, MapPin, 
  Facebook, Instagram, Youtube, ArrowUpRight, Leaf
} from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';
import logo from '@/assets/logo.webp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-muted-foreground py-16 md:py-24 px-6 overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          
          {/* Brand Column */}
          <div className="space-y-6 md:space-y-8 text-center sm:text-left flex flex-col items-center sm:items-start">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-background p-2 border border-white/10 transition-transform group-hover:scale-105">
                <OptimizedImage src={logo} alt="BLS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-2xl text-white font-display tracking-tighter leading-none">
                BLS <span className="text-primary italic">School</span>
              </span>
            </Link>
            <p className="text-sm font-medium leading-relaxed max-w-xs opacity-80">
              Pioneers of Blended Learning in Isakhel. We combine physical 
              study with digital innovation for future leaders.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-xl bg-background/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 md:space-y-8 text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white italic opacity-50">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Study', to: '/academics' },
                { label: 'Admission', to: '/admissions' },
                { label: 'Tracker', to: '/track-admission' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold hover:text-primary transition-colors flex items-center justify-center sm:justify-start group">
                    {link.label} <ArrowUpRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6 md:space-y-8 text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white italic opacity-50">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-sm font-medium opacity-80">Near Police Station, Isakhel, Mianwali, Punjab</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm font-bold text-white">+92 300 0136840</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium break-all opacity-80">blendedlearning@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Motto Column */}
          <div className="space-y-6 md:space-y-8 text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white italic opacity-50">Our Motto</h4>
            <div className="p-8 rounded-[2rem] bg-background/5 border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Leaf size={60} className="text-primary" />
               </div>
               <p className="text-lg font-black text-white italic tracking-tighter leading-tight relative z-10">
                  "Growing Minds, <br />
                  <span className="text-primary">Changing Lives.</span>"
               </p>
               <div className="mt-6 flex items-center justify-center sm:justify-start gap-2 text-[9px] font-black uppercase tracking-widest text-primary relative z-10">
                  <Heart size={12} className="animate-pulse fill-primary" /> Established 2011
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            © {currentYear} BLS School Isakhel. All rights reserved.
          </p>
          <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
            Programming by <span className="text-primary">Sami Ullah Khan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
