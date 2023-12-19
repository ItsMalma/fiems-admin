import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import {
  PackingListInput,
  createPackingListNumber,
  extractPackingListNumber,
} from "../dtos/packingList.dto";

export async function findNextPackingListNumber() {
  const lastPackingList = await prisma.packingList.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastPackingList) {
    return createPackingListNumber(1);
  }

  return createPackingListNumber(
    extractPackingListNumber(lastPackingList.number) + 1
  );
}

export async function findPackingListByNumber(packingListNumber: string) {
  const spm = await prisma.packingList.findFirst({
    where: { number: packingListNumber },
    include: {
      vesselSchedule: { include: { shipping: true, vessel: true } },
      detailRealisations: {
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
        },
      },
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Tidak ada packing list dengan nomor ${packingListNumber}`,
    });
  }

  return spm;
}

export async function findAllPackingList() {
  return await prisma.packingList.findMany({
    include: {
      vesselSchedule: { include: { shipping: true, vessel: true } },
      detailRealisations: {
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
        },
      },
    },
  });
}

export async function findAllPackingListDetails(
  shipping: string,
  vessel: string,
  voyage: string
) {
  return await prisma.jobOrderConfirmation.findMany({
    include: {
      consignee: true,
      inquiryDetail: {
        include: {
          priceFactory: {
            include: {
              quotationDetail: {
                include: {
                  quotation: { include: { factory: true } },
                  factory: true,
                },
              },
            },
          },
          vesselSchedule: {
            include: {
              shipping: true,
              vessel: true,
              portOrigin: true,
              portDestination: true,
            },
          },
        },
      },
      suratJalan: { include: { bast: true } },
    },
    where: {
      inquiryDetail: {
        vesselSchedule: {
          shipping: { code: shipping },
          vessel: { id: vessel },
          voyage: voyage,
        },
      },
      NOT: {
        suratJalan: { bast: null },
      },
    },
  });
}

export async function createPackingList(input: PackingListInput) {
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
      message: `Tidak ada vessel schedule dengan shipping ${input.shipping}, vessel ${input.vessel} dan voyage ${input.voyage}`,
    });
  }

  return await prisma.packingList.create({
    data: {
      number: await findNextPackingListNumber(),
      vesselSchedule: { connect: { id: vesselSchedule.id } },
      detailRealisations: {
        connect: input.details.map((inputDetail) => ({
          number: inputDetail.number,
        })),
      },
    },
  });
}
