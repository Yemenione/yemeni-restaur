import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function FahsaScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { locale } = usePage<{ locale: string }>().props;
    const isArabic = locale === 'ar';
    const headingFont = isArabic ? 'font-cairo' : 'font-playfair';

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Meat Chunks falling into the pot (landing at 80vh-90vh where the pot sits)
    const meat1Y = useTransform(scrollYProgress, [0, 0.7], ['-100vh', '85vh']);
    const meat1Rotate = useTransform(scrollYProgress, [0, 0.7], [0, 180]);
    const meat1Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.75], [1, 1, 0]);

    const meat2Y = useTransform(scrollYProgress, [0.1, 0.8], ['-120vh', '85vh']);
    const meat2Rotate = useTransform(scrollYProgress, [0.1, 0.8], [-45, 90]);
    const meat2Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.85], [1, 1, 0]);

    // Steam rising out of the pot (starts at 85vh)
    const steamY = useTransform(scrollYProgress, [0.3, 0.9], ['80vh', '-30vh']);
    const steamScale = useTransform(scrollYProgress, [0.3, 0.9], [1, 2.5]);
    const steamOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 0.7, 0]);

    // Parallax text smoothly fades out to reveal the pot
    const textY = useTransform(scrollYProgress, [0, 0.6], ['0vh', '-30vh']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[200vh] bg-charcoal"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Background Pot Image (Side View placed at bottom) */}
                <div className="absolute bottom-[-5%] md:bottom-[-15%] inset-x-0 z-0 flex items-end justify-center opacity-80 pointer-events-none">
                    <img
                        src="/images/fahsa-side.png"
                        alt="Fahsa Pot"
                        className="w-[120vw] md:w-[70vw] max-w-5xl object-contain drop-shadow-2xl"
                    />
                </div>

                {/* The Centerpiece Text */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-20 text-center px-4 max-w-4xl mx-auto"
                >
                    <h2 className={`text-6xl md:text-8xl text-saffron tracking-tighter mb-6 ${headingFont} uppercase`}>
                        {isArabic ? 'سر الفحسة' : 'The Secret of Fahsa'}
                    </h2>
                    <p className="text-white/60 text-xl md:text-2xl font-cairo tracking-widest leading-relaxed text-balance">
                        {isArabic
                            ? 'تُطهى ببطء في المقلى الحجري لساعات، لحم بقري مدخن يُذاب في الفم مع المرق الغني بالبهارات.'
                            : 'Slow-cooked in a stone magla for hours, smoked pulled beef melting into a rich, heavily spiced broth.'}
                    </p>
                </motion.div>

                {/* Falling Meat Chunks */}
                <motion.img
                    src="/images/meat_1.png"
                    alt="Slow cooked meat"
                    style={{ y: meat1Y, rotate: meat1Rotate, opacity: meat1Opacity }}
                    className="absolute z-10 w-48 md:w-64 left-[20%] md:left-[35%] top-[10%] mix-blend-screen"
                />

                <motion.img
                    src="/images/meat_2.png"
                    alt="Shredded beef"
                    style={{ y: meat2Y, rotate: meat2Rotate, opacity: meat2Opacity }}
                    className="absolute z-10 w-32 md:w-48 right-[15%] md:right-[30%] top-[0%] mix-blend-screen"
                />

                {/* Rising Steam */}
                <motion.img
                    src="/images/steam.png"
                    alt="Steam"
                    style={{ y: steamY, scale: steamScale, opacity: steamOpacity }}
                    className="absolute z-30 w-full h-full object-cover mix-blend-screen pointer-events-none"
                />

                {/* Vignette Overlay for Luxury Feel */}
                <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] pointer-events-none" />
            </div>
        </section>
    );
}
