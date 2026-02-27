import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapTrifold, Globe, ChatCircle, Handshake } from 'phosphor-react';

const reasons = [
  {
    title: "Scheduled & Structured",
    description: "We plan every shipment before it moves — route, timing, border requirements, and delivery. Nothing is left to chance.",
    icon: MapTrifold
  },
  {
    title: "Regional Experience",
    description: "We know Southern and Eastern Africa. We understand border crossing realities, route conditions, and what it takes to keep cargo moving reliably.",
    icon: Globe
  },
  {
    title: "Consistent Communication",
    description: "You will know the status of your cargo. We keep clients informed at key stages — from dispatch through to delivery confirmation.",
    icon: ChatCircle
  },
  {
    title: "Built for Business",
    description: "We work with companies that need regular, dependable transport — not one-off trips. If you move cargo frequently, we are the right partner.",
    icon: Handshake
  }
];

export const SmartSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">The Difference</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight">
            Why Businesses Work With Us
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary p-10 flex flex-col group hover:bg-white/5 transition-colors"
            >
              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-7 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-5 h-5 text-primary" weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">{reason.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-body flex-grow">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
