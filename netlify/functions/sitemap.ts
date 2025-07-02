// Netlify Edge Function - 동적 사이트맵 생성
export default async (request: Request) => {
  const baseUrl = 'https://techflow.co.kr';
  
  // 정적 페이지들
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/news', priority: '0.7', changefreq: 'weekly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  // 동적 페이지들 (게시물 등)
  // 실제 구현에서는 Supabase에서 게시물 목록을 가져와야 함
  const dynamicPages = [
    // 예시 데이터
    { url: '/news/welcome-to-techflow', priority: '0.6', changefreq: 'monthly' },
    { url: '/news/2024-product-updates', priority: '0.6', changefreq: 'monthly' },
  ];

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="${baseUrl}${page.url}?lang=ko"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}?lang=en"/>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // 24시간 캐시
    },
  });
};

export const config = {
  path: '/sitemap.xml',
};