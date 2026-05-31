import type { ApiResponse } from '@/shared/api/types';

export interface LoginRequest {
  code: string;
}

export interface GithubLoginResponse {
  userId: number;
  githubId: number;
  githubLoginId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface UserProfile {
  avatarUrl: string | null;
  username: string;
  email: string;
}

export interface GetUserResponse {
  userId: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export type LoginResponse = ApiResponse<GithubLoginResponse>;
