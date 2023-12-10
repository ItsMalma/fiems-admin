import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { coasRouter } from "./coas.router";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { inquiriesRouter } from "./inquiries.router";
import { jobOrdersRouter } from "./jobOrders.router";
import { portsRouter } from "./ports.router";
import { pricesRouter } from "./price.router";
import { productCategoriesRouter } from "./productCategories.router";
import { productsRouter } from "./products.router";
import { quotationsRouter } from "./quotations.router";
import { routesRouter } from "./routes.router";
import { salesRouter } from "./sales.router";
import { uangJalanRouter } from "./uangJalan.router";
import { vehiclesRouter } from "./vehicles.router";
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
  jobOrders: jobOrdersRouter,
});

export type AppRouter = typeof appRouter;
