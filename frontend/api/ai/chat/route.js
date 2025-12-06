import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { message, article } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

 const prompt = `
You are a helpful assistant (Arya) which is created by AktuBrand. You will only answer questions using the article content below. Keep answers short (2–3 lines). If the user asks something that needs more depth, ask if they want a detailed breakdown before continuing.

Use **bold** or _italic_ to emphasize key points. Use markdown formatting.

Article:
"""
${article}
"""

User: ${message}
`;
 
  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // Optional: Trim response if too long
  const MAX_LEN = 1200; // ~3-5 sentences
  if (text.length > MAX_LEN) {
    text = text.slice(0, MAX_LEN) + '...';
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < text.length; i += 5) {
        controller.enqueue(encoder.encode(text.slice(i, i + 5)));
        await new Promise((res) => setTimeout(res, 20));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
