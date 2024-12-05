'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import OptimizedImage from './ui/OptimizedImage';

const slides = [
  {
    title: "保护地球，刻不容缓",
    description: "加入我们的环保行动，共同守护地球家园",
    image: "/images/earth-hero.jpg",
    link: "/campaigns/earth"
  },
  {
    title: "守护海洋生态",
    description: "减少塑料污染，保护海洋生物多样性",
    image: "/images/ocean-hero.jpg",
    link: "/campaigns/ocean"
  },
  {
    title: "应对气候变化",
    description: "推动可再生能源发展，减少碳排放",
    image: "/images/climate-hero.jpg",
    link: "/campaigns/climate"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isClient]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={index !== currentSlide}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <div className="relative h-full w-full">
            <OptimizedImage
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <Link href={slide.link} className="inline-block">
                  <span className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-colors">
                    立即行动
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`切换到第 ${index + 1} 张幻灯片`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </div>
  );
} 