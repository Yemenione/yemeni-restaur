'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio ref={audioRef} loop>
        <source src="/ambient-oud.mp3" type="audio/mpeg" />
      </audio>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="flex items-center gap-3 bg-charcoal/80 backdrop-blur border border-saffron/30 px-4 py-2 rounded-full text-saffron"
      >
        <span className="text-xs font-cairo tracking-widest uppercase">
          {isPlaying ? 'Mute' : 'Experience Sound'}
        </span>
        <div className="flex gap-1 h-4 items-end">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={isPlaying ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
              className="w-1 bg-saffron"
            />
          ))}
        </div>
      </motion.button>
    </div>
  );
}
