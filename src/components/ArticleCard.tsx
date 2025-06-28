import React, { useState, useEffect } from 'react';
import { Clock, Tag, Share2, Heart, MessageCircle, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { viewsManager } from '../utils/viewsManager';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  index: number;
  darkMode: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, index, darkMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 20);
  const [views, setViews] = useState(0);

  // Charger les vues de l'article
  useEffect(() => {
    const articleViews = viewsManager.getArticleViews(article.id);
    setViews(articleViews);

    // S'abonner aux changements de vues
    const unsubscribe = viewsManager.subscribe(() => {
      const updatedViews = viewsManager.getArticleViews(article.id);
      setViews(updatedViews);
    });

    return unsubscribe;
  }, [article.id]);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Nutrition': 
        return {
          bg: darkMode ? 'bg-green-900/30' : 'bg-green-50',
          text: darkMode ? 'text-green-300' : 'text-green-700',
          border: darkMode ? 'border-green-700' : 'border-green-200',
          icon: '🌿'
        };
      case 'Recette': 
        return {
          bg: darkMode ? 'bg-coral-900/30' : 'bg-coral-50', // Utilise coral uniforme
          text: darkMode ? 'text-coral-300' : 'text-coral-700', // Utilise coral uniforme
          border: darkMode ? 'border-coral-700' : 'border-coral-200', // Utilise coral uniforme
          icon: '🍲'
        };
      case 'Santé': 
        return {
          bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-50',
          text: darkMode ? 'text-blue-300' : 'text-blue-700',
          border: darkMode ? 'border-blue-700' : 'border-blue-200',
          icon: '💚'
        };
      case 'Budget': 
        return {
          bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
          text: darkMode ? 'text-yellow-300' : 'text-yellow-700',
          border: darkMode ? 'border-yellow-700' : 'border-yellow-200',
          icon: '💰'
        };
      default: 
        return {
          bg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
          text: darkMode ? 'text-gray-300' : 'text-gray-700',
          border: darkMode ? 'border-gray-600' : 'border-gray-200',
          icon: '📄'
        };
    }
  };

  const categoryStyle = getCategoryStyle(article.categorie);

  const getDefaultImage = () => {
    return 'https://images.pexels.com/photos/8844574/pexels-photo-8844574.jpeg';
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.titre,
        text: article.description,
        url: window.location.href
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleClick = () => {
    // Incrémenter les vues quand on clique sur l'article
    viewsManager.incrementViews(article.id);
    onClick();
  };

  return (
    <motion.article 
      className={`group rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border-2 relative ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-teal-500' 
          : 'bg-white border-gray-100 hover:border-teal-300'
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container - Responsive */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <motion.img
          src={article.image_url || getDefaultImage()}
          alt={article.titre}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage();
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <motion.div 
          className="absolute top-2 left-2 sm:top-3 sm:left-3"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className={`inline-flex items-center space-x-1 sm:space-x-2 px-2 py-1 rounded-full text-xs font-bold border-2 backdrop-blur-sm ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
            <span className="text-sm">{categoryStyle.icon}</span>
            <span className="hidden sm:inline">{article.categorie}</span>
          </span>
        </motion.div>

        {/* Reading Time */}
        <div className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
          darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-700'
        }`}>
          <Clock className="h-3 w-3" />
          <span>{article.temps_lecture} min</span>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Meta Info avec vues dynamiques */}
        <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="font-medium text-xs">
              {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
              })}
            </span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <motion.span
                key={views}
                initial={{ scale: 1.2, color: '#14b8a6' }}
                animate={{ scale: 1, color: 'inherit' }}
                transition={{ duration: 0.3 }}
                className="text-xs"
              >
                {views > 999 ? `${(views/1000).toFixed(1)}k` : views}
              </motion.span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        {/* Title - Responsive text size */}
        <motion.h3 
          className={`text-base sm:text-lg font-serif font-bold line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}
          whileHover={{ x: 5 }}
        >
          {article.titre}
        </motion.h3>

        {/* Description - Responsive */}
        <p className={`line-clamp-2 leading-relaxed text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.description}
        </p>

        {/* Tags - Limité à 2 tags sur mobile */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs hover:scale-105 transition-all duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Tag className="h-2 w-2" />
                <span className="truncate max-w-16">#{tag}</span>
              </motion.span>
            ))}
          </div>
        )}

        {/* Footer - Compact et responsive */}
        <div className={`flex items-center justify-between pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {article.auteur.charAt(0)}
            </motion.div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs font-bold truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{article.auteur}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nutritionniste</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                isLiked ? 'text-coral-500' : (darkMode ? 'text-gray-400 hover:text-coral-400' : 'text-gray-500 hover:text-coral-500') // Utilise coral uniforme
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium hidden sm:inline">{likes}</span>
            </motion.button>
            <motion.div 
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              whileHover={{ scale: 1.1 }}
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs font-medium hidden sm:inline">{Math.floor(Math.random() * 30) + 5}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;