# 개발 환경 가이드 템플릿 (Development Guide Template)

> 로컬/스테이징 환경을 어떻게 구성할지 기록하는 문서입니다. 실제 값으로 채워 넣으세요.

## 1. 필수 요구사항
- 언어/런타임 버전: `<예: Node.js 20, JDK 21>`
- 패키지 매니저/빌드 도구: `<npm, pnpm, Gradle>`
- 필수 도구: Docker, kubectl, AWS CLI 등
- 권장 IDE 및 필요한 플러그인

## 2. 로컬 환경 설정
1. 저장소 클론 & 의존성 설치 명령
2. 환경 변수/시크릿 설정 방법 (`.env`, `application-local.yml` 등)
3. 필요한 서브모듈/패키지 초기화 절차

## 3. 로컬 인프라 (선택)
- Docker Compose 또는 LocalStack 등으로 모킹해야 하는 서비스 목록과 실행 명령을 기입합니다.
- 각 서비스의 포트/접속 정보 표.

## 4. 애플리케이션 실행
- Backend/Frontend/Worker별 실행 명령 (`npm run dev`, `./gradlew bootRun` 등).
- Health Check 엔드포인트 또는 smoke test 명령.

## 5. 테스트 실행
- 단위/통합/E2E 테스트 실행 명령과 필수 환경 변수.
- CI에서 실행되는 스크립트와 동일하게 유지하세요.

## 6. 배포 전 점검
- 코드 포맷팅, 린트, 빌드 명령을 나열합니다.
- 아티팩트 생성 위치 및 버전 태깅 규칙.

## 7. 운영/클라우드 리소스 접근
- IAM 역할, VPN, Bastion 등 접근 방법.
- 금지/주의 사항 (예: 프로덕션 데이터 직접 접근 금지).

> **Onboarding Checklist**
> - [ ] 개발자가 로컬에서 15분 내에 환경을 띄울 수 있는가?
> - [ ] README/CLI와 중복되는 정보는 링크로 유지했는가?
> - [ ] 비밀 정보는 안전한 경로(Secrets Manager 등)에서 관리되는가?
