import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Heart, MessageCircle, Send, Eye, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Article, Comment } from '../types';
import { articleManager } from '../utils/articleManager';
import { commentManager } from '../utils/commentManager';
import { viewsManager } from '../utils/viewsManager';

interface ArticleDetailPageProps {
  darkMode: boolean;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ darkMode }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // S'abonner aux changements d'articles
    const unsubscribeArticles = articleManager.subscribe(() => {
      const allArticles = articleManager.getArticles();
      const foundArticle = allArticles.find(a => generateSlug(a.titre) === slug);
      if (foundArticle) {
        setArticle(foundArticle);
      }
    });

    // S'abonner aux changements de commentaires
    const unsubscribeComments = commentManager.subscribe(() => {
      if (article) {
        const articleComments = commentManager.getCommentsByArticle(article.id);
        setComments(articleComments);
      }
    });

    // S'abonner aux changements de vues
    const unsubscribeViews = viewsManager.subscribe(() => {
      if (article) {
        const articleViews = viewsManager.getArticleViews(article.id);
        const articleUniqueViews = viewsManager.getUniqueViews(article.id);
        setViews(articleViews);
        setUniqueViews(articleUniqueViews);
      }
    });

    // Trouver l'article par slug (généré à partir du titre)
    const allArticles = articleManager.getArticles();
    const foundArticle = allArticles.find(a => generateSlug(a.titre) === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      setLikes(Math.floor(Math.random() * 100) + 20);
      
      // Charger les vues de l'article
      const articleViews = viewsManager.getArticleViews(foundArticle.id);
      const articleUniqueViews = viewsManager.getUniqueViews(foundArticle.id);
      setViews(articleViews);
      setUniqueViews(articleUniqueViews);
      
      // Incrémenter les vues lors de la visite de la page
      viewsManager.incrementViews(foundArticle.id);
      
      // Charger les commentaires de cet article
      const articleComments = commentManager.getCommentsByArticle(foundArticle.id);
      setComments(articleComments);
    }

    return () => {
      unsubscribeArticles();
      unsubscribeComments();
      unsubscribeViews();
    };
  }, [slug, article?.id]);

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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.content.trim() || !article) return;

    setIsSubmittingComment(true);

    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));

      const comment = commentManager.addComment({
        article_id: article.id,
        author_name: newComment.author,
        content: newComment.content
      });

      setNewComment({ author: '', content: '' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const shareArticle = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article?.titre,
          text: article?.description,
          url: window.location.href
        });
        // Success - no need to show alert as the user successfully shared
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      }
    } catch (error) {
      // Handle various share API errors
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          // Permission denied or user cancelled - fallback to clipboard
          try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Partage annulé. Lien copié dans le presse-papiers !');
          } catch (clipboardError) {
            alert('Impossible de partager ou copier le lien.');
          }
        } else if (error.name === 'AbortError') {
          // User cancelled the share dialog - no action needed
          console.log('Partage annulé par l\'utilisateur');
        } else {
          // Other errors - fallback to clipboard
          try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Erreur de partage. Lien copié dans le presse-papiers !');
          } catch (clipboardError) {
            alert('Impossible de partager ou copier le lien.');
          }
        }
      }
    }
  };

  if (!article) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center px-4">
          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Article non trouvé
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header de l'article */}
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Bouton retour */}
          <motion.button
            onClick={() => navigate('/')}
            className={`flex items-center space-x-2 mb-6 px-3 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm sm:text-base">Retour aux articles</span>
          </motion.button>

          {/* Métadonnées de l'article */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className={`${getCategoryColor(article.categorie)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {article.categorie}
              </span>
              <div className={`flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <motion.div 
                  className="flex items-center space-x-1"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium">{views.toLocaleString()} vues</span>
                </motion.div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{uniqueViews.toLocaleString()} uniques</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {article.titre}
            </h1>
            
            <p className={`text-lg sm:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {article.description}
            </p>
            
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    {article.auteur.charAt(0)}
                  </div>
                  <span className="font-medium">{article.auteur}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{new Date(article.date_publication).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{article.temps_lecture} min de lecture</span>
                </div>
              </div>
              
              {/* Actions - Responsive */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <motion.button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-full transition-colors text-sm ${
                    isLiked 
                      ? 'bg-coral-100 text-coral-600 border border-coral-200' // Utilise coral uniforme
                      : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-coral-900/20 hover:text-coral-400' : 'bg-gray-100 text-gray-600 hover:bg-coral-50 hover:text-coral-600'}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{likes}</span>
                </motion.button>
                
                <motion.button
                  onClick={shareArticle}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-full transition-colors text-sm ${
                    darkMode ? 'bg-gray-800 text-gray-300 hover:bg-blue-900/20 hover:text-blue-400' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Partager</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image de l'article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.img
          src={article.image_url || getDefaultImage()}
          alt={article.titre}
          className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage();
          }}
        />
      </div>

      {/* Contenu de l'article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <motion.div 
          className="prose prose-sm sm:prose-lg max-w-none mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ReactMarkdown 
            className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Titres avec styles améliorés
              h1: ({children}) => (
                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-6 sm:mb-8 mt-8 sm:mt-12 pb-4 border-b-2 ${
                  darkMode ? 'text-teal-400 border-teal-400/30' : 'text-teal-700 border-teal-300'
                }`}>
                  {children}
                </h1>
              ),
              h2: ({children}) => (
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-4 sm:mb-6 mt-6 sm:mt-10 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  {children}
                </h2>
              ),
              h3: ({children}) => (
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-3 sm:mb-4 mt-4 sm:mt-8 ${
                  darkMode ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  {children}
                </h3>
              ),
              h4: ({children}) => (
                <h4 className={`text-base sm:text-lg lg:text-xl font-serif font-bold mb-2 sm:mb-3 mt-3 sm:mt-6 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {children}
                </h4>
              ),
              
              // Paragraphes avec espacement amélioré
              p: ({children}) => (
                <p className={`mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {children}
                </p>
              ),
              
              // Listes avec styles améliorés
              ul: ({children}) => (
                <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 pl-6 sm:pl-8">
                  {children}
                </ul>
              ),
              ol: ({children}) => (
                <ol className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 pl-6 sm:pl-8 list-decimal">
                  {children}
                </ol>
              ),
              li: ({children}) => (
                <li className={`relative text-base sm:text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="absolute -left-4 sm:-left-6 text-teal-500 font-bold">•</span>
                  {children}
                </li>
              ),
              
              // Texte en gras
              strong: ({children}) => (
                <strong className={`font-bold ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                  {children}
                </strong>
              ),
              
              // Citations avec style amélioré
              blockquote: ({children}) => (
                <blockquote className={`border-l-4 border-teal-400 pl-4 sm:pl-8 py-4 sm:py-6 my-6 sm:my-8 italic text-lg sm:text-xl rounded-r-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-teal-50 text-gray-700'
                }`}>
                  {children}
                </blockquote>
              ),
              
              // Code inline
              code: ({children}) => (
                <code className={`px-1 sm:px-2 py-1 rounded text-sm font-mono ${
                  darkMode ? 'bg-gray-700 text-teal-300' : 'bg-gray-100 text-teal-700'
                }`}>
                  {children}
                </code>
              ),
              
              // Blocs de code
              pre: ({children}) => (
                <pre className={`p-4 sm:p-6 rounded-xl overflow-x-auto my-6 sm:my-8 text-sm ${
                  darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-gray-100 border border-gray-200'
                }`}>
                  {children}
                </pre>
              ),
              
              // TABLEAUX avec style professionnel et responsive
              table: ({children}) => (
                <div className="overflow-x-auto my-6 sm:my-8 rounded-xl shadow-lg">
                  <table className={`w-full border-collapse min-w-full ${
                    darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-300'
                  }`}>
                    {children}
                  </table>
                </div>
              ),
              thead: ({children}) => (
                <thead className={`${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  {children}
                </thead>
              ),
              tbody: ({children}) => (
                <tbody className={`divide-y ${
                  darkMode ? 'divide-gray-600' : 'divide-gray-200'
                }`}>
                  {children}
                </tbody>
              ),
              th: ({children}) => (
                <th className={`px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-xs sm:text-sm uppercase tracking-wider ${
                  darkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                } border-b-2`}>
                  {children}
                </th>
              ),
              td: ({children}) => (
                <td className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm ${
                  darkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-200'
                } border-b`}>
                  {children}
                </td>
              ),
              
              // Lignes horizontales
              hr: () => (
                <hr className={`my-8 sm:my-12 border-2 ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`} />
              ),
              
              // Images dans le contenu
              img: ({src, alt}) => (
                <img 
                  src={src} 
                  alt={alt} 
                  className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg my-6 sm:my-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getDefaultImage();
                  }}
                />
              ),
              
              // Liens
              a: ({href, children}) => (
                <a 
                  href={href} 
                  className={`font-medium underline decoration-2 underline-offset-2 transition-colors ${
                    darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-700 hover:text-teal-600'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              )
            }}
          >
            {article.contenu_markdown}
          </ReactMarkdown>
        </motion.div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <motion.div 
            className={`flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={`text-sm font-medium mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tags:</span>
            {article.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-300 cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' 
                    : 'bg-teal-100 text-teal-800 hover:bg-teal-200 border border-teal-200'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Section des commentaires */}
        <motion.div 
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <MessageCircle className={`h-6 w-6 sm:h-8 sm:w-8 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            <h3 className={`text-2xl sm:text-3xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Commentaires ({comments.length})
            </h3>
          </div>

          {/* Formulaire de commentaire */}
          <form onSubmit={handleSubmitComment} className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${
            darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className={`text-base sm:text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Laisser un commentaire
            </h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className={`w-full border rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm sm:text-base ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
              <textarea
                placeholder="Partagez votre avis, vos questions ou vos expériences..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                rows={4}
                className={`w-full border rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none transition-all text-sm sm:text-base ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmittingComment}
                className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl hover:from-teal-700 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmittingComment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    <span>Publication...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Publier le commentaire</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Liste des commentaires */}
          <div className="space-y-3 sm:space-y-4">
            {comments.map((comment, index) => (
              <motion.div 
                key={comment.id} 
                className={`rounded-lg sm:rounded-xl p-4 sm:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                      <h4 className={`font-bold text-sm sm:text-base ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {comment.author_name}
                      </h4>
                      <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`leading-relaxed text-sm sm:text-base break-words ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {comments.length === 0 && (
              <div className={`text-center py-8 sm:py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MessageCircle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-base sm:text-lg">Aucun commentaire pour le moment.</p>
                <p className="text-sm">Soyez le premier à partager votre avis !</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;