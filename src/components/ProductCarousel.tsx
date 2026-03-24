'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FallbackImage from './FallbackImage';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  categories?: string[];
  types?: {
    name: string;
    description: string;
    characteristics?: string[];
    applications?: string[];
    image?: string;
    variants?: { name: string; description?: string }[];
  }[];
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const router = useRouter();

  return (
    <div className="relative w-full mt-20 md:mt-28 px-4 sm:px-6 lg:px-8">
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {products.map((product, index) => (
          <div
            key={product.id}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/products/${encodeURIComponent(product.name)}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') router.push(`/products/${encodeURIComponent(product.name)}`);
            }}
            className="group cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              {/* Product Card - Horizontal Layout */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative h-auto md:h-72 flex flex-col md:flex-row">
                {/* Image Container: 40% width on desktop, full width on mobile */}
                <div className="relative w-full md:w-[40%] h-48 md:h-full bg-[#f0f4f8] overflow-hidden flex-shrink-0">
                  <FallbackImage
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    fallbackColor="bg-[#f0f4f8]"
                    fallbackText={product.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content Container: 60% width on desktop */}
                <div className="w-full md:w-[60%] p-4 md:p-6 lg:p-7 flex flex-col justify-between">
                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                  >
                    <h3 className="text-lg md:text-2xl font-bold text-[#262f68] mb-2 md:mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                  </motion.div>

                  {/* Available Grades & products section */}
                  {(() => {
                    const allGrades = product.types && product.types.length > 0
                      ? product.types.map(t => t.name).filter((name): name is string => !!name)
                      : [];

                    if (allGrades.length <= 1) return null;

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className="flex-1 flex flex-col justify-end min-h-20"
                      >
                        <p className="text-xs md:text-sm font-semibold text-[#d6ccb5] mb-2 md:mb-3 uppercase tracking-wide">
                          Available Grades & Products
                        </p>

                        {/* Grades Pills */}
                        <div className="flex flex-wrap gap-2 w-full">
                          {allGrades.slice(0, 6).map((g, gradeIndex) => (
                            <Link
                              href={`/products/${encodeURIComponent(product.name)}/${encodeURIComponent(g)}`}
                              key={g}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <motion.a
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + gradeIndex * 0.05 }}
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#e6f2ff] to-[#dbeafe] text-xs text-[#262f68] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-md border border-[#bfdbfe] hover:shadow-lg transform-gpu transition-all font-medium whitespace-nowrap"
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 flex-shrink-0">
                                  <path d="M5 12h14M13 5l7 7-7 7" stroke="#262f68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="truncate">{g}</span>
                              </motion.a>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
