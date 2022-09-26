
export interface DashboardSumaryResponse {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoStock: number;
  lowInStock: number;
}
