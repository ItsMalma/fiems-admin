import {
  PriceFactory,
  PriceShipping,
  PriceShippingDetail,
  PriceVendor,
  PriceVendorDetail,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import moment from "moment";
import {
  PriceFactoryInput,
  PriceShippingInput,
  PriceVendorInput,
} from "../dtos/price.dto";
import prisma from "../prisma";

export async function findAllPriceFactories() {
  return await prisma.priceFactory.findMany({
    include: {
      quotationDetail: {
        include: {
          quotation: { include: { factory: true } },
          route: true,
          factory: true,
          port: true,
          trackingAsal: {
            include: { route: true, vendor: true },
          },
          trackingTujuan: {
            include: { route: true, vendor: true },
          },
          shippingDetail: {
            include: { route: true, shipping: true },
          },
        },
      },
    },
  });
}

export async function findPriceVendorByVendor(vendorCode: string) {
  return await prisma.priceVendor.findFirst({
    where: { vendor: { code: vendorCode } },
    include: {
      vendor: true,
      details: {
        include: {
          port: true,
          route: true,
        },
      },
    },
  });
}

export async function findAllPriceVendors() {
  return await prisma.priceVendor.findMany({
    include: {
      vendor: true,
      details: {
        include: {
          port: true,
          route: true,
        },
      },
    },
  });
}

export async function findAllPriceVendorDetails() {
  return await prisma.priceVendorDetail.findMany({
    include: {
      priceVendor: { include: { vendor: true } },
      route: true,
      port: true,
    },
  });
}

export async function findPriceShippingByShipping(shippingCode: string) {
  return await prisma.priceShipping.findFirst({
    where: { shipping: { code: shippingCode } },
    include: {
      shipping: true,
      details: {
        include: {
          port: true,
          route: true,
        },
      },
    },
  });
}

export async function findAllPriceShippings() {
  return await prisma.priceShipping.findMany({
    include: {
      shipping: true,
      details: {
        include: { port: true, route: true },
      },
    },
  });
}

export async function findAllPriceShippingDetails() {
  return await prisma.priceShippingDetail.findMany({
    include: {
      priceShipping: { include: { shipping: true } },
      route: true,
      port: true,
    },
  });
}

export async function findPriceFactoryByID(id: string) {
  const priceFactory = await prisma.priceFactory.findFirst({
    where: { id },
    include: {
      quotationDetail: {
        include: {
          quotation: true,
          route: true,
          factory: true,
          port: true,
          trackingAsal: {
            include: { route: true, vendor: true },
          },
          trackingTujuan: {
            include: { route: true, vendor: true },
          },
          shippingDetail: {
            include: { route: true, shipping: true },
          },
        },
      },
      inquiryDetails: true,
    },
  });
  if (!priceFactory) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Price factory with id ${id} not exists`,
    });
  }

  return priceFactory;
}

export async function findPriceVendorByID(id: string) {
  const priceVendor = await prisma.priceVendor.findFirst({
    where: { id },
    include: {
      vendor: true,
      details: { include: { route: true, port: true } },
    },
  });
  if (!priceVendor) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Price vendor with id ${id} not exists`,
    });
  }

  return priceVendor;
}

export async function findPriceShippingByID(id: string) {
  const priceShipping = await prisma.priceShipping.findFirst({
    where: { id },
    include: {
      shipping: true,
      details: { include: { route: true, port: true } },
    },
  });
  if (!priceShipping) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Price shipping with id ${id} not exists`,
    });
  }

  return priceShipping;
}

export async function checkPriceFactoryDuplicate(
  quotationDetailID: string
): Promise<boolean> {
  return !!(await prisma.priceFactory.findFirst({
    where: { quotationDetail: { id: quotationDetailID } },
  }));
}

export async function createPriceFactory(
  input: PriceFactoryInput
): Promise<PriceFactory> {
  const quotationDetail = await prisma.quotationDetail.findFirst({
    where: {
      quotation: {
        number: input.quotation,
        details: {
          some: {
            route: { code: input.route },
            containerSize: input.containerSize,
          },
        },
      },
    },
  });
  if (!quotationDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Quotation not found`,
    });
  }

  if (await checkPriceFactoryDuplicate(quotationDetail.id)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "There must be no price factories leading to the same quotation.",
    });
  }

  return await prisma.priceFactory.create({
    data: {
      quotationDetail: {
        connect: {
          id: quotationDetail.id,
          route: { code: input.route },
          containerSize: input.containerSize,
        },
      },
      etcCost: input.etcCost,
      status: true,
    },
    include: {
      quotationDetail: true,
    },
  });
}

