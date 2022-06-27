import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { useProducts } from "hooks";
import { FullScreenLoading } from "components/ui";

const MenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=men");
  return (
    <ShopLayout
      title="Dunapanta-Shop - Artículos para Hombres"
      pageDescription="Productos para homnbres"
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
