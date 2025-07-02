import { useState, useEffect } from 'react';
import { mediaQueries } from '../utils/accessibility';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => ({
    isMobile: mediaQueries.isMobile(),
    isTablet: mediaQueries.isTablet(),
    isDesktop: mediaQueries.isDesktop(),
    screenSize: mediaQueries.isMobile() ? 'mobile' : mediaQueries.isTablet() ? 'tablet' : 'desktop'
  }));

  useEffect(() => {
    const updateState = () => {
      const isMobile = mediaQueries.isMobile();
      const isTablet = mediaQueries.isTablet();
      const isDesktop = mediaQueries.isDesktop();
      
      setState({
        isMobile,
        isTablet,
        isDesktop,
        screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      });
    };

    // 미디어 쿼리 리스너 등록
    const removeListeners = [
      mediaQueries.addListener(mediaQueries.mobile, updateState),
      mediaQueries.addListener(mediaQueries.tablet, updateState),
      mediaQueries.addListener(mediaQueries.desktop, updateState)
    ];

    return () => {
      removeListeners.forEach(remove => remove());
    };
  }, []);

  return state;
};