import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  Heart, CheckCircle2, 
  Phone, Send, Loader2, Info, Star, Leaf, MessageCircle, UserPlus
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { toast } from "sonner";
import { cn } from '../../lib/utils';

const steps = [
  { title: "Come Visit Us", desc: "Visit our campus and meet the teachers.", icon: Heart },
  { title: "Submit a Note", desc: "Fill out the simple form below.", icon: Info },
  { title: "A Friendly Chat", desc: "We'll invite you for a talk.", icon: MessageCircle },
  { title: "Welcome Home", desc: "Your child joins our family.", icon: Star },
];

const feeStructure = [
  { grade: "PG to Class 2", total: "Rs. 2,500", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { grade: "Class 3 to 8", total: "Rs. 3,000", color: "text-primary", bg: "bg-primary/5 dark:bg-primary/10" }
];

export function Admissions() {
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx8e1AHn4J-2cFX5lUf3pdL41P0qimkiXPnou9up0xNvaq6L5GQrfVaLBpPZG3EHiAV/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ formType: "Admission", ...data }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setSubmittedId(result.trackingId);
        toast.success("Application received!");
        formRef.current?.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Error sending. Check connection.");
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
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&auto=format&fit=crop" 
              className="w-full h-full object-cover brightness-[0.95] dark:brightness-[0.4]" 
              alt="Admissions BLS"
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-secondary/90 dark:bg-secondary border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest">
              <UserPlus className="h-3.5 w-3.5" /> Admission Portal
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-8">
              Join the <br className="hidden md:block" />
              <span className="text-primary italic">Pioneers.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto">
              Ready to start your child's blended learning journey? 
            </p>
          </div>
        </section>

        {/* 🛤️ Guide Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.title} className="relative group">
                  <Card className="h-full rounded-[2rem] bg-background dark:bg-secondary border border-border dark:border-white/5 p-8 shadow-human text-center">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <step.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-foreground dark:text-white mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                    <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-white font-black flex items-center justify-center shadow-human border-2 border-white dark:border-slate-800 text-xs">
                      {i + 1}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 📝 Inquiry Form */}
        <section className="py-20 md:py-32 bg-secondary dark:bg-secondary/20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
              
              <div className="space-y-10">
                <h2 className="text-fluid-h2 text-foreground dark:text-white">Send us a <br /><span className="text-primary italic">Note.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {feeStructure.map((fee, i) => (
                    <Card key={i} className="p-8 rounded-[2rem] border-none shadow-human text-center overflow-hidden relative">
                       <div className={cn("absolute inset-0 opacity-10", fee.bg)} />
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 relative z-10">{fee.grade}</p>
                       <p className={cn("text-2xl font-black font-display relative z-10", fee.color)}>{fee.total}</p>
                    </Card>
                  ))}
                </div>
                <div className="p-8 rounded-[2rem] bg-background dark:bg-secondary border border-border dark:border-white/5 shadow-human flex gap-6 items-center">
                   <Phone className="h-6 w-6 text-primary shrink-0" />
                   <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Direct Admission Office</p>
                      <p className="text-xl font-black text-foreground dark:text-white">+92 300 0136840</p>
                   </div>
                </div>
              </div>

              <Card className="rounded-[2.5rem] bg-background dark:bg-secondary p-8 md:p-12 shadow-human-lg">
                <AnimatePresence mode="wait">
                  {submittedId ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                      <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-foreground dark:text-white mb-4 italic">Received!</h3>
                      <p className="text-sm text-slate-500 font-medium mb-6">Tracking ID:</p>
                      <div className="p-4 rounded-xl bg-secondary dark:bg-slate-800 text-primary font-black text-xl tracking-widest mb-8 border-2 border-dashed border-primary/20">
                        {submittedId}
                      </div>
                      <Button onClick={() => setSubmittedId(null)} className="h-14 px-8 rounded-full bg-primary text-white font-bold">New Form</Button>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Student's Name</Label>
                           <Input name="studentName" required placeholder="Full Name" className="h-12 rounded-xl bg-secondary dark:bg-slate-800 border-none px-4 focus-visible:ring-primary shadow-inner" />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Grade (Up to 8)</Label>
                           <Input name="gradeAppliedFor" required placeholder="e.g. Class 5" className="h-12 rounded-xl bg-secondary dark:bg-slate-800 border-none px-4 focus-visible:ring-primary shadow-inner" />
                         </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Father's Name</Label>
                           <Input name="fatherName" required placeholder="Full Name" className="h-12 rounded-xl bg-secondary dark:bg-slate-800 border-none px-4 focus-visible:ring-primary shadow-inner" />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone</Label>
                           <Input name="whatsappNumber" required placeholder="03xx xxxxxxx" className="h-12 rounded-xl bg-secondary dark:bg-slate-800 border-none px-4 focus-visible:ring-primary shadow-inner" />
                         </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Message</Label>
                        <Textarea name="message" placeholder="Optional" className="min-h-[100px] rounded-xl bg-secondary dark:bg-slate-800 border-none p-4 resize-none focus-visible:ring-primary shadow-inner" />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full h-16 rounded-full bg-foreground dark:bg-background text-white dark:text-slate-950 font-bold text-lg shadow-human-lg">
                        {loading ? <Loader2 className="animate-spin" /> : <>Send Application <Send className="ml-3 h-5 w-5" /></>}
                      </Button>
                    </form>
                  )}
                </AnimatePresence>
              </Card>

            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
