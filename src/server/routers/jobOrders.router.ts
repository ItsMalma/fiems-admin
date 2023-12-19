import { publicProcedure } from "@/server/trpc";
import lodash from "lodash";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import {
  JobOrderForm,
  JobOrderTableRow,
  jobOrderConfirmationValidationSchema1,
  jobOrderConfirmationValidationSchema2,
  jobOrderPindahKapalValidationSchema,
  jobOrderValidationSchema,
} from "../dtos/jobOrder.dto";
import { findInquiryDetailByID } from "../stores/inquiry.store";
import {
  confirmJobOrder,
  createJobOrder,
  findAllJobOrder,
  findJobOrderByNumber,
  findNextJobOrderNumber,
  pindahKapalJobOrder,
  reviceJobOrder,
  updateJobOrder,
} from "../stores/jobOrder.store";
import {
  findAllPriceVendorDetails,
  findAllPriceVendors,
} from "../stores/price.store";
import { findAllVehicle } from "../stores/vehicle.store";
import { router } from "../trpc";

export const jobOrdersRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextJobOrderNumber()
  ),

  getOptions: publicProcedure.query(async () => {
    return (await findAllJobOrder(true)).map((jobOrder) => ({
      label: jobOrder.number,
      value: jobOrder.number,
    }));
  }),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return null;
      return await findJobOrderByNumber(input);
    }),

  getInquiryDetail: publicProcedure
    .input(z.string().optional())
    .query<DefaultValues<JobOrderForm> | null>(async ({ input }) => {
      if (!input) return null;

      const inquiryDetail = await findInquiryDetailByID(input);

      return {
        createDate: new Date(),
        inquiryNumber: inquiryDetail.inquiry.number,
        inquiryDate: inquiryDetail.inquiry.createDate,
        sales: `${inquiryDetail.inquiry.sales.code} (${inquiryDetail.inquiry.sales.name})`,
        shipping: `${inquiryDetail.vesselSchedule.shipping.code} (${inquiryDetail.vesselSchedule.shipping.name})`,
        vessel: inquiryDetail.vesselSchedule.vessel.name,
        voyage: inquiryDetail.vesselSchedule.voyage,
        etd: inquiryDetail.vesselSchedule.etd,
        eta: inquiryDetail.vesselSchedule.eta,
        loadDate: inquiryDetail.loadDate,
        route: `${inquiryDetail.priceFactory.quotationDetail.route.code} (${inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
        factory: `${inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`,
        factoryAddress:
          inquiryDetail.priceFactory.quotationDetail.quotation.factory.address,
        deliveryTo: `${inquiryDetail.priceFactory.quotationDetail.factory.code} (${inquiryDetail.priceFactory.quotationDetail.factory.name})`,
        deliveryToCity: inquiryDetail.priceFactory.quotationDetail.factory.city,
        containerSize: inquiryDetail.priceFactory.quotationDetail.containerSize,
        containerType: inquiryDetail.priceFactory.quotationDetail.containerType,
        typeOrder: inquiryDetail.typeOrder,
      };
    }),

  getTrackingOptions: publicProcedure.query(async () => {
    return lodash.uniqBy(
      (await findAllPriceVendors()).map((priceVendor) => ({
        label: `${priceVendor.vendor.code} (${priceVendor.vendor.name})`,
        value: priceVendor.vendor.code,
      })),
      (opt) => opt.value
    );
  }),

  getRouteOptions: publicProcedure
    .input(
      z.object({
        tracking: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.tracking) return [];

      return lodash.uniqBy(
        (await findAllPriceVendorDetails())
          .filter(
            ({ priceVendor: { vendor } }) => vendor.code === input.tracking
          )
          .map(({ route }) => ({
            label: `${route.code} (${route.startDescription} - ${route.endDescription})`,
            value: route.code,
          })),
        (opt) => opt.value
      );
    }),

  getTruckOptions: publicProcedure
    .input(
      z.object({
        tracking: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!input.tracking) return [];

      return lodash.uniqBy(
        (await findAllVehicle(true))
          .filter(({ vendor }) => vendor.code === input.tracking)
          .map((vehicle) => ({
            label: vehicle.truckNumber,
            value: vehicle.truckNumber,
          })),
        (opt) => opt.value
      );
    }),

  save: publicProcedure
    .input(jobOrderValidationSchema)
    .input(
      z.union([
        z.object({ inquiryDetail: z.string() }),
        z.object({ number: z.string() }),
      ])
    )
    .mutation(async ({ input }) => {
      if ("inquiryDetail" in input) {
        await createJobOrder(input, input.inquiryDetail);
      } else if ("number" in input) {
        await updateJobOrder(input.number, input);
      }
    }),

  getTableRows: publicProcedure
    .input(
      z.object({
        isConfirmed: z.boolean().default(false),
      })
    )
    .query<JobOrderTableRow[]>(async ({ input }) => {
      return (await findAllJobOrder())
        .filter((jobOrder) => input.isConfirmed == (jobOrder.td != null))
        .map((jobOrder) => ({
          number: jobOrder.number,
          createDate: jobOrder.createDate,
          inquiryNumber: jobOrder.inquiryDetail.inquiry.number,
          inquiryDate: jobOrder.inquiryDetail.inquiry.createDate,
          sales: `${jobOrder.inquiryDetail.inquiry.sales.code} (${jobOrder.inquiryDetail.inquiry.sales.name})`,
          shipping: `${jobOrder.inquiryDetail.vesselSchedule.shipping.code} (${jobOrder.inquiryDetail.vesselSchedule.shipping.name})`,
          vessel: jobOrder.inquiryDetail.vesselSchedule.vessel.name,
          voyage: jobOrder.inquiryDetail.vesselSchedule.voyage,
          etd: jobOrder.inquiryDetail.vesselSchedule.etd,
          eta: jobOrder.inquiryDetail.vesselSchedule.eta,
          loadDate: jobOrder.inquiryDetail.loadDate,
          route: `${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.code} (${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
          factory: `${jobOrder.inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${jobOrder.inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`,
          factoryAddress:
            jobOrder.inquiryDetail.priceFactory.quotationDetail.quotation
              .factory.address,
          deliveryTo: `${jobOrder.inquiryDetail.priceFactory.quotationDetail.factory.code} (${jobOrder.inquiryDetail.priceFactory.quotationDetail.factory.name})`,
          deliveryToCity:
            jobOrder.inquiryDetail.priceFactory.quotationDetail.factory.city,
          containerSize:
            jobOrder.inquiryDetail.priceFactory.quotationDetail.containerSize,
          containerType:
            jobOrder.inquiryDetail.priceFactory.quotationDetail.containerType,
          typeOrder: jobOrder.inquiryDetail.typeOrder,
          roNumber: jobOrder.roNumber,
          consignee: `${jobOrder.consignee.code} (${jobOrder.consignee.name})`,
          consigneeAddress: jobOrder.consignee.address,
          consigneeCity: jobOrder.consignee.city,
          consigneeEmail: jobOrder.consignee.email,
          consigneeTelephone: jobOrder.consignee.telephone,
          stuffingDate: jobOrder.stuffingDate,
          trackingRoute: `${jobOrder.priceVendorDetail.route.code} (${jobOrder.priceVendorDetail.route.startDescription} - ${jobOrder.priceVendorDetail.route.endDescription})`,
          vendor: `${jobOrder.priceVendorDetail.priceVendor.vendor.code} (${jobOrder.priceVendorDetail.priceVendor.vendor.name})`,
          driverName: jobOrder.driverName,
          driverPhoneNumber: jobOrder.driverPhoneNumber,
          vehicle: jobOrder.vehicle.truckNumber,
          vehicleType: jobOrder.vehicle.type,
          containerNumber1: jobOrder.containerNumber1,
          sealNumber1: jobOrder.sealNumber1,
          containerNumber2: jobOrder.containerNumber2,
          sealNumber2: jobOrder.sealNumber2,
          td: jobOrder.td,
          ta: jobOrder.ta,
          sandar: jobOrder.sandar,
        }));
    }),

  revice: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await reviceJobOrder(input);
  }),

  confirm: publicProcedure
    .input(
      z.union([
        jobOrderConfirmationValidationSchema1,
        jobOrderConfirmationValidationSchema2,
      ])
    )
    .input(
      z.object({
        number: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await confirmJobOrder(input.number, input);
    }),

  pindahKapal: publicProcedure
    .input(jobOrderPindahKapalValidationSchema)
    .input(
      z.object({
        number: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await pindahKapalJobOrder(input.number, input);
    }),
});
