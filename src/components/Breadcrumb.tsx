'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  darkBackground?: boolean;
}

export default function Breadcrumb({ items, darkBackground = false }: BreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 text-sm md:text-base flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-gray-400 font-light mx-1"
              >
                »
              </motion.span>
            )}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.href ? (
                <Link href={item.href}>
                  <motion.a
                    whileHover={{ color: '#06b6d4' }}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                  >
                    {item.label}
                  </motion.a>
                </Link>
              ) : (
                <span className={`font-medium ${darkBackground ? 'text-white' : 'text-gray-700'}`}>{item.label}</span>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
