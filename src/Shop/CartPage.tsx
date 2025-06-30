import { Grid, Stack, Typography } from "@mui/material";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";
import { useCart } from "./api/use-cart";

export const CartPage = () => {
  const { cart, isLoading } = useCart()

  const renderCartEmpty = !isLoading && (cart?.length || 0) <= 0

  return (
    <Grid container p={2} rowSpacing={3} columnSpacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        {renderCartEmpty && <Typography variant="h3">Cart is empty</Typography>}
        {isLoading && <Typography variant="h3">Cart is loading...</Typography>}
        {!isLoading &&
          <Stack spacing={3}>
            {cart?.map(item => (
              <CartItemRow key={item.name} item={item} />
            ))}
          </Stack>
        }
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CartSummary />
      </Grid>
    </Grid >
  )
}