import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Truck, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useResponsive } from '../hooks/useResponsive';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import AccessibleButton from './common/AccessibleButton';
import VisuallyHidden from './common/VisuallyHidden';
import SkipLink from './common/SkipLink';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();
  const { screenSize } = useResponsive();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // 모바일 메뉴 키보드 네비게이션
  useKeyboardNavigation({
    isOpen: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
    containerRef: mobileMenuRef,
    autoFocus: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 현재 섹션 감지
      const sections = ['home', 'about', 'services', 'news', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'home', hasDropdown: false },
    { name: '유진소닉', id: 'about', hasDropdown: true, 
      subItems: [
        { name: '회사소개', id: 'about' },
        { name: '연혁', id: 'about' },
        { name: '조직도', id: 'about' }
      ]
    },
    { name: 'Business', id: 'services', hasDropdown: true, 
      subItems: [
        { name: 'E-commerce Delivery', id: 'services' },
        { name: '대규모 유통사 Delivery', id: 'services' },
        { name: '시차제 Delivery', id: 'services' },
        { name: '음료 Delivery', id: 'services' },
        { name: 'Specialty Delivery', id: 'services' }
      ]
    },
    { name: '채용', id: 'careers', hasDropdown: false },
    { name: '지입정보', id: 'contact', hasDropdown: false },
  ];

  return (
    <>
      {/* 스킵 링크 */}
      <SkipLink href="#main-content">메인 컨텐츠로 바로가기</SkipLink>
      
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
      role="banner"
      aria-label="메인 네비게이션"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <AccessibleButton
            onClick={() => scrollToSection('home')}
            variant="ghost"
            className="flex items-center space-x-2 p-2 -ml-2"
            ariaLabel="홈으로 이동"
            motionProps={{
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 }
            }}
          >
            <div className="relative">
              <Truck className={`h-8 w-8 transition-colors duration-300 ${
                isScrolled ? 'text-purple-600' : 'text-white'
              }`} />
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-normal transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 dark:text-gray-400' : 'text-white/80'
              }`}>
                유진
              </span>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-purple-600 dark:text-purple-400' : 'text-white'
              }`}>
                SONIC
              </span>
            </div>
          </AccessibleButton>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-1"
            role="navigation"
            aria-label="메인 메뉴"
          >
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <AccessibleButton
                  onClick={() => scrollToSection(item.id)}
                  variant="ghost"
                  size="sm"
                  ariaLabel={`${item.name} 섹션으로 이동`}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-1 ${
                    activeSection === item.id
                      ? isScrolled 
                        ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                        : 'text-white bg-white/10'
                      : isScrolled 
                        ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  motionProps={{
                    whileHover: { y: -1 },
                    whileTap: { scale: 0.95 }
                  }}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <>
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    <VisuallyHidden>하위 메뉴 있음</VisuallyHidden>
                    </>
                  )}
                </AccessibleButton>
                
                {/* 드롭다운 메뉴 */}
                {item.hasDropdown && item.subItems && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    role="menu"
                    aria-label={`${item.name} 하위 메뉴`}
                  >
                    <div className="py-2">
                      {item.subItems.map((subItem, index) => (
                        <AccessibleButton
                          key={index}
                          onClick={() => scrollToSection(subItem.id)}
                          variant="ghost"
                          size="sm"
                          ariaLabel={`${subItem.name}으로 이동`}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 rounded-none"
                          role="menuitem"
                          motionProps={{ whileHover: { x: 4 } }}
                        >
                          {subItem.name}
                        </AccessibleButton>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 우측 컨트롤 */}
          <div className="flex items-center gap-3">
            {/* 테마 토글 */}
            <ThemeToggle />
            
            {/* 언어 토글 */}
            <LanguageToggle />
            
            {/* CTA 버튼 */}
            <AccessibleButton
              onClick={() => scrollToSection('contact')}
              variant={isScrolled ? 'primary' : 'outline'}
              size="sm"
              ariaLabel="지입 문의 페이지로 이동"
              className={`hidden sm:block px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm'
              }`}
              motionProps={{
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 }
              }}
            >
              지입 문의
            </AccessibleButton>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <AccessibleButton
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="sm"
                ariaLabel={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                    : 'text-white hover:bg-white/10'
                }`}
                motionProps={{ whileTap: { scale: 0.95 } }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                <VisuallyHidden>
                  {isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                </VisuallyHidden>
              </AccessibleButton>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pb-4"
            role="navigation"
            aria-label="모바일 메뉴"
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
              {navItems.map((item) => (
                <div key={item.id}>
                  <AccessibleButton
                    onClick={() => scrollToSection(item.id)}
                    variant="ghost"
                    ariaLabel={`${item.name} 섹션으로 이동`}
                    className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    motionProps={{
                      whileHover: { x: 4 },
                      whileTap: { scale: 0.98 }
                    }}
                  >
                    {item.name}
                  </AccessibleButton>
                  
                  {/* 모바일 서브메뉴 */}
                  {item.hasDropdown && item.subItems && (
                    <div className="ml-4 mt-2 space-y-1" role="group" aria-label={`${item.name} 하위 메뉴`}>
                      {item.subItems.map((subItem, index) => (
                        <AccessibleButton
                          key={index}
                          onClick={() => scrollToSection(subItem.id)}
                          variant="ghost"
                          size="sm"
                          ariaLabel={`${subItem.name}으로 이동`}
                          className="block w-full text-left py-2 px-4 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-25 dark:hover:bg-purple-900/10 rounded-lg transition-colors duration-200"
                          motionProps={{ whileHover: { x: 2 } }}
                        >
                          {subItem.name}
                        </AccessibleButton>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* 모바일 CTA 버튼 */}
              <AccessibleButton
                onClick={() => scrollToSection('contact')}
                variant="primary"
                ariaLabel="지입 문의하기"
                className="w-full mt-4 py-3 px-6 rounded-xl shadow-lg bg-purple-600 hover:bg-purple-700"
                motionProps={{
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 }
                }}
              >
                지입 문의
              </AccessibleButton>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
    </>
  );
};

export default Header;