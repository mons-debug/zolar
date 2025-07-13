'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Memoized Loading Screen Component
const LoadingScreen = memo(() => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    {/* Optimized gradient background */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>

    {/* Loading Logo Animation */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.1, 1],
        opacity: [0, 1, 1],
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.6, 1],
        ease: "easeOut"
      }}
      className="relative z-10"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Image
          src="/zolar-logo.png"
          alt="ZOLAR"
          width={200}
          height={80}
          className="h-20 w-auto relative z-10 drop-shadow-2xl"
          priority
          quality={90}
        />
      </div>
    </motion.div>

    {/* Optimized loading dots */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
    >
      <div className="flex items-center gap-3">
        {[0, 0.2, 0.4].map((delay, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
));

LoadingScreen.displayName = 'LoadingScreen';

// Memoized Toggle Button Component
const ToggleButton = memo(({ 
  isActive, 
  onClick, 
  icon, 
  children 
}: {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative z-10 flex-1 py-4 px-6 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
      isActive ? 'text-black' : 'text-white/90 hover:text-white'
    }`}
  >
    {icon}
    {children}
  </button>
));

ToggleButton.displayName = 'ToggleButton';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [notificationMethod, setNotificationMethod] = useState<'email' | 'whatsapp'>('email');
  const [isLoading, setIsLoading] = useState(true);
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  // Optimized loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200); // Reduced from 2500ms

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    // Set target date (7 days from now as example)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(targetDate.getHours() + 12);
    targetDate.setMinutes(targetDate.getMinutes() + 34);
    targetDate.setSeconds(targetDate.getSeconds() + 56);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Memoized form submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setMessageType(null);

    const emailValue = notificationMethod === 'email' ? email.trim() : '';
    const phoneValue = notificationMethod === 'whatsapp' ? phone.trim() : '';

    if (notificationMethod === 'email' && !emailValue) {
      setMessage('Veuillez fournir une adresse email');
      setMessageType('error');
      setIsSubmitting(false);
      return;
    }

    if (notificationMethod === 'whatsapp' && !phoneValue) {
      setMessage('Veuillez fournir un numéro WhatsApp');
      setMessageType('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/whitelist-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: emailValue,
          phone: phoneValue
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/success');
      } else {
        setMessage(data.error);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, phone, notificationMethod, router]);

  // Memoized toggle handlers
  const handleEmailToggle = useCallback(() => setNotificationMethod('email'), []);
  const handleWhatsAppToggle = useCallback(() => setNotificationMethod('whatsapp'), []);

  // Memoized input handlers
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Optimized Background Video Layer - Mobile Only */}
      <div className="absolute inset-0 md:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: 'center center' }}
        >
          <source src="/background-video-new.mov" type="video/quicktime" />
          <source src="/background-video-new.mov" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40" />
      </div>

      {/* Optimized gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/15 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/15 to-transparent rounded-full blur-3xl will-change-transform"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex flex-col items-center justify-center min-h-screen px-4"
      >
        {/* Logo - Positioned at top-center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8 pt-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full" />
            <Image
              src="/zolar-logo.png"
              alt="ZOLAR"
              width={180}
              height={72}
              className="h-18 w-auto relative z-10 drop-shadow-2xl"
              priority
              quality={90}
              sizes="180px"
            />
          </div>
        </motion.div>

        {/* Modern Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative backdrop-blur-[80px] bg-white/5 border border-white/15 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-white/80 text-center text-sm mb-4 font-medium"
              >
                Lancement dans
              </motion.p>
              
              <div className="flex items-center justify-center gap-4">
                {[
                  { value: timeLeft.days, label: 'Jours' },
                  { value: timeLeft.hours, label: 'Heures' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Sec' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4 + (index * 0.1), 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative backdrop-blur-[60px] bg-white/8 border border-white/20 rounded-xl p-3 min-w-[60px] shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-xl pointer-events-none" />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${item.label}-${item.value}`}
                          initial={{ y: -15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 15, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25,
                            duration: 0.3
                          }}
                          className="relative z-10 text-white text-xl font-bold block text-center tabular-nums"
                        >
                          {item.value.toString().padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-white/70 text-xs mt-2 font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="mt-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <motion.div
            className="relative backdrop-blur-[100px] bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden"
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/3 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-white text-center mb-4 leading-tight"
              >
                Collection Exclusive
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/90 text-center text-sm mb-8 leading-relaxed"
              >
                Choisis comment être averti du lancement
              </motion.p>

              {/* Toggle Switch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-6"
              >
                <div className="relative bg-white/3 backdrop-blur-[80px] rounded-2xl p-1 border border-white/10">
                  <div className="flex relative">
                    <motion.div
                      className="absolute top-1 bottom-1 bg-white/95 rounded-xl shadow-xl backdrop-blur-sm"
                      initial={false}
                      animate={{
                        left: notificationMethod === 'email' ? '4px' : '50%',
                        right: notificationMethod === 'email' ? '50%' : '4px'
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 35,
                        mass: 0.6
                      }}
                    />
                    
                    <ToggleButton
                      isActive={notificationMethod === 'email'}
                      onClick={handleEmailToggle}
                      icon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    >
                      Email
                    </ToggleButton>
                    
                    <ToggleButton
                      isActive={notificationMethod === 'whatsapp'}
                      onClick={handleWhatsAppToggle}
                      icon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                        </svg>
                      }
                    >
                      WhatsApp
                    </ToggleButton>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <AnimatePresence mode="wait">
                  {notificationMethod === 'email' ? (
                    <motion.div
                      key="email"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="ton@email.com"
                        className="w-full px-4 py-4 bg-white/5 backdrop-blur-[80px] border border-white/15 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25 transition-all duration-200 text-sm"
                        required
                        autoComplete="email"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="whatsapp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+212 6 12 34 56 78"
                        className="w-full px-4 py-4 bg-white/5 backdrop-blur-[80px] border border-white/15 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/25 transition-all duration-200 text-sm"
                        required
                        autoComplete="tel"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 bg-white/98 backdrop-blur-sm text-black font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-6"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Inscription...
                      </>
                    ) : (
                      <>
                        Rejoindre la Liste
                        {notificationMethod === 'email' ? (
                          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        ) : (
                          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                          </svg>
                        )}
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Messages */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`overflow-hidden rounded-2xl mt-4 ${
                        messageType === 'error' 
                          ? 'bg-red-500/10 border border-red-500/20 backdrop-blur-[80px]' 
                          : 'bg-green-500/10 border border-green-500/20 backdrop-blur-[80px]'
                      }`}
                    >
                      <p className={`p-4 text-sm text-center ${
                        messageType === 'error' ? 'text-red-200' : 'text-green-200'
                      }`}>
                        {message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Privacy Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="mt-6 text-center text-white/60 text-xs"
              >
                🔒 Tes données sont sécurisées. Aucun spam.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
