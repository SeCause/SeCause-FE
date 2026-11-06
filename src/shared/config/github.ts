// 최초 인가 이후 조직 접근 권한을 추가·요청하는 GitHub OAuth App 설정 페이지.
export const GITHUB_OAUTH_APP_SETTINGS_URL = `https://github.com/settings/connections/applications/${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
