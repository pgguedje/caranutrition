import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import LatestArticles from '../components/LatestArticles';
import AboutSection from '../components/AboutSection';
import NutritionSurveySection from '../components/NutritionSurveySection';
import NewsletterSignup from '../components/NewsletterSignup';
import MinimalFooter from '../components/MinimalFooter';
import SectionBanner from '../components/SectionBanner';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  return (
    <main>
      <HeroCarousel darkMode={darkMode} />
      
      {/* Bannière de séparation */}
      <SectionBanner darkMode={darkMode} pattern="geometric" />
      
      <div id="articles">
        <LatestArticles darkMode={darkMode} />
      </div>
      
      {/* Section À propos avec Dr Bérénice */}
      <AboutSection darkMode={darkMode} />
      
      {/* Section Formulaire Nutrition */}
      <NutritionSurveySection darkMode={darkMode} />
      
      {/* Bannière de séparation */}
      <SectionBanner darkMode={darkMode} pattern="tribal" />
      
      {/* Newsletter avec bouton formulaire intégré */}
      <NewsletterSignup darkMode={darkMode} />
      
      <MinimalFooter darkMode={darkMode} />
    </main>
  );
};

export default HomePage;