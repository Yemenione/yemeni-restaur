'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YemeniIntro() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        // Check if user has already seen the intro this session
        const hasSeenIntro = sessionStorage.getItem('yemeni_intro_seen');
        if (!hasSeenIntro) {
            setIsVisible(true);
            // Start opening after 1.5 seconds
            const timer = setTimeout(() => {
                setIsOpening(true);
                // Hide completely after animation finishes (approx 3s)
                const hideTimer = setTimeout(() => {
                    setIsVisible(false);
                    sessionStorage.setItem('yemeni_intro_seen', 'true');
                }, 3000);
                return () => clearTimeout(hideTimer);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center overflow-hidden"
                >
                    {/* Background Wall / Texture */}
                    <div className="absolute inset-0 bg-stone-900/50" />

                    {/* Window Container */}
                    <motion.div
                        animate={{
                            scale: isOpening ? 3 : 1,
                            opacity: isOpening ? 0 : 1
                        }}
                        transition={{ duration: 3, ease: [0.7, 0, 0.3, 1] }}
                        className="relative w-[300px] h-[450px] md:w-[450px] md:h-[650px] preserve-3d"
                    >
                        {/* Upper Qamariya (Stained Glass) */}
                        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden rounded-t-full border-t-8 border-x-8 border-amber-950/80">
                            <div
                                className="w-full h-full bg-cover bg-top"
                                style={{ backgroundImage: "url('/images/qamariya.png')", backgroundSize: '100% 300%' }}
                            />
                        </div>

                        {/* Wings / Shutters */}
                        <div className="absolute bottom-0 left-0 w-full h-2/3 flex preserve-3d">

                            {/* Left Wing */}
                            <motion.div
                                animate={{ rotateY: isOpening ? -120 : 0 }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                className="w-1/2 h-full origin-left preserve-3d border-y-8 border-l-8 border-amber-950/80 shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
                                style={{
                                    backgroundImage: "url('/images/qamariya.png')",
                                    backgroundSize: '200% 150%',
                                    backgroundPosition: 'left bottom'
                                }}
                            />

                            {/* Right Wing */}
                            <motion.div
                                animate={{ rotateY: isOpening ? 120 : 0 }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                className="w-1/2 h-full origin-right preserve-3d border-y-8 border-r-8 border-amber-950/80 shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
                                style={{
                                    backgroundImage: "url('/images/qamariya.png')",
                                    backgroundSize: '200% 150%',
                                    backgroundPosition: 'right bottom'
                                }}
                            />

                        </div>

                        {/* Light Rays effect when opening */}
                        <AnimatePresence>
                            {isOpening && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    className="absolute inset-0 bg-gradient-to-b from-saffron/40 to-transparent blur-3xl"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Intro Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
                        className="absolute bottom-12 text-center z-10"
                    >
                        <h2 className="text-saffron font-playfair italic text-2xl tracking-[0.3em] mb-4 uppercase">Ahlan wa Sahlan</h2>
                        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-saffron/50 to-transparent mx-auto" />
                        <p className="text-white/40 font-cairo text-xs mt-4 tracking-tighter">THE STONE POT EXPERIENCE</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
