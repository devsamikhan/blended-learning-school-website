import {
  GraduationCap, Cpu,
  Lightbulb, Rocket,
  CheckCircle2, Heart, Sparkles, BookOpen
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import academicsBanner from '@/assets/academics_banner_v3.webp';
import blsOfficialBanner from '@/assets/bls_official_banner.webp';
import { cn } from '../../lib/utils';

const departments = [
  {
    title: "Primary Years",
    grade: "PG to Class 2",
    icon: Heart,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    desc: "Focus on social skills, phonics, and basic literacy through play and digital engagement.",
    points: ["Modern Phonics", "Nature Walks", "Art & Coding", "Kind Learning"]
  },
  {
    title: "Junior Section",
    grade: "Class 3 to 5",
    icon: Rocket,
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
    desc: "Mastering subjects through our Standardized Blended method—integrating physical curriculum with interactive labs.",
    points: ["Concept Labs", "Digital Diaries", "Sports & Hybrid", "Standardized tests"]
  },
  {
    title: "Middle School",
    grade: "Class 6 to 8",
    icon: Cpu,
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
    desc: "Transitioning to advanced STEM and critical thinking using our blended study models.",
    points: ["Robotics Basics", "Algebraic Logic", "English Fluency", "STEM Projects"]
  }
];

export function Academics() {
  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={academicsBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="Academics BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Sparkles className="h-4 w-4" /> Expert Methodology
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              Blended <br className="hidden md:block" />
              <span className="text-primary italic">Method.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Standardized curriculum enhanced with modern labs, coding, and character building.
            </p>
          </div>
        </section>

        {/* 📚 Educational Phases */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {departments.map((dept, i) => (
                <Card key={dept.title} className="rounded-[3rem] border border-border dark:border-white/5 bg-secondary dark:bg-secondary p-10 md:p-12 shadow-human flex flex-col gap-8 items-start text-left transition-all hover:scale-[1.02] hover:shadow-human-lg">
                  <div className={cn("h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-human shrink-0 transition-transform group-hover:rotate-6", dept.bg, dept.color)}>
                    <dept.icon size={36} />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black font-display text-foreground dark:text-white italic tracking-tight leading-none">{dept.title}</h3>
                      <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mt-4">{dept.grade}</p>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                      {dept.desc}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-4">
                      {dept.points.map(point => (
                        <div key={point} className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-background dark:bg-slate-800/80 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm border border-border dark:border-white/5">
                          <CheckCircle2 size={14} className="text-primary" /> {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 💡 Our Blended Strategy */}
        <section className="py-24 md:py-32 bg-secondary/50 dark:bg-secondary/20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="space-y-10 text-center lg:text-left">
                <h2 className="text-fluid-h2 text-foreground dark:text-white">Our Study <span className="text-primary">Strategy.</span></h2>
                <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                  We lead the way in <span className="text-primary font-bold">Standardized Hybrid Learning</span>. Our three-layer system ensures
                  that every student bridges the gap between traditional wisdom and future discovery.
                </p>
                <div className="space-y-8 inline-block text-left">
                  {[
                    { title: "Physical Books", desc: "Core literacy and focus through high-quality printed curriculum.", icon: BookOpen },
                    { icon: Cpu, title: "Interactive Digital", desc: "Complex concepts made easy via visual simulations and digital labs." },
                    { icon: Lightbulb, title: "Discovery Tasks", desc: "Weekly hands-on projects to test real-world knowledge." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-human">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-foreground dark:text-white italic tracking-tight">{item.title}</h4>
                        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-human-lg border-4 md:border-8 border-white dark:border-slate-800 aspect-square">
                <OptimizedImage
                  src={blsOfficialBanner}
                  className="w-full h-full object-cover"
                  alt="Blended Learning"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
