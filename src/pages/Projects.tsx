import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, Wrench, ShieldCheck, NavigationArrow, Snowflake } from 'phosphor-react';

const fleet = [
  {
    category: "Heavy Haulage",
    eyebrow: "30-Tonne Class",
    description: "Our primary long-haul cross-border fleet. Fully containerized, fitted with satellite tracking, and operated by experienced drivers. Ideal for bulk commercial cargo across all corridors.",
    capacity: "Up to 30,000 kg",
    type: "Interlink / Side-tipper",
    routes: "All cross-border corridors",
    accent: "bg-primary",
  },
  {
    category: "Medium Haulage",
    eyebrow: "10–15 Tonne Class",
    description: "A versatile class suited to consolidated cargo and mixed loads. Handles routes where larger trucks face access restrictions, including some inland delivery areas.",
    capacity: "Up to 15,000 kg",
    type: "Rigid flatbed / Curtainsider",
    routes: "Regional and inland routes",
    accent: "bg-secondary",
  },
  {
    category: "Light Commercial",
    eyebrow: "3.5–7 Tonne Class",
    description: "Used for urgent, smaller consignments and last-mile delivery within Zambia. These units are also deployed for ad-hoc cargo requirements at short notice.",
    capacity: "Up to 7,000 kg",
    type: "Dropside / Van body",
    routes: "Inland / Last-mile",
    accent: "bg-primary",
  },
  {
    category: "Refrigerated Transport",
    eyebrow: "Cold Chain",
    description: "Temperature-controlled units for fresh and frozen food manufacturers requiring unbroken cold chain integrity from collection through to final delivery.",
    capacity: "Up to 15,000 kg",
    type: "Reefer / Refrigerated van",
    routes: "Domestic & cross-border",
    accent: "bg-secondary",
  },
];

const capabilities = [
  { icon: Truck, title: "30+ Trucks", desc: "A maintained fleet of over 30 vehicles spanning heavy haulage, medium, light commercial, and refrigerated classes." },
  { icon: Wrench, title: "In-House Workshop", desc: "A dedicated workshop staffed by qualified mechanics ensures fleet reliability. Road breakdowns are recovered by our own recovery vehicle." },
  { icon: NavigationArrow, title: "Satellite Tracking", desc: "All trucks are fitted with GPS satellite tracking. Real-time location reports are available for active shipments on request." },
  { icon: ShieldCheck, title: "Vetted Drivers", desc: "All drivers are vetted before employment, carry the appropriate licenses, and are supplied with required safety and personal protective equipment." },
  { icon: Snowflake, title: "Cold Chain Ready", desc: "Our refrigerated units maintain consistent temperature throughout transit, protecting food-grade and pharmaceutical cargo." },
  { icon: Truck, title: "Yard & Parking", desc: "3,000 sqm of secured yard space for fleet parking and cargo staging, with 2,120 sqm of bonded warehousing adjacent." },
];

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const FleetClassesSection = () => {
  const { ref, isInView } = useSection();
  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Vehicle Classes</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            Our Fleet
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6 mb-6" />
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed font-body">
            Calm Mountain Transport operates a diverse fleet of over 30 vehicles. Each class is matched to a different cargo type and route requirement — from heavy cross-border loads to refrigerated food cargo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {fleet.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="bg-white group overflow-hidden flex flex-col hover:bg-muted/30 transition-colors"
            >
              <div className={`h-1 w-full ${item.accent} group-hover:h-1.5 transition-all duration-300`} />
              <div className="p-10 flex flex-col flex-grow">
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-3">{item.eyebrow}</p>
                <h3 className="text-2xl font-bold font-heading text-black uppercase leading-tight mb-4">{item.category}</h3>
                <div className="w-10 h-0.5 bg-primary mb-6" />
                <p className="text-gray-600 text-sm font-body leading-relaxed mb-8 flex-grow">{item.description}</p>
                <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                  <div>
                    <p className="text-black/40 text-[10px] font-heading uppercase tracking-wider mb-1">Capacity</p>
                    <p className="text-black font-heading font-bold text-xs uppercase">{item.capacity}</p>
                  </div>
                  <div>
                    <p className="text-black/40 text-[10px] font-heading uppercase tracking-wider mb-1">Body Type</p>
                    <p className="text-black font-heading font-bold text-xs uppercase">{item.type}</p>
                  </div>
                  <div>
                    <p className="text-black/40 text-[10px] font-heading uppercase tracking-wider mb-1">Routes</p>
                    <p className="text-black font-heading font-bold text-xs uppercase">{item.routes}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FleetCapabilitiesSection = () => {
  const { ref, isInView } = useSection();
  return (
    <section ref={ref} className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Operations</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight">
            Fleet Capabilities
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-black p-10 flex flex-col group hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-body flex-grow">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FleetImageSection = () => {
  const { ref, isInView } = useSection();
  return (
    <section ref={ref} className="grid lg:grid-cols-[5fr_6fr] bg-muted/30 overflow-hidden">
      <motion.div
        className="h-[450px] lg:h-auto overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=900"
          alt="Calm Mountain Transport fleet"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <motion.div
          className="absolute bottom-8 right-0 bg-primary px-8 py-5 shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-heading font-bold text-2xl text-black leading-none">30+</p>
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-black/70 mt-1">Active Vehicles</p>
        </motion.div>
        <div className="absolute bottom-4 left-6 flex gap-2">
          <span className="w-2.5 h-2.5 bg-primary block" />
          <span className="w-2.5 h-2.5 bg-secondary block" />
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center px-10 py-24 md:px-16"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Maintained & Ready</p>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
          A Fleet Built<br />for the Corridor
        </h2>
        <div className="w-14 h-0.5 bg-primary mb-8" />
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-body mb-10">
          <p>Every vehicle in our fleet is maintained by our in-house workshop team. We do not wait for breakdowns — we prevent them through scheduled servicing and regular inspections.</p>
          <p>Our recovery vehicle is always on standby, and drivers carry direct contact lines so that any issue on the road is resolved quickly and without delay to your cargo.</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors group self-start"
        >
          Enquire About Capacity <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" weight="bold" />
        </Link>
      </motion.div>
    </section>
  );
};

const FleetCTA = () => {
  const { ref, isInView } = useSection();
  return (
    <section ref={ref} className="flex flex-col lg:flex-row">
      <motion.div
        className="lg:w-3/5 px-10 py-24 md:px-20 flex flex-col justify-center bg-primary"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6">Get in Touch</p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
          Need a<br />Truck?
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Tell us your cargo requirements and route. We'll confirm the appropriate vehicle class and arrange a quotation.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start"
        >
          Request a Quote <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </Link>
      </motion.div>
      <motion.div
        className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-secondary relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900"
          alt="Fleet"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Truck className="w-32 h-32 text-white/10" weight="fill" />
        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2070"
            alt="Calm Mountain Transport fleet"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">30+ Vehicles</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white uppercase tracking-tight leading-none mb-6">
                  Our<br />Fleet
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  A maintained fleet of heavy haulage, medium, light commercial, and refrigerated vehicles — ready for cross-border and inland cargo.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <FleetClassesSection />
        <FleetCapabilitiesSection />
        <FleetImageSection />
        <FleetCTA />

      </main>
      <Footer />
    </div>
  );
};

export default Projects;
