import React, { useState } from 'react';
import { FileText, Users, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GoogleFormsModal from './GoogleFormsModal';

interface NutritionSurveySectionProps {
  darkMode: boolean;
}

const NutritionSurveySection: React.FC<NutritionSurveySectionProps> = ({ darkMode }) => {
  const [showModal, setShowModal] = useState(false);

  const benefits = [
    {
      icon: Heart,
      title: "Conseils Personnalisés",
      description: "Recevez des recommandations adaptées à vos besoins spécifiques",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Suivi de Progrès",
      description: "Mesurez vos améliorations et ajustez votre approche",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Rejoignez d'autres personnes avec des objectifs similaires",
      color: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <>
      <section className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-wax-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <motion.div 
              className={`inline-flex items-center space-x-3 rounded-full px-6 py-3 mb-8 border-2 ${
                darkMode ? 'bg-amber-900/20 border-amber-400 text-amber-200' : 'bg-amber-100 border-amber-200 text-amber-800'
              }`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📋
              </motion.span>
              <span className="text-lg font-bold">Évaluation Nutritionnelle</span>
            </motion.div>
            
            <motion.h2 
              className={`text-4xl lg:text-6xl font-serif font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transformez Votre
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Relation à l'Alimentation
              </span>
            </motion.h2>
            
            <motion.p 
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Participez à notre enquête sur les habitudes alimentaires et la perte de poids. 
              Aidez-nous à mieux comprendre vos besoins pour vous proposer des solutions personnalisées.
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800/50 border-gray-600 hover:border-amber-500' : 'bg-white/80 border-gray-200 hover:border-amber-300'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl mb-6 shadow-lg`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className={`text-xl font-serif font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className={`rounded-3xl p-12 shadow-2xl border-2 backdrop-blur-sm ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-amber-500/30' 
                : 'bg-gradient-to-br from-white/95 to-amber-50/95 border-amber-300/50'
            }`}>
              <div className="space-y-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${
                  darkMode ? 'bg-gradient-to-br from-amber-600 to-orange-600' : 'bg-gradient-to-br from-amber-500 to-orange-500'
                }`}>
                  <FileText className="h-10 w-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className={`text-3xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Prêt à Commencer Votre Transformation ?
                  </h3>
                  <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Répondez à notre questionnaire détaillé sur vos habitudes alimentaires et vos objectifs de perte de poids. 
                    Cela ne prend que 5 minutes et nous aidera à créer un plan personnalisé pour vous.
                  </p>
                </div>

                <motion.button
                  onClick={() => setShowModal(true)}
                  className="group bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="h-6 w-6" />
                  <span>Commencer l'Évaluation</span>
                  <motion.div
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </motion.button>

                <div className={`flex items-center justify-center space-x-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>100% Gratuit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Confidentiel</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Google Forms */}
      <GoogleFormsModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        darkMode={darkMode}
      />
    </>
  );
};

export default NutritionSurveySection;