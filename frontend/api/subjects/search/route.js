import connectDB from '@/utils/db';
import Subject from '@/models/Subject';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.query) {
      return new Response("Missing query", { status: 400 });
    }

    const regex = new RegExp(body.query, 'i');

    const subjects = await Subject.find({
      $or: [
        { subjectName: regex },
        { tags: { $in: [regex] } }
      ]
    }).limit(10);

    return Response.json(subjects);
  } catch (err) {
    console.error('Search error:', err);
    return new Response('Failed to search subjects', { status: 500 });
  }
}
