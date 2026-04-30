import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, TrendUp, Users, CalendarBlank, ProhibitInset } from 'phosphor-react';
import { supabase, CareerItem } from '@/lib/supabase';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isClosed = (closingDate: string) => {
  if (!closingDate) return false;
  return new Date(closingDate) < new Date();
};

const whyWork = [
  {
    icon: TrendUp,
    title: 'Growth From Day One',
    description: 'We are a company at the start of a significant growth trajectory. Joining early means real ownership over your role and direct impact on how the business develops.',
  },
  {
    icon: MapPin,
    title: 'Work That Moves Africa',
    description: 'Every job here directly connects businesses, supply chains, and communities across eleven countries. The work is tangible and the impact reaches far.',
  },
  {
    icon: Users,
    title: 'A Culture of Accountability',
    description: 'We operate with clear ownership, direct communication, and mutual respect. No bureaucracy — just a professional team committed to doing the job well.',
  },
];

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const Careers = () => {
  const [jobs, setJobs] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setJobs(data as CareerItem[]);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative h-[70vh] min-h-[480px] bg-black overflow-hidden">
          <motion.img
            src="/images/IMG-20260428-WA0010.jpg"
            alt="Careers at Calm Mountain Transport"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <motion.p
                  className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Join Our Team
                </motion.p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  Careers
                </h1>
                <motion.div
                  className="w-16 h-0.5 bg-primary mb-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.p
                  className="text-lg text-white/70 max-w-xl font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Build your career with a transport company that values ownership, accountability, and professional excellence.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHY WORK WITH US ── */}
        {(() => {
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
                  <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Culture</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading text-white uppercase leading-tight">
                    Why Work With Us
                  </h2>
                  <div className="w-14 h-0.5 bg-primary mt-6" />
                </motion.div>
                <div className="grid md:grid-cols-3 gap-px bg-white/10">
                  {whyWork.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="bg-black p-12 flex flex-col group hover:bg-white/5 transition-colors cursor-default"
                    >
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" weight="fill" />
                      </div>
                      <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4">{item.title}</h3>
                      <p className="text-white/50 text-xs leading-relaxed font-body flex-grow group-hover:text-white/70 transition-colors">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── JOB OPENINGS ── */}
        {(() => {
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
                  <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Open Roles</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
                    Current Openings
                  </h2>
                  <div className="w-14 h-0.5 bg-primary mt-6 mb-6" />
                  <p className="text-gray-500 text-sm max-w-2xl font-body">
                    All positions are based in Ndola, Zambia unless otherwise stated. We are building a team of professionals who take their work seriously.
                  </p>
                </motion.div>

                {loading ? (
                  <div className="grid md:grid-cols-2 gap-px bg-border">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white p-10 animate-pulse">
                        <div className="h-2 bg-gray-100 rounded w-24 mb-4" />
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-6" />
                        <div className="h-2 bg-gray-100 rounded w-full mb-2" />
                        <div className="h-2 bg-gray-100 rounded w-5/6" />
                      </div>
                    ))}
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" weight="fill" />
                    <p className="text-gray-500 font-body">No open positions at the moment. Check back soon or get in touch to express your interest.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 mt-6 text-xs font-heading font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors">
                      Contact Us <ArrowRight className="w-3 h-3" weight="bold" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-px bg-border">
                    {jobs.map((job, i) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: i * 0.07 }}
                        className="bg-white flex flex-col group hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <div className="h-0.5 w-full bg-border group-hover:bg-primary transition-colors duration-300" />
                        <div className="p-10 flex flex-col flex-grow">
                          <p className="text-zinc-500 font-heading font-bold text-[10px] uppercase tracking-[0.3em] mb-3">{job.department}</p>
                          <h3 className="text-xl font-bold font-heading text-black mb-4 uppercase leading-tight group-hover:text-secondary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-primary" weight="fill" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-primary" weight="fill" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          {/* Application Dates */}
                          <div className="flex flex-wrap gap-4 mb-5 text-xs">
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <CalendarBlank className="w-3.5 h-3.5 text-primary" weight="fill" />
                              <span>Opens: {formatDate(job.opening_date)}</span>
                            </div>
                            <div className={`flex items-center gap-1.5 ${isClosed(job.closing_date) ? 'text-red-500' : 'text-gray-500'}`}>
                              <CalendarBlank className="w-3.5 h-3.5" weight="fill" />
                              <span>Closes: {formatDate(job.closing_date)}</span>
                            </div>
                          </div>
                          <div className="w-10 h-0.5 bg-primary mb-5" />
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed font-body">{job.description}</p>
                          <div className="mb-8 flex-grow">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-black mb-3 font-heading">Requirements</p>
                            <ul className="space-y-2">
                              {job.requirements.map((req, ri) => (
                                <li key={ri} className="flex items-start gap-2.5 text-xs text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-primary block mt-1.5 shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {isClosed(job.closing_date) ? (
                            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-red-500 border-b border-red-300 pb-0.5 self-start cursor-default">
                              <ProhibitInset className="w-3.5 h-3.5" weight="bold" />
                              Applications Closed
                            </div>
                          ) : (
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors group/link self-start"
                            >
                              Apply Now <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" weight="bold" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })()}

        {/* ── CTA ── */}
        {(() => {
          const { ref, isInView } = useSection();
          return (
            <section ref={ref} className="flex flex-col lg:flex-row">
              <motion.div
                className="lg:w-3/5 px-10 py-24 md:px-20 flex flex-col justify-center bg-primary"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7 }}
              >
                <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-black/50 mb-6">Open Application</p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
                  Don't See<br />A Match?
                </h2>
                <p className="text-black/70 text-sm font-body mb-10 max-w-md leading-relaxed">
                  We are always interested in hearing from motivated professionals. Send us your details and we will reach out when a suitable position becomes available.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border border-black px-8 py-3.5 hover:bg-black hover:text-primary transition-all duration-300 self-start"
                >
                  Submit Your Details <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </Link>
              </motion.div>
              <motion.div
                className="lg:w-2/5 h-64 lg:h-auto overflow-hidden bg-secondary relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <img
                  src="/images/IMG-20260428-WA0016.jpg"
                  alt="Careers"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="w-32 h-32 text-white/10" weight="fill" />
                </div>
              </motion.div>
            </section>
          );
        })()}

      </main>
      <Footer />
    </div>
  );
};

export default Careers;
