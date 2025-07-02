import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useResponsive } from '../hooks/useResponsive';
import AccessibleButton from './common/AccessibleButton';
import ResponsiveContainer from './common/ResponsiveContainer';
import VisuallyHidden from './common/VisuallyHidden';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { screenSize } = useResponsive();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden"
      role="banner"
      aria-label="메인 히어로 섹션"
    >
      {/* Background Animation */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <ResponsiveContainer className="relative z-10">
        <div className="text-center">
          <VisuallyHidden>
            <h1>TechFlow 메인 페이지</h1>
          </VisuallyHidden>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`font-bold text-white mb-6 leading-tight ${
              screenSize === 'mobile' ? 'text-4xl' : 
              screenSize === 'tablet' ? 'text-5xl' : 'text-7xl'
            }`}
            role="heading"
            aria-level={2}
          >
            {t('hero.title').split(' ')[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              {' '}{t('hero.title').split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed ${
              screenSize === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'
            }`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`flex gap-4 justify-center items-center ${
              screenSize === 'mobile' ? 'flex-col' : 'flex-col sm:flex-row'
            }`}
          >
            <AccessibleButton
              onClick={() => scrollToSection('services')}
              variant="primary"
              size="lg"
              leftIcon={<ArrowRight size={20} />}
              ariaLabel="서비스 섹션으로 이동"
              className="rounded-full shadow-lg"
              motionProps={{
                whileHover: { scale: 1.05, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }
              }}
            >
              {t('hero.cta.services')}
            </AccessibleButton>

            <AccessibleButton
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              leftIcon={<Play size={20} />}
              ariaLabel="회사 소개 섹션으로 이동"
              className="border-2 border-white/30 hover:border-white text-white rounded-full backdrop-blur-sm hover:bg-white/10"
            >
              {t('hero.cta.video')}
            </AccessibleButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16"
            aria-label="파트너사 로고"
          >
            <p className="text-white/70 text-sm mb-4">함께하는 파트너사</p>
            <div className="flex justify-center items-center space-x-8 opacity-60" role="img" aria-label="파트너사 로고들">
              <div className="h-8 w-20 bg-white/20 rounded"></div>
              <div className="h-8 w-24 bg-white/20 rounded"></div>
              <div className="h-8 w-16 bg-white/20 rounded"></div>
              <div className="h-8 w-20 bg-white/20 rounded"></div>
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="button"
        aria-label="아래로 스크롤"
        tabIndex={0}
        onClick={() => scrollToSection('about')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection('about');
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;