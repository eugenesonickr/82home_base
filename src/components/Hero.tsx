import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Package, MapPin } from 'lucide-react';
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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden"
      role="banner"
      aria-label="메인 히어로 섹션"
    >
      {/* Background Animation */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* 배송 관련 아이콘들 */}
        <div className="absolute top-20 left-20 opacity-10">
          <Truck className="w-16 h-16 text-white animate-bounce" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <Package className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-10">
          <MapPin className="w-10 h-10 text-white animate-bounce delay-500" />
        </div>
      </div>

      <ResponsiveContainer className="relative z-10">
        <div className="text-center">
          <VisuallyHidden>
            <h1>유진소닉 메인 페이지</h1>
          </VisuallyHidden>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`font-bold text-white mb-6 leading-tight ${
              screenSize === 'mobile' ? 'text-3xl' : 
              screenSize === 'tablet' ? 'text-4xl' : 'text-6xl'
            }`}
            role="heading"
            aria-level={2}
          >
            라스트 마일 딜리버리{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              No.1 전문 기업
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed ${
              screenSize === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'
            }`}
          >
            유진소닉은 라스트마일 딜리버리 전문 물류회사로<br />
            직영기반의 전국단위 딜리버리 네트워크와 직접실행력,<br />
            권역별 관리체계를 통해 고객에게 가장 빠르고 정확한<br />
            배송서비스를 제공합니다.
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
              className="rounded-full shadow-lg bg-purple-600 hover:bg-purple-700"
              motionProps={{
                whileHover: { scale: 1.05, boxShadow: '0 10px 25px rgba(147, 51, 234, 0.3)' }
              }}
            >
              서비스 둘러보기
            </AccessibleButton>

            <AccessibleButton
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              leftIcon={<Truck size={20} />}
              ariaLabel="회사 소개 섹션으로 이동"
              className="border-2 border-white/30 hover:border-white text-white rounded-full backdrop-blur-sm hover:bg-white/10"
            >
              회사 소개
            </AccessibleButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16"
            aria-label="서비스 특징"
          >
            <p className="text-white/70 text-sm mb-6">지금 바로 유진소닉의 원스톱 딜리버리 솔루션을 경험해보세요.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Package className="w-8 h-8 text-purple-300 mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">고객 만족 딜리버리 서비스</h3>
                <p className="text-white/80 text-sm">민첩하고 유연한 대응을 통해 고객만족을 향상시키고 있습니다.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <MapPin className="w-8 h-8 text-purple-300 mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">전국 단위 딜리버리 네트워크</h3>
                <p className="text-white/80 text-sm">대규모 차량 인프라로 전국 어디에서나 일관된 배송 서비스를 제공합니다.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Truck className="w-8 h-8 text-purple-300 mb-3 mx-auto" />
                <h3 className="text-white font-semibold mb-2">직영 기반 원스톱 딜리버리</h3>
                <p className="text-white/80 text-sm">직영 프로세스로 고객과 배송기사님의 문제를 빠르게 해결합니다.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
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