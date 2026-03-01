import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChatCircle, MapTrifold, Truck, CheckCircle,
  ShieldCheck, Wrench, ArrowRight,
  AirplaneTilt, Snowflake, NavigationArrow, Buildings
} from 'phosphor-react';

// ─── DATA ───────────────────────────────────────────────────────────────────

const countries = ["Zambia", "Tanzania", "Malawi", "Kenya", "Uganda", "Rwanda", "South Africa", "DR Congo", "Zimbabwe", "Mozambique", "Namibia"];

const transportPorts = [
  "Dar Es Salaam — Tanzania",
  "Beira — Mozambique",
  "Durban — South Africa",
  "Walvis Bay — Namibia",
];

const customsServices = [
  "Permanent & Temporary Imports",
  "Transit Clearance",
  "Exempted Cargo",
  "Re-Export Processing",
  "Import Under Bond",
  "Export Documentation",
];

const clearancePorts = [
  { country: "Zambia", type: "Hub" },
  { country: "Mozambique", type: "Corridor" },
  { country: "South Africa", type: "Corridor" },
  { country: "Malawi", type: "Corridor" },
  { country: "Uganda", type: "Corridor" },
  { country: "Rwanda", type: "Corridor" },
  { country: "DRC", type: "Corridor" },
  { country: "Tanzania", type: "Corridor" },
];

const processSteps = [
  { icon: ChatCircle, num: "01", title: "Tell Us Your Requirements", text: "Contact us with pickup and delivery locations, cargo type, estimated weight or volume, and your required timeframe." },
  { icon: MapTrifold, num: "02", title: "We Plan the Route", text: "We map the appropriate corridor, confirm border requirements, and schedule a departure date that works for you." },
  { icon: Truck, num: "03", title: "Cargo Moves", text: "Your shipment is collected, transported along the planned route, and monitored through to delivery." },
  { icon: CheckCircle, num: "04", title: "Delivery Confirmed", text: "We confirm handover at the destination and close out the job with full documentation." },
];

const operationalServices = [
  { icon: Truck, label: "Road Haulage", desc: "Fleet of containerised trucks from 3.5t to 30t, handling consolidated and bulk loads from 1 kg up to 30,000 kg nationwide." },
  { icon: Snowflake, label: "Refrigerated Transport", desc: "Temperature-controlled transport for fresh and frozen goods — maintaining cold chain integrity from collection to final delivery." },
  { icon: NavigationArrow, label: "Tracking & Monitoring", desc: "All trucks fitted with satellite tracking and drivers reachable around the clock. Real-time reports available on request." },
  { icon: ShieldCheck, label: "Safety & Security", desc: "All drivers vetted prior to employment, safety equipment provided, and comprehensive security maintained across our yard and facilities." },
  { icon: Buildings, label: "Storage & Warehousing", desc: "2,120 sqm of warehouse space, 3,000 sqm of secure parking, and 350 sqm of offices — purpose-built for consolidation and pre-dispatch storage." },
  { icon: Wrench, label: "Workshop Facilities", desc: "Dedicated in-house workshop staffed by qualified mechanics, supported by a recovery vehicle to keep our fleet in prime operational condition." },
];

const stats = [
  { value: 30, suffix: "+", label: "Trucks in Fleet", description: "Heavy, medium, and light commercial vehicles" },
  { value: 11, suffix: "", label: "Countries Served", description: "Across Southern and Eastern Africa" },
  { value: 2120, suffix: " sqm", label: "Warehouse Space", description: "Purpose-built for consolidation and storage" },
  { value: 4, suffix: "", label: "Ocean Ports", description: "Dar es Salaam, Beira, Durban & Walvis Bay" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

const useSectionInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

// ─── COUNT-UP COMPONENT ──────────────────────────────────────────────────────

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

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
};

// ─── ANIMATED LINE ───────────────────────────────────────────────────────────

const AnimatedLine = ({ inView }: { inView: boolean }) => (
  <motion.div
    className="w-14 h-0.5 bg-primary mb-8"
    initial={{ scaleX: 0, originX: 0 }}
    animate={inView ? { scaleX: 1 } : {}}
    transition={{ duration: 0.5, delay: 0.3 }}
    style={{ transformOrigin: "left" }}
  />
);

// ─── SERVICE SECTIONS ────────────────────────────────────────────────────────

const CrossBorderSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="grid lg:grid-cols-[3fr_2fr] bg-secondary overflow-hidden">
      <motion.div
        className="flex flex-col justify-center px-10 py-24 md:px-20"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <motion.p
          className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Core Service
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Cross-Border Cargo<br />Transportation
        </motion.h2>
        <AnimatedLine inView={isInView} />
        <motion.p
          className="text-white/65 text-sm font-body leading-relaxed mb-4 max-w-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Our primary service is the movement of commercial cargo across borders. We connect businesses in Zambia to suppliers, buyers, and partners across the region — and back again.
        </motion.p>
        <motion.p
          className="text-white/65 text-sm font-body leading-relaxed mb-10 max-w-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          We support cargo movement in both import and export directions, structured around your timeline and operational requirements.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {countries.map((c, i) => (
            <motion.span
              key={c}
              className="px-4 py-1.5 border border-primary/50 text-primary font-heading font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.55 + i * 0.04 }}
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="relative h-[400px] lg:h-auto overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=900"
          alt="Cross-border transport route"
          className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent lg:block hidden" />
      </motion.div>
    </section>
  );
};

