import { getUserResponseSchema } from '@/features/auth/model/schema';
import type { GetUserResponse } from '@/features/auth/model/types';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { serverApiGet } from '@/shared/api/server';
import { parseApiResult } from '@/shared/api/validate';

export async function getUserServer(): Promise<GetUserResponse> {
  const user = await serverApiGet<unknown>(ENDPOINTS.users.me);
  return parseApiResult(getUserResponseSchema, user);
}
