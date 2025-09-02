'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function VerticalLines() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-10"
      style={{ y }}
    >
      {/* Left border line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
      
      {/* First third line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '33.333%' }} />
      
      {/* Second third line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '66.666%' }} />
      
      {/* Right border line */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20" />
    </motion.div>
  );
}
