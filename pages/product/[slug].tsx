import { GetServerSideProps, NextPage } from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductSlideshow, SizeSelector } from "components/products";
import { ItemCounter } from "components/ui";
import { db, dbProducts } from "database";
import { IProduct } from "interfaces";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  /* const router = useRouter();
  const { products: product, isLoading } = useProducts(
    `/products/${router.query.slug}`
  ); */

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* title */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            {/* price */}
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            {/* quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              {/* Item Counter */}
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* Add to cart */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip
              label="No hay disponibilidad"
              color="error"
              variant="outlined"
            /> */}

            {/* description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
