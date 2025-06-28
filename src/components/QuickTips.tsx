import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Clock, DollarSign, Heart } from 'lucide-react';

interface QuickTipsProps {
  darkMode: boolean;
}

const QuickTips: React.FC<QuickTipsProps> = ({ darkMode }) => {
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

  const tips = [
    {
      icon: Heart,
      title: "Le saviez-vous ?",
      content: "Le moringa contient 7 fois plus de vitamine C que l'orange et pousse partout en Afrique !",
      color: "from-orange-400 to-red-500",
      bgColor: darkMode ? "bg-orange-900/20" : "bg-orange-50",
      textColor: darkMode ? "text-orange-300" : "text-orange-800"
    },
    {
      icon: DollarSign,
      title: "Astuce budget",
      content: "Acheter vos légumes en fin de marché peut vous faire économiser jusqu'à 40% sur votre budget alimentaire.",
      color: "from-yellow-400 to-orange-500",
      bgColor: darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
      textColor: darkMode ? "text-yellow-300" : "text-yellow-800"
    },
    {
      icon: Clock,
      title: "Gain de temps",
      content: "Préparez vos épices en poudre le weekend : gingembre, ail, piment séchés vous feront gagner du temps toute la semaine.",
      color: "from-green-400 to-green-600",
      bgColor: darkMode ? "bg-green-900/20" : "bg-green-50",
      textColor: darkMode ? "text-green-300" : "text-green-800"
    }
  ];

  return (
    <section ref={sectionRef} className={`py-20 relative overflow-hidden ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white to-orange-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-canvas-texture opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full mb-6 ${
            darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-800'
          }`}>
            <Lightbulb className="w-5 h-5" />
            <span className="text-sm font-medium">Conseils rapides</span>
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-serif font-bold mb-6 ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Le saviez-vous ?
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Découvrez nos astuces nutrition, budget et cuisine pour améliorer votre quotidien
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`group relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card */}
              <div className={`${tip.bgColor} rounded-2xl p-8 border hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${tip.color} rounded-full transform translate-x-8 -translate-y-8`}></div>
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tip.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <tip.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className={`text-xl font-serif font-bold ${tip.textColor} mb-4`}>
                  {tip.title}
                </h3>
                
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tip.content}
                </p>
                
                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Voir tous nos conseils
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickTips;