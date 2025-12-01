# AI 협업 템플릿 (AI Collaboration Template)

> **PRD 하나로 모든 개발 문서를 자동 생성하는 AI 협업 프레임워크**

이 템플릿은 제품 요구사항(PRD)을 템플릿 형식으로 작성하면, AI가 기술 스택, API 명세, 데이터베이스 스키마, 코딩 컨벤션 등 **모든 개발 문서를 자동으로 생성**하도록 설계되었습니다. `docs/*.md`는 모두 플레이스홀더 형태이므로, 자신의 프로젝트 값으로 교체한 뒤 사용하세요.

---

## 목차
- [빠른 시작](#빠른-시작)
- [핵심 개념](#핵심-개념)
- [📂 프로젝트 구조](#-프로젝트-구조)
- [워크플로우](#워크플로우)
- [사용 예시](#사용-예시)
- [개발 도구](#개발-도구)
- [학습 자료](#학습-자료)
- [주의사항](#주의사항)

---

## 빠른 시작
1. **설치**: 저장소를 내려받고 `npm install`로 의존성을 설치합니다.
2. **PRD 작성**: `docs/PRD.md`의 `<>` 플레이스홀더를 프로젝트 요구사항으로 채웁니다.
3. **문서 생성**: `npm run prompt`를 실행해 백엔드/프론트엔드 프롬프트를 고르고, CLI 안내에 따라 입력값을 넣으면 완성된 프롬프트가 클립보드에 복사됩니다. 이를 AI 터미널에 붙여넣어 `docs/*.md`를 채웁니다.
4. **일관성 검증**: 문서를 갱신할 때마다 `npm run validate`로 참조 오류를 점검하고, `git add`/`git commit`으로 버전 관리합니다.
5. **배포/분리(선택)**: 템플릿과 CLI를 각각 배포하려면 `npm run release`를 실행해 `release/ai-md-templates`, `release/prompt-cli` 폴더(및 ZIP)를 사용합니다.

> 더 자세한 흐름은 아래 “워크플로우”와 “사용 예시”에서 단계별로 확인할 수 있습니다.

---

## 핵심 개념

### Single Source of Truth: PRD
- **사용자가 작성**: `docs/PRD.md` 템플릿 (각 섹션에 PRD 내용을 채워 넣음)
- **AI가 생성**: 나머지 모든 문서 (기술 스택, API, DB, 컨벤션 등). 모든 파일이 템플릿 형태이므로 AI 출력/사용자 입력으로 값을 채웁니다.

### 메타 프롬프트 시스템
`meta/` 및 `examples/` 폴더의 프롬프트 파일은 YAML Frontmatter + 템플릿 본문 구조를 따릅니다. `{{project_name}}`, `{{prd_path}}` 등의 플레이스홀더를 채우거나 CLI에서 입력하여, AI가 문서를 자동으로 생성하도록 지시할 수 있습니다.


### 왜 이런 템플릿이 필요한가? (Pain → Solution → Limitation)
- **Pain Point**: “PRD만 바꿨는데도 기술 스택·DB·API·테스트 문서를 다시 쓰느라 시간이 많이 듦. 각 문서의 항목이나 형식을 사람마다 달리 적어 일관성이 깨짐.”
- **Solution**:
  - PRD부터 모든 문서를 템플릿 형태로 통일하고, `meta/*.md` 프롬프트를 통해 AI가 자동으로 채우도록 했습니다.
  - `npm run prompt`는 프롬프트 선택 → 입력값 안내 → 플레이스홀더 자동 치환까지 도와주고, `npm run validate`는 docs/meta/examples/README/index의 참조를 모두 검사해 회귀를 막습니다.
  - Jest 테스트 + GitHub Actions CI가 prompt CLI/validator가 고장나지 않도록 자동 검증합니다.
- **Limitation**:
  - CLI는 텍스트 복사와 입력값 치환까지만 지원하며, 실제 LLM API 호출은 사용자가 직접 해야 합니다 (API 키/요금 결제는 별도).
  - 생성된 문서도 최종 검토와 축약, 프로젝트 특화 보완은 사람이 해야 합니다. 이 템플릿은 “자동화된 초안”을 빠르게 만드는 도구일 뿐, 완성본을 보장하지는 않습니다.

---

## 📂 프로젝트 구조

```
/
├── meta/                 # 템플릿 메타 프롬프트
│   ├── BACKEND_GENERATOR.md   # 백엔드 문서 생성
│   ├── FRONTEND_GENERATOR.md  # 프론트엔드 문서 생성
│   ├── UPDATE_PROMPT.md       # PRD 수정 시 업데이트
│   ├── CODE_REVIEW.md         # Git 기반 코드 리뷰
│   ├── SYNC_CHECKLIST.md      # 문서 동기화 체크리스트
│   └── TEMPLATE_STRUCTURE.md  # 템플릿 철학
├── AGENT.md              # AI 에이전트 설정 (백엔드)
├── README.md             # 사용 가이드 (본 문서)
├── index.md              # 프로젝트 네비게이션
└── docs/                 # 프로젝트 문서 (PRD 기반 자동 생성)
    ├── PRD.md            # 제품 요구사항 (사용자 작성)
    ├── TECH_STACK.md     # 기술 스택 템플릿 (AI/사용자 입력)
    ├── API.md            # API 명세 템플릿
    ├── DATABASE.md       # DB 스키마 템플릿
    ├── PROJECT_STRUCTURE.md  # 폴더 구조 가이드
    ├── CONVENTIONS.md    # 코딩 컨벤션 템플릿
    ├── TESTING.md        # 테스트 전략 템플릿
    └── DEVELOPMENT.md    # 개발 환경 템플릿
```

---

## 워크플로우

### 워크플로우 한눈에 보기

| 언제 사용하나요? | 핵심 파일/프롬프트 | 주요 명령 | 산출물 |
| --- | --- | --- | --- |
| 새 프로젝트를 시작할 때 | `docs/PRD.md`, `meta/BACKEND_GENERATOR.md` | `npm run prompt` (백엔드) | TECH_STACK/API/DB 등 docs/*.md 기본 문서 |
| PRD 수정 후 영향 문서만 업데이트할 때 | `meta/UPDATE_PROMPT.md` (프롬프트 2-A/2-B) | `npm run prompt` → Update 프롬프트 | 수정된 API/DB 섹션 |
| 프론트엔드 설계를 시작할 때 | `meta/FRONTEND_GENERATOR.md` | `npm run prompt` (Frontend) | `frontend/` 문서 구조, 컴포넌트/라우팅 가이드 |
| 실제 코드를 작성하기 전 환경을 재정비할 때 | `index.md`, `docs/DEVELOPMENT.md`, `docs/PROJECT_STRUCTURE.md` | 파일 참조 | 로컬 개발 환경, 폴더 구조 가이드 |
| 코드 품질을 점검하고 싶을 때 | `meta/CODE_REVIEW.md` | `npm run prompt` (Review) | 커밋/파일/PR 리뷰용 프롬프트 |

아래 섹션에서는 각 워크플로우를 상세 단계로 설명합니다.

### 워크플로우 1: 새 프로젝트 시작

#### 1단계: PRD 작성
`docs/PRD.md` 템플릿의 플레이스홀더(`<>`)를 프로젝트 정보로 교체하고 **새 프로젝트의 요구사항**을 작성합니다.

**포함할 내용**:
- 제품 비전
- 사용자 스토리
- 기능 명세
- 비기능 요구사항 (성능, 보안 등)

#### 2단계: 백엔드 문서 생성
1. `meta/BACKEND_GENERATOR.md` 파일을 엽니다.
2. Frontmatter에 정의된 `project_name`, `prd_path` 등의 입력값을 채웁니다.
3. **Prompt Template** 블록을 복사해 AI에게 전달하거나, `npm run prompt`로 선택 후 값을 입력합니다.

**AI가 자동 생성/갱신하는 문서**:
- ✅ `docs/TECH_STACK.md`
- ✅ `docs/API.md`
- ✅ `docs/DATABASE.md`
- ✅ `docs/CONVENTIONS.md`
- ✅ `docs/TESTING.md`
- ✅ `docs/DEVELOPMENT.md`

#### 3단계: 프론트엔드 문서 생성 (선택 사항)
1. `meta/FRONTEND_GENERATOR.md` 파일을 열고 필요한 입력값을 채웁니다.
2. Prompt Template을 복사하거나 CLI에서 선택합니다.
3. AI에게 실행을 요청합니다.

**AI가 자동 생성하는 문서**:
- ✅ `frontend/AGENT.md`
- ✅ `frontend/docs/TECH_STACK.md`
- ✅ `frontend/docs/COMPONENTS.md`
- ✅ `frontend/docs/ROUTING.md`
- ✅ `frontend/docs/STATE_MANAGEMENT.md`
- ✅ `frontend/docs/CONVENTIONS.md`

#### 4단계: 메타 문서 업데이트
1. `AGENT.md` 파일을 엽니다.
2. **"프로젝트 맥락" 섹션**을 새 프로젝트에 맞게 수정합니다.
3. `index.md` 파일을 열어서 파일 구조가 변경되었다면 업데이트합니다.

---

### 워크플로우 2: PRD 수정 시 문서 업데이트

#### 1단계: PRD 수정
`docs/PRD.md`에 새로운 기능을 추가하거나 기존 내용을 수정합니다.

#### 2단계: 영향받는 문서 파악
- 기능 추가 → `API.md`, `DATABASE.md` 영향
- 기술 스택 변경 → `TECH_STACK.md`, `DEVELOPMENT.md` 영향
- 아키텍처 변경 → `PROJECT_STRUCTURE.md` 영향

#### 3단계: 문서 업데이트
1. `meta/UPDATE_PROMPT.md` 파일을 엽니다.
2. 상황에 맞는 프롬프트를 선택합니다:
   - **프롬프트 1**: 전체 문서 재검토 및 업데이트
   - **프롬프트 2**: 특정 문서만 빠른 업데이트 (API, DB, 기술 스택)
   - **프롬프트 3**: 일관성 검증
3. 프롬프트를 복사하여 AI에게 붙여넣기합니다.

#### 4단계: 일관성 검증
1. `meta/UPDATE_PROMPT.md`의 **프롬프트 3: 일관성 검증**을 사용합니다.
2. AI가 모든 문서 간 일관성을 체크하고 리포트를 제공합니다.

---

### 워크플로우 3: 프론트엔드 추가 개발

#### 상황
백엔드 개발이 어느 정도 진행된 후, 프론트엔드 개발을 시작하려고 합니다.

#### 단계
1. `meta/FRONTEND_GENERATOR.md` 파일을 엽니다.
2. 프롬프트를 복사하여 AI에게 붙여넣기합니다.
3. AI가 `docs/PRD.md`와 `docs/API.md`를 읽고 프론트엔드 문서를 자동 생성합니다.

**생성되는 것**:
- `frontend/` 폴더 전체
- 컴포넌트 설계 (PRD 기능 → React 컴포넌트 매핑)
- API 연동 방법 (각 컴포넌트가 호출할 엔드포인트)
- 라우팅 구조 (PRD 사용자 스토리 → 페이지 매핑)

---

### 워크플로우 4: 코드 구현 시작

#### 1단계: 환경 이해
1. `index.md`를 읽어 전체 구조를 파악합니다.
2. `AGENT.md`를 읽어 AI의 역할과 행동 강령을 이해합니다.

#### 2단계: 구현 준비
1. `docs/DEVELOPMENT.md`를 읽고 로컬 환경을 설정합니다.
2. `docs/PROJECT_STRUCTURE.md`를 읽고 파일을 어디에 생성할지 파악합니다.

#### 3단계: 기능 구현
1. `docs/PRD.md`에서 구현할 기능을 선택합니다.
2. `docs/API.md`에서 해당 기능의 엔드포인트를 확인합니다.
3. `docs/DATABASE.md`에서 필요한 테이블을 확인합니다.
4. `docs/CONVENTIONS.md`를 따라 코드를 작성합니다.

#### 4단계: 테스트 작성
1. `docs/TESTING.md`를 읽고 테스트 전략을 파악합니다.
2. Cucumber 시나리오를 먼저 작성합니다 (BDD).
3. 단위 테스트 및 통합 테스트를 작성합니다.

---

### 워크플로우 5: 코드 리뷰

#### 상황
기능 구현을 완료하고 커밋했습니다. 코드 품질을 확인하고 싶습니다.

#### 단계
1. `meta/CODE_REVIEW.md` 파일을 엽니다.
2. 상황에 맞는 프롬프트를 선택합니다:
   - **프롬프트 1**: 전체 커밋 리뷰
   - **프롬프트 2**: 특정 파일만 리뷰
   - **프롬프트 3**: PR (Pull Request) 리뷰
3. 프롬프트를 복사하여 AI에게 붙여넣기합니다.

**AI가 확인하는 것**:
- ✅ `docs/CONVENTIONS.md` 컨벤션 준수
- ✅ `docs/PROJECT_STRUCTURE.md` 아키텍처 일관성
- ✅ `docs/PRD.md` 요구사항 충족
- ✅ `docs/TESTING.md` 테스트 커버리지
- ✅ 보안 취약점 및 성능 이슈
- ✅ 댕글링 참조 (존재하지 않는 API/테이블 호출)

---

## 사용 예시

### 예시 1: E-commerce 프로젝트 시작
```bash
# 1. PRD 작성 (docs/PRD.md 템플릿의 <> 구간을 프로젝트 값으로 교체)
vim docs/PRD.md

# 2. 백엔드 문서 생성
npm run prompt              # Backend Documentation Generator 선택
# CLI에서 project_name, prd_path 등을 입력하면 Prompt Template이 자동 완성됨
# 완성된 프롬프트를 LLM에 붙여넣어 TECH_STACK/API/DATABASE 등 docs/*.md를 생성

# 3. 프론트엔드 문서 생성 (옵션)
npm run prompt              # Frontend Documentation Generator 선택
# PRD/API 경로를 입력하고 프론트엔드 문서 템플릿(frontend/*)을 생성

# 4. 일관성 검증 및 버전 관리
npm run validate
git add docs README.md index.md
git commit -m "Initialize documentation via AI template"
```

### 예시 2: PRD에 "위시리스트" 기능 추가
```bash
# 1. PRD 수정
vim docs/PRD.md
# "사용자가 상품을 위시리스트에 추가할 수 있다" 추가

# 2. API 업데이트
# meta/UPDATE_PROMPT.md의 "프롬프트 2-A (API 명세 업데이트)" 사용
# → AI가 POST /wishlist, GET /wishlist 엔드포인트 자동 추가

# 3. DB 업데이트
# meta/UPDATE_PROMPT.md의 "프롬프트 2-B (DB 스키마 업데이트)" 사용
# → AI가 wishlist 테이블 자동 추가

# 4. 검증 및 커밋
npm run validate
git add docs/API.md docs/DATABASE.md docs/PRD.md
git commit -m "Add wishlist feature"
```

---

## 개발 도구

### 1. 인터랙티브 프롬프트 선택기
프롬프트 목록을 번호로 고르고, 필요한 입력값을 CLI에서 채운 뒤 한 번에 복사합니다.

```bash
# 최초 1회 의존성 설치
npm install

# 인터랙티브 CLI 실행 (alias)
npm run prompt
# 또는 파일 경로 그대로 실행하고 싶다면
npm run scripts/prompt-cli.js
```

**특징**:
- OS에 따라 `pbcopy/clip/xclip`을 직접 설치할 필요 없이, 내장된 `clipboardy`가 모든 환경에서 클립보드 복사를 처리합니다.
- YAML Frontmatter를 읽어 프롬프트 ID, 설명, 산출물, 입력값 등을 CLI에서 바로 확인할 수 있습니다.
- 선택한 프롬프트에 `{{placeholder}}`가 있으면 CLI가 값을 물어보고 자동으로 템플릿을 치환해 줍니다 (Enter로 건너뛰기 가능).
- 🔍 **실시간 자동완성**: `/`만 입력해 전체 목록을 보고, 프롬프트 이름·단축키·키워드 접두사를 입력하면 추천이 즉시 갱신됩니다. 대소문자 구분 없이 ↑/↓로 후보를 이동하고 Enter로 현재 선택, Tab으로 최상단 항목을 빠르게 실행하며 Esc로 종료할 수 있습니다.
- **숫자 입력 폴백**: 터미널이 TTY가 아니거나 Raw 모드를 지원하지 않으면 자동으로 번호 입력 모드(1~11)로 전환되어 기존 UX를 그대로 이용할 수 있습니다.
- **11개 프롬프트 지원**:
  - 백엔드 생성 (Java/Python/Node.js)
  - 프론트엔드 생성
  - 문서 업데이트 (전체/API/DB)
  - 일관성 검증
  - 코드 리뷰 (커밋/파일/PR)
- **입력값 안내**: 각 플레이스홀더의 의미와 optional 여부를 CLI에서 바로 안내합니다.
- **미리보기**: 복사 전 첫 몇 줄을 확인해 잘못된 선택을 방지합니다.

**사용 예시**:
```
$ npm run prompt
╔════════════════════════════════════════════════════════════════╗
║          AI 협업 템플릿 - 프롬프트 선택기                      ║
╚════════════════════════════════════════════════════════════════╝
입력: /
▌ 백엔드 문서 생성 (Java/Spring Boot) [backend]
   PRD를 기반으로 Java/Spring Boot 백엔드 문서 8개를 자동 생성합니다.
  백엔드 문서 생성 (Python/FastAPI) [fastapi]
   PRD를 기반으로 Python/FastAPI 백엔드 문서를 자동 생성합니다.
... (↑/↓로 이동, Enter/Tab으로 실행, Esc로 종료)
```

**명령어**:
- `↑/↓`: 추천 목록에서 이전/다음 항목으로 이동
- `Enter`: 현재 선택된 항목 실행
- `Tab`: 최상단 후보 즉시 실행 (입력 없이 빠른 실행)
- `Esc`: 검색 종료 및 선택기 닫기
- `Ctrl+C`: 즉시 종료
- `숫자 (1-11)`: TTY 미지원 폴백 모드에서 특정 프롬프트 선택 (`q`/`quit`/`exit`로 종료)

**입력값 채우기**:
- 프롬프트를 선택하면 필요한 입력 목록이 표시됩니다.
- `y`를 입력하면 각 입력값을 순서대로 물어보고, 응답한 내용으로 `{{project_name}}` 등 플레이스홀더를 자동 치환합니다.
- 아무것도 입력하지 않으면 기존 플레이스홀더가 그대로 남습니다.

### 2. 댕글링 참조 검증 스크립트
문서 간 참조가 실제로 존재하는지 자동으로 검증합니다.

```bash
# 설치
npm install

# 검증 실행 (alias)
npm run validate
# 또는 파일 경로 그대로 실행하고 싶다면
npm run scripts/validate-references.js

# 파일 변경 시 자동 검증 (watch 모드)
npm run validate:watch
```

**검증 항목**:
- ✅ 파일 참조 (`docs/API.md`, `docs/CONVENTIONS.md` 등)
- ✅ API 엔드포인트 참조 (`GET /users`, `POST /api/certifications` 등)
- ✅ 테이블 참조 (DATABASE.md에 정의된 테이블)
- `docs/` 뿐 아니라 `meta/`, `examples/`, 루트 문서(`README.md`, `AGENT.md`, `index.md`)의 참조도 함께 점검합니다. 프론트엔드 전용 문서(`frontend/*.md`)처럼 아직 없을 수 있는 파일은 allowlist로 관리되므로 실제 오류만 표시됩니다.

### 3. 자동 테스트 & CI
- `npm test`: Jest 기반 단위/통합 테스트 실행
  - `scripts/prompt-cli.js`의 frontmatter 파싱/입력 정규화 유틸을 검증합니다.
  - `scripts/validate-references.js`를 샘플 템플릿에 실행해 성공/실패 케이스를 확인합니다.
- `.github/workflows/test.yml`: GitHub Actions에서 `npm install → npm test → npm run validate` 순으로 자동 실행하여 회귀를 차단합니다.

### 3. 다양한 기술 스택 예시
`examples/` 폴더에는 Node.js/NestJS, Python/FastAPI 등 특정 스택을 위한 frontmatter 기반 프롬프트가 들어 있습니다. 기본(Spring Boot) 템플릿은 `meta/BACKEND_GENERATOR.md`에서 제공하며, 동일한 구조를 따릅니다.

### 4. 샘플 시나리오
`samples/basic/` 폴더에는 단일 사용자 Todo 앱을 예시로 한 `docs/PRD.md`, `docs/TECH_STACK.md`, `docs/API.md`, `docs/DATABASE.md` 샘플이 들어 있습니다. 템플릿을 채우면 어떤 결과물이 만들어지는지 참고용으로 활용할 수 있습니다.

### 별도 업로드 번들 분리
AI 문서 템플릿과 템플릿 검색 CLI를 각각 다른 저장소/배포 경로로 업로드하려면 다음 명령으로 번들을 생성하세요.

```bash
npm run release
```

명령을 실행하면 `release/ai-md-templates`(문서 템플릿)과 `release/prompt-cli`(README 포함 CLI/스크립트)가 만들어집니다. 자세한 설명은 `RELEASE.md`에서 확인할 수 있습니다.

---

## 학습 자료

### 처음 사용하는 경우
1. **`README.md`** (본 문서) - 전체 워크플로우 이해
2. **`index.md`** - 전체 파일 구조 파악
3. **`meta/TEMPLATE_STRUCTURE.md`** - 템플릿의 철학과 구조 이해

### 고급 사용
- **`meta/UPDATE_PROMPT.md`** - 점진적 업데이트 전략
- **`meta/FRONTEND_GENERATOR.md`** - 프론트엔드 자동화

---

## 주의사항

1. **PRD가 모든 것의 근원**: 다른 문서가 PRD와 충돌하면, 항상 PRD가 우선입니다.
2. **프롬프트 복사-붙여넣기**: `meta/` 폴더의 프롬프트를 정확히 복사하세요.
3. **일관성 검증 필수**: 문서 업데이트 후 반드시 일관성을 검증하세요.
4. **index.md 업데이트**: 파일 구조가 변경되면 `index.md`를 업데이트하세요.
