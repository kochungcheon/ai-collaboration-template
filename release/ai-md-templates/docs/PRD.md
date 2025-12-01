# `<PROJECT_NAME>` – Product Requirements Document (Template)

> 이 파일은 **사용자가 직접 작성**해야 합니다. 아래 각 섹션의 지침에 맞춰 프로젝트 정보를 채우면 나머지 문서를 자동 생성할 수 있습니다. `<>` 로 둘러싼 플레이스홀더는 실제 값으로 교체하세요.

---

## 1. Product Overview

### 1.1 Product Vision
- 한 문단으로 제품이 해결하려는 핵심 가치를 설명합니다.
- 예: "<PRIMARY_USER>가 <핵심 문제>를 <주요 장점>으로 해결하도록 돕는다."

### 1.2 Problem Statement
- **운영자/내부 사용자 Pain Points**: 2~3개의 구체적인 문제를 bullet로 작성합니다.
- **최종 사용자 Pain Points**: 제품을 쓰는 고객 관점에서 Pain Point를 작성합니다.
- 각 Pain Point 옆에 가능하면 해당 지표 또는 현재 수치를 적어 주세요.

### 1.3 Goals & Success Metrics
- 제품 출시 후 달성해야 하는 정량 지표를 최소 3개 정의합니다.
- 예: "처리 시간 p95 < 500ms", "수동 작업 70% 감소" 등.

---

## 2. Scope Definition

### 2.1 In Scope
- 이번 버전에서 제공할 기능을 bullet로 나열합니다. 각 항목에 간단한 이유/제한을 덧붙입니다.

### 2.2 Out of Scope
- 이번 버전에서 다루지 않을 기능을 명확히 기록합니다.
- 추후 단계에서 고려할 기능이라면 간단한 TODO를 남깁니다.

---

## 3. User Stories & Personas

| Persona | 시나리오 | 기대 결과 |
| --- | --- | --- |
| `<Primary Persona>` | "As a ... I want ..." 형식의 문장 | 측정 가능한 결과 |
| `<Secondary Persona>` | ... | ... |

- 각 스토리에 우선순위(High/Medium/Low)를 부여하면 API/DATABASE 설계 시 도움이 됩니다.

---

## 4. Functional Requirements

### 4.1 주요 플로우
각 기능 흐름을 아래 템플릿으로 작성하세요. 필요한 만큼 반복합니다.

**Flow Name**: `<예: 주문 생성>`
1. 이벤트/트리거
2. 시스템 동작 (업로드, 큐 전송 등 세부 단계)
3. 사용자 피드백(응답 코드, 알림 등)
4. 예외 처리 (재시도, 타임아웃, 보정 로직 등)

### 4.2 인터랙션 요구사항
- 외부 시스템 연동, 권한 정책, 데이터 동기화 등 특이사항을 bullet로 정리합니다.

---

## 5. Non-Functional Requirements (NFR)

| 항목 | 목표/제약 | 비고 |
| --- | --- | --- |
| 성능 | 예: `POST /<resource>` p95 < 200ms | APM 필요 여부 |
| 안정성 | 예: SLO 99.9%, MTTR < 15분 | Circuit Breaker, Retry 정책 |
| 보안 | 인증/인가 방식, 데이터 보호 요구사항 | 규제/컴플라이언스
| 확장성 | 멀티 리전, 멀티 테넌시 등 | 추후 로드맵

---

## 6. Architecture & Resilience Notes
- 주요 컴포넌트(예: Web/API, Worker, Batch, 데이터 파이프라인)를 나열하고 데이터 흐름을 설명하세요.
- 외부 의존성(Queue, Storage, 3rd Party API)의 장애 시나리오와 Fallback 전략을 서술합니다.
- 멱등성, 재처리, 모니터링 포인트 등을 지정합니다.

---

## 7. Data & Reporting Requirements
- 핵심 도메인 모델을 bullet 또는 표로 요약합니다 (예: `<Resource>`가 어떤 필드를 가져야 하는지).
- 누적 통계, 랭킹, 알림 등 파생 데이터 요구사항이 있다면 계산 기준을 적습니다.

---

## 8. Open Questions / Risks
- 아직 결정되지 않은 사항이나 외부 의존성에 따른 리스크를 기록합니다.
- 각 항목에 담당자 또는 해결 기한을 함께 적으면 좋습니다.

---

## 9. Appendix (Optional)
- 프로토타입 링크, 다이어그램, 참고 문헌 등을 추가합니다.

> **작성 팁**: 문서를 일반론이 아닌 **프로젝트 의사결정 기록**으로 생각하세요. 명확한 수치/근거를 남겨야 이후 자동 생성되는 문서들도 신뢰성을 갖습니다.