export async function createPriceVendor(
  input: PriceVendorInput
): Promise<PriceVendor> {
  for (let detailIndex = 0; detailIndex < input.details.length; detailIndex++) {
    const detail = input.details[detailIndex];

    if (
      (await prisma.priceVendor.count({
        where: {
          vendor: { code: input.vendor },
          details: {
            some: {
              route: { code: detail.route },
              port: { code: detail.port },
              containerSize: detail.containerSize,
            },
          },
        },
      })) !== 0 ||
      input.details.find(
        (findDetail, findDetailIndex) =>
          findDetailIndex !== detailIndex &&
          findDetail.route === detail.route &&
          findDetail.port === detail.port &&
          findDetail.containerSize === detail.containerSize
      )
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "There must be no prices with the same vendor, route, port and container size all together.",
      });
    }
  }

  return await prisma.priceVendor.create({
    data: {
      vendor: { connect: { code: input.vendor } },
      effectiveStartDate: input.effectiveStartDate,
      effectiveEndDate: input.effectiveEndDate,
      details: {
        create: input.details.map((detail) => ({
          containerSize: detail.containerSize,
          containerType: detail.containerType,
          serviceType: detail.serviceType,
          tracking: detail.tracking,
          buruh: detail.buruh,
          thcOPT: detail.thcOPT,
          thcOPP: detail.thcOPP,
          adminBL: detail.adminBL,
          cleaning: detail.cleaning,
          materai: detail.materai,
          route: { connect: { code: detail.route } },
          port: { connect: { code: detail.port } },
        })),
      },
      status: true,
    },
  });
}

export async function createPriceShipping(
  input: PriceShippingInput
): Promise<PriceShipping> {
  for (let detailIndex = 0; detailIndex < input.details.length; detailIndex++) {
    const detail = input.details[detailIndex];

    if (
      (await prisma.priceShipping.count({
        where: {
          shipping: { code: input.shipping },
          details: {
            some: {
              route: { code: detail.route },
              port: { code: detail.port },
              containerSize: detail.containerSize,
            },
          },
        },
      })) !== 0 ||
      input.details.find(
        (findDetail, findDetailIndex) =>
          findDetailIndex !== detailIndex &&
          findDetail.route === detail.route &&
          findDetail.port === detail.port &&
          findDetail.containerSize === detail.containerSize
      )
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "There must be no prices with the same shipping, route, port and container size all together.",
      });
    }
  }

  return await prisma.priceShipping.create({
    data: {
      shipping: { connect: { code: input.shipping } },
      effectiveStartDate: moment(input.effectiveStartDate).toDate(),
      effectiveEndDate: moment(input.effectiveEndDate).toDate(),
      details: {
        create: input.details.map((detail) => ({
          containerSize: detail.containerSize,
          containerType: detail.containerType,
          serviceType: detail.serviceType,
          freight: detail.freight,
          thcOPT: detail.thcOPT,
          thcOPP: detail.thcOPP,
          adminBL: detail.adminBL,
          cleaning: detail.cleaning,
          alihKapal: detail.alihKapal,
          materai: detail.materai,
          lolo: detail.lolo,
          segel: detail.segel,
          rc: detail.rc,
          lss: detail.lss,
          route: { connect: { code: detail.route } },
          port: { connect: { code: detail.port } },
        })),
      },
      status: true,
    },
  });
}

