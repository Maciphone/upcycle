
'use client'; // fontos!

import { useParams } from 'next/navigation';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Termék részletei - ID: {id}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {id} details.
      </Typography>

      <Link href="/product" passHref>
        <Button variant="outlined"> Vissza a listához</Button>
      </Link>
    </Box>
  );
}
