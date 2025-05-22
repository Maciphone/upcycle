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
import { Add, Remove, Delete, Language } from "@mui/icons-material";
import Image from "next/image";
import { TableFooter } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelector } from "react-redux";
import { selectedLanguage } from "@/redux/languageSlice";

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

  const lang = useSelector(selectedLanguage);
  const { t } = useTranslation(lang);

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
        {t("cart.Kosár tartalma")}
      </Typography>

      {cart.length === 0 ? (
        <Typography>{t("cartNincs termék a kosárban")}</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("cart.Termék")}</TableCell>
                  <TableCell align="center">{t("cart.Kép")}</TableCell>
                  <TableCell align="center">{t("cart.Mennyiség")}</TableCell>
                  <TableCell align="center">{t("cart.Összeg")}</TableCell>
                  <TableCell align="center">{t("cart.Törlés")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t("cart.Ár")}: {item.price.toLocaleString()} Ft
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
                    <Typography variant="h6">{t("cart.Összesen")}</Typography>
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
              {t("cart.Kosár ürítése")}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
