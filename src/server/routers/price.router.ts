import { DeepPartial } from "react-hook-form";
import { z } from "zod";
import {
  PriceShippingForm,
  PriceShippingTableRow,
  PriceVendorForm,
  PriceVendorTableRow,
  priceShippingInput,
  priceTypeInput,
  priceVendorInput,
} from "../dtos/price.dto";
import {
  findAllShipping,
  findAllVendor,
  findShippingByCode,
  findVendorByCode,
} from "../stores/customer.store";
import { findAllPort } from "../stores/port.store";
import {
  createPriceShipping,
  createPriceVendor,
  deletePriceShippingDetail,
  deletePriceVendorDetail,
  findAllPriceShippingDetails,
  findAllPriceVendorDetails,
  findPriceShippingByID,
  findPriceVendorByID,
  updatePriceShipping,
  updatePriceVendor,
} from "../stores/price.store";
import { findAllRoute, findRouteByCode } from "../stores/route.store";
import { publicProcedure, router } from "../trpc";
import { isObjectID, validateCode } from "../validation";

export const pricesRouter = router({
  getTableRows: publicProcedure
    .input(priceTypeInput)
    .query<(PriceVendorTableRow | PriceShippingTableRow)[]>(
      async ({ input }) => {
        switch (input) {
          case "Vendor":
            return (await findAllPriceVendorDetails()).map((detail) =>
              PriceVendorTableRow.fromModel(detail)
            );
          case "Shipping":
            return (await findAllPriceShippingDetails()).map((detail) =>
              PriceShippingTableRow.fromModel(detail)
            );
        }
      }
    ),

  getFormVendor: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        vendor: z.string().optional(),
        details: z
          .array(
            z.object({
              route: z.string().optional(),
              port: z.string().optional(),
              tracking: z.number().default(0),
              buruh: z.number().default(0),
              thcOPT: z.number().default(0),
              thcOPP: z.number().default(0),
              adminBL: z.number().default(0),
              cleaning: z.number().default(0),
              materai: z.number().default(0),
            })
          )
          .optional(),
        isDefault: z.boolean().default(false),
      })
    )
    .query<{
      defaultValue?: PriceVendorForm;
      value?: DeepPartial<PriceVendorForm>;
      vendors: { label: string; value: string }[];
      routes: { label: string; value: string }[];
      ports: { label: string; value: string }[];
    }>(async ({ input }) => {
      const vendors = (await findAllVendor()).map((vendor) => ({
        label: `${vendor.code} (${vendor.name})`,
        value: vendor.code,
      }));

      let routes = (await findAllRoute()).map((route) => ({
        label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
        value: route.code,
      }));

      let ports = (await findAllPort()).map((port) => ({
        label: `${port.code} (${port.name})`,
        value: port.code,
      }));

      const value: DeepPartial<PriceVendorForm> = {
        createDate: new Date(),
      };

      let defaultValue: PriceVendorForm | undefined = undefined;
      if (!!input.id && input.isDefault) {
        defaultValue = PriceVendorForm.fromModel(
          await findPriceVendorByID(input.id)
        );
      }

      if (!!input.vendor) {
        const vendor = await findVendorByCode(input.vendor);

        value.vendorAddress = vendor.address;
        value.vendorProvince = vendor.province;
        value.vendorCity = vendor.city;
      }

      if (!!input.details) {
        value.details = await Promise.all(
          input.details.map(async (inputDetail) => {
            let detail = { routeDescription: "", total: 0 };

            if (inputDetail.route) {
              const route = await findRouteByCode(inputDetail.route);
              detail.routeDescription = `${route.startDescription} - ${route.endDescription}`;
            }

            detail.total =
              inputDetail.tracking +
              inputDetail.buruh +
              inputDetail.thcOPT +
              inputDetail.thcOPP +
              inputDetail.adminBL +
              inputDetail.cleaning +
              inputDetail.materai;

            return detail;
          })
        );
      }

      return { value, defaultValue, vendors, routes, ports };
    }),

  getFormShipping: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        shipping: z.string().optional(),
        details: z
          .array(
            z.object({
              route: z.string().optional(),
              freight: z.number().default(0),
              thcOPT: z.number().default(0),
              thcOPP: z.number().default(0),
              adminBL: z.number().default(0),
              cleaning: z.number().default(0),
              alihKapal: z.number().default(0),
              materai: z.number().default(0),
              lolo: z.number().default(0),
              segel: z.number().default(0),
              rc: z.number().default(0),
              lss: z.number().default(0),
            })
          )
          .optional(),
        isDefault: z.boolean().default(false),
      })
    )
    .query<{
      defaultValue?: PriceShippingForm;
      value?: DeepPartial<PriceShippingForm>;
      shippings: { label: string; value: string }[];
      routes: { label: string; value: string }[];
      ports: { label: string; value: string }[];
    }>(async ({ input }) => {
      const shippings = (await findAllShipping()).map((shipping) => ({
        label: `${shipping.code} (${shipping.name})`,
        value: shipping.code,
      }));

      let routes = (await findAllRoute()).map((route) => ({
        label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
        value: route.code,
      }));

      let ports = (await findAllPort()).map((port) => ({
        label: `${port.code} (${port.name})`,
        value: port.code,
      }));

      const value: DeepPartial<PriceShippingForm> = {
        createDate: new Date(),
      };

      let defaultValue: PriceShippingForm | undefined = undefined;
      if (!!input.id && input.isDefault) {
        defaultValue = PriceShippingForm.fromModel(
          await findPriceShippingByID(input.id)
        );
      }

      if (!!input.shipping) {
        const shipping = await findShippingByCode(input.shipping);

        value.shippingAddress = shipping.address;
        value.shippingCity = shipping.city;
        value.shippingProvince = shipping.province;
      }

      if (!!input.details) {
        value.details = await Promise.all(
          input.details.map(async (inputDetail) => {
            let detail = { routeDescription: "", total: 0 };

            if (inputDetail.route) {
              const route = await findRouteByCode(inputDetail.route);
              detail.routeDescription = `${route.startDescription} - ${route.endDescription}`;
            }

            detail.total =
              inputDetail.freight +
              inputDetail.thcOPT +
              inputDetail.thcOPP +
              inputDetail.adminBL +
              inputDetail.cleaning +
              inputDetail.alihKapal +
              inputDetail.materai +
              inputDetail.lolo +
              inputDetail.segel +
              inputDetail.rc +
              inputDetail.lss;

            return detail;
          })
        );
      }

      return { value, defaultValue, shippings, routes, ports };
    }),

  saveVendor: publicProcedure
    .input(priceVendorInput)
    .input(
      z.object({
        id: validateCode(isObjectID).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createPriceVendor(input);
      }
      return await updatePriceVendor(input.id, input);
    }),

  saveShipping: publicProcedure
    .input(priceShippingInput)
    .input(
      z.object({
        id: validateCode(isObjectID).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createPriceShipping(input);
      }
      return await updatePriceShipping(input.id, input);
    }),

  deleteVendor: publicProcedure
    .input(validateCode(isObjectID))
    .mutation(async ({ input }) => {
      return await deletePriceVendorDetail(input);
    }),

  deleteShipping: publicProcedure
    .input(validateCode(isObjectID))
    .mutation(async ({ input }) => {
      return await deletePriceShippingDetail(input);
    }),
});
