import { useContext } from "react";
import { Grid, Typography } from "@mui/material";

import { CartContext } from "context";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "Productos" : "Producto"}
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{subTotal}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{tax}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{total}</Typography>
      </Grid>
    </Grid>
  );
};
