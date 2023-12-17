import { extractNumberInquiry } from "@/server/dtos/inquiry.dto";
import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import {
  JobOrderConfirmationInput,
  JobOrderInput,
  JobOrderPindahKapalInput,
  createJobOrderNumber,
} from "../dtos/jobOrder.dto";
import { findAllPriceVendorDetails } from "./price.store";

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
  const jobOrder = await prisma.jobOrderConfirmation.findFirst({
    where: { number: jobOrderNumber },
    include: {
      inquiryDetail: {
        include: {
          inquiry: { include: { sales: true } },
          priceFactory: {
            include: {
              quotationDetail: {
                include: {
                  route: true,
                  factory: true,
                  quotation: { include: { factory: true } },
                },
              },
            },
          },
        },
      },
      consignee: true,
      priceVendorDetail: {
        include: {
          priceVendor: {
            include: {
              vendor: true,
            },
          },
          route: true,
        },
      },
      vehicle: true,
    },
  });
  if (!jobOrder) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There are no job order with number ${jobOrderNumber}`,
    });
  }

  return jobOrder;
}

export async function findAllJobOrder(onlyConfirmed = false) {
  return await prisma.jobOrderConfirmation.findMany({
    include: {
      inquiryDetail: {
        include: {
          inquiry: { include: { sales: true } },
          priceFactory: {
            include: {
              quotationDetail: {
                include: {
                  route: true,
                  factory: true,
                  quotation: { include: { factory: true } },
                },
              },
            },
          },
          vesselSchedule: {
            include: {
              shipping: true,
              vessel: true,
            },
          },
        },
      },
      consignee: true,
      priceVendorDetail: {
        include: {
          priceVendor: {
            include: {
              vendor: true,
            },
          },
          route: true,
        },
      },
      vehicle: true,
      suratPerintahMuatDanUangJalan: true,
      suratJalan: true,
    },
    where: onlyConfirmed
      ? {
          td: { not: null },
          ta: { not: null },
          sandar: { not: null },
        }
      : {},
  });
}

export async function createJobOrder(
  input: JobOrderInput,
  inquiryDetailID: string
) {
  const priceVendorDetail = (await findAllPriceVendorDetails()).find(
    ({ priceVendor: { vendor }, route }) =>
      vendor.code === input.vendor && route.code === input.trackingRoute
  );
  if (!priceVendorDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There is no price vendor with vendor ${input.vendor} and route ${input.trackingRoute}`,
    });
  }

  return await prisma.jobOrderConfirmation.create({
    data: {
      number: await findNextJobOrderNumber(),
      inquiryDetail: { connect: { id: inquiryDetailID } },
      roNumber: input.roNumber,
      consignee: { connect: { code: input.consignee } },
      stuffingDate: input.stuffingDate,
      priceVendorDetail: { connect: { id: priceVendorDetail.id } },
      vehicle: { connect: { truckNumber: input.vehicle } },
      driverName: input.driverName,
      driverPhoneNumber: input.driverPhoneNumber,
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
  const priceVendorDetail = (await findAllPriceVendorDetails()).find(
    ({ priceVendor: { vendor }, route }) =>
      vendor.code === input.vendor && route.code === input.trackingRoute
  );
  if (!priceVendorDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There is no price vendor with vendor ${input.vendor} and route ${input.trackingRoute}`,
    });
  }

  return await prisma.jobOrderConfirmation.update({
    where: {
      number: jobOrderNumber,
    },
    data: {
      roNumber: input.roNumber,
      consignee: { connect: { code: input.consignee } },
      stuffingDate: input.stuffingDate,
      priceVendorDetail: { connect: { id: priceVendorDetail.id } },
      vehicle: { connect: { truckNumber: input.vehicle } },
      driverName: input.driverName,
      driverPhoneNumber: input.driverPhoneNumber,
      containerNumber1: input.containerNumber1,
      sealNumber1: input.sealNumber1,
      containerNumber2: input.containerNumber2,
      sealNumber2: input.sealNumber2,
    },
  });
}

export async function reviceJobOrder(jobOrderNumber: string) {
  await prisma.$transaction(async (tx) => {
    const res = await tx.jobOrderConfirmation.delete({
      where: {
        number: jobOrderNumber,
      },
      select: {
        inquiryDetail: true,
      },
    });

    await tx.inquiryDetail.update({
      data: {
        isReviced: true,
      },
      where: {
        id: res.inquiryDetail.id,
      },
    });
  });
}

export async function confirmJobOrder(
  jobOrderNumber: string,
  input: JobOrderConfirmationInput
) {
  if ("td" in input) {
    return await prisma.jobOrderConfirmation.update({
      where: { number: jobOrderNumber },
      data: {
        td: input.td,
      },
    });
  } else if ("ta" in input) {
    return await prisma.jobOrderConfirmation.update({
      where: { number: jobOrderNumber },
      data: {
        ta: input.ta,
        sandar: input.sandar,
      },
    });
  }
}

export async function pindahKapalJobOrder(
  jobOrderNumber: string,
  input: JobOrderPindahKapalInput
) {
  const vesselSchedule = await prisma.vesselSchedule.findFirst({
    where: {
      shipping: { code: input.shipping },
      vessel: { id: input.vessel },
      voyage: input.voyage,
    },
  });
  if (!vesselSchedule) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There are no vessel schedule with shipping ${input.shipping}, vessel ${input.vessel} and voyage ${input.voyage}`,
    });
  }

  const jobOrder = await findJobOrderByNumber(jobOrderNumber);
  return await prisma.inquiryDetail.update({
    data: {
      vesselSchedule: { connect: { id: vesselSchedule.id } },
    },
    where: {
      id: jobOrder.inquiryDetail.id,
    },
  });
}
