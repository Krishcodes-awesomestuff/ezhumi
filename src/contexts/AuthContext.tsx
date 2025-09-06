'use client';

import { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';

interface AuthContextType {
  user: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuth();

  const value = {
    user,
    loading: !isLoaded,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}