import type { z } from 'zod';

import type { getUserResponseSchema, githubLoginResponseSchema } from './schema';

export interface LoginRequest {
  code: string;
}

export type GithubLoginResponse = z.infer<typeof githubLoginResponseSchema>;

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export type UserProfile = GetUserResponse;

// avatarUrl: null이면 삭제, 생략하면 기존 값 유지.
export interface UpdateUserRequest {
  name?: string;
  avatarUrl?: string | null;
}
