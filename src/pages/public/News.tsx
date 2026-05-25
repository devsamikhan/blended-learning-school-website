import { Bell, Calendar, ArrowRight, Megaphone } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import newsBanner from '@/assets/news_banner_v3.webp';

const newsItems = [
  { id: 1, date: "Oct 24, 2026", title: "Admissions Now Open!", category: "Admissions", excerpt: "Join our growing school family for the 2026 session. Limited seats available." },
  { id: 2, date: "Oct 20, 2026", title: "Robotics Workshop Success", category: "STEM", excerpt: "Our students built their first moving robots this week. Innovation in action!" },
  { id: 3, date: "Oct 15, 2026", title: "Science Fair Winners", category: "Achievement", excerpt: "Congratulations to our junior scientists for their amazing local fair wins." },
];

export function News() {
  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={newsBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="News BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Megaphone className="h-4 w-4" /> Latest Updates
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              School <br className="hidden md:block" />
              <span className="text-primary italic">News.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Stay updated with the latest happenings and achievements from our blended learning community.
            </p>
          </div>
        </section>

        {/* 📰 News Feed */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news) => (
                <Card key={news.id} className="rounded-[2.5rem] border border-border dark:border-white/5 bg-background dark:bg-secondary p-10 shadow-human h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <Badge className="bg-primary/10 text-primary border-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {news.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground text-[9px] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-primary" /> {news.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black font-display text-foreground dark:text-white leading-tight mb-6 italic tracking-tight">
                    {news.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed mb-10 flex-grow">
                    {news.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-primary font-black text-xs uppercase tracking-widest flex items-center group w-fit">
                    Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
