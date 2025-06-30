import HandymanIcon from "@mui/icons-material/Handyman";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Container, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router"
import { useCart } from "./api/use-cart";

export const ShopLayout = () => {
  const navigate = useNavigate();

  const { cart } = useCart();
  const cartItemCount = cart?.reduce((sum, item) => sum + item.amount, 0);

  return <>
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" onClick={() => navigate('/')} alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
          <HandymanIcon />
          <Typography variant="h6" component="div">
            Hardware Store
          </Typography>
        </Stack>
        <Tooltip title="Cart">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="view cart"
            sx={{ mr: 2 }}
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  </>
}