"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;

  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: IProduct = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading product details...
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
        <Link href="/product" passHref>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Back to Product List
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {product.description}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Price: ${product.price}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Category: {product.category}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Stock Quantity: {product.stockQuantity}
      </Typography>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "16px" }}
      />
      <Button
        onClick={() =>
          addToCart({
            id: product._id.toString(),
            name: product.name,
            quantity: 1,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
            category: product.category,
            stockQuantity: product.stockQuantity,
          })
        }
      >
        Kosárba
      </Button>
      <Link href="/product" passHref>
        <Button variant="outlined">Back to Product List</Button>
      </Link>
    </Box>
  );
}
