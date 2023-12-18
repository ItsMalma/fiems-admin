import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { bastRouter } from "./bast.router";
import { coasRouter } from "./coas.router";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { inquiriesRouter } from "./inquiries.router";
import { insuranceRouter } from "./insurance.router";
import { jobOrdersRouter } from "./jobOrders.router";
import { packingListRouter } from "./packingList.router";
import { portsRouter } from "./ports.router";
import { pricesRouter } from "./price.router";
import { productCategoriesRouter } from "./productCategories.router";
import { productsRouter } from "./products.router";
import { quotationsRouter } from "./quotations.router";
import { routesRouter } from "./routes.router";
import { salesRouter } from "./sales.router";
import { spmRouter } from "./spm.router";
import { suratJalanRouter } from "./suratJalan.router";
import { uangJalanRouter } from "./uangJalan.router";
import { vehiclesRouter } from "./vehicles.router";
import { vesselSchedulesRouter } from "./vesselSchedules.router";
import { vesselsRouter } from "./vessels.router";

export const appRouter = router({
  auth: authRouter,
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
  routes: routesRouter,
  ports: portsRouter,
  sales: salesRouter,
  vehicles: vehiclesRouter,
  vessels: vesselsRouter,
  uangJalan: uangJalanRouter,
  prices: pricesRouter,
  productCategories: productCategoriesRouter,
  products: productsRouter,
  coas: coasRouter,
  quotations: quotationsRouter,
  inquiries: inquiriesRouter,
  vesselSchedules: vesselSchedulesRouter,
  jobOrders: jobOrdersRouter,
  spm: spmRouter,
  suratJalan: suratJalanRouter,
  bast: bastRouter,
  packingList: packingListRouter,
  insurance: insuranceRouter,
});

export type AppRouter = typeof appRouter;
