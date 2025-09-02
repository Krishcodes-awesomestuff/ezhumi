import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 ${className}`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          {title}
        </h2>
        {children || (
          <div className="text-center text-lg md:text-xl text-white/70">
            <p>Content for {title} section coming soon...</p>
            <p className="mt-4 text-sm text-white/50">
              This is a placeholder section to demonstrate navigation and scroll behavior.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
