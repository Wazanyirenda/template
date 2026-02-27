import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, Target, Eye, Trophy, Star, ChatCircle, ArrowRight } from 'phosphor-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: CheckCircle, title: "Reliability", description: "Commitments are honored. If we agree to a delivery date, we work backwards from that date to make sure we meet it." },
  { icon: ChatCircle, title: "Accountability", description: "We take full responsibility for the journey — from the moment cargo is collected to the moment it is delivered and signed for." },
  { icon: Star, title: "Safety", description: "Cargo integrity and responsible transport practices are non-negotiable. We handle every shipment as if it were our own." },
  { icon: CheckCircle, title: "Clarity", description: "We communicate clearly. No confusion, no chasing for updates. You will always know where your cargo stands." },
  { icon: Trophy, title: "Professionalism", description: "We represent our clients' interests at every stage — with drivers, at borders, and at the point of delivery." },
  { icon: Eye, title: "Transparency", description: "Clear pricing, honest timelines, and open communication. No hidden charges. No surprises." },
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
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["7", "Countries"], ["Import & Export", "Both Directions"], ["Structured", "Process"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-heading font-bold text-foreground text-2xl leading-none">{val}</p>
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
              Calm Mountain Transport Limited was established to solve a specific problem: businesses in Southern and Eastern Africa need a transport partner they can actually rely on — one that plans ahead, communicates clearly, and delivers on time.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-2xl mt-4">
              We specialise in cross-border commercial cargo transport, customs clearance, freight forwarding, and inland haulage. By focusing on doing these services well, we give our clients consistent performance they can build their supply chains around.
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
        { icon: Target, eyebrow: "Reliable", title: "Reliable Logistics Service", bg: "bg-white", text: "We are a logistics partner built for reliability. You can count on us to deliver structured, on-time service every time.", textColor: "text-gray-600", headColor: "text-black", labelColor: "text-zinc-500" },
        { icon: Eye, eyebrow: "Dependable", title: "Dependable Freight Provider", bg: "bg-secondary", text: "We bring structured logistics and clear communication to cross-border freight. You can depend on us for reliable, on-time service across Southern and Eastern Africa.", textColor: "text-white/70", headColor: "text-white", labelColor: "text-primary" },
        { icon: Trophy, eyebrow: "Dedicated", title: "Dedicated Team of Staff", bg: "bg-white", text: "Our dedicated team of staff are key assets to our company. They do their job at the best of their ability to make sure you get the best experience when doing business with us.", textColor: "text-gray-600", headColor: "text-black", labelColor: "text-zinc-500" },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`${item.bg} px-12 py-20`}
        >
          <p className={`${item.labelColor} font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5`}>{item.eyebrow}</p>
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-6">
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

const ApproachSection = () => {
  const { ref, isInView } = useSectionInView();
  return (
    <section ref={ref} className="grid lg:grid-cols-[5fr_6fr] bg-muted/30 overflow-hidden">
      <motion.div
        className="h-[450px] lg:h-auto overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=900"
          alt="Our transport approach"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <motion.div
          className="absolute bottom-8 right-0 bg-primary px-8 py-5 shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-heading font-bold text-2xl text-black leading-none">7</p>
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-black/70 mt-1">Countries Served</p>
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
        <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Our Approach</p>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
          Cross-Border Transport<br />That Works
        </h2>
        <div className="w-14 h-0.5 bg-primary mb-8" />
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-body mb-10">
          <p>Every shipment we handle goes through the same structured process — route planning, scheduled departure, coordinated border crossing, and confirmed delivery.</p>
          <p>We do not improvise. We plan, we communicate, and we execute. That consistency is what our clients come back for.</p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors group self-start"
        >
          See How It Works <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" weight="bold" />
        </Link>
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
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">What We Stand For</p>
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
          Ready to<br />Work With Us?
        </h2>
        <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
          Let's talk about your cargo requirements. We'll come back to you with a clear, structured transport proposal.
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
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=900"
          alt="About"
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
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=2070"
            alt="About Calm Mountain Transport"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">Calm Mountain Transport</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white uppercase tracking-tight leading-none mb-6">
                  About<br />Us
                </h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
                  A cargo transport company built on one commitment: move your goods across borders, on time, every time.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 md:right-16 text-white/30 font-heading text-xs tracking-widest"></div>
        </section>
        <EditorialIntro />
        <MissionVisionSection />
        <ApproachSection />
        <CoreValuesSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
