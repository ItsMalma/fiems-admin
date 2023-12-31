import { z } from "zod";
import {
  VehicleForm,
  VehicleTableRow,
  vehicleInput,
} from "../dtos/vehicle.dto";
import { findAllVendor } from "../stores/customer.store";
import {
  createVehicle,
  deleteVehicle,
  findAllVehicle,
  findVehicleByID,
  findVehicleByNumber,
  updateVehicle,
} from "../stores/vehicle.store";
import { publicProcedure, router } from "../trpc";

export const vehiclesRouter = router({
  getOptions: publicProcedure.query(async () =>
    (await findAllVehicle(true)).map((vehicle) => ({
      label: vehicle.truckNumber,
      value: vehicle.truckNumber,
    }))
  ),

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
      value: VehicleForm;
      vendors: { label: string; value: string }[];
    }>(async ({ input }) => {
      const vendors = (await findAllVendor()).map((vendor) => ({
        label: `${vendor.code} (${vendor.name})`,
        value: vendor.code,
      }));

      let value = VehicleForm.initial;
      if (input.id) {
        value = VehicleForm.fromModel(await findVehicleByID(input.id));
      }

      return { value, vendors };
    }),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return;

      return await findVehicleByNumber(input);
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
