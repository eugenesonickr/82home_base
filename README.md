# TechFlow 기업 웹사이트

> 혁신적인 IT 솔루션을 제공하는 TechFlow의 공식 웹사이트

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/techflow/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🌟 프로젝트 개요

TechFlow는 2014년부터 혁신적인 IT 솔루션을 제공해온 전문 기업의 공식 웹사이트입니다. 
현대적인 웹 기술과 사용자 중심 디자인으로 구축된 반응형 웹사이트로, 
회사 소개부터 서비스 안내, 공지사항, 문의 기능까지 모든 비즈니스 요구사항을 충족합니다.

### ✨ 주요 특징

- 🎨 **모던 UI/UX**: Tailwind CSS와 Framer Motion을 활용한 세련된 디자인
- 📱 **완전 반응형**: 모바일부터 데스크톱까지 모든 디바이스 지원
- ⚡ **고성능**: 최적화된 번들링과 지연 로딩으로 빠른 로딩 속도
- 🌐 **다국어 지원**: 한국어/영어 지원 (확장 가능)
- 🌙 **다크모드**: 사용자 선호도에 따른 테마 전환
- ♿ **접근성**: WCAG 2.1 AA 수준의 웹 접근성 준수
- 🔒 **보안**: 최신 보안 헤더와 CSP 적용
- 📊 **관리자 시스템**: Supabase 기반 게시물 관리 시스템

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성과 개발 생산성
- **Vite** - 빠른 개발 서버와 최적화된 빌드
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion** - 부드러운 애니메이션과 인터랙션

### Backend & Database
- **Supabase** - PostgreSQL 기반 BaaS
- **Edge Functions** - 서버리스 함수
- **Row Level Security** - 데이터 보안

### 배포 & 인프라
- **Netlify** - 자동 배포와 CDN
- **GitHub Actions** - CI/CD 파이프라인
- **Let's Encrypt** - 자동 SSL 인증서

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git 훅 관리

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn
- Git

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/techflow/corporate-website.git
cd corporate-website

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 Supabase 설정 추가

# 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 환경 변수 설정

`.env` 파일에 다음 변수들을 설정하세요:

```env
# Supabase 설정
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 애플리케이션 설정
VITE_APP_NAME=TechFlow
VITE_APP_ENV=development
```

## 📁 프로젝트 구조

```
src/
├── components/           # React 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   └── ui/              # UI 컴포넌트
├── contexts/            # React Context
├── hooks/               # 커스텀 훅
├── lib/                 # 라이브러리 설정
├── utils/               # 유틸리티 함수
├── styles/              # 스타일 파일
└── types/               # TypeScript 타입 정의

public/
├── images/              # 이미지 자산
├── icons/               # 아이콘 파일
└── seo/                 # SEO 관련 파일

docs/                    # 문서
├── DEPLOYMENT.md        # 배포 가이드
├── ADMIN_GUIDE.md       # 관리자 가이드
└── MAINTENANCE.md       # 유지보수 가이드
```

## 🎯 주요 기능

### 1. 메인 페이지
- 히어로 섹션 with 애니메이션
- 회사 소개 및 비전/미션
- 서비스 소개
- 최신 소식
- 연락처 정보

### 2. 관리자 시스템
- 게시물 CRUD 기능
- 카테고리별 관리
- 게시/비게시 상태 관리
- 실시간 미리보기

### 3. 반응형 디자인
- 모바일 퍼스트 접근
- 터치 친화적 인터페이스
- 적응형 네비게이션

### 4. 성능 최적화
- 코드 스플리팅
- 이미지 지연 로딩
- 번들 최적화
- 캐싱 전략

### 5. SEO 최적화
- 메타 태그 관리
- 구조화된 데이터
- 사이트맵 자동 생성
- Open Graph 지원

## 📱 반응형 브레이크포인트

```css
/* 모바일 */
@media (max-width: 767px) { ... }

/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* 데스크톱 */
@media (min-width: 1024px) { ... }
```

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 코드 린팅
npm run lint

# 타입 체크
npm run type-check

# 번들 분석
npm run build:analyze

# 테스트 실행
npm run test
```

## 🚀 배포

### Netlify 자동 배포

1. **GitHub 연동**: 저장소를 Netlify에 연결
2. **빌드 설정**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **환경 변수**: Netlify 대시보드에서 설정
4. **자동 배포**: `main` 브랜치 푸시 시 자동 배포

### 수동 배포

```bash
# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy
```

자세한 배포 가이드는 [DEPLOYMENT.md](docs/DEPLOYMENT.md)를 참조하세요.

## 🔒 보안

### 구현된 보안 기능
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- 환경 변수 보안
- SQL Injection 방지

### 보안 헤더
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
```

## ♿ 접근성

### WCAG 2.1 AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 4.5:1 이상
- 포커스 관리
- ARIA 레이블 적용

### 접근성 테스트
```bash
# Lighthouse 접근성 테스트
npm run lighthouse

# axe-core 테스트
npm run a11y-test
```

## 📊 성능 지표

### 목표 성능
- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### 최적화 기법
- Tree shaking
- 코드 스플리팅
- 이미지 최적화
- 폰트 최적화
- 캐싱 전략

## 🧪 테스트

### 테스트 전략
- 단위 테스트: Jest + React Testing Library
- 통합 테스트: Cypress
- 성능 테스트: Lighthouse CI
- 접근성 테스트: axe-core

```bash
# 모든 테스트 실행
npm run test

# 커버리지 리포트
npm run test:coverage

# E2E 테스트
npm run test:e2e
```

## 📈 모니터링

### 성능 모니터링
- Lighthouse CI
- Web Vitals 추적
- 번들 크기 모니터링

### 에러 추적
- Sentry 통합
- 실시간 에러 알림
- 성능 메트릭 수집

## 🤝 기여하기

### 개발 워크플로우
1. 이슈 생성 또는 확인
2. 기능 브랜치 생성
3. 개발 및 테스트
4. Pull Request 생성
5. 코드 리뷰
6. 머지 및 배포

### 코딩 컨벤션
- ESLint 규칙 준수
- Prettier 포맷팅
- 의미있는 커밋 메시지
- TypeScript 타입 정의

## 📚 문서

- [배포 가이드](docs/DEPLOYMENT.md)
- [관리자 가이드](docs/ADMIN_GUIDE.md)
- [유지보수 가이드](docs/MAINTENANCE.md)
- [API 문서](docs/API.md)
- [컴포넌트 가이드](docs/COMPONENTS.md)

## 🐛 문제 해결

### 일반적인 문제들

**빌드 실패**
```bash
# 캐시 클리어
npm run clean
rm -rf node_modules package-lock.json
npm install
```

**타입 에러**
```bash
# TypeScript 타입 체크
npm run type-check
```

**성능 이슈**
```bash
# 번들 분석
npm run build:analyze
```

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

## 👥 팀

- **개발팀**: TechFlow Development Team
- **디자인팀**: TechFlow Design Team
- **PM**: TechFlow Project Management

## 📞 지원

- **이메일**: dev@techflow.co.kr
- **문서**: [docs.techflow.co.kr](https://docs.techflow.co.kr)
- **이슈 트래커**: [GitHub Issues](https://github.com/techflow/corporate-website/issues)

---

**TechFlow** - 기술로 세상을 연결하고, 혁신으로 미래를 창조합니다. 🚀