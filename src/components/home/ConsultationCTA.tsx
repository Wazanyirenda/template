import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck } from 'phosphor-react';

export const ConsultationCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="flex flex-col lg:flex-row"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Yellow text panel */}
      <div className="lg:w-3/5 px-10 py-24 md:px-20 flex flex-col justify-center bg-primary">
        <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6">Get Started</p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
          Have Cargo<br />That Needs<br />to Move?
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Tell us where it needs to go, what it is, and when you need it there. We will come back to you with a clear transport proposal.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start"
        >
          Get a Quote <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </Link>
      </div>

      {/* Dark image panel */}
      <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-secondary relative">
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=900"
          alt="Transport operations"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Truck className="w-36 h-36 text-white/10" weight="fill" />
        </div>
      </div>
    </motion.section>
  );
};
