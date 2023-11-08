import {
  findAllCityByProvince,
  findAllProvince,
} from "@/server/stores/province.store";
import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  RouteForm,
  RouteTableRow,
  extractRouteCode,
  routeInput,
} from "../dtos/route.dto";
import {
  createRoute,
  deleteRoute,
  findAllRoute,
  findNextRouteCode,
  findRouteByCode,
  updateRoute,
} from "../stores/route.store";
import { publicProcedure, router } from "../trpc";

export const routesRouter = router({
  getTableRows: publicProcedure.query<RouteTableRow[]>(async () => {
    return (await findAllRoute()).map((route) =>
      RouteTableRow.fromModel(route)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
        province: z.string().optional(),
      })
    )
    .query<{
      defaultValue: RouteForm;
      provinces: { label: string; value: string }[];
      cities: { label: string; value: string }[];
    }>(async ({ input }) => {
      const provinces = findAllProvince().map((province) => ({
        label: province,
        value: province,
      }));

      const cities = input.province
        ? findAllCityByProvince(input.province).map((city) => ({
            label: city,
            value: city,
          }))
        : [];

      let defaultValue = RouteForm.initial;
      defaultValue.code = await findNextRouteCode();

      if (input.code) {
        defaultValue = RouteForm.fromModel(await findRouteByCode(input.code));
      }

      return { defaultValue, provinces, cities };
    }),

  getOptions: publicProcedure.query(async () =>
    (await findAllRoute()).map((route) => ({
      label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
      value: route.code,
    }))
  ),

  save: publicProcedure
    .input(routeInput)
    .input(
      z.object({
        code: validateCode(
          (value) => !isNaN(extractRouteCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.code === undefined) {
        return await createRoute(await findNextRouteCode(), input);
      }
      return await updateRoute(input.code, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        code: validateCode((value) => !isNaN(extractRouteCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteRoute(input.code);
    }),
});
