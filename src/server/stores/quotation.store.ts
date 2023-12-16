import {
  findPriceShippingByShipping,
  findPriceVendorByVendor,
} from "@/server/stores/price.store";
import { QuotationDetailSummaryDetailStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  QuotationInput,
  calculateOtherExpanses,
  calculateShippingTotal,
  calculateTrackingTotal,
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

export async function checkQuotationDetailDuplicate(
  routeCode: string,
  containerSize: string
): Promise<boolean> {
  return !!(await prisma.quotationDetail.findFirst({
    where: { route: { code: routeCode }, containerSize },
  }));
}

export async function findQuotationByNumber(number: string) {
  const quotation = await prisma.quotation.findFirst({
    where: { number },
    include: {
      factory: true,
      sales: true,
      details: {
        include: {
          quotation: true,
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

export async function findAllQuotationDetails(
  onlyActive: boolean = false,
  onlyComplete: boolean = false
) {
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
    where: {
      quotation: onlyActive
        ? {
            effectiveStartDate: {
              lte: new Date(),
            },
            effectiveEndDate: {
              gte: new Date(),
            },
          }
        : {},
      completed: onlyComplete ? true : {},
    },
  });
}

export async function findQuotationDetail(id: string) {
  const quotationDetail = await prisma.quotationDetail.findFirst({
    where: { id },
    include: {
      quotation: true,
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
  });
  if (!quotationDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Quotation detail with id ${id} not exists`,
    });
  }

  return quotationDetail;
}

export async function findQuotationDetailHPP(id: string) {
  const quotationDetail = await findQuotationDetail(id);

  return (
    calculateTrackingTotal(
      (await findQuotationTrackingDetail({
        vendor: quotationDetail.trackingAsal!.vendor.code,
        route: quotationDetail.trackingAsal!.route.code,
        port: quotationDetail.port.code,
        containerSize: quotationDetail.containerSize,
        containerType: quotationDetail.containerType,
      }))!
    ) +
    calculateTrackingTotal(
      (await findQuotationTrackingDetail({
        vendor: quotationDetail.trackingTujuan!.vendor.code,
        route: quotationDetail.trackingTujuan!.route.code,
        port: quotationDetail.port.code,
        containerSize: quotationDetail.containerSize,
        containerType: quotationDetail.containerType,
      }))!
    ) +
    calculateShippingTotal(
      (await findQuotationShippingDetail({
        shipping: quotationDetail.shippingDetail!.shipping.code,
        route: quotationDetail.shippingDetail!.route.code,
        port: quotationDetail.port.code,
        containerSize: quotationDetail.containerSize,
        containerType: quotationDetail.containerType,
      }))!
    ) +
    calculateOtherExpanses(quotationDetail.otherExpanses!) +
    quotationDetail.summaryDetail!.nilaiPPFTZ +
    quotationDetail.summaryDetail!.nilaiInsurance / 1000 +
    quotationDetail.summaryDetail!.biayaAdmin
  );
}

export async function findQuotationTrackingDetail(input: {
  vendor: string;
  route: string;
  port: string;
  containerSize: string;
  containerType: string;
}) {
  const priceVendor = await findPriceVendorByVendor(input.vendor);
  if (!priceVendor) {
    return null;
  }

  const priceVendorDetail = priceVendor.details.find(
    (priceVendorDetail) =>
      priceVendorDetail.route.code === input.route &&
      priceVendorDetail.port.code === input.port &&
      priceVendorDetail.containerSize === input.containerSize &&
      priceVendorDetail.containerType === input.containerType
  );
  if (!priceVendorDetail) return null;

  return priceVendorDetail;
}

export async function findQuotationShippingDetail(input: {
  shipping: string;
  route: string;
  port: string;
  containerSize: string;
  containerType: string;
}) {
  const priceShipping = await findPriceShippingByShipping(input.shipping);
  if (!priceShipping) {
    return null;
  }

  const priceShippingDetail = priceShipping.details.find(
    (priceShippingDetail) =>
      priceShippingDetail.route.code === input.route &&
      priceShippingDetail.port.code === input.port &&
      priceShippingDetail.containerSize === input.containerSize &&
      priceShippingDetail.containerType === input.containerType
  );
  if (!priceShippingDetail) return null;

  return priceShippingDetail;
}

export async function findAllQuotations(onlyActive: boolean = false) {
  return await prisma.quotation.findMany({
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
    where: onlyActive
      ? {
          effectiveStartDate: {
            lte: new Date(),
          },
          effectiveEndDate: {
            gte: new Date(),
          },
        }
      : {},
  });
}

export async function createQuotation(input: QuotationInput) {
  for (const detail of input.details) {
    if (
      await checkQuotationDetailDuplicate(detail.route, detail.containerSize)
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

export async function updateQuotation(number: string, input: QuotationInput) {
  for (const detail of input.details) {
    if (
      await checkQuotationDetailDuplicate(detail.route, detail.containerSize)
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
