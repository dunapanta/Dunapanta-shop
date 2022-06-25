import NextLink from "next/link";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CardList, OrderSummary } from "components/cart";
import { ShopLayout } from "components/layouts";
import {
  CreditCardOffOutlined,
  CreditScore,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Detalles del pedido"
      pageDescription="Detalles del pedido"
    >
      <Typography variant="h1" component="h1">
        Order: 3423463
      </Typography>

      {/* <Chip
        sx={{ mt: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ mt: 2 }}
        label="Orden Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/*  */}
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">Order (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>Daniel Unapanta</Typography>
              <Typography>Calle siempre viva</Typography>
              <Typography>456456</Typography>
              <Typography>Calle siempre viva</Typography>
              <Typography>+ 593 5645</Typography>

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
                <h1>Pagar</h1>
                <Chip
                  sx={{ mt: 2 }}
                  label="Orden Pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
