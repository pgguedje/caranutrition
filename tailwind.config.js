/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette africaine authentique et TRÈS atténuée
        sunset: {
          50: '#FFF8F1',
          100: '#FEECDC',
          200: '#FCD9BD',
          300: '#FDBA8C',
          400: '#FF8A4C',
          500: '#D8440E', // Encore plus atténué
          600: '#C73502', // Encore plus atténué
          700: '#A8300A', // Encore plus atténué
          800: '#7B2706', // Encore plus atténué
          900: '#5B2412', // Encore plus atténué
        },
        earth: {
          50: '#F7F3F0',
          100: '#EDE4DD',
          200: '#D4C4B0',
          300: '#B8A082',
          400: '#A0845C',
          500: '#6A5A14', // Encore plus atténué
          600: '#4F4411', // Encore plus atténué
          700: '#3D3A37', // Encore plus atténué
          800: '#2E2A2E', // Encore plus atténué
          900: '#1E1F23', // Encore plus atténué
        },
        savanna: {
          50: '#F9F7F4',
          100: '#F1EBE1',
          200: '#E3D5C7',
          300: '#B2A48C', // Encore plus atténué
          400: '#AD753F', // Encore plus atténué
          500: '#98760B', // Encore plus atténué
          600: '#795515', // Encore plus atténué
          700: '#6B3513', // Encore plus atténué
          800: '#453321', // Encore plus atténué
          900: '#2A1C17', // Encore plus atténué
        },
        baobab: {
          50: '#F0F9F0',
          100: '#DCF2DC',
          200: '#BBE5BB',
          300: '#66C186', // Encore plus atténué
          400: '#2ACE70', // Encore plus atténué
          500: '#02B55E', // Encore plus atténué
          600: '#06834A', // Encore plus atténué
          700: '#05603D', // Encore plus atténué
          800: '#064534', // Encore plus atténué
          900: '#04332D', // Encore plus atténué
        },
        kente: {
          50: '#FEF7F0',
          100: '#FDEEE0',
          200: '#F9D5B0',
          300: '#D4A87D', // Encore plus atténué
          400: '#CF7234', // Encore plus atténué
          500: '#C96B00', // Encore plus atténué
          600: '#B95706', // Encore plus atténué
          700: '#943309', // Encore plus atténué
          800: '#72200E', // Encore plus atténué
          900: '#58150F', // Encore plus atténué
        },
        indigo: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#85A4FC', // Encore plus atténué
          400: '#618CF8', // Encore plus atténué
          500: '#4366F1', // Encore plus atténué
          600: '#2F26E5', // Encore plus atténué
          700: '#2318CA', // Encore plus atténué
          800: '#1710A3', // Encore plus atténué
          900: '#110E81', // Encore plus atténué
        },
        // COULEURS ROUGES UNIFORMISÉES ET TRÈS ATTÉNUÉES
        coral: {
          50: '#FFF9F8',
          100: '#FEF2F0',
          200: '#FDE6E2',
          300: '#F8C8BC', // Très doux
          400: '#F2A898', // Très doux
          500: '#E6897A', // Très doux - couleur principale
          600: '#D46B5C', // Très doux
          700: '#B85548', // Très doux
          800: '#954439', // Très doux
          900: '#6B332B', // Très doux
        },
        // Couleurs douces inspirées du logo
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Couleur principale du logo
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // ROUGE UNIFORME TRÈS ATTÉNUÉ pour remplacer TOUS les rouges
        rose: {
          50: '#FFF9F8',
          100: '#FEF2F0',
          200: '#FDE6E2',
          300: '#F8C8BC', // Même teinte que coral pour uniformité
          400: '#F2A898', // Même teinte que coral pour uniformité
          500: '#E6897A', // MÊME COULEUR que coral.500 pour uniformité totale
          600: '#D46B5C', // Même teinte que coral pour uniformité
          700: '#B85548', // Même teinte que coral pour uniformité
          800: '#954439', // Même teinte que coral pour uniformité
          900: '#6B332B', // Même teinte que coral pour uniformité
        },
        // ROUGE PRINCIPAL UNIFORME - utilisé partout
        red: {
          50: '#FFF9F8',
          100: '#FEF2F0',
          200: '#FDE6E2',
          300: '#F8C8BC', // Même teinte que coral/rose
          400: '#F2A898', // Même teinte que coral/rose
          500: '#E6897A', // COULEUR PRINCIPALE UNIFORME
          600: '#D46B5C', // Même teinte que coral/rose
          700: '#B85548', // Même teinte que coral/rose
          800: '#954439', // Même teinte que coral/rose
          900: '#6B332B', // Même teinte que coral/rose
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'african': ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wax-pattern': `
          radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
          linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.02) 30%, rgba(245, 158, 11, 0.02) 70%, transparent 70%)
        `,
        'kente-texture': `
          repeating-linear-gradient(
            45deg,
            rgba(20, 184, 166, 0.06) 0px,
            rgba(20, 184, 166, 0.06) 2px,
            transparent 2px,
            transparent 10px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(34, 197, 94, 0.06) 0px,
            rgba(34, 197, 94, 0.06) 2px,
            transparent 2px,
            transparent 10px
          )
        `,
        'mud-cloth': `
          radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.06) 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 30%),
          linear-gradient(0deg, transparent 24%, rgba(245, 158, 11, 0.02) 25%, rgba(245, 158, 11, 0.02) 26%, transparent 27%, transparent 74%, rgba(245, 158, 11, 0.02) 75%, rgba(245, 158, 11, 0.02) 76%, transparent 77%, transparent)
        `,
        'adinkra-symbols': `
          radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.06) 0%, transparent 20%),
          conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34, 197, 94, 0.02) 60deg, transparent 120deg, rgba(34, 197, 94, 0.02) 180deg, transparent 240deg, rgba(34, 197, 94, 0.02) 300deg, transparent 360deg)
        `,
      },
      boxShadow: {
        'african': '0 10px 40px rgba(20, 184, 166, 0.12)',
        'sunset': '0 8px 32px rgba(245, 158, 11, 0.15)',
        'earth': '0 6px 24px rgba(160, 132, 92, 0.12)',
        'glow': '0 0 20px rgba(20, 184, 166, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      borderRadius: {
        'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'calabash': '50% 50% 50% 50% / 60% 60% 40% 40%',
        'leaf': '0 100% 0 100%',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
};