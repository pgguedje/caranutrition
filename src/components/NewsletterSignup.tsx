import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, Star, Heart, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import GoogleFormsModal from './GoogleFormsModal';

interface NewsletterSignupProps {
  darkMode: boolean;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFormsModal, setShowFormsModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' : 'bg-gradient-to-br from-orange-600 via-red-700 to-orange-800'
      }`}>
        <div className="absolute inset-0 bg-wax-pattern opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className={`rounded-3xl p-12 shadow-2xl animate-slide-up ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <CheckCircle className={`h-12 w-12 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`text-3xl font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Akpé ! Bienvenue dans la famille !
            </h3>
            <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Vous recevrez bientôt nos meilleurs conseils nutrition directement dans votre boîte mail.
            </p>
            <div className={`flex items-center justify-center space-x-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              <Gift className="h-5 w-5" />
              <span className="font-medium">Votre guide gratuit arrive dans quelques minutes !</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="newsletter" className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' : 'bg-gradient-to-br from-orange-600 via-red-700 to-orange-800'
      }`}>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-wax-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-400/20 rounded-full animate-pulse-soft"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className={`backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border ${
            darkMode ? 'bg-gray-800/95 border-gray-600' : 'bg-white/95 border-white/20'
          }`}>
            {/* Header */}
            <div className="mb-12">
              <div className={`rounded-2xl p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center ${
                darkMode ? 'bg-orange-900/30' : 'bg-orange-100'
              }`}>
                <Mail className={`h-12 w-12 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              
              <h3 className={`text-4xl lg:text-5xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Rejoignez Notre
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400"> Communauté</span>
              </h3>
              
              <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Recevez chaque semaine nos meilleures recettes, conseils nutrition et astuces 
                pour une alimentation saine avec les produits locaux d'Afrique.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className={`rounded-2xl p-6 border ${
                darkMode ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h4 className={`font-serif font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Recettes Exclusives</h4>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Des recettes inédites adaptées aux produits du marché africain
                </p>
              </div>
              
              <div className={`rounded-2xl p-6 border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <h4 className={`font-serif font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Conseils Personnalisés</h4>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Des recommandations nutrition adaptées à votre situation
                </p>
              </div>
              
              <div className={`rounded-2xl p-6 border ${
                darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <h4 className={`font-serif font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Astuces Budget</h4>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Comment bien manger sans se ruiner en Afrique
                </p>
              </div>
              
              <div className={`rounded-2xl p-6 border ${
                darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <h4 className={`font-serif font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Bonus Gratuits</h4>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Guide PDF et planificateur de repas offerts à l'inscription
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className={`flex-1 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-lg ${
                    darkMode 
                      ? 'bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      <span>Inscription...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>S'inscrire</span>
                    </>
                  )}
                </button>
              </div>
              <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Pas de spam, promis ! Vous pouvez vous désinscrire à tout moment.
              </p>
            </form>

            {/* Bouton Formulaire */}
            <div className="mb-8">
              <motion.button
                onClick={() => setShowFormsModal(true)}
                className={`group inline-flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white' 
                    : 'border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Formulaire – Habitudes alimentaires & perte de poids</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  →
                </motion.div>
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className={`flex items-center justify-center space-x-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-500" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-500" />
                <span>Désinscription facile</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-500" />
                <span>+2,500 abonnés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Google Forms */}
      <GoogleFormsModal 
        isOpen={showFormsModal}
        onClose={() => setShowFormsModal(false)}
        darkMode={darkMode}
      />
    </>
  );
};

export default NewsletterSignup;