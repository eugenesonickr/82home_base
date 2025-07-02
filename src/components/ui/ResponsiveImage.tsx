import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2' | 'auto';
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes,
  aspectRatio = 'auto',
  loading = 'lazy',
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { screenSize } = useResponsive();

  const aspectRatioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    auto: ''
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // 반응형 이미지 소스 결정
  const getImageSrc = () => {
    if (sizes && sizes[screenSize]) {
      return sizes[screenSize];
    }
    return src;
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {/* 로딩 플레이스홀더 */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* 실제 이미지 */}
      {!hasError && (
        <motion.img
          src={getImageSrc()}
          alt={alt}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          decoding="async"
        />
      )}

      {/* 에러 상태 */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">이미지를 불러올 수 없습니다</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResponsiveImage;