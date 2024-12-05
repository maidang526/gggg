'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  className?: string;
  containerClassName?: string;
}

export default function OptimizedImage({ 
  className = '', 
  containerClassName = '',
  style,
  fill,
  width,
  height,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setHasError(false);
  }, [props.src]);

  const containerStyle = fill ? {
    position: 'relative',
    width: '100%',
    height: '100%',
    ...style
  } : {
    position: 'relative',
    width: width || 'auto',
    height: height || 'auto',
    ...style
  };

  if (!isLoaded) {
    return (
      <div 
        className={`${containerClassName}`}
        style={{ 
          backgroundColor: '#f3f4f6',
          ...containerStyle
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        className={`${containerClassName}`}
        style={{ 
          backgroundColor: '#f3f4f6',
          ...containerStyle
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 text-sm">图片加载失败</div>
        </div>
      </div>
    );
  }

  const imageComponent = (
    <Image
      {...props}
      alt={props.alt || ''}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={`${className} ${fill ? 'object-cover' : ''} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={(event) => {
        const img = event.target as HTMLImageElement;
        if (img.src.indexOf('data:image/gif;base64') < 0) {
          setIsLoaded(true);
          setHasError(false);
        }
      }}
      onError={() => {
        setHasError(true);
        setIsLoaded(true);
        if (process.env.NODE_ENV === 'development') {
          console.error(`Failed to load image: ${props.src}`);
        }
      }}
    />
  );

  return fill ? (
    <div className={`relative ${containerClassName}`} style={containerStyle}>
      {imageComponent}
    </div>
  ) : imageComponent;
} 
