import React, { useState } from 'react';
import { Search, Filter, Calendar, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ArticleGrid from './ArticleGrid';

interface ModernBlogPageProps {
  darkMode: boolean;
}

const ModernBlogPage: React.FC<ModernBlogPageProps> = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { name: 'Tous les articles', value: '', color: 'bg-blue-600', count: 50 },
    { name: 'Nutrition', value: 'Nutrition', color: 'bg-green-500', count: 18 },
    { name: 'Recette', value: 'Recette', color: 'bg-red-500', count: 15 },
    { name: 'Budget', value: 'Budget', color: 'bg-yellow-500', count: 8 },
    { name: 'Santé', value: 'Santé', color: 'bg-blue-500', count: 12 },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Date croissante', icon: Calendar },
    { value: 'popular', label: 'Date décroissante', icon: TrendingUp },
    { value: 'reading-time', label: 'Temps de lecture', icon: Clock },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className={`min-h-screen ${darkMode ? 'bg-gray-900' : ''}`}
      style={{ backgroundColor: darkMode ? '#111827' : '#FFF6EC' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Search Bar - Centrée */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
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
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Filters Row - Flex avec wrap */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            
            {/* Categories Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setCategoryFilter(category.value)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
                    categoryFilter === category.value
                      ? `${category.color} text-white border-transparent shadow-lg`
                      : `${darkMode 
                          ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' 
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      categoryFilter === category.value 
                        ? 'bg-white/20' 
                        : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                    }`}>
                      {category.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="text-sm">4 articles</span>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ArticleGrid 
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            darkMode={darkMode}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ModernBlogPage;