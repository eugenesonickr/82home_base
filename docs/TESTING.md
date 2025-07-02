# TechFlow 테스트 가이드

## 📋 목차
1. [테스트 전략](#테스트-전략)
2. [기능 테스트](#기능-테스트)
3. [성능 테스트](#성능-테스트)
4. [접근성 테스트](#접근성-테스트)
5. [보안 테스트](#보안-테스트)
6. [크로스 브라우저 테스트](#크로스-브라우저-테스트)
7. [모바일 테스트](#모바일-테스트)

## 🎯 테스트 전략

### 테스트 피라미드
```
    🔺 E2E 테스트 (10%)
   🔺🔺 통합 테스트 (20%)
  🔺🔺🔺 단위 테스트 (70%)
```

### 테스트 환경
- **개발 환경**: 로컬 개발 서버
- **스테이징 환경**: 프로덕션과 동일한 설정
- **프로덕션 환경**: 실제 서비스 환경

## ✅ 기능 테스트

### 1. 메인 페이지 테스트

#### 히어로 섹션
- [ ] 메인 타이틀 표시 확인
- [ ] CTA 버튼 동작 확인
- [ ] 배경 애니메이션 정상 작동
- [ ] 스크롤 인디케이터 동작

**테스트 스크립트**:
```javascript
// 히어로 섹션 테스트
describe('Hero Section', () => {
  it('should display main title', () => {
    cy.visit('/');
    cy.get('[data-testid="hero-title"]').should('be.visible');
    cy.get('[data-testid="hero-title"]').should('contain', '혁신적인 IT 솔루션');
  });

  it('should navigate to services on CTA click', () => {
    cy.get('[data-testid="hero-cta-services"]').click();
    cy.url().should('include', '#services');
  });
});
```

#### 네비게이션
- [ ] 메뉴 항목 클릭 시 해당 섹션으로 이동
- [ ] 모바일 햄버거 메뉴 동작
- [ ] 스크롤 시 헤더 스타일 변경
- [ ] 언어 전환 기능

**테스트 스크립트**:
```javascript
// 네비게이션 테스트
describe('Navigation', () => {
  it('should navigate to sections', () => {
    const sections = ['about', 'services', 'news', 'contact'];
    
    sections.forEach(section => {
      cy.get(`[data-testid="nav-${section}"]`).click();
      cy.get(`#${section}`).should('be.visible');
    });
  });

  it('should toggle mobile menu', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid="mobile-menu-toggle"]').click();
    cy.get('[data-testid="mobile-menu"]').should('be.visible');
  });
});
```

### 2. 서비스 섹션 테스트

#### 서비스 카드
- [ ] 모든 서비스 카드 표시
- [ ] 호버 효과 동작
- [ ] 상세 정보 모달 열기
- [ ] 서비스별 필터링

**테스트 스크립트**:
```javascript
// 서비스 섹션 테스트
describe('Services Section', () => {
  it('should display all service cards', () => {
    cy.get('[data-testid="service-card"]').should('have.length', 6);
  });

  it('should open service detail modal', () => {
    cy.get('[data-testid="service-card"]:first').click();
    cy.get('[data-testid="service-modal"]').should('be.visible');
  });
});
```

### 3. 공지사항 테스트

#### 게시물 목록
- [ ] 게시물 목록 표시
- [ ] 페이지네이션 동작
- [ ] 카테고리 필터링
- [ ] 검색 기능

**테스트 스크립트**:
```javascript
// 공지사항 테스트
describe('News Section', () => {
  it('should display posts list', () => {
    cy.get('[data-testid="post-item"]').should('have.length.greaterThan', 0);
  });

  it('should filter by category', () => {
    cy.get('[data-testid="category-filter-notice"]').click();
    cy.get('[data-testid="post-item"]').each($el => {
      cy.wrap($el).find('[data-testid="post-category"]').should('contain', '공지사항');
    });
  });

  it('should search posts', () => {
    cy.get('[data-testid="search-input"]').type('테크플로우');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="post-item"]').should('contain', '테크플로우');
  });
});
```

### 4. 관리자 시스템 테스트

#### 로그인
- [ ] 관리자 로그인 성공
- [ ] 잘못된 계정 정보 처리
- [ ] 로그아웃 기능

**테스트 스크립트**:
```javascript
// 관리자 시스템 테스트
describe('Admin System', () => {
  it('should login with valid credentials', () => {
    cy.get('[data-testid="admin-login-button"]').click();
    cy.get('[data-testid="email-input"]').type('admin@techflow.co.kr');
    cy.get('[data-testid="password-input"]').type('admin123');
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="admin-panel"]').should('be.visible');
  });

  it('should create new post', () => {
    // 로그인 후
    cy.get('[data-testid="new-post-button"]').click();
    cy.get('[data-testid="post-title"]').type('테스트 게시물');
    cy.get('[data-testid="post-content"]').type('테스트 내용입니다.');
    cy.get('[data-testid="post-category"]').select('notice');
    cy.get('[data-testid="post-submit"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

### 5. 문의 폼 테스트

#### 폼 제출
- [ ] 필수 필드 유효성 검사
- [ ] 이메일 형식 검증
- [ ] 성공적인 제출 처리
- [ ] 에러 메시지 표시

**테스트 스크립트**:
```javascript
// 문의 폼 테스트
describe('Contact Form', () => {
  it('should validate required fields', () => {
    cy.get('[data-testid="contact-submit"]').click();
    cy.get('[data-testid="name-error"]').should('be.visible');
    cy.get('[data-testid="email-error"]').should('be.visible');
    cy.get('[data-testid="message-error"]').should('be.visible');
  });

  it('should submit form successfully', () => {
    cy.get('[data-testid="contact-name"]').type('홍길동');
    cy.get('[data-testid="contact-email"]').type('hong@example.com');
    cy.get('[data-testid="contact-message"]').type('문의 내용입니다.');
    cy.get('[data-testid="contact-submit"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## ⚡ 성능 테스트

### 1. 로딩 성능 테스트

#### Core Web Vitals
```javascript
// 성능 테스트
describe('Performance Tests', () => {
  it('should meet Core Web Vitals thresholds', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // Performance Observer 설정
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              expect(entry.startTime).to.be.lessThan(2500);
            }
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }
    });
  });
});
```

#### 번들 크기 테스트
```bash
# 번들 크기 확인
npm run build:analyze

