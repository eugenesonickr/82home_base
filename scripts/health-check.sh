#!/bin/bash

# TechFlow 웹사이트 헬스 체크 스크립트

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 설정
SITE_URL="https://techflow.co.kr"
TIMEOUT=10
MAX_RESPONSE_TIME=3000  # 3초

# 함수 정의
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# 헬스 체크 결과 추적
CHECKS_PASSED=0
CHECKS_FAILED=0
CHECKS_WARNING=0

run_check() {
    local check_name="$1"
    local check_command="$2"
    local is_critical="${3:-true}"
    
    print_status "검사 중: $check_name"
    
    if eval "$check_command" > /dev/null 2>&1; then
        print_success "$check_name"
        ((CHECKS_PASSED++))
        return 0
    else
        if [ "$is_critical" = "true" ]; then
            print_error "$check_name"
            ((CHECKS_FAILED++))
        else
            print_warning "$check_name"
            ((CHECKS_WARNING++))
        fi
        return 1
    fi
}

# 시작 메시지
echo "🏥 TechFlow 웹사이트 헬스 체크 시작..."
echo "🌐 대상 URL: $SITE_URL"
echo "⏱️  타임아웃: ${TIMEOUT}초"
echo ""

# 1. 기본 연결성 테스트
print_status "=== 기본 연결성 테스트 ==="

# DNS 해석 확인
run_check "DNS 해석" "nslookup techflow.co.kr"

# 기본 HTTP 연결
run_check "HTTP 연결" "curl -f --connect-timeout $TIMEOUT $SITE_URL"

# HTTPS 연결
run_check "HTTPS 연결" "curl -f --connect-timeout $TIMEOUT https://techflow.co.kr"

# 2. 응답 시간 테스트
print_status "=== 응답 시간 테스트 ==="

RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' --connect-timeout $TIMEOUT $SITE_URL)
RESPONSE_TIME_MS=$(echo "$RESPONSE_TIME * 1000" | bc -l | cut -d. -f1)

print_status "응답 시간: ${RESPONSE_TIME_MS}ms"

if [ "$RESPONSE_TIME_MS" -lt 1000 ]; then
    print_success "응답 시간 우수 (< 1초)"
    ((CHECKS_PASSED++))
elif [ "$RESPONSE_TIME_MS" -lt $MAX_RESPONSE_TIME ]; then
    print_success "응답 시간 양호 (< 3초)"
    ((CHECKS_PASSED++))
else
    print_warning "응답 시간 느림 (> 3초)"
    ((CHECKS_WARNING++))
fi

# 3. HTTP 상태 코드 확인
print_status "=== HTTP 상태 코드 확인 ==="

HTTP_STATUS=$(curl -o /dev/null -s -w '%{http_code}' --connect-timeout $TIMEOUT $SITE_URL)
print_status "HTTP 상태 코드: $HTTP_STATUS"

case $HTTP_STATUS in
    200)
        print_success "정상 응답 (200 OK)"
        ((CHECKS_PASSED++))
        ;;
    3*)
        print_warning "리다이렉트 응답 ($HTTP_STATUS)"
        ((CHECKS_WARNING++))
        ;;
    4*)
        print_error "클라이언트 오류 ($HTTP_STATUS)"
        ((CHECKS_FAILED++))
        ;;
    5*)
        print_error "서버 오류 ($HTTP_STATUS)"
        ((CHECKS_FAILED++))
        ;;
    *)
        print_error "알 수 없는 상태 코드 ($HTTP_STATUS)"
        ((CHECKS_FAILED++))
        ;;
esac

# 4. SSL 인증서 확인
print_status "=== SSL 인증서 확인 ==="

# SSL 인증서 유효성
run_check "SSL 인증서 유효성" "curl -f --connect-timeout $TIMEOUT https://techflow.co.kr"

