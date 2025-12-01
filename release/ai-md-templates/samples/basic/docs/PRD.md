# `Todo Mate` – Product Requirements Document

> 단일 사용자 기반의 가볍고 빠른 Todo 관리 앱을 목표로 합니다.

---

## 1. Product Overview

### 1.1 Product Vision
- 개인이 하루 일정을 빠르게 추가/완료/정리할 수 있는 모바일/웹 Todo 앱. 빠른 입력, 반복 작업 템플릿, 알림 기능이 핵심입니다.

### 1.2 Problem Statement
- 운영자/내부: 별도 없음 (단일 사용자 앱).
- 최종 사용자 Pain Points:
  - 여러 Todo를 모바일/웹 모두에서 관리하기 어려움
  - 반복되는 업무 템플릿을 매번 다시 작성해야 함
  - 알람/리마인더가 없어 일정이 누락됨

### 1.3 Goals & Success Metrics
- Todo 추가/완료 작업이 3 터치 이내
- 월간 유지율 60% 이상
- 사용자당 평균 알림 5건/주

---

## 2. Scope Definition

### 2.1 In Scope
- Todo CRUD
- 반복 Todo 템플릿 관리
- 태그/우선순위/마감일 설정
- 알림 스케줄링 (이메일, 모바일 푸시)
- 필터/검색/정렬

### 2.2 Out of Scope
- 팀/공유 기능
- 캘린더 연동
- 외부 서비스 통합 (슬랙 등)

---

## 3. User Stories & Personas

| Persona | 시나리오 | 기대 결과 |
| --- | --- | --- |
| `Solo User` | As a solo user, I want to add Todos from mobile or web quickly | 최소 입력으로 빠른 저장 |
| `Organized User` | As a user, I want to set reminders and repeat schedules | 알림 및 반복 설정 |

---

## 4. Functional Requirements

### 4.1 주요 플로우

**Flow Name**: `Todo 생성`
1. 사용자가 제목/설명을 입력한다.
2. 서버가 Todo를 생성하고 기본 상태를 PENDING으로 저장한다.
3. 사용자에게 성공 응답을 반환한다.
4. 예외: 필수 입력 누락 시 ValidationError.

**Flow Name**: `Todo 완료`
1. 사용자가 Todo 완료를 요청한다.
2. 서버가 상태를 DONE으로 변경하고 완료일시를 기록한다.
3. 필요 시 알림 스케줄 해제.

**Flow Name**: `알림 발송`
1. 스케줄러가 알림 시간이 된 Todo를 조회한다.
2. 이메일/푸시 알림 전송.
3. 로그 기록.

### 4.2 인터랙션 요구사항
- 이메일 발송 서비스 (SMTP)
- 푸시 알림 서비스 (FCM)

---

## 5. NFR

| 항목 | 목표/제약 | 비고 |
| --- | --- | --- |
| 성능 | `POST /todos` p95 < 150ms | 경량 API |
| 안정성 | RPO 1분, RTO 15분 | 백업 필수 |
| 보안 | JWT 인증, HTTPS만 허용 | 단일 사용자여도 인증 필요 |

---

## 6. Architecture & Resilience Notes
- 서버: 단일 REST API + 스케줄러 (CRON)
- 알림 실패 시 재시도 3회, DLQ 저장
- 멱등성: `todoId` 기반
- 모니터링: Todo 생성/완료 카운트, 알림 실패율

---

## 7. Data & Reporting Requirements
- Todo: 제목, 설명, 태그, 우선순위, 상태, 마감일, 반복 정보
- 알림 로그: TodoId, 발송 채널, 상태
- 일별 완료율 리포트

---

## 8. Open Questions / Risks
- 푸시 알림 채널 결정 (FCM vs SNS)
- 반복 템플릿의 최대 개수 제한

---

## 9. Appendix
- UI 와이어프레임 (별도 첨부)