# 임계값 확인
if [ $(du -k dist/assets/*.js | cut -f1 | paste -sd+ | bc) -gt 500 ]; then
  echo "번들 크기가 500KB를 초과했습니다!"
  exit 1
fi
```

### 2. 네트워크 성능 테스트

#### 다양한 네트워크 조건
```javascript
// 네트워크 성능 테스트
describe('Network Performance', () => {
  it('should load under slow 3G', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // 네트워크 속도 시뮬레이션
        win.navigator.connection = {
          effectiveType: 'slow-2g',
          downlink: 0.4
        };
      }
    });
    
    cy.get('[data-testid="hero-title"]', { timeout: 10000 }).should('be.visible');
  });
});
```

## ♿ 접근성 테스트

### 1. 키보드 네비게이션 테스트

```javascript
// 접근성 테스트
describe('Accessibility Tests', () => {
  it('should navigate with keyboard only', () => {
    cy.visit('/');
    cy.get('body').tab(); // 첫 번째 포커스 가능한 요소로
    cy.focused().should('have.attr', 'href', '#main-content'); // 스킵 링크
    
    // 메인 네비게이션까지 탭 이동
    cy.get('body').tab().tab().tab();
    cy.focused().should('contain', '홈');
  });

  it('should have proper ARIA labels', () => {
    cy.get('[role="button"]').each($el => {
      cy.wrap($el).should('have.attr', 'aria-label');
    });
  });
});
```

### 2. 스크린 리더 테스트

```javascript
// 스크린 리더 호환성 테스트
describe('Screen Reader Tests', () => {
  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('have.length', 1);
    cy.get('h2').should('exist');
    // h3가 h2 다음에 나와야 함
    cy.get('h2').next('h3, h4, h5, h6').should('not.exist');
  });

  it('should have alt text for images', () => {
    cy.get('img').each($img => {
      cy.wrap($img).should('have.attr', 'alt');
    });
  });
});
```

### 3. 색상 대비 테스트

```javascript
// 색상 대비 테스트
describe('Color Contrast Tests', () => {
  it('should meet WCAG AA contrast requirements', () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
  });
});
```

## 🔒 보안 테스트

### 1. XSS 방지 테스트

```javascript
// 보안 테스트
describe('Security Tests', () => {
  it('should prevent XSS attacks', () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    cy.get('[data-testid="search-input"]').type(xssPayload);
    cy.get('[data-testid="search-button"]').click();
    
    // XSS 스크립트가 실행되지 않아야 함
    cy.window().its('alert').should('not.exist');
  });

  it('should have security headers', () => {
    cy.request('/').then((response) => {
      expect(response.headers).to.have.property('x-frame-options');
      expect(response.headers).to.have.property('x-content-type-options');
      expect(response.headers).to.have.property('x-xss-protection');
    });
  });
});
```

### 2. CSRF 방지 테스트

```javascript
// CSRF 테스트
describe('CSRF Protection', () => {
  it('should require proper authentication for admin actions', () => {
    // 인증 없이 관리자 API 호출 시도
    cy.request({
      method: 'POST',
      url: '/api/posts',
      body: { title: 'Test', content: 'Test' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
```

## 🌐 크로스 브라우저 테스트

### 지원 브라우저
- **Chrome** (최신 2개 버전)
- **Firefox** (최신 2개 버전)
- **Safari** (최신 2개 버전)
- **Edge** (최신 2개 버전)

### 브라우저별 테스트 스크립트

```javascript
// 크로스 브라우저 테스트
const browsers = ['chrome', 'firefox', 'edge'];

browsers.forEach(browser => {
  describe(`${browser} Browser Tests`, () => {
    it('should load main page correctly', () => {
      cy.visit('/', { browser });
      cy.get('[data-testid="hero-title"]').should('be.visible');
    });

    it('should handle responsive design', () => {
      cy.viewport('macbook-15');
      cy.visit('/', { browser });
      cy.get('[data-testid="desktop-nav"]').should('be.visible');
      
      cy.viewport('iphone-6');
      cy.get('[data-testid="mobile-nav"]').should('be.visible');
    });
  });
});
```

## 📱 모바일 테스트

### 테스트 디바이스
- **iPhone SE** (375x667)
- **iPhone 12** (390x844)
- **iPad** (768x1024)
- **Galaxy S21** (360x800)

### 모바일 특화 테스트

```javascript
// 모바일 테스트
describe('Mobile Tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
  });

  it('should display mobile navigation', () => {
    cy.visit('/');
    cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
    cy.get('[data-testid="desktop-nav"]').should('not.be.visible');
  });

  it('should handle touch interactions', () => {
    cy.get('[data-testid="service-card"]:first').trigger('touchstart');
    cy.get('[data-testid="service-card"]:first').trigger('touchend');
    // 터치 이벤트 후 상태 확인
  });

  it('should be readable on small screens', () => {
    cy.get('body').should('have.css', 'font-size').and('match', /^(14|16)px$/);
    cy.get('button').should('have.css', 'min-height', '44px'); // 터치 타겟 크기
  });
});
```

### 터치 제스처 테스트

```javascript
// 터치 제스처 테스트
describe('Touch Gestures', () => {
  it('should handle swipe navigation', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    
    // 스와이프 시뮬레이션
    cy.get('[data-testid="carousel"]')
      .trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] })
      .trigger('touchmove', { touches: [{ clientX: 50, clientY: 100 }] })
      .trigger('touchend');
    
    // 다음 슬라이드로 이동했는지 확인
    cy.get('[data-testid="carousel-slide"]:nth-child(2)').should('be.visible');
  });
});
```

## 🚀 자동화된 테스트 실행

### GitHub Actions 설정

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox, edge]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run E2E tests
        run: npm run test:e2e:${{ matrix.browser }}
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Run performance tests
        run: npm run test:performance
```

### 테스트 명령어

```bash
# 모든 테스트 실행
npm run test

# 단위 테스트만
npm run test:unit

# E2E 테스트만
npm run test:e2e

# 접근성 테스트
npm run test:a11y

# 성능 테스트
npm run test:performance

# 특정 브라우저에서 테스트
npm run test:e2e:chrome
npm run test:e2e:firefox

# 모바일 테스트
npm run test:mobile

# 시각적 회귀 테스트
npm run test:visual
```

이 테스트 가이드를 통해 TechFlow 웹사이트의 품질과 안정성을 보장할 수 있습니다! 🧪