import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const industries = [
  {
    category: 'Mining',
    title: 'Mining Companies',
    excerpt: 'Transport support for mining operations that need reliable movement of supplies, materials, equipment, and general cargo.',
    image_url: '/images/truck1.jpg',
  },
  {
    category: 'Agriculture',
    title: 'Agricultural Suppliers and Farmers',
    excerpt: 'Road freight for agricultural produce, inputs, and supplier cargo moving between farms, buyers, depots, and regional markets.',
    image_url: '/images/truck2.jpg',
  },
  {
    category: 'Construction',
    title: 'Construction Companies',
    excerpt: 'Haulage for construction materials and project cargo that needs safe handling, dependable scheduling, and clear delivery coordination.',
    image_url: '/images/truck3.jpg',
  },
  {
    category: 'Distribution',
    title: 'Retail and Wholesale Distributors',
    excerpt: 'Local and long-distance distribution support for businesses that need predictable cargo movement into cities and surrounding areas.',
    image_url: '/images/IMG-20260428-WA0055.jpg',
  },
  {
    category: 'Trade',
    title: 'Importers and Exporters',
    excerpt: 'Cross-border transport support for businesses moving goods through Zambia and across regional SADC routes.',
    image_url: '/images/IMG-20260428-WA0059.jpg',
  },
];

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Our Customers</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            Industries We Serve
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {industries.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white group overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-widest shadow">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="w-8 h-0.5 bg-primary mb-4" />
                <h3 className="text-base font-bold font-heading text-black mb-3 uppercase leading-tight group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-body flex-grow">
                  {item.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
