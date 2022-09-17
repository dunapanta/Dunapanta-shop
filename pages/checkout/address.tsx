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
import { useForm } from "react-hook-form";
import { ShopLayout } from "components/layouts";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { jwt } from "utils";
import { countries } from "utils/countries";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zip?: string;
  city: string;
  country: string;
  phone?: string;
};

const Address = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: countries[0].code,
      phone: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    Cookies.set("firsName", data.firstName);
    Cookies.set("lastName", data.lastName);
    Cookies.set("address", data.address);
    Cookies.set("address2", data.address2);
    data.zip && Cookies.set("zip", data.zip);
    Cookies.set("city", data.city);
    Cookies.set("country", data.country);
    data.phone && Cookies.set("phone", data.phone);

    router.push("/checkout/summary");
  };
  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              {...register("firstName", {
                required: "El correo es requerido",
              })}
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              {...register("lastName", {
                required: "El correo es requerido",
              })}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              {...register("address", {
                required: "El correo es requerido",
              })}
              error={errors.address ? true : false}
              helperText={errors.address ? errors.address.message : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="outlined"
              fullWidth
              {...register("address2")}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <FormControl fullWidth>
              <InputLabel>País</InputLabel>
              <TextField
                select
                variant="outlined"
                label="País"
                //defaultValue={countries[0].code}
                {...register("country", {
                  required: "El correo es requerido",
                })}
                error={errors.country ? true : false}
                //helperText={errors.country ? errors.country.message : ""}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ borderRadius: 5, borderWidth: 3 }}>
            <TextField
              label="Ciudad"
              variant="outlined"
              fullWidth
              {...register("city", {
                required: "El correo es requerido",
              })}
              error={errors.city ? true : false}
              helperText={errors.city ? errors.city.message : ""}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
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
