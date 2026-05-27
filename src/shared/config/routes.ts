export const ROUTES = {
  home: '/',
  login: '/login',
  mypage: '/mypage',
  analysis: '/analysis',
} as const;

export const SECTION_IDS = {
  overview: 'overview',
  howItWorks: 'how-it-works',
  faq: 'faq',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
