import type { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductList } from "components/products";
import { dbProducts } from "database";
import { IProduct } from "interfaces";

interface Props {
  products: IProduct[];
  areThereProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, areThereProducts, query }) => {
  return (
    <ShopLayout
      title={`Busqueda: ${query} `}
      pageDescription={`Productos encontrados para ${query}`}
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>
      {areThereProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          {`Productos encontrados para ${query}`}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            {`No se encontraton productos para ${query}`}
          </Typography>
        </Box>
      )}

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
  const areThereProducts = products.length > 0;

  //Retornar otros productos si no hay resultados
  if (!areThereProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      areThereProducts,
      query,
    },
  };
};

export default SearchPage;
