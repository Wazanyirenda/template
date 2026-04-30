import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Envelope, Buildings, CheckCircle } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const useSectionInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
};

type FormState = {
  pickupLocation: string;
  deliveryLocation: string;
  cargoDescription: string;
  weightVolume: string;
  timeframe: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  additionalDetails: string;
};

const initialForm: FormState = {
  pickupLocation: '',
  deliveryLocation: '',
  cargoDescription: '',
  weightVolume: '',
  timeframe: '',
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  additionalDetails: '',
};

const Contact = () => {
  const { ref: heroRef } = useSectionInView();
  const { ref: formRef, isInView: formInView } = useSectionInView();
  const { ref: infoRef, isInView: infoInView } = useSectionInView();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.pickupLocation.trim()) e.pickupLocation = 'Required';
    if (!form.deliveryLocation.trim()) e.deliveryLocation = 'Required';
    if (!form.cargoDescription.trim()) e.cargoDescription = 'Required';
    if (!form.contactName.trim()) e.contactName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    return e;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    // Simulate network delay — wire up to API / email service here
    await new Promise(res => setTimeout(res, 1200));
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Your request has been received. We will be in touch shortly.');
  };

  const fieldClass = (err?: string) =>
    `bg-white/8 border-white/15 text-white placeholder:text-white/25 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ${err ? 'border-red-400' : ''}`;

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <Header />
      <main className="flex-1">

        {/* HERO */}
        <section ref={heroRef} className="relative h-[50vh] min-h-[360px] bg-black overflow-hidden">
          <motion.img
            src="/images/IMG-20260428-WA0055.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-45"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-5">
                  Calm Mountain Transport
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5 md:mb-6">
                  Request<br />a Quote
                </h1>
                <motion.div
                  className="w-16 h-0.5 bg-primary mb-5"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.p
                  className="text-base text-white/70 max-w-xl font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Share your cargo details and we will respond with a structured transport proposal.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24">

              {/* LEFT — INFO */}
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, x: -30 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-3">Contact Information</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
                  Get in Touch
                </h2>
                <div className="w-12 h-0.5 bg-primary mb-8" />
                <p className="text-gray-500 mb-10 text-sm leading-relaxed font-body">
                  To receive a structured quotation, please provide pickup and delivery details, a description of your cargo, and your contact information. We typically respond within one business day.
                </p>

                <motion.div
                  className="p-8 bg-black group hover:bg-secondary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-sm font-bold font-heading text-white mb-6 flex items-center gap-3 uppercase tracking-wide">
                    <Buildings className="w-4 h-4 text-primary shrink-0" weight="fill" />
                    Head Office - Ndola
                      </h3>
                  <div className="space-y-4 text-white/60 pl-7 text-sm font-body">
                        <p className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" weight="fill" />
                      <span>No. 7 Chinika Road, Northrise<br />Ndola, Copperbelt, Zambia</span>
                        </p>
                        <p className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary shrink-0" weight="fill" />
                      <span>+260 761 370 582</span>
                        </p>
                        <p className="flex items-center gap-3">
                      <Envelope className="w-4 h-4 text-primary shrink-0" weight="fill" />
                      <span>info@calmmountaintransport.com</span>
                        </p>
                      </div>
                </motion.div>

                {/* Map */}
                <motion.div
                  className="mt-6 overflow-hidden h-56"
                  initial={{ opacity: 0 }}
                  animate={infoInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <iframe
                    title="Ndola, Zambia"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126734.46849596097!2d28.555694!3d-12.958797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19608d17c2d45a01%3A0x41cd69a540f98d5b!2sNdola%2C%20Zambia!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(80%) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </motion.div>

              {/* RIGHT — FORM */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {submitted ? (
                  /* SUCCESS STATE */
                  <motion.div
                    className="bg-black p-12 flex flex-col items-center text-center h-full justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle className="w-16 h-16 text-primary mb-6" weight="fill" />
                    </motion.div>
                    <h2 className="text-2xl font-bold font-heading text-white uppercase mb-4">
                      Request Received
                    </h2>
                    <div className="w-12 h-0.5 bg-primary mb-6 mx-auto" />
                    <p className="text-white/60 text-sm font-body leading-relaxed max-w-sm">
                      Thank you for reaching out. Our team will review your requirements and respond with a structured transport proposal within one business day.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm(initialForm); }}
                      className="mt-8 text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary border-b border-primary pb-0.5 hover:text-white hover:border-white transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  /* FORM */
                  <div className="bg-black p-10">
                    <h2 className="text-2xl font-bold font-heading text-white mb-2 uppercase">Request a Transport Proposal</h2>
                    <div className="w-12 h-0.5 bg-primary mb-8" />
                    <p className="text-white/50 text-xs mb-8 font-body leading-relaxed">
                      Fields marked <span className="text-primary">*</span> are required. We'll create a tailored quote based on your details.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                      {/* Route */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                            Pickup Country & City <span className="text-primary">*</span>
                          </label>
                          <Input
                            placeholder="e.g. Zambia, Ndola"
                            value={form.pickupLocation}
                            onChange={handleChange('pickupLocation')}
                            className={fieldClass(errors.pickupLocation)}
                          />
                          {errors.pickupLocation && <p className="text-red-400 text-[10px]">{errors.pickupLocation}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                            Delivery Country & City <span className="text-primary">*</span>
                          </label>
                          <Input
                            placeholder="e.g. Tanzania, Dar es Salaam"
                            value={form.deliveryLocation}
                            onChange={handleChange('deliveryLocation')}
                            className={fieldClass(errors.deliveryLocation)}
                          />
                          {errors.deliveryLocation && <p className="text-red-400 text-[10px]">{errors.deliveryLocation}</p>}
                        </div>
                      </div>

                      {/* Cargo */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                          Description of Cargo <span className="text-primary">*</span>
                        </label>
                        <Input
                          placeholder="e.g. Packaged goods, machinery, agricultural produce"
                          value={form.cargoDescription}
                          onChange={handleChange('cargoDescription')}
                          className={fieldClass(errors.cargoDescription)}
                        />
                        {errors.cargoDescription && <p className="text-red-400 text-[10px]">{errors.cargoDescription}</p>}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">Estimated Weight or Volume</label>
                          <Input
                            placeholder="e.g. 5 tonnes, 20 pallets"
                            value={form.weightVolume}
                            onChange={handleChange('weightVolume')}
                            className={fieldClass()}
                          />
                    </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">Required Timeframe</label>
                          <Input
                            placeholder="e.g. Within 2 weeks"
                            value={form.timeframe}
                            onChange={handleChange('timeframe')}
                            className={fieldClass()}
                          />
                </div>
              </div>

                      {/* Contact */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">Company Name</label>
                          <Input
                            placeholder="Your Company"
                            value={form.companyName}
                            onChange={handleChange('companyName')}
                            className={fieldClass()}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                            Contact Name <span className="text-primary">*</span>
                          </label>
                          <Input
                            placeholder="Your Name"
                            value={form.contactName}
                            onChange={handleChange('contactName')}
                            className={fieldClass(errors.contactName)}
                          />
                          {errors.contactName && <p className="text-red-400 text-[10px]">{errors.contactName}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                            Email <span className="text-primary">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange('email')}
                            className={fieldClass(errors.email)}
                          />
                          {errors.email && <p className="text-red-400 text-[10px]">{errors.email}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">
                            Phone <span className="text-primary">*</span>
                          </label>
                          <Input
                            placeholder="+260..."
                            value={form.phone}
                            onChange={handleChange('phone')}
                            className={fieldClass(errors.phone)}
                          />
                          {errors.phone && <p className="text-red-400 text-[10px]">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-bold text-white/50 uppercase tracking-wider">Additional Details</label>
                        <Textarea
                          placeholder="Any specific requirements, hazardous materials declarations, or questions"
                          value={form.additionalDetails}
                          onChange={handleChange('additionalDetails')}
                          className={`${fieldClass()} min-h-[80px]`}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest py-6 rounded-none text-xs disabled:opacity-60 transition-all"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Sending…
                          </span>
                        ) : 'Submit Request'}
                      </Button>
                    </form>
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;

