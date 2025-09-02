'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import VerticalLines from './VerticalLines';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/media/cow.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoLoaded(false)}
            >
              <source src="/media/cow.mp4" type="video/mp4" />
            </video>
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700" />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700" />
        )}
        
        {/* Gradient overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Vertical Lines Overlay */}
      <VerticalLines />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
          {/* Hero Headlines - Left side */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-2 mb-12">
              {['Hack.', 'Seek.', 'Cultivate.'].map((word) => (
                <motion.h1
                  key={word}
                  variants={itemVariants}
                  className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.95] font-extrabold tracking-tight text-balance"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('about')}
                className="bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
              >
                Register Now
              </button>
              <button
                onClick={() => scrollToSection('theme')}
                className="border border-white/70 text-white px-8 py-4 font-semibold text-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
              >
                Explore Themes
              </button>
            </motion.div>
          </motion.div>

          {/* Tagline - Upper right */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-sm text-center lg:text-right lg:self-start lg:mt-20">
              <p className="text-[clamp(1rem,2vw,1.5rem)] leading-[1.4] font-medium text-balance">
                A Hackathon dedicated to agriculture enthusiasts
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
