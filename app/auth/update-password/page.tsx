"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            setMessage({ type: 'success', text: "Password updated successfully! Redirecting..." });

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 mx-auto mb-4">
                        <Lock className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Set New Password</h1>
                    <p className="text-slate-400 text-xs mt-2 font-mono">Secure your account with a new credential.</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 mb-6 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="text-xs font-mono">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono text-indigo-300/70 uppercase tracking-widest pl-1">New Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all placeholder:text-zinc-700 hover:border-white/20"
                            placeholder="Enter new password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-bold font-mono uppercase tracking-wider text-sm py-3.5 rounded-lg hover:bg-indigo-500 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
