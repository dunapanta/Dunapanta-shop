import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme } from "../themes";
import { UiProvider, CartProvider, AuthProvider } from "context";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChildren, setShowChildren] = useState(false);
  useEffect(() => {
    setShowChildren(true);
  }, []);
  if (!showChildren) return null;

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
