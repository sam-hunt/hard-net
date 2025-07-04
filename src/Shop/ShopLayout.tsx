import HandymanIcon from "@mui/icons-material/Handyman";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Badge, Box, Container, IconButton, Link, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { Outlet } from "react-router"
import { useCart } from "./api/use-cart";

export const ShopLayout = () => {

  const { cart } = useCart();
  const cartItemCount = cart?.reduce((sum, item) => sum + item.amount, 0);

  return <>
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" component={Link} href="/" color="inherit" alignItems="center" spacing={1} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
          <HandymanIcon />
          <Typography variant="h6" component="div">
            Hardware Store
          </Typography>
        </Stack>
        <Box flex={1} />
        <Tooltip title="Open on Github">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open on github"
            sx={{ mr: 2 }}
            LinkComponent="a"
            href="https://github.com/sam-hunt/hard-net"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cart">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="view cart"
            sx={{ mr: 2 }}
            href="/cart"
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
