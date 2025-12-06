import connectDB from '@/utils/db';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const { params } = context;
  const { slug } = await params;

  await connectDB();

  const article = await Article.findOne({ slug });
  
  if (!article) {
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, article });
}
