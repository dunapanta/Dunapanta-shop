import { Box, CircularProgress, Typography } from "@mui/material";
import { ShopLayout } from "components/layouts";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography variant="h3" fontWeight={200} sx={{ mb: 2, fontSize: 16 }}>
        Cargando...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
