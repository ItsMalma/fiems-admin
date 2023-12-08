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
import { findAllQuotationDetails } from "../stores/quotation.store";
import { findAllVessel } from "../stores/vessel.store";
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
        factory: inquiry.factory.code,
        factoryGroup: inquiry.factory.group.code,
        factoryAddress: inquiry.factory.address,
        factoryCity: inquiry.factory.city,
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
              shipping: detail.shippingCode,
              vessel: detail.vessel.id,
              voyage: detail.voyage,
              eta: detail.eta,
              etd: detail.etd,
            };
          })
        ),
      };
    }),

  getRouteOptions: publicProcedure.query(async () => {
    return (await findAllQuotationDetails(false, true)).map(({ route }) => ({
      label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
      value: route.code,
    }));
  }),

  getContainerSizeOptions: publicProcedure
    .input(
      z.object({
        route: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.route) return [];

      return (await findAllQuotationDetails(false, true))
        .filter((detail) => detail.route.code === input.route)
        .map(({ containerSize }) => ({
          label: containerSize,
          value: containerSize,
        }));
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

  save: publicProcedure
    .input(inquiryValidationSchema)
    .input(z.object({ number: z.string().optional() }))
    .mutation(async ({ input }) => {
      if (input.number) {
        return await updateInquiry(input.number, input);
      }
      return await createInquiry(input);
    }),

  getVesselsOptions: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return [];
      return (await findAllVessel(true))
        .filter((vessel) => vessel.shipping.code === input)
        .map((vessel) => ({
          label: `${vessel.name}`,
          value: vessel.id,
        }));
    }),

  getTableRows: publicProcedure.query<InquiryTableRow[]>(async () => {
    const rows: InquiryTableRow[] = [];

    for (const inquiryDetail of await findAllInquiryDetails()) {
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
        factory: `${inquiryDetail.inquiry.factory.code} (${inquiryDetail.inquiry.factory.name})`,
        factoryGroup: `${inquiryDetail.inquiry.factory.group.code} (${inquiryDetail.inquiry.factory.group.name})`,
        factoryAddress: inquiryDetail.inquiry.factory.address,
        factoryCity: inquiryDetail.inquiry.factory.city,
        purchase: `${inquiryDetail.inquiry.purchase.code} (${inquiryDetail.inquiry.purchase.name})`,
        purchaseAddress: inquiryDetail.inquiry.purchase.address,
        purchaseCity: inquiryDetail.inquiry.purchase.city,
        jobOrder: inquiryDetail.jobOrder,
        typeOrder: inquiryDetail.typeOrder,
        loadDate: inquiryDetail.loadDate,
        deliveryTo: `${inquiryDetail.factory.code} (${inquiryDetail.factory.name})`,
        deliveryToCity: inquiryDetail.factory.city,
        route: `${inquiryDetail.priceFactory.quotationDetail.route.code} (${inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
        containerSize: inquiryDetail.priceFactory.quotationDetail.containerSize,
        containerType: inquiryDetail.priceFactory.quotationDetail.containerType,
        serviceType:
          inquiryDetail.priceFactory.quotationDetail.quotation.serviceType,
        ppn: inquiryDetail.priceFactory.quotationDetail.summaryDetail!.ppn,
        insurance:
          inquiryDetail.priceFactory.quotationDetail.summaryDetail!.insurance,
        nilaiInsurance: insuranceSum,
        ppftz: inquiryDetail.priceFactory.quotationDetail.summaryDetail!.ppftz,
        nilaiPPFTZ:
          inquiryDetail.priceFactory.quotationDetail.summaryDetail!.nilaiPPFTZ,
        shipping: `${inquiryDetail.shipping.code} (${inquiryDetail.shipping.name})`,
        vessel: inquiryDetail.vessel.name,
        voyage: inquiryDetail.voyage,
        eta: inquiryDetail.eta,
        etd: inquiryDetail.etd,
      });
    }

    return rows;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await deleteInquiryDetailByID(input);
  }),
});
