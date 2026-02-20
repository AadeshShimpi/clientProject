'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';
import FallbackImage from '@/components/FallbackImage';
import { CheckCircleIcon, CubeIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import type { ApplicationProductDetails, ProductDetailSection, ProductDetailItem } from '@/lib/applications';

interface Application {
  id: number;
  slug: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  products: string[];
  productDetails?: ApplicationProductDetails;
}

interface ApplicationDetailClientProps {
  app: Application;
}

export default function ApplicationDetailClient({ app }: ApplicationDetailClientProps) {
  const router = useRouter();
  const hasProductDetails = app.productDetails && app.productDetails.sections && app.productDetails.sections.length > 0;

  // Ref for main content
  const mainContentRef = React.useRef<HTMLDivElement | null>(null);

  const handleScrollDown = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract only the introductory paragraphs for the Overview,
  // stopping before any detailed section like Key Features, Typical Applications, etc.
  const overviewText = (() => {
    const sectionPattern =
      /(Key Features|Typical Applications|Quality Assurance|Quality & Customization|Typical Specifications|Benefits in Gas Cutting|Key Benefits|Key Characteristics|Applications):\s*/;
    const match = app.fullDescription.split(sectionPattern);
    // Everything before the first section header
    return match[0] || app.fullDescription;
  })();

  const overviewParagraphs = overviewText.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Hero Section with Background Image and Overlay */}
      <div className="relative w-full h-screen pt-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <FallbackImage
            src={app.image}
            alt={app.title}
            fill
            priority={true}
            fallbackColor="bg-[#f0f4f8]"
            fallbackText={app.title}
            className="object-center object-cover"
          />
        </div>

        {/* Dark Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content Container */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Navigation Breadcrumb - At top */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Applications', href: '/applications' },
                { label: app.title },
              ]}
              darkBackground={true}
            />
          </div>

          {/* Hero Content - Centered vertically */}
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-bold text-white mb-6"
                >
                  {app.title}
                </motion.h1>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full mb-6 origin-left"
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg lg:text-2xl text-white leading-relaxed"
                >
                  {app.shortDescription}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator - At bottom right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 cursor-pointer"
            onClick={handleScrollDown}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to content"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleScrollDown(); }}
          >
            {/* Icon */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDownIcon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Vertical Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-12 w-0.5 bg-gradient-to-b from-white to-transparent origin-top"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#262f68] mt-8 mb-6">Overview</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {overviewParagraphs.map((para, idx) => (
              <p key={idx} className="text-lg text-gray-700">
                {para.trim()}
              </p>
            ))}
          </div>
        </motion.div>
        {/* Product Details Section - Dynamic */}
        {hasProductDetails && app.productDetails && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8">Available Grades & Specifications</h2>
            
            {app.productDetails.intro && (
              <p className="text-gray-700 text-lg mb-8">{app.productDetails.intro}</p>
            )}

            {app.productDetails.sections && app.productDetails.sections.map((section: ProductDetailSection, sectionIdx: number) => (
              <div key={sectionIdx} className="mb-12">
                <div className={`border-l-4 ${section.borderColor || 'border-[#937e4f]'} pl-6`}>
                  <h3 className="text-2xl font-bold text-[#262f68] mb-4 flex items-center gap-2">
                    <CubeIcon className="w-6 h-6 text-[#937e4f]" />
                    {section.title}
                  </h3>
                  
                  {section.description && (
                    <p className="text-gray-700 text-lg mb-6">{section.description}</p>
                  )}
                  
                  <div className="space-y-4">
                    {section.items.map((item: ProductDetailItem, itemIdx: number) => (
                      <motion.div
                        key={itemIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.05 }}
                        onClick={() => router.push('/contact')}
                        className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-[#d6ccb5]/50 cursor-pointer hover:shadow-lg hover:border-[#262f68] transition-all"
                      >
                        <h4 className="font-semibold text-[#262f68] mb-2">{item.name}</h4>
                        <p className="text-gray-700 mb-3">{item.description}</p>

                        {item.specs && (
                          <div className="space-y-2 text-sm text-gray-700 bg-white/50 p-3 rounded border border-[#d6ccb5]/30">
                            {Object.entries(item.specs).map(([key, value]) => (
                              <p key={key}>
                                <span className="font-semibold">{key}:</span> {value}
                              </p>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div>
            <h3 className="text-2xl font-bold text-[#262f68] mb-6 flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-cyan-500" />
              Key Features
            </h3>
            <div className="space-y-4">
              {app.features.map((f: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                >
                  <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Typical Specifications Section (Gas Cutting specific) */}
        {app.slug === 'gas-cutting' && app.fullDescription.includes('Typical Specifications:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Typical Specifications
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(
                  /Typical Specifications:\s*([\s\S]*?)(?:\n\n|Benefits in Gas Cutting:|Applications:|$)/,
                );
                if (!match) return null;
                const content = match[1];
                return content
                  .split('\n')
                  .filter((line: string) => line.trim())
                  .map((line: string, idx: number) => {
                    const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                    return cleanLine ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cleanLine}</span>
                      </motion.div>
                    ) : null;
                  });
              })()}
            </div>
          </motion.div>
        )}

        {/* Benefits in Gas Cutting Section (Gas Cutting specific) */}
        {app.slug === 'gas-cutting' && app.fullDescription.includes('Benefits in Gas Cutting:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Benefits in Gas Cutting
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(
                  /Benefits in Gas Cutting:\s*([\s\S]*?)(?:\n\n|Applications:|$)/,
                );
                if (!match) return null;
                const content = match[1];
                return content
                  .split('\n')
                  .filter((line: string) => line.trim())
                  .map((line: string, idx: number) => {
                    const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                    return cleanLine ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cleanLine}</span>
                      </motion.div>
                    ) : null;
                  });
              })()}
            </div>
          </motion.div>
        )}

        {/* Applications Section (Gas Cutting specific, for headings literally named "Applications:") */}
        {app.slug === 'gas-cutting' && app.fullDescription.includes('Applications:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Applications
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(/Applications:\s*([\s\S]*?)$/);
                if (!match) return null;
                const content = match[1];
                return content
                  .split('\n')
                  .filter((line: string) => line.trim())
                  .map((line: string, idx: number) => {
                    const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                    return cleanLine ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cleanLine}</span>
                      </motion.div>
                    ) : null;
                  });
              })()}
            </div>
          </motion.div>
        )}

        {/* Products Used - Hidden for now
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div>
            <h3 className="text-2xl font-bold text-[#262f68] mb-6 flex items-center gap-2">
              <CubeIcon className="w-6 h-6 text-[#937e4f]" />
              Products Used
            </h3>
            <div className="space-y-4">
              {app.products.map((p: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#937e4f]/10 to-cyan-50 rounded-lg border border-[#937e4f]/30 hover:border-[#937e4f] transition-colors"
                >
                  <CubeIcon className="w-5 h-5 text-[#937e4f] flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        */}

        {/* Typical Applications Section */}
        {app.fullDescription.includes('Typical Applications:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Typical Applications
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(/Typical Applications:\s*([\s\S]*?)(?:\n\n|Quality Assurance:|$)/);
                if (!match) return null;
                const content = match[1];
                return content.split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => {
                  const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                  return cleanLine ? (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{cleanLine}</span>
                    </motion.div>
                  ) : null;
                });
              })()}
            </div>
          </motion.div>
        )}

        {/* Quality Assurance Section */}
        {app.fullDescription.includes('Quality Assurance:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Quality Assurance
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(/Quality Assurance:\s*([\s\S]*?)(?:\n\n|Quality & Customization:|Typical Specifications:|$)/);
                if (!match) return null;
                const content = match[1];
                return content.split('\n').filter((line: string) => line.trim()).map((line: string, idx: number) => {
                  const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                  return cleanLine ? (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{cleanLine}</span>
                    </motion.div>
                  ) : null;
                });
              })()}
            </div>
          </motion.div>
        )}

        {/* Quality & Customization Section (only when present) */}
        {app.fullDescription.includes('Quality & Customization:') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8 flex items-center gap-2">
              <CheckCircleIcon className="w-8 h-8 text-cyan-500" />
              Quality &amp; Customization
            </h2>
            <div className="space-y-4">
              {(() => {
                const match = app.fullDescription.match(
                  /Quality & Customization:\s*([\s\S]*?)(?:\n\n|Typical Specifications:|Benefits in Gas Cutting:|$)/,
                );
                if (!match) return null;
                const content = match[1];
                return content
                  .split('\n')
                  .filter((line: string) => line.trim())
                  .map((line: string, idx: number) => {
                    const cleanLine = line.replace(/^[•\-]\s*/, '').trim();
                    return cleanLine ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-[#d6ccb5]/50 hover:border-[#262f68]/50 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cleanLine}</span>
                      </motion.div>
                    ) : null;
                  });
              })()}
            </div>
          </motion.div>
        )}

        

        {/* Back to Applications Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-[#d6ccb5]"
        >
          <Link href="/applications" className="inline-flex items-center gap-2 text-[#262f68] hover:text-cyan-500 font-semibold transition-colors">
            <span>←</span> Back to Applications
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
