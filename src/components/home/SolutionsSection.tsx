import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SolutionCard } from './SolutionCard';

const solutions = [
  {
    title: 'OUR CORE SERVICE',
    subtitle: 'Cross-Border Cargo Transportation',
    description: 'We handle commercial cargo that needs to cross borders. Whether you are moving goods from Zambia to Tanzania, from South Africa to Malawi, or any corridor within our network — we coordinate the full journey: scheduled pickup, route planning, border documentation alignment, and confirmed delivery.',
    features: [
      'General commercial goods',
      'Industrial and manufacturing supplies',
      'Agricultural products and commodities',
      'Construction materials',
      'Packaged and palletized freight',
      'Wholesale and distribution cargo',
    ],
    learnMoreLink: '/services',
    imageSrc: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Cross-border cargo transport truck',
    reverse: false,
  },
  {
    title: 'OUR ROUTE NETWORK',
    subtitle: 'Seven Countries. Both Directions.',
    description: 'We operate established trade corridors connecting seven countries across Southern and Eastern Africa. Every shipment is planned against route conditions, border crossing requirements, and your delivery window — so cargo arrives on time, without surprises.',
    features: [
      'Zambia · Tanzania · Malawi',
      'Kenya · Uganda · Rwanda · South Africa',
      'Import and export in both directions',
      'Additional corridors available on request',
    ],
    learnMoreLink: '/coverage',
    imageSrc: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'African trade route corridors',
    reverse: true,
  },
];

export const SolutionsSection = () => {
  return (
    <section className="bg-white">
      {solutions.map((solution) => (
        <SolutionCard key={solution.subtitle} {...solution} />
      ))}
    </section>
  );
};
