import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';

interface SolutionCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  learnMoreLink: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export const SolutionCard = ({
  title,
  subtitle,
  description,
  features,
  learnMoreLink,
  imageSrc,
  imageAlt,
  reverse = false,
}: SolutionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.15 });

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 overflow-hidden ${reverse ? 'bg-muted/30' : 'bg-white'}`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 80 : -80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col justify-center px-10 py-24 md:px-16 ${reverse ? 'lg:order-2' : ''}`}
      >
        <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-5">{title}</p>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight mb-4">
          <Link to={learnMoreLink} className="hover:text-gray-700 transition-colors">
            {subtitle}
          </Link>
        </h2>
        <div className="w-12 h-0.5 bg-primary mb-8" />
        <p className="text-gray-600 leading-relaxed mb-8 text-sm font-body">{description}</p>
        <ul className="space-y-2.5 mb-10">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary block shrink-0" />
              <span className="text-gray-800 text-sm font-body">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to={learnMoreLink}
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors group self-start"
        >
          Learn More
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" weight="bold" />
        </Link>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -80 : 80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden h-[500px] lg:h-auto ${reverse ? 'lg:order-1' : ''}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? ''}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        {/* Bottom accent dots */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <span className="w-2.5 h-2.5 bg-primary block" />
          <span className="w-2.5 h-2.5 bg-secondary block opacity-60" />
        </div>
      </motion.div>
    </div>
  );
};
