import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import { DooringConfirmInput, DooringInput } from "../dtos/dooring.dto";

export async function findDooringByID(id: string) {
  const spm = await prisma.dooring.findFirst({
    where: { id },
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
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Dooring tidak ditemukan`,
    });
  }

  return spm;
}

export async function findAllDooring() {
  return await prisma.dooring.findMany({
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
          suratJalan: { include: {} },
        },
      },
    },
  });
}

export async function createDooring(input: DooringInput) {
  return await prisma.dooring.create({
    data: {
      jobOrderConfirmation: { connect: { number: input.jobOrder } },
      bongkarKapal: input.bongkarKapal,
      estimate: input.estimate,
    },
  });
}

export async function confirmDooring(id: string, input: DooringConfirmInput) {
  const dooring = await findDooringByID(id);

  return await prisma.dooring.update({
    where: { id: dooring.id },
    data: { actual: input.actual },
  });
}
