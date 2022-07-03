import { useState } from "react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "components/layouts";
import { ProductSlideshow, SizeSelector } from "components/products";
import { ItemCounter } from "components/ui";
import { db, dbProducts } from "database";
import { IProduct, ISize } from "interfaces";
import { ICartProduct } from "context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  /* const router = useRouter();
  const { products: product, isLoading } = useProducts(
    `/products/${router.query.slug}`
  ); */

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    quantity: 1,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onChangeQuantity = (quantity: number) => {
    if (tempCartProduct.quantity === 1 && quantity < 1) return;
    if (tempCartProduct.quantity === product.inStock && quantity === 1) return;
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity: currentProduct.quantity + quantity,
    }));
  };

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
              <ItemCounter
                quantity={tempCartProduct.quantity}
                onChangeQuantity={(quantity) => onChangeQuantity(quantity)}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={(size) => onSelectedSize(size)}
              />
            </Box>

            {/* Add to cart */}
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn">
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                color="error"
                label="No hay disponibles"
                variant="outlined"
              />
            )}

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
// Option Server Side Rendering
/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
}; */

// Option Static Generation

export const getStaticPaths: GetStaticPaths = async () => {
  const productsSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productsSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
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
    //revalidate every week
    revalidate: 60 * 60 * 24 * 7,
  };
};

export default ProductPage;
