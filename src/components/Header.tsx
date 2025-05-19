"use client";

import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

const navLinks = [
  {
    label: (t: (key: string) => string) => t("header.Termékek"),
    path: "/product",
  },
  { label: (t: (key: string) => string) => t("header.Kosár"), path: "/cart" },
  {
    label: (t: (key: string) => string) => t("header.Kapcsolat"),
    path: "/contact",
  },
];

export default function Header() {
  const [language, setLanguage] = useState("hun");
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Itt lehetne a nyelvet megváltoztatni, pl. localStorage-ben tárolni
  };
  const { t } = useTranslation(language);
  return (
    <AppBar position="static" color="success">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logó */}
        <Link href="/" passHref>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              priority={true}
              style={{ marginRight: "1rem" }}
            />
          </Box>
        </Link>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("header.Upcycle")}
        </Typography>
        {/* menü gombok */}
        <Stack direction="row" spacing={2}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} passHref>
              <Button color="inherit">{link.label(t)}</Button>
            </Link>
          ))}
        </Stack>
        <button type="button" onClick={() => handleLanguageChange("deu")}>
          Deutsch
        </button>
        <button type="button" onClick={() => handleLanguageChange("hun")}>
          hunglish
        </button>
      </Toolbar>
    </AppBar>
  );
}
