import { FC } from "react";
import Head from "next/head";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { SideMenu } from "components/ui";
import { AdminNavbar } from "components/admin";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({
  children,
  title = "Admin Page",
  subTitle,
  icon,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 60px" }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} {' '} {title}
          </Typography>

          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </main>

      <footer></footer>
    </>
  );
};
