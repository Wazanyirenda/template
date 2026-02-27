import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env. ' +
        'CMS features will not work until these are set.'
    );
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// ── Types ─────────────────────────────────────────────────────

export interface NewsItem {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content?: string;
    image_url?: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface CareerItem {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface FleetItem {
    id: string;
    category: string;
    eyebrow: string;
    description: string;
    capacity: string;
    body_type: string;
    routes: string;
    accent: string;
    active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}
