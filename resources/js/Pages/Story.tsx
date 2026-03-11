import { Head, usePage } from '@inertiajs/react';
import OurStory from '@/Components/OurStory';
import RiceWaterfall from '@/Components/RiceWaterfall';

export default function Story() {
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';

    return (
        <>
            <Head>
                <title>{isArabic ? 'قصتنا - من جبال اليمن إلى قلب باريس' : 'Our Story - From Yemen to Paris'}</title>
                <meta name="description" content={isArabic
                    ? 'اكتشف حكاية مطعمنا، من جبال اليمن الشامخة إلى أرقى شوارع باريس. قصة شغف وتراث طهوي أصيل.'
                    : 'Discover the story of our restaurant, from the majestic mountains of Yemen to the finest streets of Paris. A story of passion and authentic culinary heritage.'}
                />
                <meta name="keywords" content={isArabic
                    ? 'قصتنا، تاريخ اليمن، تراث يمني، ثقافة عربية، مطعم يمني أصيل، حكاية شغف، باريس'
                    : 'Our Story, History of Yemen, Yemeni Heritage, Arabic Culture, Authentic Yemeni Restaurant, Passion Story, Paris'}
                />
            </Head>
            <div className="pt-20">
                <OurStory />
                <RiceWaterfall />
            </div>
        </>
    );
}
