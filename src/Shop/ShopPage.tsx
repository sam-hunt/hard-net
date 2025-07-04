import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./api/api"
import { Grid, Skeleton, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";

export const ShopPage = () => {
  const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts, });

  return (
    <>
      <Typography variant="h2" component="h1" my={3}>Products</Typography>
      <Grid container spacing={2} pt={2}>
        {isLoading
          ? [0.5, 0.4, 0.3, 0.2, 0.1].map(opacity => (
            <Grid key={opacity.toString()} size={{ xs: 12, sm: 6, lg: 4 }} sx={{ opacity }}>
              <Skeleton variant="rounded" height={294} width="100%">
                <ProductCard product={{ name: 'skeleton', price: 0 }} />
              </Skeleton>
            </Grid>
          ))
          : products?.map(product => (
            <Grid key={product.name} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
