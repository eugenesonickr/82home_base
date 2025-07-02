import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
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
      { name: 'E-commerce Delivery', id: 'services', external: false },
      { name: '대규모 유통사 Delivery', id: 'services', external: false },
      { name: '시차제 Delivery', id: 'services', external: false },
      { name: '음료 Delivery', id: 'services', external: false },
      { name: 'Specialty Delivery', id: 'services', external: false },
    ],
    support: [
      { name: '지입정보', id: 'contact', external: false },
      { name: '배송 문의', id: 'contact', external: false },
      { name: 'FAQ', action: () => {}, external: false },
      { name: '온라인 상담', id: 'contact', external: false },
    ],
    legal: [
      { name: '개인정보처리방침', action: () => {}, external: true },
      { name: '이용약관', action: () => {}, external: true },
      { name: '사업자정보', action: () => {}, external: false },
      { name: '운송약관', action: () => {}, external: true },
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
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-500 rounded-full blur-3xl"></div>
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
        className="absolute -top-6 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-sm"
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
                  <Truck className="h-10 w-10 text-purple-400" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-gray-300">유진</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SONIC
                  </span>
                </div>
              </motion.div>
              
              <p className="text-gray-300 leading-relaxed max-w-md text-lg">
                라스트마일 딜리버리 No.1 전문 기업으로 
                전국 네트워크를 통한 신속하고 정확한 배송 서비스를 제공합니다.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-gray-300">서울특별시 용산구 청파로 40, 삼구빌딩 10층</span>
                </div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-gray-300 hover:text-white transition-colors duration-200">02-6925-6975</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300 hover:text-white transition-colors duration-200">contact@eugenesonic.co.kr</span>
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
                    className="bg-gray-800/50 hover:bg-purple-600 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50"
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
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-left flex items-center gap-2 group"
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
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-left flex items-center gap-2 group"
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
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-left flex items-center gap-2 group"
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
                <h4 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  배송 문의
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  배송 관련 문의사항이 있으시면 언제든 연락주세요
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-lg"
                >
                  지입 문의하기
                </motion.button>
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
              <span>2024 Eugene Sonic Corporation. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -1 }}
                  onClick={() => link.action?.()}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1 group"
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
              <p>사업자등록번호: 250-87-00493 | 대표이사: 오영석 | 통신판매업신고: 경기도 여주시 주내로 841, 1층(북곡동)</p>
              <p>주소: 서울특별시 용산구 청파로 40 삼구빌딩 10층 | TEL: 02-6925-6975</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;