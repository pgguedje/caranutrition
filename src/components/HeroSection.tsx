import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Star, Leaf, Sun, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  darkMode: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-sunset-50 via-kente-50 to-coral-50'}`}>
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 bg-wax-pattern opacity-40"></div>
      <div className="absolute inset-0 bg-kente-texture opacity-30"></div>
      
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-mud-cloth opacity-20"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.02}deg)` 
        }}
      />
      
      {/* Floating African Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-sunset-300 to-kente-400 rounded-calabash opacity-70"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-40 right-16 w-20 h-20 bg-gradient-to-br from-baobab-300 to-coral-400 rounded-organic opacity-60"
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-earth-300 to-savanna-400 rounded-leaf opacity-50"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 20, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Hero Image with Parallax - Image africaine authentique */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})` 
        }}
      >
        <img 
          src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg" 
          alt="Femme africaine préparant des légumes traditionnels"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Main Content - Centré */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div 
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Badge */}
          <motion.div 
            className={`inline-flex items-center space-x-3 backdrop-blur-sm border-2 rounded-full px-8 py-4 shadow-sunset ${darkMode ? 'bg-gray-800/90 border-orange-400 text-orange-200' : 'bg-white/90 border-sunset-200 text-earth-800'}`}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10,
              delay: 0.2 
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="w-6 h-6 text-sunset-600" />
            </motion.div>
            <span className="text-lg font-bold">Saveurs Authentiques d'Afrique</span>
          </motion.div>

          {/* Main Heading with Staggered Animation - Mieux centré */}
          <div className="space-y-6 flex flex-col items-center">
            <motion.h1 
              className="text-6xl lg:text-8xl font-display font-bold leading-tight text-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span 
                className={`block ${darkMode ? 'text-gray-100' : 'text-earth-800'}`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Redécouvrez
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-sunset-500 via-kente-500 to-coral-500"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                La Nutrition
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-baobab-600 via-earth-600 to-savanna-600 bg-clip-text text-transparent"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Africaine
              </motion.span>
            </motion.h1>
          </div>

          {/* Subheading - Centré */}
          <motion.p 
            className={`text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-medium text-center ${darkMode ? 'text-gray-300' : 'text-earth-600'}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Des conseils ancestraux, des recettes de nos terres, 
            une alimentation saine qui honore nos traditions
          </motion.p>

          {/* CTA Button with Glow Effect - Centré */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10,
              delay: 1.4 
            }}
          >
            <motion.button
              onClick={scrollToArticles}
              className="group relative bg-gradient-to-r from-sunset-500 via-kente-500 to-coral-500 text-white px-12 py-6 rounded-full font-bold text-xl shadow-sunset overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(233, 123, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>Découvrir nos secrets</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-coral-600 to-sunset-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.button
        onClick={scrollToArticles}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sunset-600 hover:text-kente-600 transition-colors duration-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        aria-label="Défiler vers le bas"
      >
        <ArrowDown className="h-10 w-10" />
      </motion.button>
    </section>
  );
};

export default HeroSection;