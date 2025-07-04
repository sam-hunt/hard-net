import { Button, Divider, Stack, Typography } from "@mui/material"
import { priceFormatter } from "../utils/price-formatter";
import { useCart } from "./api/use-cart";
import { useNavigate } from "react-router";

export const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // TODO: Abstract to pure function and add tests
  const subtotal = cart?.reduce((sum, item) => sum + (item.amount * item.price), 0) || 0;
  const shipping = cart?.length || 0 > 0 ? 25 : 0;
  const total = subtotal + shipping;

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color="secondary">
          Subtotal
        </Typography>
        <Typography variant="h5" color="secondary">
          {priceFormatter.format(subtotal)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" pb={2}>
        <Typography variant="h5" color="secondary">
          Shipping
        </Typography>
        <Typography variant="h5" color="secondary">
          {priceFormatter.format(shipping)}
        </Typography>
      </Stack>
      <Divider variant="middle" />
      <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
        <Typography variant="h4">
          Total
        </Typography>
        <Typography variant="h3">
          {priceFormatter.format(total)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" pt={4}>
        <Button
          onClick={() => navigate('/')}
          variant="outlined"
        >
          Continue shopping
        </Button>
      </Stack>
    </Stack>
  );
}
