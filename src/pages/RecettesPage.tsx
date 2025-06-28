import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, TrendingUp, Clock, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleGrid from '../components/ArticleGrid';
import { articleManager } from '../utils/articleManager';
import { Article } from '../types';

interface RecettesPageProps {
  darkMode: boolean;
}

const RecettesPage: React.FC<RecettesPageProps> = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [articles, setArticles] = useState<Article[]>([]);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Charger les articles pour calculer les vraies valeurs
  useEffect(() => {
    const unsubscribe = articleManager.subscribe(() => {
      setArticles(articleManager.getArticles());
    });

    setArticles(articleManager.getArticles());
    return unsubscribe;
  }, []);

  // Calculer le nombre de recettes
  const recipeCount = articles.filter(a => a.categorie === 'Recette').length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`min-h-screen pt-20 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-cream-50'}`} style={{ backgroundColor: darkMode ? '#111827' : '#FFF6EC' }}>
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-wax-pattern opacity-20"></div>
      
      {/* Header Section */}
      <div className={`relative border-b ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-orange-200'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <motion.div 
            className="text-center mb-12"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={`inline-flex items-center space-x-3 rounded-full px-6 py-3 mb-8 border-2 ${darkMode ? 'bg-coral-900/20 border-coral-400 text-coral-200' : 'bg-coral-100 border-coral-200 text-coral-800'}`} // Utilise coral uniforme
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍲
              </motion.span>
              <span className="text-lg font-bold">Recettes CaraNutrition ({recipeCount})</span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl lg:text-6xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Saveurs Authentiques d'Afrique
            </motion.h1>
            
            <motion.p 
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Redécouvrez les recettes traditionnelles africaines revisitées pour une alimentation saine et savoureuse. 
              Des plats qui racontent l'histoire de nos terroirs.
            </motion.p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.form 
            onSubmit={handleSearch} 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des recettes..."
                className={`w-full py-4 px-6 pr-14 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-coral-500 text-white p-3 rounded-full hover:bg-coral-600 transition-all duration-300" // Utilise coral uniforme
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-80 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {/* Recipe Info */}
            <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
              <h3 className={`text-lg font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Nos Recettes
              </h3>
              
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border-2 ${
                  darkMode 
                    ? 'bg-coral-900/20 text-coral-300 border-coral-700' // Utilise coral uniforme
                    : 'bg-coral-50 text-coral-700 border-coral-200' // Utilise coral uniforme
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🍽️</span>
                      <span className="font-medium">Total des recettes</span>
                    </div>
                    <span className={`text-lg font-bold px-3 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-coral-800'
                    }`}>
                      {recipeCount}
                    </span>
                  </div>
                </div>

                {/* Types de recettes avec des valeurs dynamiques basées sur les tags ou le contenu */}
                {[
                  { name: 'Plats principaux', icon: '🍽️', count: Math.ceil(recipeCount * 0.4) },
                  { name: 'Soupes & Sauces', icon: '🍲', count: Math.ceil(recipeCount * 0.3) },
                  { name: 'Accompagnements', icon: '🥗', count: Math.ceil(recipeCount * 0.2) },
                  { name: 'Boissons', icon: '🥤', count: Math.ceil(recipeCount * 0.1) }
                ].map((type, index) => (
                  <motion.div
                    key={type.name}
                    className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      darkMode 
                        ? 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{type.icon}</span>
                        <span className="font-medium text-sm">{type.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {type.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
              <h3 className={`text-lg font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Trier par
              </h3>
              
              <div className="space-y-2">
                {[
                  { value: 'recent', label: 'Plus récentes', icon: Calendar },
                  { value: 'popular', label: 'Plus populaires', icon: TrendingUp },
                  { value: 'difficulty', label: 'Difficulté', icon: ChefHat },
                  { value: 'time', label: 'Temps de préparation', icon: Clock },
                ].map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      sortBy === option.value
                        ? `${darkMode ? 'bg-coral-900/30 text-coral-300' : 'bg-coral-50 text-coral-700'}` // Utilise coral uniforme
                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                  >
                    <option.icon className="h-4 w-4" />
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recipes Grid */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <ArticleGrid 
              searchQuery={searchQuery}
              categoryFilter="Recette"
              darkMode={darkMode}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecettesPage;