import { Head, usePage } from '@inertiajs/react';
import StonePotMenu from '@/Components/StonePotMenu';

export default function Menu() {
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';

    return (
        <>
            <Head>
                <title>{isArabic ? 'قائمة الطعام - تجربة المقلى الحجري' : 'Our Menu - The Magla Experience'}</title>
                <meta name="description" content={isArabic
                    ? 'اكتشف أشهر الأطباق اليمنية: مندي، حنيذ، فحسة، وسلتة. قائمة متنوعة من المبدعات الحجرية.'
                    : 'Explore the most famous Yemeni dishes: Mandi, Haneeth, Fahsa, and Saltah. A diverse menu of stone pot creations.'}
                />
                <meta name="keywords" content={isArabic
                    ? 'قائمة الطعام، مندي لحم، مندي دجاج، فحسة، سلتة، مقلى حجري، حلويات يمنية، مشروبات، أكل شعبي يمني'
                    : 'Menu, Lamb Mandi, Chicken Mandi, Fahsa, Saltah, Stone Pot, Yemeni Desserts, Drinks, Traditional Yemeni Food'}
                />
            </Head>
            <div className="pt-20">
                <StonePotMenu />
            </div>
        </>
    );
}
