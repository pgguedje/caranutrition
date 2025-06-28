import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernArticleCard from './ModernArticleCard';
import ArticlePage from './ArticlePage';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types';

interface ArticleGridProps {
  searchQuery: string;
  categoryFilter: string;
  darkMode: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ searchQuery, categoryFilter, darkMode }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticlePage, setShowArticlePage] = useState(false);

  const {
    articles,
    loading,
    currentPage,
    totalPages,
    totalArticles,
    handleSearch,
    handleCategoryFilter,
    nextPage,
    prevPage,
    goToPage
  } = useArticles();

  // Update filters when props change
  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  React.useEffect(() => {
    handleCategoryFilter(categoryFilter);
  }, [categoryFilter, handleCategoryFilter]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowArticlePage(true);
  };

  const handleBackToGrid = () => {
    setSelectedArticle(null);
    setShowArticlePage(false);
  };

  if (showArticlePage && selectedArticle) {
    return (
      <ArticlePage
        article={selectedArticle}
        onBack={handleBackToGrid}
        darkMode={darkMode}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`w-16 h-16 rounded-full border-4 border-t-transparent mx-auto mb-6 ${
              darkMode ? 'border-orange-400' : 'border-orange-600'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className={`text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chargement des articles...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Articles Grid - 3 colonnes desktop, 2 tablette, 1 mobile */}
      <AnimatePresence mode="wait">
        {articles.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={`rounded-full p-12 w-40 h-40 mx-auto mb-8 flex items-center justify-center shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-orange-100'}`}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-6xl">🔍</span>
            </motion.div>
            <h3 className={`text-3xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Aucun article trouvé
            </h3>
            <p className={`text-xl max-w-md mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explorez d'autres catégories ou modifiez votre recherche.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="articles-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <ModernArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => handleArticleClick(article)}
                  index={index}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`border-2 px-6 py-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                      : 'bg-white border-orange-200 text-gray-700 hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="font-medium">Précédent</span>
                </motion.button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-orange-500 text-white shadow-lg'
                          : `border-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' : 'bg-white border-orange-200 text-gray-700 hover:bg-orange-50'}`
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`border-2 px-6 py-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                      : 'bg-white border-orange-200 text-gray-700 hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">Suivant</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleGrid;