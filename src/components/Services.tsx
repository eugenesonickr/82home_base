import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Shield, 
  BarChart3, 
  Cog,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Star,
  Clock,
  Users,
  Play,
  Download,
  Zap,
  Target,
  Lightbulb,
  TrendingUp,
  Globe,
  Award,
  ChevronRight,
  Monitor,
  Database,
  Lock,
  Cpu,
  Layers,
  Settings
} from 'lucide-react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Code,
      title: '웹 개발',
      subtitle: '반응형 웹사이트 & 웹 애플리케이션',
      description: '최신 기술스택을 활용한 고성능 웹 솔루션을 제공합니다. React, Vue, Angular 등 모던 프레임워크로 사용자 경험을 극대화하며, SEO 최적화와 성능 최적화를 통해 비즈니스 목표 달성을 지원합니다.',
      detailedDescription: '현대적인 웹 개발 기술과 사용자 중심 설계를 통해 비즈니스 목표를 달성하는 웹 솔루션을 제공합니다. 반응형 디자인부터 복잡한 웹 애플리케이션까지, 모든 요구사항을 충족하는 맞춤형 솔루션을 개발합니다.',
      features: [
        { name: '반응형 웹 디자인', description: '모든 디바이스에서 완벽한 사용자 경험 제공', icon: Monitor },
        { name: 'Progressive Web App (PWA)', description: '네이티브 앱과 같은 성능과 기능', icon: Smartphone },
        { name: 'SEO 최적화', description: '검색 엔진 상위 노출을 위한 최적화', icon: TrendingUp },
        { name: '고성능 웹 애플리케이션', description: '빠른 로딩과 부드러운 인터랙션', icon: Zap },
        { name: '실시간 데이터 처리', description: 'WebSocket을 활용한 실시간 기능', icon: Database },
        { name: 'API 통합 및 개발', description: '외부 서비스와의 완벽한 연동', icon: Layers }
      ],
      advantages: [
        '최신 기술 스택 활용으로 미래 지향적 솔루션',
        '크로스 브라우저 호환성 보장',
        '확장 가능한 아키텍처 설계',
        '보안 강화 및 성능 최적화',
        '지속적인 유지보수 및 업데이트 지원'
      ],
      process: [
        { step: 1, title: '요구사항 분석', description: '고객의 비즈니스 목표와 기술적 요구사항 파악' },
        { step: 2, title: '설계 및 기획', description: 'UI/UX 설계 및 기술 아키텍처 설계' },
        { step: 3, title: '개발 및 구현', description: '애자일 방법론을 통한 단계별 개발' },
        { step: 4, title: '테스트 및 배포', description: '품질 보증 테스트 및 안전한 배포' },
        { step: 5, title: '운영 및 지원', description: '지속적인 모니터링 및 기술 지원' }
      ],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      price: '300만원부터',
      duration: '4-8주',
      rating: 4.9,
      projects: 85,
      technologies: ['React', 'Vue.js', 'Angular', 'Node.js', 'TypeScript', 'Next.js']
    },
    {
      icon: Smartphone,
      title: '모바일 앱 개발',
      subtitle: 'iOS & Android 네이티브/크로스플랫폼',
      description: '사용자 경험을 최우선으로 하는 모바일 애플리케이션을 개발합니다. 네이티브와 크로스플랫폼 모두 지원하며, 앱스토어 최적화부터 사용자 분석까지 전 과정을 지원합니다.',
      detailedDescription: '모바일 퍼스트 시대에 맞는 혁신적인 모바일 애플리케이션을 개발합니다. 사용자 중심의 직관적인 인터페이스와 뛰어난 성능을 바탕으로 비즈니스 성공을 이끄는 모바일 솔루션을 제공합니다.',
      features: [
        { name: 'React Native 크로스플랫폼', description: '하나의 코드로 iOS/Android 동시 개발', icon: Code },
        { name: '네이티브 iOS/Android 개발', description: '플랫폼별 최적화된 성능과 기능', icon: Smartphone },
        { name: 'UI/UX 디자인', description: '사용자 중심의 직관적인 인터페이스', icon: Monitor },
        { name: '앱스토어 배포 지원', description: '앱스토어 등록부터 마케팅까지', icon: Globe },
        { name: '유지보수 및 업데이트', description: '지속적인 기능 개선과 버그 수정', icon: Settings },
        { name: '푸시 알림 시스템', description: '사용자 참여도 향상을 위한 알림 기능', icon: Zap }
      ],
      advantages: [
        '플랫폼별 최적화된 사용자 경험',
        '빠른 개발 속도와 비용 효율성',
        '앱스토어 가이드라인 완벽 준수',
        '실시간 분석 및 성능 모니터링',
        '지속적인 업데이트 및 기술 지원'
      ],
      process: [
        { step: 1, title: '앱 기획 및 분석', description: '타겟 사용자 분석 및 기능 정의' },
        { step: 2, title: 'UI/UX 설계', description: '사용자 중심의 인터페이스 설계' },
        { step: 3, title: '개발 및 테스트', description: '플랫폼별 개발 및 품질 테스트' },
        { step: 4, title: '앱스토어 배포', description: '앱스토어 등록 및 승인 과정 지원' },
        { step: 5, title: '운영 및 마케팅', description: '사용자 분석 및 마케팅 지원' }
      ],
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      price: '500만원부터',
      duration: '6-12주',
      rating: 4.8,
      projects: 62,
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Redux']
    },
    {
      icon: Cloud,
      title: '클라우드 솔루션',
      subtitle: 'AWS, Azure, GCP 클라우드 인프라',
      description: '확장 가능하고 안정적인 클라우드 인프라를 구축합니다. 비용 효율적이고 보안이 강화된 클라우드 환경을 제공하며, DevOps 자동화를 통해 운영 효율성을 극대화합니다.',
      detailedDescription: '클라우드 기술의 모든 장점을 활용하여 비즈니스의 디지털 전환을 가속화합니다. 확장성, 안정성, 보안성을 모두 갖춘 클라우드 인프라를 구축하고 운영하여 비즈니스 성장을 지원합니다.',
      features: [
        { name: '클라우드 마이그레이션', description: '기존 시스템의 안전한 클라우드 이전', icon: Cloud },
        { name: 'DevOps 자동화', description: 'CI/CD 파이프라인 구축 및 자동화', icon: Cog },
        { name: '서버리스 아키텍처', description: '관리 부담 없는 확장 가능한 구조', icon: Layers },
        { name: '컨테이너 오케스트레이션', description: 'Docker & Kubernetes 기반 운영', icon: Database },
        { name: '모니터링 및 로깅', description: '실시간 시스템 모니터링 및 분석', icon: BarChart3 },
        { name: '백업 및 재해복구', description: '데이터 보호 및 비즈니스 연속성 보장', icon: Shield }
      ],
      advantages: [
        '99.9% 이상의 높은 가용성 보장',
        '사용량에 따른 유연한 비용 구조',
        '글로벌 확장 가능한 인프라',
        '자동화된 보안 및 백업 시스템',
        '24/7 모니터링 및 기술 지원'
      ],
      process: [
        { step: 1, title: '현황 분석', description: '기존 인프라 및 요구사항 분석' },
        { step: 2, title: '아키텍처 설계', description: '최적화된 클라우드 아키텍처 설계' },
        { step: 3, title: '마이그레이션', description: '단계별 안전한 클라우드 이전' },
        { step: 4, title: '최적화', description: '성능 및 비용 최적화 작업' },
        { step: 5, title: '운영 지원', description: '지속적인 모니터링 및 관리' }
      ],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      price: '200만원부터',
      duration: '3-6주',
      rating: 4.9,
      projects: 73,
      technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform']
    },
    {
      icon: Shield,
      title: '보안 솔루션',
      subtitle: '사이버 보안 & 데이터 보호',
      description: '기업의 디지털 자산을 안전하게 보호하는 보안 솔루션을 제공합니다. 최신 보안 위협에 대응하는 종합적인 보안 체계를 구축하고, 규정 준수를 지원합니다.',
      detailedDescription: '급변하는 사이버 보안 환경에서 기업의 중요한 데이터와 시스템을 보호합니다. 예방부터 대응까지 전방위적인 보안 솔루션을 통해 안전한 디지털 환경을 구축합니다.',
      features: [
        { name: '웹 애플리케이션 보안', description: 'OWASP 기준 보안 취약점 진단 및 보완', icon: Globe },
        { name: '데이터 암호화', description: '전송 및 저장 데이터 암호화 솔루션', icon: Lock },
        { name: '침입 탐지 시스템', description: '실시간 보안 위협 탐지 및 대응', icon: Shield },
        { name: '보안 컨설팅', description: '보안 정책 수립 및 컴플라이언스 지원', icon: Target },
        { name: '규정 준수 지원', description: 'GDPR, ISO27001 등 규정 준수 지원', icon: Award },
        { name: '보안 교육 및 훈련', description: '임직원 보안 인식 제고 교육', icon: Users }
      ],
      advantages: [
        '최신 보안 위협에 대한 실시간 대응',
        '규정 준수를 통한 법적 리스크 최소화',
        '비즈니스 연속성 보장',
        '고객 신뢰도 향상',
        '전문가 24/7 보안 모니터링'
      ],
      process: [
        { step: 1, title: '보안 진단', description: '현재 보안 수준 및 취약점 분석' },
        { step: 2, title: '보안 설계', description: '맞춤형 보안 아키텍처 설계' },
        { step: 3, title: '솔루션 구축', description: '보안 시스템 구축 및 설정' },
        { step: 4, title: '테스트 및 검증', description: '보안 효과성 테스트 및 검증' },
        { step: 5, title: '운영 및 관리', description: '지속적인 보안 모니터링 및 관리' }
      ],
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      price: '400만원부터',
      duration: '4-8주',
      rating: 4.7,
      projects: 45,
      technologies: ['Firewall', 'IDS/IPS', 'SIEM', 'SSL/TLS', 'OAuth', 'JWT']
    },
    {
      icon: BarChart3,
      title: '데이터 분석',
      subtitle: 'Big Data & AI/ML 솔루션',
      description: '데이터 기반 의사결정을 위한 분석 및 시각화 솔루션을 제공합니다. 머신러닝과 AI 기술로 비즈니스 인사이트를 도출하고, 예측 분석을 통해 경쟁 우위를 확보합니다.',
      detailedDescription: '빅데이터와 인공지능 기술을 활용하여 데이터에서 가치를 창출합니다. 복잡한 데이터를 직관적으로 이해할 수 있는 시각화부터 고도화된 예측 모델까지, 데이터 기반 비즈니스 혁신을 지원합니다.',
      features: [
        { name: '빅데이터 처리', description: '대용량 데이터 수집, 저장, 처리 시스템', icon: Database },
        { name: '머신러닝 모델 개발', description: '예측 및 분류 모델 개발 및 운영', icon: Cpu },
        { name: '대시보드 및 리포팅', description: '실시간 데이터 시각화 및 리포트', icon: BarChart3 },
        { name: '예측 분석', description: '미래 트렌드 예측 및 리스크 분석', icon: TrendingUp },
        { name: '실시간 데이터 스트리밍', description: '실시간 데이터 처리 및 분석', icon: Zap },
        { name: 'AI 챗봇 개발', description: '자연어 처리 기반 지능형 챗봇', icon: Lightbulb }
      ],
      advantages: [
        '데이터 기반 의사결정 지원',
        '비즈니스 프로세스 최적화',
        '고객 행동 패턴 분석',
        '운영 효율성 극대화',
        '새로운 비즈니스 기회 발굴'
      ],
      process: [
        { step: 1, title: '데이터 수집', description: '다양한 소스에서 데이터 수집 및 정제' },
        { step: 2, title: '데이터 분석', description: '탐색적 데이터 분석 및 패턴 발견' },
        { step: 3, title: '모델 개발', description: 'AI/ML 모델 개발 및 훈련' },
        { step: 4, title: '시각화 구현', description: '대시보드 및 리포팅 시스템 구축' },
        { step: 5, title: '운영 및 개선', description: '모델 성능 모니터링 및 지속 개선' }
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      price: '600만원부터',
      duration: '8-16주',
      rating: 4.8,
      projects: 38,
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'Tableau', 'Power BI']
    },
    {
      icon: Cog,
      title: '시스템 통합',
      subtitle: 'ERP, CRM 및 레거시 시스템 연동',
      description: '기존 시스템과의 완벽한 통합으로 업무 효율성을 극대화합니다. 레거시 시스템 현대화와 새로운 시스템 도입을 지원하며, 워크플로우 자동화를 통해 생산성을 향상시킵니다.',
      detailedDescription: '복잡한 기업 환경에서 다양한 시스템들을 하나로 연결하여 통합된 업무 환경을 구축합니다. 레거시 시스템의 가치를 보존하면서도 최신 기술의 이점을 활용할 수 있는 솔루션을 제공합니다.',
      features: [
        { name: 'API 개발 및 연동', description: '시스템 간 데이터 연동 및 통합', icon: Layers },
        { name: '레거시 시스템 현대화', description: '기존 시스템의 점진적 현대화', icon: Cog },
        { name: 'ERP/CRM 커스터마이징', description: '비즈니스에 맞는 시스템 최적화', icon: Settings },
        { name: '워크플로우 자동화', description: '업무 프로세스 자동화 및 최적화', icon: Zap },
        { name: '시스템 성능 최적화', description: '기존 시스템 성능 개선 및 튜닝', icon: TrendingUp },
        { name: '데이터 마이그레이션', description: '안전한 데이터 이전 및 변환', icon: Database }
      ],
      advantages: [
        '업무 효율성 대폭 향상',
        '데이터 일관성 및 정확성 보장',
        '운영 비용 절감',
        '의사결정 속도 향상',
        '비즈니스 프로세스 표준화'
      ],
      process: [
        { step: 1, title: '현황 분석', description: '기존 시스템 및 업무 프로세스 분석' },
        { step: 2, title: '통합 설계', description: '시스템 통합 아키텍처 설계' },
        { step: 3, title: '개발 및 연동', description: 'API 개발 및 시스템 연동 작업' },
        { step: 4, title: '테스트 및 검증', description: '통합 테스트 및 성능 검증' },
        { step: 5, title: '운영 및 지원', description: '안정적인 운영 및 지속적 지원' }
      ],
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      price: '800만원부터',
      duration: '10-20주',
      rating: 4.9,
      projects: 29,
      technologies: ['REST API', 'GraphQL', 'ESB', 'Microservices', 'RPA', 'ETL']
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary-500 rounded-full blur-3xl"></div>
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
            <span className="text-primary-600">전문적인</span> IT 서비스
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            다양한 산업 분야의 경험을 바탕으로 고객 맞춤형 IT 솔루션을 제공하여
            비즈니스 성공을 지원합니다.
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
                selectedService === index ? 'border-primary-500 ring-4 ring-primary-100' : 'border-transparent'
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

                {/* 평점 및 프로젝트 수 */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-800">{service.rating}</span>
                  </div>
                </div>

                {/* 호버 시 표시되는 정보 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard === index ? 1 : 0,
                    y: hoveredCard === index ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">{service.projects}개 프로젝트</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 서비스 정보 */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-primary-600 font-semibold mb-3">{service.subtitle}</p>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{service.description}</p>
                
                {/* 가격 정보 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                  <span className="text-sm text-gray-500">예상 비용</span>
                </div>

                {/* 자세히 보기 버튼 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors duration-200"
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
                <h4 className="text-lg font-semibold mb-4">주요 기술 스택</h4>
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
                <Target className="w-8 h-8 text-primary-600" />
                개발 프로세스
              </h4>
              <div className="relative">
                {/* 프로세스 라인 */}
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 hidden lg:block"></div>
                
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
                      <Clock className="w-6 h-6 text-primary-600" />
                      <span className="font-semibold text-gray-900">개발 기간</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-600">
                      {services[selectedService].duration}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-primary-600" />
                      <span className="font-semibold text-gray-900">완료 프로젝트</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-600">
                      {services[selectedService].projects}개
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">시작 가격</p>
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
                className="flex-1 max-w-xs bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                상담 요청하기
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                포트폴리오 보기
                <ExternalLink size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 max-w-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                서비스 가이드
                <Download size={20} />
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
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                맞춤형 솔루션이 필요하신가요?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                고객의 특별한 요구사항에 맞는 커스텀 솔루션을 제공합니다.
                전문가와 상담하여 최적의 해결책을 찾아보세요.
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
                  className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  무료 상담 신청
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  포트폴리오 다운로드
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