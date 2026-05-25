import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Mail, Phone, MapPin, Send,
  Clock, Heart, CheckCircle2,
  Loader2, MessageCircle
} from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from '../../lib/utils';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import contactBanner from '@/assets/contact_banner_v3.webp';

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+92 300 0136840",
    sub: "Mon – Sat · 08:00 – 15:00",
    href: "tel:+923000136840",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "bls.esakhel@gmail.com",
    sub: "Reply within a day",
    href: "mailto:bls.esakhel@gmail.com",
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Police Station, Isakhel",
    sub: "Mianwali, Punjab",
    href: "https://maps.google.com/?q=Isakhel+Mianwali+Punjab",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx8e1AHn4J-2cFX5lUf3pdL41P0qimkiXPnou9up0xNvaq6L5GQrfVaLBpPZG3EHiAV/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ formType: "Contact", ...data }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setSubmittedId(result.trackingId);
        toast.success("Message sent!");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Error. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={contactBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="Contact BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Heart className="h-4 w-4" /> Expert Support
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              Get in <br className="hidden md:block" />
              <span className="text-primary italic">Touch.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Have questions or want to visit? Our team is here to support your blended learning journey.
            </p>
          </div>
        </section>

        {/* 📞 Contact Cards */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactInfo.map((item) => (
                <a key={item.title} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group">
                  <Card className="p-8 rounded-[2rem] bg-background dark:bg-secondary border border-border dark:border-white/5 shadow-human text-center h-full">
                    <div className={cn("h-14 w-14 mx-auto rounded-xl flex items-center justify-center mb-8", item.bg, item.color)}>
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-foreground dark:text-white mb-2 font-display italic leading-none">{item.title}</h3>
                    <p className="text-base font-bold text-muted-foreground dark:text-slate-300 mb-6 break-all">{item.detail}</p>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <Clock size={14} className="text-primary" /> {item.sub}
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 📍 Form Section */}
        <section className="py-20 md:py-32 bg-secondary dark:bg-secondary/20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

              <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-human-lg border-4 md:border-8 border-white dark:border-slate-800 min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.6!2d71.9!3d32.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b8d0000000001%3A0x1!2sIsakhel%2C+Mianwali%2C+Punjab%2C+Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>

              <Card className="p-8 md:p-12 rounded-[2.5rem] bg-background dark:bg-secondary shadow-human-lg h-full">
                <AnimatePresence mode="wait">
                  {submittedId ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                      <CheckCircle2 size={40} className="text-primary mx-auto mb-6" />
                      <h4 className="text-2xl font-black text-foreground dark:text-white mb-4 italic">Thank You!</h4>
                      <p className="text-sm text-slate-500 font-medium mb-12">We'll talk to you within a few hours.</p>
                      <Button onClick={() => setSubmittedId(null)} className="h-14 px-10 rounded-full bg-primary text-white font-bold w-full sm:w-auto">New Message</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Your Name</Label>
                        <Input name="fullName" required placeholder="Full Name" className="h-12 rounded-xl bg-secondary dark:bg-slate-800/50 border border-border dark:border-white/5 px-6 focus-visible:ring-primary shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Email</Label>
                        <Input name="email" type="email" required placeholder="your@email.com" className="h-12 rounded-xl bg-secondary dark:bg-slate-800/50 border border-border dark:border-white/5 px-6 focus-visible:ring-primary shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Message</Label>
                        <Textarea name="message" required placeholder="How can we help?" className="min-h-[120px] rounded-2xl bg-secondary dark:bg-slate-800/50 border border-border dark:border-white/5 p-6 resize-none focus-visible:ring-primary shadow-inner" />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-human-lg transition-all active:scale-95">
                        {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send className="ml-3 h-5 w-5" /></>}
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
