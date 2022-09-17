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
import { GetServerSideProps } from "next";
import { jwt } from "utils";
import { countries } from "utils/countries";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

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
            <Select variant="outlined" label="País" value={"CRI"}>

              {
                countries.map(country => (
                  <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                ))
              }
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

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;
  let userId = "";
  let isValidToken = false;

  try {
    userId = await jwt.verifyToken(token);
    isValidToken = true;
  } catch (err) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/address",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}; */

export default Address;
