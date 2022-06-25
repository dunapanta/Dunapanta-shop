import { Chip, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagado",
    description: "Esta pagada la orden",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, name: "John Doe" },
  { id: 2, paid: false, name: "Jane Doe" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de pedidos"
      pageDescription="Historial de pedidos del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de Ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default HistoryPage;
