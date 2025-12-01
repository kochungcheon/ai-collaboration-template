# 테스트 전략 템플릿 (Testing Strategy Template)

> 프로젝트별 테스트 철학과 도구를 정의하는 문서입니다. 아래 섹션을 팀 상황에 맞게 채워 넣으세요.

## 1. 테스트 철학
- Testing Trophy / Pyramid 중 어떤 모델을 따를지 결정하고 이유를 적습니다.
- Happy Path + Unhappy Path를 모두 커버한다는 원칙을 명시합니다.

## 2. 테스트 레벨 & 도구
| 레벨 | 목적 | 도구/프레임워크 | 비고 |
| --- | --- | --- | --- |
| Acceptance/E2E | 실제 사용자 시나리오 검증 | `<예: Cucumber, Playwright>` | 환경 구성 방법 |
| Integration | 컴포넌트 & 인프라 통합 | `<예: Testcontainers, WireMock>` | DB/Queue 설정 |
| Unit | 도메인/함수 단위 검증 | `<예: JUnit, PyTest>` | Mock 정책 |
| Static Analysis | 린트, 타입, 아키텍처 규칙 | `<예: ESLint, ArchUnit>` | CI에 포함 |

## 3. 시나리오 작성 가이드
- Gherkin, 테스트 케이스 템플릿 등 팀이 쓰는 형식을 예시와 함께 적습니다.
- 공통 Steps/Fixtures/TestAdapters를 어디에 두는지 명시합니다.

## 4. TestAdapter / Helper 패턴 (선택)
- 테스트 코드가 반복 호출하는 API/동작을 추상화한 Helper를 정의하고 사용 규칙을 작성합니다.

## 5. 데이터 관리 전략
- 테스트 데이터 seeding, Fixture 관리, 익명화 정책 등.
- 외부 시스템(메일, 결제 등) 모킹 정책.

## 6. CI 파이프라인 연동
- 어떤 브랜치에서 어떤 테스트를 실행하는지 표로 정리합니다.
- 실패 시 자동 롤백/알림 규칙을 명시합니다.

## 7. 품질 게이트
- 커버리지 최소 기준, Lint 에러 허용 여부, 리뷰어 체크리스트 등.

> **Tip:** 실제 테스트 명령(`./gradlew test`, `npm run test:e2e` 등)과 환경 변수 설정 방법을 `docs/DEVELOPMENT.md`와 함께 유지하면 신입 팀원이 빠르게 온보딩할 수 있습니다.
