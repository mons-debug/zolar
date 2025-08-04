'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-black to-emerald-700 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
      </div>

      {/* ZOLAR Logo - Made Bigger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full scale-125" />
        <Image
          src="/zolar-logo.png"
          alt="ZOLAR"
          width={200}
          height={80}
          className="h-32 sm:h-36 md:h-40 lg:h-44 w-auto relative z-10 drop-shadow-2xl filter brightness-110"
          priority
          quality={95}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title with Curved Text Effect - Made Much Bigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4"
          >
            <svg viewBox="0 0 500 150" className="w-full max-w-2xl mx-auto h-40 sm:h-44 md:h-52 lg:h-56">
              <defs>
                <path
                  id="curve"
                  d="M 60 100 Q 250 40 440 100"
                  fill="none"
                  stroke="none"
                />
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#bbf7d0" />
                  <stop offset="70%" stopColor="#bbf7d0" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <text 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold fill-current" 
                fill="url(#textGradient)"
                filter="url(#glow)"
                style={{ fontWeight: 900, letterSpacing: '0.05em' }}
              >
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
            className="text-xl sm:text-2xl md:text-3xl text-green-100 mb-2 leading-relaxed font-light"
          >
            Welcome to the exclusive zone
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed"
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
            className="mb-8 md:mb-12"
          >
            {/* Desktop Grid - Enhanced Glass Cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
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
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  {/* Enhanced Glass Card */}
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glass reflection effect */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
                    
                    {/* Inner shadow */}
                    <div className="absolute inset-[1px] rounded-3xl shadow-inner shadow-white/10"></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-100 transition-colors duration-300">{card.title}</h3>
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Horizontal Cards - All Visible in Row */}
            <div className="md:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  {
                    icon: "🚀",
                    title: "Priority Access",
                    description: "Be first to access new drops"
                  },
                  {
                    icon: "💎",
                    title: "Exclusive Drops",
                    description: "Limited edition pieces"
                  },
                  {
                    icon: "🔔",
                    title: "Instant Notifications",
                    description: "Get notified immediately"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    className="flex-shrink-0 w-32"
                  >
                    {/* Horizontal Mobile Glass Card */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 rounded-2xl p-3 shadow-xl overflow-hidden h-full">
                      {/* Glass reflection effect */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
                      
                      {/* Inner shadow */}
                      <div className="absolute inset-[1px] rounded-2xl shadow-inner shadow-white/10"></div>
                      
                      <div className="relative z-10 text-center flex flex-col justify-between h-full">
                        <div className="text-lg mb-1">{card.icon}</div>
                        <h3 className="text-xs font-bold text-white mb-1 leading-tight">{card.title}</h3>
                        <p className="text-[10px] text-gray-300 leading-tight">{card.description}</p>
                      </div>
                    </div>
                  </motion.div>
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