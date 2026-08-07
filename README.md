# SeCause

AI 기반 **코드 보안 취약점 분석** 및 **수정 가이드 제공** 서비스

> GitHub 저장소를 연동하면 AI가 코드를 분석해 보안 취약점을 찾아내고,
> <br/>심각도별로 정리된 **대시보드**와 **이슈별 수정 가이드**(Code Diff)를 제공합니다.

<br/>

## 주요 기능

- **GitHub OAuth 로그인**: GitHub 계정으로 간편하게 로그인
- **저장소 분석 요청**: 연동된 GitHub 계정/저장소/브랜치를 선택해 보안 취약점 분석 요청
- **분석 대시보드**: 취약점 유형별/심각도별 통계와 요약 카드 제공
- **이슈 상세 & 코드 Diff**: 이슈별 상세 설명과 Before/After 코드 비교(Diff) 뷰 제공
- **마이페이지**: 분석 요청한 저장소 목록 관리 및 계정 설정

<br/>

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

<br/>

## 아키텍처

[Feature-Sliced Design(FSD)](https://feature-sliced.design/) 방법론을 따르며, `eslint-plugin-boundaries`로 레이어 간 의존 방향을 강제합니다.

```text
app → widgets → features → shared
```

- 상위 레이어는 하위 레이어만 참조할 수 있고, 역방향 참조는 ESLint 규칙으로 차단됩니다.
- 도메인 모델이 확장되면 `features`와 `shared` 사이에 `entities` 레이어를 추가할 수 있도록 ESLint 규칙이 구성되어 있습니다.

<br/>

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
└── shared/                  # 공통 모듈
    ├── api/                 # API client, BFF server client, endpoints, 타입
    ├── config/              # 라우트 등 설정
    ├── lib/                 # 공통 훅/유틸 (cn, formatDate, debounce 등)
    └── ui/                  # 공통 UI 컴포넌트 (Button, Dropdown, Toast 등)
```

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 코드 검사
pnpm lint

# 단위/컴포넌트 테스트
pnpm test
pnpm test:watch

# E2E 테스트 (Playwright)
pnpm test:e2e
pnpm test:e2e:ui

# 프로덕션 빌드
pnpm build
pnpm start

# 번들 분석
pnpm analyze
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.
