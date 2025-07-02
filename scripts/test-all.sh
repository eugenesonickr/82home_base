#!/bin/bash

# TechFlow 전체 테스트 실행 스크립트

set -e

echo "🧪 TechFlow 전체 테스트 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 함수 정의
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 테스트 결과 추적
TESTS_PASSED=0
TESTS_FAILED=0

run_test() {
    local test_name="$1"
    local test_command="$2"
    
    print_status "실행 중: $test_name"
    
    if eval "$test_command"; then
        print_success "$test_name 통과"
        ((TESTS_PASSED++))
    else
        print_error "$test_name 실패"
        ((TESTS_FAILED++))
    fi
    
    echo ""
}

# 환경 확인
print_status "환경 확인 중..."

# Node.js 버전 확인
if ! command -v node &> /dev/null; then
    print_error "Node.js가 설치되지 않았습니다."
    exit 1
fi

NODE_VERSION=$(node --version)
print_status "Node.js 버전: $NODE_VERSION"

# npm 의존성 확인
if [ ! -d "node_modules" ]; then
    print_status "의존성 설치 중..."
    npm ci
fi

# 1. 린트 검사
print_status "=== 코드 품질 검사 ==="
run_test "ESLint 검사" "npm run lint"

# 2. 타입 체크
run_test "TypeScript 타입 체크" "npx tsc --noEmit"

# 3. 빌드 테스트
print_status "=== 빌드 테스트 ==="
run_test "프로덕션 빌드" "npm run build"

# 빌드 결과 확인
if [ -d "dist" ]; then
    BUNDLE_SIZE=$(du -sh dist | cut -f1)
    print_status "빌드 크기: $BUNDLE_SIZE"
    
    # 번들 크기 확인 (5MB 이하)
    BUNDLE_SIZE_KB=$(du -k dist | tail -1 | cut -f1)
    if [ "$BUNDLE_SIZE_KB" -gt 5120 ]; then
        print_warning "번들 크기가 5MB를 초과했습니다: ${BUNDLE_SIZE_KB}KB"
    else
        print_success "번들 크기가 적절합니다: ${BUNDLE_SIZE_KB}KB"
    fi
else
    print_error "빌드 결과물이 생성되지 않았습니다."
    ((TESTS_FAILED++))
fi

# 4. 보안 검사
print_status "=== 보안 검사 ==="
run_test "의존성 취약점 스캔" "npm audit --audit-level=high"

# 5. 성능 테스트 (개발 서버 시작 필요)
print_status "=== 성능 테스트 ==="

# 개발 서버 시작
print_status "개발 서버 시작 중..."
npm run dev &
DEV_SERVER_PID=$!

# 서버가 시작될 때까지 대기
sleep 10

# 서버 응답 확인
if curl -f http://localhost:5173 > /dev/null 2>&1; then
    print_success "개발 서버가 정상적으로 시작되었습니다."
    
    # 기본 페이지 로딩 테스트
    run_test "메인 페이지 응답 테스트" "curl -f http://localhost:5173"
    
    # API 헬스 체크 (있는 경우)
    if curl -f http://localhost:5173/api/health > /dev/null 2>&1; then
        run_test "API 헬스 체크" "curl -f http://localhost:5173/api/health"
    fi
    
else
    print_error "개발 서버 시작에 실패했습니다."
    ((TESTS_FAILED++))
fi

# 개발 서버 종료
kill $DEV_SERVER_PID 2>/dev/null || true

# 6. 접근성 기본 검사
print_status "=== 접근성 검사 ==="

# HTML 유효성 검사 (빌드된 파일 대상)
if [ -f "dist/index.html" ]; then
    # 기본적인 접근성 요소 확인
    if grep -q 'lang=' dist/index.html; then
        print_success "HTML lang 속성이 설정되어 있습니다."
        ((TESTS_PASSED++))
    else
        print_error "HTML lang 속성이 누락되었습니다."
        ((TESTS_FAILED++))
    fi
    
    if grep -q 'alt=' dist/index.html; then
        print_success "이미지 alt 속성이 발견되었습니다."
        ((TESTS_PASSED++))
    else
        print_warning "이미지 alt 속성을 확인해주세요."
    fi
fi

# 7. SEO 기본 검사
print_status "=== SEO 검사 ==="

if [ -f "dist/index.html" ]; then
    # 메타 태그 확인
    if grep -q '<meta name="description"' dist/index.html; then
        print_success "메타 description이 설정되어 있습니다."
        ((TESTS_PASSED++))
    else
        print_error "메타 description이 누락되었습니다."
        ((TESTS_FAILED++))
    fi
    
    if grep -q '<title>' dist/index.html; then
        print_success "페이지 title이 설정되어 있습니다."
        ((TESTS_PASSED++))
    else
        print_error "페이지 title이 누락되었습니다."
        ((TESTS_FAILED++))
    fi
    
    # Open Graph 태그 확인
    if grep -q 'property="og:' dist/index.html; then
        print_success "Open Graph 태그가 설정되어 있습니다."
        ((TESTS_PASSED++))
    else
        print_warning "Open Graph 태그를 추가하는 것을 권장합니다."
    fi
fi

# 8. 파일 구조 검사
print_status "=== 파일 구조 검사 ==="

# 필수 파일 확인
REQUIRED_FILES=(
    "package.json"
    "README.md"
    "src/App.tsx"
    "src/main.tsx"
    "index.html"
    "vite.config.ts"
    "tailwind.config.js"
    "netlify.toml"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file 존재"
        ((TESTS_PASSED++))
    else
        print_error "$file 누락"
        ((TESTS_FAILED++))
    fi
done

# 9. 환경 변수 검사
print_status "=== 환경 설정 검사 ==="

if [ -f ".env.example" ]; then
    print_success ".env.example 파일이 존재합니다."
    ((TESTS_PASSED++))
else
    print_warning ".env.example 파일을 생성하는 것을 권장합니다."
fi

# 10. Git 설정 검사
print_status "=== Git 설정 검사 ==="

if [ -f ".gitignore" ]; then
    if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
        print_success ".gitignore가 올바르게 설정되어 있습니다."
        ((TESTS_PASSED++))
    else
        print_warning ".gitignore 설정을 확인해주세요."
    fi
else
    print_error ".gitignore 파일이 누락되었습니다."
    ((TESTS_FAILED++))
fi

# 결과 요약
echo ""
echo "========================================"
echo "🧪 테스트 결과 요약"
echo "========================================"
echo -e "${GREEN}통과한 테스트: $TESTS_PASSED${NC}"
echo -e "${RED}실패한 테스트: $TESTS_FAILED${NC}"
echo "========================================"

if [ $TESTS_FAILED -eq 0 ]; then
    print_success "모든 테스트가 통과했습니다! 🎉"
    echo ""
    echo "✅ 코드 품질: 양호"
    echo "✅ 빌드 상태: 성공"
    echo "✅ 보안 상태: 양호"
    echo "✅ 기본 접근성: 준수"
    echo "✅ SEO 기본 설정: 완료"
    echo ""
    echo "🚀 배포 준비가 완료되었습니다!"
    exit 0
else
    print_error "일부 테스트가 실패했습니다."
    echo ""
    echo "❌ 실패한 테스트를 수정한 후 다시 실행해주세요."
    echo "📚 자세한 내용은 docs/TESTING.md를 참조하세요."
    exit 1
fi