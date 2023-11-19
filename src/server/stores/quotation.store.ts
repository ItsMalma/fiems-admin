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
            ppftz: detail.summaryDetail.ppftz,
            nilaiPPFTZ: detail.summaryDetail.nilaiPPFTZ,
            insurance: detail.summaryDetail.insurance,
            nilaiInsurance: detail.summaryDetail.nilaiInsurance,
            biayaAdmin: detail.summaryDetail.biayaAdmin,
            ppn: detail.summaryDetail.ppn,
            hargaJual: detail.summaryDetail.hargaJual,
          },
          completed: false,
        })),
      },
    },
  });
}
