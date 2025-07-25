export interface Product {
  name: string;
  price: number;
}

export type CartItem = Product & { amount: number };
export type Cart = CartItem[];

export const products: Product[] = [
  {
    name: "Sledgehammer",
    price: 124.95
  },
  {
    name: "Axe",
    price: 199.00
  },
  {
    name: "Bandsaw",
    price: 1095.00
  },
  {
    name: "Chisel",
    price: 15.00
  },
  {
    name: "Hacksaw",
    price: 21.95
  }
];