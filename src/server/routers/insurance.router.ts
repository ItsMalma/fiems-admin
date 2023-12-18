import {
  InsuranceTableRow,
  insuranceValidationSchema,
} from "../dtos/insurance.dto";
import {
  createInsurance,
  findAllInsurance,
  findNextInsuranceNumber,
} from "../stores/insurance.store";
import { findAllJobOrder } from "../stores/jobOrder.store";
import { publicProcedure, router } from "../trpc";

export const insuranceRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextInsuranceNumber()
  ),

  save: publicProcedure
    .input(insuranceValidationSchema)
    .mutation(async ({ input }) => {
      return await createInsurance(input);
    }),

  getJobOrderOptions: publicProcedure.query(async ({}) => {
    return (await findAllJobOrder(true))
      .filter((jo) => jo.insurance === null)
      .map((jo) => ({
        label: jo.number,
        value: jo.number,
      }));
  }),

  getTableRows: publicProcedure.query<InsuranceTableRow[]>(async () => {
    return (await findAllInsurance()).map((insurance) => {
      let premi = Number(insurance.premi);
      if (isNaN(premi)) premi = 0;
      return {
        number: insurance.number,
        createDate: insurance.createDate,
        nilaiTertanggung: insurance.nilaiTertanggung,
        premi: premi.toString(),
        total: insurance.nilaiTertanggung * premi,
        td: insurance.jobOrderConfirmation.td!,
      };
    });
  }),
});
