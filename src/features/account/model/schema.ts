import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '이름을 입력해주세요.')
    .max(50, '이름은 50자 이하로 입력해주세요.'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
