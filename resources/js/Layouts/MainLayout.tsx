import React, { PropsWithChildren, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import YemeniIntro from '@/Components/YemeniIntro';
import { usePage } from '@inertiajs/react';

export default function MainLayout({ children }: PropsWithChildren) {
    const { locale } = usePage<{ locale: string }>().props;
    const isRTL = locale === 'ar';

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }, [locale, isRTL]);

    return (
        <div
            className="min-h-screen bg-charcoal text-white font-almarai selection:bg-saffron/30 selection:text-saffron"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <YemeniIntro />
            <Navbar />
            <main className="relative w-full overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
}
