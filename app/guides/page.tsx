"use client";

import React from 'react';
import Header from '@/components/Header';
import { guides } from '@/lib/guides';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export default function GuidesIndex() {
    const handleNavigate = (view: string) => {
        if (view === 'landing') window.location.href = '/';
        if (view === 'app') window.location.href = '/?view=app';
        if (view === 'pricing') window.location.href = '/?view=pricing';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
            <Header
                credits={0}
                currentView="landing"
                onNavigate={handleNavigate}
                onLogin={() => { }}
                onLogout={() => { }}
                user={null}
            />

            <main className="container mx-auto px-4 py-32 max-w-5xl">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
                        <BookOpen className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">ScopeGuard Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        FIELD MANUALS
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
                        Tactical guides to automated contract enforcement and handling scope creep.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {guides.map((guide) => (
                        <Link href={`/guides/${guide.slug}`} key={guide.slug} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                            <div className="relative h-full bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/80 transition-all flex flex-col">
                                <div className="flex items-center gap-3 mb-6 text-xs font-mono text-slate-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {guide.readTime}
                                    </span>
                                    <span>•</span>
                                    <span>{guide.date}</span>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                                    {guide.title}
                                </h2>
                                <p className="text-slate-400 mb-8 line-clamp-3 leading-relaxed flex-grow">
                                    {guide.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex gap-2">
                                        {guide.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] uppercase tracking-wide text-slate-500 font-mono">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="flex items-center gap-2 text-indigo-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                        Read Protocol <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
