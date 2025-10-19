# ChargeNet Shopping Cart

A modern React-based e-commerce demo application showcasing a product catalog and shopping cart functionality with simulated network latency.

## Live Demo

Visit the live application: [ChargeNet Shopping Cart](https://sam-hunt.github.io/hard-net/)

## Features

- Browse a product catalog with responsive grid layout
- Add/remove items from shopping cart with quantity management
- Persistent cart state using localStorage
- Loading skeletons and simulated network latency (250ms) for realistic UX
- Snackbar notifications on cart actions
- Responsive Material-UI design with custom theme
- GitHub Pages deployment

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **TanStack Query (React Query)** - Server state management and caching
- **Material-UI (MUI) v7** - Component library and styling
- **localStorage** - Cart persistence

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/sam-hunt/hard-net.git
cd hard-net

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── App/              # Application shell
│   ├── App.tsx       # Router setup and global providers
│   ├── theme.ts      # Custom MUI theme
│   └── LinkBehaviour.tsx  # MUI + React Router integration
│
├── Shop/             # Shopping features
│   ├── api/          # Data layer
│   │   ├── products.ts    # Product data and types
│   │   ├── api.ts         # Cart operations (localStorage)
│   │   └── use-cart.ts    # React Query cart hook
│   │
│   ├── ShopPage.tsx       # Product catalog
│   ├── CartPage.tsx       # Shopping cart
│   ├── ShopLayout.tsx     # Layout with app bar
│   ├── ProductCard.tsx    # Product display
│   ├── CartItemRow.tsx    # Cart item display
│   └── CartSummary.tsx    # Cart totals
│
└── utils/            # Shared utilities
    ├── sleep.ts           # Latency simulation
    └── price-formatter.ts # Currency formatting
```

## Key Architecture Patterns

### State Management

- **TanStack Query** manages server state with automatic caching and refetching
- Cart data uses `['cart']` query key with 250ms simulated latency
- All cart operations automatically trigger refetch to keep UI in sync

### Cart Persistence

- Cart stored in localStorage (key: `hardnet-cart`)
- Data structure: `Cart = CartItem[]` where `CartItem = Product & { amount: number }`
- Product names used as identifiers

### Routing

- `/` - Product catalog
- `/cart` - Shopping cart
- Base path configured for both development and GitHub Pages deployment

### Latency Simulation

All API calls simulate 250ms network latency to demonstrate loading states and realistic user experience.

## Type Definitions

```typescript
type Product = {
  name: string;
  price: number;
};

type CartItem = Product & {
  amount: number;
};

type Cart = CartItem[];
```

## Known Limitations

Time constraints led to these documented omissions:

- No numeric input for cart quantities (increment/decrement only)
- No decimal pricing support
- No product pagination
- No test suite (Vitest planned)
- No pre-commit hooks (Husky planned)
- Limited error handling
- Type-aware ESLint not fully configured

## Contributing

This is a demo project, but suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## License

MIT
