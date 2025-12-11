"use client";

import { useAnalytics } from "@/lib/hooks/useAnalytics";

export default function AnalyticsTracker() {
    useAnalytics();
    return null; // This component does not render anything
}
