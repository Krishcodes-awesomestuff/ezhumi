'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBody } from '@/hooks/useLockBody';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: { id: string; label: string }[];
  languages: string[];
  onSectionClick: (sectionId: string) => void;
}

export default function MenuDrawer({ 
  isOpen, 
  onClose, 
  sections, 
  languages, 
  onSectionClick 
}: MenuDrawerProps) {
  const firstLinkRef = useRef<HTMLButtonElement>(null);
  
  useLockBody(isOpen);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-md h-full bg-black/90 backdrop-blur-md border-l border-white/20"
            role="dialog"
            aria-modal="true"
            id="menu-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Section Links */}
              <nav className="flex-1">
                <ul className="space-y-4">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <button
                        ref={index === 0 ? firstLinkRef : undefined}
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full text-left text-lg font-medium hover:text-white/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded p-2"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Language chips */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-sm font-medium text-white/70 mb-4">Languages</h3>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className="px-3 py-1 text-sm font-medium border border-white/30 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-pressed="false"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
