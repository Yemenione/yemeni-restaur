'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Save, Globe, Type, Image as ImageIcon, Layout, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    settings: Record<string, string>;
}

export default function SettingsIndex({ settings }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || 'YEMENI RESTAURANT',
        logo_type: settings.logo_type || 'text',
        logo_image: settings.logo_image || '/images/logo.png',
        favicon_url: settings.favicon_url || '/favicon.ico',
        meta_description: settings.meta_description || 'Authentic Yemeni Cuisine in Paris.',
        story_img_heritage_1: settings.story_img_heritage_1 || '/images/story-1.jpg',
        story_img_heritage_2: settings.story_img_heritage_2 || '/images/story-2.jpg',
        story_img_heritage_3: settings.story_img_heritage_3 || '/images/story-3.jpg',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-12 pb-20">
                <header>
                    <h1 className="text-4xl font-playfair font-bold text-white mb-2 uppercase tracking-tight">Site Settings</h1>
                    <p className="text-white/40 font-cairo">Configure your brand identity and global configurations.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Brand Identity */}
                    <div className="bg-charcoal p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl space-y-10">
                        <div className="flex items-center gap-3 text-saffron uppercase tracking-widest text-xs font-bold font-cairo">
                            <Globe size={14} />
                            Branding & Identity
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo">Site Name</label>
                                <input
                                    value={data.site_name}
                                    onChange={e => setData('site_name', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo">Logo Type</label>
                                <select
                                    value={data.logo_type}
                                    onChange={e => setData('logo_type', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all appearance-none"
                                >
                                    <option value="text">Text Only</option>
                                    <option value="image">Image Logo</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo flex items-center gap-2">
                                    <ImageIcon size={14} /> Logo Image URL
                                </label>
                                <input
                                    value={data.logo_image}
                                    onChange={e => setData('logo_image', e.target.value)}
                                    placeholder="/images/logo.png"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo flex items-center gap-2">
                                    <Layout size={14} /> Favicon URL
                                </label>
                                <input
                                    value={data.favicon_url}
                                    onChange={e => setData('favicon_url', e.target.value)}
                                    placeholder="/favicon.ico"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Story Section Assets */}
                    <div className="bg-charcoal p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl space-y-10">
                        <div className="flex items-center gap-3 text-saffron uppercase tracking-widest text-xs font-bold font-cairo">
                            <ImageIcon size={14} />
                            Story Section Assets
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo">Heritage Image 1 (Vertical)</label>
                                <input
                                    value={data.story_img_heritage_1}
                                    onChange={e => setData('story_img_heritage_1', e.target.value)}
                                    placeholder="/images/story-1.jpg"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo">Heritage Image 2 (Square)</label>
                                <input
                                    value={data.story_img_heritage_2}
                                    onChange={e => setData('story_img_heritage_2', e.target.value)}
                                    placeholder="/images/story-2.jpg"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-white/40 text-sm font-cairo">Heritage Image 3 (Atmosphere)</label>
                                <input
                                    value={data.story_img_heritage_3}
                                    onChange={e => setData('story_img_heritage_3', e.target.value)}
                                    placeholder="/images/story-3.jpg"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-charcoal p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl space-y-10">
                        <div className="flex items-center gap-3 text-white/20 uppercase tracking-widest text-xs font-bold font-cairo">
                            <ShieldCheck size={14} />
                            SEO & Accessibility
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/40 text-sm font-cairo">Global Meta Description</label>
                            <textarea
                                value={data.meta_description}
                                onChange={e => setData('meta_description', e.target.value)}
                                rows={3}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-saffron text-charcoal py-5 rounded-2xl font-bold font-cairo flex items-center justify-center gap-3 hover:bg-saffron/90 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50"
                        >
                            <Save size={20} />
                            SAVE ALL SETTINGS
                        </button>

                        {recentlySuccessful && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-saffron font-cairo font-bold"
                            >
                                Saved Successfully!
                            </motion.span>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
