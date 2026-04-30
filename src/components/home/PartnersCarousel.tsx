import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  { name: 'Mining Companies' },
  { name: 'Agricultural Suppliers' },
  { name: 'Farmers' },
  { name: 'Construction Companies' },
  { name: 'Retail Distributors' },
  { name: 'Wholesale Distributors' },
  { name: 'Importers' },
  { name: 'Exporters' },
];

export const PartnersCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold text-white/50 uppercase tracking-[0.3em] text-center font-heading"
        >
          Industries We Serve
        </motion.p>
      </div>
      <div className="relative">
        <motion.div
          className="flex items-center gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center min-w-[180px] h-20 border border-white/10 px-8 hover:border-primary/50 transition-colors duration-300"
            >
              <span className="text-lg font-bold text-white/60 whitespace-nowrap font-heading uppercase tracking-wider hover:text-primary transition-colors duration-300">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
