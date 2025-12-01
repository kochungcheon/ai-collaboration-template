# Todo Mate – 기술 스택 & 아키텍처

## 1. Core Language & Framework
- **Backend**: Kotlin + Spring Boot 3.x (Kotlin DSL)
- **Frontend**: React 18 + Next.js (SSR 지원)
- **Mobile**: React Native (옵션)
- **Build Tool**: Gradle (Kotlin DSL), Vite for Web
- **JDK**: Temurin 21

## 2. Architecture Pattern
- 헥사고날 아키텍처 (Ports & Adapters)
- 계층: `adapter/web`, `adapter/infrastructure`, `application/service`, `domain/model`
- 모듈화: Todo, Notification, Template

## 3. Persistence & State
- PostgreSQL 15 (RDS)
- ORM: Spring Data JPA
- 마이그레이션: Flyway (`V1__init.sql`)
- Redis: 알림 스케줄 캐시

## 4. Infrastructure & Cloud
- 호스팅: AWS ECS Fargate
- Object Storage: S3 (알림 템플릿/리포트 저장)
- 메시징: Amazon SQS (알림 재시도 큐)
- IaC: Terraform

## 5. Resilience & Observability
- Circuit Breaker: Resilience4j (SMTP/FCM API)
- Retry: Exponential backoff (알림 발송)
- Observability: Prometheus + Grafana, CloudWatch Logs, OpenTelemetry tracing
- Alert: PagerDuty, Slack

## 6. Security & Compliance
- JWT 인증, HTTPS-only
- Secrets Manager로 API 키 관리
- PII 최소화, 데이터 암호화 (at-rest, in-transit)

## 7. Testing & Tooling
- Backend: JUnit 5, Mockito, Testcontainers (PostgreSQL, Redis)
- Frontend: Jest + Testing Library
- E2E: Playwright
- Static Analysis: ktlint, ESLint, SonarQube

## 8. Deployment Pipeline
- GitHub Actions: Build → Test → Validate → Deploy
- Environments: dev / staging / prod
- Blue/Green deployment for ECS
