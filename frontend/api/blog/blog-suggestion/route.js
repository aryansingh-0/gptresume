import connectDB from '@/utils/db';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    const { tags } = await req.json();

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json({ error: 'Tags are required' }, { status: 400 });
    }

    // Randomly sample up to 10 articles that match the tags
    const suggestions = await Article.aggregate([
      {
        $match: {
          tags: { $in: tags },
          isPublished: true,
        },
      },
      {
        $sample: { size: 10 }, // Get up to 10 random documents
      },
      {
        $project: {
          title: 1,
          slug: 1,
          author: 1,
          tags: 1,
          thumbnailUrl: 1,
          createdAt: 1,
        },
      },
    ]);

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error('Blog Suggestion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
