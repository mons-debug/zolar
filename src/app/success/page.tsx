'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Swipe helper functions
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function SuccessPage() {
  const router = useRouter();
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-black to-emerald-700 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
      </div>

      {/* ZOLAR Logo - Fixed positioning */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110" />
        <Image
          src="/zolar-logo.png"
          alt="ZOLAR"
          width={150}
          height={60}
          className="h-16 w-auto relative z-10 drop-shadow-lg filter brightness-110"
          priority
          quality={95}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex-1 flex flex-col justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title with Curved Text Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <svg viewBox="0 0 400 120" className="w-full max-w-md mx-auto h-20 sm:h-24 md:h-28">
              <defs>
                <path
                  id="curve"
                  d="M 50 80 Q 200 30 350 80"
                  fill="none"
                  stroke="none"
                />
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#bbf7d0" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <text className="text-2xl sm:text-3xl md:text-4xl font-bold fill-current" fill="url(#textGradient)">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  BORDERLINE
                </textPath>
              </text>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-green-100 mb-4 leading-relaxed font-light"
          >
            Welcome to the exclusive zone
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed"
          >
            You&apos;re now part of the ZOLAR waitlist.
            <br />
            Stay connected for exclusive access!
          </motion.p>

          {/* Enhanced Benefits Section - Swipeable on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12"
          >
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-white mb-2">Priority Access</h3>
                <p className="text-sm text-gray-300">Be first to access new drops and exclusive collections</p>
              </div>
              
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-lg font-semibold text-white mb-2">Exclusive Drops</h3>
                <p className="text-sm text-gray-300">Access to limited edition pieces before public release</p>
              </div>
              
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="text-3xl mb-3">🔔</div>
                <h3 className="text-lg font-semibold text-white mb-2">Instant Notifications</h3>
                <p className="text-sm text-gray-300">Get notified immediately when new items are available</p>
              </div>
            </div>

            {/* Mobile Swipeable Cards */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: -currentCard * 100 + "%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {[
                    {
                      icon: "🚀",
                      title: "Priority Access",
                      description: "Be first to access new drops and exclusive collections"
                    },
                    {
                      icon: "💎",
                      title: "Exclusive Drops",
                      description: "Access to limited edition pieces before public release"
                    },
                    {
                      icon: "🔔",
                      title: "Instant Notifications",
                      description: "Get notified immediately when new items are available"
                    }
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(event, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                          setCurrentCard(Math.min(currentCard + 1, 2));
                        } else if (swipe > swipeConfidenceThreshold) {
                          setCurrentCard(Math.max(currentCard - 1, 0));
                        }
                      }}
                    >
                      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                        <div className="text-3xl mb-3">{card.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-sm text-gray-300">{card.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentCard === index ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Follow us for updates</h3>
            <div className="flex items-center justify-center space-x-4">
              <motion.a
                href="https://www.instagram.com/zolar.off?igsh=ajkxOWpneHptb3Z4"
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-4 text-white hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              
              <span className="text-gray-300 text-sm">@zolar.off</span>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          {showRedirectButton && (
            <motion.button
              onClick={handleGoBack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-3 backdrop-blur-lg bg-white/90 text-gray-900 rounded-2xl font-semibold hover:bg-white transition-all duration-300 shadow-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          )}
        </motion.div>
      </div>


    </div>
  );
}