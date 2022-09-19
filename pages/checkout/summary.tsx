import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CardList, OrderSummary } from "components/cart";
import { ShopLayout } from "components/layouts";
import { useContext } from "react";
import { CartContext } from "context";
import { countries } from "utils/countries";

const SumaryPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  if (!shippingAddress) {
    return (
      <ShopLayout
        title="No shipping address"
        pageDescription="No shipping Address"
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ maxWidth: 600 }}>
            <Card>
              <CardContent>
                <Typography variant="h4">Shipping Address</Typography>
                <Typography variant="body1">
                  You have not entered a shipping address. Please enter your
                  shipping address to continue.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <NextLink href="/checkout/address" passHref>
                    <Link>
                      <Button variant="contained" color="primary">
                        Enter Shipping Address
                      </Button>
                    </Link>
                  </NextLink>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </ShopLayout>
    );
  }

  const { firstName, lastName, address, phone, address2, city, country, zip } =
    shippingAddress;

  const onCreateOrder = () => {
    createOrder();
  };

  return (
    <ShopLayout title="Confirmar pedido" pageDescription="Confirmar pedido">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/*  */}
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">
                Order ({numberOfItems}
                {numberOfItems === 1 ? " producto" : " productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              {/* Order Sumary */}
              <OrderSummary />
              {/* Button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confirmar pedido
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SumaryPage;
