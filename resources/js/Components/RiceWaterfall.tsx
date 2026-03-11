'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192; // Extracted via ffmpeg

export default function RiceWaterfall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { locale } = usePage<{ locale: string }>().props;
  const isArabic = locale === 'ar';
  const headingFont = isArabic ? 'font-cairo' : 'font-playfair';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Load sequence
    const currentFrame = (index: number) => (
      `/images/mandi-frames/frame_${index.toString().padStart(4, '0')}.jpg`
    );

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

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
      animation: (tween = gsap.to(airpods, {
        frame: frameCount - 1, // Stop right at the end
        snap: 'frame',
        ease: 'none',
        onUpdate: () => {
          if (images[airpods.frame]) {
            context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
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

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4 pointer-events-none">
        <h2 className={`text-5xl md:text-8xl text-saffron mb-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] ${headingFont}`}>
          {isArabic ? 'صناعة المندي' : 'The Making of Mandi'}
        </h2>
        <p className="text-xl md:text-3xl text-white max-w-3xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] font-cairo">
          {isArabic
            ? 'فن الطهي اليمني الأصيل، حيث تتساقط حبات الأرز المزعفرة بامتياز.'
            : 'The art of authentic Yemeni cooking, where saffron rice falls with perfection.'}
        </p>
      </div>
    </div>
  );
}
