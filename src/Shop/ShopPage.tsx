import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./api/api"
import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";

export const ShopPage = () => {
  const productsQuery = useQuery({ queryKey: ['products'], queryFn: fetchProducts, });

  return (
    <Grid container spacing={2} pt={2}>
      {productsQuery.data?.map(product => (
        <Grid key={product.name} size={{ xs: 12, sm: 6, lg: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}