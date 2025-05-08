import Link from 'next/link';
import { Button, Typography, Box } from '@mui/material';

const products = [
  { id: '1', name: 'Hátizsák' },
  { id: '2', name: 'Válltáska' },
  { id: '3', name: 'Tornazsák' },
];

export default function ProductListPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Termékek
      </Typography>

      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} passHref>
          <Button variant="outlined" sx={{ m: 1 }}>
            {product.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
}
