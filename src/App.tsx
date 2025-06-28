import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import RecettesPage from './pages/RecettesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AdminPage from './pages/AdminPage';
import NewsletterModal from './components/NewsletterModal';
import { newsletterManager } from './utils/newsletterManager';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }

    // Vérifier si l'utilisateur s'est déjà inscrit à la newsletter
    const checkNewsletterStatus = () => {
      const hasSubscribed = localStorage.getItem('newsletter_subscribed');
      const lastModalShown = localStorage.getItem('newsletter_modal_shown');
      const now = Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000; // 24 heures

      // Ne pas afficher la modal si :
      // 1. L'utilisateur s'est déjà inscrit
      // 2. La modal a été fermée dans les dernières 24h
      if (hasSubscribed === 'true') {
        return false;
      }

      if (lastModalShown && (now - parseInt(lastModalShown)) < oneDayInMs) {
        return false;
      }

      return true;
    };

    // Afficher la modal newsletter après 45 secondes si conditions remplies
    const timer = setTimeout(() => {
      if (checkNewsletterStatus()) {
        setShowNewsletterModal(true);
      }
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const handleCloseNewsletterModal = () => {
    setShowNewsletterModal(false);
    // Marquer que la modal a été fermée
    localStorage.setItem('newsletter_modal_shown', Date.now().toString());
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className={darkMode ? 'bg-gray-900' : 'bg-white'}>
        <Routes>
          <Route path="/admin" element={<AdminPage darkMode={darkMode} />} />
          <Route path="/*" element={
            <>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Routes>
                <Route path="/" element={<HomePage darkMode={darkMode} />} />
                <Route path="/blog" element={<BlogPage darkMode={darkMode} />} />
                <Route path="/recettes" element={<RecettesPage darkMode={darkMode} />} />
                <Route path="/article/:slug" element={<ArticleDetailPage darkMode={darkMode} />} />
              </Routes>
              
              {/* Modal Newsletter */}
              <NewsletterModal 
                isOpen={showNewsletterModal}
                onClose={handleCloseNewsletterModal}
                darkMode={darkMode}
              />
            </>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;