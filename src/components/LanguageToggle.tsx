import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 shadow-lg"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLanguage?.flag} {currentLanguage?.label}
        </span>
      </motion.button>

      {/* 드롭다운 메뉴 */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 0, y: -10, scale: 0.95 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 z-50"
      >
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
              language === lang.code
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
            {language === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default LanguageToggle;