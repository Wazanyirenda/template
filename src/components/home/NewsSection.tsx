import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';
import { supabase, NewsItem } from '@/lib/supabase';

const defaultHighlights = [
  {
    id: '1',
    category: 'Commercial Goods',
    title: 'General Cargo',
    excerpt: 'Packaged goods, palletized freight, and general commercial shipments transported across all seven countries in our network. Both import and export directions handled.',
    image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    category: 'Industrial',
    title: 'Heavy & Industrial Loads',
    excerpt: 'Equipment, machinery, steel, and manufacturing supplies moved safely across borders — with proper planning and coordination at every stage of the journey.',
    image_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    category: 'Agricultural',
    title: 'Farm & Commodity Cargo',
    excerpt: 'Agricultural products, grains, and commodities transported between producer and buyer across regional trade corridors — on schedule and handled with care.',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
  },
];

type DisplayItem = {
  id: string;
  slug?: string | null;
  category: string;
  title: string;
  excerpt: string;
  image_url: string;
};

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });
  const [items, setItems] = useState<DisplayItem[]>(defaultHighlights);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data && data.length > 0) {
        setItems(
          (data as NewsItem[]).map((n) => ({
            id: n.id,
            slug: n.slug,
            category: n.category,
            title: n.title,
            excerpt: n.excerpt,
            image_url: n.image_url || defaultHighlights[0].image_url,
          }))
        );
      }
    };
    fetchNews();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-zinc-500 font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Cargo Types</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-black uppercase leading-tight">
            What We Transport
          </h2>
          <div className="w-14 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white group overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-widest shadow">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="w-8 h-0.5 bg-primary mb-4" />
                <h3 className="text-base font-bold font-heading text-black mb-3 uppercase leading-tight group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-6 leading-relaxed font-body flex-grow">
                  {item.excerpt}
                </p>
                <Link
                  to={item.slug ? `/blog/${item.slug}` : (item.id.length > 20 ? `/blog/${item.id}` : '/blog')}
                  className="inline-flex items-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors group/link self-start"
                >
                  Read more
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" weight="bold" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] bg-black text-white px-8 py-3.5 hover:bg-secondary transition-all duration-300"
          >
            View All Posts <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
