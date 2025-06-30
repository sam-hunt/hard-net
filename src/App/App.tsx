import './App.css'
import { HashRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { ShopLayout } from '../Shop/ShopLayout';
import { ShopPage } from '../Shop/ShopPage';
import { CartPage } from '../Shop/CartPage';
import { theme } from './theme';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter >
          <Routes>
            <Route element={<ShopLayout />}>
              <Route index element={<ShopPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </HashRouter >
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
