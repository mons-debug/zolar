'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Memoized Loading Screen Component
const LoadingScreen = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-green-800 via-black to-emerald-700 bg-200 animate-gradient-slow">

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
          className="absolute inset-0 bg-white/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
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
          className="h-20 w-auto relative z-10 drop-shadow-lg"
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
            className="w-2 h-2 bg-white/80 rounded-full"
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
    className={`relative z-10 flex-1 py-3.5 px-5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
      isActive ? 'text-gray-900 shadow-sm' : 'text-white/90 hover:text-white hover:bg-white/5'
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
  const [phoneValidation, setPhoneValidation] = useState<'valid' | 'invalid' | 'empty'>('empty');
  
  // Countdown state - starts at 0 until calculated
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Optimized loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect - GLOBAL countdown for all users worldwide
  useEffect(() => {
    // FIXED TARGET DATE - Same for ALL users worldwide
    // Set to February 15th, 2025 - Everyone sees the same countdown to this date
    const targetDate = new Date('2025-02-15T23:59:59Z'); // February 15th, 2025 - GLOBAL for everyone
    
    console.log('🌍 Global target date for all users:', targetDate);
    
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
        // Countdown finished - stay at 00:00:00:00
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    // Run once immediately to avoid initial delay
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
    }

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
      const response = await fetch('/api/whitelist', {
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

  // Phone number validation function - matches backend validation exactly
  const validatePhoneNumber = useCallback((value: string) => {
    if (!value || value.trim() === '') return 'empty';
    
    // Clean value - remove spaces but keep + and digits
    const cleanValue = value.replace(/\s/g, '');
    
    // Backend regex: /^(\+212|0)[5-9]\d{8}$/
    const phoneRegex = /^(\+212|0)[5-9]\d{8}$/;
    
    return phoneRegex.test(cleanValue) ? 'valid' : 'invalid';
  }, []);

  // Memoized toggle handlers
  const handleEmailToggle = useCallback(() => {
    setNotificationMethod('email');
    setPhoneValidation('empty'); // Reset phone validation when switching to email
  }, []);
  const handleWhatsAppToggle = useCallback(() => {
    setNotificationMethod('whatsapp');
    // Reset phone validation to current state when switching to WhatsApp
    if (phone) {
      const validation = validatePhoneNumber(phone);
      setPhoneValidation(validation);
    } else {
      setPhoneValidation('empty');
    }
  }, [phone, validatePhoneNumber]);

  // Phone number formatting function - improved with better edge case handling
  const formatPhoneNumber = useCallback((value: string) => {
    // Keep the original if it starts with + and has non-numeric chars (user typing +212...)
    if (value.startsWith('+') && /\D/.test(value)) {
      // Allow +212 to be typed
      if (value === '+' || value === '+2' || value === '+21' || value === '+212') {
        return value;
      }
    }
    
    // Remove all non-numeric characters to work with pure numbers
    const numbers = value.replace(/[^\d]/g, '');
    
    // Don't format if too long
    if (numbers.length > 12) {
      return value.slice(0, -1); // Remove last character if too long
    }
    
    // Handle different cases
    if (numbers.startsWith('212')) {
      // If starts with 212, format as +212 X XX XX XX XX
      const rest = numbers.substring(3);
      if (rest.length === 0) return '+212 ';
      if (rest.length === 1) return `+212 ${rest}`;
      if (rest.length <= 2) return `+212 ${rest}`;
      if (rest.length <= 4) return `+212 ${rest.slice(0,1)} ${rest.slice(1)}`;
      if (rest.length <= 6) return `+212 ${rest.slice(0,1)} ${rest.slice(1,3)} ${rest.slice(3)}`;
      if (rest.length <= 8) return `+212 ${rest.slice(0,1)} ${rest.slice(1,3)} ${rest.slice(3,5)} ${rest.slice(5)}`;
      if (rest.length <= 9) return `+212 ${rest.slice(0,1)} ${rest.slice(1,3)} ${rest.slice(3,5)} ${rest.slice(5,7)} ${rest.slice(7)}`;
      
    } else if (numbers.startsWith('0')) {
      // If starts with 0, format as 0X XX XX XX XX
      if (numbers.length === 1) return '0';
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 4) return `${numbers.slice(0,2)} ${numbers.slice(2)}`;
      if (numbers.length <= 6) return `${numbers.slice(0,2)} ${numbers.slice(2,4)} ${numbers.slice(4)}`;
      if (numbers.length <= 8) return `${numbers.slice(0,2)} ${numbers.slice(2,4)} ${numbers.slice(4,6)} ${numbers.slice(6)}`;
      if (numbers.length <= 10) return `${numbers.slice(0,2)} ${numbers.slice(2,4)} ${numbers.slice(4,6)} ${numbers.slice(6,8)} ${numbers.slice(8)}`;
      
    } else if (numbers.length > 0) {
      // For other cases, assume it's a Moroccan mobile number without country code
      if (numbers.length === 1) return `+212 ${numbers}`;
      if (numbers.length <= 2) return `+212 ${numbers}`;
      if (numbers.length <= 4) return `+212 ${numbers.slice(0,1)} ${numbers.slice(1)}`;
      if (numbers.length <= 6) return `+212 ${numbers.slice(0,1)} ${numbers.slice(1,3)} ${numbers.slice(3)}`;
      if (numbers.length <= 8) return `+212 ${numbers.slice(0,1)} ${numbers.slice(1,3)} ${numbers.slice(3,5)} ${numbers.slice(5)}`;
      if (numbers.length <= 9) return `+212 ${numbers.slice(0,1)} ${numbers.slice(1,3)} ${numbers.slice(3,5)} ${numbers.slice(5,7)} ${numbers.slice(7)}`;
    }
    
    return value; // Return original if can't format
  }, []);

  // Memoized input handlers
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue);
    setPhone(formatted);
    
    // Update validation status
    const validation = validatePhoneNumber(formatted);
    setPhoneValidation(validation);
  }, [formatPhoneNumber, validatePhoneNumber]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-green-800 via-black to-emerald-700 bg-200 animate-gradient-slow">

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex flex-col h-full px-4 py-2 overflow-hidden"
      >
        {/* Header Section - Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center pt-2 md:pt-4 mb-2 md:mb-3 flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110" />
            <Image
              src="/zolar-logo.png"
              alt="ZOLAR"
              width={200}
              height={80}
              className="h-24 md:h-28 w-auto relative z-10 drop-shadow-lg filter brightness-110"
              priority
              quality={95}
              sizes="200px"
            />
          </div>
        </motion.div>

        {/* Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-2 md:mb-4 flex-shrink-0"
        >
          <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-2 md:p-4 shadow-2xl overflow-hidden">
            {/* Subtle glass gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl pointer-events-none" />
            <div className="absolute inset-[1px] bg-gradient-to-b from-white/15 to-transparent rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-white text-center text-xs md:text-sm mb-1 md:mb-2 font-medium"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                Launch in
              </motion.p>
              
              <div className="flex items-center justify-center gap-2 md:gap-4">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
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
                    <div className="relative backdrop-blur-sm bg-white/15 border border-white/25 rounded-xl p-2 md:p-3 min-w-[50px] md:min-w-[60px] shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/5 rounded-xl pointer-events-none" />
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
                          className="relative z-10 text-white text-base md:text-xl font-bold block text-center tabular-nums"
                          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                        >
                          {item.value.toString().padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-white/90 text-[10px] md:text-xs mt-1 md:mt-2 font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Card Section - Flex grow to fill remaining space */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 flex items-center justify-center w-full max-w-md mx-auto min-h-0 overflow-hidden"
        >
          <motion.div
            className="relative backdrop-blur-xl bg-white/10 border border-white/25 rounded-3xl shadow-2xl p-4 md:p-6 overflow-hidden w-full max-h-full"
            whileHover={{ 
              scale: 1.005,
              transition: { duration: 0.2 }
            }}
          >
            {/* Refined glass gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl pointer-events-none" />
            <div className="absolute inset-[1px] bg-gradient-to-b from-white/25 to-transparent rounded-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-0 shadow-inner shadow-white/10 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
              {/* Enhanced Title with better typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-xl lg:text-2xl font-bold text-white text-center mb-2 md:mb-3 leading-tight"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
              >
                ZOLAR exclusive BORDERLINE
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/95 text-center text-xs md:text-sm mb-3 md:mb-4 leading-relaxed"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
              >
                Choose how to be notified of the launch
              </motion.p>

              {/* Enhanced Toggle Switch with Modern Glass */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-3 md:mb-4"
              >
                <div className="relative bg-white/8 backdrop-blur-lg rounded-2xl p-1 border border-white/25 shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl pointer-events-none" />
                  <div className="flex relative">
                    <motion.div
                      className="absolute top-1 bottom-1 bg-white/95 rounded-xl shadow-lg backdrop-blur-sm"
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

              {/* Enhanced Form */}
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
                        placeholder="your@email.com"
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/10 backdrop-blur-lg border border-white/25 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-base shadow-inner"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
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
                      <div>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="+212 6 12 34 56 78"
                          className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/10 backdrop-blur-lg rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-inner ${
                            phoneValidation === 'valid' 
                              ? 'border border-green-400/50 focus:ring-green-400/50 focus:border-green-400/50' 
                              : phoneValidation === 'invalid'
                              ? 'border border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50'
                              : 'border border-white/25 focus:ring-white/50 focus:border-white/50'
                          }`}
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                          required
                          autoComplete="tel"
                        />
                        {phoneValidation === 'invalid' && phone.length > 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-300/90 text-xs mt-1 ml-1"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                          >
                            Format valide: +212 6XX XX XX XX ou 06XX XX XX XX
                          </motion.p>
                        )}
                        {phoneValidation === 'valid' && phone.length > 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-green-300/90 text-xs mt-1 ml-1"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                          >
                            ✓ Numéro WhatsApp valide
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-2.5 md:py-3 bg-white/95 backdrop-blur-sm text-gray-900 font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm mt-3 md:mt-4 border border-white/20"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing up...
                      </>
                    ) : (
                      <>
                        Join the List
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

                {/* Enhanced Messages */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`overflow-hidden rounded-2xl mt-4 ${
                        messageType === 'error' 
                          ? 'bg-red-500/15 border border-red-400/30 backdrop-blur-lg' 
                          : 'bg-green-500/15 border border-green-400/30 backdrop-blur-lg'
                      }`}
                    >
                      <p className={`p-4 text-sm text-center ${
                        messageType === 'error' ? 'text-red-200' : 'text-green-200'
                      }`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        {message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Enhanced Privacy Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="mt-2 md:mt-3 text-center text-white/70 text-[10px] md:text-xs"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                🔒 Your data is secure. No spam.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
