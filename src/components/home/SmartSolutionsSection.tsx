import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapTrifold, ChatCircle, Handshake, ShieldCheck } from 'phosphor-react';

const reasons = [
  {
    title: "Disciplined Planning",
    description: "We plan dispatches, routes, fuel control, driver monitoring, delivery confirmation, and maintenance tracking so operations stay predictable.",
    icon: MapTrifold
  },
  {
    title: "Clear Communication",
    description: "We maintain honest timelines, clear pricing, and regular shipment updates so clients always know where their cargo stands.",
    icon: ChatCircle
  },
  {
    title: "Safe Execution",
    description: "We prioritize cargo integrity and responsible transport practices at every stage, from collection through final delivery.",
    icon: ShieldCheck
  },
  {
    title: "Client Commitment",
    description: "Satisfying customers is key to our success. We build long-term relationships through reliable and predictable logistics support.",
    icon: Handshake
  }
];

export const SmartSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
