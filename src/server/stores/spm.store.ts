import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import { SPMInput, createSPMNumber, extractSPMNumber } from "../dtos/spm.dto";

export async function findNextSPMNumber() {
  const lastSPM = await prisma.suratPerintahMuatDanUangJalan.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastSPM) {
    return createSPMNumber(1);
  }

  return createSPMNumber(extractSPMNumber(lastSPM.number) + 1);
}

export async function findSPMByNumber(spmNumber: string) {
  const spm = await prisma.suratPerintahMuatDanUangJalan.findFirst({
    where: { number: spmNumber },
    include: {
      jobOrderConfirmation: true,
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Tidak ada SPM & UJ dengan nomor ${spmNumber}`,
    });
  }

  return spm;
}

export async function findAllSPM() {
  return await prisma.suratPerintahMuatDanUangJalan.findMany({
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
      uangJalan: true,
    },
  });
}

export async function createSPM(input: SPMInput, uangJalanID: string) {
  return await prisma.suratPerintahMuatDanUangJalan.create({
    data: {
      number: await findNextSPMNumber(),
      jobOrderConfirmation: { connect: { number: input.jobOrder } },
      uangJalan: { connect: { id: uangJalanID } },
    },
  });
}
