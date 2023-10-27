import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  VesselForm,
  VesselTableRow,
  vesselInput,
} from "../dtos/vessel.dto";
import { publicProcedure, router } from "../trpc";
import { createVessel, deleteVessel, findAllVessel, findVesselById, updateVessel } from "../stores/vessel.store";
import { findAllShipping } from "../stores/customer.store";

export const vesselRouter = router({
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
      defaultValue: VesselForm;
      shippings: { label: string; value: string }[];
    }>(async ({ input }) => {

      const shippings = (await findAllShipping()).map((shipping) => ({
        label: `${shipping.code} | ${shipping.name}`,
        value: shipping.code,
      }));

      let defaultValue = VesselForm.initial;
      if (input.id) {
        defaultValue = VesselForm.fromModel(await findVesselById(input.id));
      }

      return { defaultValue, shippings };
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
