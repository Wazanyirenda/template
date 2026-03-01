import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

const GridMenuIcon = ({ open }: { open: boolean }) => (
  <motion.div className="relative w-8 h-8 flex items-center justify-center" aria-hidden="true">
    <AnimatePresence mode="wait">
      {open ? (
        <motion.svg
          key="close" width="24" height="24" viewBox="0 0 24 24" fill="none"
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }} transition={{ duration: 0.25 }}
        >
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        </motion.svg>
      ) : (
        <motion.svg
          key="open" width="24" height="20" viewBox="0 0 24 20" fill="none"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
        >
          <circle cx="4" cy="4" r="2.5" fill="currentColor" />
          <circle cx="12" cy="4" r="2.5" fill="currentColor" />
          <circle cx="20" cy="4" r="2.5" fill="currentColor" />
          <circle cx="4" cy="16" r="2.5" fill="currentColor" />
          <circle cx="12" cy="16" r="2.5" fill="currentColor" />
          <circle cx="20" cy="16" r="2.5" fill="currentColor" />
        </motion.svg>
      )}
    </AnimatePresence>
  </motion.div>
);

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/careers', label: 'Careers' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Calm Mountain Transport Logo"
              className={`h-20 md:h-24 lg:h-28 w-auto object-contain transition-all duration-500 ${!scrolled ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  to={link.href}
                  className={`text-sm lg:text-[15px] font-medium tracking-wide font-body transition-colors ${scrolled ? 'text-black hover:text-black' : 'text-white hover:text-primary'}`}
                >
                  {link.label}
                </Link>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-black' : 'bg-white'}`}></span>
              </div>
            ))}

            {/* Search */}
            <button className="p-2 rounded-full transition-colors group">
              <MagnifyingGlass className={`w-5 h-5 transition-colors ${scrolled ? 'text-black group-hover:text-black' : 'text-white/70 group-hover:text-white'}`} />
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="btn-primary text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${scrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <GridMenuIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="py-3 text-base font-medium tracking-wide font-body text-white border-b border-white/10 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="py-3 text-base font-medium tracking-wide font-body text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
