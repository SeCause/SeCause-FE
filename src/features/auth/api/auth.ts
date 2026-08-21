import { isHTTPError } from 'ky';

import type {
  GetUserResponse,
  GithubLoginResponse,
  LoginRequest,
  UpdateUserRequest,
} from '@/features/auth/model/types';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { components } from '@/shared/api/schema';

type ErrorBody = Pick<components['schemas']['ApiResponse'], 'message' | 'error'>;

export async function postGithubLogin(body: LoginRequest): Promise<GithubLoginResponse> {
  const res = await apiClient.post<GithubLoginResponse>(ENDPOINTS.auth.githubLogin, { json: body });
  return res.result;
}

export async function getUser(): Promise<GetUserResponse> {
  const res = await apiClient.get<GetUserResponse>(ENDPOINTS.users.me);
  return res.result;
}

export async function patchUser(body: UpdateUserRequest): Promise<GetUserResponse> {
  try {
    const res = await apiClient.patch<GetUserResponse>(ENDPOINTS.users.me, { json: body });
    return res.result;
  } catch (error) {
    if (isHTTPError(error)) {
      const body = (await error.response.json().catch(() => ({}))) as ErrorBody;
      const validationMessage = Object.values(body.error?.validation ?? {})[0];
      throw new Error(validationMessage ?? body.message ?? '내 정보 수정에 실패했습니다.');
    }
    throw error;
  }
}

export async function postLogout(): Promise<void> {
  await apiClient.post(ENDPOINTS.auth.logout);
}
