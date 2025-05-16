

'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price), // Convert price to number
        stockQuantity: parseInt(formData.stockQuantity, 10), // Convert stockQuantity to number
      }),
    });

    if (response.ok) {
      alert('Product created successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stockQuantity: '',
      });
    } else {
      alert('Failed to create product.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        mt: 4,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Create a New Product
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={3}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Stock Quantity"
        name="stockQuantity"
        type="number"
        value={formData.stockQuantity}
        onChange={handleChange}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Product
      </Button>
    </Box>
  );
}