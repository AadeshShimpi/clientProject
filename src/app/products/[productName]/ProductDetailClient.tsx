'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import FallbackImage from '@/components/FallbackImage';
import Breadcrumb from '@/components/Breadcrumb';
import CharacteristicsSection from '@/components/CharacteristicsSection';
import contentData from '@/data/content.json';
import { 
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface ProductType {
  name: string;
  description: string;
  image?: string;
  characteristics: string[];
  applications: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription?: string;
  image: string;
  categories?: string[];
  types?: ProductType[];
}

interface ProductDetailClientProps {
  product?: Product;
  resolvedParams: {
    productName: string;
  };
}

// Map to cycle through icons for product types
const typeIcons = [CheckCircleIcon];

export default function ProductDetailClient({ product, resolvedParams }: ProductDetailClientProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getIconForType = (index: number) => {
    return typeIcons[index % typeIcons.length];
  };

  // Get related products
  const relatedProducts = product ? contentData.products.filter((p: Product) => p.id !== product.id) : [];
  const itemsPerPage = 3;
  const totalPages = relatedProducts.length > 0 ? Math.ceil(relatedProducts.length / itemsPerPage) : 1;
  const currentProducts = relatedProducts.slice(
    carouselIndex * itemsPerPage,
    (carouselIndex + 1) * itemsPerPage
  );

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left - next
        handleNextCarousel();
      } else {
        // Swiped right - previous
        handlePrevCarousel();
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-2">The product you're looking for doesn't have detailed information yet.</p>
            <p className="text-gray-500 mb-8 text-sm">Searched for: <code className="bg-gray-100 px-2 py-1 rounded">{decodeURIComponent(resolvedParams.productName)}</code></p>
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
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Header with Redesigned Layout */}
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
              {product.name}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full mb-6 origin-left lg:origin-left mx-auto lg:mx-0"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left mb-8"
            >
              {product.detailedDescription || product.description}
            </motion.p>

            {/* Key Features / Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              {product.types && product.types.length > 1 && (
                  <div className="text-center lg:text-left">
                    <p className="text-sm font-semibold text-[#937e4f] uppercase tracking-wide flex items-center justify-center lg:justify-start gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Available Grades
                    </p>
                    <p className="text-gray-700 mt-1">{product.types.length} premium product grades</p>
                  </div>
                )}
            </motion.div>
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
                src={product.image}
                alt={product.name}
                fill
                priority={true}
                fallbackColor="bg-[#f0f4f8]"
                fallbackText={product.name}
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Characteristics and Applications Section */}
      {product.types && product.types.length > 0 && ['Tin Powders', 'Zinc Powders', 'Copper Infiltrants', 'Brass Powders', 'Custom Metal Powders'].includes(product.name) && (
        <CharacteristicsSection
          characteristics={product.types[0]?.characteristics}
          applications={product.types[0]?.applications}
        />
      )}

      {/* Product Types Section - Hexagon Image View */}
      {product.types && product.types.length > 0 && !['Tin Powders', 'Zinc Powders', 'Copper Infiltrants', 'Brass Powders', 'Custom Metal Powders'].includes(product.name) && (
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
                Product Types & Grades
              </h2>
              <div className="h-1 w-12 bg-gradient-to-l from-cyan-400 to-[#937e4f] rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.types.map((type, index) => {
                const IconComponent = getIconForType(index);
                return (
                  <motion.div
                    key={`hex-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(34, 47, 104, 0.15)' }}
                    className="bg-gradient-to-br from-white via-slate-50 to-[#f9f7f4] rounded-2xl shadow-md border-2 border-[#d6ccb5] hover:border-[#937e4f] transition-all overflow-hidden group flex flex-col md:flex-row items-stretch"
                  >

                    {/* Right Side: Content - 60% width */}
                    <Link 
                      href={`/products/${encodeURIComponent(product.name)}/${encodeURIComponent(type.name)}`}
                      className="flex-1 block"
                    >
                      <div className="p-8 md:p-8 h-full flex flex-col justify-between">
                        {/* Type Name */}
                        <div>
                          <h3 className="text-2xl md:text-xl font-bold text-[#262f68] mb-3 group-hover:text-cyan-500 transition-colors">
                            {type.name}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {type.description}
                          </p>
                        </div>

                        {/* View Details Link */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className="flex items-center gap-2 text-cyan-500 font-semibold group-hover:gap-4 transition-all mt-12"
                        >
                          <span>View Details</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 border-t border-gray-200">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#262f68] mb-12 text-center"
        >
          Other Products
        </motion.h2>

        <div className="relative">
          {/* Carousel Container */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentProducts.map((relatedProduct: Product, index: number) => {
              return (
                <Link 
                  key={relatedProduct.id}
                  href={`/products/${encodeURIComponent(relatedProduct.name)}`}
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
                      <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 relative min-h-[240px] max-h-[240px]">
                        <FallbackImage
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="object-contain w-full h-full max-w-[240px] max-h-[240px] mx-auto my-auto"
                          fallbackColor="bg-gray-50"
                          fallbackText={relatedProduct.name}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#262f68] text-center mt-6 mb-4 line-clamp-2 w-full">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-base text-[#4a5568] text-center line-clamp-4 w-full">
                        {relatedProduct.description}
                      </p>
                    </div>

                    {/* Learn More Button - Hidden by default, shows on hover anywhere on card */}
                    <motion.button
                      className="flex items-center justify-center gap-2 mt-6 text-cyan-500 font-bold hover:text-cyan-600 transition-all duration-300 whitespace-nowrap opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <span>Learn More</span>
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
              );
            })}
          </div>

          {/* Navigation Arrows - Visible only on desktop and when there are multiple pages */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrevCarousel}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-[#262f68] hover:bg-cyan-400 text-white hover:text-[#262f68] rounded-full items-center justify-center transition-all z-10"
                aria-label="Previous products"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextCarousel}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-[#262f68] hover:bg-cyan-400 text-white hover:text-[#262f68] rounded-full items-center justify-center transition-all z-10"
                aria-label="Next products"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Dots Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full transition-all ${
                    carouselIndex === idx 
                      ? 'bg-cyan-400 w-3 h-3' 
                      : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
