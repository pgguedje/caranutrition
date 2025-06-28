import React from 'react';

interface SectionDividerProps {
  pattern?: 'dots' | 'waves' | 'geometric' | 'leaves' | 'adinkra';
  color?: 'ochre' | 'forest' | 'sand' | 'gradient';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  pattern = 'dots', 
  color = 'ochre' 
}) => {
  const getPatternSvg = () => {
    switch (pattern) {
      case 'waves':
        return (
          <svg viewBox="0 0 1200 120\" className="w-full h-16">
            <path 
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
              className={`${
                color === 'ochre' ? 'fill-ochre-200' : 
                color === 'forest' ? 'fill-forest-200' : 
                color === 'sand' ? 'fill-sand-200' : 
                'fill-gradient-to-r from-ochre-200 to-terracotta-200'
              }`}
            />
          </svg>
        );
      case 'geometric':
        return (
          <div className="flex items-center justify-center space-x-6">
            <div className={`w-4 h-4 rotate-45 ${color === 'ochre' ? 'bg-ochre-300' : 'bg-forest-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${color === 'ochre' ? 'bg-terracotta-400' : 'bg-forest-400'}`}></div>
            <div className={`w-6 h-6 rotate-45 ${color === 'ochre' ? 'bg-ochre-300' : 'bg-forest-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${color === 'ochre' ? 'bg-terracotta-400' : 'bg-forest-400'}`}></div>
            <div className={`w-4 h-4 rotate-45 ${color === 'ochre' ? 'bg-ochre-300' : 'bg-forest-300'}`}></div>
          </div>
        );
      case 'leaves':
        return (
          <div className="flex items-center justify-center space-x-8 text-3xl">
            <span className="opacity-60 animate-float">🌿</span>
            <span className="opacity-40 animate-pulse-soft" style={{ animationDelay: '1s' }}>🍃</span>
            <span className="opacity-80 animate-float" style={{ animationDelay: '2s' }}>🌿</span>
            <span className="opacity-40 animate-pulse-soft" style={{ animationDelay: '3s' }}>🍃</span>
            <span className="opacity-60 animate-float" style={{ animationDelay: '4s' }}>🌿</span>
          </div>
        );
      case 'adinkra':
        return (
          <div className="flex items-center justify-center space-x-8">
            {/* Simplified Adinkra symbols */}
            <div className={`w-8 h-8 border-2 ${color === 'ochre' ? 'border-ochre-400' : 'border-forest-400'} rounded-full relative`}>
              <div className={`absolute inset-2 ${color === 'ochre' ? 'bg-ochre-400' : 'bg-forest-400'} rounded-full`}></div>
            </div>
            <div className={`w-6 h-6 ${color === 'ochre' ? 'bg-terracotta-400' : 'bg-forest-400'} transform rotate-45`}></div>
            <div className={`w-8 h-8 border-2 ${color === 'ochre' ? 'border-ochre-400' : 'border-forest-400'} rounded-full relative`}>
              <div className={`absolute inset-2 ${color === 'ochre' ? 'bg-ochre-400' : 'bg-forest-400'} rounded-full`}></div>
            </div>
            <div className={`w-6 h-6 ${color === 'ochre' ? 'bg-terracotta-400' : 'bg-forest-400'} transform rotate-45`}></div>
            <div className={`w-8 h-8 border-2 ${color === 'ochre' ? 'border-ochre-400' : 'border-forest-400'} rounded-full relative`}>
              <div className={`absolute inset-2 ${color === 'ochre' ? 'bg-ochre-400' : 'bg-forest-400'} rounded-full`}></div>
            </div>
          </div>
        );
      default: // dots
        return (
          <div className="flex items-center justify-center space-x-3">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === 3 ? 'w-4 h-4' : 'w-2 h-2'
                } ${
                  color === 'ochre' ? 'bg-ochre-400' : 
                  color === 'forest' ? 'bg-forest-400' : 
                  color === 'sand' ? 'bg-sand-400' : 
                  'bg-gradient-to-r from-ochre-400 to-terracotta-400'
                }`}
              ></div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        {getPatternSvg()}
      </div>
    </div>
  );
};

export default SectionDivider;