

import ProductForm from '@/components/CreateProduct';
import { Container, Typography } from '@mui/material';

export default function NewProductPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Add a New Product
      </Typography>
      <ProductForm />
    </Container>
  );
}