import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SPMTableRow, spmValidationSchema } from "../dtos/spm.dto";
import { createSPM, findAllSPM, findNextSPMNumber } from "../stores/spm.store";
import { findAllUangJalan } from "../stores/uangJalan.store";
import { publicProcedure, router } from "../trpc";

export const spmRouter = router({
  getNextNumber: publicProcedure.query(async () => await findNextSPMNumber()),

  save: publicProcedure
    .input(spmValidationSchema)
    .input(z.object({ uangJalan: z.string() }))
    .mutation(async ({ input }) => {
      return await createSPM(input, input.uangJalan);
    }),

  getUangJalan: publicProcedure
    .input(
      z.object({
        priceVendor: z.string().optional(),
        truckType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.priceVendor || !input.truckType) return null;

      const uj = (await findAllUangJalan()).find(
        (uj) =>
          uj.priceVendorDetail.id === input.priceVendor &&
          uj.truckType === input.truckType
      );
      if (!uj) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Tidak ada uang jalan yang mengarah ke job order`,
        });
      }

      return uj;
    }),

  getTableRows: publicProcedure.query<SPMTableRow[]>(async () => {
    return (await findAllSPM()).map((spm) => ({
      number: spm.number,
      createDate: spm.createDate,
      factory:
        spm.jobOrderConfirmation.inquiryDetail.priceFactory.quotationDetail
          .quotation.factory.name,
      consignee: spm.jobOrderConfirmation.consignee.name,
      route: `${spm.jobOrderConfirmation.priceVendorDetail.route.startDescription} - ${spm.jobOrderConfirmation.priceVendorDetail.route.endDescription}`,
      uangJalan: spm.uangJalan.total,
    }));
  }),
});
