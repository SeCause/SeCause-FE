# SeCause Frontend Styleguide

## Language

코드 리뷰, 요약, 도움말은 모두 한국어로 작성합니다.

---

## Key Principles

- **가독성:** 팀원 누구나 이해할 수 있는 코드를 작성합니다.
- **일관성:** 레이어 구조, 네이밍, 스타일 규칙을 프로젝트 전반에 걸쳐 통일합니다.
- **명시성:** 경로, 색상, z-index 등 반복되는 값은 반드시 토큰/상수로 추출합니다.

---

## Architecture

Feature-Sliced Design (FSD) 구조를 따릅니다.

```
src/
├── app/          # Next.js App Router (라우팅, 레이아웃, 전역 스타일)
├── widgets/      # 여러 feature를 조합하는 독립적인 UI 블록
├── features/     # 사용자 액션 단위 기능
├── entities/     # 비즈니스 엔티티 (도메인 모델)
└── shared/       # 공통 유틸, config, UI 원자 컴포넌트
```

### 레이어 의존성 규칙

- 상위 레이어는 하위 레이어를 import할 수 있지만, 역방향은 금지
- `app` → `widgets` → `features` → `entities` → `shared`
- 같은 레이어 간 cross-import 금지
- 위반 시 `eslint-plugin-boundaries`가 에러를 발생시킵니다

---

## Routing

경로는 `src/shared/config/routes.ts`에서 일괄 관리합니다. 컴포넌트에 경로 문자열을 직접 작성하지 않습니다.

```ts
// ✅
import { ROUTES } from '@/shared/config/routes';
<Link href={ROUTES.someRoute} />

// ❌
<Link href="/some-route" />
```

---

## Styling

### Tailwind CSS v4

`@theme` 블록(`globals.css`)에 정의된 디자인 토큰만 사용합니다. 임의값(`[#hex]`, `[50px]`)은 토큰이 없을 때만 예외적으로 허용합니다.

클래스 순서는 `prettier-plugin-tailwindcss`가 자동 정렬합니다. 수동으로 순서를 맞추지 않아도 됩니다.

### 색상 토큰

`globals.css`의 `@theme` 블록을 참조하세요. 토큰명은 `--color-{name}` 형식이며, Tailwind 클래스는 `text-{name}` / `bg-{name}` / `border-{name}`으로 사용합니다.

### Z-index 토큰

z-index는 `globals.css @theme`에서 `--z-index-{name}` 형식으로 정의합니다. 임의값 사용 금지.

---

## Component Rules

### 파일 위치

- 서버 컴포넌트가 기본값, 클라이언트 상태/이벤트가 필요할 때만 `'use client'` 추가
- 각 슬라이스는 `index.ts`를 통해 public API를 노출

```
features/{slice}/
├── ui/
│   └── *.tsx
├── model/
│   └── *.ts
└── index.ts   ← 외부에서 import할 것만 export
```

### 네이밍

- 컴포넌트: PascalCase
- 훅: `use` 접두사 camelCase
- 상수/설정: UPPER_SNAKE_CASE
- 파일명: 컴포넌트는 PascalCase, 나머지는 camelCase

### Import 순서

`eslint-plugin-simple-import-sort`가 자동 정렬합니다. 순서는 다음과 같습니다.

1. 외부 라이브러리 (`next`, `react`, ...)
2. 내부 경로 (`@/widgets/...`, `@/features/...`, ...)
3. 상대 경로 (`./`, `../`)

---

## Image

외부 이미지 도메인은 `next.config.ts`의 `remotePatterns`에 등록합니다.

SVG 아이콘은 `public/icons/`에 위치하며 `next/image`로 import합니다.

```ts
import SomeIcon from '@/icons/icon_name.svg';
<Image src={SomeIcon} alt="설명" width={24} height={24} />
```

SVG에 CSS transform 애니메이션이 필요할 경우 `<span className="inline-block transition-transform ...">` 으로 감쌉니다.

---

## Tooling

| 도구                               | 용도                          |
| ---------------------------------- | ----------------------------- |
| ESLint (`eslint-config-next`)      | Next.js 권장 규칙 적용        |
| `eslint-plugin-boundaries`         | FSD 레이어 의존성 규칙 강제   |
| `eslint-plugin-simple-import-sort` | import 자동 정렬              |
| Prettier                           | 코드 포맷 자동화              |
| `prettier-plugin-tailwindcss`      | Tailwind 클래스 자동 정렬     |
| TypeScript (`strict: true`)        | 타입 안전성 강제              |
| Husky + lint-staged                | 커밋 시 lint/format 자동 실행 |

### 주요 포맷 규칙 (`.prettierrc`)

- 세미콜론: 사용
- 따옴표: single quote
- trailing comma: 항상
- 탭 너비: 2칸
- 최대 줄 길이: 100자
