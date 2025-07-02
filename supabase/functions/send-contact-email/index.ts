import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  inquiryType?: string
  message: string
  timestamp: string
  userAgent: string
}

serve(async (req) => {
  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData: ContactFormData = await req.json()
    
    // 입력 데이터 검증
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: '필수 필드가 누락되었습니다.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: '올바른 이메일 형식이 아닙니다.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // 문의 유형 매핑
    const inquiryTypeMap: Record<string, string> = {
      general: '일반 문의',
      project: '프로젝트 상담',
      partnership: '파트너십',
      support: '기술 지원',
      quote: '견적 요청',
      other: '기타'
    }

    const inquiryTypeLabel = formData.inquiryType 
      ? inquiryTypeMap[formData.inquiryType] || formData.inquiryType
      : '미선택'

    // 이메일 내용 구성
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>TechFlow 문의 접수</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563EB, #0EA5E9); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #2563EB; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2563EB; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; margin-top: 10px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
        .urgent { background: #fff3cd; border-left-color: #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ TechFlow 문의 접수</h1>
            <p>새로운 고객 문의가 접수되었습니다</p>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">📅 접수 시간</span>
                <div class="value">${new Date(formData.timestamp).toLocaleString('ko-KR')}</div>
            </div>
            
            <div class="field">
                <span class="label">👤 고객 정보</span>
                <div class="value">
                    <strong>이름:</strong> ${formData.name}<br>
                    <strong>이메일:</strong> ${formData.email}<br>
                    ${formData.company ? `<strong>회사:</strong> ${formData.company}<br>` : ''}
                    ${formData.phone ? `<strong>연락처:</strong> ${formData.phone}<br>` : ''}
                </div>
            </div>
            
            <div class="field">
                <span class="label">📋 문의 유형</span>
                <div class="value ${formData.inquiryType === 'support' ? 'urgent' : ''}">${inquiryTypeLabel}</div>
            </div>
            
            <div class="field">
                <span class="label">💬 문의 내용</span>
                <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
                <span class="label">🔧 기술 정보</span>
                <div class="value" style="font-size: 12px; color: #666;">
                    User Agent: ${formData.userAgent}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>이 메일은 TechFlow 웹사이트 문의 폼을 통해 자동 생성되었습니다.</p>
            <p>빠른 시일 내에 고객에게 답변해주세요.</p>
        </div>
    </div>
</body>
</html>
    `

    // 실제 환경에서는 여기서 이메일 서비스 (예: SendGrid, Resend 등)를 사용
    // 현재는 로그만 출력하고 성공 응답 반환
    console.log('문의 접수:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      inquiryType: inquiryTypeLabel,
      message: formData.message,
      timestamp: formData.timestamp
    })

    // 성공 응답
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '문의가 성공적으로 전송되었습니다.',
        timestamp: formData.timestamp
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('문의 처리 오류:', error)
    
    return new Response(
      JSON.stringify({ 
        error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})