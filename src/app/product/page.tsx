'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

type Product = { id: string; name: string };

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string|null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');     // <-- idejön a slash és nincs .GET
        if (!response.ok) throw new Error(`Hálózati hiba: ${response.status}`);
        const data: Product[] = await response.json();
        setProducts(data);
        console.log('Fetched products:', data); // Debug log
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Typography>Betöltés…</Typography>;
  if (error)   return <Typography color="error">Hiba: {error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Termékek</Typography>
      {products.map(p => (
        <Link key={p.id} href={`/product/${p.id}`} passHref>
          <Button variant="outlined" sx={{ m: 1 }}>{p.name}</Button>
        </Link>
      ))}
    </Box>
  );
}
