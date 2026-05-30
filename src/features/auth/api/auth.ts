import type {
  GetUserResponse,
  GithubLoginResponse,
  LoginRequest,
  UserProfile,
} from '@/features/auth/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';

export async function postGithubLogin(body: LoginRequest): Promise<GithubLoginResponse> {
  const res = await apiClient
    .post(ENDPOINTS.auth.githubLogin, { json: body })
    .json<ApiResponse<GithubLoginResponse>>();
  return res.result;
}

export async function getUser(): Promise<UserProfile> {
  const res = await apiClient.get(ENDPOINTS.users.me).json<ApiResponse<GetUserResponse>>();
  return { avatarUrl: res.result.avatarUrl, username: res.result.name };
}

export async function postLogout(): Promise<void> {
  return apiClient.post(ENDPOINTS.auth.logout).json<void>();
}
