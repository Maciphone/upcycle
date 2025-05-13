
'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function KosarPage() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Kosár
      </Typography>

      {/* Placeholder Content */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        Ez az oldal a kosár tartalmát fogja megjeleníteni.
      </Typography>

      {/* Back to Home Button */}
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Vissza a főoldalra
        </Button>
      </Link>
    </Box>
  );
}
