// src/app/api/generate-suggestion/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.5-flash-latest";

type SectionType = "aboutMe" | "partnerPreferences";

interface BiodataInput {
  name: string;
  birthdate: string;
  profession: string;
  education: string;
  location: string;
  hobbies: string;
  sectionType: SectionType;
}

function calculateAge(birthdate: string): number {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

function getPromptAndConfig(sectionType: SectionType, input: BiodataInput) {
  console.log("Prompt : ", sectionType)
  const age = calculateAge(input.birthdate);
  const commonInfo = `
- Full Name: ${input.name}
- Age: ${age}
- Profession: ${input.profession}
- Education: ${input.education}
- Current Location: ${input.location}
- Hobbies and Interests: ${input.hobbies}
`;

  let prompt = "";
  let generationConfig = {};

  if (sectionType === "aboutMe") {
    prompt = `
You are an expert bio writer specializing in crafting personalized "About Me" sections for Indian matrimonial biodata profiles.

Your task is to generate a warm, realistic, and culturally appropriate paragraph that reflects the individual's background and personality in a genuine way.

Use the following details:
${commonInfo}

Write a 4–6 sentence paragraph that sounds natural, family-friendly, and emotionally appealing for an Indian audience. Avoid generic clichés or repetitive phrases. Ensure each response is **unique**, human-like, and tailored to the given details.

Do not exaggerate. Maintain a respectful, honest tone with a slight touch of positivity and future readiness. Highlight the individual's personality, lifestyle, and values in a simple and graceful manner.
`;

    generationConfig = {
      temperature: 0.85,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 300,
    };
  } else {
    prompt = `
You are an expert bio writer helping craft a personalized "Partner Preferences" section for an Indian matrimonial biodata.

Use the following user details to guide tone and context (not to list as preferences directly):
${commonInfo}

Write a 4–6 sentence paragraph that is mature, respectful, and realistic. Focus on emotional compatibility, shared values, mutual respect, and partnership goals.

Avoid listing rigid demands (like income, height, caste). Instead, highlight traits like kindness, emotional maturity, respect for family, and a positive mindset.

Keep it culturally appropriate and suitable for Indian audiences. Make sure the response is **unique**, natural, and not robotic.
`;

    generationConfig = {
      temperature: 0.7,
      topK: 50,
      topP: 0.9,
      maxOutputTokens: 400,
    };
  }

  return { prompt, generationConfig };
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error: GEMINI_API_KEY is not set.");
      return NextResponse.json({ error: "AI service not configured." }, { status: 500 });
    }

    const body: BiodataInput = await req.json();

    const { name, birthdate, profession, education, hobbies, sectionType } = body;

    if (!name || !birthdate || !profession || !education || !hobbies || !sectionType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const { prompt, generationConfig } = getPromptAndConfig(sectionType, body);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
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

    return NextResponse.json(text);
  } catch (error) {
    console.error("[API Route] Error generating biodata content:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
