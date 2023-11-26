import { QuotationDetailSummaryDetailStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  QuotationInput,
  createQuotationNumber,
  extractNumberQuotation,
} from "../dtos/quotation.dto";
import prisma from "../prisma";

export async function findNextQuotationNumber() {
  const lastQuotation = await prisma.quotation.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastQuotation) {
    return createQuotationNumber(1);
  }

  return createQuotationNumber(
    extractNumberQuotation(lastQuotation.number) + 1
  );
}

export async function createQuotation(input: QuotationInput) {
  for (let i = 0; i < input.details.length; i++) {
    const detail = input.details[i];
    if (
      input.details.find(
        (d, dI) =>
          d.route === detail.route &&
          d.containerSize === d.containerSize &&
          dI !== i
      )
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "There must be no quotations with the same route and container size all together.",
      });
    }
  }

  return await prisma.quotation.create({
    data: {
      number: await findNextQuotationNumber(),
      serviceType: input.serviceType,
      sales: { connect: { code: input.sales } },
      effectiveStartDate: input.effectiveStartDate,
      effectiveEndDate: input.effectiveEndDate,
      factory: { connect: { code: input.factory } },
      details: {
        create: input.details.map((detail) => ({
          route: { connect: { code: detail.route } },
          factory: { connect: { code: detail.factory } },
          port: { connect: { code: detail.port } },
          containerSize: detail.containerSize,
          containerType: detail.containerType,
          trackingAsal: {
            create: {
              vendor: { connect: { code: detail.trackingAsal.vendor } },
              route: { connect: { code: detail.trackingAsal.route } },
            },
          },
          trackingTujuan: {
            create: {
              vendor: { connect: { code: detail.trackingTujuan.vendor } },
              route: { connect: { code: detail.trackingTujuan.route } },
            },
          },
          shippingDetail: {
            create: {
              shipping: { connect: { code: detail.shippingDetail.shipping } },
              route: { connect: { code: detail.shippingDetail.route } },
            },
          },
          otherExpanses: {
            adminBL: detail.otherExpanses.adminBL,
            cleaning: detail.otherExpanses.cleaning,
            alihKapal: detail.otherExpanses.alihKapal,
            materai: detail.otherExpanses.materai,
            biayaBuruh: detail.otherExpanses.biayaBuruh,
            stuffingDalam: detail.otherExpanses.stuffingDalam,
            stuffingLuar: detail.otherExpanses.stuffingLuar,
            biayaCetakRC: detail.otherExpanses.biayaCetakRC,
            biayaCetakIR: detail.otherExpanses.biayaCetakIR,
          },
          summaryDetail: {
            ppftz: detail.summaryDetail
              .ppftz as QuotationDetailSummaryDetailStatus,
            nilaiPPFTZ: detail.summaryDetail.nilaiPPFTZ,
            insurance: detail.summaryDetail
              .insurance as QuotationDetailSummaryDetailStatus,
            nilaiInsurance: detail.summaryDetail.nilaiInsurance,
            biayaAdmin: detail.summaryDetail.biayaAdmin,
            ppn: detail.summaryDetail.ppn as QuotationDetailSummaryDetailStatus,
            hargaJual: detail.summaryDetail.hargaJual,
          },
          completed: false,
        })),
      },
    },
  });
}

