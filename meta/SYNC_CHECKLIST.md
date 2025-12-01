# 문서 자동 최신화 체크리스트

이 문서는 AI가 문서를 생성하거나 업데이트할 때 **반드시 확인해야 할 체크리스트**입니다.

## ✅ 문서 생성 시 체크리스트

### 백엔드 문서 생성 (`meta/BACKEND_GENERATOR.md` 사용 시)
- [ ] `docs/PRD.md`를 읽고 모든 기능을 파악했는가?
- [ ] `docs/TECH_STACK.md`가 PRD의 비기능 요구사항을 만족하는가?
- [ ] `docs/API.md`의 모든 엔드포인트가 PRD의 기능을 커버하는가?
- [ ] `docs/DATABASE.md`의 모든 테이블이 API에서 사용되는가?
- [ ] `docs/PROJECT_STRUCTURE.md`가 모든 기능을 수용할 수 있는가?
- [ ] `docs/CONVENTIONS.md`가 선택한 기술 스택에 맞는가?
- [ ] `docs/TESTING.md`가 프로젝트 특성을 반영하는가?
- [ ] `docs/DEVELOPMENT.md`가 실제 실행 가능한 환경 설정을 포함하는가?
- [ ] **`index.md`를 업데이트**했는가?
- [ ] **`AGENT.md`의 프로젝트 맥락**을 수정했는가?

### 프론트엔드 문서 생성 (`meta/FRONTEND_GENERATOR.md` 사용 시)
- [ ] `docs/PRD.md`와 `docs/API.md`를 읽었는가?
- [ ] `frontend/docs/COMPONENTS.md`의 모든 컴포넌트가 PRD 기능과 매핑되는가?
- [ ] `frontend/docs/ROUTING.md`의 모든 경로가 PRD 사용자 스토리와 매핑되는가?
- [ ] `frontend/docs/STATE_MANAGEMENT.md`가 API 데이터 구조를 반영하는가?
- [ ] **`index.md`에 `frontend/` 폴더를 추가**했는가?

---

## 🔍 댕글링 참조 체크리스트

### API ↔ DATABASE
- [ ] `API.md`의 모든 엔드포인트가 참조하는 테이블이 `DATABASE.md`에 존재하는가?
- [ ] `DATABASE.md`의 모든 테이블이 `API.md` 또는 PRD에서 사용되는가?

### API ↔ COMPONENTS
- [ ] `frontend/docs/COMPONENTS.md`의 모든 컴포넌트가 호출하는 API가 `docs/API.md`에 정의되어 있는가?
- [ ] `docs/API.md`의 모든 엔드포인트가 최소 1개 이상의 컴포넌트에서 사용되는가?

### ROUTING ↔ COMPONENTS
- [ ] `frontend/docs/ROUTING.md`의 모든 경로가 참조하는 컴포넌트가 `frontend/docs/COMPONENTS.md`에 정의되어 있는가?
- [ ] `frontend/docs/COMPONENTS.md`의 모든 페이지 컴포넌트가 `frontend/docs/ROUTING.md`에 경로로 정의되어 있는가?

### PRD ↔ 모든 문서
- [ ] PRD에서 삭제된 기능의 참조가 모든 문서에서 제거되었는가?
- [ ] PRD에 추가된 기능이 관련 문서(API, DB, COMPONENTS)에 반영되었는가?

---

## 🔄 문서 업데이트 시 체크리스트

### PRD 수정 후 (`meta/UPDATE_PROMPT.md` 사용 시)
- [ ] 영향받는 문서를 정확히 파악했는가?
- [ ] 변경된 부분만 수정했는가? (전체 재작성 금지)
- [ ] 일관성 검증 프롬프트를 실행했는가?
- [ ] 댕글링 참조가 없는지 확인했는가?
- [ ] **`index.md`가 최신 상태인가?**

---

## 📝 index.md 업데이트 체크리스트

### 파일 추가/삭제 시
- [ ] 파일 구조 트리에 새 파일이 추가되었는가?
- [ ] 삭제된 파일이 트리에서 제거되었는가?
- [ ] 문서 요약 섹션에 새 파일 설명이 추가되었는가?
- [ ] 삭제된 파일 설명이 요약에서 제거되었는가?

### 폴더 추가 시 (예: frontend/)
- [ ] 폴더 구조 트리에 새 폴더가 추가되었는가?
- [ ] 폴더 내 모든 파일이 트리에 나열되었는가?
- [ ] 문서 요약에 새 섹션(예: Frontend)이 추가되었는가?

---

## ⚠️ 자동 수정 가능 항목

다음 항목은 AI가 자동으로 수정할 수 있습니다:

1. **댕글링 참조 제거**
   - 예: 삭제된 API 엔드포인트를 참조하는 컴포넌트 코드 제거

2. **index.md 동기화**
   - 예: 새로 생성된 파일을 index.md 트리에 자동 추가

3. **일관성 수정**
   - 예: PRD의 기능명 변경 시 모든 문서에서 일괄 변경

---

## 🎯 최종 검증

모든 작업 완료 후 다음을 확인하세요:

```
✅ PRD와 모든 문서가 일관성을 유지하는가?
✅ 댕글링 참조가 없는가?
✅ index.md가 최신 상태인가?
✅ 모든 링크가 작동하는가?
✅ 파일명이 대문자 규칙을 따르는가?
```

이 체크리스트를 통과하면 **문서 자동 최신화 완료**입니다! 🎉
