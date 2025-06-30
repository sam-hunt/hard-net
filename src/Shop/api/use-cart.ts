import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "./api";

export const useCart = () => {
  const { data: cart, isLoading } = useQuery({ queryKey: ['cart'], queryFn: async () => fetchCart(250), placeholderData: [] });
  return { cart, isLoading };
}
