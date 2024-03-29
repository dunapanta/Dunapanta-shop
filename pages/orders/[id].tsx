import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
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
import { shopApi } from "api";

export type OrderResponeBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  const { shippingAddress } = order;

  const onOrderComplete = async (details: OrderResponeBody) => {
    if (details.status !== "COMPLETED") {
      return alert("Payment failed");
    }

    setIsPaying(true);

    try {
      const { data } = await shopApi.post("/orders/pay", {
        transactionId: details.id,
        orderId: order._id,
      });

      //refresh the page to get updated order
      router.reload();
    } catch (err) {
      setIsPaying(false);
      console.log(err);
      alert("Payment failed");
    }
  };

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

      <Grid container className="fadeIn">
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
              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  tax: order.tax,
                  subTotal: order.subTotal,
                  total: order.total,
                }}
              />
              {/* Button */}
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {isPaying && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    className="fadeIn"
                  >
                    <CircularProgress />
                  </Box>
                )}

                {/* Paypal Buttons */}
                <Box
                  sx={{ display: isPaying ? "none" : "flex", flex: 1 }}
                  flexDirection="column"
                >
                  {order.isPaid ? (
                    <Chip
                      sx={{ mt: 2 }}
                      label="Orden Pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderComplete(details);
                          //console.log({ details });
                          //const name = details.payer.name!.given_name;
                          //alert(`Transaction completed by ${name}`);
                        });
                      }}
                    />
                  )}
                </Box>
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
