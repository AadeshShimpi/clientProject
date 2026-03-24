'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import FallbackImage from '@/components/FallbackImage';
import Breadcrumb from '@/components/Breadcrumb';
import contentData from '@/data/content.json';
import {
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface GradeVariant {
  name: string;
  description: string;
}

interface GradeType {
  name: string;
  description: string;
  image?: string;
  variants?: GradeVariant[];
  characteristics?: string[];
  applications?: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  image: string;
  categories?: string[];
  types?: GradeType[];
}

interface GradeDetailClientProps {
  product?: Product;
  grade?: GradeType;
  resolvedParams: {
    productName: string;
    gradeName: string;
  };
}

// Map to cycle through icons for product types
const typeIcons = [CheckCircleIcon];

export default function GradeDetailClient({ product, grade, resolvedParams }: GradeDetailClientProps) {
  const getIconForType = (index: number) => {
    return typeIcons[index % typeIcons.length];
  };

  const [expandedVariant, setExpandedVariant] = useState<number | null>(null);
  const isPlainIronPowdersPage = grade?.name?.trim().toLowerCase() === 'plain iron powders';
  const isIronPremixesPage =
    product?.name?.trim().toLowerCase() === 'iron and iron based alloy powders' &&
    grade?.name?.trim().toLowerCase() === 'premixes';

  if (!product || !grade) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <Link href="/products">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 mb-8 text-[#262f68] hover:text-cyan-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Products
            </motion.button>
          </Link> */}
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Grade Not Found</h1>
            <p className="text-gray-600 mb-2">The grade you're looking for doesn't have detailed information yet.</p>
            <p className="text-gray-500 mb-8 text-sm">Searched for: <code className="bg-gray-100 px-2 py-1 rounded">{decodeURIComponent(resolvedParams.gradeName)}</code></p>
            <Link href="/products">
              <button className="px-8 py-3 bg-[#262f68] text-white rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name, href: `/products/${encodeURIComponent(product.name)}` },
            { label: grade.name },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grade Header with Redesigned Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          {/* Left Side: Title, Description, and Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-[#262f68] mb-6 text-center lg:text-left"
            >
              {grade.name}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full mb-6 origin-left lg:origin-left mx-auto lg:mx-0"
            />

            {/* Product Name and Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-semibold text-[#937e4f] uppercase tracking-wide mb-4"
            >
              {product.name}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left mb-8"
            >
              {grade.description}
            </motion.p>

            {/* Key Features / Quick Info */}
            {!isIronPremixesPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="text-center lg:text-left">
                  <p className="text-sm font-semibold text-[#937e4f] uppercase tracking-wide flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    Grade Specifications
                  </p>
                  <p className="text-gray-700 mt-1">Complete technical details and applications</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d6ccb5] bg-[#f0f4f8]">
              <FallbackImage
                src={grade.image || product.image}
                alt={`${product.name} - ${grade.name}`}
                fill
                priority={true}
                fallbackColor="bg-[#f0f4f8]"
                fallbackText={`${product.name} - ${grade.name}`}
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {isIronPremixesPage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-6">Premixes Description</h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              P.P. Patel Group manufactures high-quality Premix powders designed for consistent performance in powder metallurgy component production. Our premixes are prepared by accurately blending iron powder with required alloying elements, graphite and lubricants in controlled conditions to ensure uniform composition and excellent compressibility.
            </p>

            <h3 className="text-2xl font-bold text-[#262f68] mb-5">The premix is developed to provide:</h3>
            <ul className="space-y-4 mb-8">
              {[
                'Uniform die filling and smooth compaction',
                'Stable green strength',
                'Reduced tool wear',
                'Controlled dimensional change during sintering',
                'Consistent mechanical properties in finished components',
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Each batch is processed through calibrated blending systems and tested for flow rate, apparent density, segregation resistance and chemical composition. This ensures repeatability in customer production and reliable sintering behavior.
            </p>

            <p className="text-[#262f68] font-semibold text-lg leading-relaxed">
              Custom compositions can be developed based on required density, hardness and strength.
            </p>
          </motion.div>
        </div>
      )}

      {/* Variants Section - Only show if variants exist */}
      {grade.variants && grade.variants.length > 0 && (
        <div className="mb-20 py-16 border-t-2 border-b-2 border-[#d6ccb5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-16 gap-3"
            >
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full" />
              <h2 className="text-4xl font-bold text-[#262f68] text-center">
                Available Variants / Specifications
              </h2>
              <div className="h-1 w-12 bg-gradient-to-l from-cyan-400 to-[#937e4f] rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {grade.variants.map((variant, index) => (
                <Link
                  key={index}
                  href="/contact"
                  className={`no-underline ${isPlainIronPowdersPage ? 'block h-full' : ''}`}
                  passHref
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`cursor-pointer bg-gradient-to-br from-white via-slate-50 to-[#f9f7f4] rounded-2xl p-8 shadow-lg border-2 border-[#d6ccb5] hover:border-[#937e4f] transition-all ${isPlainIronPowdersPage ? 'h-full flex flex-col' : ''}`}
                  >
                    <h3 className="text-2xl font-bold text-[#262f68] mb-4">
                      {variant.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {variant.description}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grade Details - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Characteristics */}
          {grade?.characteristics && grade.characteristics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white via-slate-50 to-[#f9f7f4] rounded-2xl p-8 shadow-lg border-2 border-[#d6ccb5]"
            >
              <h2 className="text-3xl font-bold text-[#262f68] mb-8">
                Characteristics
              </h2>
              <ul className="space-y-4">
                {grade?.characteristics?.map((char, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 text-gray-700"
                  >
                    <span className="text-cyan-400 font-bold mt-1 text-2xl flex-shrink-0">✓</span>
                    <span className="text-lg leading-relaxed">{char}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          {/* Applications */}
          {( grade?.applications && grade.applications.length > 0) && (
            <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white via-slate-50 to-[#f9f7f4] rounded-2xl p-8 shadow-lg border-2 border-[#d6ccb5]"
          >
            <h2 className="text-3xl font-bold text-[#262f68] mb-8">
              Applications
            </h2>
            <ul className="space-y-4">
              {grade.applications.map((app, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <span className="text-cyan-400 font-bold mt-1 text-2xl flex-shrink-0">•</span>
                  <span className="text-lg leading-relaxed">{app}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          )}
          
        </div>
      </div>

      {/* Other Grades Section */}
      {product.types && product.types.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 border-t border-gray-200">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#262f68] mb-12 text-center"
          >
            Other Grades of {product.name}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.types
              .filter((g) => g.name !== grade.name)
              .map((otherGrade, index) => (
                <Link
                  key={index}
                  href={`/products/${encodeURIComponent(product.name)}/${encodeURIComponent(otherGrade.name)}`}
                  className="cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative min-h-96 rounded-2xl overflow-hidden transition-all duration-300 group bg-white p-6 flex flex-col items-center justify-between border-none shadow-lg hover:shadow-2xl"
                  >
                    {/* Content - Always Visible */}
                    <div className="flex flex-col items-center flex-1 justify-center gap-2 p-0 m-0 w-full">
                      <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 relative min-h-[180px] max-h-[180px]">
                        <FallbackImage
                          src={otherGrade.image || product.image}
                          alt={otherGrade.name}
                          className="w-full h-full"
                          fallbackColor="bg-gray-50"
                          fallbackText={otherGrade.name}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#262f68] text-center mt-6 mb-4 line-clamp-2 w-full">
                        {otherGrade.name}
                      </h3>
                      <p className="text-base text-[#4a5568] text-center line-clamp-4 w-full">
                        {otherGrade.description}
                      </p>
                    </div>

                    {/* Learn More Button - Hidden by default, shows on hover anywhere on card */}
                    <motion.button
                      className="flex items-center justify-center gap-2 mt-6 text-cyan-500 font-bold hover:text-cyan-600 transition-all duration-300 whitespace-nowrap opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <span>View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
