import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import {
    Truck, Briefcase, Plus, Pencil, Trash, X, CheckCircle,
    Warning, ArrowLeft, Eye, EyeSlash, ChartBar, Users,
    ArrowRight, CaretDown, CaretUp, Globe, MapPin, House,
    Info, Wrench, Phone, Desktop, DeviceMobile, Clock, TrendUp,
    Newspaper, ImageSquare
} from 'phosphor-react';
import { supabase, CareerItem, FleetItem, PageView, NewsItem } from '@/lib/supabase';
import { toast } from 'sonner';

type Tab = 'dashboard' | 'fleet' | 'careers' | 'blog';

const emptyCareer = (): Omit<CareerItem, 'id' | 'created_at' | 'updated_at'> => {
    const today = new Date();
    const thirtyDays = new Date(today);
    thirtyDays.setDate(thirtyDays.getDate() + 30);
    return {
        title: '',
        department: '',
        location: 'Ndola, Zambia',
        type: 'Full-time',
        description: '',
        requirements: [],
        opening_date: today.toISOString().split('T')[0],
        closing_date: thirtyDays.toISOString().split('T')[0],
        active: true,
    };
};

const emptyFleet = (): Omit<FleetItem, 'id' | 'created_at' | 'updated_at'> => ({
    category: '',
    eyebrow: '',
    description: '',
    capacity: '',
    body_type: '',
    routes: '',
    accent: 'bg-primary',
    active: true,
    sort_order: 0,
});

const emptyNews = (): Omit<NewsItem, 'id' | 'created_at' | 'updated_at'> => ({
    title: '',
    slug: '',
    category: 'Company News',
    excerpt: '',
    content: '',
    image_url: '',
    published: true,
});

const slugFromTitle = (title: string) =>
    title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 80);

const inp = 'w-full px-3 py-2 text-sm bg-white border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors';
const lbl = 'block text-[10px] font-heading font-bold uppercase tracking-wider text-gray-500 mb-1.5';

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
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Opening Date</label>
                    <input type="date" className={inp} value={form.opening_date || ''} onChange={set('opening_date')} />
                </div>
                <div>
                    <label className={lbl}>Closing Date</label>
                    <input type="date" className={inp} value={form.closing_date || ''} onChange={set('closing_date')} />
                </div>
            </div>
            <div>
                <label className={lbl}>Description <span className="text-red-500">*</span></label>
                <textarea className={`${inp} h-24 resize-none`} value={form.description} onChange={set('description')} placeholder="Role summary" />
            </div>
            <div>
                <label className={lbl}>Requirements</label>
                            <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                        className={`${inp} flex-1 min-w-0`}
                        value={reqInput}
                        onChange={e => setReqInput(e.target.value)}
                        placeholder="Type a requirement and press Add"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReq())}
                    />
                    <button type="button" onClick={addReq} className="px-4 py-2 bg-black text-white text-xs font-bold tracking-wider hover:bg-secondary transition-colors shrink-0">Add</button>
                </div>
                <div className="space-y-1.5">
                    {(form.requirements || []).map((req, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100">
                            <span className="w-1.5 h-1.5 bg-black block shrink-0" />
                            <span className="text-xs text-gray-700 font-body flex-1">{req}</span>
                            <button type="button" onClick={() => removeReq(i)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={12} /></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} className="w-4 h-4 accent-black" />
                <label htmlFor="active" className="text-sm text-gray-700 font-body cursor-pointer">Active (visible on Careers page)</label>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-50">
                    {saving ? 'Saving…' : 'Save Position'}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
        </form>
    );
};

// ── FLEET FORM ───────────────────────────────────────────────
const FleetForm = ({
    initial,
    onSave,
    onCancel,
}: {
    initial: Partial<FleetItem>;
    onSave: (data: Partial<FleetItem>) => Promise<void>;
    onCancel: () => void;
}) => {
    const [form, setForm] = useState({ ...emptyFleet(), ...initial });
    const [saving, setSaving] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.category || !form.description || !form.capacity) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Category <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.category} onChange={set('category')} placeholder="e.g. Heavy Haulage" />
                </div>
                <div>
                    <label className={lbl}>Eyebrow Label</label>
                    <input className={inp} value={form.eyebrow} onChange={set('eyebrow')} placeholder="e.g. 30-Tonne Class" />
                </div>
            </div>
            <div>
                <label className={lbl}>Description <span className="text-red-500">*</span></label>
                <textarea className={`${inp} h-24 resize-none`} value={form.description} onChange={set('description')} placeholder="Vehicle class description" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={lbl}>Capacity <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.capacity} onChange={set('capacity')} placeholder="e.g. Up to 30,000 kg" />
                </div>
                <div>
                    <label className={lbl}>Body Type</label>
                    <input className={inp} value={form.body_type} onChange={set('body_type')} placeholder="e.g. Interlink / Side-tipper" />
                </div>
                <div>
                    <label className={lbl}>Routes</label>
                    <input className={inp} value={form.routes} onChange={set('routes')} placeholder="e.g. All cross-border corridors" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Accent Colour</label>
                    <select className={inp} value={form.accent} onChange={set('accent')}>
                        <option value="bg-primary">Yellow (Primary)</option>
                        <option value="bg-secondary">Dark (Secondary)</option>
                    </select>
                </div>
                <div>
                    <label className={lbl}>Sort Order</label>
                    <input type="number" className={inp} value={form.sort_order} onChange={set('sort_order')} placeholder="1" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <input type="checkbox" id="fleet-active" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} className="w-4 h-4 accent-black" />
                <label htmlFor="fleet-active" className="text-sm text-gray-700 font-body cursor-pointer">Active (visible on Fleet page)</label>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-50">
                    {saving ? 'Saving…' : 'Save Vehicle Class'}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
        </form>
    );
};

