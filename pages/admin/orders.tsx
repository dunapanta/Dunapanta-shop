import React from "react";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { AdminLayout } from "components/layouts";

const OrdersPage = () => {
  return (
    <AdminLayout
      title="Ordenes"
      subTitle="Mantenimiento de Ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
      <h1>Orders Page</h1>
    </AdminLayout>
  );
};

export default OrdersPage;
