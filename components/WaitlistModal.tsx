"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Check, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: string;
}

export function WaitlistModal({ isOpen, onClose, plan }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setSubmitted(false);
            setLoading(false);
            setError(null);
            setEmail("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Insert into 'waitlist' table
            const { error: dbError } = await supabase
                .from('waitlist')
                .insert([
                    { email, role: plan, created_at: new Date().toISOString() }
                ]);

            if (dbError) throw dbError;

            setSubmitted(true);
        } catch (err: any) {
            console.error("Waitlist error:", err);
            // Duplicate key error usually (if unique constraint on email)
            if (err.code === '23505') {
                setSubmitted(true); // Treat as success for UX
            } else {
                setError(err.message || "Failed to join waitlist. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="w-full max-w-md bg-slate-900 border border-emerald-500/20 rounded-xl p-8 text-center relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white z-20 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 animate-bounce">
                            <Check className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 tracking-tight">You're on the list!</h2>
                    <p className="text-slate-400 text-sm mb-6">
                        We've reserved your spot for the <span className="text-emerald-400 font-mono uppercase font-bold">{plan}</span> tier.
                        <br />We'll notify you via <span className="text-white">{email}</span> when access opens.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-slate-800 text-white rounded font-bold font-mono uppercase tracking-wider text-xs hover:bg-slate-700 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white z-20 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-8 pb-0 text-center relative">
                    <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 shadow-inner mx-auto mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                        Get Early Access
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">
                        Join the waitlist for <span className="text-indigo-400 font-bold uppercase">{plan}</span> features.
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded text-rose-400 text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-700 text-sm"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white font-bold font-mono uppercase tracking-wider text-xs py-4 rounded transition-all flex items-center justify-center gap-2 group bg-indigo-600 hover:bg-indigo-500"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <span>Join Waitlist</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-slate-600">
                            We'll never share your email. Priority access for agencies.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
