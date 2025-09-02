'use client';

import { useEffect } from 'react';

export function useLockBody(lock: boolean) {
  useEffect(() => {
    if (lock) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lock]);
}
