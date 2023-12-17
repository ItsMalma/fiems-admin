import prisma from "@/server/prisma";
import { SuratJalanTypeProduct } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  SuratJalanInput,
  createSuratJalanNumber,
  extractSuratJalanNumber,
} from "../dtos/suratJalan.dto";

export async function findNextSuratJalanNumber() {
  const lastSuratJalan = await prisma.suratJalan.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastSuratJalan) {
    return createSuratJalanNumber(1);
  }

  return createSuratJalanNumber(
    extractSuratJalanNumber(lastSuratJalan.number) + 1
  );
}

export async function findSuratJalanByNumber(suratJalanNumber: string) {
  const spm = await prisma.suratJalan.findFirst({
    where: { number: suratJalanNumber },
    include: {
      jobOrderConfirmation: true,
      detailProducts: { include: { product: true } },
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Tidak ada surat jalan dengan nomor ${suratJalanNumber}`,
    });
  }

  return spm;
}

export async function findAllSuratJalan() {
  return await prisma.suratJalan.findMany({
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
  });
}

export async function createSuratJalan(input: SuratJalanInput) {
  return await prisma.suratJalan.create({
    data: {
      number: await findNextSuratJalanNumber(),
      jobOrderConfirmation: { connect: { number: input.jobOrder } },
      shipmentOrDO: input.shipmentOrDO,
      typeProduct: input.typeProduct as SuratJalanTypeProduct,
      detailProducts: {
        create: input.details.map((d) => ({
          product: { connect: { skuCode: d.product } },
          qty: d.quantity,
          unit: d.unit,
        })),
      },
    },
  });
}
