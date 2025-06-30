import { products, type Cart, type Product } from './products';
import { sleep } from '../../utils/sleep';

const latencyMs = 250;
const localStorageCartKey = 'hardnet-cart'

export const fetchProducts = async (): Promise<Product[]> => {
  await sleep(latencyMs);
  return products;
}

export const fetchCart = async (delayMs: number = latencyMs): Promise<Cart> => {
  await sleep(delayMs);
  const cartJson = localStorage.getItem(localStorageCartKey) || '[]';
  try {
    return JSON.parse(cartJson);
  } catch (e) {
    console.error('Bad cart JSON in local storage, resetting...');
    localStorage.setItem(localStorageCartKey, '[]');
    return [];
  }
}

export const addToCart = async (productName: Product['name'], amount: number): Promise<void> => {
  const cart = await fetchCart();
  const product = products.find(p => p.name === productName);
  if (!product) throw `Failed to find product with name ${productName}`;
  if (!cart.some(p => p.name === productName)) cart.push({ ...product, amount: 0 });
  const cartItem = cart.find(p => p.name === productName)!;
  cartItem.amount += amount;
  localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
}

export const removeFromCart = async (productName: Product['name'], amount: number): Promise<void> => {
  const cart = await fetchCart();
  const cartItem = cart.find(p => p.name === productName)!;
  if (!cartItem) return;
  cartItem.amount = Math.max(cartItem.amount - amount, 0);
  localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
}

export const deleteFromCart = async (productName: Product['name']): Promise<void> => {
  const cart = await fetchCart();
  cart.splice(cart.findIndex(p => p.name === productName), 1);
  localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
}