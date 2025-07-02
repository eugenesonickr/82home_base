import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  Calendar,
  MapPin,
  Building,
  Truck,
  Package,
  Globe,
  Shield,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Clock
} from 'lucide-react';

const About: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [expandedTeamMember, setExpandedTeamMember] = useState<number | null>(null);

  // 통계 데이터
  const stats = [
    { icon: Truck, number: '1,000+', label: '보유 차량', color: 'from-purple-500 to-indigo-600' },
    { icon: Package, number: '50만+', label: '월 배송량', color: 'from-green-500 to-teal-600' },
    { icon: MapPin, number: '전국', label: '서비스 지역', color: 'from-orange-500 to-red-600' },
    { icon: Users, number: '2,000+', label: '배송 파트너', color: 'from-blue-500 to-purple-600' },
  ];

  // 핵심 서비스
  const coreServices = [
    {
      icon: Package,
      title: 'Delivery Network',
      description: '다양한 배송 전문인력과 직영차량 네트워크를 보유해 전국 어디에서나 일관된 배송 서비스를 제공합니다.',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Truck,
      title: 'Direct Delivery',
      description: '업계 최고 수준의 딜리버리 네트워크를 기반으로 처음부터 끝까지 직접 실행합니다.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Target,
      title: 'Delivery Know-how',
      description: '다양한 고객의 딜리버리 운영 노하우를 통해 최적의 서비스를 제공합니다.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: MapPin,
      title: 'Territory Management',
      description: '전국단위 권역별 담당자가 배송 전문인력과 차량에 대한 밀착 관리를 진행하고 있습니다.',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Clock,
      title: 'SOMAS',
      description: '배송 서비스 수행 중 발생하는 모든 이슈는 실시간 모니터링을 통해 관리하고 즉각 대응이 가능합니다.',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* 메인 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-purple-600">EUGENE SONIC</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            유진소닉은 라스트마일 딜리버리 전문 물류회사로<br />
            직영기반의 전국단위 딜리버리 네트워크와 직접실행력,<br />
            권역별 관리체계를 통해 고객에게 가장 빠르고 정확한<br />
            배송서비스를 제공합니다.
          </p>
        </motion.div>

        {/* 회사 개요 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                라스트마일 딜리버리 전문 기업
              </h3>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  유진소닉은 민첩하고 유연한 대응을 통해 고객만족을 향상시키고 있습니다.
                </p>
                <p>
                  대규모 차량 인프라로 전국 어디에서나 일관된 서비스를 제공하며,
                  직영 프로세스로 고객과 배송기사님의 문제를 빠르게 해결합니다.
                </p>
                <p>
                  다양한 온/오프라인 고객사 운영 노하우를 통해 
                  고객의 시간대별 맞춤 배송에 특화되어 있습니다.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 h-full">
                  <img
                    src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="유진소닉 배송 서비스"
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    전국 네트워크
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    전국 주요 지역에 딜리버리 Territory Management 네트워크를 구축하여 
                    고객의 다양한 니즈에 신속하게 대응합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  숫자로 보는 유진소닉
                </h3>
                <p className="text-xl text-white/90">
                  전국 최대 규모의 라스트마일 딜리버리 네트워크
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 핵심 서비스 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              유진소닉의 <span className="text-purple-600">고품질 딜리버리 서비스</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              유진소닉은 라스트마일 딜리버리 분야의 다양한 역량을 바탕으로 고객에게 고품질 딜리버리 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 relative overflow-hidden">
                  <div className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {service.title}
                    </h4>
                    
                    <p className="text-gray-600 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Territory Management 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Territory Management <span className="text-purple-600">네트워크 구축</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                전국 주요 지역에 딜리버리 Territory Management 네트워크를 구축하여 고객의 다양한 니즈에 신속하게 대응합니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">권역별 배송 이슈 대응 및 배송운영 안정화</h4>
                    <p className="text-gray-600">각 권역별 특성에 맞는 맞춤형 배송 서비스 제공</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">권역별 정기적인 배송 차량 점검 및 배송기사교육</h4>
                    <p className="text-gray-600">지속적인 품질 관리와 서비스 향상을 위한 체계적 관리</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">권역별 딜리버리 네트워크 관리 체계화</h4>
                    <p className="text-gray-600">효율적인 배송 네트워크 운영을 위한 체계적 관리</p>
                  </div>
                </motion.div>
              </div>

              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Territory Management 네트워크"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-bold mb-2">전국 네트워크</h4>
                  <p className="text-white/90">수도권, 충청·강원권, 전라권, 경상권</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                유진소닉과 함께 <span className="text-purple-400">성공적인 배송을 경험하세요</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                전국 최대 규모의 딜리버리 네트워크와 전문적인 서비스로 
                여러분의 비즈니스 성공을 지원하겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  지입 문의하기
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  서비스 자료 다운로드
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;