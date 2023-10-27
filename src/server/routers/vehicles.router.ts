import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  VehicleForm,
  VehicleTableRow,
  vehicleInput,
} from "../dtos/vehicle.dto";
import { publicProcedure, router } from "../trpc";
import { createVehicle, deleteVehicle, findAllVehicle, findVehicleById, updateVehicle } from "../stores/vehicle.store";
import { findAllVendor } from "../stores/customer.store";

export const vehicleRouter = router({
  getTableRows: publicProcedure.query<VehicleTableRow[]>(async () => {
    return (await findAllVehicle()).map((vehicle) =>
      VehicleTableRow.fromModel(vehicle)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query<{
      defaultValue: VehicleForm;
      vendors: { label: string; value: string }[];
    }>(async ({ input }) => {

      const vendors = (await findAllVendor()).map((vendor) => ({
        label: `${vendor.code} | ${vendor.name}`,
        value: vendor.code,
      }));

      let defaultValue = VehicleForm.initial;
      if (input.id) {
        defaultValue = VehicleForm.fromModel(await findVehicleById(input.id));
      }

      return { defaultValue, vendors };
    }),

  save: publicProcedure
    .input(vehicleInput)
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createVehicle(input);
      }
      return await updateVehicle(input.id, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteVehicle(input.id);
    }),
});
