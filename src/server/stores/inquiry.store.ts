import prisma from "@/server/prisma";
import { JobOrder, TypeOrder } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  InquiryInput,
  createInquiryNumber,
  extractNumberInquiry,
} from "../dtos/inquiry.dto";

export async function findNextInquiryNumber() {
  const lastInquiry = await prisma.inquiry.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastInquiry) {
    return createInquiryNumber(1);
  }

  return createInquiryNumber(extractNumberInquiry(lastInquiry.number) + 1);
}

export async function findInquiryByNumber(inquiryNumber: string) {
  const inquiry = await prisma.inquiry.findFirst({
    where: {
      number: inquiryNumber,
    },
    include: {
      sales: true,
      factory: {
        include: {
          group: true,
        },
      },
      purchase: true,
      details: {
        include: {
          priceFactory: {
            include: {
              quotationDetail: {
                include: {
                  quotation: true,
                  route: true,
                },
              },
            },
          },
          shipping: true,
          vessel: true,
          factory: true,
        },
      },
    },
  });
  if (!inquiry) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Inquiry with number ${inquiryNumber} not exists`,
    });
  }

  return inquiry;
}

export async function findAllInquiryDetails() {
  return await prisma.inquiryDetail.findMany({
    include: {
      inquiry: {
        include: {
          sales: true,
          factory: { include: { group: true } },
          purchase: { include: { group: true } },
        },
      },
      factory: { include: { group: true } },
      shipping: true,
      vessel: true,
      priceFactory: {
        include: {
          quotationDetail: { include: { route: true, quotation: true } },
        },
      },
    },
  });
}

export async function createInquiry(input: InquiryInput) {
  return await prisma.inquiry.create({
    data: {
      number: await findNextInquiryNumber(),
      sales: { connect: { code: input.sales } },
      factory: { connect: { code: input.factory } },
      purchase: { connect: { code: input.purchase } },
      details: {
        create: await Promise.all(
          input.details.map(async (detail) => {
            const priceFactory = await prisma.priceFactory.findFirst({
              where: {
                quotationDetail: {
                  route: { code: detail.route },
                  containerSize: detail.containerSize,
                },
              },
            });
            if (!priceFactory) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: `There are no price factory with route ${detail.route} and container size ${detail.containerSize}`,
              });
            }

            return {
              jobOrder: detail.jobOrder as JobOrder,
              typeOrder: detail.typeOrder as TypeOrder,
              loadDate: detail.loadDate,
              factory: { connect: { code: detail.factory } },
              priceFactory: {
                connect: {
                  id: priceFactory.id,
                },
              },
              shipping: { connect: { code: detail.shipping } },
              vessel: { connect: { id: detail.vessel } },
              voyage: detail.voyage,
              etd: detail.etd,
              eta: detail.eta,
            };
          })
        ),
      },
    },
  });
}

export async function updateInquiry(
  inquiryNumber: string,
  input: InquiryInput
) {
  return await prisma.$transaction(async (tx) => {
    const inquiryDetails = await tx.inquiryDetail.findMany({
      where: { inquiry: { number: inquiryNumber } },
    });

    for (const inquiryDetail of inquiryDetails) {
      const inputDetail = input.details.find((d) => d.id === inquiryDetail.id);

      if (inputDetail) {
        const priceFactory = await tx.priceFactory.findFirst({
          where: {
            quotationDetail: {
              route: { code: inputDetail.route },
              containerSize: inputDetail.containerSize,
            },
          },
        });
        if (!priceFactory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `There are no price factory with route ${inputDetail.route} and container size ${inputDetail.containerSize}`,
          });
        }

        await tx.inquiryDetail.update({
          where: { id: inputDetail.id },
          data: {
            jobOrder: inputDetail.jobOrder as JobOrder,
            typeOrder: inputDetail.typeOrder as TypeOrder,
            loadDate: inputDetail.loadDate,
            factory: { connect: { code: inputDetail.factory } },
            priceFactory: {
              connect: {
                id: priceFactory.id,
              },
            },
            shipping: { connect: { code: inputDetail.shipping } },
            vessel: { connect: { id: inputDetail.vessel } },
            voyage: inputDetail.voyage,
            etd: inputDetail.etd,
            eta: inputDetail.eta,
          },
        });
      } else {
        await tx.inquiryDetail.delete({ where: { id: inquiryDetail.id } });
      }
    }

    for (const inputDetail of input.details) {
      if (!inquiryDetails.find((d) => d.id === inputDetail.id)) {
        const priceFactory = await tx.priceFactory.findFirst({
          where: {
            quotationDetail: {
              route: { code: inputDetail.route },
              containerSize: inputDetail.containerSize,
            },
          },
        });
        if (!priceFactory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `There are no price factory with route ${inputDetail.route} and container size ${inputDetail.containerSize}`,
          });
        }

        await tx.inquiryDetail.create({
          data: {
            inquiry: { connect: { number: inquiryNumber } },
            jobOrder: inputDetail.jobOrder as JobOrder,
            typeOrder: inputDetail.typeOrder as TypeOrder,
            loadDate: inputDetail.loadDate,
            factory: { connect: { code: inputDetail.factory } },
            priceFactory: {
              connect: {
                id: priceFactory.id,
              },
            },
            shipping: { connect: { code: inputDetail.shipping } },
            vessel: { connect: { id: inputDetail.vessel } },
            voyage: inputDetail.voyage,
            etd: inputDetail.etd,
            eta: inputDetail.eta,
          },
        });
      }
    }

    return await tx.inquiry.update({
      where: { number: inquiryNumber },
      data: {
        sales: { connect: { code: input.sales } },
        factory: { connect: { code: input.factory } },
        purchase: { connect: { code: input.purchase } },
      },
    });
  });
}

export async function deleteInquiryDetailByID(id: string) {
  const inquiryDetail = await prisma.inquiryDetail.delete({
    where: { id },
    include: { inquiry: { include: { details: true } } },
  });

  if (inquiryDetail.inquiry.details.length < 1) {
    await prisma.inquiry.delete({
      where: { number: inquiryDetail.inquiry.number },
    });
  }

  return inquiryDetail;
}
