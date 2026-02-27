import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Newspaper, Briefcase, Plus, Pencil, Trash, X, CheckCircle,
    Warning, ArrowLeft, Eye, EyeSlash
} from 'phosphor-react';
import { supabase, NewsItem, CareerItem } from '@/lib/supabase';
import { toast } from 'sonner';

// ── TYPES ────────────────────────────────────────────────────
type Tab = 'news' | 'careers';

// ── HELPERS ──────────────────────────────────────────────────
const emptyNews = (): Omit<NewsItem, 'id' | 'created_at' | 'updated_at'> => ({
    title: '',
    category: 'Company News',
    excerpt: '',
    content: '',
    image_url: '',
    published: true,
});

const emptyCareer = (): Omit<CareerItem, 'id' | 'created_at' | 'updated_at'> => ({
    title: '',
    department: '',
    location: 'Ndola, Zambia',
    type: 'Full-time',
    description: '',
    requirements: [],
    active: true,
});

// ── NEWS FORM ────────────────────────────────────────────────
const NewsForm = ({
    initial,
    onSave,
    onCancel,
}: {
    initial: Partial<NewsItem>;
    onSave: (data: Partial<NewsItem>) => Promise<void>;
    onCancel: () => void;
}) => {
    const [form, setForm] = useState({ ...emptyNews(), ...initial });
    const [saving, setSaving] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.category || !form.excerpt) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    const inp = 'w-full px-3 py-2 text-sm bg-white border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors';
    const lbl = 'block text-[10px] font-heading font-bold uppercase tracking-wider text-gray-500 mb-1.5';

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Title <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.title} onChange={set('title')} placeholder="Article title" />
                </div>
                <div>
                    <label className={lbl}>Category <span className="text-red-500">*</span></label>
                    <select className={inp} value={form.category} onChange={set('category')}>
                        {['Company News', 'Operations', 'Infrastructure', 'Industry', 'Announcement'].map(c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className={lbl}>Excerpt <span className="text-red-500">*</span></label>
                <textarea className={`${inp} h-20 resize-none`} value={form.excerpt} onChange={set('excerpt')} placeholder="Short summary shown in card view" />
            </div>
            <div>
                <label className={lbl}>Full Content</label>
                <textarea className={`${inp} h-36 resize-none`} value={form.content || ''} onChange={set('content')} placeholder="Full article body (optional)" />
            </div>
            <div>
                <label className={lbl}>Image URL</label>
                <input className={inp} value={form.image_url || ''} onChange={set('image_url')} placeholder="https://... or /assets/images/..." />
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
                    className="w-4 h-4 accent-yellow-400"
                />
                <label htmlFor="published" className="text-sm text-gray-700 font-body cursor-pointer">Published (visible on site)</label>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving…' : 'Save Article'}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

// ── CAREER FORM ──────────────────────────────────────────────
const CareerForm = ({
    initial,
    onSave,
    onCancel,
}: {
    initial: Partial<CareerItem>;
    onSave: (data: Partial<CareerItem>) => Promise<void>;
    onCancel: () => void;
}) => {
    const [form, setForm] = useState({ ...emptyCareer(), ...initial });
    const [reqInput, setReqInput] = useState('');
    const [saving, setSaving] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const addReq = () => {
        if (reqInput.trim()) {
            setForm(p => ({ ...p, requirements: [...(p.requirements || []), reqInput.trim()] }));
            setReqInput('');
        }
    };

    const removeReq = (i: number) =>
        setForm(p => ({ ...p, requirements: (p.requirements || []).filter((_, idx) => idx !== i) }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.department || !form.description) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    const inp = 'w-full px-3 py-2 text-sm bg-white border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors';
    const lbl = 'block text-[10px] font-heading font-bold uppercase tracking-wider text-gray-500 mb-1.5';

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Job Title <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.title} onChange={set('title')} placeholder="e.g. Fleet Operations Manager" />
                </div>
                <div>
                    <label className={lbl}>Department <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.department} onChange={set('department')} placeholder="e.g. Operations" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Location</label>
                    <input className={inp} value={form.location} onChange={set('location')} />
                </div>
                <div>
                    <label className={lbl}>Type</label>
                    <select className={inp} value={form.type} onChange={set('type')}>
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className={lbl}>Description <span className="text-red-500">*</span></label>
                <textarea className={`${inp} h-24 resize-none`} value={form.description} onChange={set('description')} placeholder="Role summary" />
            </div>
            <div>
                <label className={lbl}>Requirements</label>
                <div className="flex gap-2 mb-3">
                    <input
                        className={`${inp} flex-1`}
                        value={reqInput}
                        onChange={e => setReqInput(e.target.value)}
                        placeholder="Type a requirement and press Add"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReq())}
                    />
                    <button type="button" onClick={addReq} className="px-4 py-2 bg-black text-white text-xs font-bold tracking-wider hover:bg-secondary transition-colors">
                        Add
                    </button>
                </div>
                <div className="space-y-1.5">
                    {(form.requirements || []).map((req, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100">
                            <span className="w-1.5 h-1.5 bg-yellow-400 block shrink-0" />
                            <span className="text-xs text-gray-700 font-body flex-1">{req}</span>
                            <button type="button" onClick={() => removeReq(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="active"
                    checked={form.active}
                    onChange={e => setForm(p => ({ ...p, active: e.target.checked }))}
                    className="w-4 h-4 accent-yellow-400"
                />
                <label htmlFor="active" className="text-sm text-gray-700 font-body cursor-pointer">Active (visible on Careers page)</label>
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving…' : 'Save Position'}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

// ── MAIN ADMIN PAGE ──────────────────────────────────────────
const Admin = () => {
    const [tab, setTab] = useState<Tab>('news');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [careers, setCareers] = useState<CareerItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
    const [editingCareer, setEditingCareer] = useState<Partial<CareerItem> | null>(null);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [showCareerForm, setShowCareerForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'news' | 'career'; id: string } | null>(null);
    const [connected, setConnected] = useState(true);

    // Fetch all data
    const fetchAll = async () => {
        setLoading(true);
        const [{ data: n, error: ne }, { data: c, error: ce }] = await Promise.all([
            supabase.from('news').select('*').order('created_at', { ascending: false }),
            supabase.from('careers').select('*').order('created_at', { ascending: false }),
        ]);
        if (ne || ce) {
            setConnected(false);
            toast.error('Could not connect to Supabase. Check your .env credentials.');
        } else {
            setConnected(true);
            setNews((n as NewsItem[]) || []);
            setCareers((c as CareerItem[]) || []);
        }
        setLoading(false);
    };

    useEffect(() => { fetchAll(); }, []);

    // ── NEWS CRUD ──
    const saveNews = async (data: Partial<NewsItem>) => {
        if (data.id) {
            const { error } = await supabase.from('news').update(data).eq('id', data.id);
            if (error) { toast.error('Failed to update article.'); return; }
            toast.success('Article updated.');
        } else {
            const { error } = await supabase.from('news').insert([data]);
            if (error) { toast.error('Failed to create article.'); return; }
            toast.success('Article created.');
        }
        setShowNewsForm(false);
        setEditingNews(null);
        fetchAll();
    };

    const deleteNews = async (id: string) => {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) { toast.error('Failed to delete.'); return; }
        toast.success('Article deleted.');
        setDeleteConfirm(null);
        fetchAll();
    };

    // ── CAREERS CRUD ──
    const saveCareer = async (data: Partial<CareerItem>) => {
        if (data.id) {
            const { error } = await supabase.from('careers').update(data).eq('id', data.id);
            if (error) { toast.error('Failed to update position.'); return; }
            toast.success('Position updated.');
        } else {
            const { error } = await supabase.from('careers').insert([data]);
            if (error) { toast.error('Failed to create position.'); return; }
            toast.success('Position created.');
        }
        setShowCareerForm(false);
        setEditingCareer(null);
        fetchAll();
    };

    const deleteCareer = async (id: string) => {
        const { error } = await supabase.from('careers').delete().eq('id', id);
        if (error) { toast.error('Failed to delete.'); return; }
        toast.success('Position deleted.');
        setDeleteConfirm(null);
        fetchAll();
    };

    const toggleNewsPublished = async (item: NewsItem) => {
        await supabase.from('news').update({ published: !item.published }).eq('id', item.id);
        fetchAll();
    };

    const toggleCareerActive = async (item: CareerItem) => {
        await supabase.from('careers').update({ active: !item.active }).eq('id', item.id);
        fetchAll();
    };

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            {/* TOP BAR */}
            <header className="bg-black border-b border-white/10 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center">
                        <span className="text-black font-heading font-bold text-xs">CM</span>
                    </div>
                    <div>
                        <p className="text-white font-heading font-bold text-sm uppercase tracking-wide">Calm Mountain Transport</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-heading">Content Management</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {!connected && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30">
                            <Warning className="w-3.5 h-3.5 text-red-400" weight="fill" />
                            <span className="text-red-400 text-[10px] font-heading uppercase tracking-wider">Supabase not connected</span>
                        </div>
                    )}
                    {connected && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20">
                            <CheckCircle className="w-3.5 h-3.5 text-green-400" weight="fill" />
                            <span className="text-green-400 text-[10px] font-heading uppercase tracking-wider">Connected</span>
                        </div>
                    )}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white/50 hover:text-white text-[10px] font-heading uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={12} /> View Site
                    </Link>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* TABS */}
                <div className="flex gap-0 mb-8 border-b border-gray-200">
                    {([['news', 'News Articles', Newspaper], ['careers', 'Job Openings', Briefcase]] as const).map(([key, label, Icon]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`flex items-center gap-2 px-6 py-4 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors ${tab === key
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-400 hover:text-gray-700'
                                }`}
                        >
                            <Icon size={14} weight="fill" /> {label}
                            <span className={`ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-sm ${tab === key ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                {key === 'news' ? news.length : careers.length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── NEWS TAB ── */}
                <AnimatePresence mode="wait">
                    {tab === 'news' && (
                        <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-black uppercase">News Articles</h2>
                                    <p className="text-gray-500 text-xs mt-1">{news.filter(n => n.published).length} published · {news.filter(n => !n.published).length} draft</p>
                                </div>
                                <button
                                    onClick={() => { setEditingNews(null); setShowNewsForm(true); }}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
                                >
                                    <Plus size={13} weight="bold" /> New Article
                                </button>
                            </div>

                            {/* News Form Panel */}
                            <AnimatePresence>
                                {showNewsForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mb-6"
                                    >
                                        <div className="bg-white border border-gray-200 p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                                                    {editingNews?.id ? 'Edit Article' : 'New Article'}
                                                </h3>
                                                <button onClick={() => { setShowNewsForm(false); setEditingNews(null); }}><X size={16} className="text-gray-400 hover:text-black transition-colors" /></button>
                                            </div>
                                            <NewsForm
                                                initial={editingNews || {}}
                                                onSave={saveNews}
                                                onCancel={() => { setShowNewsForm(false); setEditingNews(null); }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* News List */}
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse border border-gray-100" />)}
                                </div>
                            ) : news.length === 0 ? (
                                <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                                    <Newspaper size={32} className="text-gray-200 mx-auto mb-3" />
                                    <p className="text-gray-400 text-sm">No articles yet. Create your first one above.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {news.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-white border border-gray-100 px-6 py-4 flex items-center gap-4 hover:border-gray-300 transition-colors group"
                                        >
                                            <div className={`w-1.5 h-10 shrink-0 ${item.published ? 'bg-green-400' : 'bg-gray-200'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.category}</p>
                                                <p className="text-sm font-heading font-bold text-black truncate">{item.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{new Date(item.created_at).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    title={item.published ? 'Unpublish' : 'Publish'}
                                                    onClick={() => toggleNewsPublished(item)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    {item.published ? <Eye size={14} className="text-green-500" /> : <EyeSlash size={14} className="text-gray-400" />}
                                                </button>
                                                <button
                                                    title="Edit"
                                                    onClick={() => { setEditingNews(item); setShowNewsForm(true); }}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Pencil size={14} className="text-gray-500" />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => setDeleteConfirm({ type: 'news', id: item.id })}
                                                    className="p-2 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash size={14} className="text-gray-400 hover:text-red-500 transition-colors" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ── CAREERS TAB ── */}
                    {tab === 'careers' && (
                        <motion.div key="careers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-black uppercase">Job Openings</h2>
                                    <p className="text-gray-500 text-xs mt-1">{careers.filter(c => c.active).length} active · {careers.filter(c => !c.active).length} hidden</p>
                                </div>
                                <button
                                    onClick={() => { setEditingCareer(null); setShowCareerForm(true); }}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
                                >
                                    <Plus size={13} weight="bold" /> New Position
                                </button>
                            </div>

                            <AnimatePresence>
                                {showCareerForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mb-6"
                                    >
                                        <div className="bg-white border border-gray-200 p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                                                    {editingCareer?.id ? 'Edit Position' : 'New Position'}
                                                </h3>
                                                <button onClick={() => { setShowCareerForm(false); setEditingCareer(null); }}><X size={16} className="text-gray-400 hover:text-black transition-colors" /></button>
                                            </div>
                                            <CareerForm
                                                initial={editingCareer || {}}
                                                onSave={saveCareer}
                                                onCancel={() => { setShowCareerForm(false); setEditingCareer(null); }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse border border-gray-100" />)}
                                </div>
                            ) : careers.length === 0 ? (
                                <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                                    <Briefcase size={32} className="text-gray-200 mx-auto mb-3" />
                                    <p className="text-gray-400 text-sm">No job positions yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {careers.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-white border border-gray-100 px-6 py-4 flex items-center gap-4 hover:border-gray-300 transition-colors group"
                                        >
                                            <div className={`w-1.5 h-10 shrink-0 ${item.active ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.department} · {item.type}</p>
                                                <p className="text-sm font-heading font-bold text-black truncate">{item.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    title={item.active ? 'Deactivate' : 'Activate'}
                                                    onClick={() => toggleCareerActive(item)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    {item.active ? <Eye size={14} className="text-yellow-500" /> : <EyeSlash size={14} className="text-gray-400" />}
                                                </button>
                                                <button
                                                    title="Edit"
                                                    onClick={() => { setEditingCareer(item); setShowCareerForm(true); }}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Pencil size={14} className="text-gray-500" />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => setDeleteConfirm({ type: 'career', id: item.id })}
                                                    className="p-2 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash size={14} className="text-gray-400 hover:text-red-500 transition-colors" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DELETE CONFIRM MODAL */}
                <AnimatePresence>
                    {deleteConfirm && (
                        <motion.div
                            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white p-8 max-w-sm w-full"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                            >
                                <h3 className="text-base font-heading font-bold uppercase mb-2">Confirm Delete</h3>
                                <p className="text-sm text-gray-600 mb-6 font-body">This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            deleteConfirm.type === 'news'
                                                ? deleteNews(deleteConfirm.id)
                                                : deleteCareer(deleteConfirm.id)
                                        }
                                        className="px-6 py-2.5 bg-red-500 text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Admin;
