---
prompt_id: backend-docs
name: Backend Documentation Generator
description: PRD를 읽고 백엔드 관련 문서를 일괄 재생성하도록 지시하는 표준 프롬프트입니다.
inputs:
  project_name: "새 프로젝트 이름"
  prd_path: "PRD 파일 경로 (기본값: docs/PRD.md)"
  notes: "특이사항 또는 비고 (옵션)"
outputs:
  - docs/TECH_STACK.md
  - docs/API.md
  - docs/DATABASE.md
  - docs/CONVENTIONS.md
  - docs/TESTING.md
  - docs/DEVELOPMENT.md
  - index.md
  - AGENT.md
---

# 백엔드 문서 생성 프롬프트 (Backend Documentation Generator)

이 프롬프트는 어떤 도메인의 PRD라도 동일한 형식으로 백엔드 문서를 재생성할 수 있도록 구조화되어 있습니다. 플레이스홀더(`{{ }}`)에 값을 채워 넣은 뒤 그대로 AI에게 전달하세요.

## 📋 사용 전 체크리스트
1. `{{prd_path}}` 위치에 최신 PRD가 작성되었는지 확인합니다.
2. 기존 `docs/*.md` 파일을 덮어써도 되는지 팀과 합의합니다.
3. 산출물 위치(`outputs`)를 변경하려면 이 문서와 `index.md`를 함께 수정합니다.

## 🧾 입력값 (Inputs)
- `{{project_name}}`: 프로젝트 또는 제품 이름.
- `{{prd_path}}`: PRD 파일 경로.
- `{{notes}}`: 기술적 제약, 보안 요구사항 등 추가 설명(필요 시만 사용).

## 📦 산출물 (Outputs)
| 파일 | 설명 |
| --- | --- |
| `docs/TECH_STACK.md` | 아키텍처 및 인프라 전략 |
| `docs/API.md` | REST/GraphQL 등 인터페이스 명세 |
| `docs/DATABASE.md` | 데이터 모델 및 마이그레이션 가이드 |
| `docs/CONVENTIONS.md` | 언어/프레임워크별 코딩 규칙 |
| `docs/TESTING.md` | 테스트 전략/도구/품질 지표 |
| `docs/DEVELOPMENT.md` | 로컬 실행 및 환경 구성 |
| `index.md` | 최신 파일 맵 |
| `AGENT.md` | 프로젝트 맥락 및 에이전트 지침 |

## 🛠️ 워크플로우
1. 아래 템플릿에서 플레이스홀더를 채웁니다.
2. AI에게 전달하여 문서 재생성을 요청합니다.
3. 생성된 문서를 검토하고 `npm run validate`로 참조 검증을 수행합니다.
4. 필요한 경우 README/index 등을 수동으로 보정합니다.

## 🤖 Prompt Template
```markdown
프로젝트 이름: {{project_name}}
PRD 경로: {{prd_path}}
추가 메모: {{notes}}

다음 산출물을 PRD와 일관성 있게 재생성해주세요.
1. docs/TECH_STACK.md
2. docs/API.md
3. docs/DATABASE.md
4. docs/CONVENTIONS.md
5. docs/TESTING.md
6. docs/DEVELOPMENT.md
7. index.md
8. AGENT.md

작업 지침:
- PRD의 기능/사용자 스토리/비기능 요구사항을 먼저 분석한 뒤 각 문서에 반영하세요.
- 문서 간 참조가 실제 존재하는지 확인합니다 (API↔DB↔문서).
- 파일 구조를 변경했다면 index.md 트리를 최신화하고, AGENT.md의 "프로젝트 맥락" 섹션을 새 프로젝트 정보로 채워 넣으세요.
- 새 문서가 기존 내용을 덮어쓰게 되므로, 포맷은 유지하되 내용은 전부 갱신합니다.
```
