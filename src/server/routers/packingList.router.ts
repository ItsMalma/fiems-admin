import lodash from "lodash";
import { z } from "zod";
import {
  PackingListDetailRealisationForm,
  PackingListTableRow,
  packingListValidationSchema,
} from "../dtos/packingList.dto";
import {
  createPackingList,
  findAllPackingList,
  findAllPackingListDetails,
  findNextPackingListNumber,
} from "../stores/packingList.store";
import { findAllVesselSchedule } from "../stores/vesselSchedule.store";
import { publicProcedure, router } from "../trpc";

export const packingListRouter = router({
  getNextNumber: publicProcedure.query(
    async () => await findNextPackingListNumber()
  ),

  save: publicProcedure
    .input(packingListValidationSchema)
    .mutation(async ({ input }) => {
      return await createPackingList(input);
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

  getDetailRealisations: publicProcedure
    .input(
      z.object({
        shipping: z.string().optional(),
        vessel: z.string().optional(),
        voyage: z.string().optional(),
      })
    )
    .query<PackingListDetailRealisationForm[]>(async ({ input }) => {
      if (!input.shipping || !input.vessel || !input.voyage) return [];

      return (
        await findAllPackingListDetails(
          input.shipping,
          input.vessel,
          input.voyage
        )
      ).map((jo) => ({
        factory: `${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`,
        factoryCity:
          jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.city,
        deliveryTo: `${jo.inquiryDetail.priceFactory.quotationDetail.factory.code} (${jo.inquiryDetail.priceFactory.quotationDetail.factory.name})`,
        deliveryToCity:
          jo.inquiryDetail.priceFactory.quotationDetail.factory.city,
        consignee: `${jo.consignee.code} (${jo.consignee.name})`,
        portOrigin: `${jo.inquiryDetail.vesselSchedule.portOrigin.code} (${jo.inquiryDetail.vesselSchedule.portOrigin.name})`,
        portDestination: `${jo.inquiryDetail.vesselSchedule.portDestination.code} (${jo.inquiryDetail.vesselSchedule.portDestination.name})`,
        serviceType:
          jo.inquiryDetail.priceFactory.quotationDetail.quotation.serviceType,
        containerNumber1: jo.containerNumber1,
        sealNumber1: jo.sealNumber1,
        containerNumber2: jo.containerNumber2,
        sealNumber2: jo.sealNumber2,
        suratJalan: jo.suratJalan!.number,
        bast: jo.suratJalan!.bast!.number,
      }));
    }),

  getTableRows: publicProcedure.query<PackingListTableRow[]>(async () => {
    return (await findAllPackingList()).map((packingList) => ({
      number: packingList.number,
      createDate: packingList.createDate,
      vessel: packingList.vesselSchedule.vessel.name,
    }));
  }),
});
