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
            try {
                await supabase.from('page_views').insert([{
                    page_path: location.pathname,
                    page_title: document.title,
                    referrer: document.referrer || null,
                    user_agent: navigator.userAgent || null,
                }]);
            } catch {
                // silently fail — tracking should never break the app
            }
        };
        track();
    }, [location.pathname]);
};
