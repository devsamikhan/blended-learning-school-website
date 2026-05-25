import { useState } from 'react';
import { Camera, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import galleryBanner from '@/assets/gallery_banner_v3.webp';

const galleryItems = [
  {
    id: 1,
    title: "English Speaking Activity",
    category: "Video",
    videoId: "pOVHj2bruWU",
    type: "video"
  },
  {
    id: 2,
    title: "Robotics Discovery",
    category: "Video",
    videoId: "kHDSYS4GnfA",
    type: "video"
  },
  {
    id: 3,
    title: "Quick Response",
    category: "Video",
    videoId: "eJP79hcgsOM",
    type: "video"
  },
  {
    id: 4,
    title: "Classroom Learning",
    category: "Learning",
    videoId: "8JTk1yat5Ko",
    type: "video"
  },
  {
    id: 5,
    title: "Sports Excellence",
    category: "Sports",
    videoId: "o6duXzVeQwM",
    type: "video"
  },
  {
    id: 6,
    title: "Creative Arts",
    category: "Arts",
    videoId: "Evk90JMuam4",
    type: "video"
  },
];

export function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <PublicLayout>
      <div className="relative w-full overflow-hidden">

        {/* 🌿 Final Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
            <OptimizedImage
              src={galleryBanner}
              className="w-full h-full object-cover brightness-[1.02] dark:brightness-[0.5]"
              alt="Gallery BLS"
              priority
            />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center mt-20">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-background/80 dark:bg-secondary/80 backdrop-blur-md border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.3em] shadow-human">
              <Camera className="h-4 w-4" /> Discovery Moments
            </div>
            <h1 className="text-fluid-h1 text-foreground dark:text-white mb-6 drop-shadow-sm">
              Media <br className="hidden md:block" />
              <span className="text-primary italic">Gallery.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground font-medium max-w-2xl mx-auto drop-shadow-sm">
              Explore our journey through a blend of digital discovery and traditional school memories.
            </p>
          </div>
        </section>

        {/* 🖼️ Grid Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {galleryItems.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => item.type === 'video' && setSelectedVideo(item.videoId)}
                  className="rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-human bg-background dark:bg-secondary group cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    {/* Thumbnail Implementation */}
                    <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                      <OptimizedImage
                        src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    {/* Attractive Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-primary">
                        <Play fill="currentColor" className="h-8 w-8 ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                      <Badge className="bg-primary text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full mb-2 flex items-center gap-1.5 shadow-lg">
                        <Play size={10} fill="currentColor" /> {item.category}
                      </Badge>
                      <h3 className="text-xl font-black text-white font-display italic leading-none drop-shadow-2xl">{item.title}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 🎬 Video Lightbox (Modal) */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-950/95 backdrop-blur-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              <button
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-4 z-[110]"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="h-10 w-10" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-black border-4 border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full border-0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PublicLayout>
  );
}
