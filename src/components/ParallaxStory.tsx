import React, { useEffect, useState, useRef } from 'react';
import { Leaf, Heart, Users, Star } from 'lucide-react';

interface ParallaxStoryProps {
  darkMode: boolean;
}

const ParallaxStory: React.FC<ParallaxStoryProps> = ({ darkMode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const products = [
    { name: 'Igname', icon: '🍠', benefit: 'Riche en fibres' },
    { name: 'Gombo', icon: '🌶️', benefit: 'Antioxydants naturels' },
    { name: 'Moringa', icon: '🌿', benefit: 'Super-aliment local' },
    { name: 'Manioc', icon: '🥔', benefit: 'Énergie durable' },
  ];

  return (
    <section ref={sectionRef} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-orange-900 via-red-800 to-orange-900'
    }`}>
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Parallax Overlay */}
      <div 
        className="absolute inset-0 bg-wax-pattern opacity-20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
        <div className={`space-y-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Main Question */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <Star className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-medium">Pourquoi manger local ?</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
              Nos Produits Locaux,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
                Nos Trésors Nutritionnels
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Chaque aliment de notre terroir africain recèle des bienfaits uniques. 
              Redécouvrons ensemble la richesse nutritionnelle de nos traditions.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.name}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4 animate-pulse-soft">{product.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-2">{product.name}</h3>
                <p className="text-white/80 text-sm">{product.benefit}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-orange-300" />
              </div>
              <div className="text-3xl font-bold text-orange-300 mb-2">15+</div>
              <div className="text-white/80">Produits locaux valorisés</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">100%</div>
              <div className="text-white/80">Recettes authentiques</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-red-300" />
              </div>
              <div className="text-3xl font-bold text-red-300 mb-2">2.5K+</div>
              <div className="text-white/80">Familles accompagnées</div>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Découvrir nos guides nutrition
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full animate-float"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse-soft"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      ></div>
    </section>
  );
};

export default ParallaxStory;