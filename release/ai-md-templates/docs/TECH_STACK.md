# 기술 스택 & 아키텍처 가이드 (Template)

> `docs/PRD.md`를 기반으로 **프로젝트별 기술 선택**을 정의하는 문서입니다. 각 섹션에 실제 스택과 근거를 채워 넣으세요.

## 1. Core Language & Framework
- **Backend Language / Framework**: `<예: Kotlin + Spring Boot 3>` – 선택 근거 (팀 경험, 생태계 등).
- **Frontend / Client Stack**: `<예: React 18 + Next.js>` – SSR/CSR 여부, 디자인 시스템 등.
- **Build Tool**: `<예: Gradle Kotlin DSL / pnpm>` – 모노레포 여부.
- **JDK/Runtime Version**: `<예: Temurin 21>`, 컨테이너 베이스 이미지 지정.

## 2. Architecture Pattern
- **스타일**: `<예: 헥사고날 / 클린 아키텍처 / 레이어드>`
- **레이어 구성**: `adapter`, `application`, `domain`, etc. 각 레이어의 책임 요약.
- **모듈화 전략**: 기능 단위, Bounded Context, 패키지 네이밍 규칙.

## 3. Persistence & State
- **Primary Database**: `<예: PostgreSQL 15>` + 이유 (트랜잭션, JSON 지원 등).
- **ORM / Data Access**: `<예: JPA, MyBatis, Prisma>`.
- **마이그레이션 도구**: `<Flyway, Liquibase, Alembic>`와 naming rule (`V1__*.sql`).
- **Cache/NoSQL**: 필요 시 Redis, DynamoDB 등 추가하고 사용하는 데이터 명세.

## 4. Infrastructure & Cloud
- **호스팅/컨테이너**: `<예: AWS ECS + Fargate / Kubernetes / Serverless>`.
- **스토리지**: 파일 업로드, CDN, Blob 저장소 등.
- **메시징/이벤트**: Queue, Pub/Sub, Streaming 시스템과 사용 목적.
- **IaC**: `<예: Terraform, CDK, Pulumi>` – 상태 관리 방식, 작업 경로.

## 5. Resilience & Observability
- **회복 패턴**: Circuit Breaker, Retry, Fallback 적용 대상 및 라이브러리 (`resilience4j`, `tenacity` 등).
- **모니터링**: Metrics (Prometheus, CloudWatch), 로그 수집(ELK, OpenSearch), 트레이싱(OpenTelemetry) 계획.
- **알림 채널**: PagerDuty/Slack 등 이벤트 처리 흐름.

## 6. Security & Compliance
- 인증/인가 방식 (JWT, OAuth2, API Key), 암호화 정책, 비밀 관리 방식(Secrets Manager, Vault).
- 데이터 보호 요구(PII 마스킹, 접근 제어)와 관련 표준(예: GDPR, HIPAA) 대응 전략.

## 7. Testing & Tooling
- 주요 테스트 프레임워크(JUnit, PyTest, Playwright 등), 커버리지 목표, 정적 분석 도구(ESLint, SonarQube).
- QA/테스트 환경 구성(Docker Compose, Testcontainers, Mock 서버 등).

## 8. Deployment Pipeline
- CI/CD 도구(GitHub Actions, GitLab CI, Jenkins)와 파이프라인 단계(빌드 → 테스트 → 배포 → 검증).
- 환경 구성(dev/stage/prod)과 브랜치 전략.

> **Tip:** 각 선택에는 최소 한 줄의 근거를 남겨 두세요. 추후 다른 프로젝트에 재사용할 때 큰 도움이 됩니다.
