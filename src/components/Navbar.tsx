'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import contentData from '@/data/content.json';
import { applications } from '@/lib/applications';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isApplicationDropdownOpen, setIsApplicationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Applications', href: '/applications' },
    { name: 'Technology', href: '/technology' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-100' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            role="link"
            tabIndex={0}
            onClick={() => {
              router.push('/');
              setIsMobileMenuOpen(false);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {
              router.push('/');
              setIsMobileMenuOpen(false);
            }}}
            className="flex items-center cursor-pointer"
            aria-label="Go to home"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/logotest.jpg"
                alt="P.P. Patel"
                width={200}
                height={100}
                className="h-18 w-auto"
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.name === 'Products' ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                  >
                    <Link href={link.href}>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-gray-700 font-light text-base tracking-wide transition-all duration-300 relative hover:text-[#262f68] cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                      >
                        <span className="inline-flex items-center gap-2 text-sm">
                          {link.name}
                          <svg
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProductDropdownOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#262f68] group-hover:w-full transition-all duration-300" />
                      </motion.button>
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence mode="wait">
                      {isProductDropdownOpen && (
                        <motion.div
                          key="dropdown"
                          initial={{ opacity: 0, y: -15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.95 }}
                          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 }, scale: { duration: 0.5 } }}
                          className="absolute left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                        >
                          {contentData.products.map((product, idx, arr) => (
                            <Link
                              key={product.id}
                              href={`/products/${encodeURIComponent(product.name)}`}
                              onClick={() => setIsProductDropdownOpen(false)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, duration: 0.25 }}
                                whileHover={{ backgroundColor: '#f5f8fb' }}
                                className="px-4 py-3 cursor-pointer transition-all text-[#262f68]"
                                style={{ 
                                  fontFamily: 'Outfit, sans-serif', 
                                  fontSize: '16px', 
                                  fontWeight: 300,
                                  borderBottom: idx < arr.length - 1 ? '1px solid #d1d5db' : 'none'
                                }}
                              >
                                {product.name}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.name === 'Applications' ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setIsApplicationDropdownOpen(true)}
                    onMouseLeave={() => setIsApplicationDropdownOpen(false)}
                  >
                    <Link href={link.href}>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-gray-700 font-light text-base tracking-wide transition-all duration-300 relative hover:text-[#262f68] cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                      >
                        <span className="inline-flex items-center gap-2 text-sm">
                          {link.name}
                          <svg
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isApplicationDropdownOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#262f68] group-hover:w-full transition-all duration-300" />
                      </motion.button>
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence mode="wait">
                      {isApplicationDropdownOpen && (
                        <motion.div
                          key="applications-dropdown"
                          initial={{ opacity: 0, y: -15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.95 }}
                          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 }, scale: { duration: 0.5 } }}
                          className="absolute left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                        >
                          {applications.map((app, idx, arr) => (
                            <Link
                              key={app.id}
                              href={`/applications/${app.slug}`}
                              onClick={() => setIsApplicationDropdownOpen(false)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, duration: 0.25 }}
                                whileHover={{ backgroundColor: '#f5f8fb' }}
                                className="px-4 py-3 cursor-pointer transition-all text-[#262f68]"
                                style={{ 
                                  fontFamily: 'Outfit, sans-serif', 
                                  fontSize: '16px', 
                                  fontWeight: 300,
                                  borderBottom: idx < arr.length - 1 ? '1px solid #d1d5db' : 'none'
                                }}
                              >
                                {app.title}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={link.href}>
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-gray-700 font-light text-base tracking-wide transition-all duration-300 relative group hover:text-[#262f68] cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#262f68] group-hover:w-full transition-all duration-300" />
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name === 'Products' ? (
                    <div>
                      <div
                        className="w-full px-4 py-3 rounded-xl text-[#262f68] font-light text-base tracking-wide hover:bg-gradient-to-r hover:from-[#262f68]/5 hover:to-cyan-400/5 transition-all border-2 border-transparent hover:border-[#262f68]/20 flex justify-between items-center"
                        style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                      >
                        <Link
                          href="/products"
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex-1"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsProductDropdownOpen(!isProductDropdownOpen);
                          }}
                          className="text-cyan-400 p-1 cursor-pointer"
                        >
                          <motion.span
                            animate={{ rotate: isProductDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.span>
                        </button>
                      </div>
                      {isProductDropdownOpen && (
                        <motion.div
                          key="mobile-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ opacity: { duration: 0.8 }, height: { duration: 0.8 } }}
                          className="mt-2"
                        >
                          {contentData.products.map((product, idx, arr) => (
                            <Link
                              key={product.id}
                              href={`/products/${encodeURIComponent(product.name)}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsProductDropdownOpen(false);
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, duration: 0.25 }}
                                whileHover={{ backgroundColor: '#f5f8fb' }}
                                className="px-4 py-3 cursor-pointer transition-all text-[#262f68]"
                                style={{ 
                                  fontFamily: 'Outfit, sans-serif', 
                                  fontSize: '16px', 
                                  fontWeight: 300,
                                  borderBottom: idx < arr.length - 1 ? '1px solid #d1d5db' : 'none'
                                }}
                              >
                                {product.name}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : link.name === 'Applications' ? (
                    <div>
                      <div
                        className="w-full px-4 py-3 rounded-xl text-[#262f68] font-light text-base tracking-wide hover:bg-gradient-to-r hover:from-[#262f68]/5 hover:to-cyan-400/5 transition-all border-2 border-transparent hover:border-[#262f68]/20 flex justify-between items-center"
                        style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                      >
                        <Link
                          href="/applications"
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex-1"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsApplicationDropdownOpen(!isApplicationDropdownOpen);
                          }}
                          className="text-cyan-400 p-1 cursor-pointer"
                        >
                          <motion.span
                            animate={{ rotate: isApplicationDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.span>
                        </button>
                      </div>
                      {isApplicationDropdownOpen && (
                        <motion.div
                          key="mobile-applications-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ opacity: { duration: 0.8 }, height: { duration: 0.8 } }}
                          className="mt-2"
                        >
                          {applications.map((app, idx, arr) => (
                            <Link
                              key={app.id}
                              href={`/applications/${app.slug}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsApplicationDropdownOpen(false);
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, duration: 0.25 }}
                                whileHover={{ backgroundColor: '#f5f8fb' }}
                                className="px-4 py-3 cursor-pointer transition-all text-[#262f68]"
                                style={{ 
                                  fontFamily: 'Outfit, sans-serif', 
                                  fontSize: '16px', 
                                  fontWeight: 300,
                                  borderBottom: idx < arr.length - 1 ? '1px solid #d1d5db' : 'none'
                                }}
                              >
                                {app.title}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-3 rounded-lg text-gray-700 font-light text-base tracking-wide hover:bg-gray-100 hover:text-[#262f68] transition-all cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 300 }}
                      >
                        {link.name}
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

