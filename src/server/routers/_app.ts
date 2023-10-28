import { router } from "../trpc";
import { customerGroupsRouter } from "./customerGroups.router";
import { customersRouter } from "./customers.router";
import { coaRouter } from "./coa.router";
import { portsRouter } from "./ports.router";
import { routesRouter } from "./routes.router";
import { salesRouter } from "./sales.router";
import { uangJalanRouter } from "./uangJalan.router";
import { vehicleRouter } from "./vehicles.router";
import { vesselRouter } from "./vessels.router";

export const appRouter = router({
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
  routes: routesRouter,
  ports: portsRouter,
  sales: salesRouter,
  vehicle: vehicleRouter,
  vessel: vesselRouter,
  uangJalan: uangJalanRouter,
  mainCoa: coaRouter
});

export type AppRouter = typeof appRouter;
