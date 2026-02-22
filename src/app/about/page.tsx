'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FallbackImage from '@/components/FallbackImage';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';

export default function AboutPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const about = content.about;

  const renderCompanyName = (company: string) => {
    const match = company.match(/^(.*)\s(\([^)]*\))$/);
    if (!match) {
      return company;
    }

    const [, mainName, division] = match;
    return (
      <>
        <span className="block">{mainName}</span>
        <span className="block">{division}</span>
      </>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: split layout with dark-left and image-right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
            {/* Left: dark blue with text (keeps site font) */}
            <div className="flex items-center justify-center p-6 sm:p-8 md:p-12 bg-[#262f68] min-h-64 sm:min-h-80 md:min-h-[75vh] lg:min-h-[85vh]">
              <div className="max-w-lg w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
                  <span className="text-[#d6ccb5] mr-2">About</span>
                  <span>{about.title.replace(/^About\s*/i, '')}</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-3 sm:mb-4">{about.description}</p>
                <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed">{about.detailedDescription}</p>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative w-full min-h-64 sm:min-h-80 md:min-h-[75vh] lg:min-h-[85vh] bg-gray-200">
              <img
                src="/images/facilityimage.jpg"
                alt="Company image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Company Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          
        </motion.div>

        {/* Our Evolution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-slate-100"
        >
          <h2 className="text-3xl font-bold text-[#262f68] mb-6">P.P.Patel Group</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Since 1996, the group has expanded its capabilities and now operates through multiple companies serving a wide range of industrial customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-[#f0f4f8] rounded-xl border border-[#262f68]/20 hover:border-[#262f68] transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900">{renderCompanyName(company)}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Approach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-slate-100"
        >
          <h2 className="text-3xl font-bold text-[#262f68] mb-6">Our Approach</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {about.approach}
          </p>
        </motion.section>

        {/* Technology Section */}
        
        {/* <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#262f68] mb-8 text-center">Technology</h2>
          <div className="space-y-8">
            {about.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    <FallbackImage
                      src={tech.image || '/placeholder-tech.jpg'}
                      alt={tech.name}
                      fill
                      priority={index === 0}
                      fallbackColor="bg-gray-100"
                      fallbackText={tech.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tech.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{tech.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Characteristics:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {tech.characteristics.map((char, idx) => (
                          <li key={idx}>{char}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Materials:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {tech.materials.map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-[#f0f4f8] rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-gray-900">{value}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
