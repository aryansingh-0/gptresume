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

    // Only select specific fields 
    const articles = await Article.find({ isPublished: true }).select('slug title thumbnailUrl author createdAt').sort({ createdAt: -1 });;

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { _id, title, slug, author, tags, thumbnailUrl, content, isPublished } = body;
 
    if (!_id) {
      return NextResponse.json({ success: false, message: 'Article ID (_id) is required' }, { status: 400 });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      _id,
      {
        title,
        slug,
        author,
        tags,
        thumbnailUrl,
        content,
        isPublished,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article updated successfully', article: updatedArticle }, { status: 200 });
  } catch (error) {
    console.error('Update Article Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { _id } = await req.json(); // expects a JSON body with _id

    if (!_id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }

    const deleted = await Article.findByIdAndDelete(_id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete Article Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}








