import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface MinimalFooterProps {
  darkMode: boolean;
}

const MinimalFooter: React.FC<MinimalFooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 ${
      darkMode ? 'bg-gray-800 text-gray-300' : 'bg-orange-100 text-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/WhatsApp Image 2025-06-25 à 17.12.13_63c97e7f.jpg" 
                alt="CaraNutrition Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-serif font-bold">CaraNutrition</span>
              <p className="text-sm text-teal-600">Nutrition authentique d'Afrique</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="tel:+224621573709"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-teal-900/30 text-teal-300 hover:bg-teal-800/50' : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+224 621 57 37 09</span>
            </a>
            <a 
              href="mailto:guedjeberenice@gmail.com"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-green-900/30 text-green-300 hover:bg-green-800/50' : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">guedjeberenice@gmail.com</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8 text-sm">
            <a href="mailto:guedjeberenice@gmail.com" className="hover:text-teal-600 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Mentions légales
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm">
            © 2024 CaraNutrition. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;