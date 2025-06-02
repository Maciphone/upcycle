import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type UpSaleCarouselProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title?: string;
};

export default function UpSaleCarousel({
  products,
  onAddToCart,
  title = "Ajánlott termékek",
}: UpSaleCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!products || products.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % products.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + products.length) % products.length);

  const product = products[current];

  return (
    <Box sx={{ my: 4, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={prev}>&lt;</Button>
        <Card sx={{ minWidth: 250, maxWidth: 350 }}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography color="text.secondary">{product.price} Ft</Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => onAddToCart(product)}
            >
              Kosárba
            </Button>
          </CardContent>
        </Card>
        <Button onClick={next}>&gt;</Button>
      </Stack>
    </Box>
  );
}