// ── NEWS/BLOG FORM ───────────────────────────────────────────
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
    const [uploading, setUploading] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const v = e.target.value;
        setForm(p => ({ ...p, [k]: v }));
        if (k === 'title') setForm(p => ({ ...p, slug: slugFromTitle(v) || p.slug }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPEG, PNG, WebP).');
            return;
        }
        setUploading(true);
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { data, error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
        if (error) {
            toast.error(error.message || 'Failed to upload image.');
            setUploading(false);
            return;
        }
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        setForm(p => ({ ...p, image_url: urlData.publicUrl }));
        toast.success('Image uploaded.');
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.excerpt) {
            toast.error('Please fill in title and excerpt.');
            return;
        }
        setSaving(true);
        await onSave({ ...form, slug: form.slug || slugFromTitle(form.title) });
        setSaving(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Title <span className="text-red-500">*</span></label>
                    <input className={inp} value={form.title} onChange={set('title')} placeholder="Blog post title" />
                </div>
                <div>
                    <label className={lbl}>Slug (URL)</label>
                    <input className={inp} value={form.slug || ''} onChange={set('slug')} placeholder="auto-generated-from-title" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Category</label>
                    <input className={inp} value={form.category} onChange={set('category')} placeholder="e.g. Company News" />
                </div>
                <div>
                    <label className={lbl}>Featured Image</label>
                    <div className="flex gap-2 items-center">
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-xs font-heading font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50">
                            <ImageSquare size={14} /> {uploading ? 'Uploading…' : 'Upload Image'}
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                        </label>
                        {form.image_url && (
                            <span className="text-xs text-gray-500 truncate max-w-[180px]">✓ Image set</span>
                        )}
                    </div>
                    {form.image_url && (
                        <img src={form.image_url} alt="" className="mt-2 h-20 object-cover rounded border border-gray-200" />
                    )}
                </div>
            </div>
            <div>
                <label className={lbl}>Excerpt <span className="text-red-500">*</span></label>
                <textarea className={`${inp} h-24 resize-none`} value={form.excerpt} onChange={set('excerpt')} placeholder="Short summary for listings" />
            </div>
            <div>
                <label className={lbl}>Content</label>
                <textarea className={`${inp} h-48 resize-y`} value={form.content || ''} onChange={set('content')} placeholder="Full content (plain text, paragraphs separated by blank lines)" />
            </div>
            <div className="flex items-center gap-3">
                <input type="checkbox" id="news-published" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-black" />
                <label htmlFor="news-published" className="text-sm text-gray-700 font-body cursor-pointer">Published (visible on blog)</label>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors disabled:opacity-50">
                    {saving ? 'Saving…' : 'Save Post'}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
        </form>
    );
};

