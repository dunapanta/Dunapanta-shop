import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "components/layouts";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.log(data);
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sessión
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password")}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">Aún no tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
