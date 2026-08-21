# SeCause

<div align="center">

### AI 기반 코드 보안 취약점 분석 및 수정 가이드 제공 서비스

<br />

<img
width="600"
height="auto"
alt="SeCause 서비스 화면"
src="https://github.com/user-attachments/assets/5c663f26-90cf-470e-899c-52d6ca8a8250"
/>

<br />
<br />

GitHub 저장소를 연동하면 코드를 분석해 보안 취약점을 탐지하고,
**심각도별 분석 대시보드**와 **이슈별 수정 가이드**를 제공합니다.

</div>

<br />

## 서비스 소개

SeCause는 GitHub 저장소의 코드를 분석해 보안 취약점을 탐지하고,
개발자가 문제의 원인과 수정 방향을 확인할 수 있도록 돕는 **AI 기반 코드 보안 분석 서비스**입니다.

연동된 GitHub 저장소와 브랜치를 선택해 분석을 요청하면 코드 내 취약점을 탐지하고,
분석 결과를 심각도와 유형별로 정리하여 대시보드 형태로 제공합니다.

각 취약점에 대해서는 상세 설명과 함께 **Before / After Code Diff**를 제공하여
문제가 발생한 코드와 수정 방향을 직관적으로 비교할 수 있습니다.

<br />

## 주요 기능

- **GitHub OAuth 로그인**
  GitHub 계정으로 간편하게 로그인하고 저장소를 연동할 수 있습니다.

- **저장소 분석 요청**
  연동된 GitHub 계정에서 저장소와 브랜치를 선택해 보안 취약점 분석을 요청할 수 있습니다.

- **분석 대시보드**
  분석된 취약점을 유형별·심각도별로 분류하고, 주요 현황을 카드와 차트로 확인할 수 있습니다.

- **이슈 상세 & Code Diff**
  취약점별 상세 설명과 함께 Before / After 코드 비교를 제공하여 문제의 원인과 수정 방향을 확인할 수 있습니다.

- **마이페이지**
  분석을 요청한 저장소 목록과 분석 결과를 확인하고 계정 설정을 관리할 수 있습니다.

<br />

## 기술 스택

| 구분              | 스택                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| **Framework**     | Next.js 16.2 (App Router), React 19.2, TypeScript 5                            |
| **Styling**       | Tailwind CSS 4                                                                 |
| **상태/데이터**   | TanStack Query 5, ky 2                                                         |
| **UI/시각화**     | Recharts 3, lucide-react, diff                                                 |
| **코드 품질**     | ESLint 9 (boundaries, simple-import-sort), Prettier 3, Husky 9, lint-staged 16 |
| **테스트**        | Vitest 4, React Testing Library, Playwright (E2E)                              |
| **배포/모니터링** | Vercel, Vercel Analytics, Speed Insights                                       |
| **패키지 매니저** | pnpm                                                                           |

<br />

## 아키텍처

[Feature-Sliced Design(FSD)](https://feature-sliced.design/) 방법론을 기반으로 프로젝트 구조를 구성하고,
`eslint-plugin-boundaries`를 사용해 레이어 간 의존 방향을 강제합니다.

```text
app → widgets → features → shared
```

- 상위 레이어는 하위 레이어만 참조할 수 있으며, 역방향 참조는 ESLint 규칙으로 차단합니다.
- 페이지 단위 구성은 `app`, 여러 기능을 조합한 UI는 `widgets`, 도메인별 기능은 `features`, 공통 모듈은 `shared`에서 관리합니다.
- 도메인 모델이 확장될 경우 `features`와 `shared` 사이에 `entities` 레이어를 추가할 수 있도록 ESLint 규칙을 구성했습니다.

<br />

## 파일 구조

```text
src/
├── app/                    # Next.js App Router (페이지, 라우팅, API Route)
│   ├── analysis/           # 분석 요청 페이지
│   ├── api/[...path]/      # BFF 프록시 API Route
│   ├── login/              # 로그인 / OAuth 콜백
│   ├── mypage/             # 마이페이지, 저장소 대시보드 및 저장소 상세
│   ├── layout.tsx          # 전역 레이아웃, Analytics, Speed Insights
│   └── page.tsx            # 랜딩 페이지
│
├── widgets/                # 여러 feature를 조합한 화면 단위 UI
│   ├── header/
│   ├── landing/            # 랜딩 페이지 (Hero, How it works, FAQ)
│   ├── login/
│   └── mypage-sidebar/
│
├── features/               # 도메인 단위 기능
│   ├── account/            # 계정 설정
│   ├── analysis/           # 분석 요청 플로우 (저장소/브랜치 선택)
│   ├── auth/               # GitHub OAuth 및 인증 UI/API
│   └── repositories/       # 저장소 대시보드, 이슈 목록/상세, 코드 Diff
│
└── shared/                 # 공통 모듈
    ├── api/                 # API client, BFF server client, endpoints, 타입
    ├── config/              # 라우트 등 설정
    ├── lib/                 # 공통 훅/유틸 (cn, formatDate, debounce 등)
    └── ui/                  # 공통 UI 컴포넌트 (Button, Dropdown, Toast 등)
```

<br />

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버 실행 후 http://localhost:3000에서 확인할 수 있습니다.

### 코드 검사

```bash
pnpm lint
```

### 단위 / 컴포넌트 테스트

```bash
pnpm test
pnpm test:watch
```

### E2E 테스트

```bash
pnpm test:e2e
pnpm test:e2e:ui
```

### 프로덕션 빌드

```bash
pnpm build
pnpm start
```

### 번들 분석

```bash
pnpm analyze
```

### API 타입 재생성 (백엔드 스펙 변경 시)

```bash
pnpm generate:api-types
```
