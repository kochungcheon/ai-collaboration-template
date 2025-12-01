# 템플릿 구조 설명 (Template Structure)

이 문서는 AI 협업 템플릿의 각 파일이 **왜 존재하는지**, **어떤 역할**을 하는지 설명합니다.

## 📂 폴더 구조 및 역할

```
/
├── meta/                     # [메타] 템플릿 재사용을 위한 가이드 (이 폴더)
│   ├── BACKEND_GENERATOR.md   # 백엔드 문서 자동 생성 프롬프트
│   └── TEMPLATE_STRUCTURE.md  # 템플릿 구조 및 철학 설명 (본 문서)
│
├── AGENT.md                  # [Root] AI의 페르소나 및 행동 강령
├── index.md                  # [Map] 프로젝트 네비게이션 (AI가 먼저 읽어야 함)
├── AI_PROMPT_STRATEGY.md     # [Meta] AI 프롬프트 전략 문서
│
└── docs/                     # [Core] 프로젝트 상세 문서
    ├── PRD.md                # [Input] 프로젝트 요구사항 (사용자가 교체)
    ├── TECH_STACK.md         # [Derived] PRD 기반 기술 스택
    ├── CONVENTIONS.md        # [Derived] 기술 스택 기반 코딩 규칙
    ├── TESTING.md            # [Derived] 프로젝트 특성 기반 테스트 전략
    ├── API.md                # [Derived] PRD 기능 기반 API 설계
    ├── DATABASE.md           # [Derived] PRD 도메인 기반 DB 스키마
    └── DEVELOPMENT.md        # [Derived] 기술 스택 기반 환경 설정
```

---

## 🔑 핵심 개념: Input vs Derived

### **Input 문서 (사용자가 작성)**
- **`docs/PRD.md`**: 유일한 "입력" 문서. 템플릿의 `<...>` 구간을 프로젝트 정보로 채워 넣으면 됩니다.

### **Derived 문서 (AI가 생성)**
나머지 모든 문서는 PRD로부터 **파생(Derived)**됩니다:
- `TECH_STACK.md` ← PRD의 기술 요구사항
- `API.md` ← PRD의 기능 명세
- `DATABASE.md` ← PRD의 도메인 모델
- `CONVENTIONS.md` ← 선택된 기술 스택
- `TESTING.md` ← 프로젝트 특성 (웹/모바일/임베디드 등)
- `DEVELOPMENT.md` ← 기술 스택 + 인프라

---

## 🎯 각 문서의 목적

### Root 레벨
| 파일 | 목적 | 변경 빈도 |
|------|------|----------|
| `AGENT.md` | AI의 "정체성" 정의. 프로젝트 맥락만 교체 | 프로젝트당 1회 |
| `index.md` | 파일 구조 맵. 파일 추가/삭제 시 업데이트 | 구조 변경 시 |
| `AI_PROMPT_STRATEGY.md` | 템플릿 사용 철학 설명 | 거의 변경 없음 |

### Docs 레벨
| 파일 | 목적 | 변경 빈도 |
|------|------|----------|
| `PRD.md` | 프로젝트의 "무엇"과 "왜" | 프로젝트당 1회 (교체) |
| `TECH_STACK.md` | 프로젝트의 "어떻게" (기술) | PRD 변경 시 |
| `API.md` | 인터페이스 계약 | PRD 기능 변경 시 |
| `DATABASE.md` | 데이터 모델 | PRD 도메인 변경 시 |
| `CONVENTIONS.md` | 코드 품질 규칙 | 기술 스택 변경 시 |
| `TESTING.md` | 품질 보증 전략 | 프로젝트 특성 변경 시 |
| `DEVELOPMENT.md` | 환경 설정 가이드 | 기술 스택 변경 시 |

---

## 🔄 재사용 시나리오

### 시나리오 1: 완전히 새로운 프로젝트
1. `docs/PRD.md` 교체
2. `meta/BACKEND_GENERATOR.md`의 프롬프트를 AI에게 제공
3. 모든 Derived 문서 재생성
4. `AGENT.md`의 프로젝트 맥락 업데이트

### 시나리오 2: 기술 스택만 변경
1. `docs/TECH_STACK.md` 수정
2. `CONVENTIONS.md`, `DEVELOPMENT.md` 재생성
3. `index.md` 확인 (구조 변경 없으면 그대로)

### 시나리오 3: 기능 추가
1. `docs/PRD.md`에 새 기능 추가
2. `API.md`, `DATABASE.md` 업데이트
3. `index.md` 확인

---

## 💡 템플릿 철학

이 템플릿의 핵심 아이디어는 **"PRD가 모든 것의 근원(Single Source of Truth)"**이라는 것입니다.

**전통적인 방식:**
```
PRD → (사람이 해석) → 설계 문서 → (사람이 해석) → 코드
```

**이 템플릿 방식:**
```
PRD → (AI가 해석) → 모든 문서 자동 생성 → (AI가 구현) → 코드
```

사용자는 **"무엇을 만들 것인가"(PRD)**만 정의하면, 나머지는 AI가 일관성 있게 생성합니다.
