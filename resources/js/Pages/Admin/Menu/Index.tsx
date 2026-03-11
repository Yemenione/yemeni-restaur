'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Menu {
    id: number;
    title_en: string;
    title_ar: string;
    price: string;
    category: string;
    image_url: string;
}

interface Props {
    items: Menu[];
}

export default function MenuIndex({ items }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this dish?')) {
            router.delete(`/admin/menu/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-12">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white mb-2 uppercase tracking-tight">Menu Items</h1>
                        <p className="text-white/40 font-cairo text-lg">Manage your dishes and pricing.</p>
                    </div>
                    <Link
                        href="/admin/menu/create"
                        className="bg-saffron text-charcoal px-6 py-3 rounded-xl font-bold font-cairo flex items-center gap-2 hover:bg-saffron/90 transition-colors shadow-lg active:scale-95"
                    >
                        <Plus size={20} />
                        ADD NEW DISH
                    </Link>
                </header>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-charcoal border border-white/5 rounded-2xl overflow-hidden group hover:border-saffron/30 transition-all shadow-xl"
                        >
                            {/* Dish Image */}
                            <div className="h-48 relative bg-black/40 flex items-center justify-center overflow-hidden">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title_en}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                ) : (
                                    <ImageIcon size={48} className="text-white/10" />
                                )}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-saffron tracking-widest border border-saffron/20">
                                    {item.category}
                                </div>
                            </div>

                            {/* Dish Content */}
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-playfair font-bold text-white group-hover:text-saffron transition-colors">{item.title_en}</h3>
                                        <p className="text-white/40 text-xs font-cairo mt-1">{item.title_ar}</p>
                                    </div>
                                    <span className="text-saffron font-playfair font-bold text-lg">{item.price}</span>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-white/5">
                                    <Link
                                        href={`/admin/menu/${item.id}/edit`}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
