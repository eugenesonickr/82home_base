import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 번역 데이터
const translations = {
  ko: {
    // 네비게이션
    'nav.home': '홈',
    'nav.about': '회사소개',
    'nav.services': '서비스',
    'nav.news': '공지사항',
    'nav.contact': '연락처',
    'nav.consultation': '상담 문의',
    
    // 히어로 섹션
    'hero.title': '혁신적인 IT 솔루션',
    'hero.subtitle': '비즈니스의 디지털 전환을 이끄는 TechFlow와 함께\n미래를 앞서가는 기술로 성공을 실현하세요',
    'hero.cta.services': '서비스 둘러보기',
    'hero.cta.video': '회사 소개 영상',
    
    // 회사소개
    'about.title': 'TechFlow를 소개합니다',
    'about.subtitle': '2014년부터 시작된 우리의 여정, 기술로 세상을 바꾸는 혁신적인 IT 솔루션 전문기업입니다.',
    
    // 서비스
    'services.title': '전문적인 IT 서비스',
    'services.subtitle': '다양한 산업 분야의 경험을 바탕으로 고객 맞춤형 IT 솔루션을 제공하여 비즈니스 성공을 지원합니다.',
    
    // 공지사항
    'news.title': '최신 소식',
    'news.subtitle': 'TechFlow의 최신 소식과 업데이트를 확인하세요.',
    
    // 연락처
    'contact.title': '문의하기',
    'contact.subtitle': '프로젝트 상담부터 기술 문의까지, TechFlow 전문가들이 친절하고 신속하게 답변드리겠습니다.',
    
    // 공통
    'common.loading': '로딩 중...',
    'common.error': '오류가 발생했습니다',
    'common.retry': '다시 시도',
    'common.close': '닫기',
    'common.save': '저장',
    'common.cancel': '취소',
    'common.submit': '제출',
    'common.search': '검색',
    'common.filter': '필터',
    'common.more': '더 보기',
    'common.less': '접기',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.consultation': 'Consultation',
    
    // Hero Section
    'hero.title': 'Innovative IT Solutions',
    'hero.subtitle': 'Leading digital transformation with TechFlow\nAchieve success with future-forward technology',
    'hero.cta.services': 'Explore Services',
    'hero.cta.video': 'Company Video',
    
    // About
    'about.title': 'Introducing TechFlow',
    'about.subtitle': 'Our journey since 2014, an innovative IT solution company that changes the world through technology.',
    
    // Services
    'services.title': 'Professional IT Services',
    'services.subtitle': 'We provide customized IT solutions based on experience across various industries to support business success.',
    
    // News
    'news.title': 'Latest News',
    'news.subtitle': 'Check out the latest news and updates from TechFlow.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'From project consultation to technical inquiries, TechFlow experts will respond kindly and promptly.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.more': 'More',
    'common.less': 'Less',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // 로컬 스토리지에서 언어 설정 불러오기
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ko', 'en'].includes(saved)) {
      return saved;
    }
    // 브라우저 언어 설정 확인
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ko') ? 'ko' : 'en';
  });

  useEffect(() => {
    // 언어 변경 시 로컬 스토리지에 저장
    localStorage.setItem('language', language);
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};