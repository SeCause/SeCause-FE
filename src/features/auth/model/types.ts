import type { ApiResponse } from '@/shared/api/types';

export interface LoginRequest {
  code: string;
}

export interface User {
  userId: number;
  email: string;
  name: string;
  githubToken: string;
  createdAt: string;
}

export interface LoginData {
  accessToken: string;
  tokenType: string;
  user: User;
}

export type LoginResponse = ApiResponse<LoginData>;
