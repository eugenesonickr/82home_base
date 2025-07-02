/*
  # 게시판 성능 최적화를 위한 인덱스 추가

  1. 인덱스 추가
    - 게시된 글 최신순 조회용 복합 인덱스
    - 카테고리별 조회용 인덱스
    - 작성자별 조회용 인덱스
    - 전문 검색용 인덱스 (기본 'simple' 설정 사용)
    - 관리자용 인덱스

  2. 성능 분석 도구
    - 카테고리별 통계 뷰
    - 인덱스 사용량 확인 함수
*/

-- 게시된 글을 최신순으로 조회하는 복합 인덱스 (가장 자주 사용되는 쿼리)
CREATE INDEX IF NOT EXISTS idx_posts_published_created_desc 
ON posts (is_published, created_at DESC) 
WHERE is_published = true;

-- 카테고리별 게시된 글을 최신순으로 조회하는 복합 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_category_published_created 
ON posts (category, is_published, created_at DESC) 
WHERE is_published = true;

-- 작성자별 게시글 조회 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_author_created 
ON posts (author_id, created_at DESC);

-- 제목과 내용에 대한 전문 검색 인덱스 (기본 'simple' 설정 사용)
CREATE INDEX IF NOT EXISTS idx_posts_search_title 
ON posts USING gin(to_tsvector('simple', title));

CREATE INDEX IF NOT EXISTS idx_posts_search_content 
ON posts USING gin(to_tsvector('simple', content));

-- 제목과 내용을 합친 전문 검색 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_search_full 
ON posts USING gin(to_tsvector('simple', title || ' ' || content));

-- 업데이트 시간 인덱스 (관리자가 최근 수정된 글을 확인할 때 사용)
CREATE INDEX IF NOT EXISTS idx_posts_updated_at 
ON posts (updated_at DESC);

-- 카테고리별 통계를 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_category_count 
ON posts (category) 
WHERE is_published = true;

-- 관리자용 - 모든 글 (게시/비게시 포함) 최신순 조회
CREATE INDEX IF NOT EXISTS idx_posts_admin_all_created 
ON posts (created_at DESC);

-- 검색 성능 향상을 위한 추가 인덱스
-- ILIKE 검색을 위한 인덱스 (대소문자 구분 없는 검색)
CREATE INDEX IF NOT EXISTS idx_posts_title_lower 
ON posts (LOWER(title));

CREATE INDEX IF NOT EXISTS idx_posts_content_lower 
ON posts (LOWER(content));

-- 성능 분석을 위한 뷰 생성
CREATE OR REPLACE VIEW posts_stats AS
SELECT 
    category,
    COUNT(*) as total_posts,
    COUNT(*) FILTER (WHERE is_published = true) as published_posts,
    COUNT(*) FILTER (WHERE is_published = false) as draft_posts,
    MAX(created_at) as latest_post,
    MIN(created_at) as oldest_post,
    AVG(LENGTH(content)) as avg_content_length
FROM posts 
GROUP BY category
ORDER BY total_posts DESC;

-- 인덱스 사용량 확인을 위한 함수 (개발용)
CREATE OR REPLACE FUNCTION check_posts_indexes()
RETURNS TABLE(
    index_name text,
    table_name text,
    index_size text,
    index_scans bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.indexname::text,
        i.tablename::text,
        pg_size_pretty(pg_relation_size(i.indexname::regclass))::text,
        COALESCE(s.idx_scan, 0) as index_scans
    FROM pg_indexes i
    LEFT JOIN pg_stat_user_indexes s ON i.indexname = s.indexname
    WHERE i.tablename = 'posts'
    ORDER BY pg_relation_size(i.indexname::regclass) DESC;
END;
$$ LANGUAGE plpgsql;

-- 검색 성능 테스트를 위한 함수
CREATE OR REPLACE FUNCTION search_posts_performance(search_term text)
RETURNS TABLE(
    search_method text,
    execution_time interval,
    result_count bigint
) AS $$
DECLARE
    start_time timestamp;
    end_time timestamp;
    count_result bigint;
BEGIN
    -- ILIKE 검색 테스트
    start_time := clock_timestamp();
    SELECT COUNT(*) INTO count_result
    FROM posts 
    WHERE (title ILIKE '%' || search_term || '%' OR content ILIKE '%' || search_term || '%')
    AND is_published = true;
    end_time := clock_timestamp();
    
    RETURN QUERY SELECT 'ILIKE'::text, (end_time - start_time), count_result;
    
    -- 전문 검색 테스트
    start_time := clock_timestamp();
    SELECT COUNT(*) INTO count_result
    FROM posts 
    WHERE to_tsvector('simple', title || ' ' || content) @@ plainto_tsquery('simple', search_term)
    AND is_published = true;
    end_time := clock_timestamp();
    
    RETURN QUERY SELECT 'Full Text Search'::text, (end_time - start_time), count_result;
END;
$$ LANGUAGE plpgsql;

-- 게시물 통계 업데이트 함수
CREATE OR REPLACE FUNCTION update_posts_statistics()
RETURNS void AS $$
BEGIN
    -- 통계 테이블이 있다면 업데이트 (현재는 뷰만 사용)
    -- 필요시 통계 테이블을 별도로 생성하여 성능 향상 가능
    PERFORM 1;
END;
$$ LANGUAGE plpgsql;