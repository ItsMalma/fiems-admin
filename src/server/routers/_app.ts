import { router } from "../trpc";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { portsRouter } from "./ports.router";
import { pricesRouter } from "./price.router";
import { productCategoriesRouter } from "./productCategories.router";
import { productsRouter } from "./products.router";
import { routesRouter } from "./routes.router";

export const appRouter = router({
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
  routes: routesRouter,
  ports: portsRouter,
  prices: pricesRouter,
  productCategories: productCategoriesRouter,
  products: productsRouter,
});

export type AppRouter = typeof appRouter;
