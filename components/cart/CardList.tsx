import { FC } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "database/products";
import { ItemCounter } from "components/ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable: boolean;
}

export const CardList: FC<Props> = ({ editable= false }) => {
  return (
    <>
      {productsInCart.map((product) => {
        return (
          <Grid spacing={2} sx={{ mb: 1 }} key={product.slug} container>
            <Grid item xs={3}>
              <NextLink href="/product/slug">
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`products/${product.images[0]}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>M</strong>
                </Typography>

                {editable ? (
                  <ItemCounter />
                ) : (
                  <Typography variant="h6">Cantidad: 1</Typography>
                )}
              </Box>
            </Grid>

            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="body1">
                <strong>$ {product.price}</strong>
              </Typography>

              {editable && (
                <Button variant="text" color="secondary">
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
