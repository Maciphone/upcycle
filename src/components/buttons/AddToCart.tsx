import { Button } from "@mui/material";
import { useCart } from "@/context/CartContext";

type AddToCartProps = {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
    category?: string;
    stockQuantity?: number;
  };
  quantity?: number;
  children?: React.ReactNode;
};

export default function AddToCart({
  product,
  quantity = 1,
  children,
}: AddToCartProps) {
  const { addToCart } = useCart();

  return (
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
          stockQuantity: product.stockQuantity ?? 0,
        })
      }
    >
      {t("[id].Kosárba")}
    </Button>
  );
}
