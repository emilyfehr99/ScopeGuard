"use client";

import { useState } from "react";
import { X, Lock, Loader2, ArrowRight, AlertCircle, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'login' | 'forgot_password'>('login');
    const [resetSent, setResetSent] = useState(false);

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            onLoginSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Invalid login credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) throw error;
            setResetSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white z-20 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8 pb-0 text-center relative">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                        {view === 'login' ? 'Welcome Back' : 'Reset Password'}
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">
                        {view === 'login' ? 'Enter your credentials to access the dashboard.' : 'We will send you a recovery link.'}
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded text-rose-400 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {view === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Email</label>
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
                                <div className="flex justify-between items-center">
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setView('forgot_password')}
                                        className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:border-indigo-500 focus:outline-none transition-colors placeholder:text-slate-700 text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white font-bold font-mono uppercase tracking-wider text-xs py-3 rounded hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            {resetSent ? (
                                <div className="text-center space-y-4 animate-in fade-in zoom-in-95">
                                    <div className="bg-emerald-500/10 p-4 rounded border border-emerald-500/20 text-emerald-400 text-xs flex flex-col items-center gap-2">
                                        <Check className="w-5 h-5 mb-1" />
                                        <span>Reset link sent to your email.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setView('login')}
                                        className="text-xs text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            ) : (
                                <>
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
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-800 text-white font-bold font-mono uppercase tracking-wider text-xs py-3 rounded hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-700"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setView('login')}
                                        className="w-full text-xs text-slate-500 hover:text-white pt-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );

}
