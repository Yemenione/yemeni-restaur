import { useTranslations } from '@/hooks/useTranslations';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function OurStory() {
  const t = useTranslations('Story');
  const containerRef = useRef<HTMLDivElement>(null);
  const { props } = usePage<{ settings: Record<string, string> }>();
  const settings = props.settings || {};

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother parallax with spring
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Spice parallax values - Top to Bottom "Falling" effect as requested
  const ySaffron = useTransform(springScroll, [0, 1], [-200, 600]);
  const yAnise = useTransform(springScroll, [0, 1], [-300, 800]);
  const yCardamom = useTransform(springScroll, [0, 1], [-150, 400]);
  const yRice = useTransform(springScroll, [0, 1], [-400, 1000]);

  const rotateSaffron = useTransform(springScroll, [0, 1], [0, 180]);
  const rotateAnise = useTransform(springScroll, [0, 1], [0, -90]);
  const rotateCardamom = useTransform(springScroll, [0, 1], [0, 45]);
  const rotateRice = useTransform(springScroll, [0, 1], [0, 360]);

  // Default images if not set in admin
  const img1 = settings.story_img_heritage_1 || '/images/fahsa.png';
  const img2 = settings.story_img_heritage_2 || '/images/mandi.png';
  const img3 = settings.story_img_heritage_3 || '/images/saltah.png';

  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';

  return (
    <section ref={containerRef} className="relative bg-charcoal py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">

      {/* Dynamic Floating Spices & Rice */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Saffron */}
        <motion.img
          src="/images/spice_saffron.png"
          alt="Saffron"
          style={{ y: ySaffron, rotate: rotateSaffron }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[8%] w-40 md:w-56 opacity-15 mix-blend-lighten blur-[1px]"
        />

        {/* Cardamom (Heel) */}
        <motion.img
          src="/images/spice_cardamom.png"
          alt="Cardamom (Heel)"
          style={{ y: yCardamom, rotate: rotateCardamom }}
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] w-24 md:w-32 opacity-20 mix-blend-lighten"
        />

        {/* Rice Grains */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              y: useTransform(springScroll, [0, 1], [500 + i * 50, -400 - i * 50]),
              rotate: rotateRice,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15, x: [0, 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
            className="absolute p-px bg-white rounded-full w-1 h-3 blur-[0.5px]"
          />
        ))}

        {/* Star Anise */}
        <motion.img
          src="/images/spice_anise.png"
          alt="Star Anise"
          style={{ y: yAnise, rotate: rotateAnise }}
          className="absolute bottom-[10%] right-[15%] w-32 md:w-48 opacity-10 mix-blend-lighten grayscale brightness-150"
        />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center ${isArabic ? 'rtl' : 'ltr'}`}>
        {/* Magazine Grid Images - Authentic Content */}
        <div className="md:col-span-6 grid grid-cols-2 gap-6 h-[700px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden group col-span-1 row-span-2 rounded-2xl border border-white/10 shadow-3xl"
          >
            <img
              src={img1}
              alt="Authentic Yemeni Dish"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6">
              <span className="text-saffron text-[10px] tracking-[0.3em] uppercase font-bold">Tradition</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative overflow-hidden group col-span-1 rounded-2xl border border-white/10 shadow-2xl"
          >
            <img
              src={img2}
              alt="Yemeni Specialty"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-saffron/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative overflow-hidden group col-span-1 border-t-4 border-saffron rounded-2xl shadow-xl bg-charcoal/50 backdrop-blur-sm"
          >
            <img
              src={img3}
              alt="Atmospheric Yemeni Dining"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-charcoal/20" />
          </motion.div>
        </div>

        {/* Story Text - Luxury Typography */}
        <div className={`md:col-span-6 space-y-10 ${isArabic ? 'font-almarai' : 'font-playfair'}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-saffron font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase border-b border-saffron/30 pb-2">
              {t('label')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white leading-[0.9] tracking-tight"
          >
            {t('title')} <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-saffron">
              {t('subtitle')}
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-saffron/50"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg"
          >
            {t('description')}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-transparent border border-saffron/40 text-saffron px-10 py-4 font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:border-saffron"
          >
            <span className="relative z-10 transition-colors group-hover:text-charcoal">{t('read_more') || 'READ FULL STORY'}</span>
            <div className="absolute inset-0 bg-saffron transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
