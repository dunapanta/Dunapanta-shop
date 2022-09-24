import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
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
import { CartListR, OrderSummary } from "components/cart";
import { ShopLayout } from "components/layouts";
import {
  CreditCardOffOutlined,
  CreditScore,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { dbOrders } from "database";
import { IOrder } from "interfaces";

interface Props {
  order: IOrder;
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;
  return (
    <ShopLayout
      title="Detalles del pedido"
      pageDescription="Detalles del pedido"
    >
      <Typography variant="h1" component="h1">
        Order: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ mt: 2 }}
          label="Orden Pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ mt: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* Cart List */}
          <CartListR products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/*  */}
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">
                Order ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{" "}
                {shippingAddress.address ? `, ${shippingAddress.address}` : ""}
              </Typography>
              <Typography>{shippingAddress.city}</Typography>
              <Typography>{shippingAddress.zip}</Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id = "" } = context.query;

  const session: any = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log("SESSION", { session });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
