'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import FallbackImage from '@/components/FallbackImage';

export default function Products() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const products = content.products;

  return (
    <section className="py-10 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#262f68] mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            High-quality powders for diverse industrial applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link 
              key={product.id}
              href={`/products/${encodeURIComponent(product.name)}`}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative min-h-96 rounded-2xl overflow-hidden transition-all duration-300 group bg-white p-6 flex flex-col items-center justify-between border border-transparent hover:shadow-2xl"
              >
                {/* Content - Always Visible */}
                <div className="flex flex-col items-center flex-1 justify-center gap-2 p-0 m-0 w-full">
                  <div className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 relative min-h-[240px] max-h-[240px]">
                    <FallbackImage
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full max-w-[240px] max-h-[240px]"
                      fallbackColor="bg-gray-50"
                      fallbackText={product.name}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#262f68] text-center mt-4 mb-4 line-clamp-2 w-full">
                    {product.name}
                  </h3>
                  <p className="text-base text-[#4a5568] text-center line-clamp-4 w-full">
                    {product.description}
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
          ))}
        </div>
      </div>

    </section>
  );
}