export async function updatePriceFactory(
  id: string,
  input: PriceFactoryInput
): Promise<PriceFactory> {
  const quotationDetail = await prisma.quotationDetail.findFirst({
    where: {
      quotation: {
        number: input.quotation,
        details: {
          some: {
            route: { code: input.route },
            containerSize: input.containerSize,
          },
        },
      },
    },
  });
  if (!quotationDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Quotation not found`,
    });
  }

  if (await checkPriceFactoryDuplicate(quotationDetail.id)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "There must be no price factories leading to the same quotation.",
    });
  }

  return await prisma.priceFactory.update({
    where: { id },
    data: {
      quotationDetail: {
        connect: {
          id: quotationDetail.id,
          route: { code: input.route },
          containerSize: input.containerSize,
        },
      },
      etcCost: input.etcCost,
      status: true,
    },
    include: {
      quotationDetail: true,
    },
  });
}

export async function updatePriceVendor(
  id: string,
  input: PriceVendorInput
): Promise<PriceVendor> {
  const priceVendor = await findPriceVendorByID(id);

  return await prisma.$transaction(async (tx) => {
    for (let i = 0; i < priceVendor.details.length; i++) {
      const detail = priceVendor.details[i];

      const inputDetail = input.details.find(
        (inputDetail) => inputDetail.id === detail.id
      );
      if (!inputDetail) {
        await tx.priceVendorDetail.delete({ where: { id: detail.id } });
      } else {
        await tx.priceVendorDetail.update({
          where: { id: detail.id },
          data: {
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            serviceType: inputDetail.serviceType,
            tracking: inputDetail.tracking,
            buruh: inputDetail.buruh,
            thcOPT: inputDetail.thcOPT,
            thcOPP: inputDetail.thcOPP,
            adminBL: inputDetail.adminBL,
            cleaning: inputDetail.cleaning,
            materai: inputDetail.materai,
            route: { connect: { code: inputDetail.route } },
            port: { connect: { code: inputDetail.port } },
          },
        });
      }
    }

    for (
      let detailIndex = 0;
      detailIndex < input.details.length;
      detailIndex++
    ) {
      const inputDetail = input.details[detailIndex];

      const detail = await prisma.priceVendorDetail.findFirst({
        where: {
          priceVendor: { vendor: { code: input.vendor } },
          route: { code: inputDetail.route },
          port: { code: inputDetail.port },
          containerSize: inputDetail.containerSize,
        },
      });
      if (!detail) {
        continue;
      }

      if (detail.id !== inputDetail.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "There must be no prices with the same vendor, route, port and container size all together.",
        });
      }
    }

    for (let i = 0; i < input.details.length; i++) {
      const inputDetail = input.details[i];

      if (!priceVendor.details.find((detail) => detail.id === inputDetail.id)) {
        await tx.priceVendorDetail.create({
          data: {
            priceVendor: { connect: { id } },
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            serviceType: inputDetail.serviceType,
            tracking: inputDetail.tracking,
            buruh: inputDetail.buruh,
            thcOPT: inputDetail.thcOPT,
            thcOPP: inputDetail.thcOPP,
            adminBL: inputDetail.adminBL,
            cleaning: inputDetail.cleaning,
            materai: inputDetail.materai,
            route: { connect: { code: inputDetail.route } },
            port: { connect: { code: inputDetail.port } },
          },
        });
      }
    }

    return await tx.priceVendor.update({
      where: {
        id,
      },
      data: {
        vendor: { connect: { code: input.vendor } },
        effectiveStartDate: moment(input.effectiveStartDate).toDate(),
        effectiveEndDate: moment(input.effectiveEndDate).toDate(),
        details: {},
      },
    });
  });
}

export async function updatePriceShipping(
  id: string,
  input: PriceShippingInput
): Promise<PriceShipping> {
  const priceShipping = await findPriceShippingByID(id);

  return await prisma.$transaction(async (tx) => {
    for (let i = 0; i < priceShipping.details.length; i++) {
      const detail = priceShipping.details[i];

      const inputDetail = input.details.find(
        (inputDetail) => inputDetail.id === detail.id
      );
      if (!inputDetail) {
        await tx.priceShippingDetail.delete({ where: { id: detail.id } });
      } else {
        await tx.priceShippingDetail.update({
          where: { id: detail.id },
          data: {
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            serviceType: inputDetail.serviceType,
            freight: inputDetail.freight,
            thcOPT: inputDetail.thcOPT,
            thcOPP: inputDetail.thcOPP,
            adminBL: inputDetail.adminBL,
            cleaning: inputDetail.cleaning,
            alihKapal: inputDetail.alihKapal,
            materai: inputDetail.materai,
            lolo: inputDetail.lolo,
            segel: inputDetail.segel,
            rc: inputDetail.rc,
            lss: inputDetail.lss,
            route: { connect: { code: inputDetail.route } },
            port: { connect: { code: inputDetail.port } },
          },
        });
      }
    }

    for (
      let detailIndex = 0;
      detailIndex < input.details.length;
      detailIndex++
    ) {
      const inputDetail = input.details[detailIndex];

      const detail = await prisma.priceShipping.count({
        where: {
          shipping: { code: input.shipping },
          details: {
            some: {
              route: { code: inputDetail.route },
              port: { code: inputDetail.port },
              containerSize: inputDetail.containerSize,
            },
          },
        },
      });

      if (!detail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "There must be no prices with the same shipping, route, port and container size all together.",
        });
      }
    }

    for (let i = 0; i < input.details.length; i++) {
      const inputDetail = input.details[i];

      if (
        !priceShipping.details.find((detail) => detail.id === inputDetail.id)
      ) {
        await tx.priceShippingDetail.create({
          data: {
            priceShipping: { connect: { id } },
            containerSize: inputDetail.containerSize,
            containerType: inputDetail.containerType,
            serviceType: inputDetail.serviceType,
            freight: inputDetail.freight,
            thcOPT: inputDetail.thcOPT,
            thcOPP: inputDetail.thcOPP,
            adminBL: inputDetail.adminBL,
            cleaning: inputDetail.cleaning,
            alihKapal: inputDetail.alihKapal,
            materai: inputDetail.materai,
            lolo: inputDetail.lolo,
            segel: inputDetail.segel,
            rc: inputDetail.rc,
            lss: inputDetail.lss,
            route: { connect: { code: inputDetail.route } },
            port: { connect: { code: inputDetail.port } },
          },
        });
      }
    }

    return await tx.priceShipping.update({
      where: {
        id,
      },
      data: {
        shipping: { connect: { code: input.shipping } },
        effectiveStartDate: moment(input.effectiveStartDate).toDate(),
        effectiveEndDate: moment(input.effectiveEndDate).toDate(),
        details: {},
      },
    });
  });
}

export async function deletePriceFactory(id: string): Promise<PriceFactory> {
  const priceFactory = await findPriceFactoryByID(id);

  if (priceFactory.inquiryDetails.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Price Factory that you want to delete is used in Inquiry ${priceFactory.inquiryDetails[0].inquiryNumber}`,
    });

  return await prisma.priceFactory.delete({
    where: { id: priceFactory.id },
    include: { quotationDetail: true },
  });
}

