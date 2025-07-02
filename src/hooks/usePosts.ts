import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Post, PostCategory } from '../lib/supabase';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export interface PostFilters {
  category?: PostCategory | 'all';
  search?: string;
  page?: number;
  limit?: number;
  published?: boolean;
}

export const usePosts = (filters: PostFilters = {}) => {
  const [state, setState] = useState<PostsState>({
    posts: [],
    loading: true,
    error: null,
    totalCount: 0,
  });

  const {
    category = 'all',
    search = '',
    page = 1,
    limit = 10,
    published = true,
  } = filters;

  useEffect(() => {
    fetchPosts();
  }, [category, search, page, limit, published]);

  const fetchPosts = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // 게시 상태 필터
      if (published !== undefined) {
        query = query.eq('is_published', published);
      }

      // 카테고리 필터
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // 검색 필터
      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // 페이지네이션
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      setState({
        posts: data || [],
        loading: false,
        error: null,
        totalCount: count || 0,
      });
    } catch (error) {
      console.error('게시글 조회 오류:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '게시글을 불러오는데 실패했습니다.',
      }));
    }
  };

  const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      // 목록 새로고침
      await fetchPosts();
      return { data, error: null };
    } catch (error) {
      console.error('게시글 생성 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '게시글 생성에 실패했습니다.',
      };
    }
  };

  const updatePost = async (id: string, postData: Partial<Post>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // 목록 새로고침
      await fetchPosts();
      return { data, error: null };
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : '게시글 수정에 실패했습니다.',
      };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 목록 새로고침
      await fetchPosts();
      return { error: null };
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      return {
        error: error instanceof Error ? error.message : '게시글 삭제에 실패했습니다.',
      };
    }
  };

  const getPost = async (id: string) => {
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
  };

  return {
    ...state,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
  };
};