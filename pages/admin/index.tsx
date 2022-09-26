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
import { Grid } from "@mui/material";
import { SumaryTile } from "components/admin";
import { AdminLayout } from "components/layouts";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Admin Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SumaryTile
          title={50}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={50}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={3}
          subTitle="Ordenes pagadas"
          icon={<CreditCardOffOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={3}
          subTitle="Clientes"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={30}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SumaryTile
          title={10}
          subTitle="Sin Stock"
          icon={
            <CancelPresentationOutlined color="warning" sx={{ fontSize: 40 }} />
          }
        />

        <SumaryTile
          title={40}
          subTitle="Bajo Inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SumaryTile
          title={10}
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
