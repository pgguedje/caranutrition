import React, { useState } from 'react';
import { Mail, Send, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleNewsletterProps {
  darkMode: boolean;
}

const SimpleNewsletter: React.FC<SimpleNewsletterProps> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Auto-hide banner after 60 seconds (encore plus long)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
      setShowBanner(false);
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg w-full mx-4 rounded-2xl p-8 shadow-2xl border-2 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-amber-500/30' 
            : 'bg-gradient-to-br from-white to-amber-50 border-amber-300/50'
        }`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Akpé ! Bienvenue dans la famille !
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Vous recevrez bientôt nos meilleurs conseils nutrition directement dans votre boîte mail.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-2xl w-full mx-4 rounded-2xl p-8 shadow-2xl border-2 backdrop-blur-sm ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-amber-500/30' 
              : 'bg-gradient-to-br from-white/95 to-amber-50/95 border-amber-300/50'
          }`}
        >
          <button
            onClick={() => setShowBanner(false)}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center space-y-6">
            {/* Icône et phrase africaine stylée */}
            <div className="space-y-4">
              <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${
                  darkMode ? 'bg-gradient-to-br from-amber-600 to-orange-600' : 'bg-gradient-to-br from-amber-500 to-orange-500'
                }`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              
              {/* Phrase africaine stylée */}
              <div className="space-y-2">
                <h3 className={`text-2xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  "Quand les racines sont profondes, 
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    les fruits sont savoureux"
                  </span>
                </h3>
                <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  - Proverbe africain
                </p>
              </div>
            </div>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Rejoignez notre communauté et recevez chaque semaine nos meilleures recettes, 
              conseils nutrition et astuces pour une alimentation saine avec les produits locaux d'Afrique.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className={`flex-1 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 shadow-lg border-2 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-amber-500' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-amber-400'
                  }`}
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-amber-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      <span>Inscription...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Rejoindre</span>
                    </>
                  )}
                </motion.button>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Pas de spam, promis ! Vous pouvez vous désinscrire à tout moment.
              </p>
            </form>

            {/* Indicateurs de confiance */}
            <div className={`flex items-center justify-center space-x-6 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>+2,500 abonnés</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Désinscription facile</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleNewsletter;