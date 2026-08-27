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

| 구분              | 스택                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | ![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)                                           |
| **Styling**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)                                                                                                                                                                                                                                                          |
| **상태/데이터**   | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery&logoColor=white) ![ky](https://img.shields.io/badge/ky-2-333333?style=flat-square&logo=npm&logoColor=white)                                                                                                                                                            |
| **UI/시각화**     | ![Recharts](https://img.shields.io/badge/Recharts-3-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white) ![lucide-react](https://img.shields.io/badge/lucide--react-1-F56565?style=flat-square&logo=lucide&logoColor=white) ![diff](https://img.shields.io/badge/diff-9-CB3837?style=flat-square&logo=npm&logoColor=white)                                                 |
| **UI 개발/검증**  | ![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?style=flat-square&logo=storybook&logoColor=white) ![Chromatic](https://img.shields.io/badge/Chromatic-Visual_Testing-FC521F?style=flat-square&logo=chromatic&logoColor=white)                                                                                                                                     |
| **코드 품질**     | ![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?style=flat-square&logo=prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-9-333333?style=flat-square) ![lint-staged](https://img.shields.io/badge/lint--staged-16-2F74C0?style=flat-square) |
| **테스트**        | ![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat-square&logo=vitest&logoColor=white) ![Testing Library](https://img.shields.io/badge/Testing_Library-React-E33332?style=flat-square&logo=testinglibrary&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright&logoColor=white)                   |
| **배포/모니터링** | ![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=flat-square&logo=vercel&logoColor=white) ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-Monitoring-000000?style=flat-square&logo=vercel&logoColor=white) ![Speed Insights](https://img.shields.io/badge/Speed_Insights-Web_Vitals-000000?style=flat-square&logo=vercel&logoColor=white)    |
| **패키지 매니저** | ![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white)                                                                                                                                                                                                                                                                                |

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

### Storybook

```bash
pnpm storybook
pnpm build-storybook
```

Storybook은 http://localhost:6006에서 확인할 수 있습니다. <br/>
Story 작성 기준과 CDD 작업 흐름은 [`docs/storybook.md`](docs/storybook.md)를 참고해주세요.

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
