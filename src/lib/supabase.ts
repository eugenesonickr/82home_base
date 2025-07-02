import { createClient } from '@supabase/supabase-js';

// 개발 중에는 더미 값을 사용하여 오류 방지
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';

// 실제 Supabase 연결이 필요한 경우에만 경고 표시
if (supabaseUrl === 'https://dummy-project.supabase.co') {
  console.warn('Supabase가 연결되지 않았습니다. "Connect to Supabase" 버튼을 클릭하여 설정하세요.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 데이터베이스 타입 정의
export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminSetting {
  id: string;
  user_id: string;
  is_admin: boolean;
  created_at: string;
}

// 카테고리 정의
export const POST_CATEGORIES = {
  general: '일반',
  product: '제품 출시',
  event: '이벤트',
  update: '업데이트',
  maintenance: '시스템 점검',
  case_study: '성공 사례',
  notice: '공지사항'
} as const;

export type PostCategory = keyof typeof POST_CATEGORIES;