import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-yellow-500" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>
      
      {/* 배경 효과 */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-blue-500 rounded-full"
      />
    </motion.button>
  );
};

export default ThemeToggle;