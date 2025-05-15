"use client";

import { useCart } from "@/context/CartContext";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    setQuantity,
  } = useCart();

  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      console.log("value", value);
      if (!isNaN(value)) {
        setQuantity(id, value);
      }
    };

  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h4" gutterBottom>
        Kosár tartalma
      </Typography>

      {cart.length === 0 ? (
        <Typography>Nincs termék a kosárban.</Typography>
      ) : (
        <Stack spacing={2}>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 2,
              }}
            >
              {/* Szövegek oszlopban */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">
                  Mennyiség: {item.quantity}
                </Typography>
                <Typography variant="body2">Ár: {item.price} Ft</Typography>
              </Box>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                priority
                style={{ borderRadius: "4px" }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <TextField
                type="number"
                value={item.quantity}
                onChange={handleChange(item.id)}
                inputProps={{
                  min: 1,
                  max: item.stockQuantity,
                  style: {
                    MozAppearance: "textfield", // Firefox eltüntetés
                  },
                }}
                size="small"
                sx={{
                  width: 70,
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
              <Button
                variant="outlined"
                color="success"
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.stockQuantity}
              >
                +
              </Button>

              {/* Törlés gomb jobb oldalon */}
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(item.id)}
              >
                Törlés
              </Button>
            </Box>
          ))}

          <Divider />

          <Button variant="contained" color="secondary" onClick={clearCart}>
            Kosár ürítése
          </Button>
        </Stack>
      )}
    </Box>
  );
}

// 'use client';

// import { Box, Typography, Button } from '@mui/material';
// import Link from 'next/link';

// export default function KosarPage() {
//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Page Title */}
//       <Typography variant="h4" gutterBottom>
//         Kosár
//       </Typography>

//       {/* Placeholder Content */}
//       <Typography variant="body1" sx={{ mb: 2 }}>
//         Ez az oldal a kosár tartalmát fogja megjeleníteni.
//       </Typography>

//       {/* Back to Home Button */}
//       <Link href="/" passHref>
//         <Button variant="contained" color="primary">
//           Vissza a főoldalra
//         </Button>
//       </Link>
//     </Box>
//   );
// }
