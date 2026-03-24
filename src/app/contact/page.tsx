'use client';


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContent } from '@/lib/content';
import contentData from '@/data/content.json';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker, 
  HiClock,
  HiCheckCircle
} from 'react-icons/hi';



export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please provide a valid email address');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    setLoading(true);

    // Use formsubmit.co API
    try {
      const response = await fetch('https://formsubmit.co/ajax/gamesaadesh@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const data = await response.json();
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true);
        setShowToast(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          setShowToast(false);
        }, 4000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const [content, setContent] = useState(contentData);
  
  useEffect(() => {
    setContent(getContent());
  }, []);

  const contact = content.contact;
  const mapLocationQuery = 'RXF8+G3, Gangewadi, Maharashtra 413002';

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      {/* Header Section with Background Image */}
      <div 
        className="relative py-20 mb-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/imageforheader.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Toast message for success */}
              {showToast && (
                <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                  <span className="text-xl">✓</span>
                  <span>Thank you! We've received your message and will get back to you soon.</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262f68] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262f68] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262f68] focus:border-transparent"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262f68] focus:border-transparent"
                  placeholder="Your message (optional)"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  loading
                    ? 'bg-slate-400 text-white cursor-not-allowed'
                    : 'bg-[#262f68] text-white hover:shadow-lg border border-[#262f68]'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-[#f0f4f8] rounded-lg mr-4 group-hover:bg-[#e8ecf5] transition-colors">
                    <HiMail className="w-6 h-6 text-[#262f68]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:akshay@pppatel.co.in" className="text-[#262f68] hover:underline">
                        akshay@pppatel.co.in
                      </a>
                      <a href="mailto:marketing@pppatel.com" className="text-[#262f68] hover:underline">
                        marketing@pppatel.com
                      </a>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-[#f0f4f8] rounded-lg mr-4 group-hover:bg-[#e8ecf5] transition-colors">
                    <HiPhone className="w-6 h-6 text-[#262f68]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <a href={`tel:${contact.phone}`} className="text-[#262f68] hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-[#f0f4f8] rounded-lg mr-4 group-hover:bg-[#e8ecf5] transition-colors">
                    <HiLocationMarker className="w-6 h-6 text-[#262f68]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Address</h3>
                    <p className="text-gray-700">{contact.address}</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-[#f0f4f8] rounded-lg mr-4 group-hover:bg-[#e8ecf5] transition-colors">
                    <HiLocationMarker className="w-6 h-6 text-[#262f68]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Factory Address</h3>
                    <p className="text-gray-700">{contact.factoryAddress}</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-[#f0f4f8] rounded-lg mr-4 group-hover:bg-[#e8ecf5] transition-colors">
                    <HiClock className="w-6 h-6 text-[#262f68]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-gray-700">{contact.hours}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-[#f0f4f8] rounded-2xl shadow-xl p-8 border-2 border-[#262f68]/20">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-[#262f68] mr-3" />
                  Fast response time
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-[#262f68] mr-3" />
                  Expert consultation
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-[#262f68] mr-3" />
                  Custom solutions
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-[#262f68] mr-3" />
                  Quality guaranteed
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-xl border-2 border-slate-100"
        >
          <h2 className="text-2xl font-bold text-slate-900 px-8 pt-8 mb-4">
            <span className="text-[#262f68]">
              Our Location
            </span>
          </h2>
          <div className="px-8 pb-8">
            <iframe
              width="100%"
              height="500"
              frameBorder="0"
              style={{ border: 0, borderRadius: '0.75rem' }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocationQuery)}&output=embed`}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

