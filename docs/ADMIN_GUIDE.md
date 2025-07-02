# TechFlow 관리자 가이드

## 📋 목차
1. [관리자 시스템 개요](#관리자-시스템-개요)
2. [로그인 및 인증](#로그인-및-인증)
3. [게시물 관리](#게시물-관리)
4. [사용자 관리](#사용자-관리)
5. [시스템 설정](#시스템-설정)
6. [문제 해결](#문제-해결)

## 🔐 관리자 시스템 개요

TechFlow 웹사이트의 관리자 시스템은 Supabase를 기반으로 구축되어 있으며, 
게시물 관리, 사용자 관리, 시스템 모니터링 등의 기능을 제공합니다.

### 주요 기능
- ✅ 게시물 CRUD (생성, 읽기, 수정, 삭제)
- ✅ 카테고리별 게시물 관리
- ✅ 게시/비게시 상태 관리
- ✅ 실시간 미리보기
- ✅ 성능 모니터링 (개발 환경)

## 🔑 로그인 및 인증

### 관리자 계정 접근

1. **웹사이트 접속**: [https://techflow.co.kr](https://techflow.co.kr)
2. **공지사항 섹션으로 이동**: 메인 페이지에서 "공지사항" 클릭
3. **관리자 로그인 버튼 클릭**: "관리자 로그인" 버튼 클릭

### 기본 관리자 계정
```
이메일: admin@techflow.co.kr
비밀번호: admin123
```

> ⚠️ **보안 주의사항**: 프로덕션 환경에서는 반드시 기본 비밀번호를 변경하세요.

### 로그인 프로세스
1. 이메일과 비밀번호 입력
2. "로그인" 버튼 클릭
3. 인증 성공 시 관리자 패널 표시
4. 로그아웃: 관리자 패널에서 "로그아웃" 버튼 클릭

## 📝 게시물 관리

### 새 게시물 작성

1. **관리자 패널에서 "새 게시글" 버튼 클릭**
2. **게시물 정보 입력**:
   - **제목**: 게시물 제목 (필수)
   - **카테고리**: 드롭다운에서 선택
   - **내용**: 마크다운 형식 지원
   - **게시 상태**: 게시/비공개 선택

3. **카테고리 종류**:
   - `일반`: 일반적인 소식
   - `제품 출시`: 새로운 제품/서비스 출시
   - `이벤트`: 행사 및 이벤트 정보
   - `업데이트`: 시스템 업데이트 소식
   - `시스템 점검`: 점검 안내
   - `성공 사례`: 고객 성공 사례
   - `공지사항`: 중요한 공지사항

4. **게시하기**: "게시하기" 버튼 클릭

### 게시물 수정

1. **게시물 목록에서 수정할 게시물의 "수정" 아이콘 클릭**
2. **내용 수정 후 "수정하기" 버튼 클릭**

### 게시물 삭제

1. **게시물 목록에서 삭제할 게시물의 "삭제" 아이콘 클릭**
2. **확인 대화상자에서 "확인" 클릭**

> ⚠️ **주의**: 삭제된 게시물은 복구할 수 없습니다.

### 게시물 상태 관리

#### 게시 상태
- **게시됨**: 일반 사용자에게 표시
- **비공개**: 관리자만 볼 수 있음

#### 상태 변경
게시물 작성/수정 시 "게시 상태" 토글로 변경 가능

### 게시물 검색 및 필터링

#### 검색 기능
- **제목 검색**: 제목에 포함된 키워드로 검색
- **내용 검색**: 본문 내용에서 키워드 검색
- **전체 검색**: 제목과 내용을 모두 검색

#### 필터링 옵션
- **카테고리별 필터**: 특정 카테고리의 게시물만 표시
- **상태별 필터**: 게시/비공개 상태별 필터링
- **날짜별 정렬**: 최신순/오래된순 정렬

## 👥 사용자 관리

### 관리자 권한 부여

현재 시스템에서는 데이터베이스를 통해 관리자 권한을 부여합니다:

```sql
-- 새 관리자 추가
INSERT INTO admin_settings (user_id, is_admin)
VALUES ('사용자_UUID', true);

-- 관리자 권한 제거
UPDATE admin_settings 
SET is_admin = false 
WHERE user_id = '사용자_UUID';
```

### 사용자 목록 확인

Supabase 대시보드에서 확인 가능:
1. Supabase 프로젝트 대시보드 접속
2. Authentication → Users 메뉴
3. 등록된 사용자 목록 확인

## ⚙️ 시스템 설정

### 데이터베이스 관리

#### 주요 테이블
- `posts`: 게시물 정보
- `admin_settings`: 관리자 권한 설정
- `auth.users`: 사용자 계정 정보

#### 백업 및 복원
```bash
# 데이터베이스 백업
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql

# 데이터베이스 복원
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

### 환경 변수 관리

#### 프로덕션 환경 변수
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_APP_ENV=production
```

#### 개발 환경 변수
```env
VITE_SUPABASE_URL=your_development_supabase_url
VITE_SUPABASE_ANON_KEY=your_development_anon_key
VITE_APP_ENV=development
```

### 성능 모니터링

#### 개발 환경에서의 성능 모니터링
- 게시물 조회 성능 측정
- 데이터베이스 쿼리 시간 추적
- 캐시 히트율 모니터링

#### 성능 최적화 팁
1. **인덱스 활용**: 자주 조회되는 컬럼에 인덱스 생성
2. **페이지네이션**: 대량 데이터 조회 시 페이지네이션 사용
3. **캐싱**: 자주 조회되는 데이터 캐싱
4. **이미지 최적화**: 적절한 크기와 포맷 사용

## 🔧 문제 해결

### 일반적인 문제들

#### 1. 로그인 실패
**증상**: 올바른 계정 정보를 입력했지만 로그인되지 않음

**해결 방법**:
```sql
-- 관리자 권한 확인
SELECT u.email, a.is_admin 
FROM auth.users u
LEFT JOIN admin_settings a ON u.id = a.user_id
WHERE u.email = 'admin@techflow.co.kr';

-- 관리자 권한이 없다면 추가
INSERT INTO admin_settings (user_id, is_admin)
SELECT id, true FROM auth.users WHERE email = 'admin@techflow.co.kr'
ON CONFLICT (user_id) DO UPDATE SET is_admin = true;
```

#### 2. 게시물이 표시되지 않음
**증상**: 게시물을 작성했지만 목록에 나타나지 않음

**해결 방법**:
1. 게시 상태 확인 (비공개로 설정되어 있는지)
2. 브라우저 캐시 클리어
3. 데이터베이스 연결 상태 확인

#### 3. 이미지 업로드 실패
**증상**: 게시물에 이미지를 추가할 수 없음

**해결 방법**:
현재 시스템은 외부 이미지 URL을 사용합니다:
1. 이미지를 외부 서비스(예: Pexels, Unsplash)에 업로드
2. 이미지 URL을 복사하여 게시물에 삽입
3. 마크다운 형식: `![설명](이미지_URL)`

#### 4. 성능 저하
**증상**: 게시물 로딩이 느림

**해결 방법**:
1. 데이터베이스 인덱스 확인
2. 불필요한 데이터 정리
3. 캐시 설정 확인

### 데이터베이스 유지보수

#### 정기 점검 항목
1. **인덱스 사용률 확인**:
```sql
SELECT * FROM check_posts_indexes();
```

2. **게시물 통계 확인**:
```sql
SELECT * FROM posts_stats;
```

3. **디스크 사용량 확인**:
```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 보안 점검

#### 정기 보안 점검 항목
1. **관리자 계정 확인**: 불필요한 관리자 권한 제거
2. **비밀번호 정책**: 강력한 비밀번호 사용 확인
3. **접근 로그 확인**: 비정상적인 접근 시도 모니터링
4. **환경 변수 보안**: 민감한 정보 노출 방지

## 📞 지원 및 문의

### 기술 지원
- **이메일**: dev@techflow.co.kr
- **내부 문의**: IT 팀 슬랙 채널
- **긴급 상황**: 010-9999-8888

### 문서 및 리소스
- **개발 문서**: [GitHub Wiki](https://github.com/techflow/corporate-website/wiki)
- **API 문서**: [API 가이드](docs/API.md)
- **배포 가이드**: [DEPLOYMENT.md](DEPLOYMENT.md)

### 업데이트 및 공지
- **시스템 업데이트**: 매월 첫째 주 화요일
- **보안 패치**: 필요시 즉시 적용
- **기능 업데이트**: 분기별 계획에 따라 진행

---

이 가이드를 통해 TechFlow 웹사이트를 효율적으로 관리하실 수 있습니다. 
추가 질문이나 문제가 있으시면 언제든 개발팀에 문의해주세요! 🚀