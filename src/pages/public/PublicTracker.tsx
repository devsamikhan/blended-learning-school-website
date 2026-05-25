import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, CheckCircle2, Clock, 
  User, ShieldCheck, Sparkles, Loader2
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from '../../lib/utils';
import { OptimizedImage } from '../../components/ui/OptimizedImage';

interface TrackingResult {
  studentName: string;
  fatherName: string;
  grade: string;
  status: 'Pending' | 'In Review' | 'Approved' | 'Interview Scheduled';
  submissionDate: string;
  nextStep: string;
}

export function PublicTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbx8e1AHn4J-2cFX5lUf3pdL41P0qimkiXPnou9up0xNvaq6L5GQrfVaLBpPZG3EHiAV/exec?trackingId=${trackingId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data.data);
        toast.success("Status Found!");
      } else {
        toast.error("ID not found.");
      }
    } catch (error) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">
        
        {/* 🌿 Final Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1454165833767-027ff33027ef?w=1600&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-[0.95] dark:brightness-[0.4]" 
              alt="Application Status"
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-secondary/90 dark:bg-secondary border border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5" /> Admission Status
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-8">
              Application <br className="hidden md:block" />
              <span className="text-primary italic">Tracker.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto">
              Enter your Tracking ID to see your child's progress.
            </p>
          </div>
        </section>

        {/* 🔍 Search Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mx-auto mb-16">
              <Card className="p-4 rounded-full bg-background dark:bg-secondary shadow-human border border-border dark:border-white/5">
                <form onSubmit={handleTrack} className="flex gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary h-4 w-4" />
                    <Input 
                      placeholder="Tracking ID (e.g. BLS-12345)" 
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="h-14 pl-14 pr-6 rounded-full bg-secondary dark:bg-slate-800 border-none focus-visible:ring-primary shadow-inner font-bold"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="h-14 px-8 rounded-full bg-primary text-white font-bold">
                    {loading ? <Loader2 className="animate-spin" /> : "Track"}
                  </Button>
                </form>
              </Card>
            </div>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
                  <Card className="rounded-[2.5rem] border border-border dark:border-white/5 bg-background dark:bg-secondary p-10 shadow-human-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <Badge className="bg-primary text-white border-none px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">
                            {result.status}
                          </Badge>
                          <h2 className="text-3xl font-black font-display text-foreground dark:text-white italic leading-tight">{result.studentName}</h2>
                          <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest">
                             <User size={14} className="text-primary" /> S/O {result.fatherName}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-5 rounded-2xl bg-secondary dark:bg-slate-800">
                              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Grade</p>
                              <p className="text-lg font-black text-foreground dark:text-white">{result.grade}</p>
                           </div>
                           <div className="p-5 rounded-2xl bg-secondary dark:bg-slate-800">
                              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Date</p>
                              <p className="text-lg font-black text-foreground dark:text-white">{result.submissionDate}</p>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                         <div className="p-8 rounded-[2rem] bg-primary/5 dark:bg-primary/10 border border-primary/10">
                            <div className="flex items-center gap-3 mb-4">
                               <Sparkles size={18} className="text-primary" />
                               <h4 className="text-sm font-black text-primary uppercase tracking-widest">Next Step</h4>
                            </div>
                            <p className="text-base text-muted-foreground dark:text-slate-300 font-bold leading-relaxed mb-4">
                               {result.nextStep}
                            </p>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                               <Clock size={12} className="text-primary" /> Updated Recently
                            </div>
                         </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
