import React from 'react';
import { Heart, Award, Users, BookOpen, Stethoscope, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AboutSectionProps {
  darkMode: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const achievements = [
    {
      icon: Stethoscope,
      title: "Médecin Généraliste",
      description: "Formation médicale complète avec spécialisation en nutrition",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Leaf,
      title: "Expert Nutrition Africaine",
      description: "Spécialiste des traditions culinaires d'Afrique de l'Ouest",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "2,500+ Familles Accompagnées",
      description: "Conseils personnalisés pour une alimentation saine",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BookOpen,
      title: "Recherche & Publications",
      description: "Articles scientifiques sur la nutrition traditionnelle",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <section 
      id="about"
      className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}
    >
      <div className="absolute inset-0 bg-wax-pattern opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative flex justify-center lg:justify-start"
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative max-w-md w-full">
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-[400px] sm:h-[450px] flex items-center justify-center bg-gray-100 overflow-hidden">
                  <img 
                    src="/WhatsApp Image 2025-06-28 à 20.33.33_4951ecce.jpg" 
                    alt="Dr Bérénice - Médecin Généraliste et Expert en Nutrition Africaine"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div 
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">Dr Bérénice Guedje</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Médecin Généraliste & Nutritionniste</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-full backdrop-blur-sm border border-white/30"
                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-teal-500" />
                </div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-3 -left-3 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full backdrop-blur-sm border border-white/30"
                animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Texte + contact */}
          {/* ... (pas modifié, mais à remettre selon ton original) ... */}
        </div>

        {/* ✅ Correction ici : suppression du </div> en trop */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl p-6 border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                darkMode ? 'bg-gray-800/50 border-gray-600 hover:border-teal-500' : 'bg-white/80 border-gray-200 hover:border-teal-300'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl mb-4 shadow-lg`}>
                <achievement.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-lg font-serif font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {achievement.title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
