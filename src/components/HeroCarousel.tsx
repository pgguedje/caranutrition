import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  darkMode: boolean;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/supermarket-949913_1280.jpg",
      alt: "Marché coloré avec fruits et légumes frais"
    },
    {
      id: 2,
      image: "/hors-doeuvre-2175326_1280.jpg",
      alt: "Plateau de hors-d'œuvres variés et colorés"
    },
    {
      id: 3,
      image: "/club-sandwich-3538455_1280.jpg",
      alt: "Club sandwich gourmand avec frites"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden cursor-african">
      {/* Carousel Container */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay avec motifs africains intégrés */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Motifs africains authentiques en overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="w-full h-full">
                <defs>
                  {/* Motif Adinkra - Gye Nyame (Suprématie de Dieu) */}
                  <pattern id="adinkra-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                    <g fill="#F59E0B" opacity="0.6">
                      {/* Symbole Gye Nyame stylisé */}
                      <circle cx="60" cy="60" r="40" fill="none" stroke="#F59E0B" strokeWidth="3"/>
                      <circle cx="60" cy="60" r="25" fill="none" stroke="#F59E0B" strokeWidth="2"/>
                      <path d="M60,35 L60,85 M35,60 L85,60" stroke="#F59E0B" strokeWidth="3"/>
                      <circle cx="60" cy="60" r="8" fill="#F59E0B"/>
                      
                      {/* Motifs décoratifs aux coins */}
                      <circle cx="20" cy="20" r="6" fill="#EF4444" opacity="0.7"/>
                      <circle cx="100" cy="20" r="6" fill="#EF4444" opacity="0.7"/>
                      <circle cx="20" cy="100" r="6" fill="#EF4444" opacity="0.7"/>
                      <circle cx="100" cy="100" r="6" fill="#EF4444" opacity="0.7"/>
                      
                      {/* Triangles Kente */}
                      <polygon points="60,10 70,25 50,25" fill="#10B981" opacity="0.5"/>
                      <polygon points="60,110 70,95 50,95" fill="#10B981" opacity="0.5"/>
                      <polygon points="10,60 25,50 25,70" fill="#10B981" opacity="0.5"/>
                      <polygon points="110,60 95,50 95,70" fill="#10B981" opacity="0.5"/>
                    </g>
                  </pattern>
                  
                  {/* Motif Bogolan (Mud Cloth) */}
                  <pattern id="bogolan-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <g fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.4">
                      {/* Lignes caractéristiques du Bogolan */}
                      <path d="M0,20 Q20,10 40,20 T80,20"/>
                      <path d="M0,40 Q20,30 40,40 T80,40"/>
                      <path d="M0,60 Q20,50 40,60 T80,60"/>
                      
                      {/* Motifs en losange */}
                      <polygon points="40,5 50,15 40,25 30,15" fill="#EF4444" opacity="0.3"/>
                      <polygon points="40,35 50,45 40,55 30,45" fill="#EF4444" opacity="0.3"/>
                      <polygon points="40,65 50,75 40,85 30,75" fill="#EF4444" opacity="0.3"/>
                      
                      {/* Points décoratifs */}
                      <circle cx="15" cy="15" r="2" fill="#10B981"/>
                      <circle cx="65" cy="15" r="2" fill="#10B981"/>
                      <circle cx="15" cy="65" r="2" fill="#10B981"/>
                      <circle cx="65" cy="65" r="2" fill="#10B981"/>
                    </g>
                  </pattern>
                  
                  {/* Motif Wax (Pagne africain) */}
                  <pattern id="wax-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <g opacity="0.3">
                      {/* Fleurs stylisées typiques du Wax */}
                      <circle cx="50" cy="50" r="20" fill="none" stroke="#F59E0B" strokeWidth="3"/>
                      <g transform="translate(50,50)">
                        <circle cx="0" cy="-15" r="5" fill="#EF4444"/>
                        <circle cx="15" cy="0" r="5" fill="#EF4444"/>
                        <circle cx="0" cy="15" r="5" fill="#EF4444"/>
                        <circle cx="-15" cy="0" r="5" fill="#EF4444"/>
                        <circle cx="10" cy="-10" r="3" fill="#10B981"/>
                        <circle cx="10" cy="10" r="3" fill="#10B981"/>
                        <circle cx="-10" cy="10" r="3" fill="#10B981"/>
                        <circle cx="-10" cy="-10" r="3" fill="#10B981"/>
                      </g>
                      
                      {/* Motifs aux coins */}
                      <path d="M0,0 Q25,25 50,0" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                      <path d="M50,0 Q75,25 100,0" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                      <path d="M0,100 Q25,75 50,100" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                      <path d="M50,100 Q75,75 100,100" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                    </g>
                  </pattern>
                </defs>
                
                {/* Application des motifs en couches */}
                <rect width="100%" height="100%" fill="url(#adinkra-pattern)" opacity="0.15"/>
                <rect width="100%" height="100%" fill="url(#bogolan-pattern)" opacity="0.1" transform="rotate(45 50 50)"/>
                <rect width="100%" height="100%" fill="url(#wax-pattern)" opacity="0.08" transform="scale(1.5)"/>
              </svg>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows avec style africain amélioré */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-amber-600/30 backdrop-blur-md text-white p-4 rounded-full hover:bg-amber-600/50 transition-all duration-500 border-2 border-amber-400/40"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(245, 158, 11, 0.3)", 
              "0 0 30px rgba(245, 158, 11, 0.5)", 
              "0 0 20px rgba(245, 158, 11, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-amber-600/30 backdrop-blur-md text-white p-4 rounded-full hover:bg-amber-600/50 transition-all duration-500 border-2 border-amber-400/40"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(245, 158, 11, 0.3)", 
              "0 0 30px rgba(245, 158, 11, 0.5)", 
              "0 0 20px rgba(245, 158, 11, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        {/* Éléments décoratifs africains animés avec motifs authentiques */}
        <motion.div 
          className="absolute top-32 left-16 w-12 h-12 border-4 border-amber-400/60 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)`
          }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Motif Adinkra à l'intérieur */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-300 rounded-full relative">
              <div className="absolute inset-1 bg-amber-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute top-48 right-24 w-10 h-10 bg-orange-500/70 transform rotate-45 relative"
          animate={{ 
            rotate: [45, 405],
            y: [0, -15, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          {/* Motif Kente à l'intérieur */}
          <div className="absolute inset-1 bg-red-400 transform -rotate-45">
            <div className="w-full h-full border border-yellow-300"></div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-48 left-32 w-14 h-14 border-3 border-red-400/50 transform rotate-45 relative"
          animate={{ 
            rotate: [45, -315],
            x: [0, 20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        >
          {/* Motif Bogolan à l'intérieur */}
          <div className="absolute inset-2 transform -rotate-45">
            <svg width="100%" height="100%" viewBox="0 0 20 20">
              <path d="M0,10 Q5,5 10,10 T20,10" stroke="#EF4444" strokeWidth="1" fill="none"/>
              <circle cx="10" cy="10" r="2" fill="#F59E0B"/>
            </svg>
          </div>
        </motion.div>

        {/* Motifs décoratifs supplémentaires flottants */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-8 h-8"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 32 32">
            <polygon points="16,4 24,12 16,20 8,12" fill="#10B981" opacity="0.6"/>
            <circle cx="16" cy="12" r="4" fill="#F59E0B" opacity="0.8"/>
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-10 h-10"
          animate={{ 
            rotate: [0, -180, -360],
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.7"/>
            <path d="M20,8 L20,32 M8,20 L32,20" stroke="#EF4444" strokeWidth="2" opacity="0.6"/>
            <circle cx="20" cy="20" r="5" fill="#10B981" opacity="0.8"/>
          </svg>
        </motion.div>
      </div>

      {/* Content Overlay - Texte optimisé */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 pt-20">
        <div className="text-center text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Titre principal optimisé pour 2 lignes */}
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl lg:text-6xl font-serif font-bold leading-tight text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.span 
                  className="block text-white drop-shadow-2xl"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Nutrition africaine authentique
                </motion.span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 drop-shadow-2xl"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  & saveurs du continent
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              Des conseils ancestraux, des recettes de nos terres, une alimentation saine qui honore nos traditions
            </motion.p>

            {/* CTA avec animations africaines améliorées */}
            <motion.div
              className="flex justify-center pt-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            >
              <motion.button
                onClick={scrollToArticles}
                className="group relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl overflow-hidden border-2 border-amber-400/30 cursor-african"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)",
                  rotate: [0, 1, -1, 0]
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(245, 158, 11, 0.4)",
                    "0 0 30px rgba(245, 158, 11, 0.6)",
                    "0 0 20px rgba(245, 158, 11, 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Explorer les articles</span>
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicateurs de slides - ALIGNÉS SUR LA MÊME LIGNE */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator avec style africain amélioré */}
      <motion.button
        onClick={scrollToArticles}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/90 hover:text-white transition-colors duration-300 z-20 cursor-african"
        animate={{ 
          y: [0, 8, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ 
          scale: 1.2,
          rotate: [0, 5, -5, 0]
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Défiler</span>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.button>

      {/* Transition douce vers le contenu */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
        darkMode 
          ? 'from-gray-900 via-gray-900/60 to-transparent' 
          : 'from-white via-white/60 to-transparent'
      }`}></div>
    </section>
  );
};

export default HeroCarousel;