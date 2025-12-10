import React from 'react';
import { getGuideBySlug, guides } from '@/lib/guides';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const guide = getGuideBySlug(params.slug);
    if (!guide) return { title: 'Guide Not Found' };

    return {
        title: `${guide.title} | ScopeGuard`,
        description: guide.description,
        keywords: guide.tags.join(', '),
    };
}

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export default function GuidePage({ params }: Props) {
    const guide = getGuideBySlug(params.slug);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
            {/* Note: We reuse Header but enforce 'landing' view behavior for now since this is static */}
            <div className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Simple Logo Header for Guide Pages */}
                        <div className="relative flex items-center justify-center w-9 h-9 bg-indigo-600 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                            <div className="absolute inset-0 bg-indigo-400 rounded-lg blur opacity-40"></div>
                            <div className="text-white font-bold text-lg relative z-10">S</div>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">ScopeGuard</span>
                    </Link>
                    <Link href="/guides" className="text-sm font-mono text-slate-400 hover:text-white uppercase tracking-widest">
                        Back to Guides
                    </Link>
                </div>
            </div>

            <main className="container mx-auto px-4 py-32 max-w-3xl relative">

                <Link href="/guides" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors mb-8 font-mono text-xs uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                </Link>

                <article className="prose prose-invert prose-indigo max-w-none">
                    <div className="mb-12 border-b border-slate-800 pb-12">
                        <div className="flex gap-2 mb-6">
                            {guide.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                            {guide.title}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-8">
                            {guide.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500 font-mono border-t border-slate-800/50 pt-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {guide.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <span>{guide.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Structured Content Rendering */}
                    <div className="space-y-8">
                        {guide.blocks.map((block, index) => {
                            switch (block.type) {
                                case 'header':
                                    return (
                                        <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
                                            {block.content}
                                        </h2>
                                    );
                                case 'text':
                                    return (
                                        <p key={index} className="text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {(block.content as string).split('**').map((part, i) =>
                                                i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                                            )}
                                        </p>
                                    );
                                case 'list':
                                    return (
                                        <ul key={index} className="space-y-4 my-6">
                                            {block.items.map((item, i) => (
                                                <li key={i} className="flex gap-4 items-start text-slate-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0" />
                                                    <span className="leading-relaxed">
                                                        {item.split('**').map((part, partIndex) =>
                                                            partIndex % 2 === 1 ? <strong key={partIndex} className="text-white font-semibold">{part}</strong> : part
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                case 'alert':
                                    return (
                                        <div key={index} className={`my-8 p-6 rounded-xl border ${block.variant === 'info' ? 'bg-indigo-900/20 border-indigo-500/30 text-indigo-200' :
                                                block.variant === 'warning' ? 'bg-amber-900/20 border-amber-500/30 text-amber-200' :
                                                    block.variant === 'success' ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200' :
                                                        'bg-rose-900/20 border-rose-500/30 text-rose-200'
                                            }`}>
                                            {block.title && <h4 className="font-bold mb-2 flex items-center gap-2">
                                                {block.variant === 'info' && '💡'}
                                                {block.variant === 'success' && '✅'}
                                                {block.title}
                                            </h4>}
                                            <p className="opacity-90 leading-relaxed font-mono text-sm">
                                                {block.content}
                                            </p>
                                        </div>
                                    );
                                case 'chart':
                                    return (
                                        <div key={index} className="my-12 p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                                            <h4 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-8 text-center">{block.title}</h4>
                                            <div className="space-y-6">
                                                {block.data.map((item, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="flex justify-between text-sm font-medium">
                                                            <span className="text-slate-300">{item.label}</span>
                                                            <span className="text-white font-mono">${item.value.toLocaleString()}</span>
                                                        </div>
                                                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                                                style={{ width: `${(item.value / Math.max(...block.data.map(d => d.value))) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>

                </article>

                {/* Sticky CTA */}
                <div className="mt-20 p-8 border border-indigo-500/30 bg-indigo-900/10 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">Don't let scope creep steal your income.</h3>
                        <p className="text-slate-400 mb-6">Join the waitlist for ScopeGuard and get automated enforcement.</p>
                        <Link href="/" className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform">
                            Get Early Access
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
