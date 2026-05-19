import type { LoginData, LoginRequest } from '@/features/auth/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export async function postGithubLogin(body: LoginRequest): Promise<LoginData> {
  return apiClient.post(ENDPOINTS.auth.githubLogin, { json: body }).json<LoginData>();
}
