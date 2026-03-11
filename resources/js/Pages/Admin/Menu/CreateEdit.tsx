'use client';

import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Save, Globe, DollarSign, Image as ImageIcon } from 'lucide-react';

interface Menu {
    id?: number;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    price: string;
    category: string;
    image_url: string;
}

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    slug: string;
}

interface Props {
    item?: Menu;
    categories: Category[];
}

export default function CreateEdit({ item, categories }: Props) {
    const isEditing = !!item;
    // ... (rest of the component stays same until the select)

    const { data, setData, post, processing, errors } = useForm({
        title_en: item?.title_en || '',
        title_ar: item?.title_ar || '',
        description_en: item?.description_en || '',
        description_ar: item?.description_ar || '',
        price: item?.price || '',
        category: item?.category || (categories.length > 0 ? categories[0].slug : 'main'),
        image: null as File | null,
        image_url: item?.image_url || '',
        _method: isEditing ? 'PUT' : 'POST',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/menu/${item.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/menu', {
                forceFormData: true,
            });
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-12">
                {/* ... header code same ... */}
                <header className="flex items-center gap-6">
                    <Link
                        href="/admin/menu"
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-white uppercase tracking-tight">
                            {isEditing ? 'Edit Dish' : 'Create New Dish'}
                        </h1>
                        <p className="text-white/40 font-cairo">Configure your legendary menu items.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 bg-charcoal p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">

                    {/* Image & Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-saffron uppercase tracking-widest text-xs font-bold font-cairo">
                                <ImageIcon size={14} />
                                Visual Identity
                            </div>

                            <div className="space-y-4">
                                <div className="aspect-video w-full rounded-xl border border-white/10 bg-black/40 overflow-hidden relative group">
                                    {(data.image || data.image_url) ? (
                                        <img
                                            src={data.image ? URL.createObjectURL(data.image) : data.image_url}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10 space-y-2">
                                            <ImageIcon size={40} />
                                            <span className="text-xs font-cairo uppercase tracking-widest">No Image Selected</span>
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-cairo text-sm font-bold uppercase tracking-widest">
                                        Change Photo
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                <p className="text-white/20 text-[10px] uppercase tracking-widest font-cairo">Upload actual dish photo for premium display</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo uppercase tracking-tighter">Or External URL</label>
                                <input
                                    value={data.image_url}
                                    onChange={e => setData('image_url', e.target.value)}
                                    placeholder="/images/dish.png"
                                    className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-white text-xs outline-none focus:border-saffron/30 transition-all placeholder:text-white/5"
                                />
                                {errors.image_url && <p className="text-red-500 text-xs">{errors.image_url}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 text-sm font-cairo">Price</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"><DollarSign size={16} /></span>
                                    <input
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        placeholder="24€"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white outline-none focus:border-saffron/50 transition-all"
                                    />
                                </div>
                                {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/40 text-sm font-cairo">Category</label>
                            <select
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-saffron/50 transition-all appearance-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name_en} / {cat.name_ar}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Bilingual Content */}
                    <div className="space-y-12 pt-8 border-t border-white/5">
                        {/* English */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-white/20 uppercase tracking-widest text-xs font-bold font-cairo">
                                <Globe size={14} />
                                English Content
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <input
                                    value={data.title_en}
                                    onChange={e => setData('title_en', e.target.value)}
                                    placeholder="Title (English)"
                                    className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-playfair text-white outline-none focus:border-saffron transition-all placeholder:text-white/10"
                                />
                                <textarea
                                    value={data.description_en}
                                    onChange={e => setData('description_en', e.target.value)}
                                    placeholder="Description (English)"
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-saffron transition-all placeholder:text-white/10 resize-none font-cairo"
                                />
                            </div>
                        </div>

                        {/* Arabic */}
                        <div className="space-y-6" dir="rtl">
                            <div className="flex items-center gap-3 text-white/20 uppercase tracking-widest text-xs font-bold font-cairo">
                                <Globe size={14} />
                                المحتوى العربي
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <input
                                    value={data.title_ar}
                                    onChange={e => setData('title_ar', e.target.value)}
                                    placeholder="العنوان (العربية)"
                                    className="w-full bg-transparent border-b border-white/10 py-4 text-3xl font-cairo text-white outline-none focus:border-saffron transition-all placeholder:text-white/10"
                                />
                                <textarea
                                    value={data.description_ar}
                                    onChange={e => setData('description_ar', e.target.value)}
                                    placeholder="الوصف (العربية)"
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-saffron transition-all placeholder:text-white/10 resize-none font-cairo"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-saffron text-charcoal py-5 rounded-2xl font-bold font-cairo flex items-center justify-center gap-3 hover:bg-saffron/90 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 mt-12"
                    >
                        <Save size={20} />
                        {isEditing ? 'UPDATE DISH' : 'PUBLISH DISH'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
