import { FC, useContext } from "react";
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
import { ItemCounter } from "components/ui";
import { IProduct } from "interfaces";
import { CartContext, ICartProduct } from "context";

interface Props {
  editable?: boolean;
}

export const CardList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  const onChangeQuantity = (product: ICartProduct, quantity: number) => {
    let maxItemsValue = 3;
    //if (maxItemsValue === 0) return;
    if (product.quantity === 1 && quantity < 1) return;
    if (product.quantity === maxItemsValue && quantity === 1) return;

    product.quantity += quantity;
  };
  return (
    <>
      {cart.map((product) => {
        console.log("P:",product);
        return (
          <Grid spacing={2} sx={{ mb: 1 }} key={product.slug + product.size} container>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images}`}
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
                  <ItemCounter
                    quantity={product.quantity}
                    onChangeQuantity={(quantity) =>
                      onChangeQuantity(product, quantity)
                    }
                  />
                ) : (
                  <Typography variant="h6">
                    Cantidad: {product.quantity}
                  </Typography>
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
