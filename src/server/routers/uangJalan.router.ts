import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  UangJalanForm,
  UangJalanTableRow,
  uangJalanInput,
} from "../dtos/uangJalan.dto";
import { publicProcedure, router } from "../trpc";
import { createUangJalan, deleteUangJalan, findAllUangJalan, findUangJalanById, updateUangJalan } from "../stores/uangJalan.store";
import { findAllVendor } from "../stores/customer.store";

export const uangJalanRouter = router({
  getTableRows: publicProcedure.query<UangJalanTableRow[]>(async () => {
    return (await findAllUangJalan()).map((uangJalan) =>
      UangJalanTableRow.fromModel(uangJalan)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query<{
      defaultValue: UangJalanForm;
      vendors: { label: string; value: string }[];
      routes: { label: string; value: string }[];
    }>(async ({ input }) => {

      const vendors = (await findAllVendor()).map((vendor) => ({
        label: `${vendor.code} | ${vendor.name}`,
        value: vendor.code,
      }));

      const routes = (await findAllVendor()).map((route) => ({
        label: `${route.code} - ${route.name}`,
        value: route.code,
      }));

      let defaultValue = UangJalanForm.initial;
      if (input.id) {
        defaultValue = UangJalanForm.fromModel(await findUangJalanById(input.id));
      }

      return { defaultValue, vendors, routes };
    }),

  save: publicProcedure
    .input(uangJalanInput)
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createUangJalan(input);
      }
      return await updateUangJalan(input.id, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteUangJalan(input.id);
    }),
});
