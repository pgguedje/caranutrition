import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, TrendingUp, Clock, FileText, X, Menu, Sidebar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleGrid from '../components/ArticleGrid';
import { articleManager } from '../utils/articleManager';
import { Article } from '../types';

interface BlogPageProps {
  darkMode: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [articles, setArticles] = useState<Article[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'fixed' | 'collapsible'>('fixed');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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

  // Calculer les vraies valeurs des catégories
  const getCategoryCounts = () => {
    const counts = {
      'Tous': articles.length,
      'Nutrition': articles.filter(a => a.categorie === 'Nutrition').length,
      'Recette': articles.filter(a => a.categorie === 'Recette').length,
      'Santé': articles.filter(a => a.categorie === 'Santé').length,
      'Budget': articles.filter(a => a.categorie === 'Budget').length,
    };
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const categories = [
    { 
      name: 'Tous', 
      count: categoryCounts.Tous, 
      color: 'blue',
      icon: '🌍',
      description: 'Tous nos articles'
    },
    { 
      name: 'Nutrition', 
      count: categoryCounts.Nutrition, 
      color: 'green',
      icon: '🌿',
      description: 'Conseils nutritionnels'
    },
    { 
      name: 'Recette', 
      count: categoryCounts.Recette, 
      color: 'coral', // Utilise coral uniforme au lieu de red
      icon: '🍲',
      description: 'Recettes traditionnelles'
    },
    { 
      name: 'Santé', 
      count: categoryCounts.Santé, 
      color: 'blue',
      icon: '💚',
      description: 'Bien-être et santé'
    },
    { 
      name: 'Budget', 
      count: categoryCounts.Budget, 
      color: 'yellow',
      icon: '💰',
      description: 'Manger sain et pas cher'
    },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive 
        ? 'bg-blue-600 text-white border-blue-600' 
        : `${darkMode ? 'bg-blue-900/20 text-blue-300 border-blue-700 hover:bg-blue-800/30' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`,
      green: isActive 
        ? 'bg-green-600 text-white border-green-600' 
        : `${darkMode ? 'bg-green-900/20 text-green-300 border-green-700 hover:bg-green-800/30' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`,
      coral: isActive // Utilise coral uniforme au lieu de red
        ? 'bg-coral-600 text-white border-coral-600' 
        : `${darkMode ? 'bg-coral-900/20 text-coral-300 border-coral-700 hover:bg-coral-800/30' : 'bg-coral-50 text-coral-700 border-coral-200 hover:bg-coral-100'}`,
      yellow: isActive 
        ? 'bg-yellow-600 text-white border-yellow-600' 
        : `${darkMode ? 'bg-yellow-900/20 text-yellow-300 border-yellow-700 hover:bg-yellow-800/30' : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'}`,
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Composant des filtres réutilisable
  const FiltersContent = ({ isMobile = false }) => (
    <div className="space-y-6">
      {/* Mode Toggle - Seulement sur desktop */}
      {!isMobile && (
        <div className={`rounded-2xl p-4 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Mode d'affichage
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSidebarMode('fixed')}
                className={`p-2 rounded-lg transition-colors ${
                  sidebarMode === 'fixed'
                    ? 'bg-orange-500 text-white'
                    : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                }`}
                title="Aside fixe"
              >
                <Sidebar className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSidebarMode('collapsible')}
                className={`p-2 rounded-lg transition-colors ${
                  sidebarMode === 'collapsible'
                    ? 'bg-orange-500 text-white'
                    : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                }`}
                title="Masquable"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
        <h3 className={`text-lg font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Catégories
        </h3>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => {
                setCategoryFilter(category.name === 'Tous' ? '' : category.name);
                if (isMobile) setShowMobileFilters(false);
              }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                getColorClasses(
                  category.color, 
                  (categoryFilter === category.name || (categoryFilter === '' && category.name === 'Tous'))
                )
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0 : 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full font-bold ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </div>
            </motion.button>
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
            { value: 'recent', label: 'Plus récents', icon: Calendar },
            { value: 'popular', label: 'Plus populaires', icon: TrendingUp },
            { value: 'reading-time', label: 'Temps de lecture', icon: Clock },
          ].map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                if (isMobile) setShowMobileFilters(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                sortBy === option.value
                  ? `${darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700'}`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isMobile ? 0 : 1.6 + index * 0.1 }}
            >
              <option.icon className="h-4 w-4" />
              <span className="font-medium">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
        <h3 className={`text-lg font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Statistiques
        </h3>
        
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total articles</span>
            <span className={`font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>{articles.length}</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Auteurs</span>
            <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {new Set(articles.map(a => a.auteur)).size}
            </span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Temps de lecture moyen</span>
            <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {articles.length > 0 ? Math.round(articles.reduce((acc, a) => acc + a.temps_lecture, 0) / articles.length) : 0} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );

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
              className={`inline-flex items-center space-x-3 rounded-full px-6 py-3 mb-8 border-2 ${darkMode ? 'bg-orange-900/20 border-orange-400 text-orange-200' : 'bg-orange-100 border-orange-200 text-orange-800'}`}
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.span>
              <span className="text-lg font-bold">Blog CaraNutrition</span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl lg:text-6xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Nos Trésors Nutritionnels
            </motion.h1>
            
            <motion.p 
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Découvrez la richesse de notre patrimoine culinaire africain, 
              des conseils d'experts et des recettes qui nourrissent le corps et l'âme.
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
                placeholder="Rechercher des articles..."
                className={`w-full py-4 px-6 pr-14 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-all duration-300"
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
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <motion.button
            onClick={() => setShowMobileFilters(true)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filtres & Tri</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'
            }`}>
              {categoryFilter || 'Tous'}
            </span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            {sidebarMode === 'fixed' ? (
              <motion.div 
                className="w-80 space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <FiltersContent />
              </motion.div>
            ) : (
              <div className="w-80">
                <motion.button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`mb-4 flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter className="h-5 w-5" />
                  <span className="font-medium">
                    {sidebarCollapsed ? 'Afficher les filtres' : 'Masquer les filtres'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <FiltersContent />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Articles Grid */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <ArticleGrid 
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              darkMode={darkMode}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`w-80 h-full overflow-y-auto ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Filtres & Tri
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <FiltersContent isMobile={true} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;