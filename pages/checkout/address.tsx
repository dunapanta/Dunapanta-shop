import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ShopLayout } from "components/layouts";

const Address = () => {
  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección">
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <TextField label="Nombre" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <TextField label="Apellido" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <TextField label="Dirección" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <TextField
            label="Dirección 2 (opcional)"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <FormControl fullWidth>
            <InputLabel>País</InputLabel>
            <Select variant="outlined" label="País" value={1}>
              <MenuItem value={1}>Ecuador</MenuItem>
              <MenuItem value={1}>Colombia</MenuItem>
              <MenuItem value={1}>Bolivia</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
          <TextField label="Ciudad" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default Address;
