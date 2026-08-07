import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mypage', '/analysis'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