const CustomsClearanceSection = () => {
  const { ref, isInView } = useSectionInView();

  const cmsSteps = [
    { n: '01', title: 'Documentation Preparation', desc: 'We prepare all required import, export, and transit documents — bills of lading, packing lists, certificates of origin, and permits — before cargo reaches the border.' },
    { n: '02', title: 'Classification & Valuation', desc: 'We classify goods under the correct HS codes and declare accurate values, ensuring compliance with ZRA, ZICB, and cross-border revenue authority requirements.' },
    { n: '03', title: 'Border Submission', desc: 'Our agents submit declarations electronically via ASYCUDA or the relevant country system. Physical documents are lodged at the border post or port of entry.' },
    { n: '04', title: 'Release & Handover', desc: 'Once cleared, we coordinate immediate cargo release and hand over to the transport team for onward delivery — no unnecessary delays.' },
  ];

  return (
    <section ref={ref} className="bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        className="grid lg:grid-cols-[5fr_6fr] overflow-hidden border-b border-border"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="relative h-[360px] lg:h-auto overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=900"
            alt="Customs clearance documentation"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-8">
            <p className="text-white/40 font-heading text-[10px] uppercase tracking-widest mb-1">Specialisation</p>
            <p className="text-white font-heading font-bold text-xl uppercase leading-tight">Customs<br />Clearance</p>
          </div>
        </div>
        <motion.div
          className="flex flex-col justify-center px-10 py-20 md:px-16"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Imports & Exports</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-black uppercase leading-tight mb-4">
            Full In-House<br />Customs Clearing
          </h2>
          <AnimatedLine inView={isInView} />
          <p className="text-gray-600 text-sm font-body leading-relaxed mb-6 max-w-lg">
            We offer fully in-house customs clearing services at all major entry and exit points, ports, airports, and border crossings across our network. Our qualified clearing agents handle the entire process — from documentation preparation through to cargo release — with no third-party intermediaries.
          </p>
          <p className="text-gray-600 text-sm font-body leading-relaxed mb-8 max-w-lg">
            Whether your cargo is a single FCL container or a consolidated groupage shipment, we apply the same rigour to every clearance. Compliant, accurate, and efficient — every time.
          </p>
          {/* Stats ribbon */}
          <div className="grid grid-cols-3 gap-0 border border-border">
            {[['8+', 'Border Posts'], ['6', 'Clearance Types'], ['48h', 'Avg. Clearance']].map(([val, lbl], i) => (
              <motion.div
                key={lbl}
                className="px-5 py-4 border-r border-border last:border-r-0 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <p className="font-heading font-bold text-black text-xl leading-none">{val}<span className="text-primary">.</span></p>
                <p className="text-gray-400 text-[9px] uppercase tracking-wider mt-1 font-heading">{lbl}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Services & Ports Row */}
      <div className="grid lg:grid-cols-2 gap-0 border-b border-border">
        <motion.div
          className="px-10 py-14 md:px-16 border-r border-border"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-black font-heading font-bold text-[10px] uppercase tracking-wider mb-6">Services We Handle</p>
          <div className="grid grid-cols-2 gap-3">
            {customsServices.map((s, i) => (
              <motion.div
                key={s}
                className="flex items-center gap-2.5 group"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.07 }}
              >
                <span className="w-1.5 h-1.5 bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-gray-700 text-xs font-body group-hover:text-black transition-colors">{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="px-10 py-14 md:px-16"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-black font-heading font-bold text-[10px] uppercase tracking-wider mb-6">Countries We Clear In</p>
          <div className="flex flex-wrap gap-2">
            {clearancePorts.map((p, i) => (
              <motion.span
                key={p.country}
                className="px-3 py-1.5 border border-black/15 font-heading text-xs uppercase tracking-wide text-black hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
              >
                {p.country}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Process Steps */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <motion.p
            className="text-primary font-heading font-bold text-[10px] uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Clearance Process
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {cmsSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="bg-secondary p-8 group hover:bg-white/5 transition-colors cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              >
                <p className="text-white/15 font-heading font-bold text-4xl mb-4 leading-none group-hover:text-primary/25 transition-colors">{step.n}</p>
                <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-3">{step.title}</h4>
                <p className="text-white/45 text-xs leading-relaxed font-body group-hover:text-white/65 transition-colors">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



const AirFreightSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.p
              className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Imports & Exports
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Air Freight
            </motion.h2>
            <AnimatedLine inView={isInView} />
            <motion.p
              className="text-gray-600 text-sm font-body leading-relaxed mb-6 max-w-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We handle both imports and exports from across the globe, with weekly consolidation services from Japan, China, United Kingdom, and Hong Kong — direct to Kenneth Kaunda International Airport, Lusaka.
            </motion.p>
            <motion.p
              className="text-gray-600 text-sm font-body leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              The ideal solution for time-sensitive cargo, high-value goods, and international procurement where speed and reliability are non-negotiable.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {["Japan", "China", "United Kingdom", "Hong Kong"].map((origin, i) => (
                <motion.span
                  key={origin}
                  className="flex items-center gap-2 px-4 py-2 bg-muted font-heading text-xs font-bold uppercase tracking-wider text-black hover:bg-primary/10 transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                >
                  <AirplaneTilt className="w-3.5 h-3.5 text-primary" weight="fill" />
                  {origin}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="relative h-[360px] lg:h-[420px] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=900"
              alt="Air freight cargo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white font-heading font-bold text-xs uppercase tracking-wider">Weekly Consolidation Flights</p>
              <p className="text-white/60 text-xs mt-1">Direct to Kenneth Kaunda Intl Airport, Lusaka</p>
            </div>
          </motion.div>
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
            How It Works
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
              <motion.div
                className="w-0 h-px bg-primary mt-6"
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              />
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-white/40 text-sm leading-relaxed mt-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Our structured process reduces uncertainty and improves delivery reliability. You know what to expect at every stage.
        </motion.p>
      </div>
    </section>
  );
};

const OperationalServicesSection = () => {
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
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Full-Service Logistics</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            What We Do
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {operationalServices.map((item, i) => (
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

// ─── STAT BREAKER WITH COUNT-UP ──────────────────────────────────────────────

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
              className="px-8 py-14 text-center md:text-left group hover:bg-white/3 transition-colors cursor-default"
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

// ─── CTA ─────────────────────────────────────────────────────────────────────

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
        <motion.p
          className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Get Started
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let's Move<br />Your Cargo
        </motion.h2>
        <motion.p
          className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Share your cargo requirements and we will provide a clear, structured quotation for cross-border transport — no obligations, no ambiguity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start group"
          >
            Request a Quote
            <motion.span
              className="inline-flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-secondary relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=900"
          alt="Transport"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Truck className="w-40 h-40 text-white" weight="fill" />
          </motion.div>
    </div>
      </motion.div>
    </section>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=2070"
            alt="Cross-border cargo transport"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.p
                  className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Calm Mountain Transport
                </motion.p>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  Our<br />Services
                </motion.h1>
                <motion.div
                  className="w-16 h-0.5 bg-primary mb-6"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
                <motion.p
                  className="text-lg text-white/70 max-w-xl font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1 }}
                >
                  A complete range of transport, customs clearance, freight forwarding, and logistics solutions across Southern and Eastern Africa.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
        <StatBreaker />
        <CrossBorderSection />
        <CustomsClearanceSection />
        <AirFreightSection />
        <HowItWorksSection />
        <OperationalServicesSection />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
