import React, { useEffect, useRef, useState } from 'react';
import { Heart, Users, Leaf } from 'lucide-react';

interface IntroSectionProps {
  darkMode: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-adinkra-pattern opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-800'
              }`}>
                <Heart className="h-4 w-4" />
                <span className="text-sm font-medium">Nutrition bienveillante</span>
              </div>
              
              <h2 className={`text-4xl lg:text-5xl font-serif font-bold leading-tight ${
                darkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Une approche 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> authentique</span> 
                de la nutrition
              </h2>
              
              <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Chez CaraNutrition, nous croyons que bien manger commence par comprendre 
                et valoriser nos traditions alimentaires. Nos conseils allient sagesse 
                ancestrale et science moderne pour vous accompagner vers une alimentation 
                saine, savoureuse et accessible.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <Leaf className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Produits locaux</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valorisation des aliments du terroir africain</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                  <Users className={`h-6 w-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Communauté</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Partage d'expériences et d'astuces</p>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Découvrir notre approche
            </button>
          </div>

          {/* Image */}
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg" 
                alt="Femme africaine préparant des légumes traditionnels"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className={`absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-lg border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-xl">
                  <span className="text-white text-xl">🥗</span>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>2.5K+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recettes partagées</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;