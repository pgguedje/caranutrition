import React, { useState, useEffect } from 'react';
import { Clock, Heart, MessageCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { viewsManager } from '../utils/viewsManager';

interface ModernArticleCardProps {
  article: Article;
  onClick?: () => void;
  index: number;
  darkMode: boolean;
}

const ModernArticleCard: React.FC<ModernArticleCardProps> = ({ article, onClick, index, darkMode }) => {
  const navigate = useNavigate();
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nutrition': return 'bg-green-500';
      case 'Recette': return 'bg-coral-500'; // Utilise coral uniforme au lieu de red
      case 'Santé': return 'bg-blue-500';
      case 'Budget': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDefaultImage = () => {
    return 'https://images.pexels.com/photos/8844574/pexels-photo-8844574.jpeg';
  };

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

  const handleClick = () => {
    // Incrémenter les vues quand on clique sur l'article
    viewsManager.incrementViews(article.id);
    
    if (onClick) {
      onClick();
    } else {
      const slug = generateSlug(article.titre);
      navigate(`/article/${slug}`);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.article 
      className={`group rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -4 }}
    >
      {/* Image avec overlay - Taille réduite */}
      <div className="relative h-40 overflow-hidden">
        <motion.img
          src={article.image_url || getDefaultImage()}
          alt={article.titre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage();
          }}
        />
        
        {/* Category Badge - Top Left */}
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(article.categorie)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
            {article.categorie}
          </span>
        </div>

        {/* Reading Time - Top Right */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{article.temps_lecture} min</span>
        </div>

        {/* Views - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
          <Eye className="h-3 w-3" />
          <motion.span
            key={views}
            initial={{ scale: 1.2, color: '#f59e0b' }}
            animate={{ scale: 1, color: 'inherit' }}
            transition={{ duration: 0.3 }}
          >
            {views.toLocaleString()}
          </motion.span>
        </div>
      </div>

      {/* Content - Padding réduit */}
      <div className="p-4 space-y-3">
        {/* Title - Taille réduite */}
        <h3 className={`text-lg font-serif font-bold line-clamp-2 group-hover:text-teal-600 transition-colors duration-300 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {article.titre}
        </h3>

        {/* Summary - Taille réduite */}
        <p className={`line-clamp-2 leading-relaxed text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.description}
        </p>

        {/* Footer - Compact */}
        <div className={`flex items-center justify-between pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {article.auteur.charAt(0)}
            </div>
            <div>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {article.auteur}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                isLiked ? 'text-coral-500' : (darkMode ? 'text-gray-400 hover:text-coral-400' : 'text-gray-500 hover:text-coral-500') // Utilise coral uniforme
              }`}
            >
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likes}</span>
            </button>
            <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs">{Math.floor(Math.random() * 30) + 5}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ModernArticleCard;