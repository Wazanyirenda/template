import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'phosphor-react';
import { supabase, NewsItem } from '@/lib/supabase';
import { SEO } from '@/components/SEO';

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-ZM', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getPostUrl = (post: NewsItem) => {
  if (post.slug) return `/blog/${post.slug}`;
  return `/blog/${post.id}`;
};

const Blog = () => {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isInView } = useSection();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) setPosts(data as NewsItem[]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <SEO title="Blog" description="News, insights, and updates from Calm Mountain Transport — cross-border cargo, logistics, and transport across Southern and Eastern Africa." canonical="/blog" />
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] min-h-[360px] bg-black overflow-hidden">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070" alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Insights & Updates</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white uppercase tracking-tight leading-tight mb-5">Blog</h1>
                <div className="w-16 h-0.5 bg-primary mb-6" />
                <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">News, industry insights, and company updates from Calm Mountain Transport.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={ref} className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white p-8 animate-pulse">
                    <div className="h-48 bg-gray-100 rounded mb-6" />
                    <div className="h-3 bg-gray-100 w-20 mb-4" />
                    <div className="h-6 bg-gray-200 w-3/4 mb-4" />
                    <div className="h-3 bg-gray-100 w-full mb-2" />
                    <div className="h-3 bg-gray-100 w-5/6" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" weight="fill" />
                <p className="text-gray-500 font-body">No blog posts yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {posts.map((post, i) => (
                  <motion.article key={post.id} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-white group overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                    <Link to={getPostUrl(post)} className="block">
                      <div className="h-56 overflow-hidden relative">
                        <img src={post.image_url || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'} alt={post.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-widest">{post.category}</span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <p className="text-zinc-500 text-[10px] font-heading uppercase tracking-wider mb-2">{formatDate(post.created_at)}</p>
                        <div className="w-8 h-0.5 bg-primary mb-4" />
                        <h2 className="text-lg font-bold font-heading text-black mb-3 uppercase leading-tight group-hover:text-secondary transition-colors">{post.title}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed font-body line-clamp-3">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-1.5 mt-6 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors self-start">
                          Read more <ArrowRight className="w-3 h-3" weight="bold" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
