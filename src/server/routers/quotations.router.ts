import lodash from "lodash";
import { z } from "zod";
import { quotationValidationSchema } from "../dtos/quotation.dto";
import {
  findAllPriceShippings,
  findAllPriceVendors,
  findPriceShippingByShipping,
  findPriceVendorByVendor,
} from "../stores/price.store";
import {
  createQuotation,
  findNextQuotationNumber,
} from "../stores/quotation.store";
import { publicProcedure, router } from "../trpc";

export const quotationsRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextQuotationNumber()
  ),

  getTrackingVendorOptions: publicProcedure
    .input(
      z.object({
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (input.port && input.containerSize && input.containerType) {
        return (await findAllPriceVendors())
          .filter(
            (priceVendor) =>
              !!priceVendor.details.find(
                (priceVendorDetail) =>
                  priceVendorDetail.port.code === input.port &&
                  priceVendorDetail.containerSize === input.containerSize &&
                  priceVendorDetail.containerType === input.containerType
              )
          )
          .map((priceVendor) => ({
            label: `${priceVendor.vendor.code} (${priceVendor.vendor.name})`,
            value: priceVendor.vendor.code,
          }));
      }

      return [];
    }),

  getTrackingRouteOptions: publicProcedure
    .input(
      z.object({
        vendor: z.string().optional(),
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (
        input.vendor &&
        input.port &&
        input.containerSize &&
        input.containerType
      ) {
        const priceVendor = await findPriceVendorByVendor(input.vendor);
        if (!priceVendor) {
          return [];
        }

        return lodash.uniqBy(
          priceVendor.details
            .filter(
              (priceVendorDetail) =>
                priceVendorDetail.port.code === input.port &&
                priceVendorDetail.containerSize === input.containerSize &&
                priceVendorDetail.containerType === input.containerType
            )
            .map((priceVendorDetail) => ({
              label: `${priceVendorDetail.route.code} (${priceVendorDetail.route.startDescription} - ${priceVendorDetail.route.endDescription})`,
              value: priceVendorDetail.route.code,
            })),
          (priceVendorDetail) => priceVendorDetail.value
        );
      }
      return [];
    }),

  getTrackingDetail: publicProcedure
    .input(
      z.object({
        vendor: z.string().optional(),
        route: z.string().optional(),
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (
        input.vendor &&
        input.route &&
        input.port &&
        input.containerSize &&
        input.containerType
      ) {
        const priceVendor = await findPriceVendorByVendor(input.vendor);
        if (!priceVendor) {
          return null;
        }

        const priceVendorDetail = priceVendor.details.find(
          (priceVendorDetail) =>
            priceVendorDetail.route.code === input.route &&
            priceVendorDetail.port.code === input.port &&
            priceVendorDetail.containerSize === input.containerSize &&
            priceVendorDetail.containerType === input.containerType
        );
        if (!priceVendorDetail) return null;

        return priceVendorDetail;
      }

      return null;
    }),

  getShippingOptions: publicProcedure
    .input(
      z.object({
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (input.port && input.containerSize && input.containerType) {
        return (await findAllPriceShippings())
          .filter(
            (priceShipping) =>
              !!priceShipping.details.find(
                (priceShippingDetail) =>
                  priceShippingDetail.port.code === input.port &&
                  priceShippingDetail.containerSize === input.containerSize &&
                  priceShippingDetail.containerType === input.containerType
              )
          )
          .map((priceShipping) => ({
            label: `${priceShipping.shipping.code} (${priceShipping.shipping.name})`,
            value: priceShipping.shipping.code,
          }));
      }

      return [];
    }),

  getShippingRouteOptions: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (
        input.shipping &&
        input.port &&
        input.containerSize &&
        input.containerType
      ) {
        const priceShipping = await findPriceShippingByShipping(input.shipping);
        if (!priceShipping) {
          return [];
        }

        return lodash.uniqBy(
          priceShipping.details
            .filter(
              (priceShippingDetail) =>
                priceShippingDetail.port.code === input.port &&
                priceShippingDetail.containerSize === input.containerSize &&
                priceShippingDetail.containerType === input.containerType
            )
            .map((priceShippingDetail) => ({
              label: `${priceShippingDetail.route.code} (${priceShippingDetail.route.startDescription} - ${priceShippingDetail.route.endDescription})`,
              value: priceShippingDetail.route.code,
            })),
          (priceShippingDetail) => priceShippingDetail.value
        );
      }
      return [];
    }),

  getShippingDetail: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
        route: z.string().optional(),
        port: z.string().optional(),
        containerSize: z.string().optional(),
        containerType: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (
        input.shipping &&
        input.route &&
        input.port &&
        input.containerSize &&
        input.containerType
      ) {
        const priceShipping = await findPriceShippingByShipping(input.shipping);
        if (!priceShipping) {
          return null;
        }

        const priceShippingDetail = priceShipping.details.find(
          (priceShippingDetail) =>
            priceShippingDetail.route.code === input.route &&
            priceShippingDetail.port.code === input.port &&
            priceShippingDetail.containerSize === input.containerSize &&
            priceShippingDetail.containerType === input.containerType
        );
        if (!priceShippingDetail) return null;

        return priceShippingDetail;
      }

      return null;
    }),

  saveQuotation: publicProcedure
    .input(quotationValidationSchema)
    .mutation(async ({ input }) => {
      return await createQuotation(input);
    }),
});
