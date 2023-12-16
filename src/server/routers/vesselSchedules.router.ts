import { SelectOption } from "@/components/Elements";
import { publicProcedure } from "@/server/trpc";
import { z } from "zod";
import {
  VesselScheduleForm,
  VesselScheduleTableRow,
  vesselScheduleValidationSchema,
} from "../dtos/vesselSchedule.dto";
import { findAllShipping } from "../stores/customer.store";
import { findAllVessel } from "../stores/vessel.store";
import {
  createVesselSchedule,
  deleteVesselSchedule,
  findAllVesselSchedule,
  findVesselScheduleByID,
  updateVesselSchedule,
} from "../stores/vesselSchedule.store";
import { router } from "../trpc";

export const vesselSchedulesRouter = router({
  getShippingOptions: publicProcedure.query<SelectOption[]>(async () => {
    return (await findAllShipping(true))
      .filter((shipping) => shipping.vessels.length > 0)
      .map((shipping) => ({
        label: `${shipping.code} (${shipping.name})`,
        value: shipping.code,
      }));
  }),

  getVesselOptions: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
      })
    )
    .query<SelectOption[]>(async ({ input }) => {
      if (!input.shipping) return [];

      return (await findAllVessel(true))
        .filter((vessel) => vessel.shipping.code == input.shipping)
        .map((vessel) => ({
          label: vessel.name,
          value: vessel.id,
        }));
    }),

  getDefaultForm: publicProcedure
    .input(z.string().optional())
    .query<VesselScheduleForm | null>(async ({ input }) => {
      if (!input) return null;

      const vesselSchedule = await findVesselScheduleByID(input);

      return {
        createDate: vesselSchedule.createDate,
        month: vesselSchedule.month,
        shipping: vesselSchedule.shipping.code,
        vessel: vesselSchedule.vessel.id,
        vesselCapacity: vesselSchedule.vessel.capacity,
        voyage: vesselSchedule.voyage,
        quota: vesselSchedule.quota,
        portOrigin: vesselSchedule.portOrigin.code,
        portDestination: vesselSchedule.portDestination.code,
        openStackDate: vesselSchedule.openStackDate,
        closingRC: vesselSchedule.closingRC,
        rcClosingTime: vesselSchedule.rcClosingTime,
        closingDate: vesselSchedule.closingDate,
        vesselClosingTime: vesselSchedule.vesselClosingTime,
        etd: vesselSchedule.etd,
        eta: vesselSchedule.eta,
      };
    }),

  save: publicProcedure
    .input(vesselScheduleValidationSchema)
    .input(z.object({ id: z.string().optional() }))
    .mutation(async ({ input }) => {
      if (input.id) {
        return await updateVesselSchedule(input.id, input);
      }
      return await createVesselSchedule(input);
    }),

  getTableRows: publicProcedure.query<VesselScheduleTableRow[]>(async () => {
    return (await findAllVesselSchedule()).map((vesselSchedule) => ({
      id: vesselSchedule.id,
      createDate: vesselSchedule.createDate,
      month: vesselSchedule.month,
      shipping: `${vesselSchedule.shipping.code} (${vesselSchedule.shipping.name})`,
      vessel: vesselSchedule.vessel.name,
      vesselCapacity: vesselSchedule.vessel.capacity,
      voyage: vesselSchedule.voyage,
      quota: vesselSchedule.quota,
      portOrigin: `${vesselSchedule.portOrigin.code} (${vesselSchedule.portOrigin.name})`,
      portDestination: `${vesselSchedule.portDestination.code} (${vesselSchedule.portDestination.name})`,
      openStackDate: vesselSchedule.openStackDate,
      closingRC: vesselSchedule.closingRC,
      rcClosingTime: vesselSchedule.rcClosingTime,
      closingDate: vesselSchedule.closingDate,
      vesselClosingTime: vesselSchedule.vesselClosingTime,
      etd: vesselSchedule.etd,
      eta: vesselSchedule.eta,
    }));
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteVesselSchedule(input);
  }),
});
