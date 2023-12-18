import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import {
  InsuranceInput,
  createInsuranceNumber,
  extractInsuranceNumber,
} from "../dtos/insurance.dto";

export async function findNextInsuranceNumber() {
  const lastInsurance = await prisma.insurance.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastInsurance) {
    return createInsuranceNumber(1);
  }

  return createInsuranceNumber(
    extractInsuranceNumber(lastInsurance.number) + 1
  );
}

export async function findInsuranceByNumber(insuranceNumber: string) {
  const spm = await prisma.insurance.findFirst({
    where: { number: insuranceNumber },
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
      message: `Tidak ada insurance dengan nomor ${insuranceNumber}`,
    });
  }

  return spm;
}

export async function findAllInsurance() {
  return await prisma.insurance.findMany({
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
    },
  });
}

export async function createInsurance(input: InsuranceInput) {
  return await prisma.insurance.create({
    data: {
      number: await findNextInsuranceNumber(),
      jobOrderConfirmation: { connect: { number: input.jobOrder } },
      nilaiTertanggung: input.nilaiTertanggung,
      premi: input.premi,
      keterangan: input.keterangan,
    },
  });
}
