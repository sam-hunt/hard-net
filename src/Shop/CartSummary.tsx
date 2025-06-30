import { Box, Divider, Stack, Typography } from "@mui/material"
import { priceFormatter } from "../utils/price-formatter";
import { useCart } from "./api/use-cart";

export const CartSummary = () => {
  const { cart, isLoading } = useCart();

  console.log(cart);
  const subtotal = isLoading ? 0 : cart?.reduce((sum, item) => sum + (item.amount * item.price), 0) || 0;
  const shipping = isLoading ? 0 : cart?.length || 0 > 0 ? 25 : 0;
  const total = isLoading ? 0 : subtotal + shipping;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color="secondary">
          Subtotal
        </Typography>
        <Typography variant="h5" color="secondary">
          {priceFormatter.format(subtotal)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color="secondary">
          Shipping
        </Typography>
        <Typography variant="h5" color="secondary">
          {priceFormatter.format(shipping)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">
          Total
        </Typography>
        <Typography variant="h3">
          {priceFormatter.format(total)}
        </Typography>
      </Stack>
    </Box>
  );
}