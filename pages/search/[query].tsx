import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { useProducts } from "hooks";
import { FullScreenLoading } from "components/ui";

const SearchPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products");
  return (
    <ShopLayout
      title="Buscar Productos"
      pageDescription="Tus productos favoritos en un solo lugar"
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Product Shirt 123
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default SearchPage;
