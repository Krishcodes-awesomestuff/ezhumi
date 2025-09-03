'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 1.2,
    },
  },
};

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen overflow-hidden flex items-center justify-start"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            onLoadStart={() => setVideoLoaded(false)}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src="/media/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback gradient when video fails to load
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700" />
        )}
        
        {/* Dark overlay for text contrast using CSS variables */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to top, var(--color-overlay-strong), var(--color-overlay), transparent)`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--color-overlay)' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Tagline */}
        <motion.div 
          className="pt-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p 
            className="font-medium text-white/90 text-balance"
            style={{ 
              fontSize: 'var(--font-size-tagline)',
              lineHeight: 'var(--line-height-tagline)'
            }}
          >
            A hackathon dedicated to agriculture enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start min-h-screen pt-24 lg:pt-32">
          
          {/* Hero Headlines - Left/Center */}
          <motion.div 
            className="lg:col-span-2 flex flex-col justify-center min-h-[50vh] lg:min-h-[60vh]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-2 lg:space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-white tracking-tight font-bold"
                style={{ 
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'var(--font-size-hero)',
                  lineHeight: 'var(--line-height-hero)',
                  fontWeight: 700
                }}
              >
                Hack.
              </motion.h1>
              <motion.h1 
                variants={itemVariants}
                className="text-white tracking-tight font-bold ml-8 md:ml-16"
                style={{ 
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'var(--font-size-hero)',
                  lineHeight: 'var(--line-height-hero)',
                  fontWeight: 700
                }}
              >
                Seek.
              </motion.h1>
              <motion.h1 
                variants={itemVariants}
                className="text-white tracking-tight font-bold ml-16 md:ml-32"
                style={{ 
                  fontFamily: 'var(--font-hero)',
                  fontSize: 'var(--font-size-hero)',
                  lineHeight: 'var(--line-height-hero)',
                  fontWeight: 700
                }}
              >
                Cultivate.
              </motion.h1>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-12"
            >
              {/* White Button */}
              <motion.a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium tracking-wide transition-all duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
              </motion.a>

              {/* Black Button */}
              <motion.a
                href="#theme"
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium tracking-wide transition-all duration-200 hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Themes
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column space reserved for future content */}
          <div className="lg:col-span-1"></div>
        </div>
      </div>
    </section>
  );
}
