import { router } from "../trpc";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { routesRouter } from "./routes.router";

export const appRouter = router({
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
  routes: routesRouter,
});

export type AppRouter = typeof appRouter;
