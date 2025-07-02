import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const popularLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' },
    { name: t('nav.news'), href: '#news' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* 404 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            {/* 배경 원들 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-96 h-96 border-2 border-primary-200 dark:border-primary-800 rounded-full opacity-20"></div>
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-80 h-80 border-2 border-secondary-200 dark:border-secondary-800 rounded-full opacity-30"></div>
            </motion.div>
            
            {/* 404 텍스트 */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 relative z-10"
            >
              404
            </motion.h1>
          </div>
        </motion.div>

        {/* 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            아래 링크를 통해 원하시는 정보를 찾아보세요.
          </p>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지로
          </motion.button>
        </motion.div>

        {/* 인기 링크 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Search className="w-6 h-6 text-primary-600" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              인기 페이지
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 p-4 rounded-xl text-center transition-all duration-300 group"
              >
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 font-medium">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 도움말 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400"
        >
          <HelpCircle className="w-5 h-5" />
          <span>
            도움이 필요하시면{' '}
            <a 
              href="mailto:support@techflow.co.kr" 
              className="text-primary-600 hover:text-primary-700 underline"
            >
              support@techflow.co.kr
            </a>
            로 문의해주세요.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;