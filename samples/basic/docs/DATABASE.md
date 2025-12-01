# Todo Mate – 데이터베이스 스키마

## 1. ERD 개요
- users (선택) vs todos vs templates vs reminders

## 2. 테이블 정의

### 2.1 todos
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | BIGSERIAL | PK | Todo ID |
| `title` | VARCHAR(150) | NOT NULL | 제목 |
| `description` | TEXT | NULL | 상세 설명 |
| `status` | VARCHAR(20) | NOT NULL | PENDING/DONE |
| `priority` | VARCHAR(10) | NOT NULL | LOW/MEDIUM/HIGH |
| `due_date` | TIMESTAMP | NULL | 마감일 |
| `repeat_rule` | VARCHAR(50) | NULL | cron 표현식 |
| `created_at` | TIMESTAMP | NOT NULL | 생성일 |
| `updated_at` | TIMESTAMP | NOT NULL | 수정일 |

Indexes: idx_todos_status, idx_todos_due_date

### 2.2 templates
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | BIGSERIAL | PK |
| `name` | VARCHAR(100) | NOT NULL |
| `payload` | JSONB | NOT NULL | 기본 Todo 값 |

### 2.3 reminders
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | BIGSERIAL | PK |
| `todo_id` | BIGINT | FK → todos.id |
| `channel` | VARCHAR(10) | NOT NULL | EMAIL/PUSH |
| `scheduled_at` | TIMESTAMP | NOT NULL |
| `status` | VARCHAR(20) | NOT NULL | PENDING/SENT/FAILED |

Indexes: idx_reminders_todo, idx_reminders_scheduled

## 3. 마이그레이션 전략
- Flyway
- `V1__create_tables.sql`

## 4. 데이터 품질
- `status` enum 체크
- RPO: DB 백업 1분, PITR 활성화
