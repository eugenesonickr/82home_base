import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  Building,
  Users,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  User,
  Briefcase
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inquiryTypes = [
    { value: 'general', label: '일반 문의' },
    { value: 'project', label: '프로젝트 상담' },
    { value: 'partnership', label: '파트너십' },
    { value: 'support', label: '기술 지원' },
    { value: 'quote', label: '견적 요청' },
    { value: 'other', label: '기타' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: '주소',
      info: '서울특별시 강남구 테헤란로 123',
      detail: 'TechFlow Tower 10층 (우편번호: 06234)',
      color: 'from-red-500 to-pink-600',
      action: () => window.open('https://maps.google.com/?q=서울특별시+강남구+테헤란로+123', '_blank'),
    },
    {
      icon: Phone,
      title: '전화번호',
      info: '02-1234-5678',
      detail: '평일 09:00 - 18:00 (점심시간 12:00-13:00)',
      color: 'from-green-500 to-teal-600',
      action: () => window.open('tel:02-1234-5678'),
    },
    {
      icon: Mail,
      title: '이메일',
      info: 'contact@techflow.co.kr',
      detail: '24시간 접수 가능 (영업일 기준 24시간 내 답변)',
      color: 'from-blue-500 to-purple-600',
      action: () => window.open('mailto:contact@techflow.co.kr'),
    },
    {
      icon: Clock,
      title: '운영시간',
      info: '평일 09:00 - 18:00',
      detail: '토요일 09:00 - 13:00 (일요일 및 공휴일 휴무)',
      color: 'from-orange-500 to-red-600',
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.message.trim()) {
      newErrors.message = '문의 내용을 입력해주세요.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '문의 내용을 10자 이상 입력해주세요.';
    }

    if (formData.phone && !/^[0-9-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 실시간 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Supabase Edge Function을 통한 이메일 전송
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          message: '',
        });
      } else {
        throw new Error('이메일 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('문의 전송 오류:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary-600">문의하기</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            프로젝트 상담부터 기술 문의까지, TechFlow 전문가들이 
            친절하고 신속하게 답변드리겠습니다.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={item.action}
              className={`bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                item.action ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 font-semibold mb-2">{item.info}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
              {item.action && (
                <div className="mt-3 flex items-center justify-center text-primary-600 text-sm font-medium">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  바로가기
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">프로젝트 상담 신청</h3>
                  <p className="text-gray-600">전문가와 직접 상담하세요</p>
                </div>
              </div>
              
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    문의가 성공적으로 전송되었습니다!
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    영업일 기준 24시간 내에 담당자가 연락드리겠습니다.<br />
                    긴급한 사항은 전화로 문의해주세요.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    새 문의 작성
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800">
                        문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.
                      </span>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        이름 *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="홍길동"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        이메일 *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="hong@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        회사명
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="회사명을 입력하세요"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        연락처
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="010-1234-5678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      문의 유형
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">문의 유형을 선택하세요</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      문의 내용 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="프로젝트의 목적, 예산, 일정 등 상세한 내용을 알려주시면 더 정확한 상담을 받으실 수 있습니다."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        상담 신청하기
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Office Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Office Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="TechFlow 오피스"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">TechFlow 본사</h4>
                  <p className="text-white/90 text-lg">강남구 테헤란로 핵심 비즈니스 지역</p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-lg"
              >
                <Building className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">설립년도</h4>
                <p className="text-primary-100">2014년</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white shadow-lg"
              >
                <Users className="w-8 h-8 mb-3" />
                <h4 className="font-bold mb-1">직원 수</h4>
                <p className="text-secondary-100">50+ 명</p>
              </motion.div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <h4 className="text-xl font-bold text-gray-900">오시는 길</h4>
                </div>
                <p className="text-gray-600">
                  지하철 2호선 강남역 12번 출구에서 도보 5분 거리
                </p>
              </div>
              
              {/* Google Maps Embed */}
              <div className="h-64 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15a1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6jtlZzroZw!5e0!3m2!1sko!2skr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                
                {/* 지도 로딩 실패 시 대체 컨텐츠 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h5 className="text-lg font-bold text-gray-700 mb-2">위치 안내</h5>
                    <p className="text-gray-600 mb-4">
                      서울특별시 강남구 테헤란로 123<br />
                      TechFlow Tower 10층
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => window.open('https://maps.google.com/?q=서울특별시+강남구+테헤란로+123', '_blank')}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Google Maps에서 보기
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Contact Methods */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4">기타 연락 방법</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">카카오톡 상담</p>
                    <p className="text-sm text-gray-600">@TechFlow (평일 09:00-18:00)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">긴급 연락처</p>
                    <p className="text-sm text-gray-600">010-9999-8888 (24시간)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              자주 묻는 <span className="text-primary-600">질문</span>
            </h3>
            <p className="text-gray-600">
              고객들이 자주 문의하시는 내용들을 정리했습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: '프로젝트 진행 기간은 얼마나 걸리나요?',
                answer: '프로젝트 규모와 복잡도에 따라 다르지만, 일반적으로 웹사이트는 4-8주, 모바일 앱은 6-12주 정도 소요됩니다.'
              },
              {
                question: '개발 비용은 어떻게 책정되나요?',
                answer: '요구사항 분석 후 기능 범위, 디자인 복잡도, 개발 기간 등을 종합적으로 고려하여 맞춤형 견적을 제공합니다.'
              },
              {
                question: '유지보수 서비스도 제공하나요?',
                answer: '네, 프로젝트 완료 후 1년간 무상 유지보수를 제공하며, 이후에도 유료 유지보수 서비스를 이용하실 수 있습니다.'
              },
              {
                question: '원격 상담도 가능한가요?',
                answer: '네, 화상회의를 통한 원격 상담도 가능합니다. 사전 예약을 통해 편리한 시간에 상담받으실 수 있습니다.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="font-bold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;