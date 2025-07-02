# TechFlow 배포 가이드

## 🚀 Netlify 배포 설정

### 1. 초기 설정

#### Netlify 계정 연결
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# Netlify 로그인
netlify login

# 사이트 초기화
netlify init
```

#### 환경 변수 설정
Netlify 대시보드에서 다음 환경 변수를 설정하세요:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=production
VITE_GA_TRACKING_ID=your_ga_id
```

### 2. 자동 배포 설정

#### GitHub 연동
1. Netlify 대시보드에서 "New site from Git" 선택
2. GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

#### 배포 트리거
- `main` 브랜치 푸시 시 자동 배포
- Pull Request 시 프리뷰 배포
- 수동 배포: `npm run deploy`

### 3. 커스텀 도메인 설정

#### 도메인 연결
1. Netlify 대시보드 → Domain settings
2. "Add custom domain" 클릭
3. `techflow.co.kr` 입력
4. DNS 설정:
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → techflow.netlify.app
   ```

#### SSL 인증서
- Let's Encrypt 자동 적용
- 강제 HTTPS 리다이렉트 활성화

### 4. 성능 최적화

#### 빌드 최적화
- Tree shaking 활성화
- 코드 스플리팅
- 이미지 압축
- CSS/JS 압축

#### 캐싱 정책
```
정적 자산: 1년 캐시
HTML: 1시간 캐시
API: 캐시 없음
```

#### CDN 활용
- 전 세계 엣지 서버 활용
- 자동 이미지 최적화
- Brotli 압축

### 5. 모니터링

#### 성능 모니터링
- Lighthouse 자동 실행
- Core Web Vitals 추적
- 빌드 시간 모니터링

#### 에러 추적
- 배포 실패 알림
- 헬스 체크 자동화
- 로그 모니터링

### 6. 배포 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 분석
npm run build:analyze

# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy

# 헬스 체크
curl https://techflow.co.kr/api/health
```

### 7. 트러블슈팅

#### 일반적인 문제들

**빌드 실패**
- Node.js 버전 확인 (18 이상)
- 환경 변수 설정 확인
- 의존성 버전 충돌 확인

**배포 실패**
- Netlify 토큰 확인
- 사이트 ID 확인
- 빌드 로그 확인

**성능 이슈**
- 번들 크기 분석
- 이미지 최적화
- 캐시 설정 확인

### 8. 보안 설정

#### 헤더 보안
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options

#### 환경 변수 보안
- 민감한 정보는 Netlify 환경 변수 사용
- 클라이언트 노출 방지
- 정기적인 키 로테이션

## 📊 성능 지표

### 목표 성능
- First Contentful Paint: < 1.5초
- Largest Contentful Paint: < 2.5초
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### 최적화 결과
- 번들 크기: ~500KB (gzipped)
- 로딩 시간: ~1초
- Lighthouse 점수: 95+

## 🔄 CI/CD 파이프라인

1. **코드 푸시** → GitHub
2. **자동 빌드** → GitHub Actions
3. **테스트 실행** → 린트, 타입 체크
4. **배포** → Netlify
5. **헬스 체크** → 자동 검증
6. **알림** → 슬랙/이메일

이 설정으로 안정적이고 빠른 배포 환경을 구축할 수 있습니다! 🚀