// ── LOGIN FORM ───────────────────────────────────────────────
const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === 'admin123') {
            localStorage.setItem('cm_admin_auth', 'true');
            onLogin();
        } else {
            setError(true);
            toast.error('Invalid password');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-6 sm:p-10 shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-full max-w-[120px]">
                        <img src="/logo.png" alt="CM Transport Logo" className="w-full h-auto object-contain" />
                    </div>
                    <div>
                        <p className="text-black font-heading font-bold text-base uppercase tracking-wide">Admin Portal</p>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-heading">Secure Access Required</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            className={`w-full px-4 py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-200'} text-black focus:outline-none focus:border-black transition-colors`}
                            value={pass}
                            onChange={e => { setPass(e.target.value); setError(false); }}
                            placeholder="••••••••"
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="w-full py-4 bg-black text-white font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-all">
                        Login to Dashboard
                    </button>
                </form>
                <p className="mt-8 text-center">
                    <Link to="/" className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft size={12} /> Back to Website
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

// ── STAT CARD ─────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, trend }: {
    label: string;
    value: number | string;
    sub?: string;
    icon: React.ElementType;
    trend?: { value: string; up: boolean };
}) => {
    const isNumber = typeof value === 'number';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 p-4 sm:p-6 flex flex-col gap-4 hover:border-gray-300 transition-colors"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
                    <p className="text-3xl font-heading font-bold text-black">
                        {isNumber ? <CountUp end={value as number} duration={2} separator="," /> : value}
                    </p>
                    {sub && <p className="text-xs text-gray-400 mt-1 font-body">{sub}</p>}
                </div>
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-black" weight="fill" />
                </div>
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-heading font-bold ${trend.up ? 'text-green-500' : 'text-red-500'}`}>
                    {trend.up ? <CaretUp size={12} weight="fill" /> : <CaretDown size={12} weight="fill" />}
                    {trend.value}
                </div>
            )}
        </motion.div>
    );
};

// ── MAIN ADMIN PAGE ──────────────────────────────────────────
const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tab, setTab] = useState<Tab>('dashboard');
    const [fleet, setFleet] = useState<FleetItem[]>([]);
    const [careers, setCareers] = useState<CareerItem[]>([]);
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingFleet, setEditingFleet] = useState<Partial<FleetItem> | null>(null);
    const [editingCareer, setEditingCareer] = useState<Partial<CareerItem> | null>(null);
    const [showFleetForm, setShowFleetForm] = useState(false);
    const [showCareerForm, setShowCareerForm] = useState(false);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'fleet' | 'career' | 'news'; id: string } | null>(null);
    const [connected, setConnected] = useState(true);

    const fetchAll = async () => {
        setLoading(true);

        try {
            const [
                { data: f, error: fe },
                { data: c, error: ce },
                { data: p, error: pe },
                { data: n, error: ne }
            ] = await Promise.all([
                supabase.from('fleet').select('*').order('sort_order', { ascending: true }),
                supabase.from('careers').select('*').order('created_at', { ascending: false }),
                supabase.from('page_views').select('*').order('created_at', { ascending: false }).limit(100),
                supabase.from('news').select('*').order('created_at', { ascending: false }),
            ]);

            if (!fe) setFleet((f as FleetItem[]) || []);
            if (!ce) setCareers((c as CareerItem[]) || []);
            if (!pe) setPageViews((p as PageView[]) || []);
            if (!ne) setNews((n as NewsItem[]) || []);

            setConnected(!fe && !ce);
            if (pe) console.warn('[Supabase] page_views fetch failed (table may be missing):', pe);
        } catch (error) {
            setConnected(false);
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('cm_admin_auth') === 'true') setIsAuthenticated(true);
        fetchAll();
    }, []);

    if (!isAuthenticated) return <LoginForm onLogin={() => setIsAuthenticated(true)} />;

    // ── FLEET CRUD ──
    const saveFleet = async (data: Partial<FleetItem>) => {
        if (data.id) {
            const { error } = await supabase.from('fleet').update(data).eq('id', data.id);
            if (error) { toast.error('Failed to update vehicle class.'); return; }
            toast.success('Vehicle class updated.');
        } else {
            const { error } = await supabase.from('fleet').insert([data]);
            if (error) { toast.error('Failed to create vehicle class.'); return; }
            toast.success('Vehicle class created.');
        }
        setShowFleetForm(false);
        setEditingFleet(null);
        fetchAll();
    };

    const deleteFleet = async (id: string) => {
        const { error } = await supabase.from('fleet').delete().eq('id', id);
        if (error) {
            toast.error(error.message || 'Failed to delete. Check Supabase connection and RLS policies.');
            return;
        }
        setFleet(prev => prev.filter(item => item.id !== id));
        setDeleteConfirm(null);
        toast.success('Vehicle class deleted.');
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
        if (error) {
            toast.error(error.message || 'Failed to delete. Check Supabase connection and RLS policies.');
            return;
        }
        setCareers(prev => prev.filter(item => item.id !== id));
        setDeleteConfirm(null);
        toast.success('Position deleted.');
        fetchAll();
    };

    const toggleFleetActive = async (item: FleetItem) => {
        await supabase.from('fleet').update({ active: !item.active }).eq('id', item.id);
        fetchAll();
    };

    const toggleCareerActive = async (item: CareerItem) => {
        await supabase.from('careers').update({ active: !item.active }).eq('id', item.id);
        fetchAll();
    };

    // ── NEWS/BLOG CRUD ──
    const saveNews = async (data: Partial<NewsItem>) => {
        const payload = { ...data, slug: data.slug || slugFromTitle(data.title || '') };
        if (data.id) {
            const { error } = await supabase.from('news').update(payload).eq('id', data.id);
            if (error) { toast.error('Failed to update post.'); return; }
            toast.success('Post updated.');
        } else {
            const { error } = await supabase.from('news').insert([payload]);
            if (error) { toast.error('Failed to create post.'); return; }
            toast.success('Post created.');
        }
        setShowNewsForm(false);
        setEditingNews(null);
        fetchAll();
    };

    const deleteNews = async (id: string) => {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) {
            toast.error(error.message || 'Failed to delete.');
            return;
        }
        setNews(prev => prev.filter(item => item.id !== id));
        setDeleteConfirm(null);
        toast.success('Post deleted.');
        fetchAll();
    };

    const toggleNewsPublished = async (item: NewsItem) => {
        await supabase.from('news').update({ published: !item.published }).eq('id', item.id);
        fetchAll();
    };

    const isClosed = (date?: string) => date ? new Date(date) < new Date() : false;
    const activeJobs = careers.filter(c => c.active && !isClosed(c.closing_date));

    // ── Real analytics from page_views ──
    const isMobileUA = (ua: string | null) => ua && /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const getReferrerType = (r: string | null) => {
        if (!r || r === '') return 'direct';
        try {
            const url = new URL(r);
            const host = url.hostname.toLowerCase();
            if (/google|bing|yahoo|duckduckgo|baidu|yandex/i.test(host)) return 'search';
            return 'referral';
        } catch { return 'direct'; }
    };
    const sessions = pageViews.reduce((acc, pv) => {
        const key = `${pv.user_agent || 'unknown'}-${pv.created_at?.slice(0, 10)}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(pv);
        return acc;
    }, {} as Record<string, PageView[]>);
    const sessionCount = Object.keys(sessions).length;
    const bounceCount = Object.values(sessions).filter(s => s.length === 1).length;
    const bounceRate = sessionCount > 0 ? Math.round((bounceCount / sessionCount) * 100) : 0;
    const uniqueVisitors = new Set(pageViews.map(pv => pv.user_agent || 'unknown')).size;
    const deviceCounts = pageViews.reduce((acc, pv) => {
        const type = isMobileUA(pv.user_agent) ? 'mobile' : 'desktop';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const totalDev = (deviceCounts.mobile || 0) + (deviceCounts.desktop || 0);
    const desktopPct = totalDev > 0 ? Math.round(((deviceCounts.desktop || 0) / totalDev) * 100) : 0;
    const mobilePct = totalDev > 0 ? Math.round(((deviceCounts.mobile || 0) / totalDev) * 100) : 0;
    const sourceCounts = pageViews.reduce((acc, pv) => {
        const type = getReferrerType(pv.referrer);
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const totalSrc = pageViews.length;
    const directPct = totalSrc > 0 ? Math.round(((sourceCounts.direct || 0) / totalSrc) * 100) : 0;
    const searchPct = totalSrc > 0 ? Math.round(((sourceCounts.search || 0) / totalSrc) * 100) : 0;
    const referralPct = totalSrc > 0 ? Math.round(((sourceCounts.referral || 0) / totalSrc) * 100) : 0;

    const pages = [
        { name: 'Home', path: '/', icon: <House weight="fill" /> },
        { name: 'About', path: '/about', icon: <Info weight="fill" /> },
        { name: 'Services', path: '/services', icon: <Wrench weight="fill" /> },
        { name: 'Fleet', path: '/fleet', icon: <Truck weight="fill" /> },
        { name: 'Coverage', path: '/coverage', icon: <MapPin weight="fill" /> },
        { name: 'Blog', path: '/blog', icon: <Newspaper weight="fill" /> },
        { name: 'Careers', path: '/careers', icon: <Briefcase weight="fill" /> },
        { name: 'Contact', path: '/contact', icon: <Phone weight="fill" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-body overflow-x-clip">
            {/* TOP BAR */}
            <header className="bg-black border-b border-white/10 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                    <div className="w-20 md:w-24 shrink-0">
                        <img src="/logo.png" alt="CM Transport Logo" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="text-right md:text-left">
                        <p className="text-white font-heading font-bold text-xs md:text-sm uppercase tracking-wide">Calm Mountain Transport</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-heading">Admin Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {!connected && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 shrink-0">
                            <Warning className="w-3.5 h-3.5 text-red-400" weight="fill" />
                            <span className="text-red-400 text-[10px] font-heading uppercase tracking-wider">Supabase not connected</span>
                        </div>
                    )}
                    {connected && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 shrink-0">
                            <CheckCircle className="w-3.5 h-3.5 text-green-400" weight="fill" />
                            <span className="text-green-400 text-[10px] font-heading uppercase tracking-wider">Connected</span>
                        </div>
                    )}
                    <Link to="/" className="flex items-center gap-1 md:gap-2 text-white/50 hover:text-white text-[10px] font-heading uppercase tracking-wider transition-colors shrink-0 ml-auto md:ml-0">
                        <ArrowLeft size={12} /> View Site
                    </Link>
                    <button
                        onClick={() => { localStorage.removeItem('cm_admin_auth'); setIsAuthenticated(false); }}
                        className="text-white/30 hover:text-red-400 text-[10px] font-heading uppercase tracking-wider transition-colors shrink-0"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* TABS */}
                <div className="flex gap-0 mb-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    {([
                        ['dashboard', 'Dashboard', ChartBar],
                        ['fleet', 'Fleet', Truck],
                        ['careers', 'Careers', Briefcase],
                        ['blog', 'Blog', Newspaper],
                    ] as const).map(([key, label, Icon]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`flex items-center gap-2 px-4 md:px-6 py-4 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors shrink-0 ${tab === key
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            <Icon size={14} weight="fill" className={tab === key ? 'text-black' : 'text-gray-600'} /> {label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">

                    {/* ── DASHBOARD TAB ── */}
                    {tab === 'dashboard' && (
                        <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <h2 className="text-2xl font-heading font-bold text-black uppercase mb-2">Analytics Overview</h2>
                            <p className="text-gray-400 text-xs mb-8 font-body">Real-time performance metrics and visitor statistics.</p>

                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-8">
                                <StatCard
                                    label="Total Page Views"
                                    value={pageViews.length}
                                    sub="All-time traffic"
                                    icon={ChartBar}
                                />
                                <StatCard
                                    label="Unique Visitors"
                                    value={uniqueVisitors}
                                    sub="Distinct user agents"
                                    icon={Users}
                                />
                                <StatCard
                                    label="Avg. Session"
                                    value={pageViews.length > 0 ? "—" : "—"}
                                    sub="Duration not tracked"
                                    icon={Clock}
                                />
                                <StatCard
                                    label="Bounce Rate"
                                    value={pageViews.length > 0 ? `${bounceRate}%` : "0%"}
                                    sub="Single-page sessions"
                                    icon={TrendUp}
                                />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Top Pages */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="lg:col-span-2 bg-white border border-gray-100 p-4 sm:p-6"
                                >
                                    <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-black mb-6 flex items-center gap-2">
                                        <Globe size={16} className="text-black" weight="fill" /> Top Pages
                                    </h3>
                                    {pageViews.length === 0 ? (
                                        <p className="text-gray-400 text-xs">No analytics data available yet.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {Object.entries(
                                                pageViews.reduce((acc, pv) => {
                                                    const path = pv.page_path || '/';
                                                    acc[path] = (acc[path] || 0) + 1;
                                                    return acc;
                                                }, {} as Record<string, number>)
                                            ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([path, count], i) => (
                                                <div key={path} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-heading font-bold text-gray-400 w-4">{i + 1}</span>
                                                        <p className="text-xs font-body text-black">{path === '/' ? '/home' : path}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-32 h-1.5 bg-gray-100 hidden sm:block">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${Math.min(100, (count / pageViews.length) * 100)}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 1, ease: 'easeOut' }}
                                                                className="h-full bg-black"
                                                            />
                                                        </div>
                                                        <span className="text-xs font-heading font-bold text-black">
                                                            <CountUp end={count} duration={2} />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Devices & Traffic */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="bg-white border border-gray-100 p-4 sm:p-6"
                                >
                                    <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-black mb-6 flex items-center gap-2">
                                        <DeviceMobile size={16} className="text-black" weight="fill" /> Devices
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Desktop size={20} className="text-black" weight="fill" />
                                                <span className="text-xs font-body">Desktop</span>
                                            </div>
                                            <span className="text-xs font-heading font-bold">
                                                {pageViews.length > 0 ? <CountUp end={desktopPct} suffix="%" duration={2} /> : "0%"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <DeviceMobile size={20} className="text-black" weight="fill" />
                                                <span className="text-xs font-body">Mobile</span>
                                            </div>
                                            <span className="text-xs font-heading font-bold">
                                                {pageViews.length > 0 ? <CountUp end={mobilePct} suffix="%" duration={2} /> : "0%"}
                                            </span>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <h4 className="text-[10px] font-heading font-bold uppercase tracking-wider text-gray-400 mb-4">Traffic Sources</h4>
                                            <div className="space-y-3 text-xs font-body">
                                                <div className="flex justify-between items-center">
                                                    <span>Direct</span>
                                                    <span className="font-heading font-bold">
                                                        {pageViews.length > 0 ? <CountUp end={directPct} suffix="%" duration={2} /> : "0%"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>Search</span>
                                                    <span className="font-heading font-bold">
                                                        {pageViews.length > 0 ? <CountUp end={searchPct} suffix="%" duration={2} /> : "0%"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>Referral</span>
                                                    <span className="font-heading font-bold">
                                                        {pageViews.length > 0 ? <CountUp end={referralPct} suffix="%" duration={2} /> : "0%"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── FLEET TAB ── */}
                    {tab === 'fleet' && (
                        <motion.div key="fleet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-black uppercase">Fleet Classes</h2>
                                    <p className="text-gray-500 text-xs mt-1">{fleet.filter(f => f.active).length} active · {fleet.filter(f => !f.active).length} hidden</p>
                                </div>
                                <button
                                    onClick={() => { setEditingFleet(null); setShowFleetForm(true); }}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={13} weight="bold" className="text-white" /> New Vehicle Class
                                </button>
                            </div>

                            <AnimatePresence>
                                {showFleetForm && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                                        <div className="bg-white border border-gray-200 p-4 sm:p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                                                    {editingFleet?.id ? 'Edit Vehicle Class' : 'New Vehicle Class'}
                                                </h3>
                                                <button onClick={() => { setShowFleetForm(false); setEditingFleet(null); }}><X size={16} className="text-gray-400 hover:text-black transition-colors" /></button>
                                            </div>
                                            <FleetForm
                                                initial={editingFleet || {}}
                                                onSave={saveFleet}
                                                onCancel={() => { setShowFleetForm(false); setEditingFleet(null); }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading ? (
                                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse border border-gray-100" />)}</div>
                            ) : fleet.length === 0 ? (
                                <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                                    <Truck size={32} className="text-gray-400 mx-auto mb-3" weight="fill" />
                                    <p className="text-gray-400 text-sm">No vehicle classes yet. Create your first one above.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {fleet.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-white border border-gray-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:border-gray-300 transition-colors group"
                                        >
                                            <div className={`w-1.5 h-10 shrink-0 ${item.active ? 'bg-primary' : 'bg-gray-200'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.eyebrow} · Sort #{item.sort_order}</p>
                                                <p className="text-sm font-heading font-bold text-black truncate">{item.category}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.capacity} · {item.body_type}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button title={item.active ? 'Hide' : 'Show'} onClick={() => toggleFleetActive(item)} className="p-2 hover:bg-gray-100 transition-colors">
                                                    {item.active ? <Eye size={14} className="text-black" weight="fill" /> : <EyeSlash size={14} className="text-black" weight="fill" />}
                                                </button>
                                                <button title="Edit" onClick={() => { setEditingFleet(item); setShowFleetForm(true); }} className="p-2 hover:bg-gray-100 transition-colors">
                                                    <Pencil size={14} className="text-black" weight="fill" />
                                                </button>
                                                <button title="Delete" onClick={() => setDeleteConfirm({ type: 'fleet', id: item.id })} className="p-2 hover:bg-red-50 transition-colors">
                                                    <Trash size={14} className="text-black hover:text-red-500 transition-colors" weight="fill" />
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
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-black uppercase">Job Openings</h2>
                                    <p className="text-gray-500 text-xs mt-1">{activeJobs.length} active · {careers.filter(c => isClosed(c.closing_date)).length} closed</p>
                                </div>
                                <button
                                    onClick={() => { setEditingCareer(null); setShowCareerForm(true); }}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={13} weight="bold" className="text-white" /> New Position
                                </button>
                            </div>

                            <AnimatePresence>
                                {showCareerForm && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                                        <div className="bg-white border border-gray-200 p-4 sm:p-8">
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
                                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse border border-gray-100" />)}</div>
                            ) : careers.length === 0 ? (
                                <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                                    <Briefcase size={32} className="text-gray-400 mx-auto mb-3" weight="fill" />
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
                                            className="bg-white border border-gray-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:border-gray-300 transition-colors group"
                                        >
                                            <div className={`w-1.5 h-10 shrink-0 ${isClosed(item.closing_date) ? 'bg-red-400' : item.active ? 'bg-primary' : 'bg-gray-200'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.department} · {item.type}</p>
                                                <p className="text-sm font-heading font-bold text-black truncate">{item.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {item.opening_date ? `Opens ${new Date(item.opening_date).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short' })}` : ''}{item.closing_date ? ` · Closes ${new Date(item.closing_date).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
                                                    {isClosed(item.closing_date) && <span className="text-red-500 font-bold"> — Closed</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button title={item.active ? 'Deactivate' : 'Activate'} onClick={() => toggleCareerActive(item)} className="p-2 hover:bg-gray-100 transition-colors">
                                                    {item.active ? <Eye size={14} className="text-black" weight="fill" /> : <EyeSlash size={14} className="text-black" weight="fill" />}
                                                </button>
                                                <button title="Edit" onClick={() => { setEditingCareer(item); setShowCareerForm(true); }} className="p-2 hover:bg-gray-100 transition-colors">
                                                    <Pencil size={14} className="text-black" weight="fill" />
                                                </button>
                                                <button title="Delete" onClick={() => setDeleteConfirm({ type: 'career', id: item.id })} className="p-2 hover:bg-red-50 transition-colors">
                                                    <Trash size={14} className="text-black hover:text-red-500 transition-colors" weight="fill" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ── BLOG TAB ── */}
                    {tab === 'blog' && (
                        <motion.div key="blog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-black uppercase">Blog Posts</h2>
                                    <p className="text-gray-500 text-xs mt-1">{news.filter(n => n.published).length} published · {news.filter(n => !n.published).length} drafts</p>
                                </div>
                                <button
                                    onClick={() => { setEditingNews(null); setShowNewsForm(true); }}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-secondary transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={13} weight="bold" className="text-white" /> New Post
                                </button>
                            </div>

                            <AnimatePresence>
                                {showNewsForm && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                                        <div className="bg-white border border-gray-200 p-4 sm:p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                                                    {editingNews?.id ? 'Edit Post' : 'New Post'}
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

                            {loading ? (
                                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse border border-gray-100" />)}</div>
                            ) : news.length === 0 ? (
                                <div className="bg-white border border-dashed border-gray-200 p-16 text-center">
                                    <Newspaper size={32} className="text-gray-400 mx-auto mb-3" weight="fill" />
                                    <p className="text-gray-400 text-sm">No blog posts yet. Create your first one above.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {news.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-white border border-gray-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:border-gray-300 transition-colors group"
                                        >
                                            <div className={`w-1.5 h-10 shrink-0 ${item.published ? 'bg-primary' : 'bg-gray-200'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.category}</p>
                                                <p className="text-sm font-heading font-bold text-black truncate">{item.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.slug ? `/blog/${item.slug}` : `/blog/${item.id}`}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button title={item.published ? 'Unpublish' : 'Publish'} onClick={() => toggleNewsPublished(item)} className="p-2 hover:bg-gray-100 transition-colors">
                                                    {item.published ? <Eye size={14} className="text-black" weight="fill" /> : <EyeSlash size={14} className="text-black" weight="fill" />}
                                                </button>
                                                <button title="Edit" onClick={() => { setEditingNews(item); setShowNewsForm(true); }} className="p-2 hover:bg-gray-100 transition-colors">
                                                    <Pencil size={14} className="text-black" weight="fill" />
                                                </button>
                                                <button title="Delete" onClick={() => setDeleteConfirm({ type: 'news', id: item.id })} className="p-2 hover:bg-red-50 transition-colors">
                                                    <Trash size={14} className="text-black hover:text-red-500 transition-colors" weight="fill" />
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
                        <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div className="bg-white p-8 max-w-sm w-full" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                                <h3 className="text-base font-heading font-bold uppercase mb-2">Confirm Delete</h3>
                                <p className="text-sm text-gray-600 mb-6 font-body">This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            if (deleteConfirm.type === 'fleet') deleteFleet(deleteConfirm.id);
                                            else if (deleteConfirm.type === 'career') deleteCareer(deleteConfirm.id);
                                            else if (deleteConfirm.type === 'news') deleteNews(deleteConfirm.id);
                                        }}
                                        className="px-6 py-2.5 bg-red-500 text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => setDeleteConfirm(null)} className="px-6 py-2.5 border border-gray-300 text-xs font-heading font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
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
