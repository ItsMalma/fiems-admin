import { Factory, Shipping, Vendor } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CustomerInput,
  CustomerType,
  createCustomerCode,
  extractCustomerCode,
} from "../dtos/customer.dto";
import prisma from "../prisma";
import { findCustomerGroupByCode } from "./customerGroup.store";

export async function findAllFactory() {
  return await prisma.factory.findMany({
    include: {
      group: true,
    },
  });
}

export async function findAllVendor() {
  return await prisma.vendor.findMany({});
}

export async function findUniqueVendorAtPrice() {
  return await prisma.vendor.findMany({
    where: { priceVendors: { none: {} } },
  });
}

export async function findAllShipping() {
  return await prisma.shipping.findMany({});
}

export async function findFactoryByCode(code: string) {
  const factory = await prisma.factory.findFirst({
    where: { code },
    include: {
      group: true,
      inquiries: true,
      quotations: true,
      quotationDetails: true,
    },
  });
  if (!factory) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Factory with code ${code} not exists`,
    });
  }

  return factory;
}

export async function findVendorByCode(code: string) {
  const vendor = await prisma.vendor.findFirst({
    where: { code },
    include: {
      priceVendors: true,
      trackingAsal: { include: { quotationDetail: true } },
      trackingTujuan: { include: { quotationDetail: true } },
      uangJalan: true,
      vehicles: true,
    },
  });
  if (!vendor) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Vendor with code ${code} not exists`,
    });
  }

  return vendor;
}

export async function findShippingByCode(code: string) {
  const shipping = await prisma.shipping.findFirst({
    where: { code },
    include: {
      priceShippings: true,
      shippingDetail: { include: { quotationDetail: true } },
      vessels: true,
    },
  });
  if (!shipping) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Shipping with code ${code} not exists`,
    });
  }

  return shipping;
}

export const findNextCustomerCode = async (
  type: CustomerType
): Promise<string> => {
  let extractedCustomerCode = 0;

  switch (type) {
    case "Factory":
      const nextFactory = await prisma.factory.findFirst({
        orderBy: {
          code: "desc",
        },
      });

      if (nextFactory) {
        extractedCustomerCode = extractCustomerCode(nextFactory.code);
      }
      break;
    case "Vendor":
      const nextVendor = await prisma.vendor.findFirst({
        orderBy: {
          code: "desc",
        },
      });

      if (nextVendor) {
        extractedCustomerCode = extractCustomerCode(nextVendor.code);
      }
      break;
    case "Shipping":
      const nextShipping = await prisma.shipping.findFirst({
        orderBy: {
          code: "desc",
        },
      });

      if (nextShipping) {
        extractedCustomerCode = extractCustomerCode(nextShipping.code);
      }
      break;
  }

  if (isNaN(extractedCustomerCode)) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      message: "Latest customer's code is invalid",
    });
  }

  return createCustomerCode(type, extractedCustomerCode + 1);
};

export async function createCustomer(
  type: CustomerType,
  code: string,
  input: CustomerInput
): Promise<Factory | Vendor | Shipping> {
  switch (type) {
    case "Factory":
      if (input.group === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid group code",
        });
      }

      const customerGroup = await findCustomerGroupByCode(input.group);

      return await prisma.factory.create({
        data: {
          code: code,
          name: input.name,
          group: { connect: { code: customerGroup.code } },
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
    case "Vendor":
      return await prisma.vendor.create({
        data: {
          code: code,
          name: input.name,
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
    case "Shipping":
      return await prisma.shipping.create({
        data: {
          code: code,
          name: input.name,
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
  }
}

export async function updateCustomer(
  type: CustomerType,
  code: string,
  input: CustomerInput
): Promise<Factory | Vendor | Shipping> {
  switch (type) {
    case "Factory":
      if (input.group === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid group code",
        });
      }

      const customerGroup = await findCustomerGroupByCode(input.group);

      return await prisma.factory.update({
        where: {
          code,
        },
        data: {
          name: input.name,
          group: { connect: { code: customerGroup.code } },
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
    case "Vendor":
      return await prisma.vendor.update({
        where: {
          code,
        },
        data: {
          name: input.name,
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
    case "Shipping":
      return await prisma.shipping.update({
        where: {
          code,
        },
        data: {
          name: input.name,
          address: input.address,
          province: input.province,
          city: input.city,
          telephone: input.telephone,
          fax: input.fax,
          email: input.email,
          currency: input.currency,
          top: input.top,
          purchasing: input.purchasing,
          operation: input.operation,
          finance: input.finance,
          status: true,
        },
      });
  }
}

export async function deleteCustomer(
  type: CustomerType,
  code: string
): Promise<Factory | Vendor | Shipping> {
  switch (type) {
    case "Factory":
      const factory = await findFactoryByCode(code);
      if (factory.quotations.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Factory ${factory.code} is used in Quotation ${factory.quotations[0].number}`,
        });
      if (factory.quotationDetails.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Factory ${factory.code} is used in Quotation ${factory.quotationDetails[0].quotationNumber}`,
        });
      if (factory.inquiries.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Factory ${factory.code} is used in Inquiry ${factory.inquiries[0].number}`,
        });
      return await prisma.factory.delete({ where: { code: factory.code } });
    case "Vendor":
      const vendor = await findVendorByCode(code);
      if (vendor.priceVendors.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Vendor ${vendor.code} is used in Price Vendor`,
        });
      if (vendor.vehicles.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Vendor ${vendor.code} is used in Vehicle`,
        });
      if (vendor.trackingAsal.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Vendor ${vendor.code} is used in Quotation ${vendor.trackingAsal[0].quotationDetail.quotationNumber}`,
        });
      if (vendor.trackingTujuan.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Vendor ${vendor.code} is used in Quotation ${vendor.trackingTujuan[0].quotationDetail.quotationNumber}`,
        });
      if (vendor.uangJalan.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Vendor ${vendor.code} is used in Uang Jalan ${vendor.uangJalan[0]}`,
        });
      return await prisma.vendor.delete({ where: { code: vendor.code } });
    case "Shipping":
      const shipping = await findShippingByCode(code);
      if (shipping.priceShippings.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Shipping ${shipping.code} is used in Price Shipping`,
        });
      if (shipping.vessels.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Shipping ${shipping.code} is used in Vessel`,
        });
      if (shipping.shippingDetail.length > 0)
        throw new TRPCError({
          code: "CONFLICT",
          message: `Shipping ${shipping.code} is used in Quotation ${shipping.shippingDetail[0].quotationDetail.quotationNumber}`,
        });
      return await prisma.shipping.delete({ where: { code: shipping.code } });
  }
}
