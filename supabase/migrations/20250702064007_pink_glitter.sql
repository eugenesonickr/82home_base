/*
  # 공지사항 관리 시스템 데이터베이스 스키마

  1. 새로운 테이블
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, 제목)
      - `content` (text, 내용)
      - `category` (text, 카테고리)
      - `author_id` (uuid, 작성자 ID)
      - `is_published` (boolean, 게시 여부)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `admin_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, 사용자 ID)
      - `is_admin` (boolean, 관리자 여부)
      - `created_at` (timestamp)

  2. 보안
    - RLS 비활성화 (개발 테스트용)
    - 기본 정책 설정
*/

-- 공지사항 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 관리자 설정 테이블 생성
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS 비활성화 (개발 테스트용)
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings DISABLE ROW LEVEL SECURITY;

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 카테고리 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published);

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO posts (title, content, category, is_published) VALUES
('TechFlow AI 솔루션 출시 안내', 'TechFlow에서 새로운 AI 기반 비즈니스 솔루션 "FlowAI"를 출시했습니다. 머신러닝과 자연어 처리 기술을 활용한 차세대 비즈니스 자동화 솔루션으로, 고객의 업무 효율성을 크게 향상시킬 것으로 기대됩니다.', 'product', true),
('2024년 제1회 개발자 컨퍼런스 개최', '오는 3월에 TechFlow Dev Conference 2024를 개최합니다. 최신 개발 트렌드와 기술을 공유하는 자리로, 업계 전문가들의 강연과 네트워킹 기회를 제공합니다.', 'event', true),
('보안 솔루션 업데이트 공지', 'Zero Trust 아키텍처 기반의 새로운 보안 기능이 추가되었습니다. 고객사의 보안 강화를 위한 중요한 업데이트입니다.', 'update', true),
('시스템 점검 안내', '서비스 품질 향상을 위한 정기 시스템 점검을 실시합니다. 점검 시간 동안 일부 서비스 이용에 제한이 있을 수 있습니다.', 'maintenance', true),
('고객 성공 사례 공유', '제조업체 A사의 스마트 팩토리 구축 프로젝트가 성공적으로 완료되었습니다. 디지털 전환을 통한 생산성 향상 사례를 공유합니다.', 'case_study', true);