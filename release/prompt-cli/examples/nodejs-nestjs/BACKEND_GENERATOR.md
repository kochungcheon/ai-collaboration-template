---
prompt_id: backend-docs-node
name: Node.js/NestJS Backend Documentation Generator
description: Node.js 20+/NestJS 10+ 기반 프로젝트를 위한 백엔드 문서 생성 템플릿.
inputs:
  project_name: "프로젝트 이름"
  prd_path: "PRD 경로 (기본값 docs/PRD.md)"
  notes: "데이터베이스/메시징 등 선택 옵션 (예: PostgreSQL + Redis)"
outputs:
  - docs/TECH_STACK.md
  - docs/API.md
  - docs/DATABASE.md
  - docs/CONVENTIONS.md
  - docs/TESTING.md
  - docs/DEVELOPMENT.md
  - docs/PROJECT_STRUCTURE.md
---

# Node.js/NestJS 백엔드 문서 생성 프롬프트

NestJS, TypeScript, PostgreSQL/Redis 등을 표준으로 사용하는 프로젝트를 위한 템플릿입니다. 아래 플레이스홀더를 채워 그대로 사용하세요.

## 🔧 입력값
- `{{project_name}}`
- `{{prd_path}}`
- `{{notes}}` (옵션, 예: "DB=PostgreSQL, Cache=Redis, Queue=Bull")

## 📦 기본 스택 권장사항
- 런타임: Node.js 20+, NestJS 10+
- 언어: TypeScript (strict)
- DB: PostgreSQL + TypeORM/Prisma
- Queue: BullMQ / Redis
- 테스트: Jest + Supertest
- 빌드/도구: pnpm 또는 npm, Docker Compose

## 🤖 Prompt Template
```markdown
프로젝트 이름: {{project_name}}
PRD 경로: {{prd_path}}
특이사항: {{notes}}

다음 문서를 NestJS 기준으로 생성해주세요.
1. docs/TECH_STACK.md – 언어, 프레임워크, DB, 메시징, IaC, 회복 패턴 등을 명시
2. docs/API.md – NestJS Controller/DTO 패턴에 맞춰 엔드포인트 정의
3. docs/DATABASE.md – TypeORM/Prisma 스키마, 인덱스, 마이그레이션 전략
4. docs/CONVENTIONS.md – TypeScript/NestJS 코딩 규칙, 폴더 구조, Lint 설정
5. docs/TESTING.md – Jest, Supertest, E2E/Integration 전략, 커버리지 목표
6. docs/DEVELOPMENT.md – pnpm/npm 스크립트, Docker Compose(PostgreSQL/Redis) 사용법, .env 템플릿
7. docs/PROJECT_STRUCTURE.md – Nest 모듈/컨트롤러/서비스/DTO 배치 규칙

지침:
- PRD에 정의된 기능/비기능 요구사항을 모든 문서에 일관되게 반영합니다.
- JWT 인증, class-validator 기반 DTO, 예외 필터 등 NestJS 기본 패턴을 포함합니다.
- 큐/캐시/배치 사용 시 구성 방법을 TECH_STACK 및 DEVELOPMENT 문서에 함께 기재합니다.
- 생성 후 index.md 및 AGENT.md가 갱신되어야 하는지 검토하고 필요 시 업데이트합니다.
```
