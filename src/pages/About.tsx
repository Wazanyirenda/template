import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Target, Eye, Trophy, Star, ChatCircle, ArrowRight, ShieldCheck } from 'phosphor-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: CheckCircle, title: "Reliability", description: "We honor commitments and treat delivery timelines as operational targets that must be met." },
  { icon: ChatCircle, title: "Accountability", description: "We take full responsibility for each shipment from collection through final delivery." },
  { icon: ShieldCheck, title: "Safety", description: "We prioritize cargo integrity and enforce responsible transport practices at every stage." },
  { icon: Eye, title: "Transparency", description: "We maintain honest timelines, clear pricing, and open communication with no hidden conditions." },
  { icon: Star, title: "Representation", description: "We provide clear updates so clients always know the status of their shipments." },
  { icon: Trophy, title: "Integrity", description: "We represent client interests effectively at dispatch points, border posts, and delivery locations." },
];

const useSectionInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const EditorialIntro = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-heading font-bold text-foreground text-xs uppercase tracking-[0.25em] leading-relaxed">
              Calm Mountain<br />Transport<br />Limited
            </p>
            <div className="w-8 h-0.5 bg-primary mt-4" />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[["14 Apr 2023", "Incorporated"], ["9+", "Countries"], ["20-30t", "Capacity"], ["RTSA", "Regulated"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-heading font-bold text-foreground text-xl leading-none">{val}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-2xl">
              Calm Mountain Transport Limited is a Zambian registered transport and logistics company operating under Road Transport and Safety Agency regulations. We provide haulage and logistics services within Zambia and across cross-border routes in the SADC region.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-2xl mt-4">
              Our operations are designed to support industries that rely heavily on road freight transport, including mining, agriculture, construction, and trade. We were established to provide safe, timely, and cost-effective transport services for both corporate and individual clients.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-2xl mt-4">
              Our long-term strategy includes scaling operations, strengthening regional routes, and introducing enhanced logistics capabilities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MissionVisionSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="grid md:grid-cols-3">
      {[
        { icon: Eye, eyebrow: "Vision", title: "Leading and Trusted", bg: "bg-white", text: "To become a leading and trusted transport and logistics service provider in Zambia and across the region.", textColor: "text-gray-600", headColor: "text-black", labelColor: "text-zinc-500" },
        { icon: Target, eyebrow: "Mission", title: "Reliable, Safe, Cost-Effective", bg: "bg-secondary", text: "To provide reliable, safe, and cost-effective transportation services while maintaining high standards of professionalism, efficiency, and accountability.", textColor: "text-white/70", headColor: "text-white", labelColor: "text-primary" },
        { icon: Trophy, eyebrow: "Customer Promise", title: "Satisfying Customers", bg: "bg-white", text: "Satisfying customers is key to our success. We focus on consistent service, clear communication, and accountable delivery.", textColor: "text-gray-600", headColor: "text-black", labelColor: "text-zinc-500" },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`${item.bg} px-12 py-20`}
        >
          <p className={`${item.labelColor} font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5`}>{item.eyebrow}</p>
          <div className={`w-10 h-10 flex items-center justify-center mb-6 ${i === 1 ? 'bg-primary/10' : 'bg-black'}`}>
            <item.icon className="w-5 h-5 text-primary" weight="fill" />
          </div>
          <h3 className={`text-2xl font-bold font-heading uppercase leading-tight mb-4 ${item.headColor}`}>{item.title}</h3>
          <div className="w-10 h-0.5 bg-primary mb-6" />
          <p className={`text-sm leading-relaxed font-body ${item.textColor}`}>{item.text}</p>
        </motion.div>
      ))}
    </section>
  );
};

const QualitySection = () => {
  const { ref, isInView } = useSectionInView();
  const groups = [
    { title: "Objectives", items: ["Deliver cargo on time and as scheduled", "Maintain clear and consistent communication with clients", "Ensure safe handling and transport of all shipments", "Continuously improve operational efficiency"] },
    { title: "Aspirations", items: ["Be the preferred logistics partner for cross-border trade", "Achieve consistent on-time delivery performance", "Build long-term client relationships based on trust", "Maintain professionalism across all operational touchpoints"] },
    { title: "Strengths", items: ["Structured logistics process", "Strong regional coordination", "Reliable execution and planning", "Transparent communication"] },
  ];

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
          alt="Calm Mountain Transport operations"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <motion.div
          className="absolute bottom-8 right-0 bg-primary px-8 py-5 shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-heading font-bold text-2xl text-black leading-none">RTSA</p>
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-black/70 mt-1">Regulated Operations</p>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center px-10 py-24 md:px-16"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Quality Policy</p>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
          Structured Service<br />Continuous Improvement
        </h2>
        <div className="w-14 h-0.5 bg-primary mb-8" />
        <p className="text-gray-600 text-sm leading-relaxed font-body mb-8">
          Calm Mountain Transport Limited is committed to maintaining high standards of service through structured processes and continuous improvement.
        </p>
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading font-bold text-black text-xs uppercase tracking-wider mb-3">{group.title}</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <p key={item} className="text-gray-600 text-xs leading-relaxed font-body flex gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-primary shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const CoreValuesSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Corporate Culture - STRIVE</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight">Our Core Values</h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {values.map((value, i) => (
            <motion.div
              key={value.title + i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-black p-10 flex flex-col group hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-5 h-5 text-primary" weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">{value.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-body flex-grow">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComplianceSection = () => {
  const { ref, isInView } = useSectionInView();
  const compliance = [
    ["Registered", "Republic of Zambia - Companies Act, 2017 (Act No. 10 of 2017)"],
    ["Registration No.", "120230049239"],
    ["TPIN", "2001215075"],
    ["Regulator", "Road Transport and Safety Agency (RTSA)"],
  ];

  return (
    <section ref={ref} className="py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Legal & Compliance</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-8">Company Details</h2>
          <div className="grid sm:grid-cols-2 gap-px bg-border">
            {compliance.map(([label, value]) => (
              <div key={label} className="bg-white p-6">
                <p className="text-black/40 text-[10px] font-heading uppercase tracking-wider mb-2">{label}</p>
                <p className="text-black text-sm font-body leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutCTA = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="flex flex-col lg:flex-row">
      <motion.div
        className="lg:w-3/5 px-10 py-24 md:px-20 flex flex-col justify-center bg-primary"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6">Work With Us</p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
          Ready to<br />Move Cargo?
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Tell us your route, cargo type, and timeframe. We will respond with a clear transport proposal.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start"
        >
          Get in Touch <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </Link>
      </motion.div>
      <motion.div
        className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-secondary relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src="/images/about-hero.jpg"
          alt="About Calm Mountain Transport"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Target className="w-32 h-32 text-white/10" weight="fill" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <img
            src="/images/about-hero.jpg"
            alt="About Calm Mountain Transport"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5">Calm Mountain Transport</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  About<br />Us
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  A Zambian transport and logistics company built on disciplined planning, clear communication, and consistent execution.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <EditorialIntro />
        <MissionVisionSection />
        <QualitySection />
        <CoreValuesSection />
        <ComplianceSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
