import { z } from "zod";
import {
  CustomerGroupForm,
  customerGroupInput,
} from "../dtos/customerGroup.dto";
import {
  createCustomerGroup,
  deleteCustomerGroup,
  findAllCustomerGroup,
  findCustomerGroupByCode,
  findNextCustomerGroupCode,
  updateCustomerGroup,
} from "../stores/customerGroup.store";
import { publicProcedure, router } from "../trpc";

export const customerGroupsRouter = router({
  findAll: publicProcedure.query(async () => {
    return findAllCustomerGroup();
  }),

  getDefaultValues: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
      })
    )
    .query<CustomerGroupForm>(async ({ input }) => {
      if (input.code === undefined) {
        return {
          code: await findNextCustomerGroupCode(),
          createDate: new Date(),
          name: "",
          description: "",
        };
      }

      return await findCustomerGroupByCode(input.code);
    }),

  save: publicProcedure
    .input(customerGroupInput)
    .input(
      z.object({
        code: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.code === undefined) {
        return await createCustomerGroup(
          await findNextCustomerGroupCode(),
          input
        );
      }
      return await updateCustomerGroup(input.code, input);
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteCustomerGroup(input);
  }),
});
