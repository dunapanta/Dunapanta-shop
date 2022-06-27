import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { useProducts } from "hooks";
import { FullScreenLoading } from "components/ui";

const WomenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts(
    "/products?gender=women"
  );
  return (
    <ShopLayout
      title="Dunapanta-Shop - Artículos para Mujeres"
      pageDescription="Productos para mujeres"
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para mujeres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
