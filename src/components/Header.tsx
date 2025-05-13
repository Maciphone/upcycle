"use client";

import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Termékek", path: "/product" },
  { label: "Kosár", path: "/cart" },
  { label: "Kapcsolat", path: "/contact" },
];

export default function Header() {
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
          Upcycle
        </Typography>
        {/* menü gombok */}
        <Stack direction="row" spacing={2}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} passHref>
              <Button color="inherit">{link.label}</Button>
            </Link>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
