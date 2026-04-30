import { SolutionCard } from './SolutionCard';

const solutions = [
  {
    title: 'CORE SERVICE',
    subtitle: 'Road Freight for Business Cargo',
    description: 'We transport bulk and general cargo by road for businesses that need dependable movement from pickup to delivery. Our team plans the route, coordinates dispatch, monitors progress, and confirms delivery.',
    features: [
      'Long distance haulage',
      'Local distribution',
      'Contract transport services',
      'Cross-border transportation',
      'Bulk and general cargo transport',
      'Mining, agriculture, construction, and trade cargo',
    ],
    learnMoreLink: '/services',
    imageSrc: '/images/truck1.jpg',
    imageAlt: 'Road freight truck',
    reverse: false,
  },
  {
    title: 'REGIONAL COVERAGE',
    subtitle: 'Zambia and Regional Routes',
    description: 'We serve domestic routes in Zambia and cross-border routes across the SADC region, including Zimbabwe, Tanzania, Botswana, Malawi, South Africa, Mozambique, Angola, and Namibia.',
    features: [
      'Zambia domestic routes',
      'Zimbabwe and Tanzania cross-border routes',
      'Botswana, Malawi, South Africa, and Mozambique',
      'Angola and Namibia coverage',
    ],
    learnMoreLink: '/coverage',
    imageSrc: '/images/truck2.jpg',
    imageAlt: 'Regional road freight corridors',
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
