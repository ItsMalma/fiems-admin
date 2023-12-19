import { z } from "zod";
import {
  DooringTableRow,
  dooringConfirmValidationSchema,
  dooringValidationSchema,
} from "../dtos/dooring.dto";
import {
  confirmDooring,
  createDooring,
  findAllDooring,
} from "../stores/dooring.store";
import { findAllJobOrder } from "../stores/jobOrder.store";
import { publicProcedure, router } from "../trpc";
import { validateCode } from "../validation";

export const dooringRouter = router({
  save: publicProcedure
    .input(dooringValidationSchema)
    .mutation(async ({ input }) => {
      return await createDooring(input);
    }),

  confirm: publicProcedure
    .input(dooringConfirmValidationSchema)
    .input(z.object({ id: validateCode() }))
    .mutation(async ({ input }) => {
      return await confirmDooring(input.id, input);
    }),

  getJobOrderOptions: publicProcedure.query(async ({}) => {
    return (await findAllJobOrder())
      .filter(
        (jo) =>
          jo.td !== null &&
          jo.ta !== null &&
          jo.sandar !== null &&
          jo.suratJalan !== null
      )
      .map((jo) => ({
        label: jo.number,
        value: jo.number,
      }));
  }),

  getTableRows: publicProcedure.query<DooringTableRow[]>(async () => {
    return (await findAllDooring()).map((dooring) => ({
      id: dooring.id,
      createDate: dooring.createDate,
      jobOrder: dooring.jobOrderConfirmation.number,
      suratJalan: dooring.jobOrderConfirmation.suratJalan!.number,
      td: dooring.jobOrderConfirmation.td!,
      ta: dooring.jobOrderConfirmation.ta!,
      sandar: dooring.jobOrderConfirmation.sandar!,
      bongkarKapal: dooring.bongkarKapal,
      estimate: dooring.estimate,
      actual: dooring.actual,
    }));
  }),
});
