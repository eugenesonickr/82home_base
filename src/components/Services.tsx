import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Clock, 
  MapPin, 
  BarChart3, 
  Monitor,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Star,
  Users,
  Globe,
  Award,
  ChevronRight,
  ShoppingCart,
  Building,
  Coffee,
  Zap,
  Target,
  Calendar,
  Shield
} from 'lucide-react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: ShoppingCart,
      title: 'E-commerce Delivery',
      subtitle: '온라인 쇼핑몰 전용 배송 서비스',
      description: '고객 주문 접수/상품 및 택배송장 출력부터 재고 관리 및 택배 상차까지 고객에게 가장 빠르고 정확한 배송서비스를 제공합니다.',
      detailedDescription: '온라인 쇼핑몰의 모든 배송 프로세스를 원스톱으로 관리하는 전문 서비스입니다. 주문 접수부터 최종 배송까지 체계적인 관리 시스템을 통해 고객 만족도를 극대화합니다.',
      features: [
        { name: '고객 주문 접수/상품', description: '실시간 주문 처리 및 상품 관리', icon: Package },
        { name: '시간대별 맞춤 배송', description: '고객 요청에 따른 시간대별 배송', icon: Clock },
        { name: '재고 관리', description: '체계적인 재고 관리 시스템', icon: BarChart3 },
        { name: '택배 상차 서비스', description: '효율적인 상차 및 배송 관리', icon: Truck },
        { name: '실시간 배송 추적', description: '배송 현황 실시간 모니터링', icon: Monitor },
        { name: '고객 서비스 지원', description: '24시간 고객 문의 대응', icon: Users }
      ],
      advantages: [
        '원스톱 배송 솔루션 제공',
        '실시간 주문 및 배송 관리',
        '고객 맞춤형 배송 서비스',
        '체계적인 재고 관리 시스템',
        '전국 네트워크를 통한 신속 배송'
      ],
      process: [
        { step: 1, title: '주문 접수', description: '고객 주문 실시간 접수 및 처리' },
        { step: 2, title: '상품 준비', description: '재고 확인 및 상품 포장 준비' },
        { step: 3, title: '배송 출발', description: '최적 경로를 통한 배송 시작' },
        { step: 4, title: '실시간 추적', description: '배송 현황 실시간 모니터링' },
        { step: 5, title: '배송 완료', description: '안전한 배송 완료 및 확인' }
      ],
      image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      price: '문의',
      duration: '즉시 시작',
      rating: 4.9,
      projects: 500,
      technologies: ['실시간 추적', '재고관리', '주문처리', '배송최적화', '고객관리', 'API연동']
    },
    {
      icon: Building,
      title: '대규모 유통사 Delivery',
      subtitle: '대형 유통업체 전용 배송 솔루션',
      description: '대규모 유통사의 복잡한 배송 요구사항을 충족하는 전문 서비스로, 대량 물량 처리와 전국 네트워크를 통한 효율적인 배송을 제공합니다.',
      detailedDescription: '대형 유통업체의 특수한 요구사항에 맞춘 전문 배송 서비스입니다. 대량 물량 처리 능력과 전국 네트워크를 바탕으로 안정적이고 효율적인 배송 솔루션을 제공합니다.',
      features: [
        { name: '대량 물량 처리', description: '일일 수만 건의 배송 물량 처리', icon: Package },
        { name: '전국 네트워크', description: '전국 주요 도시 당일 배송', icon: Globe },
        { name: '전용 배송 시스템', description: '유통사 맞춤형 배송 시스템', icon: Monitor },
        { name: '실시간 재고 연동', description: '유통사 재고 시스템과 실시간 연동', icon: BarChart3 },
        { name: '전문 배송팀', description: '대형 유통사 전담 배송팀 운영', icon: Users },
        { name: '품질 관리', description: '엄격한 품질 관리 및 모니터링', icon: Award }
      ],
      advantages: [
        '대량 물량 안정적 처리',
        '전국 동시 배송 가능',
        '유통사 시스템과 완벽 연동',
        '전문 배송팀 운영',
        '실시간 배송 현황 관리'
      ],
      process: [
        { step: 1, title: '물량 접수', description: '대량 배송 물량 일괄 접수' },
        { step: 2, title: '권역별 분류', description: '전국 권역별 물량 분류 및 배정' },
        { step: 3, title: '동시 배송', description: '전국 네트워크 동시 배송 시작' },
        { step: 4, title: '진행 모니터링', description: '실시간 배송 진행 상황 모니터링' },
        { step: 5, title: '완료 보고', description: '배송 완료 현황 종합 보고' }
      ],
      image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      price: '문의',
      duration: '24시간',
      rating: 4.8,
      projects: 200,
      technologies: ['대량처리', '전국네트워크', '실시간연동', '품질관리', '전담팀', '모니터링']
    },
    {
      icon: Clock,
      title: '시차제 Delivery',
      subtitle: '시간대별 맞춤 배송 서비스',
      description: '고객의 라이프스타일에 맞춘 시간대별 배송 서비스로, 새벽 배송부터 심야 배송까지 다양한 시간대 옵션을 제공합니다.',
      detailedDescription: '현대인의 다양한 라이프스타일에 맞춘 시간대별 맞춤 배송 서비스입니다. 새벽, 오전, 오후, 저녁, 심야 등 고객이 원하는 시간에 정확하게 배송합니다.',
      features: [
        { name: '새벽 배송', description: '새벽 6시부터 시작하는 조기 배송', icon: Clock },
        { name: '시간 지정 배송', description: '고객 요청 시간에 정확한 배송', icon: Target },
        { name: '당일 배송', description: '주문 당일 배송 완료', icon: Zap },
        { name: '야간 배송', description: '직장인을 위한 저녁 시간 배송', icon: Clock },
        { name: '주말 배송', description: '주말에도 정상 배송 서비스', icon: Calendar },
        { name: '실시간 알림', description: '배송 전 고객 사전 알림 서비스', icon: Monitor }
      ],
      advantages: [
        '고객 맞춤형 시간대 배송',
        '24시간 배송 서비스 가능',
        '정확한 시간 약속 준수',
        '다양한 배송 옵션 제공',
        '고객 편의성 극대화'
      ],
      process: [
        { step: 1, title: '시간 선택', description: '고객이 원하는 배송 시간대 선택' },
        { step: 2, title: '일정 확인', description: '배송 가능 시간 확인 및 예약' },
        { step: 3, title: '사전 알림', description: '배송 전 고객에게 사전 알림' },
        { step: 4, title: '정시 배송', description: '약속된 시간에 정확한 배송' },
        { step: 5, title: '완료 확인', description: '배송 완료 및 고객 만족도 확인' }
      ],
      image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      price: '문의',
      duration: '맞춤 시간',
      rating: 4.9,
      projects: 300,
      technologies: ['시간관리', '실시간알림', '당일배송', '야간배송', '주말배송', '고객맞춤']
    },
    {
      icon: Coffee,
      title: '음료 Delivery',
      subtitle: '음료 전문 배송 서비스',
      description: '음료류의 특성을 고려한 전문 배송 서비스로, 온도 관리와 안전한 포장을 통해 최상의 상태로 배송합니다.',
      detailedDescription: '음료류의 특수한 특성을 완벽하게 이해하고 관리하는 전문 배송 서비스입니다. 온도 유지, 안전 포장, 신속 배송을 통해 음료의 품질을 보장합니다.',
      features: [
        { name: '온도 관리', description: '음료별 최적 온도 유지 배송', icon: Coffee },
        { name: '안전 포장', description: '파손 방지 전문 포장 시스템', icon: Package },
        { name: '신속 배송', description: '신선도 유지를 위한 빠른 배송', icon: Zap },
        { name: '대량 주문', description: '이벤트용 대량 주문 처리', icon: BarChart3 },
        { name: '정기 배송', description: '카페, 사무실 정기 배송 서비스', icon: Clock },
        { name: '품질 보장', description: '배송 중 품질 관리 및 보장', icon: Award }
      ],
      advantages: [
        '음료 특성에 맞춘 전문 배송',
        '온도 및 품질 관리 시스템',
        '안전한 포장 및 운송',
        '신속한 배송으로 신선도 유지',
        '대량 주문 처리 가능'
      ],
      process: [
        { step: 1, title: '주문 접수', description: '음료 종류별 주문 접수 및 확인' },
        { step: 2, title: '전문 포장', description: '음료 특성에 맞는 전문 포장' },
        { step: 3, title: '온도 관리', description: '배송 중 최적 온도 유지' },
        { step: 4, title: '신속 배송', description: '신선도 유지를 위한 빠른 배송' },
        { step: 5, title: '품질 확인', description: '배송 완료 후 품질 상태 확인' }
      ],
      image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      price: '문의',
      duration: '2-4시간',
      rating: 4.7,
      projects: 150,
      technologies: ['온도관리', '전문포장', '신속배송', '품질보장', '대량처리', '정기배송']
    },
    {
      icon: Star,
      title: 'Specialty Delivery',
      subtitle: '특수 품목 전문 배송',
      description: '특별한 관리가 필요한 상품들을 위한 전문 배송 서비스로, 고가품, 깨지기 쉬운 물품, 특수 포장이 필요한 상품을 안전하게 배송합니다.',
      detailedDescription: '일반 배송으로는 처리하기 어려운 특수 품목들을 위한 전문 배송 서비스입니다. 각 상품의 특성에 맞는 맞춤형 배송 솔루션을 제공합니다.',
      features: [
        { name: '고가품 배송', description: '고가 상품 전용 보안 배송', icon: Shield },
        { name: '깨지기 쉬운 물품', description: '유리, 도자기 등 파손 방지 배송', icon: Package },
        { name: '특수 포장', description: '상품별 맞춤형 특수 포장', icon: Package },
        { name: '보험 서비스', description: '고가품 배송 보험 서비스', icon: Award },
        { name: '전담 배송원', description: '특수 품목 전담 배송원 배정', icon: Users },
        { name: '실시간 추적', description: '고가품 실시간 위치 추적', icon: Monitor }
      ],
      advantages: [
        '특수 품목별 맞춤 배송',
        '전문 배송원 및 장비 사용',
        '완벽한 보안 및 보험 서비스',
        '파손 위험 최소화',
        '고객 맞춤형 서비스'
      ],
      process: [
        { step: 1, title: '상품 분석', description: '특수 품목 특성 분석 및 평가' },
        { step: 2, title: '맞춤 포장', description: '상품별 최적 포장 방법 적용' },
        { step: 3, title: '전담 배송', description: '전문 배송원을 통한 안전 배송' },
        { step: 4, title: '실시간 관리', description: '배송 전 과정 실시간 모니터링' },
        { step: 5, title: '안전 인도', description: '고객 직접 인수 및 상태 확인' }
      ],
      image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      price: '문의',
      duration: '맞춤 일정',
      rating: 4.8,
      projects: 100,
      technologies: ['특수포장', '보안배송', '보험서비스', '전담배송', '실시간추적', '맞춤서비스']
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 메인 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-purple-600">전문적인</span> 딜리버리 서비스
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            유진소닉은 다양한 온/오프라인 고객사 운영 노하우를 통해
            고객의 시간대별 맞춤 배송에 특화되어 있습니다.
          </p>
        </motion.div>

        {/* 서비스 개요 카드 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedService(index)}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 overflow-hidden group ${
                selectedService === index ? 'border-purple-500 ring-4 ring-purple-100' : 'border-transparent'
              }`}
            >
              {/* 서비스 이미지 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* 서비스 아이콘 */}
                <div className="absolute top-4 left-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* 평점 */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-800">{service.rating}</span>
                  </div>
                </div>
              </div>

              {/* 서비스 정보 */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-purple-600 font-semibold mb-3">{service.subtitle}</p>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{service.description}</p>
                
                {/* 가격 정보 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>

                {/* 자세히 보기 버튼 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-200"
                >
                  자세히 보기
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 선택된 서비스 상세 정보 */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-20"
        >
          {/* 서비스 헤더 */}
          <div className={`bg-gradient-to-r ${services[selectedService].color} p-8 lg:p-12 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                {(() => {
                  const ServiceIcon = services[selectedService].icon;
                  return (
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                      <ServiceIcon className="w-10 h-10 text-white" />
                </div>
                  );
                })()}
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-2">
                    {services[selectedService].title}
                  </h3>
                  <p className="text-xl text-white/90">
                    {services[selectedService].subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-4xl">
                {services[selectedService].detailedDescription}
              </p>

              {/* 기술 스택 */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">주요 서비스 특징</h4>
                <div className="flex flex-wrap gap-3">
                  {services[selectedService].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 서비스 상세 내용 */}
          <div className="p-8 lg:p-12">
            {/* 주요 기능 섹션 */}
            <div className="mb-16">
              <h4 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                주요 기능 및 서비스
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services[selectedService].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${services[selectedService].color} rounded-lg flex items-center justify-center mr-4`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="text-lg font-bold text-gray-900">{feature.name}</h5>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 프로세스 플로우 섹션 */}
            <div className="mb-16">
              <h4 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-600" />
                서비스 프로세스
              </h4>
              <div className="relative">
                {/* 프로세스 라인 */}
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 hidden lg:block"></div>
                
                <div className="grid lg:grid-cols-5 gap-8">
                  {services[selectedService].process.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative"
                    >
                      {/* 스텝 번호 */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${services[selectedService].color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto relative z-10 shadow-lg`}>
                        {step.step}
                      </div>
                      
                      {/* 스텝 내용 */}
                      <div className="text-center">
                        <h5 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                      </div>

                      {/* 화살표 (모바일에서만) */}
                      {index < services[selectedService].process.length - 1 && (
                        <div className="flex justify-center mt-6 lg:hidden">
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 장점 및 혜택 섹션 */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* 장점 */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-500" />
                  주요 장점
                </h4>
                <div className="space-y-4">
                  {services[selectedService].advantages.map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{advantage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 서비스 정보 카드 */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">서비스 정보</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <span className="font-semibold text-gray-900">서비스 시간</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      {services[selectedService].duration}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                      <span className="font-semibold text-gray-900">완료 프로젝트</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      {services[selectedService].projects}개
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">서비스 문의</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">
                      {services[selectedService].price}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold text-gray-700">
                        {services[selectedService].rating}
                      </span>
                      <span className="text-gray-500">/ 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA 버튼들 */}
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
                className="flex-1 max-w-xs bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                지입 문의하기
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                서비스 자료 보기
                <ExternalLink size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 추가 CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                맞춤형 배송 솔루션이 필요하신가요?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                고객의 특별한 요구사항에 맞는 커스텀 배송 솔루션을 제공합니다.
                전문가와 상담하여 최적의 배송 서비스를 찾아보세요.
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
                  className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  무료 상담 신청
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  서비스 가이드 다운로드
                </motion.button>
              </div>
            </div>
            
            {/* 배경 장식 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;