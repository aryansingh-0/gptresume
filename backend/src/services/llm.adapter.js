// src/services/LLMAdapter.js
const OpenAI = require("openai")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const env = require("../config/env")

class LLMAdapter {
  constructor() {
    this.provider = env.LLM_PROVIDER

    if (this.provider === "openai") {
      this.openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      })
    }

    if (this.provider === "gemini") {
      this.gemini = new GoogleGenerativeAI(env.GEMINI_API_KEY)
      this.geminiModel = this.gemini.getGenerativeModel({
        model: "gemini-2.5-flash-lite-preview-09-2025", // fast and cost-effective
      })
    }
  }

  async tailorResume(profile, jobDescription) {

    if (this.provider === "mock") {
      return this.mockTailorResume(profile, jobDescription)
    }
    if (this.provider === "openai") {
      return this.openaiTailorResume(profile, jobDescription)
    }
    if (this.provider === "gemini") {
      return this.geminiTailorResume(profile, jobDescription)
    }

    throw new Error(`Unsupported LLM provider: ${this.provider}`)
  }

  async openaiTailorResume(profile, jobDescription) {
    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription)

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume writer and career coach. Tailor resumes truthfully while aligning with the job description.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      })

      let raw = completion.choices[0].message.content.trim()

      // Clean markdown if OpenAI wraps in code block
      raw = raw.replace(/```json/g, "").replace(/```/g, "").trim()

      return JSON.parse(raw)
    } catch (error) {
      console.error("OpenAI API Error:", error)
      throw new Error("Failed to generate tailored resume with OpenAI")
    }
  }

  async geminiTailorResume(profile, jobDescription) {

    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription)

      const response = await this.geminiModel.generateContent(prompt)

      let text = response.response.candidates[0].content.parts[0].text.trim()

      // 🧹 Clean Markdown fences like ```json ... ```
      text = text.replace(/```json/g, "").replace(/```/g, "").trim()

      // Try extracting only JSON if Gemini adds extra text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        text = jsonMatch[0]
      }

      return JSON.parse(text)
    } catch (error) {
      console.error("Gemini API Error:", error)
      throw new Error("Failed to generate tailored resume with Gemini")
    }
  }


  buildTailoringPrompt(profile, jobDescription) {
   return `
You are an expert career coach and resume writer.  
Your task is to **tailor the candidate’s resume and cover letter** to the provided job description.  

⚠️ STRICT RULES:  
- Do NOT invent or fabricate data (skills, jobs, projects, degrees, logos, icons, etc.).  
- If any section is missing in the candidate profile, exclude it from the output.  
- Only use the information provided in the candidate profile.  
- If improvements are possible but data is missing, mention them in "improvementTips" and "practiceFocus" instead of creating content.  
- Maintain factual accuracy while optimizing keywords, relevance, and formatting for ATS.  
- If the candidate is clearly **not eligible** based on minimum requirements, return an "alert" message explaining it.  

---

CANDIDATE PROFILE:
${JSON.stringify(profile,2,null)}

JOB DESCRIPTION:
${JSON.stringify(jobDescription,2,null)}

---

🎯 OUTPUT FORMAT:  
Return a **single JSON object** in the following structure.  
⚠️ Only include fields that exist in the candidate’s profile.  
Do not insert placeholders, null, or empty values.  

{
  "resume": {
    "name": ...,
    "title": ...,
    "contact": {
      "email": ...,
      "phone": ...,
      "location": ...
    },
    "summary": ...,
    "skills": [...],
    "experience": [
      {
        "title": ...,
        "company": ...,
        "location": ...,
        "startDate": ...,
        "endDate": ...,
        "current": ...,
        "description": ...,
        "achievements": [...]
      }
    ],
    "education": [
      {
        "degree": ...,
        "institution": ...,
        "location": ...,
        "startYear": ...,
        "endYear": ...,
        "gpa": ...
      }
    ],
    "projects": [
      {
        "name": ...,
        "description": ...,
        "technologies": [...],
        "link": ...
      }
    ]
  },

  "coverLetter": {
    "greeting": ...,
    "intro": ...,
    "body": [...],
    "closing": ...,
    "signoff": ...,
    "signature": ...
  },

  "improvementTips": [
    ...,
    ...
  ],

  "practiceFocus": [
    ...,
    ...,
    ...
  ],

  "alert": "Only include this key if the candidate is not eligible for the job. Otherwise omit it."
}

---

📌 FOCUS AREAS:  
1. Use exact keywords from the job description.  
2. Highlight the most relevant experience, skills, and projects.  
3. Quantify achievements where possible.  
4. Stay truthful to the candidate profile.  
5. Optimize formatting and phrasing for ATS systems.  
6. Include **all available education details** (if given).  
7. Write a concise and professional cover letter.  
8. Provide **exactly 2 improvement tips** and **3 practice focus points**.  
`;


  }


}

module.exports = new LLMAdapter()
