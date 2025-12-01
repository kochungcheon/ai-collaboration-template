---
prompt_id: code-review
name: Code Review Prompts
description: 커밋/파일/PR 단위 코드 리뷰를 위한 템플릿 모음.
---

# 코드 리뷰 프롬프트 (Code Review Prompt)

아래 프롬프트에서 `{}` 부분만 채워서 사용하세요. 리뷰 기준은 문서 템플릿과 일관되게 구성했습니다.

## 공통 체크 포인트
- 컨벤션 준수: `docs/CONVENTIONS.md`
- 아키텍처 일관성: `docs/TECH_STACK.md`, `docs/PROJECT_STRUCTURE.md`
- 요구사항 충족: `docs/PRD.md`
- 테스트 커버리지: `docs/TESTING.md`
- 문서 최신화: `API.md`, `DATABASE.md`, `index.md`

---

### 프롬프트 1: 전체 커밋 리뷰
```
리뷰 대상: 최근 {{commit_scope}} (예: "1개 커밋", "feature/login 브랜치")
변경 요약: {{change_summary}}
특이사항: {{notes}}

아래 기준으로 코드 리뷰를 진행해주세요.
1. 컨벤션/스타일
2. 아키텍처 계층 및 의존성 방향
3. PRD 요구사항 및 엣지 케이스 대응
4. 테스트 작성 및 실행 여부
5. 보안/성능/자원 사용 상의 위험
6. 댕글링 참조 (없는 API/테이블/컴포넌트 호출)

결과 포맷:
- ✅ 잘된 점
- ⚠️ 개선 필요 (파일:라인, 이유, 제안)
- 🔴 Critical (필수 수정)
- 📝 기타 제안
```

### 프롬프트 2: 특정 파일 리뷰
```
리뷰 파일: {{file_path}}
변경 요약: {{change_summary}}
중점 확인 사항: {{focus_points}}

위 파일에 대해 컨벤션, 아키텍처, 테스트 영향, 잠재 Bug를 검토하고 결과를 공유해주세요. 리포트 포맷은 프롬프트 1과 동일합니다.
```

### 프롬프트 3: Pull Request 리뷰
```
PR 제목: {{pr_title}}
PR 링크/요약: {{pr_link}}
주요 변경: {{change_summary}}
테스트 실행 여부: {{test_status}}

검토 항목:
1. PR 설명이 명확한가? 변경 범위가 적절한가?
2. 모든 변경이 PRD 요구사항과 일치하는가?
3. 문서(API/DATABASE/README) 업데이트가 필요한가?
4. 테스트가 충분하고 재현 방법이 명시되어 있는가?

결과 포맷:
- 📊 PR 요약 (변경 파일 수, +/- 라인)
- ✅ Approve / ⚠️ Request Changes / 🔴 Reject (사유 포함)
- 상세 리뷰 항목 (프롬프트 1 형식)
```
