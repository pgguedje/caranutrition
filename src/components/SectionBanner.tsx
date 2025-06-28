import React from 'react';
import { motion } from 'framer-motion';

interface SectionBannerProps {
  darkMode: boolean;
  pattern?: 'geometric' | 'tribal';
}

const SectionBanner: React.FC<SectionBannerProps> = ({ darkMode, pattern = 'geometric' }) => {
  return (
    <div className={`relative h-32 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-amber-50'}`}>
      {/* Motifs africains en dur - OPACITÉ AUGMENTÉE */}
      <div className="absolute inset-0">
        {pattern === 'geometric' ? (
          // Motifs géométriques africains
          <div className="absolute inset-0 opacity-30">
            <svg width="100%\" height="100%\" viewBox="0 0 400 128\" className="w-full h-full">
              <defs>
                <pattern id="geometric\" x="0\" y="0\" width="40\" height="40\" patternUnits="userSpaceOnUse">
                  <rect width="40\" height="40\" fill="none"/>
                  <circle cx="20\" cy="20\" r="8\" fill={darkMode ? '#F59E0B' : '#EA580C'} opacity="0.6"/>
                  <polygon points="20,5 30,15 20,25 10,15" fill={darkMode ? '#EF4444' : '#DC2626'} opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric)"/>
            </svg>
          </div>
        ) : (
          // Motifs tribaux
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 400 128" className="w-full h-full">
              <defs>
                <pattern id="tribal" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect width="60" height="60" fill="none"/>
                  <path d="M30,10 L40,30 L30,50 L20,30 Z" fill={darkMode ? '#F59E0B' : '#EA580C'} opacity="0.5"/>
                  <circle cx="30" cy="30" r="15" fill="none" stroke={darkMode ? '#EF4444' : '#DC2626'} strokeWidth="2" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tribal)"/>
            </svg>
          </div>
        )}
      </div>
      
      {/* Overlay avec dégradé - COULEURS UNIFORMISÉES */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800/80 via-amber-900/40 to-gray-800/80' 
          : 'bg-gradient-to-r from-amber-50/80 via-orange-100/60 to-amber-50/80'
      }`} />
      
      {/* Éléments décoratifs animés - COULEURS UNIFORMISÉES */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center space-x-8">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className={`rounded-full ${
                i === 3 ? 'w-4 h-4' : 'w-3 h-3'
              } ${
                darkMode ? 'bg-amber-500' : 'bg-orange-600'
              }`}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Bordures décoratives animées - COULEURS UNIFORMISÉES */}
      <motion.div 
        className={`absolute top-0 left-0 right-0 h-1 ${
          darkMode 
            ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-orange-600 to-transparent'
        }`}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          darkMode 
            ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-orange-600 to-transparent'
        }`}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default SectionBanner;