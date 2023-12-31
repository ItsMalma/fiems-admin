import { z } from "zod";
import {
  SuratJalanTableRow,
  suratJalanValidationSchema,
} from "../dtos/suratJalan.dto";
import { findAllJobOrder } from "../stores/jobOrder.store";
import { findAllProduct } from "../stores/product.store";
import { findAllProductCategory } from "../stores/productCategory.store";
import {
  createSuratJalan,
  findAllSuratJalan,
  findNextSuratJalanNumber,
  findSuratJalanByNumber,
} from "../stores/suratJalan.store";
import { publicProcedure, router } from "../trpc";

export const suratJalanRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextSuratJalanNumber()
  ),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return null;

      return await findSuratJalanByNumber(input);
    }),

  save: publicProcedure
    .input(suratJalanValidationSchema)
    .mutation(async ({ input }) => {
      return await createSuratJalan(input);
    }),

  getJobOrderOptions: publicProcedure.query(async ({}) => {
    return (await findAllJobOrder(true))
      .filter((jo) => jo.suratJalan === null)
      .map((jo) => ({
        label: jo.number,
        value: jo.number,
      }));
  }),

  getProductCategoryOptions: publicProcedure.query(async () => {
    return (await findAllProductCategory()).map((p) => ({
      label: `${p.reff} (${p.name})`,
      value: p.reff,
    }));
  }),

  getProductOptions: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.category) return [];

      return (await findAllProduct())
        .filter((p) => p.productCategory?.reff === input.category)
        .map((p) => ({
          label: `${p.skuCode} (${p.name})`,
          value: p.skuCode,
        }));
    }),

  getTableRows: publicProcedure.query<SuratJalanTableRow[]>(async () => {
    return (await findAllSuratJalan()).map((suratJalan) => ({
      number: suratJalan.number,
      createDate: suratJalan.createDate,
      factory:
        suratJalan.jobOrderConfirmation.inquiryDetail.priceFactory
          .quotationDetail.quotation.factory.name,
      consignee: suratJalan.jobOrderConfirmation.consignee.name,
    }));
  }),
});
