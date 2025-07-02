/**
 * 접근성 유틸리티 함수들
 */

// 키보드 네비게이션을 위한 포커스 관리
export const manageFocus = {
  // 포커스 가능한 요소들 선택자
  focusableSelectors: [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', '),

  // 요소 내의 포커스 가능한 첫 번째 요소 찾기
  getFirstFocusable: (container: HTMLElement): HTMLElement | null => {
    const focusable = container.querySelectorAll(manageFocus.focusableSelectors);
    return focusable.length > 0 ? (focusable[0] as HTMLElement) : null;
  },

  // 요소 내의 포커스 가능한 마지막 요소 찾기
  getLastFocusable: (container: HTMLElement): HTMLElement | null => {
    const focusable = container.querySelectorAll(manageFocus.focusableSelectors);
    return focusable.length > 0 ? (focusable[focusable.length - 1] as HTMLElement) : null;
  },

  // 포커스 트랩 (모달 등에서 사용)
  trapFocus: (container: HTMLElement, event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const firstFocusable = manageFocus.getFirstFocusable(container);
    const lastFocusable = manageFocus.getLastFocusable(container);

    if (!firstFocusable || !lastFocusable) return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }
};

// 스크린 리더를 위한 라이브 리전 관리
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // 메시지 전달 후 제거
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// 색상 대비 검사
export const checkColorContrast = (foreground: string, background: string): number => {
  // 간단한 대비 계산 (실제 구현에서는 더 정확한 알고리즘 사용)
  const getLuminance = (color: string): number => {
    // RGB 값 추출 및 상대 휘도 계산
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    
    const [r, g, b] = rgb.map(val => {
      const num = parseInt(val) / 255;
      return num <= 0.03928 ? num / 12.92 : Math.pow((num + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// 키보드 이벤트 헬퍼
export const keyboardHelpers = {
  isEnterOrSpace: (event: KeyboardEvent): boolean => {
    return event.key === 'Enter' || event.key === ' ';
  },
  
  isEscape: (event: KeyboardEvent): boolean => {
    return event.key === 'Escape';
  },
  
  isArrowKey: (event: KeyboardEvent): boolean => {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
  }
};

// 미디어 쿼리 헬퍼
export const mediaQueries = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  
  isMobile: (): boolean => window.matchMedia(mediaQueries.mobile).matches,
  isTablet: (): boolean => window.matchMedia(mediaQueries.tablet).matches,
  isDesktop: (): boolean => window.matchMedia(mediaQueries.desktop).matches,
  
  // 리스너 등록
  addListener: (query: string, callback: (matches: boolean) => void) => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    mediaQuery.addListener(handler);
    callback(mediaQuery.matches); // 초기 상태 호출
    return () => mediaQuery.removeListener(handler);
  }
};