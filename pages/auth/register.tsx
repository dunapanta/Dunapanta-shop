import NextLink from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";

import { AuthLayout } from "components/layouts";
import { validations } from "utils";
import { shopApi } from "api";
import { AuthContext } from "context";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Registrarse
              </Typography>

              <Chip
                label="Usuario ya registrado"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 3,
                    message: "Minimo 3 caracteres",
                  },
                })}
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "El correo es requerido",
                  validate: (val) => validations.isEmail(val),
                })}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Minimo 6 caracteres",
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : ""}
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
                Registrarse
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
                passHref
              >
                <Link underline="always">Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
