'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import { FaShieldAlt, FaCogs, FaHistory, FaTools, FaIndustry, FaFlask } from 'react-icons/fa';

export default function Features() {
  const [content, setContent] = useState(contentData);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const features = content.features;

  // Icon mapping for features with industrial theme
  const iconMap: { [key: string]: ReactNode } = {
    '30+ Years Experience': <FaHistory className="w-14 h-14 text-[#262f68]" />,
    'Advanced Technology': <FaCogs className="w-14 h-14 text-[#262f68]" />,
    'Quality Assurance': <FaShieldAlt className="w-14 h-14 text-[#262f68]" />,
    'Custom Solutions': <FaTools className="w-14 h-14 text-[#262f68]" />,
    'Diverse Applications': <FaIndustry className="w-14 h-14 text-[#262f68]" />,
    'Technical Expertise': <FaFlask className="w-14 h-14 text-[#262f68]" />,
    'default': <FaCogs className="w-14 h-14 text-[#262f68]" />
  };

  const getIcon = (title: string) => {
    return iconMap[title] || iconMap['default'];
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;
    const amount = slider.clientWidth * 0.8;
    slider.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#262f68] mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Industrial excellence in powder manufacturing & metallurgy
          </p>
        </motion.div>

        <div className="relative group px-6 md:px-10">
          {/* Left Arrow */}
          <motion.button
            onClick={() => scrollCarousel('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#262f68] shadow-lg border border-[#262f68] hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scrollCarousel('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#262f68] shadow-lg border border-[#262f68] hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>

          {/* Gradient overlays for fade effect */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-12 pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-0" />
          <div className="hidden md:block absolute inset-y-0 right-0 w-12 pointer-events-none bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-0" />

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] snap-start bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border-2 border-slate-100 hover:border-[#262f68] flex flex-col"
              >
                <motion.div 
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-5 bg-[#f0f4f8] rounded-2xl shadow-md group-hover:shadow-lg transition-all group-hover:bg-[#f0f4f8]">
                    {getIcon(feature.title)}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#262f68] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors flex-1">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

