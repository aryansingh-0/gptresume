import connectDB from '@/utils/db';
import Subject from '@/models/Subject';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const branch = searchParams.get('branch');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!branch) {
      return new Response('Branch is required', { status: 400 });
    }

    const skip = (page - 1) * limit;

    const subjects = await Subject.find({ branch: new RegExp(`^${branch}$`, 'i') })
      .skip(skip)
      .limit(limit);

    const total = await Subject.countDocuments({ branch: new RegExp(`^${branch}$`, 'i') });

    return Response.json({
      subjects,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching subjects', { status: 500 });
  }
}
