import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, AlertTriangle, DollarSign, Server, EyeOff, Check, Clock, RefreshCw, Zap, Scan } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    const [demoTone, setDemoTone] = useState<'diplomat' | 'bad_cop'>('diplomat');
    const [hourlyRate, setHourlyRate] = useState(150);
    const [freeFixes, setFreeFixes] = useState(5);
    const [scanned, setScanned] = useState(false);

    // Scanner Animation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setScanned(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const yearlyLoss = hourlyRate * freeFixes * 12;
    const annualCost = 290; // Freelancer Annual
    const roi = Math.round(((yearlyLoss - annualCost) / annualCost) * 100);

    return (
        <div className="flex flex-col min-h-screen pb-12 relative overflow-hidden bg-slate-950">

            {/* Background Grid Animation Wrapper */}
            <div className="absolute inset-x-0 top-0 h-[600px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none"></div>

            {/* 1. HERO SECTION (Compacted) */}
            <section className="relative px-4 pt-24 md:pt-32 text-center z-10 mb-16">

                {/* Scanner Line Effect */}
                <div
                    className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-md transition-all duration-[3000ms] ease-linear pointer-events-none ${scanned ? 'top-[60%]' : 'top-[10%]'}`}
                    style={{ opacity: 0.8 }}
                ></div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">

                    {/* Status Badge - Tech Style */}
                    <div className="inline-flex items-center justify-between gap-4 px-3 py-1 bg-slate-900/80 border border-slate-700/50 rounded pointer-events-none backdrop-blur-md mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-sm animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">System Online</span>
                        </div>
                        <div className="h-3 w-px bg-slate-700"></div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">v3.0.1</span>
                    </div>

                    {/* Main Headline - Tighter */}
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                            STOP WORKING <br />
                            <span className="relative inline-block group">
                                <span className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 blur-2xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></span>
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                                    FOR FREE.
                                </span>
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                            The <span className="text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">AI Project Manager</span> that detects scope creep, enforces your contract, and automates change orders.
                        </p>
                    </div>

                    {/* CTAs - Compact */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={onStart}
                            className="group relative px-6 py-3 bg-indigo-600 overflow-hidden rounded shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all hover:-translate-y-0.5 border border-indigo-500/50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <span className="relative text-white font-bold font-mono uppercase tracking-wider text-xs flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 fill-current" />
                                Start Recovering Revenue
                            </span>
                        </button>

                        <button className="group px-6 py-3 bg-slate-950/50 border border-slate-800 text-slate-400 font-bold font-mono uppercase tracking-wider text-xs hover:border-emerald-500/50 hover:text-white hover:bg-slate-900 transition-all rounded flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <Scan className="w-3.5 h-3.5 group-hover:text-emerald-400 transition-colors" />
                            Live Demo
                        </button>
                    </div>

                    {/* Revenue Dashboard Visual - Compact & Tech */}
                    <div className="mt-12 relative max-w-2xl mx-auto perspective-[1000px] group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse"></div>
                        <div className="relative bg-slate-950/95 border border-slate-800 rounded-lg p-6 flex items-center justify-between gap-4 backdrop-blur-xl transform transition-transform duration-500 group-hover:rotate-x-2 shadow-2xl">
                            {/* Tech Borders */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/50 opacity-50"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/50 opacity-50"></div>

                            <div className="text-left">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Recovered Revenue</span>
                                <div className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]">
                                    $4,500.00
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1 text-[10px] font-mono text-slate-500">
                                <span className="flex items-center gap-1 text-emerald-400/90 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]"><Check className="w-3 h-3" /> 3 Change Orders</span>
                                <span className="flex items-center gap-1 text-indigo-400/80"><Clock className="w-3 h-3" /> 12hrs Saved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. HOW IT WORKS (The Core Loop) */}
            <section className="max-w-6xl mx-auto px-4 mb-24 relative z-10 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* Step 1: Ingest */}
                    <div className="md:col-span-4 bg-slate-900/40 border border-slate-800 p-6 rounded-lg group hover:border-cyan-500/50 transition-all relative overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity">
                            <FileText className="w-16 h-16 text-cyan-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                            <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">01.</span> INGEST
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Upload your MSA or SOW. We map contract boundaries instantly.
                        </p>
                    </div>

                    {/* Step 2: Interceptor */}
                    <div className="md:col-span-4 bg-slate-900/40 border border-slate-800 p-6 rounded-lg group hover:border-rose-500/50 transition-all relative overflow-hidden hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity">
                            <AlertTriangle className="w-16 h-16 text-rose-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                            <span className="text-rose-500 group-hover:text-rose-400 transition-colors">02.</span> INTERCEPT
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            AI monitors Gmail/Slack. If a request violates scope, we flag it.
                        </p>
                    </div>

                    {/* Step 3: Recovery */}
                    <div className="md:col-span-4 bg-slate-900/40 border border-slate-800 p-6 rounded-lg group hover:border-emerald-500/50 transition-all relative overflow-hidden hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity">
                            <DollarSign className="w-16 h-16 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                            <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">03.</span> RECOVER
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Auto-drafts rejection & generates a PDF Change Order to get paid.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. INTERACTIVE DEMO (Tightened) */}
            <section className="relative py-12 bg-slate-950/50 border-y border-slate-900 mb-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            <div className={`w-2 h-8 transition-colors duration-500 ${demoTone === 'diplomat' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.6)] animate-pulse'}`}></div>
                            LIVE INTERCEPT DEMO
                        </h2>
                        <div className="hidden md:flex gap-2">
                            {['diplomat', 'bad_cop'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setDemoTone(t as any)}
                                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded border transition-all duration-300 ${demoTone === t
                                        ? t === 'diplomat' ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-[pulse_2s_infinite]'
                                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    {t.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 border transition-colors duration-500 rounded-lg overflow-hidden bg-slate-900/40 backdrop-blur-sm ${demoTone === 'bad_cop' ? 'border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'border-slate-800'}`}>
                        {/* Left: Client Email */}
                        <div className="p-6 border-r border-slate-800/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">CL</div>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-wider">Client Transmission</div>
                                    <div className="text-[10px] text-slate-600 font-mono">INCOMING PAYLOAD</div>
                                </div>
                            </div>
                            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded text-xs text-slate-300 font-mono leading-relaxed opacity-80">
                                "Hey, can we just quickly add a dark mode toggle? It shouldn't take long, right?"
                            </div>
                        </div>

                        {/* Right: ScopeGuard Reply */}
                        <div className="p-6 bg-slate-950/30 relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded bg-opacity-20 flex items-center justify-center border transition-colors duration-500 ${demoTone === 'diplomat' ? 'bg-cyan-500 border-cyan-500/50 text-cyan-400' : 'bg-red-600 border-red-500/50 text-red-500'}`}>
                                    <Shield className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-wider">ScopeGuard Protocol</div>
                                    <div className={`text-[10px] font-mono transition-colors duration-300 ${demoTone === 'diplomat' ? 'text-cyan-500' : 'text-red-500 animate-pulse'}`}>
                                        {demoTone === 'diplomat' ? 'ANALYSIS COMPLETE' : 'THREAT INTERCEPTED'}
                                    </div>
                                </div>
                            </div>

                            <div className={`bg-slate-900/50 border p-4 rounded text-xs font-mono leading-relaxed min-h-[140px] relative transition-colors duration-500 ${demoTone === 'diplomat' ? 'border-cyan-500/20' : 'border-red-500/30 bg-red-950/10'}`}>
                                <div className={`transition-all duration-300 ${demoTone === 'diplomat' ? 'opacity-100' : 'hidden'}`}>
                                    <span className="text-cyan-200">
                                        // MODE: DIPLOMAT<br />
                                        "Hi! That wasn't included in the original scope. I can definitely add it, but I'll need to send over a quick estimate for the extra hours."
                                    </span>
                                </div>
                                <div className={`transition-all duration-300 ${demoTone === 'bad_cop' ? 'opacity-100' : 'hidden'}`}>
                                    <span className="text-rose-200 block mb-3">
                                        // MODE: STRICT ENFORCEMENT<br />
                                        "Hi. Per our SOW, 'Dark Mode' is out of scope. I have attached a Change Order for $500. Please sign to proceed."
                                    </span>
                                    <div className="flex items-center gap-2 p-2 bg-slate-950 border border-rose-500/50 rounded text-[10px] text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                                        <FileText className="w-3 h-3 text-rose-500" />
                                        <span>CO_Dark_Mode.pdf</span>
                                        <span className="ml-auto text-rose-500 font-bold">$500.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. ROI CALCULATOR (The Closer) */}
            <section className="py-16 bg-slate-900/30 border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-6 font-mono">CALCULATE YOUR LOSSES</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                                            <span>Hourly Rate</span>
                                            <span className="text-indigo-400">${hourlyRate}/hr</span>
                                        </div>
                                        <input type="range" min="50" max="300" step="10" value={hourlyRate} onChange={(e) => setHourlyRate(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                                            <span>Free "Quick Fixes" / Month</span>
                                            <span className="text-rose-400">{freeFixes} Hours</span>
                                        </div>
                                        <input type="range" min="1" max="20" value={freeFixes} onChange={(e) => setFreeFixes(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:border-l border-slate-800 md:pl-12 w-full">
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">You are losing</p>
                            <div className="text-5xl font-black text-rose-500 mb-3 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)] tracking-tighter">
                                ${yearlyLoss.toLocaleString()}
                            </div>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Per Year</p>

                            <div className="p-4 bg-slate-900/80 border border-emerald-500/20 rounded-lg">
                                <div className="text-xs text-slate-400 mb-1">ScopeGuard costs <span className="text-white">$348/yr</span>.</div>
                                <div className="text-sm font-bold text-emerald-400">
                                    ROI: {(yearlyLoss / 348 * 100).toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PRIVACY TRUST BADGE */}
            <section className="py-12 bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full mb-6">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Security Protocol Active</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                                <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="text-xs font-mono text-slate-500">AES-256 Encrypted Data</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                                <EyeOff className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="text-xs font-mono text-slate-500">No Model Training on Contracts</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                                <Shield className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="text-xs font-mono text-slate-500">SOC-2 Compliant Standards</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <div className="text-center pb-24">
                <button onClick={onStart} className="text-xs font-mono font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                    [ Initialize System ]
                </button>
            </div>

        </div>
    );
};

export default LandingPage;
