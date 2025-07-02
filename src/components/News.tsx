import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight, 
  Tag, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { usePostsOptimized } from '../hooks/usePostsOptimized';
import { useAuth } from '../hooks/useAuth';
import { POST_CATEGORIES, type PostCategory } from '../lib/supabase';
import AuthModal from './AuthModal';
import PostModal from './PostModal';
import PostsPerformanceMonitor from './PostsPerformanceMonitor';

const News: React.FC = () => {
  // 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  
  const postsPerPage = 6;
  
  // 훅 사용
  const { user, isAdmin, signOut } = useAuth();
  
  // 최적화된 훅 사용 (개발 환경에서는 성능 모니터링 포함)
  const { 
    posts, 
    loading, 
    error, 
    totalCount, 
    performanceMetrics,
    createPost, 
    updatePost, 
    deletePost,
    getCategoryStats
  } = usePostsOptimized({
    category: selectedCategory,
    search: searchTerm,
    page: currentPage,
    limit: postsPerPage,
    published: !isAdmin // 관리자가 아니면 게시된 글만 보기
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'bg-gray-100 text-gray-800',
      product: 'bg-blue-100 text-blue-800',
      event: 'bg-purple-100 text-purple-800',
      update: 'bg-orange-100 text-orange-800',
      maintenance: 'bg-red-100 text-red-800',
      case_study: 'bg-indigo-100 text-indigo-800',
      notice: 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // 이벤트 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: PostCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatePost = async (postData: any) => {
    const { error } = await createPost({
      ...postData,
      author_id: user?.id,
    });
    if (error) {
      alert('게시글 생성에 실패했습니다: ' + error);
    }
  };

  const handleUpdatePost = async (postData: any) => {
    if (!selectedPost) return;
    const { error } = await updatePost(selectedPost.id, postData);
    if (error) {
      alert('게시글 수정에 실패했습니다: ' + error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    const { error } = await deletePost(postId);
    if (error) {
      alert('게시글 삭제에 실패했습니다: ' + error);
    }
  };

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setSelectedPost(null);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            최신 <span className="text-primary-600">소식</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TechFlow의 최신 소식과 업데이트를 확인하세요.
            {isAdmin && ' 관리자로 로그인하여 게시글을 관리할 수 있습니다.'}
          </p>
        </motion.div>

        {/* 관리자 패널 */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-primary-600"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">관리자 패널</h3>
                  <p className="text-sm text-gray-600">{user?.email}로 로그인됨</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPostModal(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  새 게시글
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 로그인 버튼 (비로그인 시) */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 mx-auto"
            >
              <User className="w-4 h-4" />
              관리자 로그인
            </motion.button>
          </motion.div>
        )}

        {/* 검색 및 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 검색 */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="제목이나 내용으로 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </form>

            {/* 필터 토글 버튼 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              필터
            </motion.button>
          </div>

          {/* 카테고리 필터 */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </motion.button>
              {Object.entries(POST_CATEGORIES).map(([key, label]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(key as PostCategory)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">게시글을 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 font-semibold mb-2">오류가 발생했습니다</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* 게시글 목록 */}
        {!loading && !error && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-gray-600 text-lg mb-2">게시글이 없습니다</p>
                  <p className="text-gray-500">
                    {searchTerm || selectedCategory !== 'all' 
                      ? '검색 조건을 변경해보세요.' 
                      : '첫 번째 게시글을 작성해보세요.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* 게시글 헤더 */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
                          <Tag size={12} className="inline mr-1" />
                          {POST_CATEGORIES[post.category as PostCategory] || post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {!post.is_published && (
                            <EyeOff className="w-4 h-4 text-gray-400" title="비공개" />
                          )}
                          {isAdmin && (
                            <div className="flex items-center gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditPost(post)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="수정"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 && '...'}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-2" />
                          <span className="text-sm">{formatDate(post.created_at)}</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="text-primary-600 font-semibold cursor-pointer flex items-center gap-1"
                        >
                          자세히 보기
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: hasPrevPage ? 1.05 : 1 }}
                  whileTap={{ scale: hasPrevPage ? 0.95 : 1 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: hasNextPage ? 1.05 : 1 }}
                  whileTap={{ scale: hasNextPage ? 0.95 : 1 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* 통계 정보 */}
        {!loading && !error && posts.length > 0 && (
          <>
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 text-gray-600"
          >
            <p>
              총 {totalCount}개의 게시글 중 {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, totalCount)}번째 표시
            </p>
          </motion.div>
            
            {/* 성능 정보 (개발 환경에서만) */}
            {process.env.NODE_ENV === 'development' && performanceMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4 text-sm text-gray-500"
              >
                <p>
                  쿼리 시간: {performanceMetrics.queryTime.toFixed(2)}ms | 
                  캐시: {performanceMetrics.cacheHit ? '히트' : '미스'}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* 모달들 */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <PostModal
        isOpen={showPostModal}
        onClose={handleClosePostModal}
        onSave={selectedPost ? handleUpdatePost : handleCreatePost}
        post={selectedPost}
        loading={loading}
      />
      
      {/* 성능 모니터 (개발 환경에서만) */}
      {process.env.NODE_ENV === 'development' && (
        <PostsPerformanceMonitor
          isVisible={showPerformanceMonitor}
          onToggle={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
        />
      )}
    </section>
  );
};

export default News;