# 코딩 컨벤션 템플릿 (Coding Conventions Template)

> 팀이 사용할 언어/프레임워크에 맞춰 아래 항목을 채워 넣으세요. 기본 원칙은 유지하되, 세부 규칙은 자유롭게 커스터마이징합니다.

## 1. 공통 원칙
- 가독성과 명확성을 우선합니다. 불필요한 마법/추상화는 피합니다.
- SOLID, DRY, KISS 등 기본 원칙을 위반할 경우 근거를 문서화합니다.
- 린트/포매터(예: ESLint, ktlint, clang-format)를 적용하고 CI에서 검증합니다.

## 2. 언어/프레임워크별 가이드라인

### 2.1 Backend (`<예: Kotlin + Spring Boot>`)
- 의존성 주입: `<예: 생성자 주입 + @RequiredArgsConstructor>`
- DTO/Entity 규칙: `<예: record/DTO, 엔티티에 Setter 금지>`
- 에러 처리: `<예: 전역 ExceptionHandler, 표준 에러 코드>`
- 응답 포맷/ApiResponse 규칙.

### 2.2 Frontend / Client (`<예: React + TypeScript>`)
- 상태 관리 선택 (Redux, Zustand, Zustand+React Query 등)과 사용 방법.
- 컴포넌트 네이밍, 폴더 구조, 스토리북/테스트 작성 규칙.
- CSS/디자인 시스템 가이드.

### 2.3 Infrastructure / Scripts
- IaC 코드 스타일(Terraform fmt, naming rule).
- CLI/스크립트 작성 시 타입/테스트/로그 정책.

## 3. 코드 리뷰 & 브랜치 전략
- Commit 메시지 규칙(Conventional Commits 등).
- PR 템플릿, 리뷰어 수, 머지 조건.
- 금지되는 안티 패턴(대용량 PR, 테스트 없는 변경, 직접 메인 push 등).

## 4. 스타일 가이드 예시
| 항목 | 규칙 | 예시 |
| --- | --- | --- |
| 네이밍 | `<camelCase / snake_case>` | `calculateTotalPace()` |
| 로그 레벨 | `<INFO>는 주요 흐름, `<DEBUG>`는 상세> | `log.info("orderId={}", orderId);` |
| 매직 넘버 | 상수/Enum으로 추출 | `private static final int MAX_RETRY = 5;` |

## 5. 테스트 관련 규칙
- Given-When-Then 주석 또는 Test Method 네이밍 규칙.
- 통합 테스트에서 Testcontainers/LocalStack 사용 여부.
- 플래키 테스트를 방지하기 위한 시간/랜덤 처리 정책.

## 6. AI 사용 시 주의사항
- 자동 생성 코드 리뷰 체크리스트(N+1, 보안, 비동기 에러 등).
- 프롬프트에 제공해야 할 맥락/금지사항.

> **유지 전략**: 컨벤션 변경 시 반드시 PRD/TECH_STACK 등 관련 문서와 `index.md`를 함께 업데이트하고, CLI 사용자에게 변경사항을 공지하세요.
