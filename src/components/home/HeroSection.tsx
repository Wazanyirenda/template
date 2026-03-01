import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full min-w-0 overflow-hidden bg-black">
      {/* Blank placeholder — replace with your own image */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

      <div className="container mx-auto px-4 md:px-8 h-full relative z-10 flex items-center pt-20 lg:pt-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-primary text-sm font-bold uppercase tracking-widest mb-5"
          >
            Calm Mountain Transport Limited
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight tracking-tight max-w-4xl"
          >
            We Transport Commercial Cargo Across Southern and Eastern Africa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl"
          >
            We move goods between Zambia, Tanzania, Malawi, Kenya, Uganda, Rwanda, and South Africa. Commercial cargo, scheduled departures, coordinated delivery — end to end.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="btn-primary text-lg inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
            >
              Request a Quote
            </Link>
            <Link
              to="/services"
              className="inline-block bg-white/10 text-white hover:bg-white/20 border border-white/30 px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 text-center"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
