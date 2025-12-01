---
prompt_id: docs-update
name: Documentation Update Prompts
description: PRD 변경 시 전체 혹은 부분 문서를 빠르게 업데이트하기 위한 프롬프트 모음.
---

# 문서 업데이트 프롬프트 (Documentation Update Prompts)

PRD에 변경 사항이 생겼을 때 사용합니다. 원하는 범위에 따라 프롬프트를 선택하고, `{}` 내부 값만 채워 넣으세요.

## 공통 입력값
- `{{project_name}}`: 프로젝트 이름
- `{{change_summary}}`: PRD 변경 요약 (bullet 또는 문장)
- `{{files_to_check}}`: 영향 받는 문서 목록 (콤마 구분)

---

### 프롬프트 1: 전체 문서 재검토
```
프로젝트: {{project_name}}
변경 요약: {{change_summary}}
영향 문서: {{files_to_check}}

위 변경 사항을 반영하여 다음 문서를 모두 재검토·업데이트해주세요.
- docs/TECH_STACK.md
- docs/API.md
- docs/DATABASE.md
- docs/CONVENTIONS.md
- docs/PROJECT_STRUCTURE.md
- docs/TESTING.md
- docs/DEVELOPMENT.md
- index.md
- AGENT.md

지침:
1. PRD와 새 요구사항을 기준으로 각 문서를 일관성 있게 업데이트합니다.
2. 삭제된 기능/테이블/API가 남아 있지 않은지 확인합니다.
3. 문서 간 참조가 실제 존재하는지 검증합니다.
```

### 프롬프트 2-A: API 명세만 업데이트
```
프로젝트: {{project_name}}
변경 요약: {{change_summary}}
영향 엔드포인트: {{files_to_check}}

`docs/API.md`만 업데이트해주세요. 작업 시 확인할 내용:
- 새 기능에 필요한 엔드포인트 추가/수정
- 요청/응답 스키마, 인증 요건, 에러 코드 반영
- 기존 문서와 충돌하거나 삭제된 엔드포인트가 남지 않도록 정리
```

### 프롬프트 2-B: DB 스키마만 업데이트
```
프로젝트: {{project_name}}
변경 요약: {{change_summary}}
영향 테이블: {{files_to_check}}

`docs/DATABASE.md`와 연관 마이그레이션 정보를 업데이트해주세요. 작업 시 확인할 내용:
- 새 테이블/컬럼 정의 및 인덱스/제약조건 명시
- 삭제/수정된 필드가 다른 문서(API/PROJECT_STRUCTURE)에 반영되었는지 검증
- 마이그레이션 단계 및 백필 전략이 필요한 경우 추가
```

### 프롬프트 3: 일관성 검사/댕글링 참조
```
프로젝트: {{project_name}}
변경 요약: {{change_summary}}
검증 대상 문서: {{files_to_check}}

다음 항목을 점검한 뒤 결과를 요약해주세요.
1. 문서 간 파일/엔드포인트/테이블 참조가 모두 실제 존재하는지
2. PRD와 최신 문서 간에 충돌되는 내용이 없는지
3. 삭제된 기능이나 예전 명칭이 남아 있지 않은지
필요하면 수정 제안 또는 TODO 목록을 제시하세요.
```
