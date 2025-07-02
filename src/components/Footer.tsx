import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    company: [
      { name: '회사소개', id: 'about', external: false },
      { name: '연혁', action: () => {}, external: false },
      { name: '조직도', action: () => {}, external: false },
      { name: '채용정보', action: () => {}, external: true },
    ],
    services: [
      { name: '웹 개발', id: 'services', external: false },
      { name: '모바일 앱', id: 'services', external: false },
      { name: '클라우드', id: 'services', external: false },
      { name: '보안 솔루션', id: 'services', external: false },
    ],
    support: [
      { name: '고객지원', id: 'contact', external: false },
      { name: '기술문서', action: () => {}, external: true },
      { name: 'FAQ', action: () => {}, external: false },
      { name: '온라인 상담', id: 'contact', external: false },
    ],
    legal: [
      { name: '개인정보처리방침', action: () => {}, external: true },
      { name: '이용약관', action: () => {}, external: true },
      { name: '사업자정보', action: () => {}, external: false },
      { name: '라이선스', action: () => {}, external: true },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -8 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-sm"
      >
        <ArrowUp size={20} />
      </motion.button>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={scrollToTop}
              >
                <div className="relative">
                  <Zap className="h-10 w-10 text-primary-400" />
                  <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-lg"></div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  TechFlow
                </span>
              </motion.div>
              
              <p className="text-gray-300 leading-relaxed max-w-md text-lg">
                혁신적인 IT 솔루션으로 비즈니스의 디지털 전환을 이끄는 
                TechFlow와 함께 미래를 만들어가세요.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="text-gray-300">서울특별시 강남구 테헤란로 123, TechFlow Tower 10층</span>
                </div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-gray-300 hover:text-white transition-colors duration-200">02-1234-5678</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300 hover:text-white transition-colors duration-200">contact@techflow.co.kr</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">소셜 미디어</h4>
                <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-800/50 hover:bg-primary-600 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-primary-500/50"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">회사</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => link.id ? scrollToSection(link.id) : link.action?.()}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-left flex items-center gap-2 group"
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">서비스</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => link.id ? scrollToSection(link.id) : link.action?.()}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-left flex items-center gap-2 group"
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">고객지원</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => link.id ? scrollToSection(link.id) : link.action?.()}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-left flex items-center gap-2 group"
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </motion.button>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h4 className="font-semibold mb-3 text-primary-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  뉴스레터 구독
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  최신 기술 동향과 소식을 받아보세요
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-lg"
                  >
                    구독
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <span>©</span>
              <span>2024 TechFlow Corporation. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -1 }}
                  onClick={() => link.action?.()}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-1 group"
                >
                  {link.name}
                  {link.external && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/30 text-center">
            <div className="text-gray-500 text-xs space-y-1">
              <p>사업자등록번호: 123-45-67890 | 대표: 김테크 | 통신판매업신고: 2024-서울강남-1234</p>
              <p>주소: 서울특별시 강남구 테헤란로 123, TechFlow Tower 10층</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;