
// app/api/subjects/semester/route.js
// 
import connectDB from "@/utils/db";
import PyqSubject from "@/models/PyqSubject";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Parse the JSON body
    const { semester } = await req.json();

    // Fetch from DB
    const subject = await PyqSubject.find({ year : semester });

    return Response.json({ subject }, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to fetch", { status: 500 });
  }
}
