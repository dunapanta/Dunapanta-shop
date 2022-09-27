import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import useSWR from "swr";
import { AdminLayout } from "components/layouts";
import { PeopleOutline } from "@mui/icons-material";

import { IUser } from "interfaces";
import { shopApi } from "api";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  if (!data && !error) return <Typography variant="h4">Loading...</Typography>;

  const onRoleUpdate = async (userId: string, newRole: string) => {
    const previousUser = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    console.log("newRole", newRole);
    try {
      await shopApi.put("/admin/users", { userId, role: newRole });
    } catch (err) {
      setUsers(previousUser);
      console.log(err);
      alert("Error updating user role");
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre Completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            sx={{ width: "300px" }}
            onChange={(event) => onRoleUpdate(row.id, event.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
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
        <Grid item xs={12} sx={{ height: 650, width: "95%" }}>
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
