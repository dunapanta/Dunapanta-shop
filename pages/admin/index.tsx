import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import { Grid, Typography } from "@mui/material";
import { SumaryTile } from "components/admin";
import { AdminLayout } from "components/layouts";
import { DashboardSumaryResponse } from "interfaces";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSumaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !error) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoStock,
    lowInStock,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Admin Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SumaryTile
          title={numberOfOrders}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={notPaidOrders}
          subTitle="Ordenes pagadas"
          icon={<CreditCardOffOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={numberOfClients}
          subTitle="Clientes"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={numberOfProducts}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={productsWithNoStock}
          subTitle="Sin Stock"
          icon={
            <CancelPresentationOutlined color="warning" sx={{ fontSize: 40 }} />
          }
        />

        <SumaryTile
          title={lowInStock}
          subTitle="Bajo Inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SumaryTile
          title={refreshIn}
          subTitle="Actualización"
          icon={
            <AccessTimeFilledOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
