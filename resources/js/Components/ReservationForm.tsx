'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const reservationSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  date: z.string().min(1, { message: 'Date is required' }),
  guests: z.number().min(1).max(20),
  message: z.string().optional(),
});

type ReservationData = z.infer<typeof reservationSchema>;

export default function ReservationForm() {
  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';
  const t = useTranslations('Reservation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-charcoal min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl w-full bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row min-h-[700px]">

        {/* Left Side: Visual/Lifestyle */}
        <div className="md:w-1/2 relative hidden md:block group">
          <img
            src="/images/reservation-lifestyle.png"
            alt="Luxury Yemeni Dining"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 flex flex-col space-y-4">
            <span className="text-saffron tracking-[0.3em] text-xs uppercase font-cairo">The Art of Hospitality</span>
            <h3 className="text-4xl text-white font-playfair leading-tight">Yemeni Tradition<br /><span className="italic text-saffron">Refined.</span></h3>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-charcoal/50">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-12">
                  <h2 className="text-4xl lg:text-5xl font-playfair text-white mb-4">
                    {t('title')}
                  </h2>
                  <p className="text-white/60 font-cairo text-lg max-w-sm">
                    {t('subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-cairo">
                  {/* Name Input */}
                  <div className="group relative">
                    <div className={`${isArabic ? 'right-0' : 'left-0'} absolute bottom-3 text-white/40 group-focus-within:text-saffron transition-colors`}>
                      <User size={18} />
                    </div>
                    <input
                      {...register('name')}
                      placeholder={t('labelName')}
                      className={`w-full bg-transparent border-b border-white/10 py-3 ${isArabic ? 'pr-8' : 'pl-8'} text-white outline-none focus:border-saffron transition-all placeholder:text-white/20`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="group relative">
                    <div className={`${isArabic ? 'right-0' : 'left-0'} absolute bottom-3 text-white/40 group-focus-within:text-saffron transition-colors`}>
                      <Mail size={18} />
                    </div>
                    <input
                      {...register('email')}
                      placeholder={t('labelEmail')}
                      className={`w-full bg-transparent border-b border-white/10 py-3 ${isArabic ? 'pr-8' : 'pl-8'} text-white outline-none focus:border-saffron transition-all placeholder:text-white/20`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Date Input */}
                    <div className="group relative">
                      <div className={`${isArabic ? 'right-0' : 'left-0'} absolute bottom-3 text-white/40 group-focus-within:text-saffron transition-colors`}>
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        {...register('date')}
                        className={`w-full bg-transparent border-b border-white/10 py-3 ${isArabic ? 'pr-8' : 'pl-8'} text-white outline-none focus:border-saffron transition-all placeholder:text-white/20 [color-scheme:dark]`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>

                    {/* Guests Input */}
                    <div className="group relative">
                      <div className={`${isArabic ? 'right-0' : 'left-0'} absolute bottom-3 text-white/40 group-focus-within:text-saffron transition-colors`}>
                        <Users size={18} />
                      </div>
                      <input
                        type="number"
                        {...register('guests', { valueAsNumber: true })}
                        placeholder={t('labelGuests')}
                        className={`w-full bg-transparent border-b border-white/10 py-3 ${isArabic ? 'pr-8' : 'pl-8'} text-white outline-none focus:border-saffron transition-all placeholder:text-white/20`}
                      />
                      {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="group relative">
                    <div className={`${isArabic ? 'right-0' : 'left-0'} absolute bottom-3 text-white/40 group-focus-within:text-saffron transition-colors`}>
                      <MessageSquare size={18} />
                    </div>
                    <input
                      {...register('message')}
                      placeholder={t('labelMessage')}
                      className={`w-full bg-transparent border-b border-white/10 py-3 ${isArabic ? 'pr-8' : 'pl-8'} text-white outline-none focus:border-saffron transition-all placeholder:text-white/20`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full mt-10 overflow-hidden group py-4 bg-saffron text-charcoal font-bold tracking-[0.2em] uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      {isSubmitting ? '...' : t('submit')}
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-charcoal transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={48} className="text-saffron" />
                </div>
                <h3 className="text-3xl font-playfair text-white">
                  {t('successTitle')}
                </h3>
                <p className="text-white/60 font-cairo text-lg max-w-sm">
                  {t('successMessage')}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-saffron border-b border-saffron/30 pb-1 mt-8 hover:border-saffron transition-all font-cairo"
                >
                  Make another reservation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
