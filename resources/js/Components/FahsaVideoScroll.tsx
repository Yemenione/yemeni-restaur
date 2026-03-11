'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192; // Extracted via ffmpeg (8 seconds at 24fps)

const AromaParticles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: "-10%",
                        opacity: [0, 0.4, 0],
                        x: (Math.random() * 100 + (Math.sin(i) * 10)) + "%",
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear",
                    }}
                    className="absolute w-2 h-2 bg-saffron/20 rounded-full blur-xl"
                />
            ))}
        </div>
    );
};

export default function FahsaVideoScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';
    const headingFont = isArabic ? 'font-amiri' : 'font-playfair';

    // Royal Arabic Title
    const arabicTitle = "مطعم يمني";
    const arabicWords = arabicTitle.split(" ");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Load sequence from the new fahsa-frames directory
        const currentFrame = (index: number) => (
            `/images/fahsa-frames/frame_${index.toString().padStart(4, '0')}.jpg`
        );

        const images: HTMLImageElement[] = [];
        const scrollObj = { frame: 0 };

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        // Draw first frame when loaded
        images[0].onload = () => {
            context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
        };

        let trigger: ScrollTrigger;
        let tween: gsap.core.Tween;

        trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%', // Lots of breathing room for scrubbing
            pin: true,
            animation: (tween = gsap.to(scrollObj, {
                frame: frameCount - 1, // Stop right at the end
                snap: 'frame',
                ease: 'none',
                onUpdate: () => {
                    if (images[scrollObj.frame]) {
                        context.drawImage(images[scrollObj.frame], 0, 0, canvas.width, canvas.height);
                    }
                }
            })),
            scrub: 0.5,
        });

        return () => {
            trigger.kill();
            tween.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen bg-charcoal w-full overflow-hidden">
            <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent opacity-95 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <AromaParticles />

            <div className={`relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 pointer-events-none ${isArabic ? 'rtl' : 'ltr'}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        animate={{ opacity: 1, letterSpacing: "0.3em" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-saffron text-[10px] md:text-xs uppercase mb-12 font-almarai drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] border-x border-saffron/30 px-6 py-1"
                    >
                        {isArabic ? 'تجربة ملكية أصيلة' : 'An Authentic Royal Experience'}
                    </motion.span>

                    <h1 className={`relative flex flex-col items-center text-5xl md:text-7xl lg:text-[8rem] text-white tracking-tighter leading-tight mb-10 ${headingFont}`}>
                        {isArabic ? (
                            <div className="flex gap-4 overflow-hidden pb-4">
                                {arabicWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: "100%", opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.8 + i * 0.2,
                                            ease: [0.215, 0.61, 0.355, 1]
                                        }}
                                        className="inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="flex overflow-hidden pb-2">
                                    {"YEMENI".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.8 + i * 0.05,
                                                ease: [0.215, 0.61, 0.355, 1]
                                            }}
                                            className="inline-block origin-bottom"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex overflow-hidden mt-[-0.1em]">
                                    {"RESTAURANT".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: 1.2 + i * 0.05,
                                                ease: [0.215, 0.61, 0.355, 1]
                                            }}
                                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-saffron drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                            </>
                        )}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, delay: 2.5 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-saffron/5 blur-2xl rounded-full" />
                        <p className="relative z-10 text-white/40 text-sm md:text-lg font-light max-w-xl italic font-cairo tracking-wide">
                            {isArabic
                                ? '« رحلة حسية عبر عراقة التاريخ، نجمع فيها كرم الضيافة اليمنية بأناقة باريس »'
                                : '“ A sensory journey through the mists of history, where Yemeni hospitality meets Parisian elegance. ”'}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Discovery UI */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 1 }}
                    className="absolute bottom-16 flex flex-col items-center group cursor-pointer"
                >
                    <span className="text-saffron/40 text-[9px] tracking-[0.4em] uppercase mb-4 font-cairo group-hover:text-saffron transition-colors duration-500">
                        {isArabic ? 'استكشف الفخامة' : 'Explore the Luxury'}
                    </span>
                    <div className="relative w-[1px] h-20 bg-white/10 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-saffron to-transparent"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
