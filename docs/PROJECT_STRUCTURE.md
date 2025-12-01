# 프로젝트 폴더 구조 (Project Structure)

이 문서는 실제 코드 구현 시 **파일을 어디에 생성해야 하는지** 정의합니다. AI는 코드를 작성하기 전에 이 문서를 참고하여 올바른 위치에 파일을 생성해야 합니다.
현재 예시는 Spring Boot 프로젝트 구조를 기반으로 작성되었습니다.

## 📂 기본 폴더 구조 (Base Structure)

```
project-root/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/project/
│   │   │       ├── adapter/          # 외부 세계와의 인터페이스
│   │   │       │   ├── web/          # REST Controllers
│   │   │       │   ├── persistence/  # JPA Repositories, Entities
│   │   │       │   └── infrastructure/ # S3, SQS, 외부 API 클라이언트
│   │   │       ├── application/      # 비즈니스 로직 오케스트레이션
│   │   │       │   └── service/      # Application Services
│   │   │       └── domain/           # 핵심 비즈니스 로직 (Pure Java)
│   │   │           ├── model/        # Domain Entities, Value Objects
│   │   │           └── service/      # Domain Services
│   │   └── resources/
│   │       ├── application.yml       # 설정 파일
│   │       └── db/migration/         # Flyway 마이그레이션 스크립트
│   └── test/
│       ├── java/
│       │   └── com/example/project/
│       │       ├── adapter/          # Adapter 계층 통합 테스트
│       │       ├── application/      # Service 단위 테스트
│       │       └── domain/           # Domain 로직 단위 테스트
│       └── resources/
│           └── features/             # Cucumber 시나리오 (.feature 파일)
├── lambda/
│   └── <worker-name>/               # 비동기 워커 (예: OCR, 통계, 웹훅 등)
├── batch/
│   └── <job-name>/                  # 주기적 배치 작업 (예: 재처리, 집계)
├── build.gradle                      # Gradle 빌드 설정
└── docker-compose.yml                # 로컬 인프라 (MySQL, LocalStack 등)
```

---

## 🎯 계층별 책임 (Layer Responsibilities)

### 1. **Adapter 계층** (`adapter/`)
외부 세계(HTTP, DB, 메시징)와의 인터페이스를 담당합니다.

#### `adapter/web/` - REST Controllers
- **책임**: HTTP 요청 수신, DTO 변환, Service 호출, HTTP 응답 반환.
- **파일명 규칙**: `*Controller.java` (예: `<Feature>Controller.java`)
- **금지사항**: 비즈니스 로직 포함 금지.

#### `adapter/persistence/` - JPA Repositories
- **책임**: 데이터베이스 CRUD 작업.
- **파일명 규칙**: `*Repository.java`, `*Entity.java`
- **주의**: Entity는 JPA 어노테이션을 포함하지만, Domain Model과 분리 권장.

#### `adapter/infrastructure/` - 외부 시스템 클라이언트
- **책임**: S3, SQS, 외부 API 호출.
- **파일명 규칙**: `*Client.java` (예: `S3Client.java`, `SqsPublisher.java`)

---

### 2. **Application 계층** (`application/`)
비즈니스 유스케이스를 오케스트레이션합니다.

#### `application/service/` - Application Services
- **책임**: 트랜잭션 관리, 여러 Domain Service 조합, DTO 변환.
- **파일명 규칙**: `*Service.java` (예: `<Feature>Service.java`)
- **예시**:
  ```java
  @Service
  @RequiredArgsConstructor
  @Transactional(readOnly = true)
  public class <Feature>Service {
      // Repository, Domain Service 주입
      // 비즈니스 로직 오케스트레이션
  }
  ```

---

### 3. **Domain 계층** (`domain/`)
핵심 비즈니스 로직을 담당합니다. **프레임워크 의존성 없음 (Pure Java)**.

#### `domain/model/` - Domain Entities & Value Objects
- **책임**: 비즈니스 규칙, 상태 전이 로직.
- **파일명 규칙**: `*.java` (예: `RunningRecord.java`, `Distance.java`)
- **예시**:
  ```java
  public class RunningRecord {
      private final RecordId id;
      private RecordStatus status;
      
      public void confirm() {
          if (this.status != RecordStatus.READY_FOR_REVIEW) {
              throw new IllegalStateException("Cannot confirm");
          }
          this.status = RecordStatus.CONFIRMED;
      }
  }
  ```

#### `domain/service/` - Domain Services
- **책임**: 여러 Entity를 조합한 복잡한 비즈니스 로직.
- **파일명 규칙**: `*DomainService.java`

---

## 🧪 테스트 파일 위치 (Test File Locations)

### 단위 테스트 (Unit Tests)
- **위치**: `src/test/java/` (프로덕션 코드와 동일한 패키지 구조)
- **파일명**: `*Test.java` (예: `RunningRecordTest.java`)

### 통합 테스트 (Integration Tests)
- **위치**: `src/test/java/` (프로덕션 코드와 동일한 패키지 구조)
- **파일명**: `*IntegrationTest.java` (예: `<Feature>ControllerIntegrationTest.java`)
- **어노테이션**: `@SpringBootTest`, `@Testcontainers`

### Cucumber 시나리오 (Acceptance Tests)
- **위치**: `src/test/resources/features/`
- **파일명**: `*.feature` (예: `certification-upload.feature`)
- **Step Definitions**: `src/test/java/.../steps/` (예: `<Feature>Steps.java`)

---

## ☁️ 비동기 워커 & 배치 모듈

### Serverless/Worker (`lambda/<worker-name>/`)
- **언어**: `<예: Python 3.11 / Node.js 20>`
- **책임**: 특정 이벤트 처리(예: 업로드 후처리, 알림 발송, 백그라운드 계산 등).
- **구성**: `handler.*`, 도메인 로직 폴더, 외부 시스템 클라이언트.
- **테스트**: `tests/` 디렉터리 또는 동일 계층에 단위 테스트/통합 테스트 작성.

### Batch Job (`batch/<job-name>/`)
- **언어**: `<Spring Batch, Airflow DAG, Python 스크립트 등>`
- **책임**: 재처리, 집계, 동기화 등 주기적 작업.
- **구성**: 잡 정의 파일, 스케줄 설정, 공통 유틸리티.
- **배포**: Cron, Scheduler, CloudWatch Event 등 실행 주기/운영 방법을 명시합니다.

> 워커/배치 모듈도 동일 저장소에 두고 IaC에서 함께 배포하면 회복탄력성 요구사항을 추적하기 쉽습니다.

---

## 📝 파일 생성 예시

**사용자 요청**: "<기능 이름> API를 구현해줘"

**AI의 파일 생성 순서 예시**:
1. `src/main/java/.../adapter/web/<Feature>Controller.java`
2. `src/main/java/.../application/service/<Feature>Service.java`
3. `src/main/java/.../domain/model/<Aggregate>.java`
4. `src/main/java/.../adapter/persistence/<Aggregate>Repository.java`
5. `src/test/resources/features/<feature>.feature`
6. `src/test/java/.../steps/<Feature>Steps.java`
7. `src/test/java/.../<Feature>ServiceTest.java`

---

## ⚠️ 주의사항

1. **패키지명은 PRD의 프로젝트명에 맞게 변경하세요** (예: `com.mycrewpartner.certification`)
2. **계층 간 의존성 방향을 준수하세요**: `Adapter → Application → Domain` (역방향 금지)
3. **테스트 파일은 프로덕션 코드와 동일한 패키지 구조를 유지하세요**
