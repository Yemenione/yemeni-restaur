'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { usePage } from '@inertiajs/react';

export default function StonePotMenu() {
  const t = useTranslations('Menu');

  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';

  const [activeCategory, setActiveCategory] = useState('main');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeDish, setActiveDish] = useState<any>(null);
  const potRef = useRef<HTMLDivElement>(null);

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((cat: any) => ({
            id: cat.slug,
            label: isArabic ? cat.name_ar : cat.name_en
          }));
          setCategories(mapped);
        } else {
          setCategories([
            { id: 'main', label: t('catMain') },
            { id: 'starters', label: t('catStarters') },
            { id: 'desserts', label: t('catDesserts') },
            { id: 'drinks', label: t('catDrinks') },
          ]);
        }
      });
  }, [locale]);

  // Fetch items from DB
  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((item: any) => ({
            id: item.id,
            name: isArabic ? item.title_ar : item.title_en,
            description: isArabic ? item.description_ar : item.description_en,
            price: item.price,
            category: item.category,
            image: item.image_url || '/images/saltah.png'
          }));
          setMenuItems(mapped);

          const firstMain = mapped.find((i: any) => i.category === 'main');
          if (firstMain) setActiveDish(firstMain);
          else if (mapped.length > 0) setActiveDish(mapped[0]);
        } else {
          const staticItems = [
            { id: 1, name: t('saltahName'), category: 'main', price: '24€', description: t('saltahDesc'), image: '/images/saltah.png' },
            { id: 2, name: t('fahsaName'), category: 'main', price: '26€', description: t('fahsaDesc'), image: '/images/fahsa.png' },
            { id: 3, name: t('mandiName'), category: 'main', price: '32€', description: t('mandiDesc'), image: '/images/mandi.png' },
          ];
          setMenuItems(staticItems);
          setActiveDish(staticItems[0]);
        }
      })
      .catch(err => console.error("Failed to fetch menu:", err));
  }, [locale]);

  const filteredItems = menuItems.filter((item: any) => item.category === activeCategory);

  // Auto-cycle dishes within the active category
  useEffect(() => {
    if (filteredItems.length === 0) return;
    const interval = setInterval(() => {
      setActiveDish((prev: any) => {
        if (!prev) return filteredItems[0];
        const currentIndex = filteredItems.findIndex(item => item.id === prev.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        return filteredItems[nextIndex];
      });
    }, 6000); // Slightly slower for elegance
    return () => clearInterval(interval);
  }, [activeCategory, filteredItems]);

  // Breathing animation for the Stone Pot container
  useEffect(() => {
    if (!potRef.current) return;
    gsap.to(potRef.current, {
      scale: 1.02,
      filter: "brightness(1.1) drop-shadow(0 0 50px rgba(212,175,55,0.15))",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="bg-charcoal py-32 px-6 min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-playfair text-white/[0.02] whitespace-nowrap pointer-events-none uppercase">
        Signature Taste
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-saffron tracking-[0.5em] text-xs uppercase font-cairo">Culinary Excellence</span>
          <h2 className="text-5xl md:text-7xl font-playfair text-white uppercase tracking-tighter">
            {t('title')}
          </h2>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const firstOfCat = menuItems.find(item => item.category === cat.id);
                if (firstOfCat) setActiveDish(firstOfCat);
              }}
              className={`relative px-8 py-3 font-cairo text-sm uppercase tracking-widest transition-all duration-500 overflow-hidden ${activeCategory === cat.id ? 'text-saffron' : 'text-white/40 hover:text-white/80'}`}
            >
              <span className="relative z-10">{cat.label}</span>
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-saffron"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Column: The Stone Pot Slideshow */}
          <div className="flex justify-center order-2 lg:order-1">
            <div ref={potRef} className="relative w-[320px] h-[320px] md:w-[520px] md:h-[520px]">
              {/* Outer Stone Ring */}
              <div className="absolute inset-0 rounded-full border-[15px] md:border-[25px] border-[#1A1A1A] shadow-[inset_0_0_60px_rgba(0,0,0,1),0_0_80px_rgba(212,175,55,0.15)] overflow-hidden bg-black z-10">
                <AnimatePresence mode="wait">
                  {activeDish && (
                    <motion.div
                      key={activeDish.id}
                      initial={{ opacity: 0, scale: 1.2, rotate: 15, filter: 'blur(10px) brightness(2)' }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px) brightness(1)' }}
                      exit={{ opacity: 0, scale: 0.8, rotate: -15, filter: 'blur(10px) brightness(0.5)' }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={activeDish.image}
                        alt={activeDish.name}
                        className="w-full h-full object-cover opacity-90 brightness-110 contrast-110"
                      />
                      {/* Inner Smoke/Steam Overlay (Subtle) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Heat Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-saffron/10 via-transparent to-transparent pointer-events-none mix-blend-color-dodge opacity-50" />
              </div>

              {/* Pulsing Atmosphere Glow */}
              <div className="absolute -inset-10 bg-saffron/5 blur-[100px] rounded-full animate-pulse-slow pointer-events-none" />
              <div className="absolute inset-0 rounded-full shadow-[0_0_100px_rgba(212,175,55,0.1)] pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Active Dish Info & List */}
          <div className="order-1 lg:order-2 space-y-12">
            <div className="h-[250px] relative">
              <AnimatePresence mode="wait">
                {activeDish && (
                  <motion.div
                    key={activeDish.id}
                    initial={{ opacity: 0, x: isArabic ? -40 : 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: isArabic ? 40 : -40, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className={`flex items-center justify-between border-b border-saffron/20 pb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <h3 className="text-4xl md:text-5xl lg:text-7xl text-white font-playfair font-bold tracking-tight">
                        {activeDish.name}
                      </h3>
                      <span className="text-saffron text-2xl md:text-3xl font-playfair font-bold">{activeDish.price}</span>
                    </div>
                    <p className={`text-white/60 text-lg md:text-xl font-cairo leading-relaxed max-w-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                      {activeDish.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Manual Selection List */}
            <div className={`flex flex-wrap gap-4 pt-10 ${isArabic ? 'flex-row-reverse' : ''}`}>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveDish(item)}
                  className={`px-8 py-3 border rounded-xl text-xs font-cairo uppercase tracking-widest transition-all duration-500 ${activeDish?.id === item.id
                    ? 'bg-saffron text-charcoal border-saffron shadow-[0_10px_30px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-white/5 text-white/40 border-white/5 hover:border-saffron/40 hover:bg-white/10'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
