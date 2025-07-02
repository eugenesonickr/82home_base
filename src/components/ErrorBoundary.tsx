import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // 에러 로깅 서비스에 전송 (예: Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
          >
            {/* 에러 아이콘 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </motion.div>

            {/* 에러 메시지 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                앗! 문제가 발생했습니다
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                예상치 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.
              </p>
              
              {/* 개발 모드에서만 에러 상세 정보 표시 */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-left bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6"
                >
                  <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    개발자 정보 (개발 모드에서만 표시)
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div>
                      <strong className="text-red-600 dark:text-red-400">Error:</strong>
                      <pre className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong className="text-red-600 dark:text-red-400">Stack Trace:</strong>
                        <pre className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.details>
              )}
            </motion.div>

            {/* 액션 버튼들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleRetry}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                다시 시도
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                홈으로 돌아가기
              </motion.button>
            </motion.div>

            {/* 지원 정보 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                문제가 지속되면{' '}
                <a 
                  href="mailto:support@techflow.co.kr" 
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  support@techflow.co.kr
                </a>
                로 문의해주세요.
              </p>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;