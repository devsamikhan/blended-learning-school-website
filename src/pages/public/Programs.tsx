import {
  Sparkles, Cpu, Lightbulb,
  Rocket, Heart, Music,
  Palette, Trophy, Star, CheckCircle2
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import programsBanner from '@/assets/programs_banner_v3.webp';
import blsOfficialBanner from '@/assets/bls_official_banner.webp';

const programs = [
  {
    id: "stem",
    title: "STEM & Robotics",
    icon: Cpu,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    desc: "Our flagship program where students build robots and learn to code using modern tools.",
    features: ["Lego Robotics", "Scratch Coding", "Science Projects", "Tech Competitions"]
  },
  {
    id: "arts",
    title: "Arts & Creativity",
    icon: Palette,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    desc: "Discovering the artist within, BLS is committed to enhance the creativity of students. We focus on painting, calligraphy,drawing and much more.",
    features: ["Painting", "Colouring", "Calligraphy", "Drawing"]
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: Trophy,
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
    desc: "Our AI program empowers students with the skills to design, build, and deploy intelligent systems and prepare them for the future of technology.",
    features: ["Artificial Intelligence", "Google AI Studio", "Suno AI"]
  }
];

export function Programs() {
  const [activeTab, setActiveTab] = useState("stem");

  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={programsBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="Programs BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Sparkles className="h-4 w-4" /> Modern Skills
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              Extra <br className="hidden md:block" />
              <span className="text-primary italic">Programs.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Nurturing STEM, arts, and character through our integrated blended learning models.
            </p>
          </div>
        </section>

        {/* 🎡 Tabs Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="stem" onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-16 md:mb-20">
                <TabsList className="bg-border dark:bg-slate-800/50 p-1 rounded-full h-auto flex-wrap justify-center gap-1">
                  {programs.map((p) => (
                    <TabsTrigger
                      key={p.id}
                      value={p.id}
                      className="rounded-full px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-white shadow-none"
                    >
                      {p.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                {programs.map((p) => (
                  <TabsContent key={p.id} value={p.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                      <div className="space-y-8 text-center lg:text-left">
                        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shadow-human mx-auto lg:mx-0", p.bg, p.color)}>
                          <p.icon size={32} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black font-display text-foreground dark:text-white leading-tight italic tracking-tighter">{p.title}</h2>
                        <p className="text-base md:text-lg text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">
                          {p.desc}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                          {p.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-4 p-5 rounded-2xl bg-background dark:bg-secondary shadow-human border border-border dark:border-white/5">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              <span className="text-sm md:text-base font-bold text-foreground dark:text-white italic tracking-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-human-lg border-4 md:border-8 border-white dark:border-slate-800 aspect-square">
                        <OptimizedImage
                          src={blsOfficialBanner}
                          className="w-full h-full object-cover"
                          alt={p.title}
                        />
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
