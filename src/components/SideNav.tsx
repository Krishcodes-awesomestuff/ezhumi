'use client';

import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'theme', label: 'Theme' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'faqs', label: 'FAQs' },
];

export default function SideNav() {
  const activeSection = useActiveSection();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-1/2 transform -translate-y-1/2 z-30 hidden md:block">
      <div className="flex flex-col space-y-6 pl-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <div key={section.id} className="flex items-center group">
              {/* Tick/line */}
              <motion.div
                className="h-px bg-white/40 mr-4"
                initial={{ width: 32 }}
                animate={{ 
                  width: isActive ? 48 : 32,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              
              {/* Section label */}
              <button
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                  isActive 
                    ? 'text-white opacity-100' 
                    : 'text-white/50 hover:text-white/80 opacity-60 hover:opacity-100'
                }`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {section.label}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
