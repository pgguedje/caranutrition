import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Calendar, User, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { articleManager } from '../utils/articleManager';

interface LatestArticlesProps {
  darkMode: boolean;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ darkMode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    const unsubscribe = articleManager.subscribe(() => {
      const allArticles = articleManager.getArticles();
      // Prendre seulement les 6 derniers articles
      setArticles(allArticles.slice(0, 6));
    });

    const allArticles = articleManager.getArticles();
    setArticles(allArticles.slice(0, 6));

    return unsubscribe;
  }, []);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleArticleClick = (article: Article) => {
    const slug = generateSlug(article.titre);
    navigate(`/article/${slug}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nutrition': return 'bg-green-500';
      case 'Recette': return 'bg-red-500';
      case 'Santé': return 'bg-blue-500';
      case 'Budget': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDefaultImage = () => {
    return 'https://images.pexels.com/photos/8844574/pexels-photo-8844574.jpeg';
  };

  return (
    <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-cream-50'}`} style={{ backgroundColor: darkMode ? '#111827' : '#FFF6EC' }}>
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-wax-pattern opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
              ✨
            </motion.span>
            <span className="text-lg font-bold">Derniers Articles</span>
          </motion.div>
          
          <motion.h2 
            className={`text-4xl lg:text-6xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Découvertes Récentes
          </motion.h2>
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Les dernières pépites de notre blog nutrition : conseils, recettes et astuces 
            pour une alimentation saine et authentique.
          </motion.p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.article 
              key={article.id}
              className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}
              onClick={() => handleArticleClick(article)}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.8 + index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ y: -8 }}
            >
              {/* Image avec overlay */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={article.image_url || getDefaultImage()}
                  alt={article.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getDefaultImage();
                  }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(article.categorie)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {article.categorie}
                  </span>
                </div>

                {/* Reading Time */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.temps_lecture} min</span>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                  <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    <Eye className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 1000) + 200}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-white/50'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className={`text-xl font-serif font-bold line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {article.titre}
                </h3>

                {/* Summary */}
                <p className={`line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.description}
                </p>

                {/* Footer */}
                <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {article.auteur.charAt(0)}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {article.auteur}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className={`text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.button
            onClick={() => navigate('/blog')}
            className="group bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir tous les articles</span>
            <motion.div
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;