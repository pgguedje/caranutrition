import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? `${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` 
          : 'bg-black/30 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo avec le nouveau design */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/WhatsApp Image 2025-06-25 à 17.12.13_63c97e7f.jpg" 
                  alt="CaraNutrition Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-bold ${
                isScrolled 
                  ? (darkMode 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-400 to-orange-400' 
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-green-600 to-orange-600')
                  : 'text-white drop-shadow-lg'
              }`}>
                CaraNutrition
              </h1>
              <p className={`text-xs sm:text-sm font-medium ${
                isScrolled 
                  ? (darkMode ? 'text-gray-400' : 'text-gray-600')
                  : 'text-white/90 drop-shadow-md'
              }`}>
                Nutrition authentique d'Afrique
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { name: 'Accueil', action: () => navigate('/') },
              { name: 'Blog', action: () => navigate('/blog') },
              { name: 'Recettes', action: () => navigate('/recettes') },
              { name: 'À propos', action: () => handleNavigation('about') },
              { name: 'Newsletter', action: () => handleNavigation('newsletter') }
            ].map((item, index) => (
              <motion.button 
                key={item.name}
                onClick={item.action}
                className={`relative hover:text-teal-400 transition-all duration-300 font-medium group text-sm lg:text-base ${
                  isScrolled 
                    ? (darkMode ? 'text-gray-200' : 'text-gray-700')
                    : 'text-white drop-shadow-md'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            
            <motion.button 
              onClick={toggleDarkMode}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isScrolled
                  ? (darkMode 
                      ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? (darkMode 
                      ? 'bg-gray-700 text-yellow-400' 
                      : 'bg-gray-100 text-gray-700')
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? (darkMode 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-100 text-gray-700')
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={`md:hidden rounded-2xl mx-2 mb-4 shadow-lg border overflow-hidden ${
                darkMode 
                  ? 'bg-gray-800/95 border-gray-600' 
                  : 'bg-white/95 border-gray-200'
              } backdrop-blur-xl`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="px-4 py-4 space-y-2">
                {[
                  { name: 'Accueil', action: () => navigate('/') },
                  { name: 'Blog', action: () => navigate('/blog') },
                  { name: 'Recettes', action: () => navigate('/recettes') },
                  { name: 'À propos', action: () => handleNavigation('about') },
                  { name: 'Newsletter', action: () => handleNavigation('newsletter') }
                ].map((item, index) => (
                  <motion.button 
                    key={item.name}
                    onClick={item.action}
                    className={`block w-full text-left hover:text-teal-600 transition-colors duration-300 font-medium py-3 px-2 rounded-lg border-b last:border-b-0 ${
                      darkMode 
                        ? 'text-gray-200 border-gray-600 hover:bg-gray-700' 
                        : 'text-gray-700 border-gray-100 hover:bg-gray-50'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;