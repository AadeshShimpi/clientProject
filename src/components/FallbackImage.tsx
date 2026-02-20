'use client';

import { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackColor?: string;
  fallbackText?: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function FallbackImage({
  src,
  alt,
  fallbackColor = 'bg-[#f0f4f8]',
  fallbackText = 'Image',
  fill,
  className,
  width,
  height,
  priority = false,
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    // Fallback gradient placeholder
    if (fill) {
      return (
        <div
          className={`absolute inset-0 w-full h-full ${fallbackColor} flex items-center justify-center`}
        >
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-[#262f68] mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-[#262f68] font-medium">{fallbackText}</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${fallbackColor} flex items-center justify-center ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
      >
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto text-[#262f68] mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-[#262f68] font-medium text-sm">{fallbackText}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 w-full h-full bg-[#f0f4f8] animate-pulse" />
        )}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className || ''}`}
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && (
        <div 
          className="bg-[#f0f4f8] animate-pulse" 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={className}
        style={{ 
          width: width || '100%', 
          height: height || 'auto', 
          objectFit: 'cover', 
          objectPosition: 'center',
          display: 'block',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </>
  );
}
