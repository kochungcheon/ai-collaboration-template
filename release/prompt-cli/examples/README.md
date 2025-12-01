# 다양한 기술 스택 예시

이 폴더는 다양한 기술 스택별 백엔드 문서 생성 프롬프트를 제공합니다.

## 📂 제공되는 예시

### 1. Python/Django
- **경로**: `examples/python-django/BACKEND_GENERATOR.md`
- **기술 스택**: Python 3.11+, Django 4.2+, PostgreSQL, Celery, Redis
- **적합한 프로젝트**: 웹 애플리케이션, RESTful API, 관리자 대시보드

### 2. Node.js/NestJS
- **경로**: `examples/nodejs-nestjs/BACKEND_GENERATOR.md`
- **기술 스택**: Node.js 20+, NestJS 10+, TypeScript, PostgreSQL/MongoDB, Bull, Redis
- **적합한 프로젝트**: 마이크로서비스, 실시간 애플리케이션, GraphQL API

### 3. Java/Spring Boot (기본)
- **경로**: `meta/BACKEND_GENERATOR.md`
- **기술 스택**: Java 17, Spring Boot 3.x, MySQL, AWS Lambda, Resilience4j
- **적합한 프로젝트**: 엔터프라이즈 애플리케이션, 대규모 시스템

---

## 🚀 사용 방법

### 1. 원하는 스택 선택
프로젝트에 맞는 기술 스택을 선택합니다.

### 2. 프롬프트 복사
해당 폴더의 BACKEND_GENERATOR.md 파일을 열어 프롬프트를 복사합니다.

### 3. PRD 작성
`docs/PRD.md`에 프로젝트 요구사항을 작성합니다.

### 4. AI에게 프롬프트 제공
복사한 프롬프트를 AI에게 붙여넣기합니다.

### 5. 문서 자동 생성
AI가 선택한 기술 스택에 맞는 문서를 자동 생성합니다.

---

## 💡 커스터마이징

### 새로운 스택 추가
1. `examples/` 폴더에 새 디렉토리 생성 (예: `go-gin/`)
2. BACKEND_GENERATOR.md 파일 생성
3. 기존 프롬프트를 참고하여 해당 스택에 맞게 수정

### 예시: Go/Gin
```markdown
# Go/Gin 백엔드 문서 생성 프롬프트

**필수 생성 문서:**
1. `docs/TECH_STACK.md`
   - Go 1.21+, Gin
   - GORM (ORM)
   - PostgreSQL
   - Redis

2. `docs/CONVENTIONS.md`
   - Go 코딩 스타일 (gofmt, golint)
   - 프로젝트 구조: cmd/, internal/, pkg/
   - 네이밍: camelCase (private), PascalCase (public)
```

---

## 🎯 기술 스택 선택 가이드

| 기술 스택 | 장점 | 단점 | 추천 사용 사례 |
|-----------|------|------|----------------|
| **Java/Spring** | 엔터프라이즈급, 안정성 | 무겁고 복잡 | 대규모 시스템, 금융 |
| **Python/Django** | 빠른 개발, 풍부한 라이브러리 | 성능 제한 | 웹 앱, 프로토타입 |
| **Node.js/NestJS** | 비동기 처리, TypeScript | 싱글 스레드 | 실시간 앱, API |
| **Go/Gin** | 고성능, 간결함 | 생태계 작음 | 마이크로서비스, CLI |

---

## 📚 추가 자료

- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Django 공식 문서](https://www.djangoproject.com/)
- [NestJS 공식 문서](https://nestjs.com/)
- [Gin 공식 문서](https://gin-gonic.com/)
