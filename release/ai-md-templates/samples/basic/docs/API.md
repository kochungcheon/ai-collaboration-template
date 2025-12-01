# Todo Mate – API 명세

## 1. 기본 정보
- Base URL: `/api/v1`
- Content-Type: `application/json`
- Authentication: JWT (Authorization Bearer)

## 2. Todo 엔드포인트

### 2.1 Todo 생성
| 항목 | 설명 |
| --- | --- |
| Method & Path | `POST /todos` |
| 설명 | 새로운 Todo 생성 |
| 권한 | 인증 사용자 |
| 요청 Body | `{ "title": "string", "dueDate": "2025-01-01", "priority": "HIGH" }` |
| 응답 예시 | `{ "id": 1, "status": "PENDING" }` |
| 비고 | 멱등성 없음 |

### 2.2 Todo 목록 조회
| 항목 | 설명 |
| --- | --- |
| Method & Path | `GET /todos` |
| 설명 | Todo 목록 필터링 (상태, 태그, 기간) |
| 요청 파라미터 | `status`, `tag`, `from`, `to` |
| 응답 예시 | `[ { "id": 1, "title": "..." } ]` |
| 비고 | Paging (`page`, `size`)

### 2.3 Todo 완료
| 항목 | 설명 |
| --- | --- |
| Method & Path | `PATCH /todos/{id}/complete` |
| 설명 | Todo 상태를 DONE으로 변경 |
| 응답 예시 | `{ "id": 1, "status": "DONE", "completedAt": "2025-01-01T10:00:00" }` |
| 비고 | 완료 시 알림 해제

## 3. 템플릿 엔드포인트
- `POST /templates` (반복 Todo 템플릿 생성)
- `GET /templates`

## 4. 알림 스케줄링
- `POST /todos/{id}/reminders`
- Request: `{ "channel": "EMAIL", "time": "2025-01-01T09:00:00" }`

## 5. 오류 코드
| Code | HTTP | 설명 |
| --- | --- | --- |
| `INVALID_INPUT` | 400 | 필수 필드 누락 |
| `UNAUTHORIZED` | 401 | 토큰 없음 |
| `TODO_NOT_FOUND` | 404 | ID 존재하지 않음 |
