import React, { useState, useEffect } from 'react';
import { ArrowDown, Play, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernHeroSectionProps {
  darkMode: boolean;
}

const ModernHeroSection: React.FC<ModernHeroSectionProps> = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/supermarket-949913_1280.jpg",
      title: "Nutrition Africaine Moderne",
      subtitle: "Redécouvrez les trésors nutritionnels de notre continent",
      accent: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      image: "/hors-doeuvre-2175326_1280.jpg",
      title: "Saveurs Authentiques",
      subtitle: "Des recettes traditionnelles revisitées pour votre santé",
      accent: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      image: "/club-sandwich-3538455_1280.jpg",
      title: "Équilibre & Gourmandise",
      subtitle: "Concilier plaisir culinaire et bien-être au quotidien",
      accent: "from-rose-500 to-pink-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToArticles = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec parallax */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Éléments décoratifs flottants */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 backdrop-blur-sm"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-500/30 backdrop-blur-sm"
        animate={{ 
          y: [0, 15, 0],
          x: [0, -10, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          {/* Badge animé */}
          <motion.div 
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 shadow-xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10,
              delay: 0.3 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-amber-300" />
            </motion.div>
            <span className="text-lg font-bold text-white">Nutrition Authentique d'Afrique</span>
          </motion.div>

          {/* Titre principal avec animation séquentielle */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.h1 
                key={currentSlide}
                className="text-5xl lg:text-7xl font-serif font-bold leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span 
                  className="block text-white drop-shadow-2xl mb-4"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {slides[currentSlide].title}
                </motion.span>
                <motion.span 
                  className={`block text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].accent} drop-shadow-2xl`}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p 
            className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Explorez la richesse nutritionnelle de nos traditions culinaires africaines, 
            adaptées aux besoins modernes pour une santé optimale.
          </motion.p>

          {/* Boutons d'action */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          >
            <motion.button
              onClick={scrollToArticles}
              className="group relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl overflow-hidden border border-white/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>Découvrir nos articles</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            <motion.button
              className="group flex items-center space-x-3 bg-white/10 backdrop-blur-md text-white px-8 py-5 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-5 w-5" />
              <span>Voir la vidéo</span>
            </motion.button>
          </motion.div>

          {/* Statistiques */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {[
              { number: "2.5K+", label: "Recettes partagées", icon: "🍽️" },
              { number: "15K+", label: "Familles accompagnées", icon: "👨‍👩‍👧‍👦" },
              { number: "50+", label: "Ingrédients locaux", icon: "🌿" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.7 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateurs de slides */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
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

      {/* Transition douce vers le contenu */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
        darkMode 
          ? 'from-gray-900 via-gray-900/80 to-transparent' 
          : 'from-white via-white/80 to-transparent'
      }`}></div>
    </section>
  );
};

export default ModernHeroSection;