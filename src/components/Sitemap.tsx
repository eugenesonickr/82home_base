import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building, 
  Wrench, 
  Newspaper, 
  Mail, 
  ExternalLink,
  MapPin,
  Clock,
  Users,
  Award
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Sitemap: React.FC = () => {
  const { t } = useLanguage();

  const sitemapData = [
    {
      title: '메인 페이지',
      icon: Home,
      links: [
        { name: '홈', href: '#home', description: '메인 페이지' },
        { name: '회사소개', href: '#about', description: 'TechFlow 소개' },
        { name: '비전과 미션', href: '#vision', description: '우리의 가치와 목표' },
      ]
    },
    {
      title: '서비스',
      icon: Wrench,
      links: [
        { name: '웹 개발', href: '#services', description: '반응형 웹사이트 및 웹 애플리케이션' },
        { name: '모바일 앱 개발', href: '#services', description: 'iOS/Android 네이티브 및 크로스플랫폼' },
        { name: '클라우드 솔루션', href: '#services', description: 'AWS, Azure, GCP 클라우드 인프라' },
        { name: '보안 솔루션', href: '#services', description: '사이버 보안 및 데이터 보호' },
        { name: '데이터 분석', href: '#services', description: 'Big Data & AI/ML 솔루션' },
        { name: '시스템 통합', href: '#services', description: 'ERP, CRM 및 레거시 시스템 연동' },
      ]
    },
    {
      title: '소식 및 정보',
      icon: Newspaper,
      links: [
        { name: '공지사항', href: '#news', description: '최신 소식과 업데이트' },
        { name: '제품 출시', href: '#news', description: '신제품 및 서비스 출시 소식' },
        { name: '이벤트', href: '#news', description: '컨퍼런스 및 세미나 정보' },
        { name: '성공 사례', href: '#news', description: '고객 프로젝트 성공 사례' },
      ]
    },
    {
      title: '연락처 및 지원',
      icon: Mail,
      links: [
        { name: '문의하기', href: '#contact', description: '프로젝트 상담 및 문의' },
        { name: '오시는 길', href: '#contact', description: '본사 위치 및 교통편' },
        { name: '고객지원', href: 'mailto:support@techflow.co.kr', description: '기술 지원 및 문의', external: true },
        { name: '채용정보', href: '/careers', description: '함께할 인재를 찾습니다', external: true },
      ]
    },
    {
      title: '회사 정보',
      icon: Building,
      links: [
        { name: '회사 연혁', href: '#about', description: '2014년부터의 성장 여정' },
        { name: '팀 소개', href: '#about', description: '전문가 팀 구성원' },
        { name: '핵심 가치', href: '#about', description: '혁신, 신뢰, 성장, 글로벌' },
        { name: '파트너십', href: '/partners', description: '협력 파트너사', external: true },
      ]
    },
    {
      title: '리소스',
      icon: Award,
      links: [
        { name: '기술 블로그', href: '/blog', description: '기술 인사이트 및 트렌드', external: true },
        { name: '백서 다운로드', href: '/whitepapers', description: '기술 백서 및 가이드', external: true },
        { name: 'API 문서', href: '/docs', description: '개발자 문서', external: true },
        { name: '라이선스', href: '/license', description: '소프트웨어 라이선스 정보', external: true },
      ]
    },
  ];

  const companyInfo = {
    name: 'TechFlow Corporation',
    address: '서울특별시 강남구 테헤란로 123, TechFlow Tower 10층',
    phone: '02-1234-5678',
    email: 'contact@techflow.co.kr',
    businessHours: '평일 09:00-18:00, 토요일 09:00-13:00',
    established: '2014년',
    employees: '50+ 명',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            사이트 <span className="text-primary-600">맵</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            TechFlow 웹사이트의 모든 페이지와 정보를 한눈에 확인하세요.
          </p>
        </motion.div>

        {/* 사이트맵 그리드 */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {sitemapData.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
            >
              {/* 섹션 헤더 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              {/* 링크 목록 */}
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.a
                    key={linkIndex}
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {link.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {link.description}
                        </p>
                      </div>
                      {link.external && (
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 회사 정보 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          {/* 배경 장식 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                회사 정보
              </h2>
              <p className="text-xl text-white/90">
                TechFlow에 대한 기본 정보를 확인하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">주소</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">연락처</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  전화: {companyInfo.phone}<br />
                  이메일: {companyInfo.email}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">운영시간</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {companyInfo.businessHours}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">설립년도</h3>
                <p className="text-white/90 text-sm">
                  {companyInfo.established}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">직원 수</h3>
                <p className="text-white/90 text-sm">
                  {companyInfo.employees}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">회사명</h3>
                <p className="text-white/90 text-sm">
                  {companyInfo.name}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 하단 링크 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              개인정보처리방침
            </a>
            <a href="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              이용약관
            </a>
            <a href="/sitemap.xml" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              XML 사이트맵
            </a>
            <a href="/robots.txt" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              robots.txt
            </a>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            © 2024 TechFlow Corporation. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;