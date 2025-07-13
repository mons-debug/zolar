import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/zolar-logo.png', // Default to logo as fallback
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="text-center text-white/60 text-xs p-2">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Image unavailable
          </div>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${hasError ? 'opacity-30' : ''} transition-opacity duration-300`}
        onError={handleError}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    </motion.div>
  );
} 