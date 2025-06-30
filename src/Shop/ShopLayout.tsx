import HandymanIcon from "@mui/icons-material/Handyman";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Container, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router"

export const ShopLayout = () => {
  const navigate = useNavigate();

  return <>
    <AppBar position="static">
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
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
    <Container>
      <Outlet />
    </Container>
  </>
}