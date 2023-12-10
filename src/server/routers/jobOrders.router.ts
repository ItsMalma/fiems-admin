import { publicProcedure } from "@/server/trpc";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import {
  JobOrderForm,
  JobOrderTableRow,
  jobOrderValidationSchema,
} from "../dtos/jobOrder.dto";
import { findInquiryDetailByID } from "../stores/inquiry.store";
import {
  createJobOrder,
  findAllJobOrder,
  findNextJobOrderNumber,
  updateJobOrder,
} from "../stores/jobOrder.store";
import { router } from "../trpc";

export const jobOrdersRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextJobOrderNumber()
  ),

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
        shipping: `${inquiryDetail.shipping.code} (${inquiryDetail.shipping.name})`,
        vessel: inquiryDetail.vessel.name,
        voyage: inquiryDetail.voyage,
        etd: inquiryDetail.etd,
        eta: inquiryDetail.eta,
        loadDate: inquiryDetail.loadDate,
        route: `${inquiryDetail.priceFactory.quotationDetail.route.code} (${inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
        factory: `${inquiryDetail.inquiry.factory.code} (${inquiryDetail.inquiry.factory.name})`,
        factoryAddress: inquiryDetail.inquiry.factory.address,
        deliveryTo: `${inquiryDetail.factory.code} (${inquiryDetail.factory.name})`,
        deliveryToCity: inquiryDetail.factory.city,
        containerSize: inquiryDetail.priceFactory.quotationDetail.containerSize,
        containerType: inquiryDetail.priceFactory.quotationDetail.containerType,
        typeOrder: inquiryDetail.typeOrder,
      };
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

  getTableRows: publicProcedure.query<JobOrderTableRow[]>(async () => {
    return (await findAllJobOrder()).map((jobOrder) => ({
      number: jobOrder.number,
      createDate: jobOrder.createDate,
      inquiryNumber: jobOrder.inquiryDetail.inquiry.number,
      inquiryDate: jobOrder.inquiryDetail.inquiry.createDate,
      sales: `${jobOrder.inquiryDetail.inquiry.sales.code} (${jobOrder.inquiryDetail.inquiry.sales.name})`,
      shipping: `${jobOrder.inquiryDetail.shipping.code} (${jobOrder.inquiryDetail.shipping.name})`,
      vessel: jobOrder.inquiryDetail.vessel.name,
      voyage: jobOrder.inquiryDetail.voyage,
      etd: jobOrder.inquiryDetail.etd,
      eta: jobOrder.inquiryDetail.eta,
      loadDate: jobOrder.inquiryDetail.loadDate,
      route: `${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.code} (${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.startDescription} - ${jobOrder.inquiryDetail.priceFactory.quotationDetail.route.endDescription})`,
      factory: `${jobOrder.inquiryDetail.inquiry.factory.code} (${jobOrder.inquiryDetail.inquiry.factory.name})`,
      factoryAddress: jobOrder.inquiryDetail.inquiry.factory.address,
      deliveryTo: `${jobOrder.inquiryDetail.factory.code} (${jobOrder.inquiryDetail.factory.name})`,
      deliveryToCity: jobOrder.inquiryDetail.factory.city,
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
      trackingRoute: `${jobOrder.route.code} (${jobOrder.route.startDescription} - ${jobOrder.route.endDescription})`,
      vendor: `${jobOrder.vendor.code} (${jobOrder.vendor.name})`,
      driverName: jobOrder.driverName,
      driverPhoneNumber: jobOrder.driverPhoneNumber,
      vehicle: jobOrder.vehicle.truckNumber,
      vehicleType: jobOrder.vehicle.type,
      containerNumber1: jobOrder.containerNumber1,
      sealNumber1: jobOrder.sealNumber1,
      containerNumber2: jobOrder.containerNumber2,
      sealNumber2: jobOrder.sealNumber2,
    }));
  }),
});
