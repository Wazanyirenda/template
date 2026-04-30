import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FacebookLogo, TwitterLogo, LinkedinLogo, Envelope, Phone, MapPin } from 'phosphor-react';

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-black text-white pt-20 pb-10 border-t border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <div className="inline-block">
              <img src="/logo.png" alt="Calm Mountain Transport Logo" className="w-40 h-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Calm Mountain Transport Limited provides reliable road freight and logistics across Zambia and the SADC region. On Time Every Time.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white" aria-label="Facebook">
                <FacebookLogo className="w-5 h-5" weight="fill" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white" aria-label="Twitter">
                <TwitterLogo className="w-5 h-5" weight="fill" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-primary hover:text-black rounded-sm transition-all duration-300 text-white" aria-label="LinkedIn">
                <LinkedinLogo className="w-5 h-5" weight="fill" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Services</Link></li>
              <li><Link to="/coverage" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Coverage</Link></li>
              <li><Link to="/fleet" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Fleet</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors uppercase text-sm font-medium tracking-wide">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-primary transition-colors cursor-default">Long Distance Haulage</li>
              <li className="hover:text-primary transition-colors cursor-default">Local Distribution</li>
              <li className="hover:text-primary transition-colors cursor-default">Contract Transport Services</li>
              <li className="hover:text-primary transition-colors cursor-default">Cross-Border Transportation</li>
              <li className="hover:text-primary transition-colors cursor-default">Bulk and General Cargo Transport</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold font-heading mb-8 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" weight="fill" />
                <span className="text-gray-400">No. 7 Chinika Road, Northrise, Ndola, Copperbelt</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" weight="fill" />
                <span className="text-gray-400">+260 761 370 582</span>
              </li>
              <li className="flex items-center gap-4">
                <Envelope className="w-5 h-5 text-primary shrink-0" weight="fill" />
                <span className="text-gray-400">info@calmmountaintransport.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>Copyright {new Date().getFullYear()} Calm Mountain Transport Limited. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="/about" className="hover:text-primary transition-colors">Registration No. 120230049239</Link>
            <Link to="/about" className="hover:text-primary transition-colors">TPIN 2001215075</Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6 text-center text-sm text-gray-500">
          <p>
            Registered in the Republic of Zambia under the Companies Act, 2017. Regulator: Road Transport and Safety Agency (RTSA).
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
