import { Route } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  RouteInput,
  createRouteCode,
  extractRouteCode,
} from "../dtos/route.dto";
import prisma from "../prisma";

export async function findAllRoute() {
  return await prisma.route.findMany();
}

export async function findAllRouteFromPriceVendor(vendorCode: string) {
  return await prisma.route.findMany({
    where: {
      priceVendorDetails: {
        some: { priceVendor: { vendor: { code: vendorCode } } },
      },
    },
  });
}

export async function findRouteByCode(code: string) {
  const route = await prisma.route.findFirst({
    where: { code },
    include: {
      priceShippingDetails: true,
      priceVendorDetails: true,
      quotationDetails: true,
      shippingDetails: {
        include: { quotationDetail: true },
      },
      trackingAsal: {
        include: { quotationDetail: true },
      },
      trackingTujuan: {
        include: {
          quotationDetail: true,
        },
      },
    },
  });
  if (!route) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Route with code ${code} not exists`,
    });
  }

  return route;
}

export async function findNextRouteCode() {
  const nextRoute = await prisma.route.findFirst({
    orderBy: {
      code: "desc",
    },
  });

  if (nextRoute) {
    return createRouteCode(extractRouteCode(nextRoute.code) + 1);
  } else {
    return createRouteCode(1);
  }
}

export async function createRoute(
  code: string,
  input: RouteInput
): Promise<Route> {
  return await prisma.route.create({
    data: {
      code: code,
      province: input.province,
      city: input.city,
      startDescription: input.startDescription,
      endDescription: input.endDescription,
      effectiveStartDate: input.effectiveStartDate,
      effectiveEndDate: input.effectiveEndDate,
    },
  });
}

export async function updateRoute(
  code: string,
  input: RouteInput
): Promise<Route> {
  return await prisma.route.update({
    where: {
      code,
    },
    data: {
      province: input.province,
      city: input.city,
      startDescription: input.startDescription,
      endDescription: input.endDescription,
      effectiveStartDate: input.effectiveStartDate,
      effectiveEndDate: input.effectiveEndDate,
    },
  });
}

export async function deleteRoute(code: string): Promise<Route> {
  const route = await findRouteByCode(code);

  if (route.priceShippingDetails.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Price Shipping`,
    });
  if (route.priceVendorDetails.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Price Vendor`,
    });
  if (route.quotationDetails.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Quotation ${route.quotationDetails[0].quotationNumber}`,
    });
  if (route.trackingAsal.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Quotation ${route.trackingAsal[0].quotationDetail.quotationNumber}`,
    });
  if (route.trackingTujuan.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Quotation ${route.trackingTujuan[0].quotationDetail.quotationNumber}`,
    });
  if (route.shippingDetails.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Route ${route.code} is used in Quotation ${route.shippingDetails[0].quotationDetail.quotationNumber}`,
    });

  return await prisma.route.delete({ where: { code: route.code } });
}
