import type { GetServerSideProps, NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { useProducts } from "hooks";
import { FullScreenLoading } from "components/ui";
import { dbProducts } from "database";
import { IProduct } from "interfaces";

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
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

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByQuery(query);

  //TODO: Retornar otros productos si no hay resultados

  return {
    props: {
      products,
    },
  };
};

export default SearchPage;
