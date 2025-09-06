'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-white">Ezhumi</h1>
          </Link>
          <h2 className="text-2xl font-medium text-white mb-2">Create Account</h2>
          <p className="text-white/70">Join the agriculture innovation community</p>
        </div>

        {/* Clerk Sign Up Component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <SignUp 
            redirectUrl="/"
            signInUrl="/login"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-white text-black hover:bg-gray-100',
                card: 'bg-white/5 border border-white/20',
                headerTitle: 'text-white',
                headerSubtitle: 'text-white/70',
                socialButtonsBlockButton: 'bg-white/10 text-white border-white/20 hover:bg-white/20',
                formFieldInput: 'bg-white/5 border-white/20 text-white',
                formFieldLabel: 'text-white/90',
                footerActionLink: 'text-white hover:text-white/80',
                identityPreviewText: 'text-white/70',
                formResendCodeLink: 'text-white hover:text-white/80',
              }
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
