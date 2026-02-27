import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { SmartSolutionsSection } from '@/components/home/SmartSolutionsSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const IntroductionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-heading font-bold text-foreground text-xs uppercase tracking-[0.25em] leading-relaxed">
              Calm Mountain<br />Transport<br />Limited
            </p>
            <div className="w-8 h-0.5 bg-primary mt-4" />
          </motion.div>
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-foreground font-heading font-bold text-2xl sm:text-3xl md:text-4xl uppercase leading-tight max-w-2xl mb-6">
              Cross-Border Cargo Transport Across Seven Countries.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-xl">
              We move commercial goods between seven countries in Southern and Eastern Africa — providing businesses with structured, reliable, and professionally coordinated transport from pickup to delivery. One service. Done properly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntroductionSection />
        <SolutionsSection />
        <SmartSolutionsSection />
        <NewsSection />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
