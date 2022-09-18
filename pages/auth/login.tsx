import { useContext, useEffect, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { signIn, getProviders } from "next-auth/react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { AuthLayout } from "components/layouts";
import { validations } from "utils";
import { shopApi } from "api";
import { AuthContext } from "context";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  //const { loginUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    //next auth
    await signIn("credentials", { email, password });

    // My implementation
    /* const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    const destination = router.query.p?.toString() || "/";
    router.replace(destination); */
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

              <Chip
                label="No se reconoce usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
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
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
              >
                <Link underline="always">Aún no tienes cuenta?</Link>
              </NextLink>
            </Grid>
            {/* Github */}
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((provider: any) => {

                if (provider.id === "credentials") return <div key="credentials"></div>;

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const { p = "/" } = context.query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
