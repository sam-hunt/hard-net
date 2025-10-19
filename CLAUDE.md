# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChargeNet Shopping Cart - A React-based e-commerce demo application built with Vite, featuring a product catalog and shopping cart with simulated latency. The project is deployed to GitHub Pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (builds and deploys)
npm run deploy
```

## Architecture

### Application Structure

The app follows a React Router + TanStack Query architecture:

- **App/**: Application shell with routing, theme, and global providers
  - Sets up React Router with base path handling (dev vs production)
  - Configures QueryClient, ThemeProvider, and SnackbarProvider
  - Uses `LinkBehaviour.tsx` to integrate MUI components with React Router

- **Shop/**: All shopping-related UI components and API logic
  - **UI Components**: ProductCard, CartItemRow, CartSummary, ShopPage, CartPage, ShopLayout
  - **API Layer** (`Shop/api/`): All data fetching and cart operations
    - `products.ts`: Static product data and type definitions
    - `api.ts`: Cart operations using localStorage (addToCart, removeFromCart, deleteFromCart, fetchCart, fetchProducts)
    - `use-cart.ts`: React Query hook for cart state management

- **utils/**: Shared utilities (sleep for latency simulation, price-formatter)

### State Management

- **TanStack Query**: Manages server state and caching for cart and products
  - Cart data uses `['cart']` query key
  - Cart hook in `use-cart.ts` includes 250ms simulated latency
  - `placeholderData: []` prevents undefined cart states

- **localStorage**: Cart persistence (key: `hardnet-cart`)
  - Cart data structure: `Cart = CartItem[]` where `CartItem = Product & { amount: number }`
  - Products use `name` as identifier (not surrogate keys)

### Routing

- `/` - Product catalog (ShopPage)
- `/cart` - Shopping cart (CartPage)
- Base path differs by environment:
  - Development: `/`
  - Production (GitHub Pages): `/hard-net/`
  - Handled in both `vite.config.ts` and `App.tsx`

### Styling

- Material-UI (MUI) v7 with custom theme (`App/theme.ts`)
- Roboto font loaded from @fontsource
- CssBaseline for consistent styling

## Key Patterns

### API Latency Simulation
All API calls in `api.ts` use `sleep(latencyMs)` to simulate network latency (default 250ms). This demonstrates loading states.

### Cart Mutations
Cart operations modify localStorage directly and rely on React Query's refetch behavior. The cart query automatically refetches to reflect changes.

### Type Safety
- `Product`: `{ name: string, price: number }`
- `CartItem`: `Product & { amount: number }`
- `Cart`: `CartItem[]`
- Product names are used as identifiers throughout

## Known Limitations (from DESIGN.md)

The following are documented time-pressure omissions:
- No numeric input for cart item quantities
- No decimal pricing support
- No product pagination
- No Vitest tests
- No Husky precommit hooks
- Type-aware ESLint config not expanded
- Limited error handling
- Biome not configured
