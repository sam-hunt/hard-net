import ConstructionIcon from "@mui/icons-material/Construction";
import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material"
import type { Product } from "./api/products"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart } from "./api/api"
import { priceFormatter } from "../utils/price-formatter"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSnackbarAction = () => {
    navigate('/cart');
    closeSnackbar();
  }

  const mutation = useMutation({
    mutationFn: async () => addToCart(product.name, 1),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // Display success snackbar
      enqueueSnackbar(`${product.name} added to cart!`, {
        variant: 'success',
        action: () => (
          <Button onClick={handleSnackbarAction}>
            View cart
          </Button>
        ),
      },)
    },
  });


  return (
    <Card>
      <CardActionArea onClick={() => alert('TODO: Product page')} sx={{ p: 2 }}>
        <Stack height={140} alignItems="center" justifyContent="center">
          <ConstructionIcon fontSize="large" />
        </Stack>
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={() => mutation.mutate()}
          endIcon={<ShoppingCartIcon />}
          loading={mutation.isPending}
        >
          Add to Cart
        </Button>
        <Typography variant="h5">{priceFormatter.format(product.price)}</Typography>
      </CardActions>
    </Card>
  );
}
