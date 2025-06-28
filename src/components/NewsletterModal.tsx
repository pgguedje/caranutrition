import React, { useState } from 'react';
import Modal from 'react-modal';
import { Mail, Send, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsletterManager } from '../utils/newsletterManager';

// Configuration de react-modal
Modal.setAppElement('#root');

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      // Validation email basique
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Veuillez entrer une adresse email valide');
        setIsSubmitting(false);
        return;
      }

      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = newsletterManager.addSubscriber(email, 'modal');
      
      if (success) {
        setIsSubscribed(true);
        setEmail('');
        
        // Marquer que l'utilisateur s'est inscrit
        localStorage.setItem('newsletter_subscribed', 'true');
        
        // Fermer la modal après 3 secondes
        setTimeout(() => {
          setIsSubscribed(false);
          onClose();
        }, 3000);
      } else {
        setError('Cette adresse email est déjà inscrite à notre newsletter');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative' as const,
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: '0',
      outline: 'none',
      padding: '0',
      maxWidth: '90vw',
      maxHeight: '90vh',
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      closeTimeoutMS={300}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative w-full max-w-2xl rounded-3xl p-8 shadow-2xl border-2 backdrop-blur-sm ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-amber-500/30' 
            : 'bg-gradient-to-br from-white/95 to-amber-50/95 border-amber-300/50'
        }`}
      >
        {/* Bouton de fermeture */}
        <motion.button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
            darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-6 w-6" />
        </motion.button>

        <AnimatePresence mode="wait">
          {isSubscribed ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Akpé ! Bienvenue dans la famille !
              </h3>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Vous recevrez bientôt nos meilleurs conseils nutrition directement dans votre boîte mail.
              </p>
              <motion.div 
                className="mt-6 text-sm text-amber-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Cette fenêtre se fermera automatiquement...
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header avec icône et phrase africaine */}
              <div className="text-center space-y-6">
                <motion.div 
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${
                    darkMode ? 'bg-gradient-to-br from-amber-600 to-orange-600' : 'bg-gradient-to-br from-amber-500 to-orange-500'
                  }`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mail className="h-10 w-10 text-white" />
                </motion.div>
                
                <div className="space-y-3">
                  <h3 className={`text-3xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
              
              <p className={`text-lg leading-relaxed text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Rejoignez notre communauté et recevez chaque semaine nos meilleures recettes, 
                conseils nutrition et astuces pour une alimentation saine avec les produits locaux d'Afrique.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className={`w-full rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 shadow-lg border-2 text-lg ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-amber-500' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-amber-400'
                    } ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
                    required
                  />
                  
                  {error && (
                    <motion.p 
                      className="text-red-500 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-amber-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
                        <span>Inscription en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        <span>Rejoindre la communauté</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
};

export default NewsletterModal;