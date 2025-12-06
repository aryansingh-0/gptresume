//disable signup to protect it 

// import  connectDB  from '@/utils/db';
// import Admin from '@/models/Admin';
// import bcrypt from 'bcryptjs';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   await connectDB();
//   const { username, password } = await req.json();

//   const existing = await Admin.findOne({ username });
//   if (existing) return NextResponse.json({ success: false, message: 'Username taken' }, { status: 400 });

//   const hashed = await bcrypt.hash(password, 10);
//   const admin = new Admin({ username, password: hashed });
//   await admin.save();

//   return NextResponse.json({ success: true });
// }

