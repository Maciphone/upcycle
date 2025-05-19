
import { useEffect, useState } from 'react';

function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) || path;
}

export function useTranslation(lang: string) {
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/translations/${lang}.json`);
        if (!response.ok) throw new Error(`Translation file not found: ${lang}`);
        const data = await response.json();
        setTranslations(data);
      } catch {
        console.warn('Translation file not found locally. Trying to fetch from GROQ API...');

        try {
          const base = await fetch('/translations/hun.json');
          const text = await base.json();
          console.log('Fetched base translation:', text); //ok

          const groqResponse = await fetch('/api/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lang, text }),
          });

          if (!groqResponse.ok) throw new Error('GROQ API request failed');

          const translated = await groqResponse.json();
          setTranslations(translated);
        } catch (groqError) {
          console.error('Translation failed via GROQ:', groqError);
          setTranslations({});
        }
      }
    };

    fetchTranslations();
  }, [lang]);

  return {
    t: (key: string) => getNestedTranslation(translations, key),
    translations,
  };
}

