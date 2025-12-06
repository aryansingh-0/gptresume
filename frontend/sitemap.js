// app/sitemap.js

export const dynamic = 'force-dynamic'; // ⬅️ Add this line

import connectDB from '@/utils/db';
import Article from '@/models/Article';

export default async function sitemap() {
  await connectDB();

  const articles = await Article.find({ isPublished: true }).select('slug');

  const baseUrl = 'https://tailor0me.vercel.app';

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/branch/cse`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const blogRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
