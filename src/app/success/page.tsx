'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const [showRedirectButton, setShowRedirectButton] = useState(false);

  useEffect(() => {
    // Show redirect button after 5 seconds
    const timer = setTimeout(() => {
      setShowRedirectButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Merci 🙌
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Vous êtes inscrit à la whitelist ZOLAR.
            <br />
            Restez connecté !
          </motion.p>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sm sm:text-base text-gray-400 mb-8 space-y-2"
          >
            <p>✨ Vous recevrez une notification dès que la collection sera disponible</p>
            <p>🔥 Accès prioritaire aux drops exclusifs</p>
            <p>📱 Suivez-nous sur nos réseaux sociaux pour plus d&apos;actualités</p>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center justify-center space-x-6 mb-8"
          >
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200 p-3"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200 p-3"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Back to Home Button */}
          {showRedirectButton && (
            <motion.button
              onClick={handleGoBack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retour à l&apos;accueil
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
} 