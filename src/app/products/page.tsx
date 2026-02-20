'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import ProductCarousel from '@/components/ProductCarousel';
import FallbackImage from '@/components/FallbackImage';

export default function ProductsPage() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const products = content.products;

  return (
    <div className="min-h-screen pt-20 pb-20 bg-white">
      {/* Product Carousel */}
      <div className="w-full h-[75vh] md:h-[85vh] -mt-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex items-center p-8 md:p-12 bg-[#262f68]">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              <span className="text-white">Our </span>
              <span className="text-[#d6ccb5]">Products</span>
            </motion.h1>
          </div>
        </div>

        <div className="relative w-full h-full">
          <FallbackImage
            src="/images/productspage.jpg"
            alt="Our Products"
            fill
            priority
            fallbackColor="bg-gradient-to-br from-[#1e2a5f] to-[#2d3a7a]"
            fallbackText="Our Products"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
      <ProductCarousel products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        {/* Product Grid for Mobile/Tablet */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:hidden lg:grid">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 bg-[#f0f4f8]">
                <FallbackImage
                  src={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  fallbackColor="bg-[#f0f4f8]"
                  fallbackText={product.name}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-[#262f68] text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm border border-[#262f68]"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
