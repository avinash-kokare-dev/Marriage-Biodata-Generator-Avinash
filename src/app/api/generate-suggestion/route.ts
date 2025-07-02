import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { log } from 'console';

const MODEL_NAME = "gemini-1.5-flash-latest";

export async function POST(req: NextRequest) {

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is not set in .env.local");
      return NextResponse.json({ error: "AI service not configured." }, { status: 500 });
    }

    const body = await req.json();
    console.log("Request Body:", body);

    const { name, age, profession, education, location, hobbies } = body;

    // Validate required fields
    if (!name || !age || !profession || !education || !location || !hobbies) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Construct prompt
    const prompt = `
You are a professional bio writer helping craft the 'About Me' section for an Indian marriage biodata.

Use the following user details:
- Name: ${name}
- Age: ${age}
- Profession: ${profession}
- Education: ${education}
- Location: ${location}
- Hobbies: ${hobbies}

Write a 4–6 sentence paragraph that is warm, genuine, and culturally appropriate for an Indian matrimonial profile.
Avoid clichés and focus on showcasing personality, values, and lifestyle in a natural and appealing way.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
    });

    const text = result.response?.text();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No response from Gemini." }, { status: 500 });
    }

    return NextResponse.json({ aboutMe: text });
  } catch (error) {
    console.error("[API Route] Error generating About Me:", error);
    return NextResponse.json({ error: "Something went wrong while generating biodata." }, { status: 500 });
  }
}
