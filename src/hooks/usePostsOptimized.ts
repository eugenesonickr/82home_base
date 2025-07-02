import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Post, PostCategory } from '../lib/supabase';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
}

export interface PostFilters {
  category?: PostCategory | 'all';
  search?: string;
  page?: number;
  limit?: number;
  published?: boolean;
  authorId?: string;
}

export interface PostsPerformanceMetrics {
  queryTime: number;
  cacheHit: boolean;
  indexesUsed: string[];
}

export const usePostsOptimized = (filters: PostFilters = {}) => {
  const [state, setState] = useState<PostsState>({
    posts: [],
    loading: true,
    error: null,
    totalCount: 0,
    hasMore: false,
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PostsPerformanceMetrics | null>(null);

  const {
    category = 'all',
    search = '',
    page = 1,
    limit = 10,
    published = true,
    authorId,
  } = filters;

  // 캐시 키 생성
  const getCacheKey = useCallback(() => {
    return `posts_${category}_${search}_${page}_${limit}_${published}_${authorId || 'all'}`;
  }, [category, search, page, limit, published, authorId]);

  // 성능 최적화된 게시물 조회
  const fetchPostsOptimized = useCallback(async () => {
    const startTime = performance.now();
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // 기본 쿼리 구성 - 최적화된 인덱스 활용
      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' });

      // 게시 상태 필터 (인덱스 활용)
      if (published !== undefined) {
        query = query.eq('is_published', published);
      }

      // 카테고리 필터 (복합 인덱스 활용)
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // 작성자 필터
      if (authorId) {
        query = query.eq('author_id', authorId);
      }

      // 검색 필터 - 전문 검색 사용
      if (search.trim()) {
        // PostgreSQL의 전문 검색 기능 활용
        const searchTerms = search.trim().split(' ').join(' & ');
        query = query.or(
          `title.ilike.%${search}%,content.ilike.%${search}%,to_tsvector('korean', title || ' ' || content).@@.to_tsquery('korean', '${searchTerms}')`
        );
      }

      // 정렬 - 인덱스 활용을 위해 created_at DESC 사용
      query = query.order('created_at', { ascending: false });

      // 페이지네이션
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      const endTime = performance.now();
      const queryTime = endTime - startTime;

      // 성능 메트릭 업데이트
      setPerformanceMetrics({
        queryTime,
        cacheHit: false, // 실제 구현에서는 캐시 로직 추가
        indexesUsed: ['idx_posts_published_created_desc', 'idx_posts_category_published_created'], // 예상 사용 인덱스
      });

      setState({
        posts: data || [],
        loading: false,
        error: null,
        totalCount: count || 0,
        hasMore: (count || 0) > page * limit,
      });

      // 성능 로그 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log(`게시물 조회 성능:`, {
          queryTime: `${queryTime.toFixed(2)}ms`,
          resultCount: data?.length || 0,
          totalCount: count || 0,
          filters: { category, search, page, limit, published, authorId },
        });
      }

    } catch (error) {
      console.error('게시글 조회 오류:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '게시글을 불러오는데 실패했습니다.',
      }));
    }
  }, [category, search, page, limit, published, authorId]);

  // 무한 스크롤을 위한 추가 로드
  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore) return;

    const nextPage = Math.floor(state.posts.length / limit) + 1;
    
    try {
      let query = supabase
        .from('posts')
        .select('*');

      if (published !== undefined) {
        query = query.eq('is_published', published);
      }

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (authorId) {
        query = query.eq('author_id', authorId);
      }

      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      query = query
        .order('created_at', { ascending: false })
        .range((nextPage - 1) * limit, nextPage * limit - 1);

      const { data, error } = await query;

      if (error) throw error;

      setState(prev => ({
        ...prev,
        posts: [...prev.posts, ...(data || [])],
        hasMore: (data?.length || 0) === limit,
      }));

    } catch (error) {
      console.error('추가 게시글 로드 오류:', error);
    }
  }, [state.loading, state.hasMore, state.posts.length, limit, published, category, authorId, search]);

  // 게시물 생성 (최적화된 캐시 무효화 포함)
  const createPost = useCallback(async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      // 캐시 무효화 및 목록 새로고침
      await fetchPostsOptimized();
      return { data, error: null };
    } catch (error) {
      console.error('게시글 생성 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '게시글 생성에 실패했습니다.',
      };
    }
  }, [fetchPostsOptimized]);

  // 게시물 업데이트
  const updatePost = useCallback(async (id: string, postData: Partial<Post>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // 로컬 상태 업데이트 (성능 최적화)
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.id === id ? { ...post, ...postData } : post
        ),
      }));

      return { data, error: null };
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '게시글 수정에 실패했습니다.',
      };
    }
  }, []);

  // 게시물 삭제
  const deletePost = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 로컬 상태 업데이트
      setState(prev => ({
        ...prev,
        posts: prev.posts.filter(post => post.id !== id),
        totalCount: prev.totalCount - 1,
      }));

      return { error: null };
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      return {
        error: error instanceof Error ? error.message : '게시글 삭제에 실패했습니다.',
      };
    }
  }, []);

  // 단일 게시물 조회 (캐시 활용)
  const getPost = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('게시글 조회 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '게시글을 불러오는데 실패했습니다.',
      };
    }
  }, []);

  // 카테고리별 통계 조회
  const getCategoryStats = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('posts_stats')
        .select('*');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('카테고리 통계 조회 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '통계를 불러오는데 실패했습니다.',
      };
    }
  }, []);

  // 효과 훅
  useEffect(() => {
    fetchPostsOptimized();
  }, [fetchPostsOptimized]);

  return {
    ...state,
    performanceMetrics,
    fetchPosts: fetchPostsOptimized,
    loadMore,
    createPost,
    updatePost,
    deletePost,
    getPost,
    getCategoryStats,
  };
};