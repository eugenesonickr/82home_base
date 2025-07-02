import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SEOHead from './components/SEOHead';

// 컴포넌트 지연 로딩
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const VisionMission = lazy(() => import('./components/VisionMission'));
const Services = lazy(() => import('./components/Services'));
const News = lazy(() => import('./components/News'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ErrorBoundary>
            <SEOHead />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
            >
              <Suspense fallback={<LoadingSpinner fullScreen text="페이지를 불러오는 중..." />}>
                <Header />
                <main id="main-content" role="main">
                  <Suspense fallback={<LoadingSpinner fullScreen text="히어로 섹션 로딩 중..." />}>
                    <Hero />
                  </Suspense>
                  <Suspense fallback={<LoadingSpinner fullScreen text="회사소개 로딩 중..." />}>
                    <About />
                  </Suspense>
                  <Suspense fallback={<LoadingSpinner fullScreen text="비전과 미션 로딩 중..." />}>
                    <VisionMission />
                  </Suspense>
                  <Suspense fallback={<LoadingSpinner fullScreen text="서비스 정보 로딩 중..." />}>
                    <Services />
                  </Suspense>
                  <Suspense fallback={<LoadingSpinner fullScreen text="공지사항 로딩 중..." />}>
                    <News />
                  </Suspense>
                  <Suspense fallback={<LoadingSpinner fullScreen text="연락처 정보 로딩 중..." />}>
                    <Contact />
                  </Suspense>
                </main>
                <Suspense fallback={<LoadingSpinner fullScreen text="푸터 로딩 중..." />}>
                  <Footer />
                </Suspense>
              </Suspense>
            </motion.div>
          </ErrorBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;