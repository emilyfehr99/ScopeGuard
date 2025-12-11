"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export function useAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const isInitialized = useRef(false);

    // 1. Initialize Visitor & Session
    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true; // Prevent double firing in React strict mode dev

        let storedVisitorId = localStorage.getItem('sg_visitor_id');
        if (!storedVisitorId) {
            storedVisitorId = uuidv4();
            localStorage.setItem('sg_visitor_id', storedVisitorId);
        }
        setVisitorId(storedVisitorId);

        const initSession = async () => {
            try {
                // Get User (if logged in logic exists, otherwise anon)
                const { data: { user } } = await supabase.auth.getUser();

                const { data, error } = await supabase
                    .from('analytics_sessions')
                    .insert({
                        visitor_id: storedVisitorId!, // Assert non-null as we set it above
                        user_id: user?.id || null,
                        user_agent: window.navigator.userAgent,
                        referrer: document.referrer,
                        device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
                    })
                    .select()
                    .single();

                if (data) {
                    setSessionId(data.id);
                } else if (error) {
                    console.error('Analytics session error:', error);
                }
            } catch (err) {
                console.error('Failed to init session', err);
            }
        };

        initSession();
    }, []);

    // 2. Track Page Views
    useEffect(() => {
        if (!sessionId || !pathname) return;

        const trackView = async () => {
            await supabase.from('analytics_page_views').insert({
                session_id: sessionId,
                path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
            });
        };

        trackView();
    }, [pathname, searchParams, sessionId]);

    // 3. Heartbeat (Update last_seen_at every 30s)
    useEffect(() => {
        if (!sessionId) return;

        const interval = setInterval(async () => {
            await supabase
                .from('analytics_sessions')
                .update({ last_seen_at: new Date().toISOString() })
                .eq('id', sessionId);
        }, 30000);

        return () => clearInterval(interval);
    }, [sessionId]);
}
