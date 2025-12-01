# API 명세 템플릿 (API Specification Template)

> 이 문서는 PRD 기반으로 API 계약을 정의하기 위한 **빈 템플릿**입니다. 모든 `<>` 플레이스홀더를 실제 값으로 교체하세요.

## 1. 기본 정보
- **Base URL**: `<e.g. /api/v1>`
- **Content-Type**: `<application/json | multipart/form-data>`
- **Authentication**: `<JWT / OAuth2 / API Key>`
- **공통 헤더**: `<X-Request-Id, Tenant-Id ...>`
- **시간/통화 형식**: `<ISO 8601, UTC>`

## 2. 응답 규약
```json
{
  "success": true,
  "data": { ... },
  "error": {
    "code": null,
    "message": null,
    "details": null
  }
}
```
- 프로젝트에 맞게 필드를 추가/삭제하고 설명을 기록하세요.

---

## 3. 엔드포인트 카탈로그
각 기능을 섹션으로 나눈 뒤 아래 표 형식을 사용하세요.

### `<리소스 그룹 예: Certifications>`

| 항목 | 설명 |
| --- | --- |
| **Method & Path** | `POST /<resource>` |
| **설명** | 기능 요약 |
| **권한** | 필요한 역할/스코프 |
| **요청 Body** | JSON Schema 또는 필드 설명 |
| **응답 예시** | 성공/실패 예시 JSON |
| **비고** | 멱등성 키, 재시도 정책 등 |

필요 시 상태 다이어그램, sequence diagram 링크 등을 추가하세요.

---

## 4. 오류 코드
| Code | HTTP Status | 설명 | 비고 |
| --- | --- | --- | --- |
| `INVALID_INPUT` | 400 | 검증 실패 | 필드명 포함 |
| ... | ... | ... | ... |

---

## 5. 이벤트/웹훅 (선택)
- 비동기 이벤트, Pub/Sub 메시지, 웹훅 계약이 있다면 스키마와 재시도 정책을 정의하세요.

---

## 6. API 버전 관리 & 변경 정책
- 버전 전략(v1, v1.1, 날짜 기반 등)과 Deprecation 계획을 적습니다.
- Breaking change 절차와 커뮤니케이션 채널을 명시하세요.

> **검증 체크리스트**
> - [ ] 모든 PRD 기능에 대응하는 엔드포인트가 정의되었는가?
> - [ ] 권한/에러/멱등성 요구사항이 누락되지 않았는가?
> - [ ] 문서에 나온 경로/메서드가 실제 구현과 일치하는가?
