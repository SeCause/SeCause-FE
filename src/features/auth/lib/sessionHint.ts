const COOKIE_NAME = 'has_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export function hasSessionHint(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
}

export function setSessionHint(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearSessionHint(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
