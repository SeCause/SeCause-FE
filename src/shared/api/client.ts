import ky from 'ky';

export const apiClient = ky.create({
  prefix: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
