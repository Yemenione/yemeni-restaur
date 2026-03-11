'use client';

import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isArabic ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { label: isArabic ? 'المنيو' : 'Menu', href: `/${locale}/menu` },
    { label: isArabic ? 'قصتنا' : 'Story', href: `/${locale}/story` },
  ];

  const renderLogo = () => {
    const isImage = settings.logo_type === 'image' || settings.logo_type === 'both';
    const isText = settings.logo_type === 'text' || settings.logo_type === 'both' || !settings.logo_type;
    const siteName = settings.site_name || 'YEMENI';

    return (
      <Link href={`/${locale}`} className="relative group flex flex-col items-center">
        {isImage && settings.logo_image && (
          <motion.img
            src={settings.logo_image}
            alt="Logo"
            animate={{ height: isScrolled ? 36 : 56 }}
            className="object-contain transition-all duration-700"
          />
        )}
        {isText && (
          <motion.span
            animate={{ fontSize: isScrolled ? '1.2rem' : '1.8rem' }}
            className="font-playfair font-bold text-white tracking-[0.2em] uppercase transition-all duration-700"
          >
            {siteName}
          </motion.span>
        )}
        <div className="absolute -inset-4 bg-saffron/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out px-4 md:px-12 ${isScrolled ? 'pt-4' : 'pt-8'
        }`}>
        <div className={`mx-auto transition-all duration-700 ease-in-out relative flex items-center justify-between ${isScrolled
          ? 'max-w-[1000px] bg-charcoal/40 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
          : 'max-w-[1400px] bg-transparent border-b border-white/5 py-4 px-4'
          }`}>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white/70 hover:text-saffron transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Left Nav (Desktop) */}
          <div className="hidden lg:flex items-center justify-start gap-10 w-1/3">
            {navLinks.slice(0, 2).map((link) => (
              <Magnetic key={`nav-left-${link.href}`}>
                <Link
                  href={link.href}
                  className="text-[11px] font-cairo text-white/50 hover:text-saffron uppercase tracking-[0.2em] transition-all duration-300 hover:tracking-[0.3em]"
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </div>

          {/* Logo (Centered) */}
          <div className="flex-shrink-0 flex items-center">
            <Magnetic>
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                {settings?.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert" />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-saffron rounded-full">
                    <span className="text-charcoal font-playfair font-bold text-xl">Y</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-playfair font-bold text-lg md:text-xl tracking-tighter leading-none group-hover:text-saffron transition-colors">
                    YEMENI
                  </span>
                  <span className="text-saffron text-[8px] md:text-[10px] font-cairo tracking-[0.3em] font-medium leading-none mt-1">
                    PARIS
                  </span>
                </div>
              </Link>
            </Magnetic>
          </div>

          {/* Right Nav (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-10 w-1/3">
            {navLinks.slice(2).map((link) => (
              <Magnetic key={`nav-right-${link.href}`}>
                <Link
                  href={link.href}
                  className="text-[11px] font-cairo text-white/50 hover:text-saffron uppercase tracking-[0.2em] transition-all duration-300 hover:tracking-[0.3em]"
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}

            <div className={`flex items-center gap-6 ${isArabic ? 'pr-6 border-r border-white/10' : 'pl-6 border-l border-white/10'}`}>
              <LanguageSwitcher />
              <Magnetic>
                <Link
                  href={`/${locale}/reservation`}
                  className={`relative group overflow-hidden px-6 py-2 border border-saffron/30 rounded-full font-medium text-[9px] tracking-[0.2em] uppercase transition-all duration-500 hover:border-saffron ${isScrolled ? 'bg-saffron text-charcoal' : 'bg-transparent text-saffron'
                    }`}
                >
                  <span className="relative z-10">{isArabic ? 'الحجز' : 'RESERVE'}</span>
                  {!isScrolled && (
                    <div className={`absolute inset-0 h-full w-full bg-saffron transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 z-0 ${isArabic ? 'origin-left' : 'origin-right'}`} />
                  )}
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Mobile Right Spacer */}
          <div className="lg:hidden w-6" />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-12"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-12 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-playfair font-bold text-white hover:text-saffron transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-12 border-t border-white/10 w-full flex flex-col items-center gap-8">
                <LanguageSwitcher />
                <Link
                  href={`/${locale}/reservation`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-saffron text-charcoal px-12 py-4 rounded-full font-bold uppercase tracking-widest"
                >
                  {isArabic ? 'احجز الآن' : 'BOOK NOW'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
