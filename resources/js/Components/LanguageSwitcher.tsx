'use client';

import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale } = usePage<{ locale: string }>().props;

  const locales = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'ar', name: 'AR' },
  ];

  const toggleLanguage = (code: string) => {
    if (code === locale) return;
    window.location.href = `/${code}`;
  };

  return (
    <div className="flex items-center gap-4">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => toggleLanguage(loc.code)}
          className={`relative text-[10px] font-cairo tracking-widest transition-all duration-300 ${locale === loc.code
              ? 'text-saffron font-bold'
              : 'text-white/30 hover:text-white/60'
            }`}
        >
          {loc.name}
          {locale === loc.code && (
            <motion.div
              layoutId="activeLocale"
              className="absolute -bottom-1 left-0 right-0 h-[1px] bg-saffron"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