# SSL 인증서 만료일 확인
SSL_EXPIRY=$(echo | openssl s_client -servername techflow.co.kr -connect techflow.co.kr:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
if [ -n "$SSL_EXPIRY" ]; then
    print_status "SSL 인증서 만료일: $SSL_EXPIRY"
    
    # 만료일까지 남은 일수 계산
    EXPIRY_TIMESTAMP=$(date -d "$SSL_EXPIRY" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$SSL_EXPIRY" +%s 2>/dev/null)
    CURRENT_TIMESTAMP=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( (EXPIRY_TIMESTAMP - CURRENT_TIMESTAMP) / 86400 ))
    
    if [ $DAYS_UNTIL_EXPIRY -gt 30 ]; then
        print_success "SSL 인증서 유효 (${DAYS_UNTIL_EXPIRY}일 남음)"
        ((CHECKS_PASSED++))
    elif [ $DAYS_UNTIL_EXPIRY -gt 7 ]; then
        print_warning "SSL 인증서 곧 만료 (${DAYS_UNTIL_EXPIRY}일 남음)"
        ((CHECKS_WARNING++))
    else
        print_error "SSL 인증서 임박한 만료 (${DAYS_UNTIL_EXPIRY}일 남음)"
        ((CHECKS_FAILED++))
    fi
fi

# 5. 보안 헤더 확인
print_status "=== 보안 헤더 확인 ==="

HEADERS=$(curl -I -s --connect-timeout $TIMEOUT $SITE_URL)

# 중요한 보안 헤더들 확인
check_header() {
    local header_name="$1"
    local header_pattern="$2"
    local is_critical="${3:-false}"
    
    if echo "$HEADERS" | grep -qi "$header_pattern"; then
        print_success "$header_name 헤더 존재"
        ((CHECKS_PASSED++))
    else
        if [ "$is_critical" = "true" ]; then
            print_error "$header_name 헤더 누락"
            ((CHECKS_FAILED++))
        else
            print_warning "$header_name 헤더 누락"
            ((CHECKS_WARNING++))
        fi
    fi
}

check_header "X-Frame-Options" "x-frame-options"
check_header "X-Content-Type-Options" "x-content-type-options"
check_header "X-XSS-Protection" "x-xss-protection"
check_header "Strict-Transport-Security" "strict-transport-security"
check_header "Content-Security-Policy" "content-security-policy"

# 6. 핵심 페이지 확인
print_status "=== 핵심 페이지 확인 ==="

# 메인 페이지 콘텐츠 확인
MAIN_CONTENT=$(curl -s --connect-timeout $TIMEOUT $SITE_URL)

check_content() {
    local content_name="$1"
    local content_pattern="$2"
    
    if echo "$MAIN_CONTENT" | grep -qi "$content_pattern"; then
        print_success "$content_name 콘텐츠 확인"
        ((CHECKS_PASSED++))
    else
        print_error "$content_name 콘텐츠 누락"
        ((CHECKS_FAILED++))
    fi
}

check_content "페이지 제목" "<title>.*TechFlow"
check_content "메인 헤딩" "TechFlow\|혁신적인 IT 솔루션"
check_content "네비게이션" "nav\|menu"

# 7. API 엔드포인트 확인 (있는 경우)
print_status "=== API 엔드포인트 확인 ==="

# 헬스 체크 API (있는 경우)
if curl -f -s --connect-timeout $TIMEOUT "$SITE_URL/api/health" > /dev/null 2>&1; then
    print_success "API 헬스 체크 엔드포인트 정상"
    ((CHECKS_PASSED++))
    
    # API 응답 내용 확인
    API_RESPONSE=$(curl -s --connect-timeout $TIMEOUT "$SITE_URL/api/health")
    if echo "$API_RESPONSE" | grep -qi "healthy\|ok\|success"; then
        print_success "API 헬스 체크 응답 정상"
        ((CHECKS_PASSED++))
    else
        print_warning "API 헬스 체크 응답 이상"
        ((CHECKS_WARNING++))
    fi
else
    print_warning "API 헬스 체크 엔드포인트 없음 (선택사항)"
    ((CHECKS_WARNING++))
fi

# 8. 외부 리소스 확인
print_status "=== 외부 리소스 확인 ==="

# Google Fonts 확인
run_check "Google Fonts 연결" "curl -f --connect-timeout $TIMEOUT https://fonts.googleapis.com" false

# CDN 리소스 확인 (있는 경우)
run_check "CDN 연결" "curl -f --connect-timeout $TIMEOUT https://cdn.jsdelivr.net" false

# 9. 모바일 친화성 확인
print_status "=== 모바일 친화성 확인 ==="

# 뷰포트 메타 태그 확인
if echo "$MAIN_CONTENT" | grep -qi 'viewport.*width=device-width'; then
    print_success "뷰포트 메타 태그 설정됨"
    ((CHECKS_PASSED++))
else
    print_error "뷰포트 메타 태그 누락"
    ((CHECKS_FAILED++))
fi

# 반응형 디자인 관련 CSS 확인
if echo "$MAIN_CONTENT" | grep -qi 'responsive\|@media\|mobile'; then
    print_success "반응형 디자인 요소 감지"
    ((CHECKS_PASSED++))
else
    print_warning "반응형 디자인 요소 미감지"
    ((CHECKS_WARNING++))
fi

# 10. SEO 기본 요소 확인
print_status "=== SEO 기본 요소 확인 ==="

# 메타 description 확인
if echo "$MAIN_CONTENT" | grep -qi 'meta.*name="description"'; then
    print_success "메타 description 설정됨"
    ((CHECKS_PASSED++))
else
    print_error "메타 description 누락"
    ((CHECKS_FAILED++))
fi

# Open Graph 태그 확인
if echo "$MAIN_CONTENT" | grep -qi 'property="og:'; then
    print_success "Open Graph 태그 설정됨"
    ((CHECKS_PASSED++))
else
    print_warning "Open Graph 태그 누락"
    ((CHECKS_WARNING++))
fi

# 구조화된 데이터 확인
if echo "$MAIN_CONTENT" | grep -qi 'application/ld+json\|schema.org'; then
    print_success "구조화된 데이터 감지"
    ((CHECKS_PASSED++))
else
    print_warning "구조화된 데이터 미감지"
    ((CHECKS_WARNING++))
fi

# 결과 요약
echo ""
echo "========================================"
echo "🏥 헬스 체크 결과 요약"
echo "========================================"
echo -e "${GREEN}✓ 통과: $CHECKS_PASSED${NC}"
echo -e "${YELLOW}⚠ 경고: $CHECKS_WARNING${NC}"
echo -e "${RED}✗ 실패: $CHECKS_FAILED${NC}"
echo "========================================"

# 전체 상태 평가
TOTAL_CHECKS=$((CHECKS_PASSED + CHECKS_WARNING + CHECKS_FAILED))
SUCCESS_RATE=$((CHECKS_PASSED * 100 / TOTAL_CHECKS))

echo "📊 성공률: ${SUCCESS_RATE}%"

if [ $CHECKS_FAILED -eq 0 ] && [ $CHECKS_WARNING -le 3 ]; then
    print_success "웹사이트 상태: 우수 🟢"
    echo ""
    echo "✅ 모든 핵심 기능이 정상 작동 중입니다."
    echo "🚀 사용자에게 최적의 경험을 제공하고 있습니다."
    exit 0
elif [ $CHECKS_FAILED -eq 0 ]; then
    print_warning "웹사이트 상태: 양호 🟡"
    echo ""
    echo "⚠️  일부 개선 사항이 있지만 핵심 기능은 정상입니다."
    echo "📈 성능 및 보안 향상을 위해 경고 사항을 검토해주세요."
    exit 0
elif [ $CHECKS_FAILED -le 2 ]; then
    print_error "웹사이트 상태: 주의 🟠"
    echo ""
    echo "❗ 일부 중요한 문제가 발견되었습니다."
    echo "🔧 빠른 시일 내에 문제를 해결해주세요."
    exit 1
else
    print_error "웹사이트 상태: 위험 🔴"
    echo ""
    echo "🚨 심각한 문제가 다수 발견되었습니다."
    echo "🆘 즉시 기술팀에 연락하여 문제를 해결해주세요."
    echo ""
    echo "📞 긴급 연락처:"
    echo "   - 개발팀: dev@techflow.co.kr"
    echo "   - 시스템 관리자: sysadmin@techflow.co.kr"
    echo "   - 긴급 전화: 010-9999-8888"
    exit 2
fi