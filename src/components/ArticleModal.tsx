import React, { useState } from 'react';
import { X, Share2, Heart, MessageCircle, Send, Facebook, Twitter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Article, Comment } from '../types';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose, darkMode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen || !article) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author.trim() && newComment.content.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        article_id: article.id,
        author_name: newComment.author,
        content: newComment.content,
        created_at: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setNewComment({ author: '', content: '' });
    }
  };

  const shareOnWhatsApp = () => {
    const text = `Découvrez cet article de CaraNutrition: ${article.titre} - ${article.description}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `${article.titre} sur CaraNutrition`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className="relative h-64 sm:h-80">
          <img
            src={article.image_url || 'https://images.pexels.com/photos/8844574/pexels-photo-8844574.jpeg'}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
              {article.categorie}
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
              {article.titre}
            </h1>
            <div className="flex items-center text-white/90 text-sm space-x-4">
              <span>Par {article.auteur}</span>
              <span>•</span>
              <span>{article.temps_lecture} min de lecture</span>
              <span>•</span>
              <span>{new Date(article.date_publication).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-20rem)]">
          <div className="p-6 lg:p-8">
            {/* Actions bar */}
            <div className={`flex items-center justify-between pb-6 border-b mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-red-900/20 hover:text-red-400' : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'}`
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>J'aime</span>
                </button>
                
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 text-gray-300 hover:bg-blue-900/20 hover:text-blue-400' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}>
                  <MessageCircle className="h-5 w-5" />
                  <span>Commenter</span>
                </button>
              </div>

              {/* Share buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={shareOnWhatsApp}
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300"
                  title="Partager sur WhatsApp"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  title="Partager sur Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors duration-300"
                  title="Partager sur Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className={`rounded-xl p-6 mb-6 border-l-4 border-orange-500 ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
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
              <div className={`flex flex-wrap gap-2 mb-8 pb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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

            {/* Comments section */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Commentaires ({comments.length})
              </h3>

              {/* Comment form */}
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>
                <textarea
                  placeholder="Partagez votre avis, vos questions ou vos expériences..."
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  rows={4}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-300 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Publier le commentaire</span>
                </button>
              </form>

              {/* Comments list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{comment.author_name}</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;