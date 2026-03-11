'use client';

import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export default function Footer() {
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';

    const t = (key: string) => {
        const translations: any = {
            en: {
                tagline: 'Authentic Yemeni Gastronomy in the heart of Paris.',
                address: '123 Avenue des Champs-Élysées, 75008 Paris',
                hours: 'Open Daily: 12:00 PM - 11:30 PM',
                contact: 'Contact Us',
                location: 'Our Location',
                rights: '© 2026 YEMENI. All Rights Reserved.',
                follow: 'Follow Our Journey'
            },
            fr: {
                tagline: 'Gastronomie Yéménite Authentique au cœur de Paris.',
                address: '123 Avenue des Champs-Élysées, 75008 Paris',
                hours: 'Ouvert tous les jours : 12h00 - 23h30',
                contact: 'Contactez-nous',
                location: 'Notre Emplacement',
                rights: '© 2026 YEMENI. Tous droits réservés.',
                follow: 'Suivez notre voyage'
            },
            ar: {
                tagline: 'عراقة المذاق اليمني في قلب باريس.',
                address: '123 شارع الشانزليزيه، 75008 باريس',
                hours: 'يومياً: 12:00 ظهراً - 11:30 مساءً',
                contact: 'اتصل بنا',
                location: 'موقعنا',
                rights: '© 2026 يمني. جميع الحقوق محفوظة.',
                follow: 'تابع رحلتنا'
            }
        };
        return translations[locale]?.[key] || translations['en'][key];
    };

    return (
        <footer className={`relative bg-black pt-20 pb-10 border-t border-saffron/20 overflow-hidden ${isArabic ? 'rtl font-almarai' : 'ltr font-playfair'}`}>
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 border border-saffron rounded-full flex items-center justify-center p-2">
                                <span className="text-saffron font-bold text-xl">Y</span>
                            </div>
                            <h2 className="text-2xl font-bold tracking-widest text-white">YEMENI</h2>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            {t('tagline')}
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, color: '#D4AF37' }}
                                    className="p-3 border border-white/10 rounded-full text-white/40 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-saffron text-[10px] uppercase tracking-[0.3em] font-bold">{t('contact')}</h3>
                            <ul className="space-y-4 text-sm text-white/40">
                                <li className="flex items-center gap-3">
                                    <Phone size={14} className="text-saffron/60" />
                                    <span>+33 1 23 45 67 89</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={14} className="text-saffron/60" />
                                    <span>contact@yemeni-paris.com</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-saffron text-[10px] uppercase tracking-[0.3em] font-bold">{t('location')}</h3>
                            <ul className="space-y-4 text-sm text-white/40">
                                <li className="flex items-start gap-3">
                                    <MapPin size={14} className="text-saffron/60 mt-1 shrink-0" />
                                    <span className="leading-relaxed">{t('address')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Hours & Map Link */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex items-center gap-3 text-saffron">
                                <Clock size={16} />
                                <span className="text-xs uppercase tracking-widest font-bold">Business Hours</span>
                            </div>
                            <p className="text-sm text-white/70">
                                {t('hours')}
                            </p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                className="block w-full py-3 text-center border border-saffron/40 text-saffron text-xs uppercase tracking-widest hover:bg-saffron hover:text-black transition-all duration-500 rounded-lg mt-4"
                            >
                                Open in Maps
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-white/30 tracking-widest uppercase">
                        {t('rights')}
                    </p>
                    <div className="flex gap-8 text-[10px] text-white/30 tracking-widest uppercase">
                        <a href="#" className="hover:text-saffron transition-colors">Privacy</a>
                        <a href="#" className="hover:text-saffron transition-colors">Terms</a>
                        <a href="#" className="hover:text-saffron transition-colors">Cookies</a>
                    </div>
                </div>
            </div>

            {/* Aesthetic Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
}
