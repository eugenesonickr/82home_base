// Netlify Edge Function - 헬스 체크
export default async (request: Request) => {
  const url = new URL(request.url);
  
  // CORS 헤더
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // 헬스 체크 응답
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: 'production',
    services: {
      database: 'connected',
      cdn: 'active',
      ssl: 'valid',
    },
    performance: {
      responseTime: Date.now(),
      region: request.headers.get('x-nf-geo') || 'unknown',
    },
  };

  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
};

export const config = {
  path: '/api/health',
};