import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  VehicleForm,
  VehicleTableRow,
  vehicleInput,
} from "../dtos/vehicle.dto";
import { publicProcedure, router } from "../trpc";

export const vehicleRouter = router({
  getTableRows: publicProcedure.query<VehicleTableRow[]>(async () => {
    return (await findAllVehicle()).map((vehicle) =>
      VehicleTableRow.fromModel(vehicle)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
      })
    )
    .query<{
      defaultValue: SalesForm;
    }>(async ({ input }) => {
      let defaultValue = SalesForm.initial;
      defaultValue.code = await findNextSalesCode();

      if (input.code) {
        defaultValue = SalesForm.fromModel(await findSalesByCode(input.code));
      }

      return { defaultValue };
    }),

  save: publicProcedure
    .input(salesInput)
    .input(
      z.object({
        code: validateCode(
          (value) => !isNaN(extractSalesCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.code === undefined) {
        return await createSales(await findNextSalesCode(), input);
      }
      return await updateSales(input.code, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        code: validateCode((value) => !isNaN(extractSalesCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteSales(input.code);
    }),
});
