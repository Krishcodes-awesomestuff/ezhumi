'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import MenuDrawer from './MenuDrawer';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'theme', label: 'Theme' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'faqs', label: 'FAQs' },
];

const languages = ['Hi', 'En', 'Ta'];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="flex items-center justify-between p-6 md:p-8">
          {/* Brand */}
          <div className="pointer-events-auto">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ezhumi
            </h1>
          </div>

          {/* Language chips - center-left */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:left-64 md:transform-none">
            <div className="flex items-center gap-1 pointer-events-auto">
              {languages.map((lang, index) => (
                <div key={lang} className="flex items-center">
                  <button
                    className="px-3 py-1 text-sm font-medium hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                    aria-pressed="false"
                  >
                    {lang}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-white/50 mx-1">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Menu button */}
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="border border-white/70 px-4 py-2 text-sm font-medium tracking-wide uppercase hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-expanded={isDrawerOpen}
              aria-controls="menu-drawer"
            >
              <span className="flex items-center gap-2">
                <Menu className="w-4 h-4" />
                MENU
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MenuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sections={sections}
        languages={languages}
        onSectionClick={scrollToSection}
      />
    </>
  );
}
