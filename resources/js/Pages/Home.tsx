import OurStory from '@/Components/OurStory';
import RiceWaterfall from '@/Components/RiceWaterfall';
import FahsaVideoScroll from '@/Components/FahsaVideoScroll';
import StonePotMenu from '@/Components/StonePotMenu';
import ReservationForm from '@/Components/ReservationForm';
import { Head, usePage } from '@inertiajs/react';

export default function Home() {
  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';

  return (
    <>
      <Head>
        <title>{isArabic ? 'مطعم يمني باريس - تجربة طعام ملكية فاخرة' : 'Yemeni Restaurant Paris - Luxury Authentic Dining'}</title>
        <meta name="description" content={isArabic
          ? 'اكتشف عراقة المطبخ اليمني في قلب باريس. مندي أصيل، فحسة، وسلتة في أجواء ملكية فاخرة.'
          : 'Discover the heritage of Yemeni cuisine in the heart of Paris. Authentic Mandi, Fahsa, and Saltah in a royal luxury atmosphere.'}
        />
        <meta name="keywords" content={isArabic
          ? 'منـدي، حنيذ، فحسة، سلتة، مطعم يمني، مطعم عربي باريس، مطعم خليجي، أكل حلال، عشاء فاخر باريس، أفضل مطعم يمني، تجربة سياحية باريس، أماكن للزيارة باريس، مطعم للعائلات باريس'
          : 'Mandi, Haneeth, Fahsa, Saltah, Yemeni Restaurant Paris, Arabic Food Paris, Gulf Cuisine, Halal Food Paris, Luxury Dining, Best Yemeni Restaurant, Paris Tourist Attraction, Top things to do in Paris, Fine dining for travelers, Authentic cultural experience Paris, Family friendly restaurant Paris, Instagrammable Paris dining'}
        />
      </Head>

      {/* New Fahsa Video Scroll at the very top */}
      <FahsaVideoScroll />
      <OurStory />
      <RiceWaterfall />
      <StonePotMenu />
      <ReservationForm />
    </>
  );
}
