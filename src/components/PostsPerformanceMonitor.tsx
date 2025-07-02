import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Database, 
  Clock, 
  BarChart3, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { usePostsOptimized } from '../hooks/usePostsOptimized';

interface PerformanceMonitorProps {
  isVisible: boolean;
  onToggle: () => void;
}

const PostsPerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  isVisible, 
  onToggle 
}) => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // 다양한 필터 조건으로 테스트
  const testScenarios = [
    { name: '전체 게시물 조회', filters: {} },
    { name: '카테고리별 조회 (notice)', filters: { category: 'notice' as const } },
    { name: '검색 테스트', filters: { search: '테크플로우' } },
    { name: '페이지네이션 테스트', filters: { page: 2, limit: 5 } },
    { name: '작성자별 조회', filters: { authorId: 'test-author-id' } },
  ];

  const { 
    posts, 
    loading, 
    error, 
    totalCount, 
    performanceMetrics,
    fetchPosts,
    getCategoryStats 
  } = usePostsOptimized();

  // 성능 테스트 실행
  const runPerformanceTests = async () => {
    setIsRunningTests(true);
    const results = [];

    for (const scenario of testScenarios) {
      const startTime = performance.now();
      
      try {
        // 각 시나리오별 테스트 실행
        await fetchPosts();
        
        const endTime = performance.now();
        const duration = endTime - startTime;

        results.push({
          name: scenario.name,
          duration: duration.toFixed(2),
          status: 'success',
          filters: scenario.filters,
          resultCount: posts.length,
        });
      } catch (error) {
        results.push({
          name: scenario.name,
          duration: 0,
          status: 'error',
          error: error instanceof Error ? error.message : '알 수 없는 오류',
          filters: scenario.filters,
        });
      }

      // 테스트 간 간격
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 카테고리 통계 테스트
    try {
      const startTime = performance.now();
      const { data: stats } = await getCategoryStats();
      const endTime = performance.now();
      
      results.push({
        name: '카테고리 통계 조회',
        duration: (endTime - startTime).toFixed(2),
        status: 'success',
        resultCount: stats?.length || 0,
      });
    } catch (error) {
      results.push({
        name: '카테고리 통계 조회',
        duration: 0,
        status: 'error',
        error: error instanceof Error ? error.message : '통계 조회 실패',
      });
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  if (!isVisible) {
    return (
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg z-50"
        title="성능 모니터 열기"
      >
        <Activity className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden"
    >
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            <h3 className="font-bold">게시판 성능 모니터</h3>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/20 rounded"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
        {/* 현재 상태 */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            현재 상태
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">로딩 상태</div>
              <div className={`font-semibold ${loading ? 'text-orange-600' : 'text-green-600'}`}>
                {loading ? '로딩 중' : '완료'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">게시물 수</div>
              <div className="font-semibold text-blue-600">{posts.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">전체 개수</div>
              <div className="font-semibold text-purple-600">{totalCount}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">에러 상태</div>
              <div className={`font-semibold ${error ? 'text-red-600' : 'text-green-600'}`}>
                {error ? '에러' : '정상'}
              </div>
            </div>
          </div>
        </div>

        {/* 성능 메트릭 */}
        {performanceMetrics && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              성능 메트릭
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">쿼리 시간</span>
                <span className="font-semibold text-blue-600">
                  {performanceMetrics.queryTime.toFixed(2)}ms
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">캐시 히트</span>
                <span className={`font-semibold ${performanceMetrics.cacheHit ? 'text-green-600' : 'text-orange-600'}`}>
                  {performanceMetrics.cacheHit ? '예' : '아니오'}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <div>사용된 인덱스:</div>
                <div className="text-xs text-gray-500 mt-1">
                  {performanceMetrics.indexesUsed.join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 성능 테스트 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              성능 테스트
            </h4>
            <motion.button
              onClick={runPerformanceTests}
              disabled={isRunningTests}
              whileHover={{ scale: isRunningTests ? 1 : 1.05 }}
              whileTap={{ scale: isRunningTests ? 1 : 0.95 }}
              className="bg-primary-600 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50 flex items-center gap-1"
            >
              {isRunningTests ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  테스트 중...
                </>
              ) : (
                '테스트 실행'
              )}
            </motion.button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.status === 'success' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium text-sm">{result.name}</span>
                    </div>
                    {result.status === 'success' && (
                      <span className="text-sm font-semibold text-blue-600">
                        {result.duration}ms
                      </span>
                    )}
                  </div>
                  {result.status === 'success' && result.resultCount !== undefined && (
                    <div className="text-xs text-gray-600 mt-1">
                      결과: {result.resultCount}개
                    </div>
                  )}
                  {result.status === 'error' && (
                    <div className="text-xs text-red-600 mt-1">
                      {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 에러 정보 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              에러 정보
            </h4>
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostsPerformanceMonitor;