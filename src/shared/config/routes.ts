export const ROUTES = {
  home: '/',
  login: '/login',
  mypage: '/mypage',
  analysis: '/analysis',
  repositoryDetail: (repositoryId: number) => `/mypage/repositories/${repositoryId}`,
} as const;

export const PROTECTED_ROUTES = [ROUTES.mypage, ROUTES.analysis];

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export const SECTION_IDS = {
  overview: 'overview',
  howItWorks: 'how-it-works',
  faq: 'faq',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
