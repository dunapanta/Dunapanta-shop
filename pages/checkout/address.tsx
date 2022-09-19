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
import { useContext, useEffect, useState } from "react";
import { CartContext } from "context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip?: string;
  city: string;
  country: string;
  phone?: string;
};

const getAddressFromCookies = (): FormData => {
  const firstName = Cookies.get("firstName") || "";
  const lastName = Cookies.get("lastName") || "";
  const address = Cookies.get("address") || "";
  const address2 = Cookies.get("address2") || "";
  const zip = Cookies.get("zip") || "";
  const city = Cookies.get("city") || "";
  const country = Cookies.get("country") || "";
  const phone = Cookies.get("phone") || "";

  return {
    firstName,
    lastName,
    address,
    address2,
    zip,
    city,
    country,
    phone,
  };
};

const Address = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });
  const { updateAddress } = useContext(CartContext);
  const [defaultCountry, setDefaultCountry] = useState("");

  const router = useRouter();

  useEffect(() => {
    const addressFromCookies = getAddressFromCookies();
    reset(addressFromCookies);
    setDefaultCountry(addressFromCookies.country);
  }, [reset, getAddressFromCookies]);

  const onSubmit = (data: FormData) => {
    updateAddress(data);
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
              {!!defaultCountry && (
                <TextField
                  select
                  variant="outlined"
                  label="País"
                  defaultValue={defaultCountry}
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
              )}
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
