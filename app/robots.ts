import { MetadataRoute } from 'next';
import { siteContent } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteContent.seo.url || 'https://www.easydev.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}