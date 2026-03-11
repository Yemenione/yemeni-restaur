'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Tag, Save, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    slug: string;
}

interface Props {
    categories: Category[];
}

export default function CategoryIndex({ categories }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name_en: '',
        name_ar: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(`/admin/categories/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    reset();
                }
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => {
                    setIsAdding(false);
                    reset();
                }
            });
        }
    };

    const startEdit = (cat: Category) => {
        setEditingId(cat.id);
        setData({
            name_en: cat.name_en,
            name_ar: cat.name_ar,
        });
        setIsAdding(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure? This might affect dishes in this category.')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-12">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-2 uppercase tracking-tight">Categories</h1>
                        <p className="text-white/40 font-cairo">Organize your menu structure.</p>
                    </div>
                    {!isAdding && (
                        <button
                            onClick={() => { reset(); setIsAdding(true); setEditingId(null); }}
                            className="bg-saffron text-charcoal px-6 py-3 rounded-xl font-bold font-cairo flex items-center gap-2 hover:bg-saffron/90 transition-all active:scale-95"
                        >
                            <Plus size={20} />
                            NEW CATEGORY
                        </button>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-charcoal border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <table className="w-full text-left font-cairo">
                                <thead>
                                    <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/5 bg-black/20">
                                        <th className="p-6 font-bold">English Name</th>
                                        <th className="p-6 font-bold text-right">Arabic Name</th>
                                        <th className="p-6 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <Tag size={16} className="text-saffron" />
                                                    <span className="text-white font-medium">{cat.name_en}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right text-white font-medium">
                                                {cat.name_ar}
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => startEdit(cat)}
                                                        className="p-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-all"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
                                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Form Section */}
                    <AnimatePresence>
                        {isAdding && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-charcoal p-8 rounded-2xl border border-white/5 shadow-2xl space-y-8"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-playfair font-bold text-white uppercase">
                                        {editingId ? 'Edit' : 'Create'} Category
                                    </h3>
                                    <button onClick={() => setIsAdding(false)} className="text-white/20 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest">English Label</label>
                                        <input
                                            value={data.name_en}
                                            onChange={e => setData('name_en', e.target.value)}
                                            placeholder="e.g. Main Dishes"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-saffron/50 transition-all font-cairo"
                                        />
                                        {errors.name_en && <p className="text-red-500 text-xs">{errors.name_en}</p>}
                                    </div>

                                    <div className="space-y-2 text-right" dir="rtl">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest">المسمى العربي</label>
                                        <input
                                            value={data.name_ar}
                                            onChange={e => setData('name_ar', e.target.value)}
                                            placeholder="مثلاً: الأطباق الرئيسية"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-saffron/50 transition-all font-cairo"
                                        />
                                        {errors.name_ar && <p className="text-red-500 text-xs">{errors.name_ar}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-saffron text-charcoal py-4 rounded-xl font-bold font-cairo flex items-center justify-center gap-2 hover:bg-saffron/90 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'UPDATE' : 'SAVE'} CATEGORY
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </AdminLayout>
    );
}
