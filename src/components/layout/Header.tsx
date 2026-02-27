import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, X, MagnifyingGlass } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/projects', label: 'Fleet' },
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
          ? 'bg-black shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="w-32 lg:w-40 h-12 lg:h-16" aria-hidden="true" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  to={link.href}
                  className="text-sm lg:text-[15px] font-medium tracking-wide font-body text-white"
                >
                  {link.label}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}

            {/* Search */}
            <button className="p-2 rounded-full transition-colors group">
              <MagnifyingGlass className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="btn-primary text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-8 h-8" weight="bold" />
            ) : (
              <List className="w-8 h-8" weight="bold" />
            )}
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
