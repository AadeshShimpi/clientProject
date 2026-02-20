'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker 
} from 'react-icons/hi';
import { 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter 
} from 'react-icons/fa';

export default function Footer() {
  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const { site, contact, social } = content;

  const containerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: 'beforeChildren' } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.footer
      className="bg-[#262f68] text-white py-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8" variants={containerVariants}>
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4 text-white">
              {site.footerName}
            </h3>
            <p className='text-gray-300 font-bold mb-2'>We are ISO 9001:2015 Certified</p>
            <p className="text-gray-300">{site.description}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <HiMail className="w-4 h-4 mr-2 text-white" />
                {contact.email}
              </li>
              <li className="flex items-center">
                <HiPhone className="w-4 h-4 mr-2 text-white" />
                {contact.phone}
              </li>
              <li className="flex items-start text-sm">
                <HiLocationMarker className="w-4 h-4 mr-2 text-white mt-1 flex-shrink-0" />
                {contact.address}
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-[#262f68] transition-all"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-[#262f68] transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-[#262f68] transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-300" variants={itemVariants}>
          <p>&copy; {new Date().getFullYear()} {site.footerName}. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

