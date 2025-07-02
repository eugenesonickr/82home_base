import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { announceToScreenReader } from '../../utils/accessibility';
import AccessibleButton from '../common/AccessibleButton';
import VisuallyHidden from '../common/VisuallyHidden';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 키보드 네비게이션 설정
  useKeyboardNavigation({
    isOpen,
    onClose,
    containerRef: modalRef,
    autoFocus: true
  });

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  useEffect(() => {
    if (isOpen) {
      // 현재 포커스된 요소 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // 스크린 리더에 모달 열림 알림
      announceToScreenReader(`${title} 모달이 열렸습니다`, 'assertive');
      
      // 바디 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 바디 스크롤 복원
      document.body.style.overflow = '';
      
      // 이전 포커스 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, title]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 
                id="modal-title" 
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {title}
              </h2>
              
              {showCloseButton && (
                <AccessibleButton
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  ariaLabel="모달 닫기"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                  <VisuallyHidden>모달 닫기</VisuallyHidden>
                </AccessibleButton>
              )}
            </div>

            {/* 컨텐츠 */}
            <div 
              id="modal-description"
              className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]"
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;