// app/api/cloudanary/delete-image/route.js

import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(req) {
  const { public_id } = await req.json();

  if (!public_id) {
    return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
  }

  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
