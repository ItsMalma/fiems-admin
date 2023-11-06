import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { coasRouter } from "./coas.router";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { portsRouter } from "./ports.router";
import { pricesRouter } from "./price.router";
import { productCategoriesRouter } from "./productCategories.router";
import { productsRouter } from "./products.router";
import { routesRouter } from "./routes.router";
import { salesRouter } from "./sales.router";
import { uangJalanRouter } from "./uangJalan.router";
import { vehicleRouter } from "./vehicles.router";
import { vesselRouter } from "./vessels.router";

export const appRouter = router({
  auth: authRouter,
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
  routes: routesRouter,
  ports: portsRouter,
  sales: salesRouter,
  vehicle: vehicleRouter,
  vessel: vesselRouter,
  uangJalan: uangJalanRouter,
  prices: pricesRouter,
  productCategories: productCategoriesRouter,
  products: productsRouter,
  coas: coasRouter,
});

export type AppRouter = typeof appRouter;
