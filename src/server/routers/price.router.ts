import moment from "moment";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";
import {
  PriceFactoryForm,
  PriceFactoryTableRow,
  PriceShippingForm,
  PriceShippingTableRow,
  PriceVendorForm,
  PriceVendorTableRow,
  priceFactoryInput,
  priceShippingInput,
  priceTypeInput,
  priceVendorInput,
} from "../dtos/price.dto";
import { findShippingByCode, findVendorByCode } from "../stores/customer.store";
import {
  createPriceFactory,
  createPriceShipping,
  createPriceVendor,
  deletePriceFactory,
  deletePriceShippingDetail,
  deletePriceVendorDetail,
  findAllPriceFactories,
  findAllPriceShippingDetails,
  findAllPriceVendorDetails,
  findPriceFactoryByID,
  findPriceShippingByID,
  findPriceVendorByID,
  updatePriceFactory,
  updatePriceShipping,
  updatePriceVendor,
} from "../stores/price.store";
import {
  findQuotationByNumber,
  findQuotationDetailHPP,
} from "../stores/quotation.store";
import { findRouteByCode } from "../stores/route.store";
import { publicProcedure, router } from "../trpc";
import { isObjectID, validateCode } from "../validation";

export const pricesRouter = router({
  getTableRows: publicProcedure
    .input(priceTypeInput)
    .query<
      (PriceFactoryTableRow | PriceVendorTableRow | PriceShippingTableRow)[]
    >(async ({ input }) => {
      switch (input) {
        case "Factory":
          return await Promise.all(
            (await findAllPriceFactories()).map(async (priceFactory) => {
              const hpp = await findQuotationDetailHPP(
                priceFactory.quotationDetail.id
              );

              return new PriceFactoryTableRow(
                priceFactory.id,
                moment(priceFactory.createDate).toString(),
                `${priceFactory.quotationDetail.quotation.factory.code} (${priceFactory.quotationDetail.quotation.factory.name})`,
                `${priceFactory.quotationDetail.route.code} (${priceFactory.quotationDetail.route.startDescription} - ${priceFactory.quotationDetail.route.endDescription})`,
                `${priceFactory.quotationDetail.factory.code} (${priceFactory.quotationDetail.factory.name})`,
                priceFactory.quotationDetail.containerSize,
                priceFactory.quotationDetail.quotation.serviceType,
                priceFactory.quotationDetail.containerType,
                `${priceFactory.quotationDetail.port.code} (${priceFactory.quotationDetail.port.name})`,
                priceFactory.etcCost,
                hpp,
                priceFactory.etcCost + hpp,
                priceFactory.status
              );
            })
          );
        case "Vendor":
          return (await findAllPriceVendorDetails()).map((detail) =>
            PriceVendorTableRow.fromModel(detail)
          );
        case "Shipping":
          return (await findAllPriceShippingDetails()).map((detail) =>
            PriceShippingTableRow.fromModel(detail)
          );
      }
    }),

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
    }>(async ({ input }) => {
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

      return { value, defaultValue };
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
    }>(async ({ input }) => {
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

      return { value, defaultValue };
    }),

  getFactoryRouteOptions: publicProcedure
    .input(
      z.object({
        quotation: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.quotation) return [];

      return (await findQuotationByNumber(input.quotation)).details.map(
        ({ route }) => ({
          label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
          value: route.code,
        })
      );
    }),

  getFactoryContainerSizeOptions: publicProcedure
    .input(
      z.object({
        quotation: z.string().optional(),
        route: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.quotation || !input.route) return [];

      return (await findQuotationByNumber(input.quotation)).details
        .filter((detail) => detail.route.code === input.route)
        .map(({ containerSize }) => ({
          label: containerSize,
          value: containerSize,
        }));
    }),

  getFactoryQuotationDetail: publicProcedure
    .input(
      z.object({
        quotation: z.string().optional(),
        route: z.string().optional(),
        containerSize: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.quotation || !input.route || !input.containerSize) return null;

      return (await findQuotationByNumber(input.quotation)).details.find(
        ({ route, containerSize }) =>
          route.code === input.route && containerSize === input.containerSize
      );
    }),

  getFactoryDefaultForm: publicProcedure
    .input(z.string().optional())
    .query<PriceFactoryForm | null>(async ({ input }) => {
      if (!input) return null;

      const priceFactory = await findPriceFactoryByID(input);

      return {
        createDate: priceFactory.createDate,
        quotation: priceFactory.quotationDetail.quotation.number,
        route: priceFactory.quotationDetail.route.code,
        factory: priceFactory.quotationDetail.factory.code,
        effectiveStartDate:
          priceFactory.quotationDetail.quotation.effectiveStartDate,
        effectiveEndDate:
          priceFactory.quotationDetail.quotation.effectiveEndDate,
        containerSize: priceFactory.quotationDetail.containerSize,
        containerType: priceFactory.quotationDetail.containerType,
        serviceType: priceFactory.quotationDetail.quotation.serviceType,
        port: priceFactory.quotationDetail.port.code,
        etcCost: priceFactory.etcCost,
        hpp: 0,
        hppAfter: 0,
      };
    }),

  saveFactory: publicProcedure
    .input(priceFactoryInput)
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id === undefined) {
        return await createPriceFactory(input);
      }
      return await updatePriceFactory(input.id, input);
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

  deleteFactory: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await deletePriceFactory(input);
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
