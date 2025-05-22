import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const languages = [
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian - (Shqip)" },
  { code: "am", label: "Amharic - (አማርኛ)" },
  { code: "ar", label: "Arabic - (العربية)" },
  { code: "an", label: "Aragonese - (Aragonés)" },
  { code: "hy", label: "Armenian - (Հայերեն)" },
  { code: "ast", label: "Asturian - (Asturianu)" },
  { code: "ay", label: "Aymara - (Aymar aru)" },
  { code: "az", label: "Azerbaijani - (Azərbaycan dili)" },
  { code: "eu", label: "Basque - (Euskara)" },
  { code: "be", label: "Belarusian - (Беларуская)" },
  { code: "bn", label: "Bengali - (বাংলা)" },
  { code: "brx", label: "Bodo - (बर')" },
  { code: "bs", label: "Bosnian - (Bosanski)" },
  { code: "br", label: "Breton - (Brezhoneg)" },
  { code: "bg", label: "Bulgarian - (Български)" },
  { code: "ca", label: "Catalan - (Català)" },
  { code: "ckb", label: "Central - Kurdish (کوردی)" },
  { code: "ce", label: "Chechen (Нохчийн мотт)" },
  { code: "zh", label: "Chinese (中文)" },
  { code: "zh-HK", label: "Chinese Hong Kong - (中文 - 香港)" },
  { code: "zh-CN", label: "Chinese Simplified - (中文简体)" },
  { code: "zh-TW", label: "Chinese Traditional - (中文繁體)" },
  { code: "co", label: "Corsican - (Corsu)" },
  { code: "hr", label: "Croatian - (Hrvatski)" },
  { code: "cs", label: "Czech - (Čeština)" },
  { code: "da", label: "Danish - (Dansk)" },
  { code: "dv", label: "Dhivehi - (ދިވެހި)" },
  { code: "nl", label: "Dutch (Nederlands)" },
  { code: "dz", label: "Dzongkha (རྫོང་ཁ)" },
  { code: "en", label: "English" },
  { code: "en-AU", label: "English (Australia)" },
  { code: "en-CA", label: "English (Canada)" },
  { code: "en-IN", label: "English (India)" },
  { code: "en-NZ", label: "English (New Zealand)" },
  { code: "en-ZA", label: "English (South Africa)" },
  { code: "en-GB", label: "English (United Kingdom)" },
  { code: "en-US", label: "English (United States)" },
  { code: "eo", label: "Esperanto" },
  { code: "et", label: "Estonian (Eesti)" },
  { code: "ee", label: "Ewe (Eʋegbe)" },
  { code: "fo", label: "Faroese - (Føroyskt)" },
  { code: "fil", label: "Filipino (Wikang Filipino)" },
  { code: "fi", label: "Finnish (Suomi)" },
  { code: "fr", label: "French (Français)" },
  { code: "fr-CA", label: "French Canada - (Français Canada)" },
  { code: "fr-FR", label: "French France - (Français France)" },
  { code: "fr-CH", label: "French Switzerland - (Français Suisse)" },
  { code: "gl", label: "Galician - (Galego)" },
  { code: "ka", label: "Georgian - (ქართული)" },
  { code: "de", label: "German - (Deutsch)" },
  { code: "de-AT", label: "German Austria  - (Deutsch Österreich)" },
  { code: "de-DE", label: "German Germany  - (Deutsch Deutschland)" },
  { code: "de-LI", label: "German Liechtenstein  - (Deutsch Liechtenstein)" },
  { code: "de-CH", label: "German Switzerland  - (Deutsch Schweiz)" },
  { code: "el", label: "Greek - (Ελληνικά)" },
  { code: "gn", label: "Guarani - (Avañe'ẽ)" },
  { code: "gu", label: "Gujarati - (ગુજરાતી)" },
  { code: "ha", label: "Hausa - (هَوُسَ)" },
  { code: "haw", label: "Hawaiian - (ʻŌlelo Hawaiʻi)" },
  { code: "he", label: "Hebrew - (עברית)" },
  { code: "hi", label: "Hindi - (हिन्दी)" },
  { code: "hu", label: "Hungarian - (Magyar)" },
  { code: "is", label: "Icelandic - (Íslenska)" },
  { code: "id", label: "Indonesian - (Bahasa Indonesia)" },
  { code: "it", label: "Italian - (Italiano)" },
  { code: "ja", label: "Japanese - (日本語)" },
  { code: "ko", label: "Korean - (한국어)" },
  { code: "lt", label: "Lithuanian - (Lietuvių)" },
  { code: "lv", label: "Latvian - (Latviešu)" },
  { code: "ms", label: "Malay - (Bahasa Melayu)" },
  { code: "ml", label: "Malayalam - (മലയാളം)" },
  { code: "no", label: "Norwegian (Norsk)" },
  { code: "pl", label: "Polish - (Polski)" },
  { code: "pt", label: "Portuguese - (Português)" },
  { code: "pt-BR", label: "Portuguese Brazil - (Português Brasil)" },
  { code: "pt-PT", label: "Portuguese Portugal - (Português Portugal)" },
  { code: "ro", label: "Romanian - (Română)" },
  { code: "ru", label: "Russian - (Русский)" },
  { code: "sk", label: "Slovak - (Slovenčina)" },
  { code: "sl", label: "Slovenian - (Slovenščina)" },
  { code: "es", label: "Spanish - (Español)" },
  { code: "sv", label: "Swedish - (Svenska)" },
  { code: "ta", label: "Tamil - (தமிழ்)" },
  { code: "th", label: "Thai - (ไทย)" },
  { code: "tr", label: "Turkish - (Türkçe)" },
  { code: "uk", label: "Ukrainian - (Українська)" },
  { code: "vi", label: "Vietnamese - (Tiếng Việt)" },
  { code: "cy", label: "Welsh - (Cymraeg)" },
  { code: "xh", label: "Xhosa - (isiXhosa)" },
  { code: "zu", label: "Zulu - (isiZulu)" },
];

export default function LanguageSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: any) => void;
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">bla bla bla</InputLabel>
      <Select
        labelId="language-select-label"
        id="languages"
        value={value}
        label="Válassz nyelvet"
        onChange={onChange}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.label}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
