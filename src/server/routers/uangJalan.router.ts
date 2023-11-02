import { DeepPartial } from "react-hook-form";
import { z } from "zod";
import {
  UangJalanForm,
  UangJalanTableRow,
  uangJalanInput,
} from "../dtos/uangJalan.dto";
import { findAllPriceVendorDetails } from "../stores/price.store";
import {
  createUangJalan,
  deleteUangJalan,
  findAllUangJalan,
  findUangJalanById,
  updateUangJalan,
} from "../stores/uangJalan.store";
import { publicProcedure, router } from "../trpc";

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
        vendor: z.string().optional(),
        route: z.string().optional(),
        bbm: z.number().default(0),
        toll: z.number().default(0),
        labourCost: z.number().default(0),
        meal: z.number().default(0),
        etc: z.number().default(0),
        isDefault: z.boolean().default(false),
      })
    )
    .query<{
      value: DeepPartial<UangJalanForm>;
      defaultValue?: UangJalanForm;
      vendors: { label: string; value: string }[];
      routes: { label: string; value: string }[];
      containerSizes: { label: string; value: string }[];
    }>(async ({ input }) => {
      const vendors: { label: string; value: string }[] = [];
      const routes: { label: string; value: string }[] = [];
      const containerSizes: { label: string; value: string }[] = [];

      const priceVendorDetails = await findAllPriceVendorDetails();
      for (const priceVendorDetail of priceVendorDetails) {
        if (
          !vendors.find(
            (vendor) =>
              vendor.value === priceVendorDetail.priceVendor.vendor.code
          )
        ) {
          vendors.push({
            label: `${priceVendorDetail.priceVendor.vendor.code} (${priceVendorDetail.priceVendor.vendor.name})`,
            value: priceVendorDetail.priceVendor.vendor.code,
          });
        }

        if (
          !!input.vendor &&
          priceVendorDetail.priceVendor.vendor.code === input.vendor &&
          !routes.find((route) => route.value === priceVendorDetail.route.code)
        ) {
          routes.push({
            label: `${priceVendorDetail.route.code} (${priceVendorDetail.route.startDescription} - ${priceVendorDetail.route.endDescription})`,
            value: priceVendorDetail.route.code,
          });

          if (
            !!input.route &&
            priceVendorDetail.route.code === input.route &&
            !containerSizes.find(
              (containerSize) =>
                containerSize.value === priceVendorDetail.containerSize
            )
          ) {
            containerSizes.push({
              label: priceVendorDetail.containerSize,
              value: priceVendorDetail.containerSize,
            });
          }
        }
      }

      const value: DeepPartial<UangJalanForm> = {};

      let defaultValue: UangJalanForm | undefined = undefined;
      if (!!input.id && input.isDefault) {
        defaultValue = UangJalanForm.fromModel(
          await findUangJalanById(input.id)
        );
      }

      value.total =
        input.bbm + input.toll + input.labourCost + input.meal + input.etc;

      return { value, defaultValue, vendors, routes, containerSizes };
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
