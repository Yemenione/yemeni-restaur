import { Head, usePage } from '@inertiajs/react';
import ReservationForm from '@/Components/ReservationForm';

export default function Reservation() {
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';

    return (
        <>
            <Head>
                <title>{isArabic ? 'احجز طاولتك - كرم الضيافة اليمنى' : 'Book Your Table - Yemeni Hospitality'}</title>
                <meta name="description" content={isArabic ? 'احجز طاولتك الآن لتجربة طعام يمنية أصيلة في قلب باريس. مثالي للعائلات والمجموعات.' : 'Book your table now for an authentic Yemeni dining experience in the heart of Paris. Perfect for families and groups.'} />
            </Head>
            <div className="pt-20">
                <ReservationForm />
            </div>
        </>
    );
}
