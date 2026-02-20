'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import { 
  SparklesIcon, 
  Cog6ToothIcon, 
  LightBulbIcon, 
  BeakerIcon,
  CircleStackIcon,
  CubeTransparentIcon,
  Squares2X2Icon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Hero() {
  const [content, setContent] = useState(contentData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax scroll for background and content
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bubbleOneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bubbleTwoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bubbleThreeY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const sandY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const sparkleY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const powderY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const snowY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  const homeImages = [
    '/images/home-page1.jpg',
    '/images/home-page2.jpg',
    '/images/home-page3.jpg',
    '/images/home-page4.jpg',
  ];

  const heroOneLiners = [
    "Creating value through sustainability",
    "Powering innovation with precision",
    "Excellence in every particle",
    "Engineering the future of manufacturing"
  ];

  // Map products to icons
  const getProductIcon = (name: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Iron and Iron based alloy Powders': Squares2X2Icon,
      'Copper Powders': SparklesIcon,
      'Tin Powders': CubeTransparentIcon,
      'Zinc Powders': BoltIcon,
      'Bronze Powders': CircleStackIcon,
      'Brass Powders': Cog6ToothIcon,
      'Copper Infiltrants': LightBulbIcon,
      'Custom Metal Powders': BeakerIcon,
    };
    return iconMap[name] || CircleStackIcon;
  };

  const products = content.products.map(product => ({
    name: product.name,
    icon: getProductIcon(product.name)
  }));

  const socialLinks = [
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
  ];

  useEffect(() => {
    setContent(getContent());
  }, []);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % homeImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [homeImages.length]);

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
        // Swiped left - next image
        setCurrentImageIndex((prev) => (prev + 1) % homeImages.length);
      } else {
        // Swiped right - previous image
        setCurrentImageIndex((prev) => (prev - 1 + homeImages.length) % homeImages.length);
      }
    }
  };

  const hero = content.hero;

  // Predefined sand streams to avoid hydration issues
  const sandStreams = [
    { left: '6%', color: '#c0c0c0', delay: 0.0, duration: 7 },
    { left: '12%', color: '#d4af37', delay: 0.4, duration: 8 },
    { left: '18%', color: '#b87333', delay: 0.8, duration: 9 },
    { left: '24%', color: '#d4af37', delay: 0.2, duration: 7.5 },
    { left: '30%', color: '#c0c0c0', delay: 0.6, duration: 8.5 },
    { left: '36%', color: '#b87333', delay: 1.0, duration: 9.5 },
    { left: '42%', color: '#d4af37', delay: 0.3, duration: 7.2 },
    { left: '48%', color: '#c0c0c0', delay: 0.7, duration: 8.8 },
    { left: '54%', color: '#b87333', delay: 1.1, duration: 9.8 },
    { left: '60%', color: '#d4af37', delay: 0.5, duration: 7.4 },
    { left: '66%', color: '#c0c0c0', delay: 0.9, duration: 8.6 },
    { left: '72%', color: '#b87333', delay: 1.3, duration: 9.4 },
    { left: '78%', color: '#d4af37', delay: 0.1, duration: 7.1 },
    { left: '84%', color: '#c0c0c0', delay: 0.55, duration: 8.3 },
    { left: '90%', color: '#b87333', delay: 0.95, duration: 9.1 },
  ];

  const sparkles = [
    { left: '12%', top: '10%', color: '#f8e7c3', delay: 0.2, duration: 3.2, size: 6 },
    { left: '25%', top: '20%', color: '#ffe4a3', delay: 0.6, duration: 2.8, size: 5 },
    { left: '35%', top: '8%', color: '#fff2cc', delay: 0.4, duration: 3.5, size: 7 },
    { left: '48%', top: '18%', color: '#f7d7a8', delay: 0.9, duration: 3.1, size: 6 },
    { left: '58%', top: '12%', color: '#ffe7a8', delay: 0.3, duration: 2.9, size: 5 },
    { left: '68%', top: '22%', color: '#f0e6d2', delay: 0.7, duration: 3.6, size: 7 },
    { left: '78%', top: '9%', color: '#f5ddae', delay: 0.5, duration: 3.0, size: 6 },
    { left: '88%', top: '16%', color: '#fff4cc', delay: 1.0, duration: 3.4, size: 5 },
  ];

  const powderSpecs = [
    { left: '5%', size: 3, delay: 0.1, duration: 6.5 },
    { left: '10%', size: 4, delay: 0.4, duration: 7.0 },
    { left: '15%', size: 3, delay: 0.7, duration: 6.0 },
    { left: '20%', size: 2, delay: 1.0, duration: 6.8 },
    { left: '25%', size: 3, delay: 0.2, duration: 7.2 },
    { left: '30%', size: 2, delay: 0.5, duration: 6.3 },
    { left: '35%', size: 3, delay: 0.8, duration: 7.5 },
    { left: '40%', size: 4, delay: 0.3, duration: 6.7 },
    { left: '45%', size: 2, delay: 0.6, duration: 7.1 },
    { left: '50%', size: 3, delay: 0.9, duration: 6.9 },
    { left: '55%', size: 4, delay: 0.15, duration: 7.4 },
    { left: '60%', size: 3, delay: 0.45, duration: 6.6 },
    { left: '65%', size: 2, delay: 0.75, duration: 7.3 },
    { left: '70%', size: 3, delay: 0.25, duration: 6.4 },
    { left: '75%', size: 4, delay: 0.55, duration: 7.2 },
    { left: '80%', size: 3, delay: 0.85, duration: 6.5 },
    { left: '85%', size: 2, delay: 0.35, duration: 7.0 },
    { left: '90%', size: 3, delay: 0.65, duration: 6.8 },
    { left: '95%', size: 4, delay: 0.95, duration: 7.1 },
  ];

  // Snowflakes with varying sizes and speeds
  const snowflakes = [
    { left: '3%', size: 4, delay: 0, duration: 10, drift: -2 },
    { left: '8%', size: 6, delay: 0.3, duration: 12, drift: 3 },
    { left: '13%', size: 5, delay: 0.6, duration: 11, drift: -1 },
    { left: '18%', size: 4, delay: 0.9, duration: 13, drift: 2 },
    { left: '23%', size: 7, delay: 0.2, duration: 9, drift: -3 },
    { left: '28%', size: 5, delay: 0.5, duration: 14, drift: 1 },
    { left: '33%', size: 6, delay: 0.8, duration: 10, drift: -2 },
    { left: '38%', size: 4, delay: 1.1, duration: 12, drift: 2 },
    { left: '43%', size: 5, delay: 0.1, duration: 11, drift: -1 },
    { left: '48%', size: 7, delay: 0.4, duration: 13, drift: 3 },
    { left: '53%', size: 5, delay: 0.7, duration: 10, drift: -2 },
    { left: '58%', size: 6, delay: 1.0, duration: 12, drift: 1 },
    { left: '63%', size: 4, delay: 0.2, duration: 11, drift: -3 },
    { left: '68%', size: 5, delay: 0.5, duration: 14, drift: 2 },
    { left: '73%', size: 6, delay: 0.8, duration: 9, drift: -1 },
    { left: '78%', size: 7, delay: 1.1, duration: 13, drift: 3 },
    { left: '83%', size: 5, delay: 0.3, duration: 10, drift: -2 },
    { left: '88%', size: 4, delay: 0.6, duration: 12, drift: 1 },
    { left: '93%', size: 6, delay: 0.9, duration: 11, drift: -1 },
    { left: '98%', size: 5, delay: 0.15, duration: 13, drift: 2 },
    { left: '7%', size: 5, delay: 1.2, duration: 10, drift: -2 },
    { left: '17%', size: 6, delay: 1.5, duration: 12, drift: 3 },
    { left: '27%', size: 4, delay: 1.8, duration: 11, drift: -1 },
    { left: '37%', size: 7, delay: 0.25, duration: 9, drift: 2 },
    { left: '47%', size: 5, delay: 0.55, duration: 14, drift: -3 },
    { left: '57%', size: 6, delay: 0.85, duration: 10, drift: 1 },
    { left: '67%', size: 4, delay: 1.15, duration: 12, drift: -2 },
    { left: '77%', size: 5, delay: 1.45, duration: 11, drift: 2 },
    { left: '87%', size: 7, delay: 1.75, duration: 13, drift: -1 },
    { left: '97%', size: 5, delay: 0.35, duration: 10, drift: 3 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#262f68]/30 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          style={{ y: bubbleOneY }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          style={{ y: bubbleTwoY }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          style={{ y: bubbleThreeY }}
          animate={{
            scale: [1, 1.3, 1],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Parallax Sand Streams */}
        <motion.div
          style={{ y: sandY }}
          className="absolute inset-0 pointer-events-none"
        >
          {sandStreams.map((stream, idx) => (
            <motion.div
              key={idx}
              className="absolute top-[-30%] w-[3px] rounded-full opacity-80 blur-[0.5px]"
              style={{
                left: stream.left,
                backgroundImage: `linear-gradient(to bottom, ${stream.color}, transparent)`,
                height: '50vh',
              }}
              animate={{
                y: ['-30vh', '120vh'],
                opacity: [0, 0.9, 0.8, 0],
                scaleY: [0.9, 1.05, 1.05, 0.95],
              }}
              transition={{
                duration: stream.duration,
                repeat: Infinity,
                delay: stream.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Powder particles falling with the lines */}
        <motion.div
          style={{ y: powderY }}
          className="absolute inset-0 pointer-events-none"
        >
          {powderSpecs.map((p, idx) => (
            <motion.div
              key={idx}
              className="absolute top-[-15%] rounded-full"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(212,175,55,0.6) 60%, rgba(128,82,30,0.5) 100%)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
                opacity: 0.9,
              }}
              animate={{
                y: ['-15vh', '120vh'],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0, 0.85, 0.75, 0],
                scale: [0.9, 1.1, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Sparkles to enhance falling sand */}
        <motion.div
          style={{ y: sparkleY }}
          className="absolute inset-0 pointer-events-none"
        >
          {sparkles.map((sp, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full shadow-sm"
              style={{
                left: sp.left,
                top: sp.top,
                width: sp.size,
                height: sp.size,
                background: `radial-gradient(circle, ${sp.color} 0%, rgba(255,255,255,0.6) 60%, transparent 100%)`,
                boxShadow: `0 0 10px ${sp.color}`,
                opacity: 0.85,
              }}
              animate={{
                y: [0, 20, 0],
                scale: [0.9, 1.2, 0.9],
                opacity: [0.5, 1, 0.6],
              }}
              transition={{
                duration: sp.duration,
                repeat: Infinity,
                delay: sp.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Snow Effect */}
        <motion.div
          style={{ y: snowY }}
          className="absolute inset-0 pointer-events-none"
        >
          {snowflakes.map((snow, idx) => (
            <motion.div
              key={`snow-${idx}`}
              className="absolute top-[-5%]"
              style={{
                left: snow.left,
                width: snow.size,
                height: snow.size,
              }}
              animate={{
                y: ['-5vh', '120vh'],
                x: [0, snow.drift * 20, snow.drift * 40],
                rotate: [0, 360],
                opacity: [0, 0.9, 0.8, 0],
                scale: [0.8, 1, 0.9],
              }}
              transition={{
                duration: snow.duration,
                repeat: Infinity,
                delay: snow.delay,
                ease: 'linear',
              }}
            >
              {/* Snowflake shape using CSS */}
              <div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {homeImages.map((image, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === idx ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <img
              src={image}
              alt={`P.P. Patel Metal Powders Pvt LtdPvt Ltd - ${idx + 1}`}
              className="w-full h-full"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                width: '100%',
                height: '100%'
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/60 z-10"></div>
      </div>

      {/* Left Side Content */}
      <Link href="/products">
        <div className="absolute left-0 top-32 z-20 text-white px-8 md:px-16 cursor-pointer">
          <motion.h1
            key={currentImageIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold leading-tight max-w-xl hover:text-cyan-400 transition-colors"
          >
            {heroOneLiners[currentImageIndex].split(' ').map((word, idx) => {
              const highlightWords = ['value', 'precision', 'particle', 'future'];
              const isHighlight = highlightWords.some(h => word.toLowerCase().includes(h.toLowerCase()));
              return (
                <span key={idx}>
                  {isHighlight ? (
                    <span className="text-cyan-400">{word}</span>
                  ) : (
                    word
                  )}{' '}
                </span>
              );
            })}
          </motion.h1>
        </div>
      </Link>

      {/* Right Side Products - Desktop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block pr-4 xl:pr-8 w-96">
        <div className="flex flex-col gap-4 bg-black/20 backdrop-blur-sm rounded-2xl p-4 max-h-screen overflow-y-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white font-bold text-lg mb-2 sticky top-0 bg-black/30 py-2 px-2 rounded-lg"
          >
            Our Products
          </motion.div>
          <div className="flex flex-col gap-3">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Link key={index} href={`/products/${encodeURIComponent(product.name)}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                    whileHover={{ x: 8, boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)' }}
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 hover:shadow-2xl transition-all cursor-pointer group w-full"
                  >
                    <Icon className="w-6 h-6 text-slate-900 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-slate-900 text-sm line-clamp-2">{product.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Bottom Section - Centered */}
      <div className="absolute left-0 right-0 z-20 lg:hidden w-full px-3 sm:px-4 flex flex-col items-center gap-5" style={{ bottom: '1.5rem' }}>
        {/* Product Icons with Labels */}
        <div className="w-full">
          <div className="text-white font-bold text-base mb-3 text-center">
            Our Products
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Link key={index} href={`/products/${encodeURIComponent(product.name)}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all group"
                    title={product.name}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 group-hover:scale-110 transition-transform" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Social Media Icons */}
        {/* <div className="flex gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 flex items-center justify-center text-slate-900 shadow-lg hover:shadow-xl transition-shadow"
                aria-label={social.label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            );
          })}
        </div> */}

        {/* Image Slider Dots */}
        <div className="flex gap-2.5">
          {homeImages.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all ${
                currentImageIndex === idx 
                  ? 'bg-cyan-400 w-7 h-2.5' 
                  : 'bg-white/50 hover:bg-white w-2.5 h-2.5'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Bottom Controls */}
      <div className="hidden lg:block">
        {/* Bottom Image Slider Controls - Left */}
        <div className="absolute bottom-8 left-8 z-20 flex gap-3">
          {homeImages.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImageIndex === idx 
                  ? 'bg-cyan-400 w-8' 
                  : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      >
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function SocialMediaBar() {
  const socialLinks = [
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
  ];

}

