import {
  Heart, GraduationCap,
  Users, Leaf, Star, ShieldCheck, Cpu
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import classroomLecture from '@/assets/classroom_lecture.webp';
import aboutBanner from '@/assets/about_banner_v3.webp';

export function About() {
  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={aboutBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="About BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Heart className="h-4 w-4" /> Established 2023
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              Pioneers of <br className="hidden md:block" />
              <span className="text-primary italic">Blended Study.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Since 2011, we have been bridging the gap between deep traditional wisdom and future digital mastery.
            </p>
          </div>
        </section>

        {/* 🏛️ History Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-human-lg border-4 md:border-8 border-white dark:border-slate-800 aspect-video">
                <OptimizedImage src={classroomLecture} className="w-full h-full object-cover" alt="BLS History" />
              </div>

              <div className="space-y-8 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black font-display text-foreground dark:text-white italic tracking-tighter">Our Mission.</h2>
                <p className="text-base md:text-lg text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                  Our mission is to lead the way in <span className="text-primary font-bold">Standardized Blended Education</span>.
                  We have refined a system that preserves the discipline of English medium
                  study while embracing the limitless potential of AI and digital tools.
                  We create leaders who are experts in both the physical and digital worlds.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2rem] bg-secondary dark:bg-secondary/40 border border-border dark:border-white/5 shadow-human">
                    <p className="text-4xl md:text-5xl font-black text-primary font-display tracking-tighter">50+</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Robotic Projects</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-secondary dark:bg-secondary/40 border border-border dark:border-white/5 shadow-human">
                    <p className="text-4xl md:text-5xl font-black text-primary font-display tracking-tighter">400+</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🍃 Core Values */}
        <section className="py-24 md:py-32 bg-secondary/50 dark:bg-secondary/20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-fluid-h2 text-foreground dark:text-white mb-20 tracking-tighter">Our Expert Principles</h2>
            {[
              { icon: Leaf, label: "Nature First" },
              { icon: Cpu, label: "Hybrid Study" },
              { icon: ShieldCheck, label: "Total Safety" },
              { icon: GraduationCap, label: "Expert Faculty" }
            ].map((val, i) => (
              <div key={i} className="space-y-6">
                <div className="h-20 w-20 mx-auto rounded-[2rem] flex items-center justify-center shadow-human bg-background dark:bg-secondary text-primary transition-transform hover:scale-110">
                  <val.icon className="h-10 w-10" />
                </div>
                <p className="text-xs md:text-sm font-black text-foreground dark:text-white uppercase tracking-[0.2em]">{val.label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
