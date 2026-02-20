"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiCheckCircle, 
  HiCog, 
  HiBeaker,
  HiSparkles,
  HiCube,
  HiWrenchScrewdriver,
  HiShieldCheck,
  HiGlobeAlt,
  HiAdjustmentsHorizontal
} from 'react-icons/hi2';
import { HiFire } from 'react-icons/hi';
import { applications } from '@/lib/applications';

export default function ApplicationsPage() {
  // use applications data from src/lib/applications

  const customisationCapabilities = [
    'Chemical composition tailoring (Cu, Tin, Bronze, Brass, Iron-based & alloy systems)',
    'Particle size control (micron to mesh ranges)',
    'Process selection: Pre-alloyed, diffusion-bonded, atomised, reduced, or blended',
    'Technology: Water Atomised, Gas Atomised, Electrolytic and Reduced powders',
    'Density, flow, and compressibility optimisation',
    'Pre-lubricated and press-ready grades',
    'Controlled impurity and oxidation levels'
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-white">
      {/* Header Section with Background Image and theme color */}
      <div className="w-full h-[75vh] md:h-[85vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex items-center p-8 md:p-12 bg-[#262f68]">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight"
            >
              <span className="text-white">Applications & </span>
              <span className="text-[#d6ccb5]">Solutions</span>
            </motion.h1>
            <p className="text-xl text-[#d6ccb5] max-w-4xl mt-6">
              At P.P. Patel Group, we specialize in the development and supply of custom metal powders engineered to meet specific application, processing, and performance requirements.
            </p>
          </div>
        </div>
        <div className="relative w-full h-full">
          <img
            src="/images/application-homepage.jpg"
            alt="Applications & Solutions"
            className="object-cover w-full h-full"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        {/* Section Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 px-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl border-b-4 border-[#d6ccb5] inline-block pb-2">
              <span className="text-[#262f68]">Application </span>
              <span className="text-[#d6ccb5]">Categories</span>
            </h2>
          </div>
          <div>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our metal powders serve diverse industries with specialized solutions. Explore the 5 major application categories where our products deliver exceptional performance.
            </p>
          </div>
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, index) => {
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/applications/${app.slug}`} className="block bg-white rounded-3xl hover:shadow-2xl transition-all hover:border-cyan-400 overflow-hidden h-full flex flex-col group">
                    <div className="w-full aspect-[3/2] overflow-hidden bg-white relative">
                      <img src={app.image} alt={app.title} className="object-cover w-full h-full block" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-grow items-center text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#262f68] mb-3 md:mb-4">{app.title}</h3>
                      <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed flex-grow">{app.shortDescription}</p>
                      <span className="inline-flex items-center text-[#262f68] font-semibold hover:text-cyan-500 transition-colors">Learn more <span className="ml-2">→</span></span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Customisation Capabilities Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#f0f4f8] to-[#e8ecf4] rounded-3xl shadow-xl p-8 md:p-12 border-4 border-[#d6ccb5]"
        >
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#262f68] mb-3 flex items-center gap-3">
              <HiSparkles className="w-8 h-8 text-cyan-500" />
              Our Customisation Capabilities
            </h2>
            <p className="text-gray-700 max-w-2xl">
              We deliver tailored solutions designed specifically for your application requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customisationCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-[#262f68]/20 hover:border-[#262f68]/50"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#262f68] text-white font-bold text-sm shadow-md">
                    ✓
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {capability}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-[#262f68] to-[#1e2453] rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl border-4 border-[#d6ccb5]"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Solution?
          </h3>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Our metallurgical experts are ready to help you develop the ideal powder formulation for your specific application.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-white text-[#262f68] rounded-lg font-bold hover:bg-cyan-400 hover:shadow-2xl transition-all border-2 border-white"
          >
            Contact Our Experts
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