export async function deletePriceVendor(id: string): Promise<PriceVendor> {
  const priceVendor = await findPriceVendorByID(id);

  return await prisma.priceVendor.delete({ where: { id: priceVendor.id } });
}

export async function deletePriceVendorDetail(
  id: string
): Promise<PriceVendorDetail> {
  const detail = await prisma.priceVendorDetail.delete({
    where: { id },
    include: { priceVendor: { include: { details: true } } },
  });

  const priceVendor = await findPriceVendorByID(detail.priceVendor.id);
  if (priceVendor.details.length === 0) {
    await deletePriceVendor(priceVendor.id);
  }

  return detail;
}

export async function deletePriceShipping(id: string): Promise<PriceShipping> {
  const priceShipping = await findPriceShippingByID(id);

  return await prisma.priceShipping.delete({ where: { id: priceShipping.id } });
}

export async function deletePriceShippingDetail(
  id: string
): Promise<PriceShippingDetail> {
  const detail = await prisma.priceShippingDetail.delete({
    where: { id },
    include: { priceShipping: { include: { details: true } } },
  });

  const priceShipping = await findPriceShippingByID(detail.priceShipping.id);
  if (priceShipping.details.length === 0) {
    await deletePriceShipping(priceShipping.id);
  }

  return detail;
}
