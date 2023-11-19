import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  SalesForm,
  SalesTableRow,
  extractSalesCode,
  salesInput,
} from "../dtos/sales.dto";
import {
  createSales,
  deleteSales,
  findAllSales,
  findNextSalesCode,
  findSalesByCode,
  updateSales,
} from "../stores/sales.store";
import { publicProcedure, router } from "../trpc";

export const salesRouter = router({
  getTableRows: publicProcedure.query<SalesTableRow[]>(async () => {
    return (await findAllSales()).map((sales) =>
      SalesTableRow.fromModel(sales)
    );
  }),

  getOptions: publicProcedure.query(async () =>
    (await findAllSales()).map((sales) => ({
      label: `${sales.code} (${sales.name})`,
      value: sales.code,
    }))
  ),

  getForm: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
      })
    )
    .query<{
      value: SalesForm;
    }>(async ({ input }) => {
      let value = SalesForm.initial;
      value.code = await findNextSalesCode();

      if (input.code) {
        value = SalesForm.fromModel(await findSalesByCode(input.code));
      }

      return { value };
    }),

  save: publicProcedure
    .input(salesInput)
    .input(
      z.object({
        code: validateCode(
          (value) => !isNaN(extractSalesCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.code === undefined) {
        return await createSales(await findNextSalesCode(), input);
      }
      return await updateSales(input.code, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        code: validateCode((value) => !isNaN(extractSalesCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteSales(input.code);
    }),
});
