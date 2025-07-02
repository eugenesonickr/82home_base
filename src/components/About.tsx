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
  Lightbulb,
  Heart,
  Globe,
  Shield,
  Play,
  Linkedin,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  Code,
  Zap
} from 'lucide-react';

const About: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [expandedTeamMember, setExpandedTeamMember] = useState<number | null>(null);

  // 통계 데이터
  const stats = [
    { icon: Users, number: '200+', label: '만족한 고객', color: 'from-blue-500 to-purple-600' },
    { icon: Award, number: '150+', label: '완료된 프로젝트', color: 'from-green-500 to-teal-600' },
    { icon: TrendingUp, number: '98%', label: '고객 만족도', color: 'from-orange-500 to-red-600' },
    { icon: Target, number: '10+', label: '년간 경험', color: 'from-purple-500 to-indigo-600' },
  ];

  // 핵심 가치
  const coreValues = [
    {
      icon: Lightbulb,
      title: '혁신',
      description: '최신 기술과 창의적 사고로 혁신적인 솔루션을 제공합니다.',
      details: '우리는 끊임없는 연구개발을 통해 업계를 선도하는 기술력을 보유하고 있으며, 고객의 비즈니스에 혁신적인 변화를 가져다드립니다.',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Heart,
      title: '신뢰',
      description: '투명한 소통과 책임감 있는 서비스를 통해 신뢰를 구축합니다.',
      details: '고객과의 약속을 최우선으로 하며, 정직하고 투명한 커뮤니케이션을 통해 장기적인 파트너십을 구축합니다.',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: TrendingUp,
      title: '성장',
      description: '고객과 함께 성장하며 지속가능한 파트너십을 추구합니다.',
      details: '고객의 성공이 곧 우리의 성공이라는 믿음으로, 함께 성장하는 동반자 관계를 지향합니다.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Globe,
      title: '글로벌',
      description: '세계적 수준의 기술력으로 글로벌 시장을 선도합니다.',
      details: '국경을 넘나드는 기술력과 서비스로 글로벌 시장에서 경쟁력을 확보하고 있습니다.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
  ];

  // 회사 연혁
  const timeline = [
    {
      year: 2024,
      title: 'AI 솔루션 확장',
      description: 'AI 기반 비즈니스 솔루션 "FlowAI" 출시 및 글로벌 파트너십 확대',
      achievements: ['FlowAI 플랫폼 출시', 'AWS Advanced Partner 인증', '해외 진출 본격화'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      year: 2023,
      title: '기술 혁신의 해',
      description: '클라우드 네이티브 솔루션 강화 및 보안 기술 고도화',
      achievements: ['클라우드 솔루션 고도화', '보안 인증 획득', '개발팀 확장'],
      color: 'from-green-500 to-teal-600'
    },
    {
      year: 2022,
      title: '성장 가속화',
      description: '대기업 고객 확보 및 서비스 포트폴리오 다양화',
      achievements: ['대기업 프로젝트 수주', '모바일 앱 개발 강화', '팀 규모 2배 확장'],
      color: 'from-orange-500 to-red-600'
    },
    {
      year: 2021,
      title: '디지털 전환 리더',
      description: '코로나19 시대 디지털 전환 솔루션 선도',
      achievements: ['원격근무 솔루션 개발', '디지털 전환 컨설팅 강화', '고객 만족도 98% 달성'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      year: 2020,
      title: '안정적 성장',
      description: '체계적인 조직 구축 및 품질 관리 시스템 도입',
      achievements: ['ISO 인증 획득', '품질관리 시스템 구축', '전문 인력 확충'],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      year: 2014,
      title: 'TechFlow 설립',
      description: '혁신적인 IT 솔루션을 꿈꾸며 TechFlow 창립',
      achievements: ['회사 설립', '첫 번째 프로젝트 성공', '핵심 팀 구성'],
      color: 'from-indigo-500 to-blue-600'
    },
  ];

  // 팀 정보
  const teamMembers = [
    {
      name: '김테크',
      position: 'CEO & 창립자',
      description: '15년간의 IT 업계 경험을 바탕으로 TechFlow를 이끌고 있습니다.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['전략 기획', '비즈니스 개발', '리더십'],
      education: 'KAIST 전산학과 석사',
      experience: '15년',
      linkedin: '#',
      email: 'ceo@techflow.co.kr',
      quote: '기술로 세상을 바꾸는 것이 우리의 사명입니다.'
    },
    {
      name: '박개발',
      position: 'CTO & 기술이사',
      description: '최신 기술 트렌드를 선도하며 혁신적인 솔루션을 개발합니다.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['풀스택 개발', '클라우드 아키텍처', 'AI/ML'],
      education: '서울대학교 컴퓨터공학과',
      experience: '12년',
      linkedin: '#',
      email: 'cto@techflow.co.kr',
      quote: '코드로 꿈을 현실로 만들어갑니다.'
    },
    {
      name: '이디자인',
      position: '디자인 총괄',
      description: '사용자 중심의 직관적이고 아름다운 디자인을 추구합니다.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['UI/UX 디자인', '브랜딩', '사용자 경험'],
      education: '홍익대학교 시각디자인과',
      experience: '10년',
      linkedin: '#',
      email: 'design@techflow.co.kr',
      quote: '디자인은 단순함 속에서 완벽함을 찾는 것입니다.'
    },
    {
      name: '최마케팅',
      position: '마케팅 이사',
      description: '데이터 기반 마케팅으로 브랜드 가치를 극대화합니다.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['디지털 마케팅', '브랜드 전략', '데이터 분석'],
      education: '연세대학교 경영학과 MBA',
      experience: '8년',
      linkedin: '#',
      email: 'marketing@techflow.co.kr',
      quote: '고객의 성공이 우리 마케팅의 목표입니다.'
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
            <span className="text-primary-600">TechFlow</span>를 소개합니다
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            2014년부터 시작된 우리의 여정, 기술로 세상을 바꾸는 혁신적인 IT 솔루션 전문기업입니다.
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
                기술로 세상을 바꾸는 여정
              </h3>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  TechFlow는 2014년 설립된 이래로 끊임없는 혁신과 도전을 통해
                  국내 최고의 IT 솔루션 전문기업으로 성장해왔습니다.
                </p>
                <p>
                  우리는 단순한 기술 제공을 넘어서, 고객의 비즈니스를 깊이 이해하고
                  맞춤형 솔루션을 제공하여 디지털 전환의 성공을 보장합니다.
                </p>
                <p>
                  10년간의 경험과 200여 개의 성공 프로젝트를 통해 축적된 노하우로
                  고객의 꿈을 현실로 만들어드리고 있습니다.
                </p>
              </div>
              
              {/* 회사 정보 카드 */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <Building className="w-8 h-8 text-primary-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">설립년도</h4>
                  <p className="text-primary-600 font-semibold">2014년</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <MapPin className="w-8 h-8 text-primary-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">본사 위치</h4>
                  <p className="text-primary-600 font-semibold">서울 강남구</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 h-full">
                  <img
                    src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="TechFlow 팀"
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    전문가 팀과 함께
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    다양한 분야의 전문가들이 모여 최고의 결과를 만들어냅니다.
                    각자의 전문성을 바탕으로 시너지를 창출하며 고객의 성공을 위해 노력합니다.
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
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  숫자로 보는 TechFlow
                </h3>
                <p className="text-xl text-white/90">
                  우리의 성과와 경험을 통해 입증된 전문성
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

        {/* 비전 & 미션 상세 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              우리의 <span className="text-primary-600">비전과 미션</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TechFlow가 추구하는 가치와 목표를 통해 더 나은 미래를 만들어갑니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 비전 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-gray-900">비전</h4>
                    <p className="text-primary-600 font-semibold">Vision</p>
                  </div>
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-6">
                  "기술로 세상을 연결하고,<br />
                  혁신으로 미래를 창조하는<br />
                  <span className="text-primary-600">글로벌 IT 리더</span>"
                </blockquote>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  우리는 최첨단 기술과 창의적 사고를 바탕으로 고객의 비즈니스를 
                  성공으로 이끄는 신뢰받는 파트너가 되고자 합니다. 지속적인 혁신을 통해 
                  업계를 선도하며 글로벌 시장에서 인정받는 기업으로 성장하겠습니다.
                </p>
              </div>
            </motion.div>

            {/* 미션 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mr-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-gray-900">미션</h4>
                    <p className="text-secondary-600 font-semibold">Mission</p>
                  </div>
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-6">
                  "고객의 성공이<br />
                  우리의 성공이며,<br />
                  <span className="text-secondary-600">함께 성장하는 파트너십</span>"
                </blockquote>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  맞춤형 IT 솔루션과 전문적인 컨설팅을 통해 고객의 디지털 전환을 
                  성공적으로 지원하고 지속가능한 가치를 창출합니다. 고객과의 신뢰를 
                  바탕으로 장기적인 파트너십을 구축하며 함께 성장해나갑니다.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 핵심 가치 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              핵심 <span className="text-primary-600">가치</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TechFlow를 이끄는 네 가지 핵심 가치로 고객과 함께 성장합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
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
                  <div className={`absolute inset-0 ${value.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      {value.title}
                    </h4>
                    
                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                      {value.description}
                    </p>
                    
                    <p className="text-sm text-gray-500 text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {value.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 회사 연혁 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              TechFlow의 <span className="text-primary-600">성장 여정</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              2014년부터 현재까지, 끊임없는 혁신과 성장의 발자취를 따라가보세요.
            </p>
          </div>

          {/* 타임라인 네비게이션 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {timeline.map((item) => (
              <motion.button
                key={item.year}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedYear(item.year)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedYear === item.year
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {item.year}
              </motion.button>
            ))}
          </div>

          {/* 선택된 연도 상세 정보 */}
          {timeline.map((item) => (
            selectedYear === item.year && (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mr-6`}>
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-4xl font-bold text-gray-900">{item.year}</h4>
                        <p className="text-xl text-primary-600 font-semibold">{item.title}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {item.description}
                    </p>
                    
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-4">주요 성과</h5>
                      <div className="space-y-3">
                        {item.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            <span className="text-gray-700">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-1 shadow-2xl`}>
                      <div className="bg-white rounded-xl p-8 text-center">
                        <div className="text-6xl font-bold text-gray-900 mb-4">{item.year}</div>
                        <div className="text-xl font-semibold text-gray-700 mb-4">{item.title}</div>
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">연도별 이미지</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>

        {/* 팀 소개 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              우리의 <span className="text-primary-600">팀</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              각 분야의 전문가들이 모여 TechFlow의 비전을 실현해나가고 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* 프로필 이미지 */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 소셜 링크 */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={member.linkedin}
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={`mailto:${member.email}`}
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4 text-gray-600" />
                      </motion.a>
                    </div>
                  </div>

                  {/* 팀원 정보 */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-primary-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    {/* 전문 분야 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* 확장 버튼 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setExpandedTeamMember(
                        expandedTeamMember === index ? null : index
                      )}
                      className="w-full flex items-center justify-center gap-2 text-primary-600 font-semibold py-2 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    >
                      더 보기
                      {expandedTeamMember === index ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.button>

                    {/* 확장된 정보 */}
                    {expandedTeamMember === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">학력: </span>
                            <span className="text-gray-600">{member.education}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">경력: </span>
                            <span className="text-gray-600">{member.experience}</span>
                          </div>
                          <blockquote className="italic text-gray-600 border-l-4 border-primary-200 pl-3">
                            "{member.quote}"
                          </blockquote>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 회사 영상 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              TechFlow <span className="text-primary-600">소개 영상</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              영상으로 만나보는 TechFlow의 이야기와 비전
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-2xl p-8">
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                  {/* YouTube 임베드 플레이스홀더 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                      <h4 className="text-xl font-semibold mb-2">TechFlow 소개 영상</h4>
                      <p className="text-white/80">클릭하여 재생</p>
                    </div>
                  </div>
                  
                  {/* 실제 YouTube 임베드는 여기에 */}
                  {/* <iframe
                    className="w-full h-full"
                    src="https://youtu.be/kfLN0fOJkhI"
                    title="TechFlow 소개 영상"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    TechFlow의 기술력과 비전, 그리고 고객 성공 사례를 영상으로 만나보세요.
                  </p>
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
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                TechFlow와 함께 <span className="text-primary-400">미래를 만들어가세요</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                혁신적인 기술과 전문적인 서비스로 여러분의 비즈니스 성공을 지원하겠습니다.
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
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  상담 문의하기
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  회사 브로셔 다운로드
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