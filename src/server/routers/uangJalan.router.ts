import lodash from "lodash";
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

  getVendorOptions: publicProcedure.query(async () => {
    return lodash.uniqBy(
      (await findAllPriceVendorDetails(true)).map((priceVendorDetail) => ({
        label: `${priceVendorDetail.priceVendor.vendor.code} (${priceVendorDetail.priceVendor.vendor.name})`,
        value: priceVendorDetail.priceVendor.vendor.code,
      })),
      (opt) => opt.value
    );
  }),

  getRouteOptions: publicProcedure
    .input(
      z.object({
        vendor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.vendor) return [];

      return lodash.uniqBy(
        (await findAllPriceVendorDetails(true))
          .filter(
            (priceVendorDetail) =>
              priceVendorDetail.priceVendor.vendor.code === input.vendor
          )
          .map((priceVendorDetail) => ({
            label: `${priceVendorDetail.route.code} (${priceVendorDetail.route.startDescription} - ${priceVendorDetail.route.endDescription})`,
            value: priceVendorDetail.route.code,
          })),
        (opt) => opt.value
      );
    }),

  getContainerSizeOptions: publicProcedure
    .input(
      z.object({
        vendor: z.string().optional(),
        route: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.vendor || !input.route) return [];

      return lodash.uniqBy(
        (await findAllPriceVendorDetails(true))
          .filter(
            (priceVendorDetail) =>
              priceVendorDetail.priceVendor.vendor.code === input.vendor &&
              priceVendorDetail.route.code === input.route
          )
          .map((priceVendorDetail) => ({
            label: priceVendorDetail.containerSize,
            value: priceVendorDetail.containerSize,
          })),
        (opt) => opt.value
      );
    }),

  getTruckTypeOptions: publicProcedure
    .input(
      z.object({
        vendor: z.string().optional(),
        route: z.string().optional(),
        containerSize: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.vendor || !input.route || !input.containerSize) return [];

      const ujMapped = (await findAllPriceVendorDetails(true)).find(
        (priceVendorDetail) =>
          priceVendorDetail.priceVendor.vendor.code === input.vendor &&
          priceVendorDetail.route.code === input.route &&
          priceVendorDetail.containerSize === input.containerSize
      )?.uangJalan;
      if (!ujMapped) return [];

      return UangJalanForm.truckTypeOptions.filter(
        ({ value }) => !ujMapped.find((uj) => uj.truckType === value)
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
    }>(async ({ input }) => {
      const value: DeepPartial<UangJalanForm> = {};

      let defaultValue: UangJalanForm | undefined = undefined;
      if (!!input.id && input.isDefault) {
        defaultValue = UangJalanForm.fromModel(
          await findUangJalanById(input.id)
        );
      }

      value.total =
        input.bbm + input.toll + input.labourCost + input.meal + input.etc;

      return { value, defaultValue };
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
