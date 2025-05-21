
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY!;
const groq = new Groq({ apiKey: GROQ_API_KEY });
const model = process.env.GROQ_MODEL;// || "llama-3.1-8b-instant";

export async function POST(req: NextRequest) {
  const { lang, text } = await req.json();

  console.log(lang);
  try {
    const completion = await groq.chat.completions.create({
      model: `${model}`,
      messages: [
        {
          role: "user",
          content: `
You will receive a JSON object where all keys are Hungarian expressions. 
Your task is to translate each value into language code: ${lang}. 
If the language is "hu" (Hungarian), return the input JSON unchanged.

Keep the original structure and return the result in JSON format. 
Do not include any explanation or additional text—just the translated JSON.

Here is the object to translate:
${JSON.stringify(text, null, 2)}
          `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const translatedText = JSON.parse(completion.choices[0]?.message?.content || "{}");

    // Mentés a public/translations mappába
    const filePath = path.join(process.cwd(), 'public', 'translations', `${lang}.json`);
    await fs.writeFile(filePath, JSON.stringify(translatedText, null, 2));

    console.log("GROQ válasz:", translatedText); // Debug log

    return NextResponse.json(translatedText);

  } catch (err: any) {
    console.error("GROQ hiba:", err);
    return NextResponse.json({ error: 'Fordítási hiba', details: err.message }, { status: 500 });
  }
}
