import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'TechFlow - 혁신적인 IT 솔루션',
  description = '비즈니스의 디지털 전환을 이끄는 IT 솔루션 전문기업. 웹 개발, 모바일 앱, 클라우드, 보안 솔루션을 제공합니다.',
  keywords = 'IT솔루션, 웹개발, 모바일앱, 클라우드, 보안, 디지털전환, TechFlow',
  image = 'https://techflow.co.kr/og-image.jpg',
  url = 'https://techflow.co.kr',
  type = 'website',
  author = 'TechFlow',
  publishedTime,
  modifiedTime,
}) => {
  const { language } = useLanguage();

  const siteTitle = 'TechFlow';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph 태그 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={language === 'ko' ? 'ko_KR' : 'en_US'} />
      
      {/* Twitter Card 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@TechFlow" />
      <meta name="twitter:creator" content="@TechFlow" />
      
      {/* 추가 메타 태그 */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* 파비콘 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* 정규 URL */}
      <link rel="canonical" href={url} />
      
      {/* 언어별 대체 URL */}
      <link rel="alternate" hrefLang="ko" href={`${url}?lang=ko`} />
      <link rel="alternate" hrefLang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* 구조화된 데이터 (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TechFlow",
          "description": description,
          "url": url,
          "logo": `${url}/logo.png`,
          "foundingDate": "2014",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "테헤란로 123",
            "addressLocality": "강남구",
            "addressRegion": "서울특별시",
            "postalCode": "06234",
            "addressCountry": "KR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+82-2-1234-5678",
            "contactType": "customer service",
            "email": "contact@techflow.co.kr"
          },
          "sameAs": [
            "https://www.linkedin.com/company/techflow",
            "https://twitter.com/techflow",
            "https://www.facebook.com/techflow"
          ]
        })}
      </script>
      
      {/* 기사 타입일 때 추가 메타 태그 */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content={keywords} />
        </>
      )}
    </Helmet>
  );
};

export default SEOHead;