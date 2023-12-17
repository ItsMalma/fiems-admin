import {
  SuratJalanTableRow,
  suratJalanValidationSchema,
} from "../dtos/suratJalan.dto";
import { findAllJobOrder } from "../stores/jobOrder.store";
import { findAllProduct } from "../stores/product.store";
import {
  createSuratJalan,
  findAllSuratJalan,
  findNextSuratJalanNumber,
} from "../stores/suratJalan.store";
import { publicProcedure, router } from "../trpc";

export const suratJalanRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextSuratJalanNumber()
  ),

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

  getProductOptions: publicProcedure.query(async () => {
    return (await findAllProduct()).map((p) => ({
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
