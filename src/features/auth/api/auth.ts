import type {
  GetUserResponse,
  GithubLoginResponse,
  LoginRequest,
  UserProfile,
} from '@/features/auth/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export async function postGithubLogin(body: LoginRequest): Promise<GithubLoginResponse> {
  const res = await apiClient.post<GithubLoginResponse>(ENDPOINTS.auth.githubLogin, { json: body });
  return res.result;
}

export async function getUser(): Promise<UserProfile> {
  const res = await apiClient.get<GetUserResponse>(ENDPOINTS.users.me);
  return { avatarUrl: res.result.avatarUrl, username: res.result.name, email: res.result.email };
}

export async function postLogout(): Promise<void> {
  await apiClient.post(ENDPOINTS.auth.logout);
}
