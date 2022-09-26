import { DashboardOutlined } from "@mui/icons-material";
import { AdminLayout } from "components/layouts";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Admin Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <h2>Dashboard</h2>
    </AdminLayout>
  );
};

export default DashboardPage;
