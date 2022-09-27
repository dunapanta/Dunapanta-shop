import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import useSWR from "swr";
import { AdminLayout } from "components/layouts";
import React from "react";
import { PeopleOutline } from "@mui/icons-material";

import { IUser } from "interfaces";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  if (!data && !error) return <Typography variant="h4">Loading...</Typography>;

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    { field: "role", headerName: "Rol", width: 300 },
  ];

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Mantenimiento de usuarios"
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
