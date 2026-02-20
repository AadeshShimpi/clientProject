'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FallbackImage from '@/components/FallbackImage';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';

export default function TechnologyPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const technologies = content.about.technologies;

  return (
    <div className="min-h-screen pt-20 pb-20 bg-white">
      {/* Header Section with Background Image and theme color */}
      <div 
        className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        style={{ minHeight: '80vh' }}
      >
        <div className="flex items-center p-8 md:p-12 bg-[#262f68]">
          <div className="max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              <span className="text-white">Our </span>
              <span className="text-[#d6ccb5]">Technology</span>
            </motion.h1>
            <p className="text-xl text-[#d6ccb5] max-w-4xl mt-6">
              Advanced powder production technologies delivering consistent, reliable, and cost-effective powders
            </p>
          </div>
        </div>
        <div className="relative w-full" style={{ minHeight: '60vh' }}>
          <FallbackImage
            src="/images/technology-homepage.jpg"
            alt="Our Technology"
            fill
            priority
            fallbackColor="bg-gradient-to-br from-[#1e2a5f] to-[#2d3a7a]"
            fallbackText="Our Technology"
            className="object-contain object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        {/* Technology Sections */}
        <div className="space-y-16">
          {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border-2 border-slate-100"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Image Section */}
                  <div className="relative w-full flex items-center justify-center">
                    <div className="relative w-full max-w-md rounded-xl overflow-hidden bg-[#f0f4f8] flex items-center justify-center">
                      <FallbackImage
                        src={tech.image || '/images/home-page.jpg'}
                        alt={tech.name}
                        priority={index === 0}
                        className="w-full h-auto object-contain block"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#262f68] mb-4">
                      {tech.name}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Key Characteristics */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-[#262f68] mb-3">Key Characteristics</h3>
                      <ul className="space-y-2">
                        {tech.characteristics.map((char, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#262f68] mr-2 mt-1">•</span>
                            <span className="text-gray-700">{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Available Materials */}
                    {tech.materials.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-[#262f68] mb-3">Available Materials</h3>
                        <ul className="space-y-2">
                          {tech.materials.map((mat, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#262f68] mr-2 mt-1">•</span>
                              <span className="text-gray-700">{mat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
