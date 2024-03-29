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
import { ItemCounterR } from "components/ui";
import { IOrderItem, IProduct } from "interfaces";
import { CartContext, ICartProduct } from "context";

interface Props {
  editable?: boolean;
  products?: any;
}

export const CartListR: FC<Props> = ({ editable = false, products = [] }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: any,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const onChangeQuantity = (product: any, quantity: number) => {
    let maxItemsValue = 3;
    //if (maxItemsValue === 0) return;
    if (product.quantity === 1 && quantity < 1) return;
    if (product.quantity === maxItemsValue && quantity === 1) return;

    product.quantity += quantity;
  };

  const productsToShow = products ? products : cart;
  return (
    <>
      {productsToShow.map((product:any) => {
        return (
          <Grid
            spacing={2}
            sx={{ mb: 1 }}
            key={product.slug + product.size}
            container
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.image}
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
                  Talla: <strong>{product.size}</strong>
                </Typography>

                {editable ? (
                  <ItemCounterR
                    currentValue={product.quantity}
                    maxValue={5}
                    updatedQuantity={(quantity) =>
                      onNewCartQuantityValue(product as ICartProduct, quantity)
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
                <Button
                  onClick={() => removeCartProduct(product as ICartProduct)}
                  variant="text"
                  color="secondary"
                >
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
