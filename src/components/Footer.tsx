import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import { OptimizedImage } from "./ui/OptimizedImage";
import logo from "@/assets/logo-bls.webp";

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "News & Events", to: "/news" },
  { label: "Contact", to: "/contact" },
];

const contactInfo = [
  { icon: Phone, text: "+92 300 0136840", href: "tel:+923000136840" },
  { icon: Mail, text: "bls.esakhel@gmail.com", href: "mailto:bls.esakhel@gmail.com" },
  { icon: MapPin, text: "Isakhel, Mianwali, Punjab", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Top Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 md:px-6 py-16 lg:py-20 2xl:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 2xl:gap-16">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 bg-background/5 flex-shrink-0">
                <OptimizedImage src={logo} alt="BLS Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <p className="font-black text-lg leading-none text-white">BLS Esakhel</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 mt-1">Future Pioneers Hub</p>
              </div>
            </Link>
            <p className="text-sm 2xl:text-lg text-muted-foreground leading-relaxed mb-6 font-medium">
              Empowering students with 21st-century skills through blended learning, robotics, and AI education.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/blsisakhel"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-background/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@BlendedlearningSchoolpk"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-background/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@blendedlearningschoolpk"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-xl bg-background/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-muted-foreground hover:border-muted-foreground transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors duration-200 font-medium"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Admissions ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Admissions</h4>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Session 2026</p>
                <p className="text-white font-bold text-base leading-snug">Admissions Open</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Limited seats available</p>
              </div>
              <Link
                to="/admissions"
                className="flex items-center gap-2 w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-100 shadow-md shadow-emerald-600/20"
              >
                Apply Now
                <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
              </Link>
              <Link
                to="/track-admission"
                className="flex items-center gap-2 w-full py-3 px-5 rounded-xl border border-white/10 hover:border-white/20 text-muted-foreground hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Track Application
                <ArrowUpRight className="h-3.5 w-3.5 ml-auto opacity-50" />
              </Link>
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-background/5 border border-white/10 flex-shrink-0 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium leading-tight pt-1.5">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 md:py-8">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-3">
          <p className="text-xs 2xl:text-base text-slate-500 font-medium">
            © {new Date().getFullYear()} BLS Esakhel. All rights reserved.
          </p>
          <p className="text-xs 2xl:text-base text-muted-foreground font-medium">
            Blended Learning School · Isakhel, Punjab
          </p>
        </div>
      </div>
    </footer>
  );
}
