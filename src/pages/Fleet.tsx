import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, Wrench, ShieldCheck, NavigationArrow, Gauge } from 'phosphor-react';

const fleet = [
  {
    category: "Heavy-Duty Haulage Trucks",
    eyebrow: "Initial Fleet",
    description: "A heavy-duty haulage fleet selected to support long-distance, domestic, and cross-border cargo movement.",
    capacity: "20-30 tons",
    body_type: "Heavy-duty",
    routes: "Zambia / SADC",
    accent: "bg-primary"
  },
];

const capabilities = [
  { icon: Truck, title: "Heavy-Duty Haulage Fleet", desc: "The company operates trucks designed for long-distance, domestic, and cross-border haulage." },
  { icon: Gauge, title: "20 to 30 Ton Capacity", desc: "Each vehicle is intended to support cargo loads within the 20 to 30 ton range." },
  { icon: NavigationArrow, title: "Route Planning", desc: "Key routes include Lusaka to Ndola, Lusaka to Kitwe, Lusaka to Livingstone, and cross-border routes into Zimbabwe and Tanzania." },
  { icon: ShieldCheck, title: "Driver Monitoring", desc: "Daily operations include driver monitoring, delivery confirmation, and clear communication with clients." },
  { icon: Wrench, title: "Maintenance Tracking", desc: "Maintenance tracking is part of the operating discipline used to protect vehicle reliability and cargo delivery timelines." },
];

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

type FleetDisplayItem = { category: string; eyebrow: string; description: string; capacity: string; body_type: string; routes: string; accent: string };

const FleetClassesSection = ({ fleet }: { fleet: FleetDisplayItem[] }) => {
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
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Fleet</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            Our Fleet
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6 mb-6" />
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed font-body">
            Calm Mountain Transport operates heavy-duty haulage trucks with 20 to 30 tons of carrying capacity per vehicle.
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
                <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-3">{item.eyebrow}</p>
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
                    <p className="text-black font-heading font-bold text-xs uppercase">{item.body_type}</p>
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
            Fleet & Operations
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
          src="/images/truck1.jpg"
          alt="Calm Mountain Transport fleet"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <motion.div
          className="absolute bottom-8 right-0 bg-primary px-8 py-5 shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-heading font-bold text-2xl text-black leading-none">20-30t</p>
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-black/70 mt-1">Per Vehicle</p>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center px-10 py-24 md:px-16"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Daily Control</p>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
          Planned, Monitored,<br />Confirmed
        </h2>
        <div className="w-14 h-0.5 bg-primary mb-8" />
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-body mb-10">
          <p>Daily operations include dispatch planning, driver monitoring, fuel control, delivery confirmation, and maintenance tracking.</p>
          <p>This operating rhythm supports safer cargo movement, more predictable delivery, and stronger accountability from collection to final handover.</p>
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

const Fleet = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <img
            src="/images/truck2.jpg"
            alt="Calm Mountain Transport fleet"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5">Heavy-Duty Haulage</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  Our<br />Fleet
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  Heavy-duty haulage trucks with 20 to 30 tons of capacity per vehicle.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <FleetClassesSection fleet={fleet} />
        <FleetCapabilitiesSection />
        <FleetImageSection />
      </main>
      <Footer />
    </div>
  );
};

export default Fleet;
