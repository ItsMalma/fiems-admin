import { z } from "zod";
import { VesselForm, VesselTableRow, vesselInput } from "../dtos/vessel.dto";
import { findAllShipping } from "../stores/customer.store";
import {
  createVessel,
  deleteVessel,
  findAllVessel,
  findVesselByID,
  updateVessel,
} from "../stores/vessel.store";
import { publicProcedure, router } from "../trpc";

export const vesselsRouter = router({
  getOptions: publicProcedure.query(async () => {
    return (await findAllVessel(true)).map((vessel) => ({
      label: vessel.name,
      value: vessel.id,
    }));
  }),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return;

      return await findVesselByID(input);
    }),

  getTableRows: publicProcedure.query<VesselTableRow[]>(async () => {
    return (await findAllVessel()).map((vessel) =>
      VesselTableRow.fromModel(vessel)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query<{
      value: VesselForm;
      shippings: { label: string; value: string }[];
    }>(async ({ input }) => {
      const shippings = (await findAllShipping()).map((shipping) => ({
        label: `${shipping.code} (${shipping.name})`,
        value: shipping.code,
      }));

      let value = VesselForm.initial;
      if (input.id) {
        value = VesselForm.fromModel(await findVesselByID(input.id));
      }

      return { value, shippings };
    }),

  save: publicProcedure
    .input(vesselInput)
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createVessel(input);
      }
      return await updateVessel(input.id, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteVessel(input.id);
    }),
});
