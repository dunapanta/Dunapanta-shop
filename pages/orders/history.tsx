import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "components/layouts";
import { dbOrders } from "database";
import { IOrder } from "interfaces";

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
  {
    field: "orderLink",
    headerName: "Detalles de la compra",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Detalle</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, name: "John Doe", orderLink: "/orders/1" },
  { id: 2, paid: false, name: "Jane Doe", orderLink: "/orders/2" },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
