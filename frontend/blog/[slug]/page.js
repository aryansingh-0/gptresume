// app/blog/[slug]/page.jsx
import Link from "next/link";
import BlogSuggestions from "@/components/blog/BlogSuggestions";
import UserBlogRender from "@/components/blog/UserBlogRender";
import BlockAi from "@/components/blog/ai/BlockAi";
import RightAds from "@/components/ads/RightAds";
import RecentJob from "@/components/blog/RecentJob";
import TailorMePromotion from "@/components/blog/TailorMePromotion";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.HOST_URL}/api/blog/${slug}`, {
      next: { revalidate: 600 },
    });

    const { article } = await res.json();

    if (!article) {
      return {
        title: "Blog Not Found | GPT Resume",
        description: "This blog post does not exist or has been removed.",
      };
    }

    const formattedTitle = article.title || slug.replaceAll("-", " ");
    const description =
      article.content?.find((b) => b.type === "paragraph")?.value.slice(0, 160) ||
      "Read the latest article on GPT Resume.";
    const image =
      article.thumbnailUrl ||
      "https://tailor0me.vercel.app/default-thumbnail.jpg";

    return {
      title: `${formattedTitle} | GPT Resume`,
      description,
      keywords: article.tags?.join(", "),
      openGraph: {
        title: `${formattedTitle} | GPT Resume`,
        description,
        url: `https://tailor0me.vercel.app/blog/${slug}`,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: formattedTitle,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${formattedTitle} | GPT Resume`,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Blog | GPT Resume",
      description: "Read the latest blog posts on GPT Resume.",
    };
  }
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const host = process.env.HOST_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${host}/api/blog/save-article`);
    if (!res.ok) {
      console.error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const articles = data.articles || [];

    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}

export default async function BlogPage({ params }) {
  const { slug } = params;
  const host = process.env.HOST_URL || "http://localhost:3000";

  const res = await fetch(`${host}/api/blog/${slug}`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Article Not Found</h2>
          <p className="text-sm">
            Sorry, the article you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const post = await res.json();
  const article = post.article;

  if (!article) {
    return <div className="min-h-screen">Article not found</div>;
  }

  // Helper to render markdown-like text with links, bold, italic
  function renderTextWithLinks(text) {
    if (!text || typeof text !== "string") return null;

    const regex =
      /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        parts.push(
          <Link
            key={match[3] + match.index}
            href={match[3]}
            className="text-blue-500 font-bold mx-1 hover:text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[2]}
          </Link>
        );
      } else if (match[4]) {
        parts.push(<strong key={"b" + match.index}>{match[5]}</strong>);
      } else if (match[6]) {
        parts.push(<em key={"i" + match.index}>{match[7]}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  // Extract plain text for AI or other processing
  function extractPlainTextFromContent(contentArray) {
    return contentArray
      .filter((block) => block.type === "paragraph" || block.type === "heading")
      .map((block) => {
        if (block.type === "heading") {
          return `${"#".repeat(block.level || 1)} ${block.value}`;
        }
        return block.value;
      })
      .join("\n\n");
  }

  return (
    <>
      <main className="min-h-screen mb-4 w-full flex bg-[var(--background)] text-[var(--text-primary)]">
        {/* Left Side Ad */}
        <div className="hidden md:block p-2 w-[20%]">
          <RecentJob />
        </div>

        {/* Center Content */}
        <div className="w-full md:w-[60%] md:mx-auto md:px-4 pb-4 md:py-2">
          {/* Floating AI Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <BlockAi article={extractPlainTextFromContent(article.content)} />
          </div>

          {/* Main Blog Content */}
          <div className="bg-[var(--card-background)] md:border border-[var(--border)] rounded-2xl p-4 md:shadow-md">
            <UserBlogRender article={article} />
          </div>

          {/* Tags Section */}
          <div className="mt-8 text-sm px-4 text-[var(--text-secondary)]">
            Tags:{" "}
            {article.tags?.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-[var(--border)] text-[var(--text-primary)] px-2 py-1 rounded-lg mr-2 mb-2 shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side Ad + AI */}
        <div className="w-[20%] hidden relative md:flex flex-col p-2">
          <RightAds />
          <div className="mt-4">
            <BlockAi article={extractPlainTextFromContent(article.content)} />
          </div>
        </div>
      </main>

      {/* TailorMe Promotion Section */}
      <TailorMePromotion jobTitle={article.jobTitle} />

      {/* Blog Suggestions */}
      <div className=" md:border border-[var(--border)] md:shadow-md rounded-2xl md:mx-5 px-4 md:pt-4 pb-6 mb-2 md:mt-6">
        <BlogSuggestions tags={article.tags} slug={article.slug} />
      </div>
    </>
  );
}
