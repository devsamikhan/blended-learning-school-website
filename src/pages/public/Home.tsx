import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { PublicLayout } from '../../components/layout/PublicLayout';
import {
  Heart, Sparkles, GraduationCap, Users, 
  ArrowRight, Sun, Star, 
  MapPin, ShieldCheck, CheckCircle2, Leaf, Cpu
} from 'lucide-react';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import campusExterior from '@/assets/campus_exterior_v2.webp';
import roboticsStudents from '@/assets/robotics_students.webp';

export function Home() {
  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">
        
        {/* 🌿 Final Hero ── Simple & Impactful */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
            <OptimizedImage 
              src={campusExterior} 
              className="w-full h-full object-cover brightness-[0.95] dark:brightness-[0.4]" 
              alt="BLS School Campus"
              priority
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/90 dark:bg-secondary/90 border border-primary/20 shadow-human mb-8">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground dark:text-slate-300 tracking-[0.2em] uppercase">
                Modern Blended Learning
              </span>
            </div>

            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-8">
              The Power of <br className="hidden md:block" />
              <span className="text-primary italic">Blended Study.</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              At BLS, we bridge the gap between traditional wisdom and future technology. 
              Our unique <span className="text-primary font-bold">Blended Study</span> method ensures your child masters 
              both physical books and digital innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="xl" className="h-16 md:h-20 px-12 rounded-full bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-human-lg">
                <Link to="/admissions">Start Admission</Link>
              </Button>
              <Link to="/about" className="group flex items-center gap-4 text-muted-foreground dark:text-slate-300 font-bold text-lg hover:text-primary transition-all">
                Our Story <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 📚 Blended Excellence Section */}
        <section className="py-24 md:py-32 bg-secondary dark:bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-fluid-h2 text-foreground dark:text-white mb-6">Mastery through Blending</h2>
              <p className="text-base md:text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto font-medium">
                We believe in <span className="text-primary font-bold">Standardized Excellence</span>. By blending 
                high-quality physical curriculum with interactive digital tools, 
                we make learning deep, fast, and unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { icon: BookOpen, title: "Physical Focus", desc: "Building strong foundations through reading, writing, and deep book study." },
                { icon: Cpu, title: "Digital Discovery", desc: "Using AI, coding, and interactive labs to simplify complex modern concepts." },
                { icon: Leaf, title: "Standardized Growth", desc: "A unified system that ensures every student reaches their maximum potential." }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-secondary dark:bg-secondary shadow-human text-center border border-border dark:border-white/5 transition-all hover:scale-[1.02]">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground dark:text-white mb-4 font-display">{item.title}</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 👫 Real Human Connection */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-human-lg border-4 md:border-8 border-white dark:border-slate-800">
                <OptimizedImage src={roboticsStudents} className="w-full h-full object-cover aspect-video lg:aspect-square" alt="Students Learning" />
              </div>

              <div className="space-y-8 text-center lg:text-left">
                <h2 className="text-fluid-h2 text-foreground dark:text-white italic tracking-tighter">
                  Human-Led, <br />
                  <span className="text-primary italic">Tech-Powered.</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                  Our teachers are expert mentors who use digital tools to make 
                  difficult concepts simple. We ensure every child stays connected 
                  with their culture while learning for the future.
                </p>
                <div className="space-y-4 inline-block text-left">
                  {[
                    "Standardized English Medium Curriculum",
                    "Integrated Robotics & STEM Basics",
                    "Character Building & Moral Values"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-800 dark:text-slate-200 font-bold">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✨ Final Invitation */}
        <section className="py-24 md:py-48 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-fluid-h2 text-foreground dark:text-white mb-10">
              Join the Future of <br />
              <span className="text-primary italic">Education Today.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="xl" className="h-16 md:h-20 px-12 rounded-full bg-primary text-white font-black text-lg shadow-human-lg">
                <Link to="/admissions">Start Admission</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="h-16 md:h-20 px-12 rounded-full border-primary/20 text-primary font-black text-lg">
                <Link to="/contact">Visit Us</Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}

// Helper for icon
function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
