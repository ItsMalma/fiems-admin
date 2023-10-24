import { router } from "../trpc";
import { customerGroupsRouter } from "./customerGroups.route";
import { customersRouter } from "./customers.route";

export const appRouter = router({
  customerGroups: customerGroupsRouter,
  customers: customersRouter,
});

export type AppRouter = typeof appRouter;
