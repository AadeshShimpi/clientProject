'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface CharacteristicsSectionProps {
  characteristics?: string[];
  applications?: string[];
}

export default function CharacteristicsSection({
  characteristics,
  applications,
}: CharacteristicsSectionProps) {
  if (!characteristics && !applications) {
    return null;
  }

  return (
    <div className="py-16 border-t-2 border-b-2 border-[#d6ccb5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Characteristics Section */}
          {characteristics && characteristics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full" />
                <h2 className="text-3xl font-bold text-[#262f68] whitespace-nowrap">
                  Characteristics
                </h2>
              </div>

              <div className="space-y-4">
                {characteristics.map((characteristic, index) => (
                  <motion.div
                    key={`char-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f9f7f4] to-white rounded-lg border-l-4 border-cyan-400 hover:shadow-md transition-all"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-base leading-relaxed">
                      {characteristic}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Applications Section */}
          {applications && applications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-[#937e4f] rounded-full" />
                <h2 className="text-3xl font-bold text-[#262f68] whitespace-nowrap">
                  Applications
                </h2>
              </div>

              <div className="space-y-4">
                {applications.map((application, index) => (
                  <motion.div
                    key={`app-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-[#f9f7f4] rounded-lg border-l-4 border-[#937e4f] hover:shadow-md transition-all"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-[#937e4f] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-base leading-relaxed">
                      {application}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
