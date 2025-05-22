/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { useSelector } from "react-redux";
import { selectedLanguage } from "@/redux/languageSlice";
import { useTranslation } from "@/hooks/useTranslation";

type Product = { id: string; name: string };

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lang = useSelector(selectedLanguage);
  const { t } = useTranslation(lang);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // <-- idejön a slash és nincs .GET
        if (!response.ok) throw new Error(`Hálózati hiba: ${response.status}`);
        const data: IProduct[] = await response.json();
        setProducts(data);
        console.log("Fetched products:", data); // Debug log
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Typography>…</Typography>;
  if (error) return <Typography color="error">Hiba: {error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("Termékek")}
      </Typography>
      {products.map((p) => (
        <Link href={`/product/${p._id}`} passHref key={p._id.toString()}>
          <Button variant="outlined" sx={{ m: 1 }}>
            <img
              src={p.imageUrl}
              alt={p.name}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
          </Button>
        </Link>
      ))}
      <Link href="/product/new" passHref>
        <Button variant="contained" sx={{ mt: 2 }}>
          {t("product.Új termék hozzáadása")}
        </Button>
      </Link>
    </Box>
  );
}