export async function findQuotationByNumber(number: string) {
  const quotation = await prisma.quotation.findFirst({
    where: { number },
    include: {
      factory: true,
      sales: true,
      details: {
        include: {
          factory: true,
          port: true,
          route: true,
          shippingDetail: {
            include: { route: true, shipping: true },
          },
          trackingAsal: {
            include: { route: true, vendor: true },
          },
          trackingTujuan: {
            include: { route: true, vendor: true },
          },
        },
      },
    },
  });
  if (!quotation) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Quotation with number ${number} not exists`,
    });
  }

  return quotation;
}

export async function findAllQuotationDetails() {
  return await prisma.quotationDetail.findMany({
    include: {
      quotation: {
        include: {
          sales: true,
          factory: true,
        },
      },
      factory: true,
      route: true,
      port: true,
      trackingAsal: {
        include: {
          route: true,
          vendor: {
            include: { priceVendors: true },
          },
        },
      },
      trackingTujuan: {
        include: {
          route: true,
          vendor: {
            include: { priceVendors: true },
          },
        },
      },
      shippingDetail: {
        include: {
          route: true,
          shipping: true,
        },
      },
    },
  });
}

export async function updateQuotation(number: string, input: QuotationInput) {
  for (let i = 0; i < input.details.length; i++) {
    const detail = input.details[i];
    if (
      input.details.find(
        (d, dI) =>
          d.route === detail.route &&
          d.containerSize === d.containerSize &&
          dI !== i
      )
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "There must be no quotations with the same route and container size all together.",
      });
    }
  }

  return await prisma.$transaction(async (tx) => {
    const quotationDetails = await prisma.quotationDetail.findMany({
      select: { id: true },
      where: { quotation: { number: number } },
    });

    for (const quotationDetail of quotationDetails) {
      const inputDetail = input.details.find(
        (d) => d.id === quotationDetail.id
      );

      if (inputDetail) {
        await tx.quotationDetail.update({
          where: { id: inputDetail.id },
          data: {
            quotation: { connect: { number: number } },
            route: { connect: { code: inputDetail.route } },
            factory: { connect: { code: inputDetail.factory } },
            port: { connect: { code: inputDetail.port } },
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            trackingAsal: {
              update: {
                vendor: { connect: { code: inputDetail.trackingAsal.vendor } },
                route: { connect: { code: inputDetail.trackingAsal.route } },
              },
            },
            trackingTujuan: {
              update: {
                vendor: {
                  connect: { code: inputDetail.trackingTujuan.vendor },
                },
                route: { connect: { code: inputDetail.trackingTujuan.route } },
              },
            },
            shippingDetail: {
              update: {
                shipping: {
                  connect: { code: inputDetail.shippingDetail.shipping },
                },
                route: { connect: { code: inputDetail.shippingDetail.route } },
              },
            },
            otherExpanses: {
              adminBL: inputDetail.otherExpanses.adminBL,
              cleaning: inputDetail.otherExpanses.cleaning,
              alihKapal: inputDetail.otherExpanses.alihKapal,
              materai: inputDetail.otherExpanses.materai,
              biayaBuruh: inputDetail.otherExpanses.biayaBuruh,
              stuffingDalam: inputDetail.otherExpanses.stuffingDalam,
              stuffingLuar: inputDetail.otherExpanses.stuffingLuar,
              biayaCetakRC: inputDetail.otherExpanses.biayaCetakRC,
              biayaCetakIR: inputDetail.otherExpanses.biayaCetakIR,
            },
            summaryDetail: {
              ppftz: inputDetail.summaryDetail
                .ppftz as QuotationDetailSummaryDetailStatus,
              nilaiPPFTZ: inputDetail.summaryDetail.nilaiPPFTZ,
              insurance: inputDetail.summaryDetail
                .insurance as QuotationDetailSummaryDetailStatus,
              nilaiInsurance: inputDetail.summaryDetail.nilaiInsurance,
              biayaAdmin: inputDetail.summaryDetail.biayaAdmin,
              ppn: inputDetail.summaryDetail
                .ppn as QuotationDetailSummaryDetailStatus,
              hargaJual: inputDetail.summaryDetail.hargaJual,
            },
            completed: false,
          },
        });
      } else {
        await tx.quotationDetail.delete({ where: { id: quotationDetail.id } });
      }
    }

    for (const inputDetail of input.details) {
      if (!quotationDetails.find((d) => d.id === inputDetail.id)) {
        await tx.quotationDetail.create({
          data: {
            quotation: { connect: { number } },
            route: { connect: { code: inputDetail.route } },
            factory: { connect: { code: inputDetail.factory } },
            port: { connect: { code: inputDetail.port } },
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            trackingAsal: {
              create: {
                vendor: { connect: { code: inputDetail.trackingAsal.vendor } },
                route: { connect: { code: inputDetail.trackingAsal.route } },
              },
            },
            trackingTujuan: {
              create: {
                vendor: {
                  connect: { code: inputDetail.trackingTujuan.vendor },
                },
                route: { connect: { code: inputDetail.trackingTujuan.route } },
              },
            },
            shippingDetail: {
              create: {
                shipping: {
                  connect: { code: inputDetail.shippingDetail.shipping },
                },
                route: { connect: { code: inputDetail.shippingDetail.route } },
              },
            },
            otherExpanses: {
              adminBL: inputDetail.otherExpanses.adminBL,
              cleaning: inputDetail.otherExpanses.cleaning,
              alihKapal: inputDetail.otherExpanses.alihKapal,
              materai: inputDetail.otherExpanses.materai,
              biayaBuruh: inputDetail.otherExpanses.biayaBuruh,
              stuffingDalam: inputDetail.otherExpanses.stuffingDalam,
              stuffingLuar: inputDetail.otherExpanses.stuffingLuar,
              biayaCetakRC: inputDetail.otherExpanses.biayaCetakRC,
              biayaCetakIR: inputDetail.otherExpanses.biayaCetakIR,
            },
            summaryDetail: {
              ppftz: inputDetail.summaryDetail
                .ppftz as QuotationDetailSummaryDetailStatus,
              nilaiPPFTZ: inputDetail.summaryDetail.nilaiPPFTZ,
              insurance: inputDetail.summaryDetail
                .insurance as QuotationDetailSummaryDetailStatus,
              nilaiInsurance: inputDetail.summaryDetail.nilaiInsurance,
              biayaAdmin: inputDetail.summaryDetail.biayaAdmin,
              ppn: inputDetail.summaryDetail
                .ppn as QuotationDetailSummaryDetailStatus,
              hargaJual: inputDetail.summaryDetail.hargaJual,
            },
            completed: false,
          },
        });
      }
    }

    return await tx.quotation.update({
      where: { number },
      data: {
        serviceType: input.serviceType,
        sales: { connect: { code: input.sales } },
        effectiveStartDate: input.effectiveStartDate,
        effectiveEndDate: input.effectiveEndDate,
        factory: { connect: { code: input.factory } },
      },
      include: {
        factory: true,
        sales: true,
        details: {
          include: {
            factory: true,
            port: true,
            route: true,
            shippingDetail: {
              include: { route: true, shipping: true },
            },
            trackingAsal: {
              include: { route: true, vendor: true },
            },
            trackingTujuan: {
              include: { route: true, vendor: true },
            },
          },
        },
      },
    });
  });
}

export async function confirmQuotationDetailByID(id: string) {
  return await prisma.quotationDetail.update({
    where: { id },
    data: { completed: true },
  });
}

export async function deleteQuotationDetailByID(id: string) {
  const quotationDetail = await prisma.quotationDetail.delete({
    where: { id },
    include: { quotation: { include: { details: true } } },
  });

  if (quotationDetail.quotation.details.length < 1) {
    await prisma.quotation.delete({
      where: { number: quotationDetail.quotation.number },
    });
  }

  return quotationDetail;
}
