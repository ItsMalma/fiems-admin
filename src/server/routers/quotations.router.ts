import lodash from "lodash";
import moment from "moment";
import { z } from "zod";
import {
  QuotationForm,
  QuotationTableRow,
  calculateOtherExpanses,
  calculateShippingTotal,
  calculateTrackingTotal,
  quotationValidationSchema,
  transformQuotationStatus,
} from "../dtos/quotation.dto";
import {
  findAllPriceShippings,
  findAllPriceVendors,
  findPriceShippingByShipping,
  findPriceVendorByVendor,
} from "../stores/price.store";
import {
  confirmQuotationDetailByID,
  createQuotation,
  deleteQuotationDetailByID,
  findAllQuotationDetails,
  findAllQuotations,
  findNextQuotationNumber,
  findQuotationByNumber,
  findQuotationDetailHPP,
  findQuotationShippingDetail,
  findQuotationTrackingDetail,
  updateQuotation,
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

  findQuotationTrackingDetail: publicProcedure
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
        return await findQuotationTrackingDetail({
          vendor: input.vendor,
          route: input.route,
          port: input.port,
          containerSize: input.containerSize,
          containerType: input.containerType,
        });
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

  findQuotationShippingDetail: publicProcedure
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
        return await findQuotationShippingDetail({
          shipping: input.shipping,
          route: input.route,
          port: input.port,
          containerSize: input.containerSize,
          containerType: input.containerType,
        });
      }

      return null;
    }),

  saveQuotation: publicProcedure
    .input(quotationValidationSchema)
    .input(z.object({ number: z.string().optional() }))
    .mutation(async ({ input }) => {
      if (input.number) {
        return await updateQuotation(input.number, input);
      }
      return await createQuotation(input);
    }),

  confirmDetail: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await confirmQuotationDetailByID(input);
    }),

  getTableRows: publicProcedure
    .input(z.object({ completed: z.boolean().default(false) }))
    .query<QuotationTableRow[]>(async ({ input }) => {
      const rows: QuotationTableRow[] = [];

      const quotationDetails = await findAllQuotationDetails();

      for (const quotationDetail of quotationDetails) {
        if (input.completed !== quotationDetail.completed) continue;

        const trackingAsal = await findQuotationTrackingDetail({
          vendor: quotationDetail.trackingAsal!.vendor.code,
          route: quotationDetail.trackingAsal!.route.code,
          port: quotationDetail.port.code,
          containerSize: quotationDetail.containerSize,
          containerType: quotationDetail.containerType,
        });
        if (!trackingAsal) continue;

        const trackingTujuan = await findQuotationTrackingDetail({
          vendor: quotationDetail.trackingTujuan!.vendor.code,
          route: quotationDetail.trackingTujuan!.route.code,
          port: quotationDetail.port.code,
          containerSize: quotationDetail.containerSize,
          containerType: quotationDetail.containerType,
        });
        if (!trackingTujuan) continue;

        const shippingDetail = await findQuotationShippingDetail({
          shipping: quotationDetail.shippingDetail!.shipping.code,
          route: quotationDetail.shippingDetail!.route.code,
          port: quotationDetail.port.code,
          containerSize: quotationDetail.containerSize,
          containerType: quotationDetail.containerType,
        });
        if (!shippingDetail) continue;

        rows.push({
          detailID: quotationDetail.id,
          number: quotationDetail.quotation.number,
          createDate: quotationDetail.quotation.createDate,
          serviceType: quotationDetail.quotation.serviceType,
          sales: `${quotationDetail.quotation.sales.code} (${quotationDetail.quotation.sales.name})`,
          customer: `${quotationDetail.quotation.factory.code} (${quotationDetail.quotation.factory.name})`,
          route: `${quotationDetail.route.code} (${quotationDetail.route.startDescription} - ${quotationDetail.route.endDescription})`,
          deliveryTo: `${quotationDetail.factory.code} (${quotationDetail.factory.name})`,
          port: `${quotationDetail.port.code} (${quotationDetail.port.name})`,
          containerSize: quotationDetail.containerSize,
          containerType: quotationDetail.containerType,
          trackingAsal: calculateTrackingTotal(trackingAsal),
          trackingTujuan: calculateTrackingTotal(trackingTujuan),
          shippingDetail: calculateShippingTotal(shippingDetail),
          otherExpanses: calculateOtherExpanses(quotationDetail.otherExpanses!),
          ppftz: quotationDetail.summaryDetail!.nilaiPPFTZ,
          ppftzStatus: transformQuotationStatus(
            quotationDetail.summaryDetail!.ppftz
          ),
          insurance: quotationDetail.summaryDetail!.nilaiInsurance,
          insuranceStatus: transformQuotationStatus(
            quotationDetail.summaryDetail!.insurance
          ),
          ppn: quotationDetail.summaryDetail!.ppn,
          hargaJual: quotationDetail.summaryDetail!.hargaJual,
          status: moment(new Date()).isBetween(
            quotationDetail.quotation.effectiveStartDate,
            quotationDetail.quotation.effectiveEndDate,
            "day",
            "[]"
          ),
        });
      }

      return rows;
    }),

  getDefaultFormByNumber: publicProcedure
    .input(z.string().optional())
    .query<QuotationForm | null>(async ({ input }) => {
      if (!input) return null;

      const quotation = await findQuotationByNumber(input);

      return {
        number: quotation.number,
        createDate: quotation.createDate,
        serviceType: quotation.serviceType,
        sales: quotation.sales.code,
        effectiveStartDate: quotation.effectiveStartDate,
        effectiveEndDate: quotation.effectiveEndDate,
        factory: quotation.factory.code,
        factoryAddress: quotation.factory.address,
        details: await Promise.all(
          quotation.details.map(async (quotationDetail) => {
            const trackingAsalTotal = calculateTrackingTotal(
              (await findQuotationTrackingDetail({
                vendor: quotationDetail.trackingAsal!.vendor.code,
                route: quotationDetail.trackingAsal!.route.code,
                port: quotationDetail.port.code,
                containerSize: quotationDetail.containerSize,
                containerType: quotationDetail.containerType,
              }))!
            );

            const trackingTujuanTotal = calculateTrackingTotal(
              (await findQuotationTrackingDetail({
                vendor: quotationDetail.trackingTujuan!.vendor.code,
                route: quotationDetail.trackingTujuan!.route.code,
                port: quotationDetail.port.code,
                containerSize: quotationDetail.containerSize,
                containerType: quotationDetail.containerType,
              }))!
            );

            const shippingDetailTotal = calculateShippingTotal(
              (await findQuotationShippingDetail({
                shipping: quotationDetail.shippingDetail!.shipping.code,
                route: quotationDetail.shippingDetail!.route.code,
                port: quotationDetail.port.code,
                containerSize: quotationDetail.containerSize,
                containerType: quotationDetail.containerType,
              }))!
            );

            const otherExpansesTotal = calculateOtherExpanses(
              quotationDetail.otherExpanses!
            );

            const insuranceSum =
              quotationDetail.summaryDetail!.nilaiInsurance / 1000 +
              quotationDetail.summaryDetail!.biayaAdmin;

            const hpp =
              trackingAsalTotal +
              trackingTujuanTotal +
              shippingDetailTotal +
              otherExpansesTotal +
              quotationDetail.summaryDetail!.nilaiPPFTZ +
              insuranceSum;

            const hargaJual3 =
              quotationDetail.summaryDetail!.ppn === "Include"
                ? quotationDetail.summaryDetail!.hargaJual / 1.011
                : quotationDetail.summaryDetail!.hargaJual;

            return {
              id: quotationDetail.id,
              route: quotationDetail.route.code,
              factory: quotationDetail.factory.code,
              factoryAddress: quotationDetail.factory.address,
              factoryCity: quotationDetail.factory.address,
              port: quotationDetail.port.code,
              containerSize: quotationDetail.containerSize,
              containerType: quotationDetail.containerType,
              trackingAsal: {
                vendor: quotationDetail.trackingAsal!.vendor.code,
                route: quotationDetail.trackingAsal!.route.code,
                price: trackingAsalTotal,
              },
              trackingTujuan: {
                vendor: quotationDetail.trackingTujuan!.vendor.code,
                route: quotationDetail.trackingTujuan!.route.code,
                price: trackingTujuanTotal,
              },
              shippingDetail: {
                shipping: quotationDetail.shippingDetail!.shipping.code,
                route: quotationDetail.shippingDetail!.route.code,
                price: shippingDetailTotal,
              },
              otherExpanses: {
                adminBL: quotationDetail.otherExpanses!.adminBL,
                cleaning: quotationDetail.otherExpanses!.cleaning,
                alihKapal: quotationDetail.otherExpanses!.alihKapal,
                materai: quotationDetail.otherExpanses!.materai,
                biayaBuruh: quotationDetail.otherExpanses!.biayaBuruh,
                stuffingDalam: quotationDetail.otherExpanses!.stuffingDalam,
                stuffingLuar: quotationDetail.otherExpanses!.stuffingLuar,
                biayaCetakRC: quotationDetail.otherExpanses!.biayaCetakRC,
                biayaCetakIR: quotationDetail.otherExpanses!.biayaCetakIR,
                price: otherExpansesTotal,
              },
              summaryDetail: {
                ppftz: quotationDetail.summaryDetail!.ppftz,
                nilaiPPFTZ: quotationDetail.summaryDetail!.nilaiPPFTZ,
                insurance: quotationDetail.summaryDetail!.insurance,
                nilaiInsurance: quotationDetail.summaryDetail!.nilaiInsurance,
                rate: "0,10%",
                biayaAdmin: quotationDetail.summaryDetail!.biayaAdmin,
                insuranceSum: insuranceSum,
                hpp,
                ppn: quotationDetail.summaryDetail!.ppn,
                hargaJual: quotationDetail.summaryDetail!.hargaJual,
                hargaJual2: (hargaJual3 * 11) / 1000,
                hargaJual3,
                profit: hargaJual3 - hpp,
              },
            };
          })
        ),
      };
    }),

  deleteDetail: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await deleteQuotationDetailByID(input);
    }),

  getOptions: publicProcedure.query(async () => {
    return (await findAllQuotations()).map((quotation) => ({
      label: `${quotation.number} (${quotation.factory.name})`,
      value: quotation.number,
    }));
  }),

  getHPP: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return;

      return await findQuotationDetailHPP(input);
    }),
});
