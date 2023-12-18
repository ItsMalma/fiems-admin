import { z } from "zod";
import {
  RequestTableRow,
  requestValidationSchema,
  typeRequests,
} from "../dtos/request.dto";
import { findAllProduct } from "../stores/product.store";
import {
  createRequest,
  findAllRequest,
  findNextRequestNumber,
  findRequestByNumber,
} from "../stores/request.store";
import { publicProcedure, router } from "../trpc";
import { validateSelect } from "../validation";

export const requestRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextRequestNumber()
  ),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return null;

      return await findRequestByNumber(input);
    }),

  save: publicProcedure
    .input(requestValidationSchema)
    .mutation(async ({ input }) => {
      return await createRequest(input);
    }),

  getProductOptions: publicProcedure
    .input(validateSelect(typeRequests).optional())
    .query(async ({ input }) => {
      if (!input) return;

      return (await findAllProduct())
        .filter((p) => p.type === input)
        .map((p) => ({
          label: `${p.skuCode} (${p.name})`,
          value: p.skuCode,
        }));
    }),

  getTableRows: publicProcedure.query<RequestTableRow[]>(async () => {
    return (await findAllRequest()).map((request) => ({
      number: request.number,
      createDate: request.createDate,
      type: request.typeRequest,
    }));
  }),
});
