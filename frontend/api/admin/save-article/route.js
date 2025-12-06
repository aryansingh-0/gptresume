import connectDB from '@/utils/db'; // you write this separately
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const saved = await Article.create(body);
    return NextResponse.json({ success: true, id: saved._id });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const articles = await Article.find();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

}
