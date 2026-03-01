import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

/**
 * Tracks page views by inserting a row into the `page_views` table on every route change.
 * Place this hook once in a top-level component (e.g. App.tsx or Index layout).
 */
export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const track = async () => {
            const { error } = await supabase.from('page_views').insert([{
                page_path: location.pathname,
                page_title: document.title,
                referrer: document.referrer || null,
                user_agent: navigator.userAgent || null,
            }]);
            if (error && import.meta.env.DEV) {
                console.warn('[PageTracking] Failed to record view:', error.message, '- Ensure page_views table exists and RLS allows INSERT.');
            }
        };
        track();
    }, [location.pathname]);
};
