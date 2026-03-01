import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { supabase, NewsItem } from '@/lib/supabase';
import { SEO } from '@/components/SEO';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-ZM', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BASE_URL = 'https://calmmt.co.zm';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Try slug first, then id (for backwards compatibility)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
      const col = isUuid ? 'id' : 'slug';
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .eq(col, slug)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data as NewsItem);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-8 bg-gray-100 w-1/3 mb-8" />
              <div className="h-64 bg-gray-100 rounded mb-8" />
              <div className="h-4 bg-gray-100 w-full mb-4" />
              <div className="h-4 bg-gray-100 w-full mb-4" />
              <div className="h-4 bg-gray-100 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-black mb-4">Post not found</h1>
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-wider">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`;
  const ogImage = post.image_url
    ? (post.image_url.startsWith('http') ? post.image_url : `${BASE_URL}${post.image_url}`)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-clip">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={canonical}
        ogImage={ogImage}
        ogType="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: ogImage,
          datePublished: post.created_at,
          dateModified: post.updated_at,
          author: { '@type': 'Organization', name: 'Calm Mountain Transport Limited' },
          publisher: { '@type': 'Organization', name: 'Calm Mountain Transport Limited' },
        }}
      />
      <Header />
      <main className="flex-1">
        <article className="pt-24 lg:pt-32 pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors"
              >
                <ArrowLeft size={14} /> Back to Blog
              </Link>

              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1.5 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-widest mb-6">
                  {post.category}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
                  {post.title}
                </h1>
                <p className="text-gray-500 text-sm font-body">{formatDate(post.created_at)}</p>
              </motion.header>

              {post.image_url && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="my-12 rounded overflow-hidden"
                >
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="prose prose-lg max-w-none font-body text-gray-700 leading-relaxed"
              >
                <p className="text-lg text-gray-600 mb-8 font-medium">{post.excerpt}</p>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      ? post.content
                          .split('\n\n')
                          .map((p) => `<p class="mb-6">${p.replace(/\n/g, '<br />')}</p>`)
                          .join('')
                      : '',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
