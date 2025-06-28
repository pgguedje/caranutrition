import React from 'react';
import { Leaf, Heart, Mail, Facebook, Twitter, Instagram, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`relative overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-adinkra-pattern opacity-10"></div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="/WhatsApp Image 2025-06-25 à 17.12.13_63c97e7f.jpg" 
                    alt="CaraNutrition Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold">CaraNutrition</h3>
                  <p className="text-teal-300 font-medium">Nutrition authentique d'Afrique</p>
                </div>
              </div>
              
              <p className={`mb-8 leading-relaxed max-w-md text-lg ${darkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                Votre guide de référence pour une alimentation saine et équilibrée 
                en Afrique, avec des conseils adaptés à nos produits locaux et nos traditions culinaires.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className={`flex items-center space-x-3 ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                  <MapPin className="h-5 w-5 text-teal-400" />
                  <span>Guinée, Afrique de l'Ouest</span>
                </div>
                <div className={`flex items-center space-x-3 ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                  <Phone className="h-5 w-5 text-teal-400" />
                  <a 
                    href="tel:+224621573709" 
                    className="hover:text-teal-300 transition-colors duration-300"
                  >
                    +224 621 57 37 09
                  </a>
                </div>
                <div className={`flex items-center space-x-3 ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                  <Mail className="h-5 w-5 text-teal-400" />
                  <a 
                    href="mailto:guedjeberenice@gmail.com" 
                    className="hover:text-teal-300 transition-colors duration-300"
                  >
                    guedjeberenice@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500' : 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500'
                  }`}
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500' : 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500'
                  }`}
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500' : 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500'
                  }`}
                  aria-label="Instagram"  
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="mailto:guedjeberenice@gmail.com" 
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500' : 'bg-gray-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-green-500'
                  }`}
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-8 text-teal-300">Navigation</h4>
              <ul className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                <li>
                  <a href="#accueil" className="hover:text-teal-300 transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-4"></span>
                    <span>Accueil</span>
                  </a>
                </li>
                <li>
                  <a href="#articles" className="hover:text-teal-300 transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-4"></span>
                    <span>Blog</span>
                  </a>
                </li>
                <li>
                  <a href="#newsletter" className="hover:text-teal-300 transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-4"></span>
                    <span>Newsletter</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:guedjeberenice@gmail.com" className="hover:text-teal-300 transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-4"></span>
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-8 text-green-300">Catégories</h4>
              <ul className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                <li>
                  <a href="#nutrition" className="hover:text-green-300 transition-colors duration-300 flex items-center space-x-3 group">
                    <span className="text-lg">🌿</span>
                    <span>Nutrition</span>
                  </a>
                </li>
                <li>
                  <a href="#recettes" className="hover:text-green-300 transition-colors duration-300 flex items-center space-x-3 group">
                    <span className="text-lg">🍲</span>
                    <span>Recettes</span>
                  </a>
                </li>
                <li>
                  <a href="#sante" className="hover:text-green-300 transition-colors duration-300 flex items-center space-x-3 group">
                    <span className="text-lg">💚</span>
                    <span>Santé</span>
                  </a>
                </li>
                <li>
                  <a href="#budget" className="hover:text-green-300 transition-colors duration-300 flex items-center space-x-3 group">
                    <span className="text-lg">💰</span>
                    <span>Budget</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-700 bg-gray-800/50'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-teal-300 mb-4">
                Contactez-nous
              </h3>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                Une question ? Un conseil personnalisé ? Nous sommes là pour vous accompagner !
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="tel:+224621573709"
                  className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+224 621 57 37 09</span>
                </a>
                <a 
                  href="mailto:guedjeberenice@gmail.com"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">guedjeberenice@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-700 bg-gray-800/50'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <blockquote className="text-center">
              <p className="text-xl font-serif italic text-teal-200 mb-4">
                "La nourriture est notre médecine, et notre médecine est notre nourriture"
              </p>
              <cite className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>- Proverbe africain</cite>
            </blockquote>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-700'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                <Heart className="h-4 w-4 text-coral-400 animate-pulse-soft" />
                <span>Fait avec amour pour l'Afrique</span>
              </div>
              
              <div className={`flex items-center space-x-6 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                <a href="#" className="hover:text-teal-300 transition-colors duration-300">
                  Politique de confidentialité
                </a>
                <a href="#" className="hover:text-teal-300 transition-colors duration-300">
                  Mentions légales
                </a>
                <a href="mailto:guedjeberenice@gmail.com" className="hover:text-teal-300 transition-colors duration-300">
                  Contact
                </a>
              </div>
              
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                © 2024 CaraNutrition. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;