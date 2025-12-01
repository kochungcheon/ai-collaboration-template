# 프로젝트 네비게이션 (Project Navigation)

> **⚠️ AI 에이전트는 모든 작업을 시작하기 전에 이 파일을 가장 먼저 읽어야 합니다.**

이 문서는 프로젝트의 파일 구조와 각 문서의 역할을 설명합니다. 파일/폴더 구조가 변경될 경우 이 문서를 최신 상태로 업데이트해야 합니다.

## 📂 파일 구조 (File Structure)

```
/
├── meta/                 # [메타] 템플릿 재사용 가이드
│   ├── BACKEND_GENERATOR.md   # 백엔드 문서 자동 생성 프롬프트
│   ├── FRONTEND_GENERATOR.md  # 프론트엔드 문서 자동 생성 프롬프트
│   ├── UPDATE_PROMPT.md       # PRD 수정 시 문서 업데이트 프롬프트
│   ├── CODE_REVIEW.md         # Git 히스토리 기반 코드 리뷰 프롬프트
│   ├── SYNC_CHECKLIST.md      # 문서 자동 최신화 체크리스트
│   └── TEMPLATE_STRUCTURE.md  # 템플릿 구조 및 철학 설명
├── AGENT.md              # [Root] AI 에이전트의 페르소나, 행동 강령, 필수 참조 문서 정의
├── README.md             # 템플릿 사용 가이드 및 워크플로우
├── index.md              # [Map] 프로젝트 파일 구조 및 네비게이션 (본 문서)
└── docs/                 # 프로젝트 상세 문서 폴더 (모든 파일이 템플릿 형태)
    ├── PRD.md            # [Input] 제품 요구사항 템플릿 (사용자 작성)
    ├── TECH_STACK.md     # [Tech] 기술 스택 템플릿
    ├── API.md            # [API] API 명세 템플릿
    ├── DATABASE.md       # [DB] DB 스키마 템플릿
    ├── PROJECT_STRUCTURE.md # [Code] 프로젝트 폴더 구조 가이드
    ├── CONVENTIONS.md    # [Code] 코딩 컨벤션 템플릿
    ├── DEVELOPMENT.md    # [Env] 로컬 개발 환경 템플릿
    └── TESTING.md        # [Test] 테스트 전략 템플릿
```

## 📝 문서 요약 (Document Summary)

### Meta
- **`meta/BACKEND_GENERATOR.md`**: PRD를 기반으로 백엔드 문서를 자동 생성하는 AI 프롬프트를 제공합니다.
- **`meta/FRONTEND_GENERATOR.md`**: PRD와 API를 기반으로 프론트엔드 문서를 자동 생성하는 AI 프롬프트를 제공합니다.
- **`meta/UPDATE_PROMPT.md`**: PRD 수정 시 영향받는 문서들을 업데이트하는 AI 프롬프트를 제공합니다.
- **`meta/CODE_REVIEW.md`**: Git 히스토리를 기반으로 AI가 코드 리뷰를 수행하는 프롬프트를 제공합니다.
- **`meta/SYNC_CHECKLIST.md`**: AI가 문서 생성/업데이트 시 확인해야 할 체크리스트를 제공합니다 (댕글링 방지, index.md 동기화).
- **`meta/TEMPLATE_STRUCTURE.md`**: 템플릿의 구조와 철학을 설명합니다.

### Root
- **`README.md`**: 템플릿 사용 가이드 및 4가지 워크플로우를 설명합니다.
- **`AGENT.md`**: AI가 가장 먼저 읽어야 할 메타 인스트럭션 파일입니다.
- **`index.md`**: 프로젝트의 지도 역할을 합니다.

### Docs (템플릿)
- **`PRD.md`**: `<PROJECT_NAME>`, 목표, 사용자 스토리 등을 채우는 입력 문서입니다.
- **`TECH_STACK.md`**: 기술 선택과 근거를 기록합니다. `<예: Kotlin + Spring Boot>` 등 플레이스홀더를 교체하세요.
- **`API.md`**: Method/Path, DTO, 에러 코드를 정의하는 템플릿입니다.
- **`DATABASE.md`**: ERD/테이블 구조를 작성할 수 있는 표 형식 템플릿입니다.
- **`PROJECT_STRUCTURE.md`**: 폴더/패키지 생성 위치 가이드와 워커/배치 구조 예시가 포함되어 있습니다.
- **`CONVENTIONS.md`**: 백엔드/프런트엔드/스크립트 각 영역별 코딩 규칙을 채워 넣습니다.
- **`DEVELOPMENT.md`**: 로컬 환경 세팅, Docker Compose, 실행/테스트 명령 등을 정리합니다.
- **`TESTING.md`**: Testing Trophy, 도구, 시나리오 작성 방식 등을 기록합니다.
