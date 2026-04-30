import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapTrifold, ArrowFatRight } from 'phosphor-react';

const routes = [
  { from: "Lusaka", to: "Ndola", type: "Domestic route" },
  { from: "Lusaka", to: "Kitwe", type: "Domestic route" },
  { from: "Lusaka", to: "Livingstone", type: "Domestic route" },
  { from: "Zambia", to: "Zimbabwe", type: "Cross-border route" },
  { from: "Zambia", to: "Tanzania", type: "Cross-border route" },
];

const countries = ["Zambia", "Zimbabwe", "Tanzania", "Botswana", "Malawi", "South Africa", "Mozambique", "Angola", "Namibia"];

const useSectionInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const RouteNetworkSection = () => {
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
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Network</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            Key Routes
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6 mb-6" />
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed font-body">
            Calm Mountain Transport provides domestic and cross-border transport services across Zambia and the wider SADC region, with active focus on major Copperbelt, southern corridor, Zimbabwe, and Tanzania routes.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {routes.map((route, i) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white p-8 group hover:bg-muted/40 transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <MapTrifold className="w-4 h-4 text-primary" weight="fill" />
              </div>
              <div className="flex items-center gap-2 font-heading">
                <span className="font-bold text-black text-sm uppercase">{route.from}</span>
                <ArrowFatRight className="w-3 h-3 text-primary shrink-0" weight="fill" />
                <span className="font-bold text-secondary text-sm uppercase">{route.to}</span>
              </div>
              <p className="text-muted-foreground text-xs mt-2 font-body">{route.type}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mt-10 max-w-2xl font-body">
          Additional route combinations can be arranged based on cargo demand, documentation requirements, and operational availability.
        </p>
      </div>
    </section>
  );
};

const BorderExpertiseSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="grid lg:grid-cols-[2fr_3fr] bg-secondary overflow-hidden">
      <motion.div
        className="flex flex-col justify-center px-10 py-24 md:px-16"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Coverage</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase leading-tight mb-4">
          Domestic and<br />SADC Transport
        </h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
          We cover Zambia, Zimbabwe, Tanzania, Botswana, Malawi, South Africa, Mozambique, Angola, and Namibia.
        </p>
        <p className="text-white/60 text-sm font-body leading-relaxed">
          Cross-border cargo movement is coordinated through routing, proper documentation, and structured execution to minimise delays at border points.
        </p>
      </motion.div>
      <motion.div
        className="h-[400px] lg:h-auto overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="/images/truck2.jpg"
          alt="Regional road freight route"
          className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
        />
      </motion.div>
    </section>
  );
};

const CoverageCTA = () => {
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
          Need a<br />Specific Route?
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Contact us to discuss your cargo requirements and route options. We can arrange additional corridor combinations based on your needs.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start"
        >
          Request a Quote <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </Link>
      </motion.div>
      <motion.div
        className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-black relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="/images/truck3.jpg"
          alt="Routes"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapTrifold className="w-32 h-32 text-white/10" weight="fill" />
        </div>
      </motion.div>
    </section>
  );
};

const Coverage = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <img
            src="/images/hero-home2.jpg"
            alt="African routes and trade corridors"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5">
                  Calm Mountain Transport
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  Coverage<br />&amp; Routes
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  Domestic and cross-border transport services covering Zambia and key SADC markets.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-black">
          <div className="container mx-auto px-4 md:px-8">
            <div className="py-10 flex flex-wrap gap-0 divide-x divide-white/10">
              {countries.map((country, i) => (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="px-6 py-4 text-center flex-1 min-w-[100px]"
                >
                  <p className="text-white/30 font-heading text-[10px] uppercase tracking-[0.25em] mb-1">{i === 0 ? "Hub" : "Coverage"}</p>
                  <p className="text-white font-heading font-bold text-sm uppercase tracking-wide">{country}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <RouteNetworkSection />
        <BorderExpertiseSection />
        <CoverageCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Coverage;
