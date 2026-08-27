# Storybook과 CDD 작업 가이드

## 도입 목적

Storybook은 앱 전체를 실행하지 않고 UI 상태를 독립적으로 개발하고 검토하는 작업 공간이다. 이
프로젝트에서는 컴포넌트 카탈로그를 무작정 늘리기보다, 반복 사용되거나 회귀 위험이 큰 상태를 Story로 고정하는 데 사용한다.

## Story 작성 기준

다음 중 하나에 해당하면 Story 작성을 우선 검토한다.

- `shared/ui`처럼 여러 화면에서 재사용되는 컴포넌트
- 로딩, 비활성화, 오류, 빈 상태처럼 실제 화면에서 재현하기 어려운 상태
- 긴 텍스트, 좁은 화면처럼 레이아웃 회귀 가능성이 높은 경계 상태
- 클릭이나 선택 등 핵심 상호작용을 독립적으로 검증할 가치가 있는 컴포넌트

단순한 페이지 조합이나 API 로직만 다른 컴포넌트까지 모두 Story로 만들지는 않는다. API 의존 컴포넌트는 고정된 데이터로 의미 있는 상태를 재현할 수 있을 때 추가한다.

## CDD 작업 순서

1. 구현할 UI의 정상 상태와 경계 상태를 먼저 정의한다.
2. Story의 `args`로 상태를 작성한다.
3. Storybook에서 컴포넌트를 구현하고 반응형·접근성을 확인한다.
4. 중요한 사용자 행동은 `play` 함수로 검증한다.
5. 앱 화면에 컴포넌트를 연결한다.

Story는 테스트 데이터 저장소가 아니라 UI 요구사항의 실행 가능한 예시다. 상태 이름은 `Default`보다 `Empty`, `Disabled`, `LongLabel`, `RequestFailed`처럼 의도가 드러나게 작성한다.

## Story 기본 형식

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: '확인',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
```

`satisfies`와 `StoryObj<typeof meta>`를 사용하면 컴포넌트 props와 Story args가 함께 타입 검사된다.

## Story 테스트 실행

Storybook의 Vitest 애드온은 각 Story를 Chromium에서 렌더링하고, `play` 함수가 있으면 사용자 상호작용과 assertion까지 실행한다. 전역 a11y 설정이 `error`이므로 axe 접근성 위반도 테스트 실패로 처리한다.

```bash
pnpm test:storybook # Story 렌더링, play, a11y 테스트
pnpm test:unit      # 기존 jsdom 단위 테스트만 실행
pnpm test           # 두 Vitest 프로젝트를 함께 실행
```

Storybook을 실행한 상태에서는 사이드바 하단의 테스트 위젯으로 전체·컴포넌트·개별 Story 단위 테스트를 실행하고 실패한 Story를 바로 디버깅할 수 있다.

## Chromatic

Chromatic은 Story의 시각적 변경을 비교하고 Storybook을 배포한다. GitHub Actions에서 사용하려면 Repository secret을 등록한다.

```text
CHROMATIC_PROJECT_TOKEN
```

로컬에서는 `.env`에 같은 환경변수를 추가한 뒤 실행한다.

```bash
pnpm chromatic
```
