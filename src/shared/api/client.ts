import ky from 'ky';

export const apiClient = ky.create({
  prefix: `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
