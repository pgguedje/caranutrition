import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Article } from '../types';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
  darkMode: boolean;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack, darkMode }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Nutrition': return 'bg-green-500';
      case 'Recette': return 'bg-red-500';
      case 'Santé': return 'bg-blue-500';
      case 'Budget': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header simple sans hero */}
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux articles</span>
          </button>

          {/* Article Meta */}
          <div className="space-y-4">
            <div className={`${getCategoryColor(article.categorie)} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}>
              {article.categorie}
            </div>
            
            <h1 className={`text-4xl lg:text-5xl font-serif font-bold leading-tight ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {article.titre}
            </h1>
            
            <div className={`flex items-center space-x-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{article.auteur}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date_publication).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{article.temps_lecture} min de lecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image de l'article */}
      {article.image_url && (
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <img
            src={article.image_url}
            alt={article.titre}
            className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
        {/* Actions Bar */}
        <div className={`flex items-center justify-between mb-8 pb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-4">
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-gray-800 text-gray-300 hover:bg-red-900/20 hover:text-red-400' : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}>
              <Heart className="h-5 w-5" />
              <span>J'aime</span>
            </button>
          </div>
          
          <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Partager</span>
          </button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className={`rounded-xl p-6 mb-8 border-l-4 border-orange-500 ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
            <p className={`text-lg font-medium italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {article.description}
            </p>
          </div>
          
          <ReactMarkdown 
            className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
            components={{
              h1: ({children}) => <h1 className={`text-3xl font-serif font-bold mb-6 mt-8 ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>{children}</h1>,
              h2: ({children}) => <h2 className={`text-2xl font-serif font-bold mb-4 mt-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{children}</h2>,
              h3: ({children}) => <h3 className={`text-xl font-serif font-bold mb-3 mt-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{children}</h3>,
              p: ({children}) => <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{children}</p>,
              ul: ({children}) => <ul className="mb-4 space-y-2 pl-6">{children}</ul>,
              li: ({children}) => <li className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="absolute -left-5 text-orange-500">•</span>{children}</li>,
              strong: ({children}) => <strong className={`font-bold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>{children}</strong>,
              blockquote: ({children}) => <blockquote className={`border-l-4 border-orange-300 pl-6 py-2 rounded-r-lg my-6 italic ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-orange-50 text-gray-700'}`}>{children}</blockquote>
            }}
          >
            {article.contenu_markdown}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className={`flex flex-wrap gap-2 mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <span className={`text-sm font-medium mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;