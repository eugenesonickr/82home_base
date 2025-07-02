#!/bin/bash

# TechFlow 배포 스크립트

set -e

echo "🚀 TechFlow 배포 시작..."

# 환경 변수 확인
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ NETLIFY_AUTH_TOKEN이 설정되지 않았습니다."
    exit 1
fi

if [ -z "$NETLIFY_SITE_ID" ]; then
    echo "❌ NETLIFY_SITE_ID가 설정되지 않았습니다."
    exit 1
fi

# 의존성 설치
echo "📦 의존성 설치 중..."
npm ci

# 린트 검사
echo "🔍 코드 품질 검사 중..."
npm run lint

# 빌드
echo "🏗️ 프로덕션 빌드 중..."
npm run build

# 빌드 결과 확인
if [ ! -d "dist" ]; then
    echo "❌ 빌드 실패: dist 폴더가 생성되지 않았습니다."
    exit 1
fi

# 배포
echo "🌐 Netlify에 배포 중..."
if [ "$1" = "preview" ]; then
    echo "📋 프리뷰 배포..."
    netlify deploy --dir=dist --message="Preview deployment"
else
    echo "🎯 프로덕션 배포..."
    netlify deploy --prod --dir=dist --message="Production deployment"
fi

echo "✅ 배포 완료!"

# 배포 후 헬스 체크
echo "🏥 헬스 체크 중..."
sleep 10
curl -f https://techflow.co.kr/api/health || echo "⚠️ 헬스 체크 실패"

echo "🎉 모든 작업이 완료되었습니다!"