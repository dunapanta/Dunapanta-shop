import { Box, Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";
import React from "react";

const NotFound = () => {
  return (
    <ShopLayout title="Page" pageDescription="Uups No se ha encontrado nada">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={100} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>No encontramos resultados</Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFound;
