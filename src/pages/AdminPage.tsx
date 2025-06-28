import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye,
  Users,
  FileText,
  Calendar,
  User,
  Mail,
  CheckCircle,
  AlertCircle,
  Download,
  MessageCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Article } from '../types';
import { articleManager } from '../utils/articleManager';
import { newsletterManager, NewsletterSubscriber } from '../utils/newsletterManager';
import { commentManager } from '../utils/commentManager';
import { viewsManager } from '../utils/viewsManager';

interface AdminPageProps {
  darkMode: boolean;
}

const AdminPage: React.FC<AdminPageProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'articles' | 'newsletter' | 'comments' | 'analytics'>('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [viewsStats, setViewsStats] = useState<any>({});

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // S'abonner aux changements
  useEffect(() => {
    if (isAuthenticated) {
      // Articles
      const unsubscribeArticles = articleManager.subscribe(() => {
        setArticles(articleManager.getArticles());
      });
      setArticles(articleManager.getArticles());

      // Newsletter
      const unsubscribeNewsletter = newsletterManager.subscribe(() => {
        setNewsletterSubscribers(newsletterManager.getSubscribers());
      });
      setNewsletterSubscribers(newsletterManager.getSubscribers());

      // Commentaires
      const unsubscribeComments = commentManager.subscribe(() => {
        setComments(commentManager.getComments());
      });
      setComments(commentManager.getComments());

      // Vues et analytics
      const unsubscribeViews = viewsManager.subscribe(() => {
        setViewsStats(viewsManager.getGlobalStats());
      });
      setViewsStats(viewsManager.getGlobalStats());

      return () => {
        unsubscribeArticles();
        unsubscribeNewsletter();
        unsubscribeComments();
        unsubscribeViews();
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'Developpeur') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    navigate('/');
  };

  const handleCreateArticle = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      titre: '',
      description: '',
      contenu_markdown: '',
      categorie: 'Nutrition',
      date_publication: new Date().toISOString().split('T')[0],
      auteur: '',
      image_url: '',
      temps_lecture: 5,
      tags: []
    };
    setEditingArticle(newArticle);
    setIsCreating(true);
    setSaveStatus('idle');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle({ ...article });
    setIsCreating(false);
    setSaveStatus('idle');
  };

  const handleSaveArticle = async () => {
    if (!editingArticle) return;

    setSaveStatus('saving');

    try {
      // Validation basique
      if (!editingArticle.titre.trim() || !editingArticle.description.trim() || !editingArticle.auteur.trim()) {
        alert('Veuillez remplir tous les champs obligatoires (titre, description, auteur)');
        setSaveStatus('error');
        return;
      }

      // Simuler un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 500));

      if (isCreating) {
        articleManager.addArticle(editingArticle);
      } else {
        articleManager.updateArticle(editingArticle);
      }

      setSaveStatus('saved');
      
      // Fermer le modal après 1 seconde
      setTimeout(() => {
        setEditingArticle(null);
        setIsCreating(false);
        setShowPreview(false);
        setSaveStatus('idle');
      }, 1000);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveStatus('error');
    }
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      articleManager.deleteArticle(id);
    }
  };

  const handleDeleteSubscriber = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
      newsletterManager.deleteSubscriber(id);
    }
  };

  const handleDeleteComment = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      commentManager.deleteComment(id);
    }
  };

  const updateEditingArticle = (field: keyof Article, value: any) => {
    if (!editingArticle) return;
    setEditingArticle({ ...editingArticle, [field]: value });
  };

  const exportNewsletterCSV = () => {
    const csvContent = newsletterManager.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportNewsletterJSON = () => {
    const jsonContent = newsletterManager.exportToJSON();
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCommentsJSON = () => {
    const jsonContent = commentManager.exportToJSON();
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `comments_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAnalyticsJSON = () => {
    const analyticsData = {
      globalStats: viewsStats,
      mostViewedArticles: viewsManager.getMostViewedArticles(10),
      exportDate: new Date().toISOString()
    };
    const jsonContent = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Administration CaraNutrition
            </h1>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connectez-vous pour accéder au panneau d'administration
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mot de passe
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Developpeur"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              Se connecter
            </button>
          </form>

          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <strong>Identifiants :</strong><br />
              Utilisateur : admin<br />
              Mot de passe : Developpeur
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Interface d'administration
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Administration CaraNutrition
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gestion complète du contenu
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'articles'
                  ? 'border-amber-500 text-amber-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Articles ({articles.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'newsletter'
                  ? 'border-amber-500 text-amber-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Newsletter ({newsletterSubscribers.filter(s => s.is_active).length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'comments'
                  ? 'border-amber-500 text-amber-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Commentaires ({comments.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analytics'
                  ? 'border-amber-500 text-amber-600'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Header des analytics */}
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Analytics & Statistiques
              </h2>
              <button
                onClick={exportAnalyticsJSON}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export JSON</span>
              </button>
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total des vues</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {viewsStats.totalViews?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vues uniques</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {viewsStats.totalUniqueViews?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 p-3 rounded-xl">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vues aujourd'hui</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {viewsStats.todayViews?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500 p-3 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Moyenne/article</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {viewsStats.averageViewsPerArticle?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles les plus vus */}
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Articles les plus vus
              </h3>
              <div className="space-y-4">
                {viewsManager.getMostViewedArticles(5).map((item, index) => {
                  const article = articles.find(a => a.id === item.article_id);
                  return (
                    <div key={item.article_id} className={`flex items-center justify-between p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-gray-300 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {article?.titre || `Article ${item.article_id}`}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {article?.categorie || 'Catégorie inconnue'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {item.views.toLocaleString()} vues
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {viewsManager.getUniqueViews(item.article_id).toLocaleString()} uniques
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6">
            {/* Header des articles */}
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Gestion des Articles
              </h2>
              <button
                onClick={handleCreateArticle}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nouvel Article</span>
              </button>
            </div>

            {/* Liste des articles */}
            <div className="grid gap-6">
              <AnimatePresence>
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    className={`rounded-2xl p-6 border ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            article.categorie === 'Nutrition' ? 'bg-green-100 text-green-800' :
                            article.categorie === 'Recette' ? 'bg-red-100 text-red-800' :
                            article.categorie === 'Santé' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.categorie}
                          </span>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              {viewsManager.getArticleViews(article.id).toLocaleString()} vues
                            </span>
                          </div>
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {article.titre}
                        </h3>
                        <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <User className="h-4 w-4" />
                            <span>{article.auteur}</span>
                          </span>
                          <span className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="h-4 w-4" />
                            <span>{article.temps_lecture} min</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Abonnés Newsletter
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={exportNewsletterCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={exportNewsletterJSON}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export JSON</span>
                </button>
                <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
                  {newsletterSubscribers.filter(s => s.is_active).length} actifs
                </div>
                <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {newsletterSubscribers.length} total
                </div>
              </div>
            </div>

            <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Email
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Date d'inscription
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Source
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Statut
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {newsletterSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-amber-500" />
                            <span>{subscriber.email}</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subscriber.source === 'modal' ? 'bg-blue-100 text-blue-800' :
                            subscriber.source === 'footer' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {subscriber.source || 'Inconnu'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            subscriber.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Gestion des Commentaires
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={exportCommentsJSON}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export JSON</span>
                </button>
                <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {comments.length} commentaires
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <AnimatePresence>
                {comments.map((comment) => {
                  const article = articles.find(a => a.id === comment.article_id);
                  return (
                    <motion.div
                      key={comment.id}
                      className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      layout
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {comment.author_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {comment.author_name}
                              </h4>
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
                          <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {comment.content}
                          </p>
                          {article && (
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Sur l'article : <span className="font-medium">{article.titre}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title="Supprimer le commentaire"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {comments.length === 0 && (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Aucun commentaire pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal d'édition d'article */}
      <AnimatePresence>
        {editingArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Header du modal */}
              <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {isCreating ? 'Nouvel Article' : 'Modifier l\'Article'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      showPreview
                        ? 'bg-amber-600 text-white'
                        : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSaveArticle}
                    disabled={saveStatus === 'saving'}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      saveStatus === 'saving' 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : saveStatus === 'saved'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {saveStatus === 'saving' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    )}
                    {saveStatus === 'saved' && <CheckCircle className="h-4 w-4" />}
                    {saveStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                    {saveStatus === 'idle' && <Save className="h-4 w-4" />}
                    <span>
                      {saveStatus === 'saving' ? 'Sauvegarde...' :
                       saveStatus === 'saved' ? 'Sauvegardé !' :
                       saveStatus === 'error' ? 'Erreur' :
                       'Sauvegarder'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingArticle(null);
                      setIsCreating(false);
                      setShowPreview(false);
                      setSaveStatus('idle');
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Contenu du modal */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                {!showPreview ? (
                  <div className="p-6 space-y-6">
                    {/* Formulaire d'édition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Titre *
                        </label>
                        <input
                          type="text"
                          value={editingArticle.titre}
                          onChange={(e) => updateEditingArticle('titre', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Catégorie
                        </label>
                        <select
                          value={editingArticle.categorie}
                          onChange={(e) => updateEditingArticle('categorie', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="Nutrition">Nutrition</option>
                          <option value="Recette">Recette</option>
                          <option value="Santé">Santé</option>
                          <option value="Budget">Budget</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Auteur *
                        </label>
                        <input
                          type="text"
                          value={editingArticle.auteur}
                          onChange={(e) => updateEditingArticle('auteur', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Temps de lecture (min)
                        </label>
                        <input
                          type="number"
                          value={editingArticle.temps_lecture}
                          onChange={(e) => updateEditingArticle('temps_lecture', parseInt(e.target.value))}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          URL de l'image
                        </label>
                        <input
                          type="url"
                          value={editingArticle.image_url || ''}
                          onChange={(e) => updateEditingArticle('image_url', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Description *
                        </label>
                        <textarea
                          value={editingArticle.description}
                          onChange={(e) => updateEditingArticle('description', e.target.value)}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Tags (séparés par des virgules)
                        </label>
                        <input
                          type="text"
                          value={editingArticle.tags?.join(', ') || ''}
                          onChange={(e) => updateEditingArticle('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="nutrition, santé, recette"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Contenu Markdown
                        </label>
                        <textarea
                          value={editingArticle.contenu_markdown}
                          onChange={(e) => updateEditingArticle('contenu_markdown', e.target.value)}
                          rows={15}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-mono text-sm ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="# Titre de l'article&#10;&#10;Votre contenu en markdown..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    {/* Prévisualisation avec ReactMarkdown */}
                    <div className="prose prose-lg max-w-none">
                      <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {editingArticle.titre}
                      </h1>
                      <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {editingArticle.description}
                      </p>
                      {editingArticle.image_url && (
                        <img
                          src={editingArticle.image_url}
                          alt={editingArticle.titre}
                          className="w-full h-64 object-cover rounded-xl mb-6"
                        />
                      )}
                      <ReactMarkdown 
                        className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        components={{
                          h1: ({children}) => <h1 className={`text-3xl font-serif font-bold mb-6 mt-8 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>{children}</h1>,
                          h2: ({children}) => <h2 className={`text-2xl font-serif font-bold mb-4 mt-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{children}</h2>,
                          h3: ({children}) => <h3 className={`text-xl font-serif font-bold mb-3 mt-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{children}</h3>,
                          p: ({children}) => <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{children}</p>,
                          ul: ({children}) => <ul className="mb-4 space-y-2 pl-6">{children}</ul>,
                          li: ({children}) => <li className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="absolute -left-5 text-amber-500">•</span>{children}</li>,
                          strong: ({children}) => <strong className={`font-bold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>{children}</strong>,
                          blockquote: ({children}) => <blockquote className={`border-l-4 border-amber-300 pl-6 py-2 rounded-r-lg my-6 italic ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-amber-50 text-gray-700'}`}>{children}</blockquote>
                        }}
                      >
                        {editingArticle.contenu_markdown}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;