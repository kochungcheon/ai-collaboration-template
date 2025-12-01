---
prompt_id: frontend-docs
name: Frontend Documentation Generator
description: 백엔드 PRD/API를 기반으로 프론트엔드 문서를 생성하는 표준 프롬프트.
inputs:
  project_name: "프로젝트 이름"
  prd_path: "PRD 파일 경로 (기본값: docs/PRD.md)"
  api_path: "API 명세 경로 (기본값: docs/API.md)"
  frontend_stack: "선호 프레임워크/도구 메모 (옵션)"
outputs:
  - frontend/AGENT.md
  - frontend/docs/TECH_STACK.md
  - frontend/docs/COMPONENTS.md
  - frontend/docs/ROUTING.md
  - frontend/docs/STATE_MANAGEMENT.md
  - frontend/docs/CONVENTIONS.md
---

# 프론트엔드 문서 생성 프롬프트 (Frontend Documentation Generator)

PRD와 API 명세만 준비되어 있다면, 아래 템플릿으로 프론트엔드용 문서를 일괄 생성할 수 있습니다. 필요한 정보를 `{{ }}` 플레이스홀더에 채운 뒤 사용하세요.

## ✅ 준비 사항
1. `{{prd_path}}`, `{{api_path}}` 경로에 최신 문서가 있는지 확인합니다.
2. 프론트엔드 기술 선택(React, Vue, Svelte 등)을 `{{frontend_stack}}`에 간단히 적어두면 일관된 산출물 생성에 도움이 됩니다.
3. 생성된 문서는 `frontend/` 폴더에 위치하므로, 존재하지 않으면 CLI 또는 수동으로 폴더를 만들어 주세요.

## 🔧 Prompt Inputs
- `{{project_name}}`
- `{{prd_path}}`
- `{{api_path}}`
- `{{frontend_stack}}` (옵션)

## 📦 Outputs
| 파일 | 설명 |
| --- | --- |
| `frontend/AGENT.md` | 프론트엔드 AI 에이전트 설정|
| `frontend/docs/TECH_STACK.md` | FE 기술 스택/툴링|
| `frontend/docs/COMPONENTS.md` | 기능→컴포넌트 매핑|
| `frontend/docs/ROUTING.md` | 페이지/라우트 구조|
| `frontend/docs/STATE_MANAGEMENT.md` | 서버/클라이언트 상태 전략|
| `frontend/docs/CONVENTIONS.md` | 코딩 컨벤션/안티 패턴|

## 🧭 작업 절차
1. PRD에서 사용자 스토리와 UX 흐름을 추출합니다.
2. API 명세에서 각 기능이 호출하는 엔드포인트 정보를 연결합니다.
3. 아래 템플릿을 채워 AI에게 전달합니다.
4. 생성 후 `index.md`에 `frontend/` 구조를 추가하고, 필요 시 README에 안내를 갱신합니다.

## 🤖 Prompt Template
```markdown
프로젝트 이름: {{project_name}}
PRD 경로: {{prd_path}}
API 명세 경로: {{api_path}}
프론트엔드 스택/메모: {{frontend_stack}}

다음 문서를 생성해주세요.
1. frontend/AGENT.md
2. frontend/docs/TECH_STACK.md
3. frontend/docs/COMPONENTS.md
4. frontend/docs/ROUTING.md
5. frontend/docs/STATE_MANAGEMENT.md
6. frontend/docs/CONVENTIONS.md

요구사항:
- PRD에 정의된 기능/화면을 기준으로 페이지와 컴포넌트를 설계하세요.
- API.md에 명시된 엔드포인트만 사용하며, 각 문서에서 참조할 때 경로/HTTP 메서드를 정확히 적습니다.
- 상태 관리, 라우팅, 컴포넌트 문서 간에 참조가 맞물리는지 검증하세요.
- 새 문서가 생성되면 `index.md`의 파일 구조를 업데이트하고, 필요 시 README에도 프론트엔드 워크플로우를 추가합니다.
```
