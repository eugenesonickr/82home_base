/*
  # 테스트 관리자 계정 및 기본 데이터 생성

  1. RLS 비활성화 (개발 환경)
  2. 테스트 관리자 계정 생성
     - 이메일: admin@techflow.co.kr
     - 비밀번호: admin123
  3. 관리자 권한 설정
  4. 기본 테스트 포스트 생성
*/

-- RLS 비활성화 (개발 중이므로)
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings DISABLE ROW LEVEL SECURITY;

-- 테스트 관리자 계정 생성 (이미 존재하는 경우 무시)
DO $$
DECLARE
    admin_user_id uuid;
    admin_identity_id uuid;
BEGIN
    -- 테스트 관리자 계정이 이미 존재하는지 확인
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@techflow.co.kr';
    
    -- 계정이 없으면 생성
    IF admin_user_id IS NULL THEN
        -- 새 사용자 ID 생성
        admin_user_id := gen_random_uuid();
        admin_identity_id := gen_random_uuid();
        
        -- auth.users 테이블에 사용자 추가
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            admin_user_id,
            'authenticated',
            'authenticated',
            'admin@techflow.co.kr',
            crypt('admin123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );

        -- auth.identities 테이블에 identity 추가 (email 컬럼 제거)
        INSERT INTO auth.identities (
            provider_id,
            id,
            user_id,
            identity_data,
            provider,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id::text,
            admin_identity_id,
            admin_user_id,
            format('{"sub":"%s","email":"%s"}', admin_user_id::text, 'admin@techflow.co.kr')::jsonb,
            'email',
            NOW(),
            NOW(),
            NOW()
        );
        
        RAISE NOTICE '테스트 관리자 계정이 생성되었습니다: admin@techflow.co.kr';
    ELSE
        RAISE NOTICE '테스트 관리자 계정이 이미 존재합니다: admin@techflow.co.kr';
    END IF;
    
    -- 관리자 설정 추가 (이미 존재하는 경우 업데이트)
    INSERT INTO admin_settings (user_id, is_admin)
    VALUES (admin_user_id, true)
    ON CONFLICT (user_id) 
    DO UPDATE SET is_admin = true;
    
    -- 기본 테스트 포스트 생성 (이미 존재하지 않는 경우에만)
    IF NOT EXISTS (SELECT 1 FROM posts WHERE title = '테크플로우 블로그에 오신 것을 환영합니다!') THEN
        INSERT INTO posts (title, content, category, author_id, is_published) VALUES
        (
            '테크플로우 블로그에 오신 것을 환영합니다!',
            '안녕하세요! 테크플로우 공식 블로그에 오신 것을 환영합니다. 

이곳에서는 다음과 같은 내용들을 만나보실 수 있습니다:

## 🚀 제품 출시 소식
새로운 기능과 서비스 출시 소식을 가장 먼저 전해드립니다.

## 📊 성공 사례
고객들의 성공 스토리와 우리 솔루션이 만들어낸 변화를 공유합니다.

## 🔧 기술 업데이트
최신 기술 동향과 우리가 적용하고 있는 혁신적인 기술들을 소개합니다.

## 📢 이벤트 및 공지
다양한 이벤트와 중요한 공지사항을 안내해드립니다.

앞으로도 유익하고 흥미로운 콘텐츠로 찾아뵙겠습니다. 감사합니다!',
            'notice',
            admin_user_id,
            true
        ),
        (
            '2024년 주요 제품 업데이트 소식',
            '올해 상반기 동안 진행된 주요 제품 업데이트 내용을 정리해서 공유드립니다.

## 새로운 기능들

### 1. 고급 분석 대시보드
- 실시간 데이터 시각화
- 커스터마이징 가능한 차트
- 자동 리포트 생성

### 2. 모바일 앱 개선
- 새로운 UI/UX 디자인
- 성능 최적화
- 오프라인 모드 지원

### 3. API 확장
- RESTful API v2.0 출시
- GraphQL 지원 추가
- 향상된 보안 기능

## 다음 업데이트 예정

다음 분기에는 AI 기반 추천 시스템과 고급 자동화 기능을 선보일 예정입니다.

많은 관심과 피드백 부탁드립니다!',
            'update',
            admin_user_id,
            true
        ),
        (
            '고객 성공 사례: ABC 기업의 디지털 전환',
            'ABC 기업이 우리 솔루션을 도입하여 이룬 놀라운 성과를 소개합니다.

## 도입 전 상황
- 수동적인 업무 프로세스
- 데이터 분산으로 인한 비효율
- 의사결정 지연

## 솔루션 적용
우리의 통합 플랫폼을 도입하여:
- 업무 프로세스 자동화
- 데이터 통합 및 실시간 분석
- 신속한 의사결정 지원

## 성과
- **업무 효율성 40% 향상**
- **의사결정 시간 60% 단축**
- **운영 비용 25% 절감**

> "테크플로우의 솔루션 덕분에 우리 회사가 완전히 달라졌습니다. 디지털 전환이 이렇게 효과적일 줄 몰랐어요." - ABC 기업 CEO

더 많은 성공 사례가 궁금하시다면 언제든 문의해주세요!',
            'case_study',
            admin_user_id,
            true
        );
        
        RAISE NOTICE '기본 테스트 포스트가 생성되었습니다.';
    END IF;
END $$;