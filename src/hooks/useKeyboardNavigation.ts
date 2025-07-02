import { useEffect, useCallback } from 'react';
import { keyboardHelpers, manageFocus } from '../utils/accessibility';

interface UseKeyboardNavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
  containerRef?: React.RefObject<HTMLElement>;
  autoFocus?: boolean;
}

export const useKeyboardNavigation = ({
  isOpen = true,
  onClose,
  containerRef,
  autoFocus = false
}: UseKeyboardNavigationProps = {}) => {
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // ESC 키로 닫기
    if (keyboardHelpers.isEscape(event) && onClose) {
      event.preventDefault();
      onClose();
      return;
    }

    // 포커스 트랩 (컨테이너가 있는 경우)
    if (containerRef?.current && isOpen) {
      manageFocus.trapFocus(containerRef.current, event);
    }
  }, [isOpen, onClose, containerRef]);

  useEffect(() => {
    if (!isOpen) return;

    // 키보드 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);

    // 자동 포커스
    if (autoFocus && containerRef?.current) {
      const firstFocusable = manageFocus.getFirstFocusable(containerRef.current);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, autoFocus, containerRef]);

  return {
    handleKeyDown
  };
};