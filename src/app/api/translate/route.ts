
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const GROQ_API_URL = 'https://api.groq.com/v1/translate'; // példa URL
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function POST(req: NextRequest) {
  const { lang, text } = await req.json();

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({ targetLang: lang, text }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Fordítási hiba' }, { status: 500 });
  }

  const translated = await response.json();

  // Fordítás mentése fájlba
  const filePath = path.join(process.cwd(), 'public', 'translations', `${lang}.json`);
  await fs.writeFile(filePath, JSON.stringify(translated, null, 2));

  return NextResponse.json(translated);
}
