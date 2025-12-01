---
prompt_id: backend-docs-fastapi
name: Python/FastAPI Backend Documentation Generator
description: FastAPI + SQLAlchemy 프로젝트 전용 백엔드 문서 생성 템플릿.
inputs:
  project_name: "프로젝트 이름"
  prd_path: "PRD 경로 (기본값 docs/PRD.md)"
  notes: "데이터베이스/비동기/배포 옵션 (예: PostgreSQL + Celery)"
outputs:
  - docs/TECH_STACK.md
  - docs/API.md
  - docs/DATABASE.md
  - docs/CONVENTIONS.md
  - docs/TESTING.md
  - docs/DEVELOPMENT.md
  - docs/PROJECT_STRUCTURE.md
---

# Python/FastAPI 백엔드 문서 생성 프롬프트

FastAPI, SQLAlchemy, Celery, Redis 등을 표준으로 삼는 프로젝트를 위해 구성된 템플릿입니다. `{{ }}` 플레이스홀더만 채워 사용하세요.

## 🔧 입력값
- `{{project_name}}`
- `{{prd_path}}`
- `{{notes}}` (옵션, 예: "DB=PostgreSQL, Broker=RabbitMQ, 배포=AWS Elastic Beanstalk")

## 📦 기본 스택 권장사항
- Python 3.11+, FastAPI, Uvicorn
- ORMs: SQLAlchemy 2.x + Alembic (또는 Tortoise ORM)
- DB: PostgreSQL, 캐시/브로커: Redis
- 비동기: Celery/RQ + Flower
- 인증: OAuth2/JWT (fastapi-users 등)
- 테스트: pytest, httpx, pytest-asyncio
- 배포: Docker Compose + Uvicorn/Gunicorn, 또는 서버리스 환경

## 🤖 Prompt Template
```markdown
프로젝트 이름: {{project_name}}
PRD 경로: {{prd_path}}
특이사항: {{notes}}

다음 문서를 FastAPI 기준으로 생성해주세요.
1. docs/TECH_STACK.md – FastAPI, ASGI 서버(Uvicorn), SQLAlchemy, Celery/Redis, IaC 등을 포함
2. docs/API.md – FastAPI Router/Dependency 구조, Pydantic 모델, JWT/OAuth2 인증, 페이징/필터링 규칙
3. docs/DATABASE.md – SQLAlchemy 모델/스키마, Alembic 전략, 인덱스/제약조건
4. docs/CONVENTIONS.md – PEP8, 모듈 구조(apps/services/routes), 환경 변수 규칙
5. docs/TESTING.md – pytest, pytest-asyncio, httpx 기반 E2E 전략
6. docs/DEVELOPMENT.md – 가상환경/poetry, Docker Compose(Postgres/Redis) 실행, uvicorn 명령
7. docs/PROJECT_STRUCTURE.md – app/, core/, routes/, services/ 구조와 모듈 배치 규칙

지침:
- PRD 요구사항(기능/비기능/보안)을 모든 문서에 반영하고, 비동기 작업이나 WebSocket 등 FastAPI 특화 기능이 필요한지 명시합니다.
- Celery 작업/스케줄/재시도 정책이 있다면 TECH_STACK, DEVELOPMENT, TESTING 문서에 일관되게 기재합니다.
- 생성 완료 후 index.md와 AGENT.md 변경 여부를 검토하고 필요한 업데이트를 수행하세요.
```
