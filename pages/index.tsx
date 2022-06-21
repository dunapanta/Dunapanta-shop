import type { NextPage } from "next";
import { ShopLayout } from "components/layouts";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title="Dunapanta-Shop - Home"
      pageDescription="Tus productos favoritos en un solo lugar"
    >
      <Typography variant="h1" component="h1">
        Inicio
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
};

export default Home;
