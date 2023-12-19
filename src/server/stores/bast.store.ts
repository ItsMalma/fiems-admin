import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import {
  BASTInput,
  createBASTNumber,
  extractBASTNumber,
} from "../dtos/bast.dto";

export async function findNextBASTNumber() {
  const lastBAST = await prisma.beritaAcaraSerahTerima.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastBAST) {
    return createBASTNumber(1);
  }

  return createBASTNumber(extractBASTNumber(lastBAST.number) + 1);
}

export async function findBASTByNumber(bastNumber: string) {
  const spm = await prisma.beritaAcaraSerahTerima.findFirst({
    where: { number: bastNumber },
    include: {
      suratJalan: {
        include: {
          jobOrderConfirmation: {
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
          detailProducts: { include: { product: true } },
        },
      },
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Tidak ada berita acara serah terima dengan nomor ${bastNumber}`,
    });
  }

  return spm;
}

export async function findAllBAST() {
  return await prisma.beritaAcaraSerahTerima.findMany({
    include: {
      suratJalan: {
        include: {
          jobOrderConfirmation: {
            include: {
              inquiryDetail: {
                include: {
                  priceFactory: {
                    include: {
                      quotationDetail: {
                        include: {
                          factory: true,
                          quotation: { include: { factory: true } },
                        },
                      },
                    },
                  },
                },
              },
              priceVendorDetail: { include: { route: true, uangJalan: true } },
              vehicle: true,
              consignee: true,
            },
          },
          detailProducts: { include: { product: true } },
        },
      },
    },
  });
}

export async function createBAST(input: BASTInput) {
  return await prisma.beritaAcaraSerahTerima.create({
    data: {
      number: await findNextBASTNumber(),
      suratJalan: { connect: { number: input.suratJalan } },
      detailProducts: {
        connect: input.details.map((inputDetail) => ({ id: inputDetail.id })),
      },
    },
  });
}
