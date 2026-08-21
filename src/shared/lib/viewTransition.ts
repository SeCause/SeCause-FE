// React canary 전용 API라 Next.js 빌드에서만 'react'가 해당 export를 포함한 번들로
// alias된다. Vitest는 이 alias를 거치지 않고 설치된 순정 react 패키지를 그대로 쓰므로,
// 테스트 환경에서 mock할 수 있도록 이 모듈로 한 번 감싸서 재노출한다.
export { ViewTransition } from 'react';
