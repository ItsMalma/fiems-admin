import { extractNumberInquiry } from "@/server/dtos/inquiry.dto";
import prisma from "@/server/prisma";
import { JobOrderInput, createJobOrderNumber } from "../dtos/jobOrder.dto";

export async function findNextJobOrderNumber() {
  const lastJobOrder = await prisma.jobOrderConfirmation.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastJobOrder) {
    return createJobOrderNumber(1);
  }

  return createJobOrderNumber(extractNumberInquiry(lastJobOrder.number) + 1);
}

export async function findJobOrderByNumber(jobOrderNumber: string) {
  return await prisma.jobOrderConfirmation.findFirst({
    where: { number: jobOrderNumber },
    include: {
      inquiryDetail: {
        include: {
          inquiry: { include: { sales: true, factory: true } },
          priceFactory: {
            include: {
              quotationDetail: { include: { route: true, factory: true } },
            },
          },
          factory: true,
          shipping: true,
          vessel: true,
        },
      },
      consignee: true,
      route: true,
      vendor: true,
      vehicle: true,
    },
  });
}

export async function findAllJobOrder() {
  return await prisma.jobOrderConfirmation.findMany({
    include: {
      inquiryDetail: {
        include: {
          inquiry: { include: { sales: true, factory: true } },
          priceFactory: {
            include: {
              quotationDetail: { include: { route: true, factory: true } },
            },
          },
          factory: true,
          shipping: true,
          vessel: true,
        },
      },
      consignee: true,
      route: true,
      vendor: true,
      vehicle: true,
    },
  });
}

export async function createJobOrder(
  input: JobOrderInput,
  inquiryDetailID: string
) {
  return await prisma.jobOrderConfirmation.create({
    data: {
      number: await findNextJobOrderNumber(),
      inquiryDetail: { connect: { id: inquiryDetailID } },
      roNumber: input.roNumber,
      consignee: { connect: { code: input.consignee } },
      stuffingDate: input.stuffingDate,
      route: { connect: { code: input.trackingRoute } },
      vendor: { connect: { code: input.vendor } },
      driverName: input.driverName,
      driverPhoneNumber: input.driverPhoneNumber,
      vehicle: { connect: { truckNumber: input.vehicle } },
      containerNumber1: input.containerNumber1,
      sealNumber1: input.sealNumber1,
      containerNumber2: input.containerNumber2,
      sealNumber2: input.sealNumber2,
    },
  });
}

export async function updateJobOrder(
  jobOrderNumber: string,
  input: JobOrderInput
) {
  return await prisma.jobOrderConfirmation.update({
    where: {
      number: jobOrderNumber,
    },
    data: {
      roNumber: input.roNumber,
      consignee: { connect: { code: input.consignee } },
      stuffingDate: input.stuffingDate,
      route: { connect: { code: input.trackingRoute } },
      vendor: { connect: { code: input.vendor } },
      driverName: input.driverName,
      driverPhoneNumber: input.driverPhoneNumber,
      vehicle: { connect: { truckNumber: input.vehicle } },
      containerNumber1: input.containerNumber1,
      sealNumber1: input.sealNumber1,
      containerNumber2: input.containerNumber2,
      sealNumber2: input.sealNumber2,
    },
  });
}
