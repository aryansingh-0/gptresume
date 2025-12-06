// app/api/admin/login/route.js 

import connectDB from '@/utils/db';
import Admin from '@/models/Admin';
import { generateToken } from '@/flib/auth';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });
  if (!admin) return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

  const token = generateToken(admin);

  const res = NextResponse.json({ success: true });
  res.cookies.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
