import GoogleBlogAds from '@/components/googleAds/GoogleBlogAds';
export const revalidate = 60;

import React from 'react';
import ArticleCard from "@/components/cards/ArticleCard";

async function Page() {
  const host = process.env.HOST_URL || 'http://localhost:3000';

  const res = await fetch(`${host}/api/blog/save-article`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status}`);
    return <div>Article not found</div>;
  }

  const data = await res.json();
  const articles = data.articles || [];

  const cardsWithAds = [];
  const adIndex = Math.floor(Math.random() * (articles.length + 1));

  articles.forEach((article, idx) => {
    

    cardsWithAds.push(
      <ArticleCard key={idx} article={article} />
    );
  });

  return (
   <div className="min-h-screen px-6 py-8 bg-[var(--background)] text-[var(--text-primary)]">
 

  {cardsWithAds.length > 0 ? (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cardsWithAds}
    </div>
  ) : (
    <p className="text-center text-[var(--text-secondary)]">
      No blog posts found.
    </p>
  )}
</div>

  );
}

export default Page;
