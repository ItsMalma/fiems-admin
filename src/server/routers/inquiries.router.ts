import lodash from "lodash";
import { z } from "zod";
import {
  InquiryForm,
  InquiryTableRow,
  inquiryValidationSchema,
} from "../dtos/inquiry.dto";
import {
  createInquiry,
  deleteInquiryDetailByID,
  findAllInquiryDetails,
  findInquiryByNumber,
  findNextInquiryNumber,
  updateInquiry,
} from "../stores/inquiry.store";
import { findAllPriceFactories } from "../stores/price.store";
import { findAllQuotationDetails } from "../stores/quotation.store";
import { findAllVesselSchedule } from "../stores/vesselSchedule.store";
import { publicProcedure, router } from "../trpc";

export const inquiriesRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextInquiryNumber()
  ),

  getDefaultForm: publicProcedure
    .input(z.string().optional())
    .query<InquiryForm | null>(async ({ input }) => {
      if (!input) return null;

      const inquiry = await findInquiryByNumber(input);

      return {
        number: inquiry.number,
        createDate: inquiry.createDate,
        sales: inquiry.sales.code,
        factory:
          inquiry.details[0].priceFactory.quotationDetail.quotation.factory
            .code,
        factoryGroup:
          inquiry.details[0].priceFactory.quotationDetail.quotation.factory
            .group.code,
        factoryAddress:
          inquiry.details[0].priceFactory.quotationDetail.quotation.factory
            .address,
        factoryCity:
          inquiry.details[0].priceFactory.quotationDetail.quotation.factory
            .city,
        purchase: inquiry.purchase.code,
        purchaseAddress: inquiry.purchase.address,
        purchaseCity: inquiry.purchase.city,
        details: await Promise.all(
          inquiry.details.map(async (detail) => {
            const insuranceSum =
              detail.priceFactory.quotationDetail.summaryDetail!
                .nilaiInsurance /
                1000 +
              detail.priceFactory.quotationDetail.summaryDetail!.biayaAdmin;

            return {
              id: detail.id,
              jobOrder: detail.jobOrder,
              typeOrder: detail.typeOrder,
              loadDate: detail.loadDate,
              factory: detail.factory.code,
              factoryCity: detail.factory.city,
              route: detail.priceFactory.quotationDetail.route.code,
              containerSize: detail.priceFactory.quotationDetail.containerSize,
              serviceType:
                detail.priceFactory.quotationDetail.quotation.serviceType,
              containerType: detail.priceFactory.quotationDetail.containerType,
              insurance:
                detail.priceFactory.quotationDetail.summaryDetail!.insurance,
              nilaiInsurance: insuranceSum,
              ppn: detail.priceFactory.quotationDetail.summaryDetail!.ppn,
              ppftz: detail.priceFactory.quotationDetail.summaryDetail!.ppftz,
              nilaiPPFTZ:
                detail.priceFactory.quotationDetail.summaryDetail!.nilaiPPFTZ,
              shipping: detail.vesselSchedule.shipping.code,
              vessel: detail.vesselSchedule.vessel.id,
              voyage: detail.vesselSchedule.voyage,
              eta: detail.vesselSchedule.eta,
              etd: detail.vesselSchedule.etd,
            };
          })
        ),
      };
    }),

  getFactoryOptions: publicProcedure.query(async () => {
    return lodash.uniqBy(
      (await findAllPriceFactories(true)).map(
        ({
          quotationDetail: {
            quotation: { factory },
          },
        }) => ({
          label: `${factory.code} (${factory.name})`,
          value: factory.code,
        })
      ),
      (opt) => opt.value
    );
  }),

  getRouteOptions: publicProcedure
    .input(
      z.object({
        factory: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.factory) return [];

      return lodash.uniqBy(
        (await findAllPriceFactories(true))
          .filter(
            ({
              quotationDetail: {
                quotation: { factory },
              },
            }) => factory.code === input.factory
          )
          .map(({ quotationDetail: { route } }) => ({
            label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
            value: route.code,
          })),
        (opt) => opt.value
      );
    }),

  getContainerSizeOptions: publicProcedure
    .input(
      z.object({
        factory: z.string().optional(),
        route: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.factory || !input.route) return [];

      return lodash.uniqBy(
        (await findAllPriceFactories(true))
          .filter(
            ({
              quotationDetail: {
                quotation: { factory },
                route,
              },
            }) => factory.code === input.factory && route.code === input.route
          )
          .map(({ quotationDetail: { containerSize } }) => ({
            label: containerSize,
            value: containerSize,
          })),
        (opt) => opt.value
      );
    }),

  getQuotationDetail: publicProcedure
    .input(
      z.object({
        route: z.string().optional(),
        containerSize: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.route || !input.containerSize) return null;

      return (await findAllQuotationDetails(false, true)).find(
        ({ route, containerSize }) =>
          route.code === input.route && containerSize === input.containerSize
      );
    }),

  getVesselSchedule: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
        vessel: z.string().optional(),
        voyage: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.shipping || !input.vessel || !input.voyage) return null;

      return (await findAllVesselSchedule(true)).find(
        ({ shipping, vessel, voyage }) =>
          shipping.code === input.shipping &&
          vessel.id === input.vessel &&
          voyage === input.voyage
      );
    }),

  save: publicProcedure
    .input(inquiryValidationSchema)
    .input(z.object({ number: z.string().optional() }))
    .mutation(async ({ input }) => {
      if (input.number) {
        return await updateInquiry(input.number, input);
      }
      return await createInquiry(input);
    }),

  getShippingOptions: publicProcedure.query(async () => {
    return lodash.uniqBy(
      (await findAllVesselSchedule(true)).map((vesselSchedule) => ({
        label: `${vesselSchedule.shipping.code} (${vesselSchedule.shipping.name})`,
        value: vesselSchedule.shipping.code,
      })),
      (opt) => opt.value
    );
  }),

  getVesselOptions: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.shipping) return [];

      return lodash.uniqBy(
        (await findAllVesselSchedule(true))
          .filter(
            (vesselSchedule) => vesselSchedule.shipping.code === input.shipping
          )
          .map((vesselSchedule) => ({
            label: vesselSchedule.vessel.name,
            value: vesselSchedule.vessel.id,
          })),
        (opt) => opt.value
      );
    }),

  getVoyageOptions: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
        vessel: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.shipping || !input.vessel) return [];

      return lodash.uniqBy(
        (await findAllVesselSchedule(true))
          .filter(
            (vesselSchedule) =>
              vesselSchedule.shipping.code === input.shipping &&
              vesselSchedule.vessel.id === input.vessel
          )
          .map((vesselSchedule) => ({
            label: vesselSchedule.voyage,
            value: vesselSchedule.voyage,
          })),
        (opt) => opt.value
      );
    }),

  getTableRows: publicProcedure
    .input(
      z.object({
        isReviced: z.boolean().default(false),
        isConfirmed: z.boolean().default(false),
      })
    )
    .query<InquiryTableRow[]>(async ({ input }) => {
      const rows: InquiryTableRow[] = [];

      for (const inquiryDetail of await findAllInquiryDetails()) {
        if (
          input.isReviced == !inquiryDetail.isReviced ||
          input.isConfirmed == !inquiryDetail.confirmation
        )
          continue;

        const insuranceSum =
          inquiryDetail.priceFactory.quotationDetail.summaryDetail!
            .nilaiInsurance /
            1000 +
          inquiryDetail.priceFactory.quotationDetail.summaryDetail!.biayaAdmin;

        rows.push({
          number: inquiryDetail.inquiry.number,
          detailID: inquiryDetail.id,
          createDate: inquiryDetail.inquiry.createDate,
          sales: `${inquiryDetail.inquiry.sales.code} (${inquiryDetail.inquiry.sales.name})`,
          factory: `${inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`,
          factoryGroup: `${inquiryDetail.priceFactory.quotationDetail.quotation.factory.group.code} (${inquiryDetail.priceFactory.quotationDetail.quotation.factory.group.name})`,
          factoryAddress:
            inquiryDetail.priceFactory.quotationDetail.quotation.factory
              .address,
          factoryCity:
            inquiryDetail.priceFactory.quotationDetail.quotation.factory.city,
          purchase: `${inquiryDetail.inquiry.purchase.code} (${inquiryDetail.inquiry.purchase.name})`,
          purchaseAddress: inquiryDetail.inquiry.purchase.address,
          purchaseCity: inquiryDetail.inquiry.purchase.city,
          jobOrder: inquiryDetail.jobOrder,
          typeOrder: inquiryDetail.typeOrder,
          loadDate: inquiryDetail.loadDate,
          deliveryTo: `${inquiryDetail.factory.code} (${inquiryDetail.factory.name})`,
          deliveryToCity: inquiryDetail.factory.city,
          route: `${inquiryDetail.priceFactory.quotationDetail.route.code} (${inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
          containerSize:
            inquiryDetail.priceFactory.quotationDetail.containerSize,
          containerType:
            inquiryDetail.priceFactory.quotationDetail.containerType,
          serviceType:
            inquiryDetail.priceFactory.quotationDetail.quotation.serviceType,
          ppn: inquiryDetail.priceFactory.quotationDetail.summaryDetail!.ppn,
          insurance:
            inquiryDetail.priceFactory.quotationDetail.summaryDetail!.insurance,
          nilaiInsurance: insuranceSum,
          ppftz:
            inquiryDetail.priceFactory.quotationDetail.summaryDetail!.ppftz,
          nilaiPPFTZ:
            inquiryDetail.priceFactory.quotationDetail.summaryDetail!
              .nilaiPPFTZ,
          shipping: `${inquiryDetail.vesselSchedule.shipping.code} (${inquiryDetail.vesselSchedule.shipping.name})`,
          vessel: inquiryDetail.vesselSchedule.vessel.name,
          voyage: inquiryDetail.vesselSchedule.voyage,
          eta: inquiryDetail.vesselSchedule.eta,
          etd: inquiryDetail.vesselSchedule.etd,
        });
      }

      return rows;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await deleteInquiryDetailByID(input);
  }),
});
