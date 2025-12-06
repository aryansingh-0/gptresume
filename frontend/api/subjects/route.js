// app/api/subjects/route.js
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';

export async function GET(req) {
  try {
    await connectDB();
    const subjects = await Subject.findOne({
        subjectName:"Mathematics 2"
    });
    return Response.json(subjects);
  } catch (err) {
    return new Response('Failed to fetch subjects', { status: 500 });
  }
}
