import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatCircle, MapTrifold, Truck, CheckCircle, ShieldCheck, ArrowRight, NavigationArrow, Package, Handshake } from 'phosphor-react';

const serviceAreas = [
  {
    icon: Truck,
    label: "Long Distance Haulage",
    desc: "We provide reliable long-distance haulage services across major national and regional transport routes. Our operations ensure cargo moves efficiently over extended distances while maintaining delivery timelines and consistency."
  },
  {
    icon: NavigationArrow,
    label: "Local Distribution",
    desc: "Our local distribution service supports the movement of goods within cities and surrounding areas, ensuring smooth last-mile delivery and coordinated cargo movement after long-distance transport."
  },
  {
    icon: Handshake,
    label: "Contract Transport Services",
    desc: "We offer contract-based transport solutions for businesses with recurring logistics needs, providing consistent transport availability, predictable scheduling, and reliable service delivery."
  },
  {
    icon: MapTrifold,
    label: "Cross-Border Transportation",
    desc: "We facilitate cross-border cargo movement across Zambia, Zimbabwe, and Tanzania through coordinated routing, proper documentation, and structured execution to minimise delays at border points."
  },
  {
    icon: Package,
    label: "Bulk and General Cargo Transport",
    desc: "We handle agricultural produce, construction materials, mining supplies, and general goods, ensuring proper handling, secure transport, and dependable delivery."
  },
];

const processSteps = [
  { icon: ChatCircle, num: "01", title: "Tell Us Your Requirements", text: "Share pickup and delivery locations, cargo type, estimated weight or volume, and your required timeframe." },
  { icon: MapTrifold, num: "02", title: "We Plan Dispatch", text: "We confirm the route, documentation needs, vehicle capacity, driver monitoring, and delivery schedule." },
  { icon: Truck, num: "03", title: "Cargo Moves", text: "Your shipment is collected, transported along the planned route, monitored, and managed through to destination." },
  { icon: CheckCircle, num: "04", title: "Delivery Confirmed", text: "We confirm handover at the destination and close out the job with delivery documentation." },
];

const stats = [
  { value: 30, suffix: "t", label: "Per Truck Capacity", description: "20 to 30 tons per vehicle" },
  { value: 9, suffix: "+", label: "Countries Served", description: "Zambia and regional coverage" },
  { value: 5, suffix: "", label: "Core Services", description: "Haulage, distribution, contracts, cross-border, cargo" },
  { value: 4, suffix: "", label: "Key Route Types", description: "Copperbelt, southern, border, and local routes" },
];

const useSectionInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const CountUp = ({ target, suffix, duration = 1.8 }: { target: number; suffix: string; duration?: number }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
};

const StatBreaker = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-black border-y border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="px-8 py-14 text-center md:text-left group hover:bg-white/5 transition-colors cursor-default"
            >
              <p className="text-white/30 font-heading text-[10px] uppercase tracking-[0.3em] mb-3">{stat.label}</p>
              <p className="font-heading font-bold text-white leading-none mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                {isInView ? <CountUp target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
                <span className="text-primary">.</span>
              </p>
              <p className="text-white/25 text-[10px] font-body uppercase tracking-wider mt-2">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesGrid = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Transport Services</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            What We Do
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {serviceAreas.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="bg-white p-10 flex flex-col group hover:bg-secondary cursor-default transition-colors duration-500"
            >
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-black text-xs uppercase tracking-wider mb-3 group-hover:text-white transition-colors duration-500">{item.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body flex-grow group-hover:text-white/60 transition-colors duration-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="bg-black py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Process</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight">
            Daily Operations
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-black p-10 flex flex-col group hover:bg-white/5 transition-colors cursor-default"
            >
              <p className="text-white/15 font-heading font-bold text-5xl mb-6 leading-none group-hover:text-primary/20 transition-colors duration-300">{step.num}</p>
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-5 h-5 text-primary" weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">{step.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-body flex-grow group-hover:text-white/70 transition-colors duration-300">{step.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-white/40 text-sm leading-relaxed mt-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Dispatch planning, driver monitoring, fuel control, delivery confirmation, and maintenance tracking are part of the way we keep every shipment accountable.
        </motion.p>
      </div>
    </section>
  );
};

const ServicesCTA = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="flex flex-col lg:flex-row">
      <motion.div
        className="lg:w-3/5 px-10 py-24 md:px-20 flex flex-col justify-center bg-primary"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6">Get Started</p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
          Let's Move<br />Your Cargo
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Share your cargo requirements and we will provide a clear, structured quotation for road freight and logistics support.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start group"
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
          src="/images/truck3.jpg"
          alt="Transport"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Truck className="w-40 h-40 text-white/10" weight="fill" />
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <motion.img
            src="/images/truck1.jpg"
            alt="Road freight transport"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5">Calm Mountain Transport</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  Our<br />Services
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  Reliable road freight, haulage, distribution, contract transport, cross-border transportation, and bulk or general cargo movement.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <StatBreaker />
        <ServicesGrid />
        <HowItWorksSection />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
