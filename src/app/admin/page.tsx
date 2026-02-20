'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentData from '@/data/content.json';

export default function AdminPage() {
  const [content, setContent] = useState(contentData);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    // Load saved content from localStorage if available
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Error loading saved content:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('websiteContent', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedContent = JSON.parse(event.target?.result as string);
          setContent(importedContent);
          localStorage.setItem('websiteContent', JSON.stringify(importedContent));
          alert('Content imported successfully!');
        } catch (error) {
          alert('Error importing file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const updateField = (path: string[], value: any) => {
    setContent((prev) => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const updateArrayField = (path: string[], index: number, field: string, value: any) => {
    setContent((prev) => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (const key of path) {
        current = current[key];
      }
      current[index] = { ...current[index], [field]: value };
      return newContent;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <div className="flex gap-4">
              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export JSON
              </button>
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b">
            {['hero', 'features', 'products', 'about', 'contact', 'site'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => updateField(['hero', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) => updateField(['hero', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={content.hero.description}
                  onChange={(e) => updateField(['hero', 'description'], e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA</label>
                  <input
                    type="text"
                    value={content.hero.cta.primary}
                    onChange={(e) => updateField(['hero', 'cta', 'primary'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA</label>
                  <input
                    type="text"
                    value={content.hero.cta.secondary}
                    onChange={(e) => updateField(['hero', 'cta', 'secondary'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {content.features.map((feature: any, index: number) => (
                <div key={feature.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Feature {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateArrayField(['features'], index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={feature.description}
                        onChange={(e) => updateArrayField(['features'], index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon (emoji or text)</label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) => updateArrayField(['features'], index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Section */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {content.products.map((product: any, index: number) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Product {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateArrayField(['products'], index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={product.description}
                        onChange={(e) => updateArrayField(['products'], index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Path</label>
                      <input
                        type="text"
                        value={product.image}
                        onChange={(e) => updateArrayField(['products'], index, 'image', e.target.value)}
                        placeholder="/product-image.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Place images in /public folder</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* About Section */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => updateField(['about', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={content.about.description}
                  onChange={(e) => updateField(['about', 'description'], e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Values (comma-separated)</label>
                <input
                  type="text"
                  value={content.about.values.join(', ')}
                  onChange={(e) => updateField(['about', 'values'], e.target.value.split(', ').filter(v => v))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) => updateField(['contact', 'email'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={content.contact.phone}
                  onChange={(e) => updateField(['contact', 'phone'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={content.contact.address}
                  onChange={(e) => updateField(['contact', 'address'], e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                <input
                  type="text"
                  value={content.contact.hours}
                  onChange={(e) => updateField(['contact', 'hours'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Site Settings */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={content.site.name}
                  onChange={(e) => updateField(['site', 'name'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={content.site.tagline}
                  onChange={(e) => updateField(['site', 'tagline'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={content.site.description}
                  onChange={(e) => updateField(['site', 'description'], e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


