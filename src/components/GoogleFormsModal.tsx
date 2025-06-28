import React from 'react';
import Modal from 'react-modal';
import { X, FileText, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// Configuration de react-modal
Modal.setAppElement('#root');

interface GoogleFormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const GoogleFormsModal: React.FC<GoogleFormsModalProps> = ({ isOpen, onClose, darkMode }) => {
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative' as const,
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: '0',
      outline: 'none',
      padding: '0',
      maxWidth: '95vw',
      maxHeight: '95vh',
      width: '100%',
      height: '100%',
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      closeTimeoutMS={300}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative w-full h-full max-w-4xl mx-auto rounded-3xl shadow-2xl border-2 backdrop-blur-sm overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-amber-500/30' 
            : 'bg-gradient-to-br from-white/95 to-amber-50/95 border-amber-300/50'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-700' : 'border-amber-200'}`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${
              darkMode ? 'bg-gradient-to-br from-amber-600 to-orange-600' : 'bg-gradient-to-br from-amber-500 to-orange-500'
            }`}>
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-serif font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Formulaire – Habitudes alimentaires & perte de poids
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Aidez-nous à mieux vous accompagner dans votre parcours nutritionnel
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={onClose}
            className={`p-3 rounded-full transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Contenu du formulaire */}
        <div className="h-full overflow-hidden">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSeSxHL3Az9-hbOTef22aaWQJ5z4iwmHsNTgpsZb90a8Modycg/viewform?embedded=true" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="w-full h-full"
            title="Formulaire Habitudes alimentaires"
          >
            Chargement du formulaire...
          </iframe>
        </div>
      </motion.div>
    </Modal>
  );
};

export default GoogleFormsModal;