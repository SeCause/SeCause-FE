import { z } from 'zod';

export const githubLoginResponseSchema = z.object({
  userId: z.number(),
  githubId: z.number(),
  githubLoginId: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
});

export const getUserResponseSchema = z.object({
  userId: z.number(),
  githubLoginId: z.string(),
  email: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
});
