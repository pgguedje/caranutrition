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
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="absolute inset-0 bg-wax-pattern opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-start"
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
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
                    animate={{ y: 0, opacity: 1 }}
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
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 rounded-full px-6 py-3 border-2 bg-teal-100 border-teal-200 text-teal-800">
                <span className="text-2xl">👩‍⚕️</span>
                <span className="text-lg font-bold">À propos</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Rencontrez <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">Dr Bérénice</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Je suis <strong className="text-teal-600">Dr Bérénice</strong>, médecin généraliste passionnée par les saveurs authentiques d'Afrique de l'Ouest. Ce blog est le fruit de ma conviction que la santé passe par une nutrition respectueuse de nos traditions.
              </p>

              <p className="text-lg leading-relaxed">
                Ici, vous découvrirez des <strong className="text-green-600">conseils nutritionnels fondés sur la science</strong>, des recettes équilibrées mettant à l'honneur des produits locaux, et des outils pratiques pour adopter une alimentation saine au quotidien.
              </p>

              <p className="text-lg leading-relaxed">
                Mon approche vise à <strong className="text-orange-600">concilier bien-être, plaisir gustatif et respect de notre héritage culinaire</strong>. Chaque article est pensé pour vous aider à prendre soin de votre corps sans renier vos racines.
              </p>

              <div className="p-6 rounded-2xl border-l-4 border-teal-500 bg-teal-50">
                <p className="text-lg italic font-medium text-teal-700">
                  "Que vous soyez en quête d'astuces pratiques, d'informations fiables ou simplement d'inspiration pour vos repas, ce blog est votre espace d'échange et de partage."
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:guedjeberenice@gmail.com"
                className="flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Heart className="h-5 w-5" />
                <span className="font-medium">Contactez-moi</span>
              </a>
              <a 
                href="tel:+224621573709"
                className="flex items-center space-x-3 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <Award className="h-5 w-5" />
                <span className="font-medium">Consultation</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Réalisations */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl p-6 border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                darkMode ? 'bg-gray-800/50 border-gray-600 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl mb-4 shadow-lg`}>
                <achievement.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-serif font-bold mb-3">
                {achievement.title}
              </h3>
              <p className="text-sm leading-relaxed">
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
