import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Compass, 
  Heart, 
  Lightbulb, 
  Users, 
  TrendingUp,
  Award,
  Globe,
  Zap
} from 'lucide-react';

const VisionMission: React.FC = () => {
  const stats = [
    { number: '10+', label: '년간 경험', icon: Award },
    { number: '200+', label: '성공 프로젝트', icon: TrendingUp },
    { number: '98%', label: '고객 만족도', icon: Heart },
    { number: '50+', label: '전문 인력', icon: Users },
  ];

  const coreValues = [
    {
      icon: Lightbulb,
      title: '혁신',
      description: '최신 기술과 창의적 사고로 혁신적인 솔루션을 제공합니다.',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
    },
    {
      icon: Heart,
      title: '신뢰',
      description: '투명한 소통과 책임감 있는 서비스를 통해 신뢰를 구축합니다.',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
    },
    {
      icon: TrendingUp,
      title: '성장',
      description: '고객과 함께 성장하며 지속가능한 파트너십을 추구합니다.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
    },
    {
      icon: Globe,
      title: '글로벌',
      description: '세계적 수준의 기술력으로 글로벌 시장을 선도합니다.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            우리의 <span className="text-primary-600">비전과 미션</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TechFlow는 기술을 통해 더 나은 세상을 만들어가는 것을 목표로 합니다.
          </p>
        </motion.div>

        {/* 비전과 미션 메인 섹션 */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* 비전 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">비전</h3>
                  <p className="text-primary-600 font-semibold">Vision</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
                  "기술로 세상을 연결하고,<br />
                  혁신으로 미래를 창조하는<br />
                  <span className="text-primary-600">글로벌 IT 리더</span>"
                </blockquote>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  우리는 최첨단 기술과 창의적 사고를 바탕으로 고객의 비즈니스를 
                  성공으로 이끄는 신뢰받는 파트너가 되고자 합니다.
                </p>
              </div>

              {/* 장식 요소 */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          {/* 미션 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mr-6">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">미션</h3>
                  <p className="text-secondary-600 font-semibold">Mission</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
                  "고객의 성공이<br />
                  우리의 성공이며,<br />
                  <span className="text-secondary-600">함께 성장하는 파트너십</span>"
                </blockquote>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  맞춤형 IT 솔루션과 전문적인 컨설팅을 통해 고객의 디지털 전환을 
                  성공적으로 지원하고 지속가능한 가치를 창출합니다.
                </p>
              </div>

              {/* 장식 요소 */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary-500/20 to-primary-500/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <Zap 
                    key={i}
                    className="absolute w-8 h-8 text-white"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                ))}
              </div>
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
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* 핵심 가치 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            핵심 <span className="text-primary-600">가치</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TechFlow를 이끄는 네 가지 핵심 가치로 고객과 함께 성장합니다.
          </p>
        </motion.div>

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
                {/* 호버 시 배경 효과 */}
                <div className={`absolute inset-0 ${value.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors duration-300">
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>

                {/* 장식 요소 */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                TechFlow와 함께 <span className="text-primary-400">미래를 만들어가세요</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                혁신적인 기술과 전문적인 서비스로 여러분의 비즈니스 성공을 지원하겠습니다.
              </p>
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
                지금 시작하기
              </motion.button>
            </div>
            
            {/* 배경 장식 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-500 rounded-full blur-3xl"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;