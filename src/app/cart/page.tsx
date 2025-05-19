"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { Add, Remove, Delete } from "@mui/icons-material";
import Image from "next/image";
import { TableFooter } from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    sumCart,
  } = useCart();

  const handleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        setQuantity(id, value);
      }
    };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kosár tartalma
      </Typography>

      {cart.length === 0 ? (
        <Typography>Nincs termék a kosárban.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Termék</TableCell>
                  <TableCell align="center">Kép</TableCell>
                  <TableCell align="center">Mennyiség</TableCell>
                  <TableCell align="center">Összeg</TableCell>
                  <TableCell align="center">Törlés</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ár: {item.price.toLocaleString()} Ft
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Link href={`/product/${item.id}`} passHref>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={60}
                          height={60}
                          style={{ borderRadius: 4 }}
                        />
                      </Link>
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                      >
                        <IconButton
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={handleChange(item.id)}
                          inputProps={{
                            min: 1,
                            max: item.stockQuantity,
                            style: {
                              MozAppearance: "textfield",
                              textAlign: "center",
                            },
                          }}
                          sx={{
                            width: 60,
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                              {
                                WebkitAppearance: "none",
                                margin: 0,
                              },
                          }}
                          size="small"
                        />
                        <IconButton
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stockQuantity}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      {(item.quantity * item.price).toLocaleString()} Ft
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography variant="h6">Összesen:</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {sumCart().toLocaleString()} Ft
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <Box mt={3} textAlign="right">
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Kosár ürítése
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
