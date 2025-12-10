"use client";

import { useState, useEffect } from "react";
import { X, Lock, Loader2, Check, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: string;
    onComplete: () => void;
}

export function PaywallModal({ isOpen, onClose, plan, onComplete }: PaywallModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            setPassword("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        plan: plan,
                        role: 'user', // Default role
                        signup_source: 'scopeguard_web'
                    }
                }
            });

            if (authError) {
                throw authError;
            }

            // Note: If email confirmation is enabled in Supabase, the user might not be logged in immediately.
            // For this v1, checking if data.user exists is usually enough if auto-confirm is on, 
            // or we show a "Check your email" message.
            if (data.user) {
                setSubmitted(true);
                setTimeout(() => {
                    onComplete();
                }, 2000);
            } else {
                // This case might happen if email confirmation is required but user isn't logged in immediately
                setError("Account created. Please check your email to confirm your account.");
            }

        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getPlanDetails = () => {
        switch (plan) {
            case 'free':
                return {
                    title: "Create Free Account",
                    subtitle: "No credit card required.",
                    color: "text-slate-200",
                    btnBg: "bg-slate-700 hover:bg-slate-600",
                    features: ["3 Checks/month", "Basic Protection"]
                };
            case 'freelancer':
                return {
                    title: "Freelancer Access",
                    subtitle: "Automate scope detection.",
                    color: "text-indigo-400",
                    btnBg: "bg-indigo-600 hover:bg-indigo-500",
                    features: ["Unlimited Drafts", "Chrome Extension", "Active Protection"]
                };
            case 'agency':
                return {
                    title: "Agency Account",
                    subtitle: "Recover lost revenue.",
                    color: "text-emerald-400",
                    btnBg: "bg-emerald-600 hover:bg-emerald-500",
                    features: ["PDF Generator", "Slack Integration", "Priority Support"]
                };
            default:
                return {
                    title: "Create Account",
                    subtitle: "Join ScopeGuard",
                    color: "text-indigo-400",
                    btnBg: "bg-indigo-600",
                    features: []
                };
        }
    };

    const details = getPlanDetails();

    if (submitted) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
                <div className="w-full max-w-md bg-zinc-950 border border-emerald-500/20 rounded-lg p-8 text-center relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 animate-bounce">
                            <Check className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Account Created</h2>
                    <p className="text-zinc-400 mb-6">
                        Redirecting to your dashboard...
                    </p>
                    <Loader2 className="w-5 h-5 text-emerald-500 animate-spin mx-auto" />
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
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                        {details.title}
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">{details.subtitle}</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">

                    <div className="bg-slate-950/50 rounded border border-slate-800 p-4">
                        <ul className="space-y-2">
                            {details.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

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

                        <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-700 text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-white font-bold font-mono uppercase tracking-wider text-xs py-4 rounded transition-all flex items-center justify-center gap-2 group ${details.btnBg}`}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-slate-600">
                            By joining, you agree to our Terms and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
